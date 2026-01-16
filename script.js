const LOGO_URL = 'https://upload.wikimedia.org/wikipedia/en/3/3c/Daffodil_International_University_logo.png';

const labBtn = document.getElementById('labBtn');
const assignBtn = document.getElementById('assignBtn');
const genBtn = document.getElementById('genBtn');
const labOnly = document.getElementById('labOnly');
const assignOnly = document.getElementById('assignOnly');
const previewArea = document.getElementById('previewArea');
const outputPage = document.getElementById('outputPage');
const downloadBtn = document.getElementById('downloadBtn');

let currentMode = 'lab'; 

/* Mode Switch Logic */
labBtn.addEventListener('click', () => switchMode('lab'));
assignBtn.addEventListener('click', () => switchMode('assign'));

function switchMode(mode) {
  currentMode = mode;
  labBtn.classList.toggle('active', mode === 'lab');
  assignBtn.classList.toggle('active', mode === 'assign');
  labOnly.classList.toggle('hidden', mode !== 'lab');
  assignOnly.classList.toggle('hidden', mode !== 'assign');
}

/* Get Input Values */
function getData() {
  return {
    code: document.getElementById('courseCode').value,
    title: document.getElementById('courseTitle').value,
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

/* Generate Content */
genBtn.addEventListener('click', () => {
  const d = getData();
  
  // Watermark and Header Logo
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
      <h1 style="text-align:center; color:#002b59; font-size: 26px; text-transform: uppercase; margin-bottom: 5px;">Lab Report Submission</h1>
      <p style="text-align:center; font-size:16px; margin-bottom:25px;">Course: ${d.code} - ${d.title}</p>
      
      <div style="margin: 30px 0; padding: 15px; border-left: 4px solid #002b59; background: #f9f9f9;">
        <p style="font-size: 12px; text-transform: uppercase; color: #666; margin:0;">Lab No: ${labNo || 'N/A'}</p>
        <p style="font-size: 18px; margin-top: 5px; font-weight: bold; color: #000;">${labTitle || 'Untitled Lab'}</p>
      </div>
    `;
  } else {
    const assignTitle = document.getElementById('assignTitle').value;
    const topicName = document.getElementById('topicName').value;
    content += `
      <h1 style="text-align:center; color:#002b59; font-size: 26px; text-transform: uppercase; margin-bottom: 5px;">Assignment Submission</h1>
      <p style="text-align:center; font-size:16px; margin-bottom:25px;">Course: ${d.code} - ${d.title}</p>
      
      <div style="margin: 30px 0; padding: 15px; border: 1px dashed #002b59; background: #fdfdfd;">
        <p style="font-size: 12px; text-transform: uppercase; color: #666; margin:0;">Assignment Title: ${assignTitle || 'N/A'}</p>
        <p style="font-size: 18px; margin-top: 5px; font-weight: bold; color: #000;">Topic: ${topicName || 'N/A'}</p>
      </div>
    `;
  }

  // Common Submission Body
  content += `
      <div style="display:flex; justify-content:space-between; margin-top:60px;">
        <div style="width: 45%; border-right: 1px solid #eee;">
          <p style="font-weight: bold; border-bottom: 1px solid #ccc; padding-bottom: 5px; font-size: 14px; color: #333;">Submitted To</p>
          <p style="font-size: 15px; margin: 8px 0 2px; font-weight: bold;">${d.fname}</p>
          <p style="font-size: 13px; color: #555;">Department of ${d.fdept}</p>
          <p style="font-size: 13px; color: #555;">Daffodil International University</p>
        </div>
        <div style="width: 45%; text-align: right;">
          <p style="font-weight: bold; border-bottom: 1px solid #ccc; padding-bottom: 5px; font-size: 14px; color: #333;">Submitted By</p>
          <p style="font-size: 15px; margin: 8px 0 2px; font-weight: bold;">${d.sname}</p>
          <p style="font-size: 13px; color: #555;">ID: ${d.sid}</p>
          <p style="font-size: 13px; color: #555;">Section: ${d.section} | ${d.semester}</p>
          <p style="font-size: 13px; color: #555;">Date: ${d.dd}/${d.mm}/${d.yy}</p>
        </div>
      </div>

      <footer style="position:absolute; bottom:20px; width:100%; left:0; text-align:center; border-top: 1px solid #eee; padding-top: 10px;">
        <p style="margin: 0; font-size: 9px; color: #777;">Developed by Emtiaz Hossain Sami</p>
        <p style="margin: 2px 0; font-size: 9px; color: #777;">Dept. of Software Engineering, DIU</p>
        <p style="margin: 0; font-size: 9px; color: #002b59; font-weight: bold;">© 2026. All Rights Reserved.</p>
      </footer>
    </div> `;
  
  outputPage.innerHTML = content;
  previewArea.classList.remove('hidden');
});

/* PDF Download */
downloadBtn.addEventListener('click', () => {
  html2canvas(outputPage, { scale: 3, useCORS: true }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jspdf.jsPDF('p', 'pt', 'a4');
    pdf.addImage(imgData, 'PNG', 0, 0, 595.28, (canvas.height * 595.28) / canvas.width);
    pdf.save(currentMode === 'lab' ? 'Lab_Report.pdf' : 'Assignment_Cover.pdf');
  });
});
