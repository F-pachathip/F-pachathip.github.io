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
      applyLanguage(isThai ? "th" : "en");
      langBtn.textContent = isThai ? "English" : "ภาษาไทย";
    });
  }

  // Analysis page specific setup
  setupAnalysisPage();

  // Reports page CSV download
  const dlBtn = document.getElementById("downloadReportBtn");
  if (dlBtn) {
    dlBtn.addEventListener("click", () => {
      const rows = [
        ["Date","Sample","DominantColor","NitrateLevel(ppm)","Reagent"],
        [new Date().toISOString(), "Sample A", "#8abf3b", "18", "Reagent X"],
        [new Date().toISOString(), "Sample B", "#e55f5f", "42", "Reagent Y"],
      ];
      const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(",")).join("\n");
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
});

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

    headerText_reports: "Reports and Nitrate Levels",
    reportsTitle: "Reports on Nitrate Levels",
    reportsOverview: "Browse comprehensive reports on nitrate levels detected in your samples. Use this information for quality control and trend analysis.",
    detailedReportTitle: "Detailed Report",
    detailedReportDesc: "Download a CSV summary of recent analyses.",
    historicalDataTitle: "Historical Data",
    historicalDataDesc: "Review historical data to track changes over time.",
    nitrateValuePrefix: "Nitrate Level: ",
    colorValuePrefix: "Color: "
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

    headerText_reports: "รายงานและระดับไนเตรต",
    reportsTitle: "รายงานข้อมูลระดับไนเตรต",
    reportsOverview: "ดูรายงานสรุประดับไนเตรตที่ตรวจพบในตัวอย่าง เพื่อใช้ควบคุมคุณภาพและวิเคราะห์แนวโน้ม",
    detailedReportTitle: "รายงานแบบละเอียด",
    detailedReportDesc: "ดาวน์โหลดไฟล์ CSV สรุปผลการวิเคราะห์ล่าสุด",
    historicalDataTitle: "ข้อมูลย้อนหลัง",
    historicalDataDesc: "ทบทวนข้อมูลย้อนหลังเพื่อติดตามความเปลี่ยนแปลง",
    nitrateValuePrefix: "ระดับไนเตรต: ",
    colorValuePrefix: "สี: "
  }
};

function applyLanguage(lang){
  const map = i18n[lang] || i18n.en;
  // Home / Analysis / Reports header pick
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
  // Reports
  setText("reportsTitle", map.reportsTitle);
  setText("reportsOverview", map.reportsOverview);
  setText("detailedReportTitle", map.detailedReportTitle);
  setText("detailedReportDesc", map.detailedReportDesc);
  setText("historicalDataTitle", map.historicalDataTitle);
  setText("historicalDataDesc", map.historicalDataDesc);
  // Dynamic readouts prefixes
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

// ---------- Analysis Logic (simple dominant color + heuristic nitrate) ----------
function setupAnalysisPage(){
  const fileInput = document.getElementById("fileInput");
  const captureBtn = document.getElementById("captureFromCamera");
  const stopBtn = document.getElementById("stopCamera");
  const video = document.getElementById("video");
  const canvas = document.getElementById("canvas");
  const preview = document.getElementById("preview");
  const reagentInput = document.getElementById("reagentInput");
  const colorBox = document.getElementById("colorBox");
  const colorValue = document.getElementById("colorValue");
  const nitrateValue = document.getElementById("nitrateValue");

  if (!fileInput && !captureBtn) return; // Not on analysis page

  let stream = null;

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
    stopBtn.addEventListener("click", () => {
      stopCamera();
    });
  }
  if (fileInput){
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
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
    const sampleSize = 10; // sample every 10px
    let r=0,g=0,b=0,count=0;
    for (let y=0; y<height; y+=sampleSize){
      for (let x=0; x<width; x+=sampleSize){
        const d = ctx.getImageData(x,y,1,1).data;
        r += d[0]; g += d[1]; b += d[2]; count++;
      }
    }
    r = Math.round(r/count); g = Math.round(g/count); b = Math.round(b/count);
    const hex = rgbToHex(r,g,b);
    if (colorBox) colorBox.style.background = hex;
    if (colorValue){
      colorValue.dataset.value = `${hex} (rgb ${r},${g},${b})`;
      colorValue.textContent = `Color: ${colorValue.dataset.value}`;
    }

    // naive heuristic nitrate mapping: greener -> lower, redder -> higher
    const nitrate = Math.max(0, Math.min(100, Math.round((r - g + 128)/2)));
    if (nitrateValue){
      nitrateValue.dataset.value = `${nitrate} ppm`;
      nitrateValue.textContent = `Nitrate Level: ${nitrateValue.dataset.value}`;
    }
  }

  function rgbToHex(r,g,b){
    return "#" + [r,g,b].map(v => v.toString(16).padStart(2,"0")).join("");
  }
}
