const LOGO_URL = 'diu.jpg';

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
        `<strong>Assignment Title:</strong> ${document.getElementById('assignTitle').value} <br> <strong>Topic:</strong> ${document.getElementById('topicName').value}`;

    outputPage.innerHTML = `
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.07; z-index: 0;">
            <img src="${LOGO_URL}" style="width: 450px;" crossorigin="anonymous">
        </div>

        <div style="position: relative; z-index: 1; height: 100%; display: flex; flex-direction: column; padding: 60px; border: 15px solid #fff; outline: 2px solid #002b59; outline-offset: -25px;">
            <div style="text-align: center; margin-bottom: 5px;">
                <img src="${LOGO_URL}" style="height: 90px;" crossorigin="anonymous">
            </div>
            <h2 style="text-align: center; color: #002b59; font-size: 18px; text-transform: uppercase; margin-bottom: 25px; letter-spacing: 1px;">Daffodil International University</h2>
            
            <h1 style="text-align:center; color:#002b59; font-size: 22px; text-transform: uppercase; text-decoration: underline; margin-bottom: 35px;">
                ${currentMode === 'lab' ? 'Lab Report Submission' : 'Assignment Submission'}
            </h1>
            
            <div style="font-size: 16px; line-height: 1.8; color: #111; margin-bottom: 40px;">
                <p><strong>Course Code:</strong> ${d.code}</p>
                <p><strong>Course Name:</strong> ${d.title}</p>
                <p><strong>Semester:</strong> ${d.sem}</p>
                <p>${titleInfo}</p>
            </div>

            <div style="display: flex; flex-direction: column; gap: 40px;">
                <div style="padding-left: 15px; border-left: 4px solid #002b59;">
                    <p style="font-size: 12px; color: #666; text-transform: uppercase;">Submitted To</p>
                    <p style="font-size: 18px; font-weight: bold; margin: 2px 0;">${d.fname}</p>
                    <p style="font-size: 14px;">${d.fdes}</p>
                    <p style="font-size: 14px;">Department of ${d.fdept}</p>
                </div>

                <div style="padding-left: 15px; border-left: 4px solid #002b59;">
                    <p style="font-size: 12px; color: #666; text-transform: uppercase;">Submitted By</p>
                    <p style="font-size: 18px; font-weight: bold; margin: 2px 0;">${d.sname}</p>
                    <p style="font-size: 15px;"><strong>ID:</strong> ${d.sid}</p>
                    <p style="font-size: 15px;"><strong>Section:</strong> ${d.sec}</p>
                    <p style="font-size: 15px;"><strong>Date:</strong> ${d.date}</p>
                </div>
            </div>

            <div style="margin-top: auto; text-align: center; border-top: 1px solid #ddd; padding-top: 15px;">
                <p style="font-size: 14px; color: #002b59; font-weight: bold; letter-spacing: 2px; text-transform: uppercase;">Daffodil International University</p>
            </div>
        </div>`;

    previewArea.style.display = 'block';
    window.scrollTo({ top: outputPage.offsetTop, behavior: 'smooth' });
};

document.getElementById('downloadBtn').onclick = () => {
    html2canvas(outputPage, { scale: 3, useCORS: true }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF('p', 'pt', 'a4');
        pdf.addImage(imgData, 'PNG', 0, 0, 595.28, 841.89);
        pdf.save('DIU_Cover_Page.pdf');
    });
};

document.getElementById('downloadImgBtn').onclick = () => {
    html2canvas(outputPage, { scale: 3, useCORS: true }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'DIU_Cover_Page.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
};
