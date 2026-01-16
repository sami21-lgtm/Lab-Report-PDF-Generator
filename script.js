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
        fullDate: `${document.getElementById('dd').value}/${document.getElementById('mm').value}/${document.getElementById('yy').value}`
    };

    let titleInfo = currentMode === 'lab' ? 
        `<strong>Lab No:</strong> ${document.getElementById('labNo').value} <br> <strong>Lab Name:</strong> ${document.getElementById('labTitle').value}` : 
        `<strong>Assignment:</strong> ${document.getElementById('assignTitle').value} <br> <strong>Topic:</strong> ${document.getElementById('topicName').value}`;

    outputPage.innerHTML = `
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.07; pointer-events: none; z-index: 0;">
            <img src="${LOGO_URL}" style="width: 450px;" crossorigin="anonymous">
        </div>

        <div style="position: relative; z-index: 1; height: 100%; display: flex; flex-direction: column; text-align: left;">
            <img src="${LOGO_URL}" style="display: block; margin: 0 auto 20px; height: 95px;" crossorigin="anonymous">
            
            <h1 style="text-align:center; color:#002b59; font-size: 24px; text-transform: uppercase; text-decoration: underline; margin-bottom: 25px;">
                ${currentMode === 'lab' ? 'Lab Report Submission' : 'Assignment Submission'}
            </h1>
            
            <div style="font-size: 16px; line-height: 1.8; color: #333;">
                <p><strong>Course Code:</strong> ${d.code}</p>
                <p><strong>Course Name:</strong> ${d.title}</p>
                <p><strong>Semester:</strong> ${d.sem}</p>
                <p>${titleInfo}</p>
            </div>

            <div style="margin-top: 40px; display: flex; flex-direction: column; gap: 30px;">
                <div style="text-align: center;">
                    <span style="background: #f0f4f8; padding: 5px 30px; border-radius: 20px; font-weight: bold; border: 1px solid #ccd; font-size: 14px; color: #002b59;">Submitted To</span>
                </div>
                <div style="padding-left: 20px; border-left: 4px solid #002b59; margin-left: 10px;">
                    <p style="font-size: 18px; font-weight: bold;">${d.fname}</p>
                    <p style="font-size: 14px; font-style: italic; color: #555;">${d.fdes}</p>
                    <p style="font-size: 15px;">Department of ${d.fdept}</p>
                    <p style="font-size: 15px; font-weight: 500;">Daffodil International University</p>
                </div>

                <div style="text-align: center;">
                    <span style="background: #f0f4f8; padding: 5px 30px; border-radius: 20px; font-weight: bold; border: 1px solid #ccd; font-size: 14px; color: #002b59;">Submitted By</span>
                </div>
                <div style="padding-left: 20px; border-left: 4px solid #002b59; margin-left: 10px;">
                    <p style="font-size: 18px; font-weight: bold;">${d.sname}</p>
                    <p style="font-size: 15px;"><strong>ID:</strong> ${d.sid}</p>
                    <p style="font-size: 15px;"><strong>Section:</strong> ${d.sec}</p>
                    <p style="font-size: 15px;"><strong>Date:</strong> ${d.fullDate}</p>
                    <p style="font-size: 15px; font-weight: 500;">Daffodil International University</p>
                </div>
            </div>

            <div style="margin-top: auto; text-align: center; border-top: 1px solid #eee; padding-top: 15px;">
                <p style="font-family: 'Times New Roman', serif; font-size: 16px; color: #002b59; font-style: italic; letter-spacing: 3px; text-transform: uppercase; font-weight: bold;">
                    Daffodil International University
                </p>
            </div>
        </div>`;

    previewArea.style.display = 'block';
};

// Functions to Download
document.getElementById('downloadBtn').onclick = () => {
    html2canvas(outputPage, { scale: 3, useCORS: true }).then(canvas => {
        const pdf = new jspdf.jsPDF('p', 'pt', 'a4');
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 595.28, 841.89);
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
