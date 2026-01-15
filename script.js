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

let currentMode = 'lab'; 

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
    mm: document.getElementById('mm').value || 'MM',
    yy: document.getElementById('yy').value || 'YY',
    dd: document.getElementById('dd').value || 'DD'
  };
}

/* ---------- generate preview ---------- */
genBtn.addEventListener('click', () => {
  const d = getData();
  
  // লোগো এবং জলছাপের জন্য কন্টেইনার
  let content = `
    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.05; z-index: 0; pointer-events: none;">
      <img src="${LOGO_URL}" style="width: 400px;" crossorigin="anonymous"/>
    </div>
    
    <div style="position: relative; z-index: 1;">
      <img class="logo" src="${LOGO_URL}" style="display: block; margin: 0 auto 20px; height: 100px;" crossorigin="anonymous"/>
  `;

  if (currentMode === 'lab') {
    const labNo    = document.getElementById('labNo').value;
    const labTitle = document.getElementById('labTitle').value;
    content += `
      <h1 style="text-align:center; color:#002b59; font-size: 28px; margin-bottom: 5px;">Lab Report Submission</h1>
      <p style="text-align:center; font-size:18px; margin-bottom:40px;">Lab No: ${labNo || 'N/A'}</p>
      
      <div style="margin: 40px 0; padding: 15px; border-left: 4px solid #002b59; background: #f9f9f9;">
        <h3 style="margin: 0; font-size: 14px; text-transform: uppercase; color: #666;">Lab Title:</h3>
        <p style="font-size: 20px; margin-top: 5px; font-weight: bold; color: #000;">${labTitle || 'Untitled Lab'}</p>
      </div>

      <div style="display:flex; justify-content:space-between; margin-top:60px;">
        <div style="width: 45%;">
          <p style="font-weight: bold; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 10px;">Submitted To</p>
          <p style="font-size: 16px; font-weight: bold;">${d.fname}</p>
          <p style="font-size: 14px; color: #444;">Department of ${d.fdept}</p>
          <p style="font-size: 14px; color: #444;">Daffodil International University</p>
        </div>
        <div style="width: 45%; text-align: right;">
          <p style="font-weight: bold; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 10px;">Submitted By</p>
          <p style="font-size: 16px; font-weight: bold;">${d.sname}</p>
          <p style="font-size: 14px; color: #444;">ID: ${d.sid}</p>
          <p style="font-size: 14px; color: #444;">Date: ${d.dd}/${d.mm}/${d.yy}</p>
        </div>
      </div>
    `;
  } else {
    const title = document.getElementById('covTitle').value;
    content += `
      <h2 style="text-align:center; margin: 30px 0 50px; color:#002b59; font-size: 24px;">${title || 'REPORT TITLE'}</h2>
      <table style="width:100%; border-collapse: collapse;">
        ${createRow('Course Code', d.course)}
        ${createRow('Section', d.section)}
        ${createRow('Semester', d.semester)}
        ${createRow('Student ID', d.sid)}
        ${createRow('Student Name', d.sname)}
        ${createRow('Student Dept.', d.sdept)}
        ${createRow('Faculty Name', d.fname)}
        ${createRow('Faculty Dept.', d.fdept)}
        ${createRow('Submission Date', `${d.dd}/${d.mm}/${d.yy}`)}
      </table>
    `;
  }

  content += `
      <footer style="position:absolute; bottom:20px; width:100%; left:0; text-align:center; font-size:12px; border-top: 1px solid #eee; padding-top: 10px; color:#777;">
        Daffodil International University
      </footer>
    </div> `;
  
  outputPage.innerHTML = content;
  previewArea.classList.remove('hidden');
  previewArea.scrollIntoView({ behavior: 'smooth' });
});

// টেবিল রো তৈরির ফাংশন
function createRow(label, value) {
  return `
    <tr style="border-bottom: 1px solid #eee;">
      <td style="padding: 12px; font-weight: bold; width: 40%; color: #555;">${label}</td>
      <td style="padding: 12px; color: #000;">${value || '---'}</td>
    </tr>
  `;
}

/* ---------- download ---------- */
downloadBtn.addEventListener('click', () => {
  const fileName = currentMode === 'lab' ? 'DIU_Lab_Report.pdf' : 'DIU_Cover_Page.pdf';
  html2canvas(outputPage, { scale: 3, useCORS: true }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jspdf.jsPDF('p', 'pt', 'a4');
    pdf.addImage(imgData, 'PNG', 0, 0, 595.28, (canvas.height * 595.28) / canvas.width);
    pdf.save(fileName);
  });
});

printBtn.addEventListener('click', () => { window.print(); });
