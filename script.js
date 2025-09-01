// ================== Globals & Boot ==================
let CURRENT_LANG = "en";
let CURRENT_CHART = null;

// Keys
const HISTORY_KEY = "nitrateHistory";
const CUSTOM_SCALES_KEY = "nitrateCustomScales";
const SELECTED_SCALE_KEY = "selectedScale";

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  // Footer Year
  const yearSpan = document.getElementById("currentYear");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Language Toggle
  const langBtn = document.getElementById("languageToggle");
  if (langBtn) {
    let isThai = false;
    langBtn.addEventListener("click", () => {
      isThai = !isThai;
      CURRENT_LANG = isThai ? "th" : "en";
      applyLanguage(CURRENT_LANG);
      langBtn.textContent = isThai ? "English" : "ภาษาไทย";
      if (document.getElementById("nitrateReports")) renderHistory(); // re-render table headers
      if (document.getElementById("trendChart")) renderChart();       // re-render chart axes labels
    });
  }

  // Init pages
  setupAnalysisPage();
  setupReportsPage();
});

// Sidebar toggle
function toggleMenu(){
  const list = document.querySelector(".navbar ul");
  if (list) list.classList.toggle("active");
}

// ================== i18n ==================
const i18n = {
  en: {
    headerText_home: "Welcome to the AI Color & Nitrate Detector",
    welcomeText: "Welcome to the AI Color & Nitrate Detection System",
    descriptionText: "This system helps you analyze colors and detect nitrate levels in various samples using AI for accurate, reliable results.",
    featuresText: "Features include:",
    feature1: "Real-time color detection",
    feature2: "Nitrate level analysis",
    feature3: "Comprehensive reports",
    feature4: "Customizable settings",

    headerText_analysis: "Color & Nitrate Analysis",
    analysisTitle: "Analyze a Sample",
    analysisDesc: "Upload an image or capture from camera. Then enter the reagent and scale. Choose ROI and sampling resolution. We'll detect the dominant color and estimate nitrate level.",
    samplePlaceholder: "Sample name (optional)",
    reagentPlaceholder: "Enter reagent used",
    saveResultBtnText: "Save Result",
    analyzeBtnText: "Analyze",
    roiLabel: "ROI",
    samplingLabel: "Sampling step",

    headerText_reports: "Reports and Nitrate Levels",
    reportsTitle: "Reports on Nitrate Levels",
    reportsOverview: "Browse comprehensive reports on nitrate levels detected in your samples. Use this information for quality control and trend analysis.",
    detailedReportTitle: "Detailed Report",
    detailedReportDesc: "Download a CSV summary of filtered analyses.",
    downloadReportBtnText: "Download Report (CSV)",
    clearHistoryBtnText: "Clear History",
    historicalDataTitle: "Historical Data",
    historicalDataDesc: "Review historical data to track changes over time.",
    nitrateValuePrefix: "Nitrate Level: ",
    colorValuePrefix: "Color: ",
    noHistoryText: "No history yet.",
    tableHeaders: ["Date", "Sample", "Reagent/Scale", "Color", "RGB", "Nitrate (ppm)"],
    filters: { reagent: "Reagent/Scale", sample: "Sample", apply: "Apply Filters", reset: "Reset" },
    scales: { manage: "Manage Scales", add: "Add/Replace Scale", export: "Export Custom Scales", del: "Delete Scale", close: "Close" },
    roiFull: "Full Image", roiCenter: "Center Crop", roiDraw: "Draw Rect"
  },
  th: {
    headerText_home: "ยินดีต้อนรับสู่ระบบตรวจจับสีและไนเตรตด้วย AI",
    welcomeText: "ยินดีต้อนรับสู่ระบบวิเคราะห์สีและตรวจหาไนเตรต",
    descriptionText: "ระบบนี้ช่วยวิเคราะห์สีและตรวจหาไนเตรตในตัวอย่างต่าง ๆ ด้วย AI เพื่อผลลัพธ์ที่แม่นยำและเชื่อถือได้",
    featuresText: "ฟีเจอร์:",
    feature1: "ตรวจจับสีแบบเรียลไทม์",
    feature2: "วิเคราะห์ระดับไนเตรต",
    feature3: "รายงานผลแบบละเอียด",
    feature4: "ตั้งค่าการทำงานได้",

    headerText_analysis: "การวิเคราะห์สีและไนเตรต",
    analysisTitle: "วิเคราะห์ตัวอย่าง",
    analysisDesc: "อัปโหลดรูปภาพหรือถ่ายจากกล้อง ระบุรีเอเจนต์/สเกล เลือกพื้นที่วิเคราะห์ (ROI) และความละเอียดการสุ่ม เพื่อคำนวนค่าไนเตรต",
    samplePlaceholder: "ชื่อสิ่งตัวอย่าง (ใส่หรือไม่ก็ได้)",
    reagentPlaceholder: "กรอกชื่อรีเอเจนต์",
    saveResultBtnText: "บันทึกผล",
    analyzeBtnText: "วิเคราะห์",
    roiLabel: "พื้นที่วิเคราะห์ (ROI)",
    samplingLabel: "ช่วงพิกเซลที่สุ่ม (Sampling step)",

    headerText_reports: "รายงานและระดับไนเตรต",
    reportsTitle: "รายงานข้อมูลระดับไนเตรต",
    reportsOverview: "ดูรายงานสรุประดับไนเตรตที่ตรวจพบในตัวอย่าง เพื่อใช้ควบคุมคุณภาพและวิเคราะห์แนวโน้ม",
    detailedReportTitle: "รายงานแบบละเอียด",
    detailedReportDesc: "ดาวน์โหลดไฟล์ CSV จากข้อมูลที่คัดกรองแล้ว",
    downloadReportBtnText: "ดาวน์โหลดรายงาน (CSV)",
    clearHistoryBtnText: "ล้างประวัติ",
    historicalDataTitle: "ข้อมูลย้อนหลัง",
    historicalDataDesc: "ทบทวนข้อมูลย้อนหลังเพื่อติดตามความเปลี่ยนแปลง",
    nitrateValuePrefix: "ระดับไนเตรต: ",
    colorValuePrefix: "สี: ",
    noHistoryText: "ยังไม่มีประวัติ",
    tableHeaders: ["วันที่", "ตัวอย่าง", "รีเอเจนต์/สเกล", "สี", "RGB", "ไนเตรต (ppm)"],
    filters: { reagent: "รีเอเจนต์/สเกล", sample: "ตัวอย่าง", apply: "ใช้ตัวกรอง", reset: "รีเซ็ต" },
    scales: { manage: "จัดการสเกล", add: "เพิ่ม/แทนที่สเกล", export: "ส่งออกสเกล", del: "ลบสเกล", close: "ปิด" },
    roiFull: "ทั้งภาพ", roiCenter: "กึ่งกลาง", roiDraw: "ลากกรอบ"
  }
};

function applyLanguage(lang){
  const map = i18n[lang] || i18n.en;
  setText("headerText", map.headerText_home) || setText("headerText", map.headerText_analysis) || setText("headerText", map.headerText_reports);

  // Home
  setText("welcomeText", map.welcomeText);
  setText("descriptionText", map.descriptionText);
  setText("featuresText", map.featuresText);
  setText("feature1", map.feature1);
  setText("feature2", map.feature2);
  setText("feature3", map.feature3);
  setText("feature4", map.feature4);

  // Analysis labels/placeholders/buttons
  setText("analysisTitle", map.analysisTitle);
  setText("analysisDesc", map.analysisDesc);
  setPlaceholder("sampleInput", map.samplePlaceholder);
  setPlaceholder("reagentInput", map.reagentPlaceholder);
  setText("saveResultBtn", map.saveResultBtnText);
  setText("analyzeBtn", map.analyzeBtnText);

  // Reports
  setText("reportsTitle", map.reportsTitle);
  setText("reportsOverview", map.reportsOverview);
  setText("detailedReportTitle", map.detailedReportTitle);
  setText("detailedReportDesc", map.detailedReportDesc);
  setText("downloadReportBtn", map.downloadReportBtnText);
  setText("clearHistoryBtn", map.clearHistoryBtnText);
  setText("historicalDataTitle", map.historicalDataTitle);
  setText("historicalDataDesc", map.historicalDataDesc);

  // Filters
  setLabelText("filterReagent", map.filters.reagent);
  setLabelText("filterSample", map.filters.sample);
  setText("applyFiltersBtn", map.filters.apply);
  setText("resetFiltersBtn", map.filters.reset);

  // Dynamic readouts
  const nitrate = document.getElementById("nitrateValue");
  if (nitrate){
    const value = nitrate.dataset.value ?? "N/A";
    nitrate.textContent = map.nitrateValuePrefix + value;
  }
  const color = document.getElementById("colorValue");
  if (color){
    const value = color.dataset.value ?? "N/A";
    color.textContent = map.colorValuePrefix + value;
  }
}

function setText(id, text){
  const el = document.getElementById(id);
  if (el && typeof text === "string"){ el.textContent = text; return true; }
  return false;
}
function setPlaceholder(id, text){
  const el = document.getElementById(id);
  if (el && typeof text === "string"){ el.setAttribute("placeholder", text); return true; }
  return false;
}
function setLabelText(forId, text){
  const labels = document.querySelectorAll(`label[for="${forId}"]`);
  labels.forEach(l => l.textContent = text);
}

// ================== Calibration (Multi-Scale) ==================
const BUILTIN_SCALES = {
  "NCF Standard": [
    { ppm: 0,   hex: "#FFF86A" },
    { ppm: 10,  hex: "#FFD24D" },
    { ppm: 20,  hex: "#FFB347" },
    { ppm: 40,  hex: "#FF7F50" },
    { ppm: 80,  hex: "#FF4C4C" },
    { ppm: 160, hex: "#B22222" }
  ],
  "Low Range (0–50)": [
    { ppm: 0,  hex: "#FFFACD" },
    { ppm: 5,  hex: "#FFE08A" },
    { ppm: 10, hex: "#FFC857" },
    { ppm: 20, hex: "#FFA552" },
    { ppm: 35, hex: "#FF7E6A" },
    { ppm: 50, hex: "#FF5C5C" }
  ],
  "Wide Range (0–200)": [
    { ppm: 0,   hex: "#FCFDD4" },
    { ppm: 25,  hex: "#FFE48A" },
    { ppm: 50,  hex: "#FFC658" },
    { ppm: 100, hex: "#FF8B58" },
    { ppm: 150, hex: "#FF5A5A" },
    { ppm: 200, hex: "#C92A2A" }
  ],
  "Griess Pink Variant": [
    { ppm: 0,   hex: "#FFF0F6" },
    { ppm: 10,  hex: "#FFD2E1" },
    { ppm: 20,  hex: "#FFB3CC" },
    { ppm: 40,  hex: "#FF8AB0" },
    { ppm: 80,  hex: "#FF5C93" },
    { ppm: 160, hex: "#D72657" }
  ]
};

function loadCustomScales(){
  try{ return JSON.parse(localStorage.getItem(CUSTOM_SCALES_KEY) || "{}"); }
  catch{ return {}; }
}
function saveCustomScales(obj){
  localStorage.setItem(CUSTOM_SCALES_KEY, JSON.stringify(obj || {}));
}
function getAllScales(){
  return { ...BUILTIN_SCALES, ...loadCustomScales() };
}

function buildScaleSelect(){
  const select = document.getElementById("scaleSelect");
  if (!select) return;
  const all = getAllScales();
  const selected = localStorage.getItem(SELECTED_SCALE_KEY) || "NCF Standard";
  select.innerHTML = "";
  Object.keys(all).forEach(name => {
    const opt = document.createElement("option");
    opt.value = name; opt.textContent = name;
    if (name === selected) opt.selected = true;
    select.appendChild(opt);
  });
}

function estimateNitrateFromColor(hex, scaleName){
  const scale = getAllScales()[scaleName] || BUILTIN_SCALES["NCF Standard"];
  const lab = rgbToLab(hexToRgb(hex));
  const ranked = scale
    .map(e => ({...e, d: deltaE76(lab, rgbToLab(hexToRgb(e.hex)))}))
    .sort((a,b)=>a.d-b.d);
  const best = ranked[0];
  const next = ranked[1] || best;
  if (best.d < 1) return best.ppm;
  const w1 = 1/Math.max(1e-6, best.d);
  const w2 = 1/Math.max(1e-6, next.d);
  return Math.round((best.ppm*w1 + next.ppm*w2)/(w1+w2));
}

// Color conversions
function hexToRgb(hex){
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if(!m) return {r:0,g:0,b:0};
  return { r: parseInt(m[1],16), g: parseInt(m[2],16), b: parseInt(m[3],16) };
}
function srgbToLinear(c){ c/=255; return (c<=0.04045)? c/12.92 : Math.pow((c+0.055)/1.055, 2.4); }
function rgbToXyz({r,g,b}){
  const R=srgbToLinear(r), G=srgbToLinear(g), B=srgbToLinear(b);
  const X = R*0.4124564 + G*0.3575761 + B*0.1804375;
  const Y = R*0.2126729 + G*0.7151522 + B*0.0721750;
  const Z = R*0.0193339 + G*0.1191920 + B*0.9503041;
  return {X, Y, Z};
}
function xyzToLab({X,Y,Z}){
  const Xn=0.95047, Yn=1.00000, Zn=1.08883;
  function f(t){ return t>0.008856 ? Math.cbrt(t) : (7.787*t + 16/116); }
  const fx=f(X/Xn), fy=f(Y/Yn), fz=f(Z/Zn);
  const L = (Y/Yn>0.008856)? 116*Math.cbrt(Y/Yn)-16 : 903.3*(Y/Yn);
  const a = 500*(fx - fy);
  const b = 200*(fy - fz);
  return {L,a,b};
}
function rgbToLab(rgb){ return xyzToLab(rgbToXyz(rgb)); }
function deltaE76(l1, l2){ const dL=l1.L-l2.L, da=l1.a-l2.a, db=l1.b-l2.b; return Math.sqrt(dL*dL+da*da+db*db); }

// ================== History ==================
function getHistory(){
  try{ return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]"); }
  catch{ return []; }
}
function setHistory(arr){ localStorage.setItem(HISTORY_KEY, JSON.stringify(arr)); }
function addHistory(entry){ const arr=getHistory(); arr.unshift(entry); setHistory(arr); }

// ================== Analysis Page ==================
function setupAnalysisPage(){
  const fileInput      = document.getElementById("fileInput");
  const captureBtn     = document.getElementById("captureFromCamera");
  const stopBtn        = document.getElementById("stopCamera");
  const analyzeBtn     = document.getElementById("analyzeBtn");
  const saveBtn        = document.getElementById("saveResultBtn");

  const video          = document.getElementById("video");
  const canvas         = document.getElementById("canvas");
  const roiCanvas      = document.getElementById("roiCanvas");
  const canvasWrap     = document.getElementById("canvasWrap");
  const preview        = document.getElementById("preview");

  const sampleInput    = document.getElementById("sampleInput");
  const reagentInput   = document.getElementById("reagentInput");
  const scaleSelect    = document.getElementById("scaleSelect");
  const manageScalesBtn= document.getElementById("manageScalesBtn");

  const sampleStep     = document.getElementById("sampleStep");
  const sampleStepVal  = document.getElementById("sampleStepVal");
  const roiRadios      = document.querySelectorAll('input[name="roiMode"]');

  const colorBox       = document.getElementById("colorBox");
  const colorValue     = document.getElementById("colorValue");
  const nitrateValue   = document.getElementById("nitrateValue");

  if (!canvas || !roiCanvas) return; // not on analysis page

  // Build scales
  buildScaleSelect();
  scaleSelect?.addEventListener("change", () => {
    localStorage.setItem(SELECTED_SCALE_KEY, scaleSelect.value);
  });

  // ROI state
  let stream = null;
  let roiMode = "full";
  let drawing = false;
  let roiRect = null; // {x,y,w,h}
  syncRoiCanvasSize();

  // ROI radio change
  roiRadios.forEach(r => {
    r.addEventListener("change", () => {
      roiMode = document.querySelector('input[name="roiMode"]:checked').value;
      drawOverlay();
    });
  });

  // Sampling step UI
  if (sampleStep && sampleStepVal){
    sampleStep.addEventListener("input", ()=> sampleStepVal.textContent = `${sampleStep.value} px`);
    sampleStepVal.textContent = `${sampleStep.value} px`;
  }

  // Manage scales modal
  setupScaleModal();

  // Camera
  async function startCamera(){
    try{
      stream = await navigator.mediaDevices.getUserMedia({video:true, audio:false});
      video.style.display = "block";
      preview.style.display = "none";
      canvasWrap.style.display = "none";
      video.srcObject = stream;
    }catch(err){
      alert("Camera access failed: " + err.message);
    }
  }
  function stopCamera(){
    if (stream){ for (const t of stream.getTracks()) t.stop(); stream=null; }
    video.style.display = "none";
  }

  captureBtn?.addEventListener("click", startCamera);
  stopBtn?.addEventListener("click", stopCamera);

  // File upload
  fileInput?.addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    preview.src = url;
    preview.onload = () => URL.revokeObjectURL(url);
    preview.style.display = "block";
    // draw to canvas
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width; canvas.height = img.height;
      roiCanvas.width = img.width; roiCanvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      canvasWrap.style.display = "inline-block";
      video.style.display = "none";
      drawOverlay();
    };
    img.src = preview.src;
  });

  // Analyze button
  analyzeBtn?.addEventListener("click", () => {
    if (video.style.display === "block" && stream){
      // capture frame
      const ctx = canvas.getContext("2d");
      canvas.width = video.videoWidth || 320;
      canvas.height = video.videoHeight || 240;
      roiCanvas.width = canvas.width; roiCanvas.height = canvas.height;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvasWrap.style.display = "inline-block";
      drawOverlay();
    }
    analyzeCanvas();
  });

  // ROI drawing handlers
  roiCanvas.addEventListener("mousedown", (e) => {
    if (roiMode !== "draw") return;
    drawing = true;
    const {x,y} = getMousePos(roiCanvas, e);
    roiRect = { x, y, w:0, h:0 };
    drawOverlay();
  });
  roiCanvas.addEventListener("mousemove", (e) => {
    if (!drawing || roiMode!=="draw") return;
    const {x,y} = getMousePos(roiCanvas, e);
    roiRect.w = x - roiRect.x;
    roiRect.h = y - roiRect.y;
    drawOverlay();
  });
  window.addEventListener("mouseup", () => {
    if (drawing){
      drawing=false;
      analyzeCanvas(); // auto analyze after selecting ROI
    }
  });

  window.addEventListener("resize", syncRoiCanvasSize);

  function syncRoiCanvasSize(){
    // ensure overlay matches canvas pixel size (handled when we set widths)
    // here only keep CSS size consistent (using attributes already sets drawing buffer)
    roiCanvas.style.width = canvas.style.width;
    roiCanvas.style.height= canvas.style.height;
  }
  function getMousePos(canvasEl, evt){
    const r = canvasEl.getBoundingClientRect();
    return { x: Math.round((evt.clientX - r.left) * (canvasEl.width / r.width)),
             y: Math.round((evt.clientY - r.top)  * (canvasEl.height / r.height)) };
  }
  function drawOverlay(){
    const ctx = roiCanvas.getContext("2d");
    ctx.clearRect(0,0,roiCanvas.width,roiCanvas.height);
    if (roiMode === "draw" && roiRect){
      const x = Math.min(roiRect.x, roiRect.x + roiRect.w);
      const y = Math.min(roiRect.y, roiRect.y + roiRect.h);
      const w = Math.abs(roiRect.w), h = Math.abs(roiRect.h);
      ctx.fillStyle = "rgba(0, 153, 255, 0.18)";
      ctx.fillRect(x,y,w,h);
      ctx.strokeStyle = "#0099ff";
      ctx.lineWidth = 2;
      ctx.strokeRect(x,y,w,h);
    } else if (roiMode === "center"){
      const w = Math.round(canvas.width * 0.5);
      const h = Math.round(canvas.height* 0.5);
      const x = Math.round((canvas.width - w)/2);
      const y = Math.round((canvas.height- h)/2);
      ctx.fillStyle = "rgba(0, 153, 255, 0.15)";
      ctx.fillRect(x,y,w,h);
      ctx.strokeStyle = "#0099ff"; ctx.lineWidth = 2; ctx.strokeRect(x,y,w,h);
    }
  }

  function analyzeCanvas(){
    const ctx = canvas.getContext("2d");
    const { width, height } = canvas;
    if (!width || !height) return;

    // Determine ROI bounds
    let x0=0, y0=0, w=width, h=height;
    if (roiMode === "center"){
      w = Math.round(width * 0.5);
      h = Math.round(height* 0.5);
      x0 = Math.round((width - w)/2);
      y0 = Math.round((height- h)/2);
    } else if (roiMode === "draw" && roiRect){
      const x = Math.min(roiRect.x, roiRect.x + roiRect.w);
      const y = Math.min(roiRect.y, roiRect.y + roiRect.h);
      w = Math.max(1, Math.abs(roiRect.w));
      h = Math.max(1, Math.abs(roiRect.h));
      x0 = Math.max(0, Math.min(width-1, x));
      y0 = Math.max(0, Math.min(height-1, y));
      if (x0 + w > width)  w = width  - x0;
      if (y0 + h > height) h = height - y0;
    }

    const step = parseInt(sampleStep?.value || "10", 10);
    let r=0,g=0,b=0,count=0;
    for (let y=y0; y<y0+h; y+=step){
      for (let x=x0; x<x0+w; x+=step){
        const d = ctx.getImageData(x,y,1,1).data;
        r += d[0]; g += d[1]; b += d[2]; count++;
      }
    }
    if (!count) return;
    r = Math.round(r/count); g = Math.round(g/count); b = Math.round(b/count);
    const hex = "#" + [r,g,b].map(v => v.toString(16).padStart(2,"0")).join("");

    colorBox.style.background = hex;
    colorValue.dataset.value = `${hex} (rgb ${r},${g},${b})`;
    colorValue.textContent = `${i18n[CURRENT_LANG].colorValuePrefix}${colorValue.dataset.value}`;

    const scaleName = (scaleSelect?.value) || "NCF Standard";
    const nitrate = estimateNitrateFromColor(hex, scaleName);
    nitrateValue.dataset.value = `${nitrate} ppm`;
    nitrateValue.textContent = `${i18n[CURRENT_LANG].nitrateValuePrefix}${nitrateValue.dataset.value}`;
  }

  saveBtn?.addEventListener("click", () => {
    const ctext = colorValue?.dataset?.value;
    const ntext = nitrateValue?.dataset?.value;
    if (!ctext || !ntext){
      alert("Please analyze first.");
      return;
    }
    const hexMatch = ctext.match(/#([0-9a-f]{6})/i);
    const rgbMatch = ctext.match(/rgb\s*([0-9]+),\s*([0-9]+),\s*([0-9]+)/i);
    const ppmMatch = ntext.match(/(\d+)\s*ppm/i);
    const hex = hexMatch ? "#" + hexMatch[1] : "";
    const rgb = rgbMatch ? `${rgbMatch[1]},${rgbMatch[2]},${rgbMatch[3]}` : "";
    const ppm = ppmMatch ? parseInt(ppmMatch[1],10) : null;
    const entry = {
      date: new Date().toISOString(),
      sample: (sampleInput?.value?.trim()) || "",
      reagent: (reagentInput?.value?.trim()) || (scaleSelect?.value || ""),
      scale:   (scaleSelect?.value || ""),
      color: hex, rgb, nitrate_ppm: ppm
    };
    addHistory(entry);
    alert("Saved to history.");
  });

  // Modal actions
  function setupScaleModal(){
    const modal = document.getElementById("scaleModalBackdrop");
    const openBtn = manageScalesBtn;
    const close1 = document.getElementById("closeScaleModal");
    const close2 = document.getElementById("closeScaleModal2");
    const addBtn  = document.getElementById("addScaleBtn");
    const exportBtn = document.getElementById("exportScalesBtn");
    const deleteBtn = document.getElementById("deleteScaleBtn");
    const nameInput = document.getElementById("customScaleName");
    const textArea  = document.getElementById("customScaleText");

    function open(){ modal.style.display = "flex"; }
    function close(){ modal.style.display = "none"; }

    openBtn?.addEventListener("click", open);
    close1?.addEventListener("click", close);
    close2?.addEventListener("click", close);
    modal?.addEventListener("click", (e)=>{ if (e.target===modal) close(); });

    addBtn?.addEventListener("click", () => {
      const name = (nameInput.value || "").trim();
      const raw  = (textArea.value || "").trim();
      if (!name || !raw){ alert("Please fill name and data."); return; }
      let data = null;
      try{
        if (raw.trim().startsWith("[")) {
          data = JSON.parse(raw);
        } else {
          // parse CSV  ppm,hex
          const rows = raw.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
          data = rows.map(line => {
            const [ppm, hex] = line.split(/[,\s]+/);
            return { ppm: Number(ppm), hex: hex };
          });
        }
        // basic validation
        if (!Array.isArray(data) || !data.length) throw new Error("Invalid data");
        data.forEach(e => {
          if (typeof e.ppm!=="number" || !/^#?[0-9a-f]{6}$/i.test(e.hex)) throw new Error("Invalid row");
          if (!e.hex.startsWith("#")) e.hex = "#" + e.hex;
        });
      }catch(err){
        alert("Failed to parse data: " + err.message);
        return;
      }
      const custom = loadCustomScales();
      custom[name] = data;
      saveCustomScales(custom);
      buildScaleSelect();
      alert("Scale saved.");
    });

    exportBtn?.addEventListener("click", () => {
      const custom = loadCustomScales();
      const blob = new Blob([JSON.stringify(custom, null, 2)], {type:"application/json"});
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = "custom_scales.json";
      document.body.appendChild(a); a.click();
      document.body.removeChild(a); URL.revokeObjectURL(url);
    });

    deleteBtn?.addEventListener("click", () => {
      const name = (nameInput.value || "").trim();
      if (!name){ alert("Enter scale name to delete."); return; }
      const custom = loadCustomScales();
      if (!(name in custom)){ alert("Scale not found (custom only)."); return; }
      if (confirm(`Delete custom scale "${name}"?`)){
        delete custom[name];
        saveCustomScales(custom);
        buildScaleSelect();
        alert("Scale deleted.");
      }
    });
  }
}

// ================== Reports Page ==================
function setupReportsPage(){
  const container = document.getElementById("nitrateReports");
  if (!container) return; // not on reports page

  // Filters
  const sel = document.getElementById("filterReagent");
  const inp = document.getElementById("filterSample");
  const applyBtn = document.getElementById("applyFiltersBtn");
  const resetBtn = document.getElementById("resetFiltersBtn");
  const dlBtn = document.getElementById("downloadReportBtn");
  const clearBtn = document.getElementById("clearHistoryBtn");

  // Build reagent list
  buildReagentFilter();
  function buildReagentFilter(){
    const hist = getHistory();
    const set = new Set(hist.map(h => h.reagent || h.scale || "Unknown"));
    sel.innerHTML = "";
    const allOpt = document.createElement("option");
    allOpt.value = "__ALL__"; allOpt.textContent = "All Reagents / ทุกรีเอเจนต์";
    sel.appendChild(allOpt);
    Array.from(set).sort().forEach(v => {
      const opt = document.createElement("option");
      opt.value = v; opt.textContent = v;
      sel.appendChild(opt);
    });
  }

  applyBtn?.addEventListener("click", () => { renderHistory(); renderChart(); });
  resetBtn?.addEventListener("click", () => { sel.value="__ALL__"; inp.value=""; renderHistory(); renderChart(); });

  dlBtn?.addEventListener("click", () => {
    const rows = [["Date","Sample","Reagent/Scale","DominantColor","RGB","Nitrate(ppm)"]];
    const data = getFilteredHistory();
    if (data.length){
      for (const h of data){
        rows.push([h.date, h.sample, h.reagent || h.scale || "", h.color, h.rgb, h.nitrate_ppm]);
      }
    } else {
      rows.push([new Date().toISOString(),"","","#000000","","0"]);
    }
    const csv = rows.map(r => r.map(v => `"${String(v ?? "").replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], {type: "text/csv;charset=utf-8;"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "nitrate_report.csv";
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
  });

  clearBtn?.addEventListener("click", () => {
    if (confirm("Clear all history?")) { setHistory([]); renderHistory(); renderChart(); buildReagentFilter(); }
  });

  // Initial render
  renderHistory();
  renderChart();

  function getFilteredHistory(){
    const reagent = sel.value;
    const sampleQ = (inp.value || "").trim().toLowerCase();
    let arr = getHistory();
    if (reagent && reagent!=="__ALL__"){
      arr = arr.filter(h => (h.reagent || h.scale || "") === reagent);
    }
    if (sampleQ){
      arr = arr.filter(h => (h.sample || "").toLowerCase().includes(sampleQ));
    }
    return arr.slice().sort((a,b)=> new Date(a.date) - new Date(b.date));
  }

  // Table
  function renderHistory(){
    const t = i18n[CURRENT_LANG];
    const container = document.getElementById("nitrateReports");
    container.innerHTML = "";
    const data = getFilteredHistory();
    if (!data.length){
      const p = document.createElement("p");
      p.textContent = t.noHistoryText;
      container.appendChild(p);
      return;
    }
    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";
    table.style.background = "#fff";
    table.style.borderRadius = "8px";
    table.style.overflow = "hidden";

    const thead = document.createElement("thead");
    const trh = document.createElement("tr");
    t.tableHeaders.forEach(h => {
      const th = document.createElement("th");
      th.textContent = h;
      th.style.padding = "10px";
      th.style.borderBottom = "1px solid #eee";
      th.style.textAlign = "left";
      trh.appendChild(th);
    });
    thead.appendChild(trh);

    const tbody = document.createElement("tbody");
    data.slice().reverse().forEach(item => { // show latest first in table
      const tr = document.createElement("tr");

      const tdDate = document.createElement("td");
      tdDate.textContent = new Date(item.date).toLocaleString();
      const tdSample = document.createElement("td");
      tdSample.textContent = item.sample || "";
      const tdReagent = document.createElement("td");
      tdReagent.textContent = item.reagent || item.scale || "";

      const tdColor = document.createElement("td");
      const sw = document.createElement("span");
      Object.assign(sw.style, { display:"inline-block", width:"18px", height:"18px", border:"1px solid #ccc", borderRadius:"4px", verticalAlign:"middle", marginRight:"8px", background:item.color || "#eee" });
      tdColor.appendChild(sw);
      const ctext = document.createElement("span");
      ctext.textContent = item.color || "";
      tdColor.appendChild(ctext);

      const tdRGB = document.createElement("td");
      tdRGB.textContent = item.rgb || "";

      const tdPPM = document.createElement("td");
      tdPPM.textContent = (item.nitrate_ppm ?? "") + "";

      [tdDate, tdSample, tdReagent, tdColor, tdRGB, tdPPM].forEach(td => {
        td.style.padding = "10px"; td.style.borderBottom = "1px solid #f3f3f3";
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });

    table.appendChild(thead); table.appendChild(tbody);
    container.appendChild(table);
  }

  // Chart
  function renderChart(){
    const ctx = document.getElementById("trendChart");
    if (!ctx) return;
    if (CURRENT_CHART){ CURRENT_CHART.destroy(); CURRENT_CHART=null; }
    const data = getFilteredHistory();
    const labels = data.map(d => new Date(d.date));
    const series = data.map(d => d.nitrate_ppm ?? null);

    CURRENT_CHART = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: "Nitrate (ppm)",
          data: series,
          pointRadius: 3,
          tension: 0.25
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        parsing: false,
        scales: {
          x: {
            type: "time",
            time: { unit: "day" },
            ticks: { autoSkip: true, maxTicksLimit: 8 }
          },
          y: {
            beginAtZero: true,
            title: { display: true, text: "ppm" }
          }
        },
        plugins: {
          legend: { display: true },
          tooltip: { mode: "index", intersect: false }
        }
      }
    });
  }

  // Expose for re-render elsewhere
  window.renderHistory = renderHistory;
  window.renderChart = renderChart;
}

// ================== Helpers ==================
function toCSV(rows){
  return rows.map(r => r.map(v => `"${String(v ?? "").replace(/"/g,'""')}"`).join(",")).join("\n");
}
