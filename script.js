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
        `<strong>Lab No:</strong> ${document.getElementById('labNo').value} <br> <strong>Lab Title:</strong> ${document.getElementById('labTitle').value}` : 
        `<strong>Assignment:</strong> ${document.getElementById('assignTitle').value} <br> <strong>Topic:</strong> ${document.getElementById('topicName').value}`;

    outputPage.innerHTML = `
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.08; pointer-events: none; z-index: 0;">
            <img src="${LOGO_URL}" style="width: 450px;" crossorigin="anonymous">
        </div>

        <div style="position: relative; z-index: 1; height: 100%; display: flex; flex-direction: column; border: 4px double #002b59; padding: 40px; box-sizing: border-box;">
            <div style="text-align: center; margin-bottom: 15px;">
                <img src="${LOGO_URL}" style="height: 100px;" crossorigin="anonymous">
            </div>
            
            <h1 style="text-align:center; color:#002b59; font-size: 22px; text-transform: uppercase; margin-bottom: 25px;">
                ${currentMode === 'lab' ? 'Lab Report Submission' : 'Assignment Submission'}
            </h1>
            
            <div style="text-align: left; font-size: 16px; line-height: 1.8; color: #222; margin-bottom: 30px;">
                <p><strong>Course Code:</strong> ${d.code}</p>
                <p><strong>Course Name:</strong> ${d.title}</p>
                <p><strong>Semester:</strong> ${d.sem}</p>
                <p>${titleInfo}</p>
            </div>

            <div style="display: flex; flex-direction: column; gap: 35px;">
                <div style="padding-left: 20px; border-left: 5px solid #002b59;">
                    <p style="font-size: 13px; text-transform: uppercase; color: #666; margin:0;">Submitted To:</p>
                    <p style="font-size: 18px; font-weight: bold; margin: 5px 0;">${d.fname}</p>
                    <p style="font-size: 14px; margin:0;">${d.fdes}</p>
                    <p style="font-size: 14px; margin:0;">Department of ${d.fdept}</p>
                    <p style="font-size: 14px; font-weight: bold; color:#002b59;">Daffodil International University</p>
                </div>

                <div style="padding-left: 20px; border-left: 5px solid #002b59;">
                    <p style="font-size: 13px; text-transform: uppercase; color: #666; margin:0;">Submitted By:</p>
                    <p style="font-size: 18px; font-weight: bold; margin: 5px 0;">${d.sname}</p>
                    <p style="font-size: 15px; margin:0;"><strong>ID:</strong> ${d.sid}</p>
                    <p style="font-size: 15px; margin:0;"><strong>Section:</strong> ${d.sec}</p>
                    <p style="font-size: 15px; margin:0;"><strong>Date:</strong> ${d.date}</p>
                    <p style="font-size: 14px; font-weight: bold; color:#002b59;">Daffodil International University</p>
                </div>
            </div>

            <div style="margin-top: auto; text-align: center; border-top: 1px solid #002b59; padding-top: 15px;">
                <p style="font-size: 16px; color: #002b59; font-weight: bold; letter-spacing: 2px; text-transform: uppercase;">
                    Daffodil International University
                </p>
            </div>
        </div>`;

    previewArea.style.display = 'block';
    window.scrollTo({ top: outputPage.offsetTop, behavior: 'smooth' });
};

// PDF Download
document.getElementById('downloadBtn').onclick = () => {
    html2canvas(outputPage, { scale: 3, useCORS: true }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF('p', 'pt', 'a4');
        pdf.addImage(imgData, 'PNG', 0, 0, 595.28, 841.89);
        pdf.save('DIU_Cover_Page.pdf');
    });
};

// Image Download
document.getElementById('downloadImgBtn').onclick = () => {
    html2canvas(outputPage, { scale: 3, useCORS: true }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'DIU_Cover_Page.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
};
