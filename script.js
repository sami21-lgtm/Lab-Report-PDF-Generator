// ---------- auto DIU logo ----------
const LOGO_URL = 'https://upload.wikimedia.org/wikipedia/en/3/3c/Daffodil_International_University_logo.png';

const labBtn      = document.getElementById('labBtn');
const covBtn      = document.getElementById('covBtn');
const genBtn      = document.getElementById('genBtn');
const labOnly     = document.getElementById('labOnly');
const covOnly     = document.getElementById('covOnly');
const previewArea = document.getElementById('previewArea');
const outputPage  = document.getElementById('outputPage');
const downloadBtn = document.getElementById('downloadBtn');
const printBtn    = document.getElementById('printBtn');

let currentMode = 'lab'; // 'lab' || 'cover'

/* ---------- toggle mode ---------- */
labBtn.addEventListener('click', () => switchMode('lab'));
covBtn.addEventListener('click', () => switchMode('cover'));

function switchMode(mode) {
  currentMode = mode;
  labBtn.classList.toggle('active', mode === 'lab');
  covBtn.classList.toggle('active', mode === 'cover');
  labOnly.classList.toggle('hidden', mode === 'cover');
  covOnly.classList.toggle('hidden', mode === 'lab');
  genBtn.textContent = mode === 'lab' ? 'Generate Lab Report' : 'Generate Cover Page';
}

/* ---------- collect common data ---------- */
function getData() {
  return {
    course: document.getElementById('course').value,
    section: document.getElementById('section').value,
    semester: document.getElementById('semester').value,
    sid: document.getElementById('sid').value,
    sname: document.getElementById('sname').value,
    sdept: document.getElementById('sdept').value,
    fname: document.getElementById('fname').value,
    fdept: document.getElementById('fdept').value,
    // empty থাকলে placeholder দেওয়ার জন্য
    mm: document.getElementById('mm').value || 'MM',
    yy: document.getElementById('yy').value || 'YY',
    dd: document.getElementById('dd').value || 'DD'
  };
}

/* ---------- generate preview ---------- */
genBtn.addEventListener('click', () => {
  const d = getData();
  
  // HTML Structure within PDF/Print Preview
  let content = `<img class="logo" src="${LOGO_URL}" crossorigin="anonymous"/>`;

  if (currentMode === 'lab') {
    const labNo    = document.getElementById('labNo').value;
    const labTitle = document.getElementById('labTitle').value;
    content += `
      <h1 style="text-align:center; margin-top:20px; color:#002b59;">Lab Report Submission</h1>
      <p style="text-align:center; font-size:18px; margin-bottom:40px;">Lab No: ${labNo || 'N/A'}</p>
      <div style="margin-bottom:30px;">
        <h3 style="border-bottom:1px solid #002b59; display:inline-block;">Lab Title:</h3>
        <p style="font-size:18px; margin-top:5px;">${labTitle || 'Enter Title'}</p>
      </div>
      <div style="display:flex; justify-content:space-between; margin-top:50px;">
        <div>
          <p><strong>Submitted To</strong></p>
          <p>${d.fname}</p>
          <p>Department of ${d.fdept}</p>
        </div>
        <div style="text-align:right;">
          <p><strong>Submitted By</strong></p>
          <p>${d.sname}</p>
          <p>ID: ${d.sid}</p>
          <p>Date: ${d.dd}/${d.mm}/${d.yy}</p>
        </div>
      </div>
    `;
  } else {
    const title = document.getElementById('covTitle').value;
    content += `
      <h2 style="text-align:center; margin-bottom:40px; color:#002b59;">${title || 'REPORT TITLE'}</h2>
      <table style="width:100%; border-collapse: collapse; margin-top:20px;">
        <tr style="border-bottom: 1px solid #eee;"><td style="padding:10px; font-weight:bold;">Course Code</td><td>${d.course}</td></tr>
        <tr style="border-bottom: 1px solid #eee;"><td style="padding:10px; font-weight:bold;">Section</td><td>${d.section}</td></tr>
        <tr style="border-bottom: 1px solid #eee;"><td style="padding:10px; font-weight:bold;">Semester</td><td>${d.semester}</td></tr>
        <tr style="border-bottom: 1px solid #eee;"><td style="padding:10px; font-weight:bold;">Student ID</td><td>${d.sid}</td></tr>
        <tr style="border-bottom: 1px solid #eee;"><td style="padding:10px; font-weight:bold;">Student Name</td><td>${d.sname}</td></tr>
        <tr style="border-bottom: 1px solid #eee;"><td style="padding:10px; font-weight:bold;">Student Dept.</td><td>${d.sdept}</td></tr>
        <tr style="border-bottom: 1px solid #eee;"><td style="padding:10px; font-weight:bold;">Faculty Name</td><td>${d.fname}</td></tr>
        <tr style="border-bottom: 1px solid #eee;"><td style="padding:10px; font-weight:bold;">Faculty Dept.</td><td>${d.fdept}</td></tr>
        <tr><td style="padding:10px; font-weight:bold;">Date</td><td>${d.dd}/${d.mm}/${d.yy}</td></tr>
      </table>
    `;
  }

  content += `<footer style="position:absolute; bottom:40px; width:100%; left:0; text-align:center; font-size:12px; color:#666;">Daffodil International University</footer>`;
  
  outputPage.innerHTML = content;
  previewArea.classList.remove('hidden');
  
  // Smooth scroll to preview
  previewArea.scrollIntoView({ behavior: 'smooth' });
});

/* ---------- download as PDF ---------- */
downloadBtn.addEventListener('click', () => {
  const fileName = currentMode === 'lab' ? 'DIU_Lab_Report.pdf' : 'DIU_Cover_Page.pdf';
  
  // html2canvas settings for high quality
  html2canvas(outputPage, { 
    scale: 3, 
    useCORS: true,
    logging: false,
    allowTaint: true 
  }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jspdf.jsPDF('p', 'pt', 'a4');
    const imgWidth = 595.28; // A4 width in pt
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(fileName);
  });
});

/* ---------- print ---------- */
printBtn.addEventListener('click', () => {
  window.print(); 
});
