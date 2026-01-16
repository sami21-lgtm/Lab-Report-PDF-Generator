const LOGO_URL = 'https://upload.wikimedia.org/wikipedia/en/3/3c/Daffodil_International_University_logo.png';

const labBtn = document.getElementById('labBtn');
const assignBtn = document.getElementById('assignBtn');
const labOnly = document.getElementById('labOnly');
const assignOnly = document.getElementById('assignOnly');
const genBtn = document.getElementById('genBtn');
const outputPage = document.getElementById('outputPage');
const previewArea = document.getElementById('previewArea');

let currentMode = 'lab';

labBtn.onclick = () => { currentMode = 'lab'; labBtn.classList.add('active'); assignBtn.classList.remove('active'); labOnly.style.display = 'block'; assignOnly.style.display = 'none'; };
assignBtn.onclick = () => { currentMode = 'assign'; assignBtn.classList.add('active'); labBtn.classList.remove('active'); assignOnly.style.display = 'block'; labOnly.style.display = 'none'; };

genBtn.onclick = function() {
    const d = {
        code: document.getElementById('courseCode').value,
        title: document.getElementById('courseTitle').value,
        sec: document.getElementById('section').value,
        sem: document.getElementById('semester').value,
        sid: document.getElementById('sid').value,
        sname: document.getElementById('sname').value,
        fname: document.getElementById('fname').value,
        fdes: document.getElementById('fdesignation').value,
        fdept: document.getElementById('fdept').value,
        date: `${document.getElementById('dd').value}/${document.getElementById('mm').value}/${document.getElementById('yy').value}`
    };

    let titleInfo = currentMode === 'lab' ? 
        `Lab No: ${document.getElementById('labNo').value} <br> Topic: ${document.getElementById('labTitle').value}` : 
        `Assignment Title: ${document.getElementById('assignTitle').value} <br> Topic: ${document.getElementById('topicName').value}`;

    outputPage.innerHTML = `
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.05; z-index: 0;">
            <img src="${LOGO_URL}" style="width: 400px;" crossorigin="anonymous">
        </div>

        <div style="position: relative; z-index: 1; height: 100%; display: flex; flex-direction: column;">
            <img src="${LOGO_URL}" style="display: block; margin: 0 auto 20px; height: 90px;" crossorigin="anonymous">
            
            <h1 style="text-align:center; color:#002b59; font-size: 22px; text-transform: uppercase;">${currentMode === 'lab' ? 'Lab Report Submission' : 'Assignment Submission'}</h1>
            <p style="text-align:center; font-size:16px; margin-bottom: 30px;">Course: ${d.code} - ${d.title}</p>
            
            <div style="margin: 20px 0; padding: 20px; border: 1px dashed #002b59; background: #f9f9f9; text-align: left;">
                <p style="font-size: 18px; font-weight: bold; line-height: 1.6;">${titleInfo}</p>
            </div>

            <div style="display:flex; justify-content:space-between; margin-top: auto; padding-bottom: 40px; text-align: left;">
                <div style="width: 48%;">
                    <p style="font-weight: bold; border-bottom: 1px solid #ccc; font-size: 14px; margin-bottom: 10px;">Submitted To</p>
                    <p style="font-size: 16px; font-weight: bold;">${d.fname}</p>
                    <p style="font-size: 13px; font-style: italic;">${d.fdes}</p>
                    <p style="font-size: 14px;">Dept. of ${d.fdept}</p>
                </div>
                <div style="width: 48%; text-align: right;">
                    <p style="font-weight: bold; border-bottom: 1px solid #ccc; font-size: 14px; margin-bottom: 10px;">Submitted By</p>
                    <p style="font-size: 16px; font-weight: bold;">${d.sname}</p>
                    <p style="font-size: 14px;">ID: ${d.sid}</p>
                    <p style="font-size: 14px;">Date: ${d.date}</p>
                </div>
            </div>

            <div style="text-align: center; border-top: 1px solid #eee; padding-top: 10px;">
                <p style="font-family: 'Georgia', serif; font-size: 14px; color: #002b59; font-style: italic; letter-spacing: 2px; text-transform: uppercase;">
                    Daffodil International University
                </p>
            </div>
        </div>`;

    previewArea.style.display = 'block';
};

// Download Functions
document.getElementById('downloadBtn').onclick = () => {
    html2canvas(outputPage, { scale: 3, useCORS: true }).then(canvas => {
        const pdf = new jspdf.jsPDF('p', 'pt', 'a4');
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 595, 841);
        pdf.save('Cover_Page.pdf');
    });
};

document.getElementById('downloadImgBtn').onclick = () => {
    html2canvas(outputPage, { scale: 3, useCORS: true }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'Cover_Page.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
};
