// ---------- Globals ----------
let CURRENT_LANG = "en";

// ---------- Utilities ----------
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
      // Re-render history with localized headers
      if (document.getElementById("nitrateReports")) renderHistory();
    });
  }

  // Page setups
  setupAnalysisPage();
  setupReportsPage();
});

// Hamburger
function toggleMenu(){
  const list = document.querySelector(".navbar ul");
  if (list) list.classList.toggle("active");
}

// ---------- Language ----------
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
    analysisDesc: "Upload an image or capture from camera. Then enter the reagent you used. We'll detect the dominant color and estimate nitrate level.",
    samplePlaceholder: "Sample name (optional)",
    reagentPlaceholder: "Enter reagent used",
    saveResultBtnText: "Save Result",

    headerText_reports: "Reports and Nitrate Levels",
    reportsTitle: "Reports on Nitrate Levels",
    reportsOverview: "Browse comprehensive reports on nitrate levels detected in your samples. Use this information for quality control and trend analysis.",
    detailedReportTitle: "Detailed Report",
    detailedReportDesc: "Download a CSV summary of recent analyses.",
    downloadReportBtnText: "Download Report (CSV)",
    clearHistoryBtnText: "Clear History",
    historicalDataTitle: "Historical Data",
    historicalDataDesc: "Review historical data to track changes over time.",
    nitrateValuePrefix: "Nitrate Level: ",
    colorValuePrefix: "Color: ",
    noHistoryText: "No history yet.",
    tableHeaders: ["Date", "Sample", "Reagent", "Color", "RGB", "Nitrate (ppm)"]
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
    analysisDesc: "อัปโหลดรูปภาพหรือถ่ายจากกล้อง แล้วกรอกชื่อสารรีเอเจนต์ ระบบจะตรวจหาสีเด่นและประมาณระดับไนเตรต",
    samplePlaceholder: "ชื่อสิ่งตัวอย่าง (ใส่หรือไม่ก็ได้)",
    reagentPlaceholder: "กรอกชื่อรีเอเจนต์",
    saveResultBtnText: "บันทึกผล",

    headerText_reports: "รายงานและระดับไนเตรต",
    reportsTitle: "รายงานข้อมูลระดับไนเตรต",
    reportsOverview: "ดูรายงานสรุประดับไนเตรตที่ตรวจพบในตัวอย่าง เพื่อใช้ควบคุมคุณภาพและวิเคราะห์แนวโน้ม",
    detailedReportTitle: "รายงานแบบละเอียด",
    detailedReportDesc: "ดาวน์โหลดไฟล์ CSV สรุปผลการวิเคราะห์ล่าสุด",
    downloadReportBtnText: "ดาวน์โหลดรายงาน (CSV)",
    clearHistoryBtnText: "ล้างประวัติ",
    historicalDataTitle: "ข้อมูลย้อนหลัง",
    historicalDataDesc: "ทบทวนข้อมูลย้อนหลังเพื่อติดตามความเปลี่ยนแปลง",
    nitrateValuePrefix: "ระดับไนเตรต: ",
    colorValuePrefix: "สี: ",
    noHistoryText: "ยังไม่มีประวัติ",
    tableHeaders: ["วันที่", "ตัวอย่าง", "รีเอเจนต์", "สี", "RGB", "ไนเตรต (ppm)"]
  }
};

function applyLanguage(lang){
  const map = i18n[lang] || i18n.en;
  // Header (pick page)
  setText("headerText", map.headerText_home) || setText("headerText", map.headerText_analysis) || setText("headerText", map.headerText_reports);

  // Home
  setText("welcomeText", map.welcomeText);
  setText("descriptionText", map.descriptionText);
  setText("featuresText", map.featuresText);
  setText("feature1", map.feature1);
  setText("feature2", map.feature2);
  setText("feature3", map.feature3);
  setText("feature4", map.feature4);

  // Analysis
  setText("analysisTitle", map.analysisTitle);
  setText("analysisDesc", map.analysisDesc);
  setPlaceholder("sampleInput", map.samplePlaceholder);
  setPlaceholder("reagentInput", map.reagentPlaceholder);
  setText("saveResultBtn", map.saveResultBtnText);

  // Reports
  setText("reportsTitle", map.reportsTitle);
  setText("reportsOverview", map.reportsOverview);
  setText("detailedReportTitle", map.detailedReportTitle);
  setText("detailedReportDesc", map.detailedReportDesc);
  setText("downloadReportBtn", map.downloadReportBtnText);
  setText("clearHistoryBtn", map.clearHistoryBtnText);
  setText("historicalDataTitle", map.historicalDataTitle);
  setText("historicalDataDesc", map.historicalDataDesc);

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

// ---------- Calibration (Color → ppm) ----------
// Example nitrate chart (typical strip from yellow→red)
// You can replace hexes to match your real card later.
const NITRATE_CALIB = [
  { ppm: 0,   hex: "#FFF86A" }, // pale yellow
  { ppm: 10,  hex: "#FFD24D" }, // light orange
  { ppm: 20,  hex: "#FFB347" }, // orange
  { ppm: 40,  hex: "#FF7F50" }, // coral
  { ppm: 80,  hex: "#FF4C4C" }, // red
  { ppm: 160, hex: "#B22222" }  // dark red
];

// Convert hex to {r,g,b}
function hexToRgb(hex){
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if(!m) return {r:0,g:0,b:0};
  return { r: parseInt(m[1],16), g: parseInt(m[2],16), b: parseInt(m[3],16) };
}
// sRGB (0..255) -> linear 0..1
function srgbToLinear(c){ c/=255; return (c<=0.04045)? c/12.92 : Math.pow((c+0.055)/1.055, 2.4); }
function rgbToXyz({r,g,b}){
  const R=srgbToLinear(r), G=srgbToLinear(g), B=srgbToLinear(b);
  // D65
  const X = R*0.4124564 + G*0.3575761 + B*0.1804375;
  const Y = R*0.2126729 + G*0.7151522 + B*0.0721750;
  const Z = R*0.0193339 + G*0.1191920 + B*0.9503041;
  return {X, Y, Z};
}
function xyzToLab({X,Y,Z}){
  // reference white D65
  const Xn=0.95047, Yn=1.00000, Zn=1.08883;
  function f(t){ return t>0.008856 ? Math.cbrt(t) : (7.787*t + 16/116); }
  const fx=f(X/Xn), fy=f(Y/Yn), fz=f(Z/Zn);
  const L = (Y/Yn>0.008856)? 116*Math.cbrt(Y/Yn)-16 : 903.3*(Y/Yn);
  const a = 500*(fx - fy);
  const b = 200*(fy - fz);
  return {L,a,b};
}
function rgbToLab(rgb){ return xyzToLab(rgbToXyz(rgb)); }
function deltaE76(lab1, lab2){
  const dL=lab1.L-lab2.L, da=lab1.a-lab2.a, db=lab1.b-lab2.b;
  return Math.sqrt(dL*dL + da*da + db*db);
}

function estimateNitrateFromColor(hex){
  const lab = rgbToLab(hexToRgb(hex));
  const ranked = NITRATE_CALIB
    .map(e => ({...e, d: deltaE76(lab, rgbToLab(hexToRgb(e.hex)))}))
    .sort((a,b)=>a.d-b.d);
  const best = ranked[0];
  const next = ranked[1] || best;
  if (best.d < 1) return best.ppm; // almost exact
  const w1 = 1/Math.max(1e-6, best.d);
  const w2 = 1/Math.max(1e-6, next.d);
  return Math.round((best.ppm*w1 + next.ppm*w2)/(w1+w2));
}

// ---------- History (LocalStorage) ----------
const HISTORY_KEY = "nitrateHistory";
function getHistory(){
  try{ return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]"); }
  catch{ return []; }
}
function setHistory(arr){ localStorage.setItem(HISTORY_KEY, JSON.stringify(arr)); }
function addHistory(entry){
  const arr = getHistory();
  arr.unshift(entry);
  setHistory(arr);
}
function toCSV(rows){
  return rows.map(r => r.map(v => `"${String(v ?? "").replace(/"/g,'""')}"`).join(",")).join("\n");
}

// ---------- Analysis Logic ----------
function setupAnalysisPage(){
  const fileInput = document.getElementById("fileInput");
  const captureBtn = document.getElementById("captureFromCamera");
  const stopBtn = document.getElementById("stopCamera");
  const saveBtn = document.getElementById("saveResultBtn");
  const video = document.getElementById("video");
  const canvas = document.getElementById("canvas");
  const preview = document.getElementById("preview");
  const sampleInput = document.getElementById("sampleInput");
  const reagentInput = document.getElementById("reagentInput");
  const colorBox = document.getElementById("colorBox");
  const colorValue = document.getElementById("colorValue");
  const nitrateValue = document.getElementById("nitrateValue");

  if (!fileInput && !captureBtn) return; // Not on analysis page

  let stream = null;
  let lastSource = null; // 'upload' | 'camera' | null

  async function startCamera(){
    try{
      stream = await navigator.mediaDevices.getUserMedia({video:true, audio:false});
      video.style.display = "block";
      video.srcObject = stream;
      preview.style.display = "none";
      canvas.style.display = "none";
    }catch(err){
      alert("Camera access failed: " + err.message);
    }
  }
  function stopCamera(){
    if (stream){
      for (const t of stream.getTracks()) t.stop();
      stream = null;
    }
    video.style.display = "none";
  }

  if (captureBtn){
    captureBtn.addEventListener("click", async () => {
      if (!stream) await startCamera();
      lastSource = "camera";
      if (stream){
        setTimeout(()=>{
          const ctx = canvas.getContext("2d");
          canvas.width = video.videoWidth || 320;
          canvas.height = video.videoHeight || 240;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          canvas.style.display = "block";
          analyzeCanvas();
        }, 300);
      }
    });
  }
  if (stopBtn){
    stopBtn.addEventListener("click", stopCamera);
  }
  if (fileInput){
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      lastSource = "upload";
      const url = URL.createObjectURL(file);
      preview.src = url;
      preview.onload = () => URL.revokeObjectURL(url);
      preview.style.display = "block";
      const img = new Image();
      img.onload = () => {
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        canvas.style.display = "block";
        analyzeCanvas();
      };
      img.src = preview.src;
    });
  }

  function analyzeCanvas(){
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const { width, height } = canvas;
    if (!width || !height) return;

    // sample pixels
    const step = Math.max(1, Math.floor(Math.min(width, height) / 64)); // adaptive sampling
    let r=0,g=0,b=0,count=0;
    for (let y=0; y<height; y+=step){
      for (let x=0; x<width; x+=step){
        const d = ctx.getImageData(x,y,1,1).data;
        r += d[0]; g += d[1]; b += d[2]; count++;
      }
    }
    r = Math.round(r/count); g = Math.round(g/count); b = Math.round(b/count);
    const hex = rgbToHex(r,g,b);

    if (colorBox) colorBox.style.background = hex;
    if (colorValue){
      colorValue.dataset.value = `${hex} (rgb ${r},${g},${b})`;
      colorValue.textContent = `${i18n[CURRENT_LANG].colorValuePrefix}${colorValue.dataset.value}`;
    }

    // calibrated nitrate
    const nitrate = estimateNitrateFromColor(hex);
    if (nitrateValue){
      nitrateValue.dataset.value = `${nitrate} ppm`;
      nitrateValue.textContent = `${i18n[CURRENT_LANG].nitrateValuePrefix}${nitrateValue.dataset.value}`;
    }
  }

  function rgbToHex(r,g,b){
    return "#" + [r,g,b].map(v => v.toString(16).padStart(2,"0")).join("");
  }

  if (saveBtn){
    saveBtn.addEventListener("click", () => {
      const colorText = colorValue?.dataset?.value;
      const nitrateText = nitrateValue?.dataset?.value;
      if (!colorText || !nitrateText){
        alert("Please analyze an image first.");
        return;
      }
      // Parse
      const hexMatch = colorText.match(/#([0-9a-f]{6})/i);
      const rgbMatch = colorText.match(/rgb\s*([0-9]+),\s*([0-9]+),\s*([0-9]+)/i);
      const ppmMatch = nitrateText.match(/(\d+)\s*ppm/i);
      const hex = hexMatch ? "#" + hexMatch[1] : "";
      const rgb = rgbMatch ? `${rgbMatch[1]},${rgbMatch[2]},${rgbMatch[3]}` : "";
      const ppm = ppmMatch ? parseInt(ppmMatch[1],10) : null;

      const sample = (sampleInput?.value?.trim()) || (lastSource==="upload" ? "Uploaded sample" : lastSource==="camera" ? "Camera capture" : "Sample");
      const reagent = reagentInput?.value?.trim() || "";

      const entry = {
        date: new Date().toISOString(),
        sample,
        reagent,
        color: hex,
        rgb,
        nitrate_ppm: ppm
      };
      addHistory(entry);
      alert("Saved to history.");
    });
  }
}

// ---------- Reports Logic ----------
function setupReportsPage(){
  const dlBtn = document.getElementById("downloadReportBtn");
  const clearBtn = document.getElementById("clearHistoryBtn");
  if (document.getElementById("nitrateReports")){
    renderHistory();
  }
  if (dlBtn){
    dlBtn.addEventListener("click", () => {
      const hist = getHistory();
      const rows = [["Date","Sample","Reagent","DominantColor","RGB","Nitrate(ppm)"]];
      if (hist.length){
        for (const h of hist){
          rows.push([h.date, h.sample, h.reagent, h.color, h.rgb, h.nitrate_ppm]);
        }
      } else {
        rows.push([new Date().toISOString(),"Sample A","#8abf3b","138,191,59","18"]);
      }
      const csv = toCSV(rows);
      const blob = new Blob([csv], {type: "text/csv;charset=utf-8;"});
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "nitrate_report.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }
  if (clearBtn){
    clearBtn.addEventListener("click", () => {
      if (confirm("Clear all history?")) {
        setHistory([]);
        renderHistory();
      }
    });
  }
}

function renderHistory(){
  const container = document.getElementById("nitrateReports");
  if (!container) return;
  const hist = getHistory();
  const t = i18n[CURRENT_LANG];
  container.innerHTML = "";

  if (!hist.length){
    const p = document.createElement("p");
    p.textContent = t.noHistoryText;
    container.appendChild(p);
    return;
  }

  // Build table
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
  hist.forEach(item => {
    const tr = document.createElement("tr");

    const tdDate = document.createElement("td");
    tdDate.textContent = new Date(item.date).toLocaleString();
    const tdSample = document.createElement("td");
    tdSample.textContent = item.sample || "";
    const tdReagent = document.createElement("td");
    tdReagent.textContent = item.reagent || "";

    const tdColor = document.createElement("td");
    const sw = document.createElement("span");
    sw.style.display = "inline-block";
    sw.style.width = "18px";
    sw.style.height = "18px";
    sw.style.border = "1px solid #ccc";
    sw.style.borderRadius = "4px";
    sw.style.verticalAlign = "middle";
    sw.style.marginRight = "8px";
    sw.style.background = item.color || "#eee";
    tdColor.appendChild(sw);
    const ctext = document.createElement("span");
    ctext.textContent = item.color || "";
    tdColor.appendChild(ctext);

    const tdRGB = document.createElement("td");
    tdRGB.textContent = item.rgb || "";

    const tdPPM = document.createElement("td");
    tdPPM.textContent = (item.nitrate_ppm ?? "") + "";

    [tdDate, tdSample, tdReagent, tdColor, tdRGB, tdPPM].forEach(td => {
      td.style.padding = "10px";
      td.style.borderBottom = "1px solid #f3f3f3";
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  container.appendChild(table);
}
