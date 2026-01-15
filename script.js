const LOGO_URL = 'https://upload.wikimedia.org/wikipedia/en/3/3c/Daffodil_International_University_logo.png';

const labBtn = document.getElementById('labBtn');
const covBtn = document.getElementById('covBtn');
const genBtn = document.getElementById('genBtn');
const labOnly = document.getElementById('labOnly');
const covOnly = document.getElementById('covOnly');
const previewArea = document.getElementById('previewArea');
const outputPage = document.getElementById('outputPage');
const downloadBtn = document.getElementById('downloadBtn');

let currentMode = 'lab'; 

/* Toggle between Modes */
labBtn.addEventListener('click', () => switchMode('lab'));
covBtn.addEventListener('click', () => switchMode('cover'));

function switchMode(mode) {
  currentMode = mode;
  labBtn.classList.toggle('active', mode === 'lab');
  covBtn.classList.toggle('active', mode === 'cover');
  labOnly.classList.toggle('hidden', mode === 'cover');
  covOnly.classList.toggle('hidden', mode === 'lab');
}

/* Get Input Data */
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
    mm: document.getElementById('mm').value || 'MM',
    yy: document.getElementById('yy').value || 'YY',
    dd: document.getElementById('dd').value || 'DD'
  };
}

/* Generate Preview */
genBtn.addEventListener('click', () => {
  const d = getData();
  let content = `
    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.05; z-index: 0; pointer-events: none;">
      <img src="${LOGO_URL}" style="width: 400px;" crossorigin="anonymous"/>
    </div>
    <div style="position: relative; z-index: 1;">
      <img src="${LOGO_URL}" style="display: block; margin: 0 auto 20px; height: 100px;" crossorigin="anonymous"/>
  `;

  if (currentMode === 'lab') {
    const labNo = document.getElementById('labNo').value;
    const labTitle = document.getElementById('labTitle').value;
    content += `
      <h1 style="text-align:center; color:#002b59; font-size: 28px; margin-bottom: 5px;">Lab Report Submission</h1>
      <p style="text-align:center; font-size:18px; margin-bottom:40px;">Lab No: ${labNo || 'N/A'}</p>
      <div style="margin: 40px 0; padding: 15px; border-left: 4px solid #002b59; background: #f9f9f9;">
        <h3 style="margin: 0; font-size: 14px; text-transform: uppercase; color: #666;">Lab Title:</h3>
        <p style="font-size: 20px; margin-top: 5px; font-weight: bold;">${labTitle || 'Untitled Lab'}</p>
      </div>
      <div style="display:flex; justify-content:space-between; margin-top:60px;">
        <div style="width: 45%;"><p style="font-weight: bold; border-bottom: 1px solid #ccc; padding-bottom: 5px;">Submitted To</p><p>${d.fname}</p><p>Dept. of ${d.fdept}</p></div>
        <div style="width: 45%; text-align: right;"><p style="font-weight: bold; border-bottom: 1px solid #ccc; padding-bottom: 5px;">Submitted By</p><p>${d.sname}</p><p>ID: ${d.sid}</p><p>Date: ${d.dd}/${d.mm}/${d.yy}</p></div>
      </div>
    `;
  } else {
    const title = document.getElementById('covTitle').value;
    content += `
      <h2 style="text-align:center; margin: 30px 0 50px; color:#002b59;">${title || 'REPORT TITLE'}</h2>
      <table style="width:100%; border-collapse: collapse;">
        ${createRow('Course Code', d.course)} ${createRow('Section', d.section)} ${createRow('Semester', d.semester)}
        ${createRow('Student ID', d.sid)} ${createRow('Student Name', d.sname)} ${createRow('Submission Date', `${d.dd}/${d.mm}/${d.yy}`)}
      </table>
    `;
  }

  /* Compact Footer for PDF */
  content += `
      <footer style="position:absolute; bottom:20px; width:100%; left:0; text-align:center; border-top: 1px solid #eee; padding-top: 10px;">
        <p style="margin: 0; font-size: 9px; color: #777;">Developed by <strong style="color:#333;">Emtiaz Hossain Sami</strong></p>
        <p style="margin: 1px 0; font-size: 9px; color: #777;">Dept. of Software Engineering, Daffodil International University</p>
        <p style="margin: 0; font-size: 9px; color: #002b59; font-weight: bold;">© 2026. All Rights Reserved.</p>
      </footer>
    </div> `;
  
  outputPage.innerHTML = content;
  previewArea.classList.remove('hidden');
});

function createRow(label, value) {
  return `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; font-weight: bold; width: 40%; font-size: 14px;">${label}</td><td style="padding: 10px; font-size: 14px;">${value || '---'}</td></tr>`;
}

/* PDF Download Logic */
downloadBtn.addEventListener('click', () => {
  html2canvas(outputPage, { scale: 3, useCORS: true }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jspdf.jsPDF('p', 'pt', 'a4');
    pdf.addImage(imgData, 'PNG', 0, 0, 595.28, (canvas.height * 595.28) / canvas.width);
    pdf.save('DIU_Report.pdf');
  });
});
