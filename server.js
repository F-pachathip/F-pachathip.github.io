const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const express = require('express');
const session = require('express-session');
const SQLiteStoreFactory = require('connect-sqlite3');
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const {
  dbReady,
  createUser,
  getUserByEmail,
  getUserById,
  ensureDefaultScaleForUser,
  getScalesForUser,
  createScale,
  deleteScale,
  clearScalePoints,
  addScalePoint,
  getResults,
  addResult,
  clearAllResults
} = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const SQLiteStore = SQLiteStoreFactory(session);

// ถ้ารันหลัง proxy (เช่น Render/Railway/Nginx) ให้ไว้วางใจ proxy เพื่อให้ cookie.secure ใช้งานได้
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// middlewares
app.use(express.json({ limit: '8mb' }));
app.use(express.urlencoded({ extended: true, limit: '8mb' }));

const SESSION_SECRET = process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');
if (!process.env.SESSION_SECRET) {
  console.warn('⚠️  SESSION_SECRET is not set. Using a random secret for this run.');
}

app.use(session({
  store: new SQLiteStore({
    dir: dataDir,
    db: 'sessions.sqlite',
  }),
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 14, // 14 วัน
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production' // ใช้ secure cookie เมื่อโปรดักชัน
  }
}));

// Serve static files from project root (HTML/CSS/JS located alongside server.js)
app.use(express.static(__dirname));

// Basic CSRF protection: block cross-origin POST/PUT/DELETE
app.use((req, res, next) => {
  const safeMethods = ['GET', 'HEAD', 'OPTIONS'];
  if (safeMethods.includes(req.method)) return next();
  const origin = req.get('Origin') || req.get('Referer');
  if (origin) {
    try {
      const { host } = new URL(origin);
      if (host !== req.get('Host')) return res.status(403).json({ error: 'csrf_violation' });
    } catch {
      return res.status(403).json({ error: 'csrf_violation' });
    }
  }
  next();
});

// helpers
function requireAuth(req, res, next){
  if(!req.session.userId) return res.status(401).json({ error: 'unauthorized' });
  next();
}

const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false
});

// ---------- Auth APIs ----------
app.post('/api/register', authLimiter, async (req, res)=>{
  try{
    const { name, email, password } = req.body || {};
    if(!name || !email || !password) return res.status(400).json({ error: 'missing_fields' });
    if(String(password).length < 6) return res.status(400).json({ error: 'weak_password' });

    const lowerEmail = String(email).toLowerCase();
    const exists = await getUserByEmail(lowerEmail);
    if(exists) return res.status(409).json({ error: 'email_taken' });

    const hash = await bcrypt.hash(String(password), 10);
    const userId = await createUser({ name, email: lowerEmail, password_hash: hash });
    await ensureDefaultScaleForUser(userId);

    // regenerate session เพื่อกัน fixation และให้แน่ใจว่าคุกกี้ถูกเซ็ต
    req.session.regenerate(err=>{
      if(err){ console.error(err); return res.status(500).json({ error: 'server_error' }); }
      req.session.userId = userId;
      req.session.save(err2=>{
        if(err2){ console.error(err2); return res.status(500).json({ error: 'server_error' }); }
        res.json({ ok: true, user: { id: userId, name, email: lowerEmail } });
      });
    });
  }catch(e){
    console.error(e);
    res.status(500).json({ error: 'server_error' });
  }
});

app.post('/api/login', authLimiter, async (req, res)=>{
  try{
    const { email, password } = req.body || {};
    if(!email || !password) return res.status(400).json({ error: 'missing_fields' });
    const lowerEmail = String(email).toLowerCase();
    const user = await getUserByEmail(lowerEmail);
    if(!user) return res.status(401).json({ error: 'invalid_credentials' });

    const ok = await bcrypt.compare(String(password), user.password_hash);
    if(!ok) return res.status(401).json({ error: 'invalid_credentials' });

    // regenerate session เพื่อกัน fixation และให้แน่ใจว่าคุกกี้ถูกเซ็ต
    req.session.regenerate(err=>{
      if(err){ console.error(err); return res.status(500).json({ error: 'server_error' }); }
      req.session.userId = user.id;
      req.session.save(err2=>{
        if(err2){ console.error(err2); return res.status(500).json({ error: 'server_error' }); }
        res.json({ ok: true, user: { id: user.id, name: user.name, email: user.email } });
      });
    });
  }catch(e){
    console.error(e);
    res.status(500).json({ error: 'server_error' });
  }
});

app.post('/api/logout', (req, res)=>{
  // ทำลายเซสชันและเคลียร์คุกกี้
  req.session.destroy(()=>{
    res.clearCookie('connect.sid');
    res.json({ ok: true });
  });
});

app.get('/api/me', async (req, res)=>{
  try{
    if(!req.session.userId) return res.status(401).json({ error: 'unauthorized' });
    const user = await getUserById(req.session.userId);
    if(!user) return res.status(401).json({ error: 'unauthorized' });
    res.json({ id: user.id, name: user.name, email: user.email });
  }catch(e){
    console.error(e);
    res.status(500).json({ error: 'server_error' });
  }
});

// ---------- Scales ----------
app.get('/api/scales', requireAuth, async (req, res)=>{
  try{
    const out = await getScalesForUser(req.session.userId);
    res.json(out);
  }catch(e){
    console.error(e);
    res.status(500).json({ error: 'server_error' });
  }
});

app.post('/api/scales', requireAuth, async (req, res)=>{
  try{
    const { name } = req.body || {};
    if(!name) return res.status(400).json({ error: 'missing_name' });
    const id = await createScale(req.session.userId, name);
    res.json({ ok: true, id });
  }catch(e){
    if(e && e.code === 'SQLITE_CONSTRAINT') return res.status(409).json({ error: 'duplicate_name' });
    console.error(e);
    res.status(500).json({ error: 'server_error' });
  }
});

app.post('/api/scales/:id/points', requireAuth, async (req, res)=>{
  try{
    const scaleId = Number(req.params.id);
    const { color, value } = req.body || {};
    if(!color || typeof value !== 'number') return res.status(400).json({ error: 'missing_fields' });
    await addScalePoint(req.session.userId, scaleId, color.toUpperCase(), value);
    res.json({ ok: true });
  }catch(e){
    if(e && e.message === 'not_found') return res.status(404).json({ error: 'not_found' });
    console.error(e);
    res.status(500).json({ error: 'server_error' });
  }
});

app.delete('/api/scales/:id', requireAuth, async (req, res)=>{
  try{
    await deleteScale(req.session.userId, Number(req.params.id));
    res.json({ ok: true });
  }catch(e){
    if(e && e.message === 'not_found') return res.status(404).json({ error: 'not_found' });
    console.error(e);
    res.status(500).json({ error: 'server_error' });
  }
});

app.delete('/api/scales/:id/points', requireAuth, async (req, res)=>{
  try{
    await clearScalePoints(req.session.userId, Number(req.params.id));
    res.json({ ok: true });
  }catch(e){
    if(e && e.message === 'not_found') return res.status(404).json({ error: 'not_found' });
    console.error(e);
    res.status(500).json({ error: 'server_error' });
  }
});

// ---------- Results ----------
app.get('/api/results', requireAuth, async (req, res)=>{
  try{
    const { reagent = '', sample = '' } = req.query || {};
    const rows = await getResults(req.session.userId, String(reagent), String(sample));
    res.json(rows);
  }catch(e){
    console.error(e);
    res.status(500).json({ error: 'server_error' });
  }
});

app.post('/api/results', requireAuth, async (req, res)=>{
  try{
    const { sample, reagent, avgHex, estimate, snapshot } = req.body || {};
    if(!sample || !reagent || !avgHex) return res.status(400).json({ error: 'missing_fields' });
    const id = await addResult(
      req.session.userId,
      { sample, reagent, avgHex, estimate: (estimate==null? null : Number(estimate)), snapshot }
    );
    res.json({ ok: true, id });
  }catch(e){
    console.error(e);
    res.status(500).json({ error: 'server_error' });
  }
});

app.delete('/api/results', requireAuth, async (req, res)=>{
  try{
    await clearAllResults(req.session.userId);
    res.json({ ok: true });
  }catch(e){
    console.error(e);
    res.status(500).json({ error: 'server_error' });
  }
});

// fallback to index.html (GET เท่านั้น)
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, 'index.html'));
});

// start
dbReady.then(()=>{
  app.listen(PORT, ()=> console.log(`✅ LabCam Web App running at http://localhost:${PORT}`));
}).catch(err=>{
  console.error('DB init error:', err);
  process.exit(1);
});