// ---------- auto DIU logo ----------
const LOGO_URL =
  'https://upload.wikimedia.org/wikipedia/en/3/3c/Daffodil_International_University_logo.png';

const labBtn     = document.getElementById('labBtn');
const covBtn     = document.getElementById('covBtn');
const genBtn     = document.getElementById('genBtn');
const labOnly    = document.getElementById('labOnly');
const covOnly    = document.getElementById('covOnly');
const previewArea= document.getElementById('previewArea');
const outputPage = document.getElementById('outputPage');
const downloadBtn= document.getElementById('downloadBtn');
const printBtn   = document.getElementById('printBtn');

let currentMode = 'lab'; // 'lab' || 'cover'

/* ---------- toggle ---------- */
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

/* ---------- common data ---------- */
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
    mm: document.getElementById('mm').value.padStart(2,'0'),
    yy: document.getElementById('yy').value.padStart(2,'0'),
    dd: document.getElementById('dd').value.padStart(2,'0')
  };
}

/* ---------- generate ---------- */
genBtn.addEventListener('click', () => {
  const d = getData();
  if (currentMode === 'lab') {
    const labNo   = document.getElementById('labNo').value;
    const labTitle= document.getElementById('labTitle').value;
    outputPage.innerHTML = `
      <img class="logo" src="${LOGO_URL}" cross-origin="anonymous"/>
      <h1>Lab Report Submission</h1>
      <p class="lab-no">Lab No: ${labNo}</p>
      <div class="submitted-box">
        <p><strong>Submitted To</strong></p>
        <p>Department of ${d.fdept}</p>
        <p>Faculty: ${d.fname}</p>
      </div>
      <div class="student-box">
        <p><strong>Submitted By</strong></p>
        <p>ID: ${d.sid}</p>
        <p>Name: ${d.sname}</p>
        <p>Date: ${d.mm}/${d.yy}/${d.dd}</p>
      </div>
      <footer>Daffodil International University</footer>
    `;
  } else {
    const title = document.getElementById('covTitle').value;
    outputPage.innerHTML = `
      <img class="logo" src="${LOGO_URL}" cross-origin="anonymous"/>
      <h2>${title}</h2>
      <table>
        <tr><td>Course Code</td><td>${d.course}</td></tr>
        <tr><td>Section</td><td>${d.section}</td></tr>
        <tr><td>Semester</td><td>${d.semester}</td></tr>
        <tr><td>Student ID</td><td>${d.sid}</td></tr>
        <tr><td>Student Name</td><td>${d.sname}</td></tr>
        <tr><td>Student Dept.</td><td>${d.sdept}</td></tr>
        <tr><td>Faculty Name</td><td>${d.fname}</td></tr>
        <tr><td>Faculty Dept.</td><td>${d.fdept}</td></tr>
        <tr><td>Date</td><td>${d.mm}/${d.yy}/${d.dd}</td></tr>
      </table>
      <footer>Daffodil International University</footer>
    `;
  }
  previewArea.classList.remove('hidden');
  window.scrollTo(0, previewArea.offsetTop);
});

/* ---------- download ---------- */
downloadBtn.addEventListener('click', () => {
  const fileName = currentMode === 'lab' ? 'DIU_Lab_Report.pdf' : 'DIU_Lab_Cover.pdf';
  html2canvas(outputPage, { scale: 2, useCORS: true }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jspdf.jsPDF('p', 'pt', 'a4');
    const imgWidth = 595;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(fileName);
  });
});

/* ---------- print (shadow overlay) ---------- */
printBtn.addEventListener('click', () => {
  window.print(); 
});
