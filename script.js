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

// Tab Switching Logic
labBtn.onclick = function() {
    currentMode = 'lab';
    labBtn.classList.add('active');
    assignBtn.classList.remove('active');
    labOnly.style.display = 'block';
    assignOnly.style.display = 'none';
};

assignBtn.onclick = function() {
    currentMode = 'assign';
    assignBtn.classList.add('active');
    labBtn.classList.remove('active');
    assignOnly.style.display = 'block';
    labOnly.style.display = 'none';
};

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
        fdept: document.getElementById('fdept').value,
        dd: document.getElementById('dd').value || 'DD',
        mm: document.getElementById('mm').value || 'MM',
        yy: document.getElementById('yy').value || 'YY'
    };

    let mainHeading = currentMode === 'lab' ? 'Lab Report Submission' : 'Assignment Submission';
    let extraHTML = '';

    if (currentMode === 'lab') {
        const lNo = document.getElementById('labNo').value;
        const lTitle = document.getElementById('labTitle').value;
        extraHTML = `
            <div style="margin: 40px 0; padding: 20px; border-left: 5px solid #002b59; background: #f9f9f9;">
                <p style="font-size: 12px; color: #666; text-transform: uppercase; margin:0;">Lab No: ${lNo || 'N/A'}</p>
                <p style="font-size: 20px; font-weight: bold; margin-top: 5px;">${lTitle || 'Untitled Lab'}</p>
            </div>`;
    } else {
        const aTitle = document.getElementById('assignTitle').value;
        const topic = document.getElementById('topicName').value;
        extraHTML = `
            <div style="margin: 40px 0; padding: 20px; border: 1px dashed #002b59; background: #fdfdfd;">
                <p style="font-size: 12px; color: #666; text-transform: uppercase; margin:0;">Assignment Title: ${aTitle || 'N/A'}</p>
                <p style="font-size: 20px; font-weight: bold; margin-top: 5px;">Topic: ${topic || 'N/A'}</p>
            </div>`;
    }

    outputPage.innerHTML = `
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.05; pointer-events: none;">
            <img src="${LOGO_URL}" style="width: 450px;" crossorigin="anonymous">
        </div>
        <div style="position: relative; z-index: 1;">
            <img src="${LOGO_URL}" style="display: block; margin: 0 auto 20px; height: 100px;" crossorigin="anonymous">
            <h1 style="text-align:center; color:#002b59; font-size: 24px; text-transform: uppercase;">${mainHeading}</h1>
            <p style="text-align:center; font-size:16px; margin-top:5px;">Course: ${d.code} - ${d.title}</p>
            
            ${extraHTML}

            <div style="display:flex; justify-content:space-between; margin-top:60px;">
                <div style="width: 48%; border-right: 1px solid #eee; padding-right: 10px;">
                    <p style="font-weight: bold; border-bottom: 1px solid #ccc; padding-bottom: 5px; font-size: 14px;">Submitted To</p>
                    <p style="font-size: 16px; font-weight: bold; margin-top: 10px;">${d.fname}</p>
                    <p style="font-size: 14px; color: #444;">Dept. of ${d.fdept}</p>
                    <p style="font-size: 14px; color: #444;">Daffodil International University</p>
                </div>
                <div style="width: 48%; text-align: right;">
                    <p style="font-weight: bold; border-bottom: 1px solid #ccc; padding-bottom: 5px; font-size: 14px;">Submitted By</p>
                    <p style="font-size: 16px; font-weight: bold; margin-top: 10px;">${d.sname}</p>
                    <p style="font-size: 14px; color: #444;">ID: ${d.sid}</p>
                    <p style="font-size: 14px; color: #444;">Section: ${d.sec} | ${d.sem}</p>
                    <p style="font-size: 14px; color: #444;">Date: ${d.dd}/${d.mm}/${d.yy}</p>
                </div>
            </div>
            <footer style="position:absolute; bottom:20px; width:100%; left:0; text-align:center; border-top: 1px solid #eee; padding-top: 10px;">
                <p style="font-size: 9px; color: #888; margin:0;">Developed by Emtiaz Hossain Sami, Dept. of SWE, DIU</p>
                <p style="font-size: 9px; color: #002b59; font-weight: bold; margin-top:2px;">© 2026. All Rights Reserved.</p>
            </footer>
        </div>`;

    previewArea.style.display = 'block';
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
};

// Download Function
document.getElementById('downloadBtn').onclick = function() {
    html2canvas(outputPage, { scale: 3, useCORS: true }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF('p', 'pt', 'a4');
        pdf.addImage(imgData, 'PNG', 0, 0, 595.28, (canvas.height * 595.28) / canvas.width);
        pdf.save('DIU_Report.pdf');
    });
};
