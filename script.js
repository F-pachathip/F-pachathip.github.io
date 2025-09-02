/* ========= i18n ========= */
const I18N = {
  th: {
    nav_home: 'หน้าแรก',
    nav_analysis: 'วิเคราะห์',
    nav_reports: 'รายงาน',
    nav_csv: 'CSV Vault',
    nav_login: 'เข้าสู่ระบบ',
    nav_register: 'สมัครสมาชิก',
    nav_logout: 'ออกจากระบบ',

    intro_title: 'สแกนแถบทดสอบ → วิเคราะห์สี → บันทึกผล → ดูกราฟ',
    intro_sub: 'เว็บแอพแบบสมาร์ท ใช้กล้องอุปกรณ์ของคุณ เลือก ROI, คำนวณสี และประมาณค่าความเข้มข้น (เช่น ไนเตรต) เก็บข้อมูลบนฐานข้อมูลของคุณอย่างปลอดภัย',
    intro_cta_analyze: 'เริ่มวิเคราะห์',
    intro_cta_reports: 'ดูรายงาน',
    intro_cta_signup: 'สมัคร/ล็อกอิน',
    intro_note_title: 'หมายเหตุ',
    intro_note_desc: 'เครื่องมือนี้เพื่อการศึกษา/ทดสอบ ค่าประมาณขึ้นกับสเกล/สภาพแสง ควรสอบเทียบก่อนใช้งานจริง',

    analysis_title: 'วิเคราะห์จากกล้อง',
    btn_start_cam: 'เริ่มกล้อง',
    btn_stop_cam: 'หยุดกล้อง',
    btn_analyze: 'วิเคราะห์ ROI',
    analysis_hint: 'ลากเมาส์/นิ้วเพื่อวาดกรอบ ROI บนภาพ',
    label_sample: 'ชื่อสิ่งตัวอย่าง',
    label_reagent: 'รีเอเจนต์/สเกล',
    label_color: 'สีเฉลี่ย',
    label_estimate: 'ค่าโดยประมาณ',
    btn_save: 'บันทึกผล',
    btn_goto_reports: 'ไปที่รายงาน',
    scales_summary: 'สเกลที่ใช้งาน / เพิ่มสเกลใหม่',
    btn_manage_scales: 'จัดการสเกล',
    btn_add_scale: 'เพิ่มสเกล',
    btn_add_point: 'เพิ่มจุด',
    btn_clear_points: 'ล้างจุด',
    btn_save_scale: 'บันทึกสเกล',
    btn_delete_scale: 'ลบสเกล',

    reports_title: 'รายงานผล',
    filter_reagent: 'รีเอเจนต์',
    filter_sample: 'สิ่งตัวอย่าง',
    all: 'ทั้งหมด',
    btn_apply_filters: 'ใช้ตัวกรอง',
    btn_reset_filters: 'ล้างตัวกรอง',
    btn_download_csv: 'ดาวน์โหลด CSV',
    btn_clear_history: 'ล้างประวัติทั้งหมด',
    chart_title: 'แนวโน้มตามเวลา',
    list_title: 'รายการผล',

    csv_desc: 'ไฟล์ CSV ฝังอยู่ในหน้านี้ เปิดปุ๊บกดคลิก ดาวน์โหลดได้เลย',
    btn_download_all: 'ดาวน์โหลดทั้งหมด (ZIP)',

    label_name: 'ชื่อ',
    label_password: 'รหัสผ่าน'
  },
  en: {
    nav_home: 'Home',
    nav_analysis: 'Analyze',
    nav_reports: 'Reports',
    nav_csv: 'CSV Vault',
    nav_login: 'Login',
    nav_register: 'Register',
    nav_logout: 'Logout',

    intro_title: 'Scan test strips → Analyze color → Save → Chart',
    intro_sub: 'Smart web app: use your device camera, select ROI, compute color & estimate (e.g., nitrate). Securely stored in your database.',
    intro_cta_analyze: 'Start analyzing',
    intro_cta_reports: 'View reports',
    intro_cta_signup: 'Sign up / Login',
    intro_note_title: 'Note',
    intro_note_desc: 'For study/demo only. Estimates depend on scale/lighting; calibrate before real use.',

    analysis_title: 'Analyze via camera',
    btn_start_cam: 'Start camera',
    btn_stop_cam: 'Stop camera',
    btn_analyze: 'Analyze ROI',
    analysis_hint: 'Drag to draw an ROI rectangle on the image',
    label_sample: 'Sample name',
    label_reagent: 'Reagent/Scale',
    label_color: 'Average color',
    label_estimate: 'Estimated value',
    btn_save: 'Save result',
    btn_goto_reports: 'Go to Reports',
    scales_summary: 'Active scales / Create new',
    btn_manage_scales: 'Manage scales',
    btn_add_scale: 'Add scale',
    btn_add_point: 'Add point',
    btn_clear_points: 'Clear points',
    btn_save_scale: 'Save scale',
    btn_delete_scale: 'Delete scale',

    reports_title: 'Reports',
    filter_reagent: 'Reagent',
    filter_sample: 'Sample',
    all: 'All',
    btn_apply_filters: 'Apply',
    btn_reset_filters: 'Reset',
    btn_download_csv: 'Download CSV',
    btn_clear_history: 'Clear all',
    chart_title: 'Trend over time',
    list_title: 'Results',

    csv_desc: 'CSV files are embedded in this page. Click to download instantly.',
    btn_download_all: 'Download all (ZIP)',

    label_name: 'Name',
    label_password: 'Password'
  }
};

function getLang(){ return localStorage.getItem('lang') || 'th'; }
function setLang(lang){ localStorage.setItem('lang', lang); }
function translatePage(){
  const dict = I18N[getLang()] || I18N.th;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k = el.getAttribute('data-i18n');
    if(dict[k]) el.textContent = dict[k];
  });
  const langBtn = document.getElementById('langToggle');
  if(langBtn) langBtn.textContent = (getLang()==='th') ? 'ภาษาไทย' : 'English';
}

/* ========= Auth UI + Common ========= */
async function fetchMe(){
  const r = await fetch('/api/me', { credentials: 'same-origin' });
  if(r.ok) return r.json();
  return null;
}
function setupCommon(){
  // Lang
  const btn = document.getElementById('langToggle');
  if(btn){
    btn.addEventListener('click', ()=>{ setLang(getLang()==='th'?'en':'th'); translatePage(); });
  }
  translatePage();

  // Hamburger
  const ham = document.querySelector('.hamburger');
  const nav = document.getElementById('site-nav');
  if(ham && nav){
    ham.addEventListener('click', ()=>{
      const isActive = nav.classList.toggle('active');
      ham.setAttribute('aria-expanded', String(isActive));
      ham.setAttribute('aria-controls', 'site-nav');
    });
  }

  // Active nav
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navlist a').forEach(a=>{
    if(a.getAttribute('href')===path) a.classList.add('active');
  });
}

async function setupAuthUI(){
  const me = await fetchMe();
  const loginLink = document.getElementById('loginLink');
  const registerLink = document.getElementById('registerLink');
  const logoutBtn = document.getElementById('logoutBtn');

  const page = document.body.getAttribute('data-page');
  const requiresAuth = (page==='analysis' || page==='reports');

  if(me){
    if(loginLink) loginLink.style.display = 'none';
    if(registerLink) registerLink.style.display = 'none';
    if(logoutBtn){
      logoutBtn.style.display = 'inline-flex';
      logoutBtn.onclick = async ()=>{
        await fetch('/api/logout', { method:'POST', credentials:'same-origin' });
        location.replace('index.html');
      };
    }
  }else{
    if(loginLink) loginLink.style.display = '';
    if(registerLink) registerLink.style.display = '';
    if(logoutBtn) logoutBtn.style.display = 'none';
    if(requiresAuth){
      const next = encodeURIComponent(location.pathname.replace(/^\//,''));
      location.replace(`login.html?next=${next}`);
    }
  }
}

/* ========= Color/Canvas Utils ========= */
function clamp(v, lo, hi){ return Math.max(lo, Math.min(hi, v)); }
function hexToRgb(hex){
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if(!m) return {r:0,g:0,b:0};
  return { r: parseInt(m[1],16), g: parseInt(m[2],16), b: parseInt(m[3],16) };
}
function rgbToHex(r,g,b){
  const h = (n)=>n.toString(16).padStart(2,'0');
  return `#${h(r)}${h(g)}${h(b)}`.toUpperCase();
}
function colorDistance(a,b){ return Math.sqrt((a.r-b.r)**2 + (a.g-b.g)**2 + (a.b-b.b)**2); }
function avgColorInRect(ctx, x, y, w, h){
  const dpr = window.devicePixelRatio || 1;
  const img = ctx.getImageData(Math.round(x*dpr), Math.round(y*dpr), Math.round(w*dpr), Math.round(h*dpr)).data;
  let r=0,g=0,b=0,n=0;
  for(let i=0;i<img.length;i+=4){ r+=img[i]; g+=img[i+1]; b+=img[i+2]; n++; }
  if(n===0) return {r:0,g:0,b:0};
  r=Math.round(r/n); g=Math.round(g/n); b=Math.round(b/n);
  return {r,g,b};
}
function formatDateTime(ts){
  const d = new Date(ts);
  const pad = n=> String(n).padStart(2,'0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/* ========= API: Scales & Results ========= */
async function apiGetScales(){
  const r = await fetch('/api/scales', { credentials:'same-origin' });
  if(!r.ok) throw new Error('scales_fetch_failed');
  return r.json();
}
// === API: Scales & Results (ต่อจาก apiGetScales) ===
async function apiCreateScale(name){
  const r = await fetch('/api/scales', {
    method:'POST',
    headers:{ 'Content-Type':'application/json' },
    credentials:'same-origin',
    body: JSON.stringify({ name })
  });
  if(!r.ok) throw new Error('scale_create_failed');
  return r.json();
}

async function apiAddScalePoint(scaleId, color, value){
  const r = await fetch(`/api/scales/${scaleId}/points`, {
    method:'POST',
    headers:{ 'Content-Type':'application/json' },
    credentials:'same-origin',
    body: JSON.stringify({ color: String(color).toUpperCase(), value: Number(value) })
  });
  if(!r.ok) throw new Error('add_point_failed');
  return r.json();
}

async function apiClearScalePoints(scaleId){
  const r = await fetch(`/api/scales/${scaleId}/points`, {
    method:'DELETE',
    credentials:'same-origin'
  });
  if(!r.ok) throw new Error('clear_points_failed');
  return r.json();
}

async function apiDeleteScale(scaleId){
  const r = await fetch(`/api/scales/${scaleId}`, {
    method:'DELETE',
    credentials:'same-origin'
  });
  if(!r.ok) throw new Error('delete_scale_failed');
  return r.json();
}

async function apiGetResults(filters = {}){
  const qs = new URLSearchParams(filters);
  const r = await fetch(`/api/results?${qs.toString()}`, { credentials:'same-origin' });
  if(!r.ok) throw new Error('results_fetch_failed');
  return r.json();
}

async function apiAddResult(payload){
  const r = await fetch('/api/results', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    credentials:'same-origin',
    body: JSON.stringify(payload)
  });
  if(!r.ok) throw new Error('add_result_failed');
  return r.json();
}

async function apiClearAllResults(){
  const r = await fetch('/api/results', { method:'DELETE', credentials:'same-origin' });
  if(!r.ok) throw new Error('clear_results_failed');
  return r.json();
}

// === Page Inits ===
// ทำให้หน้า login ใช้งานได้
function initLoginPage(){
  const form = document.getElementById('loginForm');
  const err  = document.getElementById('loginError');
  if(!form) return;
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    err.textContent = '';
    const email    = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;
    const r = await fetch('/api/login', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      credentials:'same-origin',
      body: JSON.stringify({ email, password })
    });
    if(!r.ok){ err.textContent = 'อีเมลหรือรหัสผ่านไม่ถูกต้อง'; return; }
    const next = new URLSearchParams(location.search).get('next') || 'index.html';
    location.replace(next);
  });
}

// ทำให้หน้า register ใช้งานได้
function initRegisterPage(){
  const form = document.getElementById('registerForm');
  const err  = document.getElementById('registerError');
  if(!form) return;
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    err.textContent = '';
    const name      = document.getElementById('regName').value.trim();
    const email     = document.getElementById('regEmail').value.trim().toLowerCase();
    const password  = document.getElementById('regPassword').value;
    const r = await fetch('/api/register', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      credentials:'same-origin',
      body: JSON.stringify({ name, email, password })
    });
    if(!r.ok){
      const data = await r.json().catch(()=>({}));
      err.textContent = data?.error === 'duplicate_email'
        ? 'อีเมลนี้ถูกใช้แล้ว'
        : 'สมัครสมาชิกไม่สำเร็จ';
      return;
    }
    location.replace('index.html');
  });
}

// กัน error ในเพจอื่นๆ ไว้ก่อน (ค่อยเติมฟังก์ชันจริงภายหลัง)
function initAnalysisPage(){ /* TODO: กล้อง/ROI/คำนวณสี */ }
function initReportsPage(){  /* TODO: โหลดกราฟ/ลิสต์ผล */ }
function initCsvPage(){
  // Quick impl. แสดงลิสต์ไฟล์จาก <script id="csv-data" type="application/json">
  const node = document.getElementById('csv-data');
  const list = document.getElementById('csvFileList');
  const btnAll = document.getElementById('downloadAllBtn');
  if(!node || !list) return;
  const files = JSON.parse(node.textContent || '{}');
  list.innerHTML = '';
  Object.entries(files).forEach(([filename, content])=>{
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([content], { type:'text/csv' }));
    a.download = filename;
    a.className = 'btn btn-outline';
    a.textContent = filename;
    list.appendChild(a);
  });
  if(btnAll && window.JSZip){
    btnAll.addEventListener('click', async ()=>{
      const zip = new JSZip();
      Object.entries(files).forEach(([filename, content])=>{
        zip.file(filename, content);
      });
      const blob = await zip.generateAsync({ type:'blob' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'csv.zip';
      a.click();
    });
  }
}

// === Bootstrap ทุกหน้า ===
window.addEventListener('DOMContentLoaded', async ()=>{
  setupCommon();
  await setupAuthUI();
  const page = document.body.getAttribute('data-page');
  if(page === 'login')    initLoginPage();
  if(page === 'register') initRegisterPage();
  if(page === 'analysis') initAnalysisPage();
  if(page === 'reports')  initReportsPage();
  if(page === 'csv')      initCsvPage();
});
