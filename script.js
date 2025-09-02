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
  const r = await fetch('/api/me');
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
        await fetch('/api/logout', { method:'POST' });
        location.href = 'index.html';
      };
    }
  }else{
    if(loginLink) loginLink.style.display = '';
    if(registerLink) registerLink.style.display = '';
    if(logoutBtn) logoutBtn.style.display = 'none';
    if(requiresAuth){
      const next = encodeURIComponent(location.pathname.replace(/^\//,''));
      location.href = `login.html?next=${next}`;
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
  const r = await fetch('/api/scales');
  if(!r.ok) throw new Error('scales_fetch_failed');
  return r.json();
}
async function apiCreateScale(name){
  const r = await fetch('/api/scales', {
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ name })
  });
  if(!r.ok) throw new Error('create_scale_failed');
  return r.json();
}
async function apiAddScalePoint(id, color, value){
  const r = await fetch(`/api/scales/${id}/points`, {
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ color, value })
  });
  if(!r.ok) throw new Error('add_point_failed');
}
async function apiClearScalePoints(id){
  const r = await fetch(`/api/scales/${id}/points`, { method:'DELETE' });
  if(!r.ok) throw new Error('clear_points_failed');
}
async function apiDeleteScale(id){
  const r = await fetch(`/api/scales/${id}`, { method:'DELETE' });
  if(!r.ok) throw new Error('delete_scale_failed');
}

async function apiGetResults({ reagent='', sample='' }={}){
  const q = new URLSearchParams();
  if(reagent) q.set('reagent', reagent);
  if(sample) q.set('sample', sample);
  const r = await fetch(`/api/results?${q.toString()}`);
  if(!r.ok) throw new Error('results_fetch_failed');
  return r.json();
}
async function apiAddResult(payload){
  const r = await fetch('/api/results', {
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify(payload)
  });
  if(!r.ok) throw new Error('add_result_failed');
  return r.json();
}
async function apiClearResults(){
  const r = await fetch('/api/results', { method:'DELETE' });
  if(!r.ok) throw new Error('clear_results_failed');
}

/* ========= Analysis Page ========= */
function initAnalysis(){
  const video = document.getElementById('video');
  const frameCanvas = document.getElementById('frameCanvas');
  const roiCanvas = document.getElementById('roiCanvas');
  const ctx = frameCanvas.getContext('2d');
  const roiCtx = roiCanvas.getContext('2d');

  const btnStart = document.getElementById('startCamBtn');
  const btnStop = document.getElementById('stopCamBtn');
  const btnAnalyze = document.getElementById('analyzeBtn');
  const btnSave = document.getElementById('saveResultBtn');

  const avgText = document.getElementById('avgColorText');
  const swatch = document.getElementById('avgColorSwatch');
  const estText = document.getElementById('estimateText');

  const sampleInput = document.getElementById('sampleInput');
  const reagentSelect = document.getElementById('reagentSelect');

  const newScaleName = document.getElementById('newScaleName');
  const addScaleBtn = document.getElementById('addScaleBtn');
  const scaleColor = document.getElementById('scaleColor');
  const scaleValue = document.getElementById('scaleValue');
  const addPointBtn = document.getElementById('addPointBtn');
  const clearPointsBtn = document.getElementById('clearPointsBtn');
  const editScaleSelect = document.getElementById('editScaleSelect');
  const saveScaleBtn = document.getElementById('saveScaleBtn');
  const deleteScaleBtn = document.getElementById('deleteScaleBtn');
  const scalePreview = document.getElementById('scalePreview');

  let stream = null, animId = null;
  let drawing = false;
  let roi = {x: 0, y: 0, w: 0, h: 0};
  let lastAvgHex = null, lastEstimate = null;

  // fit HiDPI
  function fitCanvas(){
    const rect = frameCanvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    [frameCanvas, roiCanvas].forEach(c=>{
      c.width = Math.round(rect.width * dpr);
      c.height = Math.round(rect.height * dpr);
      c.style.width = rect.width + 'px';
      c.style.height = rect.height + 'px';
    });
  }
  fitCanvas(); window.addEventListener('resize', fitCanvas);

  // Load scales
  let SCALES = [];
  let activeScaleId = null;
  async function refreshScalesUI(){
    SCALES = await apiGetScales();
    reagentSelect.innerHTML = '';
    editScaleSelect.innerHTML = '';
    for(const s of SCALES){
      const o1 = document.createElement('option'); o1.value = s.id; o1.textContent = s.name; reagentSelect.appendChild(o1);
      const o2 = document.createElement('option'); o2.value = s.id; o2.textContent = s.name; editScaleSelect.appendChild(o2);
    }
    if(SCALES.length){
      activeScaleId = SCALES[0].id;
      reagentSelect.value = String(activeScaleId);
      editScaleSelect.value = String(activeScaleId);
      renderScalePreviewById(activeScaleId);
    }
  }
  function renderScalePreviewById(id){
    const s = SCALES.find(x=>x.id===Number(id));
    const lines = (s?.points||[]).map(p=>`- ${p.value}: ${p.color}`);
    scalePreview.textContent = `${s?.name || '(no scale)'}\n${lines.join('\n') || '(empty)'}`;
  }

  refreshScalesUI().catch(()=> alert('โหลดสเกลไม่สำเร็จ'));

  // Camera
  async function startCam(){
    try{
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
      video.srcObject = stream;
      video.style.display = 'block';
      loop();
    }catch(e){
      alert('ไม่สามารถเปิดกล้องได้: ' + e.message);
    }
  }
  function stopCam(){
    if(stream){ stream.getTracks().forEach(t=>t.stop()); stream = null; }
    video.srcObject = null;
    video.style.display = 'none';
    if(animId) cancelAnimationFrame(animId);
  }
  function loop(){
    if(!video.videoWidth){ animId = requestAnimationFrame(loop); return; }
    const w = frameCanvas.width, h = frameCanvas.height;
    ctx.drawImage(video, 0, 0, w, h);
    roiCtx.clearRect(0,0,roiCanvas.width, roiCanvas.height);
    if(roi.w>2 && roi.h>2){
      const dpr = window.devicePixelRatio || 1;
      roiCtx.strokeStyle = 'rgba(255,255,255,.9)';
      roiCtx.lineWidth = Math.max(2, 2*dpr);
      roiCtx.strokeRect(roi.x*dpr, roi.y*dpr, roi.w*dpr, roi.h*dpr);
      roiCtx.fillStyle = 'rgba(37,99,235,.25)';
      roiCtx.fillRect(roi.x*dpr, roi.y*dpr, roi.w*dpr, roi.h*dpr);
    }
    animId = requestAnimationFrame(loop);
  }

  btnStart.addEventListener('click', startCam);
  btnStop.addEventListener('click', stopCam);

  // ROI draw
  function pointer(e){
    const rect = roiCanvas.getBoundingClientRect();
    const x = (e.touches? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches? e.touches[0].clientY : e.clientY) - rect.top;
    return {x: clamp(x,0,rect.width), y: clamp(y,0,rect.height)};
  }
  roiCanvas.addEventListener('pointerdown', e=>{ drawing=true; const p=pointer(e); roi.x=p.x; roi.y=p.y; roi.w=0; roi.h=0; });
  roiCanvas.addEventListener('pointermove', e=>{
    if(!drawing) return; const p=pointer(e);
    roi.w = p.x - roi.x; roi.h = p.y - roi.y;
    if(roi.w<0){ roi.x += roi.w; roi.w = -roi.w; }
    if(roi.h<0){ roi.y += roi.h; roi.h = -roi.h; }
  });
  window.addEventListener('pointerup', ()=>{ drawing=false; });

  // Analyze
  function estimateFromScale(hex, scale){
    if(!scale || !scale.points?.length) return null;
    const rgb = hexToRgb(hex);
    let best = {d: Infinity, v: null};
    for(const p of scale.points){
      const d = colorDistance(rgb, hexToRgb(p.color));
      if(d < best.d){ best = {d, v: p.value}; }
    }
    return best.v;
  }

  btnAnalyze.addEventListener('click', ()=>{
    if(roi.w<3 || roi.h<3){ alert('กรุณาเลือก ROI ก่อน'); return; }
    const avg = avgColorInRect(ctx, roi.x, roi.y, roi.w, roi.h);
    const hex = rgbToHex(avg.r, avg.g, avg.b);
    lastAvgHex = hex;
    swatch.style.background = hex;
    avgText.textContent = hex;

    const scale = SCALES.find(s=>String(s.id)===String(reagentSelect.value));
    lastEstimate = estimateFromScale(hex, scale);
    estText.textContent = (lastEstimate==null? '-' : `${lastEstimate}`);
    btnSave.disabled = (lastEstimate==null);
  });

  // Save result -> DB
  btnSave.addEventListener('click', async ()=>{
    const name = (sampleInput.value || '').trim() || 'Untitled';
    const scale = SCALES.find(s=>String(s.id)===String(reagentSelect.value));
    const snap = frameCanvas.toDataURL('image/png');
    try{
      await apiAddResult({
        sample: name,
        reagent: scale?.name || 'Unknown',
        avgHex: lastAvgHex,
        estimate: lastEstimate,
        snapshot: snap
      });
      btnSave.disabled = true;
      alert('บันทึกแล้ว');
    }catch{
      alert('บันทึกไม่สำเร็จ');
    }
  });

  // Scales editor
  function refreshEditorFrom(id){
    editScaleSelect.value = String(id);
    renderScalePreviewById(id);
  }

  addScaleBtn.addEventListener('click', async ()=>{
    const name = (newScaleName.value||'').trim();
    if(!name){ alert('ใส่ชื่อสเกล'); return; }
    try{
      const { id } = await apiCreateScale(name);
      await refreshScalesUI();
      refreshEditorFrom(id);
      reagentSelect.value = String(id);
      newScaleName.value = '';
    }catch(e){
      alert('เพิ่มสเกลไม่สำเร็จ (อาจชื่อซ้ำ)');
    }
  });

  addPointBtn.addEventListener('click', async ()=>{
    const id = Number(editScaleSelect.value);
    const col = scaleColor.value;
    const val = Number(scaleValue.value);
    if(Number.isNaN(val)){ alert('กรุณาใส่ค่าตัวเลข'); return; }
    try{
      await apiAddScalePoint(id, col, val);
      await refreshScalesUI();
      refreshEditorFrom(id);
      scaleValue.value='';
    }catch{
      alert('เพิ่มจุดไม่สำเร็จ');
    }
  });

  clearPointsBtn.addEventListener('click', async ()=>{
    const id = Number(editScaleSelect.value);
    if(!confirm('ล้างจุดทั้งหมดของสเกลนี้?')) return;
    try{
      await apiClearScalePoints(id);
      await refreshScalesUI();
      refreshEditorFrom(id);
    }catch{
      alert('ล้างจุดไม่สำเร็จ');
    }
  });

  saveScaleBtn.addEventListener('click', async ()=>{
    // points ถูกบันทึกแบบทีละจุดแล้ว ปุ่มนี้แค่ refresh UI ให้ผู้ใช้มั่นใจ
    await refreshScalesUI();
    alert('บันทึกสเกลแล้ว');
  });

  deleteScaleBtn.addEventListener('click', async ()=>{
    const id = Number(editScaleSelect.value);
    const s = SCALES.find(x=>x.id===id);
    if(!confirm(`ลบสเกล "${s?.name||id}" ?`)) return;
    try{
      await apiDeleteScale(id);
      await refreshScalesUI();
      if(SCALES[0]) refreshEditorFrom(SCALES[0].id);
    }catch{
      alert('ลบสเกลไม่สำเร็จ');
    }
  });

  editScaleSelect.addEventListener('change', ()=> renderScalePreviewById(Number(editScaleSelect.value)));

  // Cleanup
  window.addEventListener('beforeunload', stopCam);
}

/* ========= Reports Page ========= */
function initReports(){
  const filterReagent = document.getElementById('filterReagent');
  const filterSample = document.getElementById('filterSample');
  const applyBtn = document.getElementById('applyFiltersBtn');
  const resetBtn = document.getElementById('resetFiltersBtn');
  const dlBtn = document.getElementById('downloadReportBtn');
  const clearBtn = document.getElementById('clearHistoryBtn');
  const list = document.getElementById('nitrateReports');
  let chart = null;

  function unique(arr){ return [...new Set(arr)]; }

  async function buildFilters(){
    const rows = await apiGetResults({});
    const reagents = unique(rows.map(r=>r.reagent).filter(Boolean)).sort();
    filterReagent.innerHTML = `<option value="">${I18N[getLang()].all}</option>` + reagents.map(r=>`<option value="${r}">${r}</option>`).join('');
  }
  function renderList(rows){
    list.innerHTML = '';
    if(!rows.length){
      const div = document.createElement('div');
      div.className = 'item';
      div.textContent = '— ไม่มีข้อมูล —';
      list.appendChild(div);
      return;
    }
    rows.forEach(r=>{
      const div = document.createElement('div');
      div.className = 'item';
      div.innerHTML = `
        <div><strong>${r.sample}</strong> <span class="badge">${r.reagent}</span></div>
        <div>${formatDateTime(r.ts)}</div>
        <div>${I18N[getLang()].label_color}: <span class="badge">${r.avgHex}</span></div>
        <div>${I18N[getLang()].label_estimate}: <strong>${r.estimate==null?'-':r.estimate}</strong></div>
      `;
      list.appendChild(div);
    });
  }
  function renderChart(rows){
    const el = document.getElementById('trendChart');
    if(!el || typeof Chart==='undefined') return;
    const data = rows.filter(r=>r.estimate!=null).map(r=>({x: r.ts, y: r.estimate}));
    if(chart){ chart.destroy(); chart=null; }
    chart = new Chart(el.getContext('2d'), {
      type: 'line',
      data: { datasets: [{ label: 'ppm', data, tension: .25 }] },
      options:{
        responsive: true,
        parsing: false,
        scales: {
          x: { type: 'time', time: { unit: 'day' } },
          y: { beginAtZero: true }
        }
      }
    });
  }
  async function apply(){
    const reagent = filterReagent.value||'';
    const sample = filterSample.value||'';
    const rows = await apiGetResults({ reagent, sample });
    renderList(rows);
    renderChart(rows);
  }
  function downloadCSVRows(rows){
    const header = ['id','timestamp','datetime','sample','reagent','avg_hex','estimate_ppm'];
    const lines = [header.join(',')];
    rows.forEach(r=>{
      lines.push([r.id, r.ts, formatDateTime(r.ts), `"${String(r.sample||'').replace(/"/g,'""')}"`, `"${String(r.reagent||'').replace(/"/g,'""')}"`, r.avgHex, (r.estimate==null?'':r.estimate)].join(','));
    });
    const blob = new Blob([lines.join('\n')], {type:'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'labcam_reports.csv';
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  }

  buildFilters().then(apply);

  applyBtn.addEventListener('click', apply);
  resetBtn.addEventListener('click', ()=>{ filterReagent.value=''; filterSample.value=''; apply(); });
  dlBtn.addEventListener('click', async ()=>{
    const rows = await apiGetResults({ reagent: filterReagent.value||'', sample: filterSample.value||'' });
    downloadCSVRows(rows);
  });
  clearBtn.addEventListener('click', async ()=>{
    if(!confirm('ล้างประวัติทั้งหมด?')) return;
    await apiClearResults();
    await buildFilters(); await apply();
  });
}

/* ========= CSV Vault ========= */
function initCSV(){
  const list = document.getElementById('csvFileList');
  const dataEl = document.getElementById('csv-data');
  const downloadAllBtn = document.getElementById('downloadAllBtn');
  if(!dataEl){ list.textContent = 'ไม่พบข้อมูลไฟล์'; return; }

  let files = {};
  try{ files = JSON.parse(dataEl.textContent); }catch{ files = {}; }

  function createFileCard(name, text){
    const card = document.createElement('div'); card.className = 'card';
    const bytes = new TextEncoder().encode(text).length;
    const prettySize = `${(bytes/1024).toFixed(1)} KB`;
    card.innerHTML = `
      <h4>${name}</h4>
      <p class="muted">${prettySize}</p>
      <div class="actions"><button class="btn btn-outline">ดาวน์โหลด</button></div>
    `;
    card.querySelector('button').addEventListener('click', ()=> downloadOne(name, text));
    return card;
  }
  function downloadOne(name, text){
    const blob = new Blob([text], {type:'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  }
  function downloadAllZip(){
    if(typeof JSZip === 'undefined'){
      // fallback: ดาวน์โหลดทีละไฟล์
      Object.entries(files).forEach(([n,t],i)=> setTimeout(()=> downloadOne(n,t), i*300));
      return;
    }
    const zip = new JSZip();
    Object.entries(files).forEach(([n,t])=> zip.file(n, t));
    zip.generateAsync({type:'blob'}).then(blob=>{
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = 'csv_vault.zip';
      document.body.appendChild(a); a.click(); a.remove();
      URL.revokeObjectURL(url);
    });
  }

  list.innerHTML = '';
  Object.entries(files).forEach(([n,t])=> list.appendChild(createFileCard(n,t)));
  downloadAllBtn.addEventListener('click', downloadAllZip);
}

/* ========= Login/Register ========= */
function getQueryParam(name){
  const u = new URL(location.href);
  return u.searchParams.get(name);
}
function initLogin(){
  const form = document.getElementById('loginForm');
  const email = document.getElementById('loginEmail');
  const pass = document.getElementById('loginPassword');
  const err = document.getElementById('loginError');
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    err.textContent = '';
    const r = await fetch('/api/login', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ email: email.value, password: pass.value })
    });
    if(r.ok){
      const next = getQueryParam('next') || 'analysis.html';
      location.href = next;
    }else{
      const j = await r.json().catch(()=>({}));
      err.textContent = j.error || 'เข้าสู่ระบบไม่สำเร็จ';
    }
  });
}
function initRegister(){
  const form = document.getElementById('registerForm');
  const name = document.getElementById('regName');
  const email = document.getElementById('regEmail');
  const pass = document.getElementById('regPassword');
  const err = document.getElementById('registerError');
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    err.textContent = '';
    const r = await fetch('/api/register', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ name: name.value, email: email.value, password: pass.value })
    });
    if(r.ok){
      location.href = 'analysis.html';
    }else{
      const j = await r.json().catch(()=>({}));
      err.textContent = j.error || 'สมัครสมาชิกไม่สำเร็จ';
    }
  });
}

/* ========= Boot ========= */
document.addEventListener('DOMContentLoaded', async ()=>{
  setupCommon();
  await setupAuthUI();

  const page = document.body.getAttribute('data-page');
  if(page==='analysis') initAnalysis();
  else if(page==='reports') initReports();
  else if(page==='csv') initCSV();
  else if(page==='login') initLogin();
  else if(page==='register') initRegister();
});