const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const dbPath = path.join(dataDir, 'app.sqlite');
const db = new sqlite3.Database(dbPath);

function run(sql, params=[]){
  return new Promise((resolve, reject)=>{
    db.run(sql, params, function(err){
      if(err) return reject(err);
      resolve(this);
    });
  });
}
function get(sql, params=[]){
  return new Promise((resolve, reject)=>{
    db.get(sql, params, function(err, row){
      if(err) return reject(err);
      resolve(row);
    });
  });
}
function all(sql, params=[]){
  return new Promise((resolve, reject)=>{
    db.all(sql, params, function(err, rows){
      if(err) return reject(err);
      resolve(rows);
    });
  });
}

const DEFAULT_SCALE = {
  name: 'Nitrate NO3- (ppm)',
  points: [
    { color: '#F7F4EA', value: 0 },
    { color: '#E6F59D', value: 10 },
    { color: '#A1D76A', value: 25 },
    { color: '#66BD63', value: 50 },
    { color: '#1A9850', value: 100 }
  ]
};

const dbReady = (async ()=>{
  await run(`PRAGMA foreign_keys = ON`);
  await run(`CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at INTEGER NOT NULL
  )`);
  await run(`CREATE TABLE IF NOT EXISTS scales(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    UNIQUE(user_id, name),
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
  )`);
  await run(`CREATE TABLE IF NOT EXISTS scale_points(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    scale_id INTEGER NOT NULL,
    color TEXT NOT NULL,
    value REAL NOT NULL,
    FOREIGN KEY(scale_id) REFERENCES scales(id) ON DELETE CASCADE
  )`);
  await run(`CREATE TABLE IF NOT EXISTS results(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    ts INTEGER NOT NULL,
    sample TEXT NOT NULL,
    reagent TEXT NOT NULL,
    avg_hex TEXT NOT NULL,
    estimate REAL NULL,
    snapshot TEXT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
  )`);
})();

async function createUser({ name, email, password_hash }){
  const now = Date.now();
  const r = await run(`INSERT INTO users(name, email, password_hash, created_at) VALUES(?,?,?,?)`,
    [name, email, password_hash, now]);
  return r.lastID;
}
function getUserByEmail(email){
  return get(`SELECT * FROM users WHERE email=?`, [email]);
}
function getUserById(id){
  return get(`SELECT id,name,email FROM users WHERE id=?`, [id]);
}

async function ensureDefaultScaleForUser(userId){
  const s = await get(`SELECT id FROM scales WHERE user_id=? AND name=?`, [userId, DEFAULT_SCALE.name]);
  if(s) return s.id;
  const r = await run(`INSERT INTO scales(user_id, name) VALUES(?,?)`, [userId, DEFAULT_SCALE.name]);
  const scaleId = r.lastID;
  for(const p of DEFAULT_SCALE.points){
    await run(`INSERT INTO scale_points(scale_id, color, value) VALUES(?,?,?)`, [scaleId, p.color, p.value]);
  }
  return scaleId;
}

async function getScalesForUser(userId){
  const rows = await all(`
    SELECT s.id as scale_id, s.name as scale_name, p.id as point_id, p.color, p.value
    FROM scales s
    LEFT JOIN scale_points p ON p.scale_id = s.id
    WHERE s.user_id=?
    ORDER BY s.name ASC, p.value ASC
  `, [userId]);

  const map = new Map();
  for(const r of rows){
    if(!map.has(r.scale_id)){
      map.set(r.scale_id, { id: r.scale_id, name: r.scale_name, points: [] });
    }
    if(r.point_id){
      map.get(r.scale_id).points.push({ id: r.point_id, color: r.color, value: r.value });
    }
  }
  return Array.from(map.values());
}

async function createScale(userId, name){
  const r = await run(`INSERT INTO scales(user_id, name) VALUES(?,?)`, [userId, name]);
  return r.lastID;
}
async function deleteScale(userId, scaleId){
  // make sure belongs to user
  const s = await get(`SELECT id FROM scales WHERE id=? AND user_id=?`, [scaleId, userId]);
  if(!s) throw new Error('not_found');
  await run(`DELETE FROM scales WHERE id=?`, [scaleId]);
}
async function clearScalePoints(userId, scaleId){
  const s = await get(`SELECT id FROM scales WHERE id=? AND user_id=?`, [scaleId, userId]);
  if(!s) throw new Error('not_found');
  await run(`DELETE FROM scale_points WHERE scale_id=?`, [scaleId]);
}
async function addScalePoint(userId, scaleId, color, value){
  const s = await get(`SELECT id FROM scales WHERE id=? AND user_id=?`, [scaleId, userId]);
  if(!s) throw new Error('not_found');
  await run(`INSERT INTO scale_points(scale_id, color, value) VALUES(?,?,?)`, [scaleId, color, value]);
}

async function getResults(userId, reagent, sample){
  let sql = `SELECT * FROM results WHERE user_id=?`;
  const params = [userId];
  if(reagent){ sql += ` AND reagent=?`; params.push(reagent); }
  if(sample){ sql += ` AND LOWER(sample) LIKE ?`; params.push(`%${sample.toLowerCase()}%`); }
  sql += ` ORDER BY ts ASC`;
  const rows = await all(sql, params);
  return rows.map(r=>({
    id: r.id,
    ts: r.ts,
    sample: r.sample,
    reagent: r.reagent,
    avgHex: r.avg_hex,
    estimate: r.estimate,
    snapshot: r.snapshot
  }));
}
async function addResult(userId, { sample, reagent, avgHex, estimate, snapshot }){
  const ts = Date.now();
  const r = await run(`INSERT INTO results(user_id, ts, sample, reagent, avg_hex, estimate, snapshot)
                       VALUES(?,?,?,?,?,?,?)`,
                       [userId, ts, sample, reagent, avgHex, estimate, snapshot]);
  return r.lastID;
}
async function clearAllResults(userId){
  await run(`DELETE FROM results WHERE user_id=?`, [userId]);
}

module.exports = {
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
};