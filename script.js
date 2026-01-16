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

    let subTitleHTML = currentMode === 'lab' ? 
        `<strong>Lab No:</strong> ${document.getElementById('labNo').value || 'N/A'} <br> 
         <strong>Lab Name:</strong> ${document.getElementById('labTitle').value || 'Untitled Lab'}` : 
        `<strong>Assignment Title:</strong> ${document.getElementById('assignTitle').value || 'N/A'} <br> 
         <strong>Topic:</strong> ${document.getElementById('topicName').value || 'N/A'}`;

    outputPage.innerHTML = `
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.06; pointer-events: none; z-index: 0;">
            <img src="${LOGO_URL}" style="width: 420px;" crossorigin="anonymous">
        </div>

        <div style="position: relative; z-index: 1; height: 100%; display: flex; flex-direction: column;">
            
            <div style="text-align: center; margin-bottom: 20px;">
                <img src="${LOGO_URL}" style="height: 90px;" crossorigin="anonymous">
            </div>
            
            <h1 style="text-align:center; color:#002b59; font-size: 24px; text-transform: uppercase; margin-bottom:5px; border-bottom: 2px solid #002b59; display: inline-block; align-self: center; padding-bottom: 5px;">
                ${currentMode === 'lab' ? 'Lab Report Submission' : 'Assignment Submission'}
            </h1>
            
            <div style="text-align: left; font-size: 16px; color: #222; line-height: 1.8; margin-top: 25px; background: #fdfdfd; padding: 15px; border-radius: 5px;">
                <p><strong>Course Code:</strong> ${d.code}</p>
                <p><strong>Course Name:</strong> ${d.title}</p>
                <p><strong>Semester:</strong> ${d.sem}</p> 
                <p>${subTitleHTML}</p>
            </div>

            <div style="margin-top: 40px; display: flex; flex-direction: column; gap: 30px;">
                
                <div style="text-align: center;">
                    <span style="background: #002b59; color: white; padding: 4px 30px; border-radius: 20px; font-weight: bold; font-size: 14px; text-transform: uppercase;">Submitted To</span>
                </div>
                <div style="text-align: left; padding-left: 20px; border-left: 4px solid #002b59; margin-left: 10px;">
                    <p style="font-size: 18px; font-weight: bold; color: #222;">${d.fname}</p>
                    <p style="font-size: 14px; font-style: italic; color: #555; margin-bottom: 2px;">${d.fdes}</p>
                    <p style="font-size: 14px; color: #444;">Department of ${d.fdept}</p>
                    <p style="font-size: 14px; color: #444;">Daffodil International University</p>
                </div>

                <div style="text-align: center;">
                    <span style="background: #002b59; color: white; padding: 4px 30px; border-radius: 20px; font-weight: bold; font-size: 14px; text-transform: uppercase;">Submitted By</span>
                </div>
                <div style="text-align: left; padding-left: 20px; border-left: 4px solid #002b59; margin-left: 10px;">
                    <p style="font-size: 18px; font-weight: bold; color: #222;">${d.sname}</p>
                    <p style="font-size: 15px; color: #444;"><strong>ID:</strong> ${d.sid}</p>
                    <p style="font-size: 15px; color: #444;"><strong>Section:</strong> ${d.sec}</p>
                    <p style="font-size: 15px; color: #444;"><strong>Date:</strong> ${d.fullDate}</p>
                    <p style="font-size: 14px; color: #444;">Daffodil International University</p>
                </div>
            </div>

            <div style="margin-top: auto; text-align: center; border-top: 1px solid #eee; padding-top: 15px;">
                <p style="font-family: 'Times New Roman', Times, serif; font-size: 16px; color: #002b59; font-style: italic; letter-spacing: 3px; text-transform: uppercase; font-weight: bold;">
                    Daffodil International University
                </p>
                <div style="width: 50px; height: 2px; background: #002b59; margin: 8px auto;"></div>
            </div>
        </div>`;

    previewArea.style.display = 'block';
    window.scrollTo({ top: outputPage.offsetTop - 50, behavior: 'smooth' });
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
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
};
