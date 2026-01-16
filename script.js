// Configuration
const LOGO_URL = 'https://upload.wikimedia.org/wikipedia/en/3/3c/Daffodil_International_University_logo.png';

// Elements
const labBtn = document.getElementById('labBtn');
const assignBtn = document.getElementById('assignBtn');
const labOnly = document.getElementById('labOnly');
const assignOnly = document.getElementById('assignOnly');
const genBtn = document.getElementById('genBtn');
const previewArea = document.getElementById('previewArea');
const outputPage = document.getElementById('outputPage');
const downloadBtn = document.getElementById('downloadBtn');

let currentMode = 'lab';

// Mode Switching Logic
labBtn.addEventListener('click', () => {
    currentMode = 'lab';
    labBtn.classList.add('active');
    assignBtn.classList.remove('active');
    labOnly.classList.remove('hidden');
    assignOnly.classList.add('hidden');
});

assignBtn.addEventListener('click', () => {
    currentMode = 'assign';
    assignBtn.classList.add('active');
    labBtn.classList.remove('active');
    assignOnly.classList.remove('hidden');
    labOnly.classList.add('hidden');
});

// Main Generation Function
genBtn.addEventListener('click', () => {
    const data = {
        code: document.getElementById('courseCode').value,
        title: document.getElementById('courseTitle').value,
        section: document.getElementById('section').value,
        semester: document.getElementById('semester').value,
        sid: document.getElementById('sid').value,
        sname: document.getElementById('sname').value,
        sdept: document.getElementById('sdept').value,
        fname: document.getElementById('fname').value,
        fdept: document.getElementById('fdept').value,
        dd: document.getElementById('dd').value || 'DD',
        mm: document.getElementById('mm').value || 'MM',
        yy: document.getElementById('yy').value || 'YY'
    };

    // Header & Watermark
    let htmlContent = `
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.05; z-index: 0; pointer-events: none;">
            <img src="${LOGO_URL}" style="width: 450px;" crossorigin="anonymous">
        </div>
        <div style="position: relative; z-index: 1;">
            <img src="${LOGO_URL}" style="display: block; margin: 0 auto 20px; height: 100px;" crossorigin="anonymous">
    `;

    if (currentMode === 'lab') {
        const labNo = document.getElementById('labNo').value;
        const labTitle = document.getElementById('labTitle').value;
        htmlContent += `
            <h1 style="text-align:center; color:#002b59; font-size: 26px; text-transform: uppercase;">Lab Report Submission</h1>
            <p style="text-align:center; font-size:16px; margin-top:5px;">Course: ${data.code} - ${data.title}</p>
            <div style="margin: 40px 0; padding: 20px; border-left: 5px solid #002b59; background: #f9f9f9;">
                <p style="font-size: 12px; color: #666; text-transform: uppercase; margin:0;">Lab No: ${labNo || 'N/A'}</p>
                <p style="font-size: 20px; font-weight: bold; margin-top: 5px;">${labTitle || 'Untitled Lab'}</p>
            </div>
        `;
    } else {
        const aTitle = document.getElementById('assignTitle').value;
        const topic = document.getElementById('topicName').value;
        htmlContent += `
            <h1 style="text-align:center; color:#002b59; font-size: 26px; text-transform: uppercase;">Assignment Submission</h1>
            <p style="text-align:center; font-size:16px; margin-top:5px;">Course: ${data.code} - ${data.title}</p>
            <div style="margin: 40px 0; padding: 20px; border: 1px dashed #002b59; background: #fdfdfd;">
                <p style="font-size: 12px; color: #666; text-transform: uppercase; margin:0;">Assignment Title: ${aTitle || 'N/A'}</p>
                <p style="font-size: 20px; font-weight: bold; margin-top: 5px;">Topic: ${topic || 'N/A'}</p>
            </div>
        `;
    }

    // Common Footer Info
    htmlContent += `
        <div style="display:flex; justify-content:space-between; margin-top:60px;">
            <div style="width: 48%; border-right: 1px solid #eee; padding-right: 10px;">
                <p style="font-weight: bold; border-bottom: 1px solid #ccc; padding-bottom: 5px; font-size: 14px;">Submitted To</p>
                <p style="font-size: 16px; font-weight: bold; margin-top: 10px;">${data.fname}</p>
                <p style="font-size: 14px; color: #444;">Dept. of ${data.fdept}</p>
                <p style="font-size: 14px; color: #444;">Daffodil International University</p>
            </div>
            <div style="width: 48%; text-align: right;">
                <p style="font-weight: bold; border-bottom: 1px solid #ccc; padding-bottom: 5px; font-size: 14px;">Submitted By</p>
                <p style="font-size: 16px; font-weight: bold; margin-top: 10px;">${data.sname}</p>
                <p style="font-size: 14px; color: #444;">ID: ${data.sid}</p>
                <p style="font-size: 14px; color: #444;">Section: ${data.section} | ${data.semester}</p>
                <p style="font-size: 14px; color: #444;">Date: ${data.dd}/${data.mm}/${data.yy}</p>
            </div>
        </div>
        <footer style="position:absolute; bottom:30px; width:100%; left:0; text-align:center; border-top: 1px solid #eee; padding-top: 10px;">
            <p style="font-size: 9px; color: #888; margin:0;">Developed by Emtiaz Hossain Sami, Dept. of SWE, DIU</p>
            <p style="font-size: 9px; color: #002b59; font-weight: bold; margin-top:2px;">© 2026. All Rights Reserved.</p>
        </footer>
    </div>`;

    outputPage.innerHTML = htmlContent;
    previewArea.classList.remove('hidden');
    previewArea.scrollIntoView({ behavior: 'smooth' });
});

// PDF Download Function
downloadBtn.addEventListener('click', () => {
    const fileName = currentMode === 'lab' ? 'Lab_Report.pdf' : 'Assignment_Cover.pdf';
    html2canvas(outputPage, { scale: 3, useCORS: true }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF('p', 'pt', 'a4');
        pdf.addImage(imgData, 'PNG', 0, 0, 595.28, (canvas.height * 595.28) / canvas.width);
        pdf.save(fileName);
    });
});
