/* ===========================================================
   Global UI: menu toggle, language toggle, footer year
   + CSV Viewer logic merged here (no csv-module.js needed)
   =========================================================== */

(function(){
  // ---------- Footer year ----------
  document.addEventListener("DOMContentLoaded", () => {
    const y = document.getElementById("currentYear");
    if (y) y.textContent = new Date().getFullYear();
  });

  // ---------- Menu toggle ----------
  window.toggleMenu = function(){
    // Toggle class on sidebar for responsive layouts
    const aside = document.querySelector(".navbar");
    if (aside) aside.classList.toggle("open");
  };

  // ---------- Global i18n ----------
  // Keep CURRENT_LANG on window for other features/pages
  window.CURRENT_LANG = window.CURRENT_LANG || "en";

  const I18N = {
    en: {
      // Shared / Home
      langBtn: "ภาษาไทย",
      headerText: "Welcome to the AI Color & Nitrate Detector",
      welcomeText: "Welcome to the AI Color & Nitrate Detection System",
      descriptionText: "This system helps you analyze colors and detect nitrate levels in various samples using AI for accurate, reliable results.",
      feature1: "Real-time color detection",
      feature2: "Nitrate level analysis",
      feature3: "Comprehensive reports",
      feature4: "Customizable settings",

      // Analysis
      analysisHeader: "Color & Nitrate Analysis",
      analysisTitle: "Analyze a Sample",
      analysisDesc: "Upload an image or capture from camera. Then choose a color scale to estimate nitrate concentration.",

      // Reports
      reportsHeader: "Reports and Nitrate Levels",
      reportsTitle: "Reports on Nitrate Levels",
      reportsOverview: "Browse comprehensive reports on nitrate levels in your samples.",

      // CSV page
      headerText_csv: "CSV Viewer",
      csvTitle: "Open and Explore CSV",
      csvDesc: "Upload a CSV file, then search, sort, paginate, and download filtered results.",
      csvUploadLabel: "Choose CSV",
      csvRowsPerPageLabel: "Rows / page:",
      csvDownloadBtn: "Download CSV",
      csvClearBtn: "Clear",
      csvEmpty: "No data yet.",
      csvPrev: "Prev",
      csvNext: "Next",
      csvSearchPlaceholder: "Search...",
      pageTpl: (p, t) => `Page ${p} / ${t}`
    },
    th: {
      // Shared / Home
      langBtn: "English",
      headerText: "ยินดีต้อนรับสู่ระบบตรวจจับสีและไนเตรตด้วย AI",
      welcomeText: "ยินดีต้อนรับสู่ระบบตรวจจับสีและปริมาณไนเตรตด้วยปัญญาประดิษฐ์",
      descriptionText: "ระบบนี้ช่วยวิเคราะห์สีและตรวจหาปริมาณไนเตรตในสิ่งตัวอย่างต่าง ๆ ด้วย AI เพื่อผลลัพธ์ที่แม่นยำและเชื่อถือได้",
      feature1: "ตรวจจับสีแบบเรียลไทม์",
      feature2: "วิเคราะห์ปริมาณไนเตรต",
      feature3: "รายงานผลแบบครบถ้วน",
      feature4: "ตั้งค่าการทำงานได้ตามต้องการ",

      // Analysis
      analysisHeader: "การวิเคราะห์สีและไนเตรต",
      analysisTitle: "วิเคราะห์ตัวอย่าง",
      analysisDesc: "อัปโหลดภาพหรือถ่ายจากกล้อง แล้วเลือกสเกลสีเพื่อคาดการณ์ความเข้มข้นของไนเตรต",

      // Reports
      reportsHeader: "รายงานและระดับไนเตรต",
      reportsTitle: "รายงานระดับไนเตรต",
      reportsOverview: "เรียกดูรายงานสรุประดับไนเตรตในตัวอย่างของคุณ",

      // CSV page
      headerText_csv: "ตัวดูไฟล์ CSV",
      csvTitle: "เปิดและสำรวจไฟล์ CSV",
      csvDesc: "อัปโหลดไฟล์ CSV แล้วค้นหา เรียงลำดับ แบ่งหน้า และดาวน์โหลดผลลัพธ์ที่กรองแล้วได้",
      csvUploadLabel: "เลือกไฟล์ CSV",
      csvRowsPerPageLabel: "แถวต่อหน้า:",
      csvDownloadBtn: "ดาวน์โหลด CSV",
      csvClearBtn: "ล้าง",
      csvEmpty: "ยังไม่มีข้อมูล",
      csvPrev: "ก่อนหน้า",
      csvNext: "ถัดไป",
      csvSearchPlaceholder: "ค้นหา...",
      pageTpl: (p, t) => `หน้า ${p} / ${t}`
    }
  };

  function applyCommonI18n(){
    const L = I18N[window.CURRENT_LANG] || I18N.en;

    // Language button
    const langBtn = document.getElementById("languageToggle");
    if (langBtn) langBtn.textContent = L.langBtn;

    // Home IDs
    const set = (id, text) => { const el = document.getElementById(id); if (el && text!=null) el.textContent = text; };
    set("headerText", L.headerText);
    set("welcomeText", L.welcomeText);
    set("descriptionText", L.descriptionText);
    set("feature1", "bolt " + L.feature1); // If icons in markup, text is after icon
    set("feature2", "lab_panel " + L.feature2);
    set("feature3", "insights " + L.feature3);
    set("feature4", "tune " + L.feature4);

    // Analysis IDs
    set("analysisTitle", L.analysisTitle);
    set("analysisDesc", L.analysisDesc);
    set("headerText_csv", L.headerText_csv); // CSV header (safe even if not on CSV page)

    // Reports IDs
    const rh = document.getElementById("headerText");
    // If we're on reports.html, headerText is used for reports header too (leave Home untouched otherwise)
    // We'll set these only if elements present
    const repHeader = document.querySelector("h1#headerText");
    if (repHeader && repHeader.textContent && repHeader.textContent.match(/Reports|รายงาน/)) {
      repHeader.textContent = L.reportsHeader;
    }
    set("reportsTitle", L.reportsTitle);
    set("reportsOverview", L.reportsOverview);
  }

  // Bind language toggle
  document.addEventListener("DOMContentLoaded", () => {
    applyCommonI18n();
    const btn = document.getElementById("languageToggle");
    if (btn){
      btn.addEventListener("click", () => {
        window.CURRENT_LANG = (window.CURRENT_LANG === "en") ? "th" : "en";
        applyCommonI18n();
        // Also refresh CSV section if present
        csv_applyI18n();
        csv_updatePageInfo();
      });
    }
  });

  /* ===========================================================
     CSV VIEWER (merged)
     Elements (on csv.html):
     - csvFileInput, rowsPerPage, searchInput
     - downloadBtn, clearBtn, prevPage, nextPage
     - csvThead, csvTbody, tableWrap, emptyState, pageInfo
     - headerText_csv, csvTitle, csvDesc, csvUploadLabel, ...
     =========================================================== */

  // State
  let CSV_HEADERS = [];     // array<string>
  let CSV_ROWS = [];        // array<object>
  let CSV_FILTERED = [];    // array<object>
  let CSV_SORT_COL = -1;    // index
  let CSV_SORT_DIR = 1;     // 1 asc, -1 desc
  let CSV_PAGE = 1;
  let CSV_PER_PAGE = 50;
  let CSV_TYPES = [];       // inferred column types

  // --- DOM helpers
  const $ = (id) => document.getElementById(id);
  const on = (el, ev, fn) => { if (el) el.addEventListener(ev, fn); };

  // --- I18N for CSV subsection (reuse global dictionary)
  function csv_L(){
    const L = I18N[window.CURRENT_LANG] || I18N.en;
    return {
      headerText_csv: L.headerText_csv,
      csvTitle: L.csvTitle,
      csvDesc: L.csvDesc,
      csvUploadLabel: L.csvUploadLabel,
      csvRowsPerPageLabel: L.csvRowsPerPageLabel,
      csvDownloadBtn: L.csvDownloadBtn,
      csvClearBtn: L.csvClearBtn,
      empty: L.csvEmpty,
      prev: L.csvPrev,
      next: L.csvNext,
      searchPlaceholder: L.csvSearchPlaceholder,
      pageTpl: L.pageTpl
    };
  }

  function csv_applyI18n(){
    if (!$("csvTable")) return; // not on CSV page
    const L = csv_L();
    const set = (id, key) => { const el = $(id); if (el && L[key]!=null) el.textContent = L[key]; };
    set("headerText_csv", "headerText_csv");
    set("csvTitle", "csvTitle");
    set("csvDesc", "csvDesc");
    set("csvUploadLabel", "csvUploadLabel");
    set("csvRowsPerPageLabel", "csvRowsPerPageLabel");
    set("csvDownloadBtn", "csvDownloadBtn");
    set("csvClearBtn", "csvClearBtn");
    const s = $("searchInput"); if (s) s.placeholder = L.searchPlaceholder;
    const es = $("emptyState"); if (es) es.textContent = L.empty;

    const prev = $("prevPage");
    if (prev){
      // Replace text node (keep icon span)
      prev.childNodes.forEach(n => { if (n.nodeType === 3) n.textContent = " " + L.prev + " "; });
    }
    const next = $("nextPage");
    if (next){
      next.childNodes.forEach(n => { if (n.nodeType === 3) n.textContent = " " + L.next + " "; });
    }
  }

  // --- CSV parsing / export
  function csv_parse(text){
    const out = []; let row = []; let cur = ""; let inQ = false;
    const pushCell = () => { row.push(cur); cur = ""; };
    const pushRow  = () => { out.push(row); row = []; };
    for (let i=0; i<text.length; i++){
      const c = text[i];
      if (inQ){
        if (c === '"'){
          if (text[i+1] === '"'){ cur += '"'; i++; }
          else { inQ = false; }
        } else cur += c;
      } else {
        if (c === '"') inQ = true;
        else if (c === ',') pushCell();
        else if (c === '\n'){ pushCell(); pushRow(); }
        else if (c === '\r') {/* skip */ }
        else cur += c;
      }
    }
    if (cur.length || row.length){ pushCell(); pushRow(); }
    return out;
  }

  function csv_esc(v){
    const s = (v==null) ? "" : String(v);
    return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  }
  function csv_toCSV(arr){
    return arr.map(r => r.map(csv_esc).join(",")).join("\n");
  }

  function csv_inferTypes(cols, data){
    const isNum = (v) => v!=="" && !isNaN(+v);
    return cols.map((_, ci) => {
      let numeric = 0, seen = 0;
      for (let r=0; r<data.length && r<200; r++){
        const v = data[r][ci];
        if (v!==undefined){ seen++; if (isNum(v)) numeric++; }
      }
      return (seen>0 && numeric/seen>0.7) ? "number" : "string";
    });
  }

  function csv_buildState(matrix){
    if (!matrix.length){
      CSV_HEADERS = [];
      CSV_ROWS = [];
      CSV_FILTERED = [];
      CSV_TYPES = [];
      CSV_SORT_COL = -1; CSV_SORT_DIR = 1; CSV_PAGE = 1;
      csv_render();
      return;
    }
    CSV_HEADERS = matrix[0].map(h => String(h).trim());
    const body = matrix.slice(1);
    CSV_TYPES = csv_inferTypes(CSV_HEADERS, body);
    CSV_ROWS = body.map(r => {
      const obj = {};
      for (let i=0; i<CSV_HEADERS.length; i++){
        obj[CSV_HEADERS[i] || `col_${i+1}`] = r[i] ?? "";
      }
      return obj;
    });
    CSV_FILTERED = CSV_ROWS.slice();
    CSV_SORT_COL = -1; CSV_SORT_DIR = 1; CSV_PAGE = 1;
    csv_render();
  }

  // --- Filtering / sorting / pagination
  function csv_applyFilter(){
    if (!$("csvTable")) return;
    const q = ($("searchInput")?.value || "").toLowerCase().trim();
    if (!q){ CSV_FILTERED = CSV_ROWS.slice(); }
    else {
      CSV_FILTERED = CSV_ROWS.filter(obj => {
        for (const k of CSV_HEADERS){
          const v = obj[k];
          if (v!=null && String(v).toLowerCase().includes(q)) return true;
        }
        return false;
      });
    }
    CSV_PAGE = 1;
  }

  function csv_compare(a, b, t){
    if (t === "number"){
      const na = parseFloat(a); const nb = parseFloat(b);
      if (isNaN(na) && isNaN(nb)) return 0;
      if (isNaN(na)) return -1;
      if (isNaN(nb)) return 1;
      return na - nb;
    }
    const sa = String(a).toLowerCase();
    const sb = String(b).toLowerCase();
    return sa < sb ? -1 : sa > sb ? 1 : 0;
  }

  function csv_render(){
    const thead = $("csvThead");
    const tbody = $("csvTbody");
    const wrap  = $("tableWrap");
    const empty = $("emptyState");
    if (!thead || !tbody || !wrap || !empty) return; // Not on CSV page

    if (!CSV_HEADERS.length){
      thead.innerHTML = "";
      tbody.innerHTML = "";
      wrap.style.display = "none";
      empty.style.display = "block";
      csv_updatePageInfo();
      return;
    }

    wrap.style.display = "block";
    empty.style.display = "none";

    // Headers with sort icons
    thead.innerHTML = "<tr>" + CSV_HEADERS.map((h, i) => {
      const arrow = (i===CSV_SORT_COL) ? (CSV_SORT_DIR>0 ? "north" : "south") : "unfold_more";
      return `<th role="columnheader" tabindex="0" data-idx="${i}">
        <span>${h}</span>
        <span class="material-symbols-rounded" style="font-size:18px; opacity:.8; vertical-align:middle">${arrow}</span>
      </th>`;
    }).join("") + "</tr>";

    // Body segment
    const start = (CSV_PAGE - 1) * CSV_PER_PAGE;
    const segment = CSV_FILTERED.slice(start, start + CSV_PER_PAGE);
    tbody.innerHTML = segment.map(row => {
      return "<tr>" + CSV_HEADERS.map(h => `<td>${row[h] ?? ""}</td>`).join("") + "</tr>";
    }).join("");

    // Sort handlers
    thead.querySelectorAll("th").forEach(th => {
      th.addEventListener("click", () => {
        const idx = +th.getAttribute("data-idx");
        if (idx === CSV_SORT_COL) CSV_SORT_DIR *= -1;
        else { CSV_SORT_COL = idx; CSV_SORT_DIR = 1; }
        const key = CSV_HEADERS[idx];
        const t = CSV_TYPES[idx] || "string";
        CSV_FILTERED.sort((ra, rb) => CSV_SORT_DIR * csv_compare(ra[key], rb[key], t));
        csv_render();
      });
      th.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter" || ev.key === " "){ ev.preventDefault(); th.click(); }
      });
    });

    csv_updatePageInfo();
  }

  function csv_updatePageInfo(){
    const info = $("pageInfo");
    if (!info || !$("csvTable")) return;
    const L = csv_L();
    const totalPages = Math.max(1, Math.ceil(CSV_FILTERED.length / CSV_PER_PAGE));
    const curr = Math.min(CSV_PAGE, totalPages);
    info.textContent = L.pageTpl(curr, totalPages);
  }

  function csv_clearAll(){
    const fi = $("csvFileInput");
    if (fi) fi.value = "";
    CSV_HEADERS = [];
    CSV_ROWS = [];
    CSV_FILTERED = [];
    CSV_SORT_COL = -1;
    CSV_SORT_DIR = 1;
    CSV_PAGE = 1;
    csv_render();
  }

  // --- Wire up CSV only if page elements exist
  document.addEventListener("DOMContentLoaded", () => {
    if (!$("csvTable")) return; // Not on csv.html

    // Apply localized labels
    csv_applyI18n();

    // Controls
    on($("csvFileInput"), "change", async (e) => {
      const f = e.target.files?.[0];
      if (!f) return;
      const text = await f.text();
      const matrix = csv_parse(text);
      csv_buildState(matrix);
    });

    on($("rowsPerPage"), "change", () => {
      CSV_PER_PAGE = Math.max(1, +$("rowsPerPage").value || 50);
      CSV_PAGE = 1;
      csv_render();
    });

    on($("searchInput"), "input", () => { csv_applyFilter(); csv_render(); });

    on($("prevPage"), "click", () => {
      const total = Math.max(1, Math.ceil(CSV_FILTERED.length / CSV_PER_PAGE));
      if (CSV_PAGE > 1){ CSV_PAGE--; csv_render(); }
    });

    on($("nextPage"), "click", () => {
      const total = Math.max(1, Math.ceil(CSV_FILTERED.length / CSV_PER_PAGE));
      if (CSV_PAGE < total){ CSV_PAGE++; csv_render(); }
    });

    on($("downloadBtn"), "click", () => {
      if (!CSV_HEADERS.length) return;
      const arr = [CSV_HEADERS].concat(CSV_FILTERED.map(r => CSV_HEADERS.map(h => r[h] ?? "")));
      const csv = csv_toCSV(arr);
      const blob = new Blob([csv], {type:"text/csv;charset=utf-8;"});
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = "filtered.csv"; a.click();
      URL.revokeObjectURL(url);
    });

    on($("clearBtn"), "click", csv_clearAll);
  });

})();
