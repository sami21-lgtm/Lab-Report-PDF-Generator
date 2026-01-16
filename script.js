// Const Logo
const LOGO_URL = 'https://upload.wikimedia.org/wikipedia/en/3/3c/Daffodil_International_University_logo.png';

// Elements
const labBtn = document.getElementById('labBtn');
const assignBtn = document.getElementById('assignBtn');
const labOnly = document.getElementById('labOnly');
const assignOnly = document.getElementById('assignOnly');
const genBtn = document.getElementById('genBtn');
const outputPage = document.getElementById('outputPage');
const previewArea = document.getElementById('previewArea');

let currentMode = 'lab';

// Tab Switching
labBtn.onclick = () => { currentMode = 'lab'; labBtn.classList.add('active'); assignBtn.classList.remove('active'); labOnly.style.display = 'block'; assignOnly.style.display = 'none'; };
assignBtn.onclick = () => { currentMode = 'assign'; assignBtn.classList.add('active'); labBtn.classList.remove('active'); assignOnly.style.display = 'block'; labOnly.style.display = 'none'; };

// Generate Logic
genBtn.onclick = function() {
    const d = {
        code: document.getElementById('courseCode').value,
        title: document.getElementById('courseTitle').value,
        sec: document.getElementById('section').value,
        sem: document.getElementById('semester').value,
        sid: document.getElementById('sid').value,
        sname: document.getElementById('sname').value,
        sdept: document.getElementById('sdept').value,
        fname: document.getElementById('fname').value,
        fdesignation: document.getElementById('fdesignation').value,
        fdept: document.getElementById('fdept').value,
        dd: document.getElementById('dd').value || 'DD',
        mm: document.getElementById('mm').value || 'MM',
        yy: document.getElementById('yy').value || 'YYYY'
    };

    let mainHeading = currentMode === 'lab' ? 'Lab Report Submission' : 'Assignment Submission';
    let extraHTML = currentMode === 'lab' ? 
        `<div style="margin: 35px 0; padding: 15px; border-left: 4px solid #002b59; background: #f4f7f9; text-align:left;">
            <p style="font-size: 11px; color: #555; text-transform: uppercase; letter-spacing:1px; margin:0;">Lab No: ${document.getElementById('labNo').value || 'N/A'}</p>
            <p style="font-size: 19px; font-weight: 700; margin-top: 5px; color:#002b59;">${document.getElementById('labTitle').value || 'Untitled Lab'}</p>
        </div>` :
        `<div style="margin: 35px 0; padding: 15px; border: 1px dashed #002b59; background: #fff; text-align:left;">
            <p style="font-size: 11px; color: #555; text-transform: uppercase; letter-spacing:1px; margin:0;">Assignment Title: ${document.getElementById('assignTitle').value || 'N/A'}</p>
            <p style="font-size: 19px; font-weight: 700; margin-top: 5px; color:#002b59;">Topic: ${document.getElementById('topicName').value || 'N/A'}</p>
        </div>`;

    outputPage.innerHTML = `
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.05; pointer-events: none; z-index: 0;">
            <img src="${LOGO_URL}" style="width: 420px;" crossorigin="anonymous">
        </div>

        <div style="position: relative; z-index: 1; height: 100%;">
            <img src="${LOGO_URL}" style="display: block; margin: 0 auto 15px; height: 85px;" crossorigin="anonymous">
            
            <h1 style="text-align:center; color:#002b59; font-size: 22px; text-transform: uppercase; letter-spacing: 1px; margin-bottom:0;">${mainHeading}</h1>
            <p style="text-align:center; font-size:14px; color:#444; margin-top:5px; border-bottom: 1px solid #eee; padding-bottom:15px;">Course: ${d.code} - ${d.title}</p>
            
            ${extraHTML}

            <div style="display:flex; justify-content:space-between; margin-top:40px; text-align:left;">
                <div style="width: 48%; border-right: 1px solid #f0f0f0; padding-right: 15px;">
                    <p style="font-weight: 700; border-bottom: 2px solid #002b59; display:inline-block; padding-bottom: 2px; font-size: 13px; color:#002b59; text-transform:uppercase;">Submitted To</p>
                    <p style="font-size: 16px; font-weight: 700; margin-top: 12px; color:#222;">${d.fname}</p>
                    <p style="font-size: 13px; color: #555; font-style: italic; margin-top:2px;">${d.fdesignation}</p>
                    <p style="font-size: 13px; color: #555;">Dept. of ${d.fdept}</p>
                    <p style="font-size: 13px; color: #555;">Daffodil International University</p>
                </div>
                <div style="width: 48%; text-align: right;">
                    <p style="font-weight: 700; border-bottom: 2px solid #002b59; display:inline-block; padding-bottom: 2px; font-size: 13px; color:#002b59; text-transform:uppercase;">Submitted By</p>
                    <p style="font-size: 16px; font-weight: 700; margin-top: 12px; color:#222;">${d.sname}</p>
                    <p style="font-size: 13px; color: #555;">ID: ${d.sid}</p>
                    <p style="font-size: 13px; color: #555;">Section: ${d.sec} | ${d.sem}</p>
                    <p style="font-size: 13px; color: #555;">Date: ${d.dd}/${d.mm}/${d.yy}</p>
                </div>
            </div>

            <footer style="position:absolute; bottom: 10px; width:100%; left:0; text-align:center;">
                <p style="font-family: 'Georgia', serif; font-size: 13px; color: #777; font-style: italic; letter-spacing: 2px;">
                    Daffodil International University
                </p>
                <div style="width: 40px; height: 1px; background: #002b59; margin: 5px auto;"></div>
            </footer>
        </div>`;

    previewArea.style.display = 'block';
    window.scrollTo({ top: outputPage.offsetTop - 20, behavior: 'smooth' });
};

// Download as PDF
document.getElementById('downloadBtn').onclick = function() {
    html2canvas(outputPage, { scale: 3, useCORS: true }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF('p', 'pt', 'a4');
        pdf.addImage(imgData, 'PNG', 0, 0, 595.28, (canvas.height * 595.28) / canvas.width);
        pdf.save('DIU_Cover_Page.pdf');
    });
};

// Download as Image
document.getElementById('downloadImgBtn').onclick = function() {
    html2canvas(outputPage, { scale: 3, useCORS: true }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'DIU_Cover_Page.png';
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
};
