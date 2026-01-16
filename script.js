const LOGO_URL = 'https://upload.wikimedia.org/wikipedia/en/3/3c/Daffodil_International_University_logo.png';

const labBtn = document.getElementById('labBtn');
const assignBtn = document.getElementById('assignBtn');
const labOnly = document.getElementById('labOnly');
const assignOnly = document.getElementById('assignOnly');
const genBtn = document.getElementById('genBtn');
const outputPage = document.getElementById('outputPage');
const previewArea = document.getElementById('previewArea');

let currentMode = 'lab';

// মোড সুইচিং (Lab vs Assignment)
labBtn.onclick = () => { 
    currentMode = 'lab'; 
    labBtn.classList.add('active'); 
    assignBtn.classList.remove('active'); 
    labOnly.style.display = 'block'; 
    assignOnly.style.display = 'none'; 
};

assignBtn.onclick = () => { 
    currentMode = 'assign'; 
    assignBtn.classList.add('active'); 
    labBtn.classList.remove('active'); 
    assignOnly.style.display = 'block'; 
    labOnly.style.display = 'none'; 
};

// কভার পেজ জেনারেটর
genBtn.onclick = function() {
    // ফর্ম থেকে ডাটা সংগ্রহ
    const d = {
        code: document.getElementById('courseCode').value || 'N/A',
        title: document.getElementById('courseTitle').value || 'N/A',
        sec: document.getElementById('section').value || 'N/A',
        sem: document.getElementById('semester').value || 'N/A',
        sid: document.getElementById('sid').value || 'N/A',
        sname: document.getElementById('sname').value || 'N/A',
        fname: document.getElementById('fname').value || 'N/A',
        fdes: document.getElementById('fdesignation').value || 'N/A',
        fdept: document.getElementById('fdept').value || 'N/A',
        date: `${document.getElementById('dd').value || 'DD'}/${document.getElementById('mm').value || 'MM'}/${document.getElementById('yy').value || '2026'}`
    };

    let titleInfo = currentMode === 'lab' ? 
        `<strong>Lab No:</strong> ${document.getElementById('labNo').value || '01'} <br> <strong>Lab Title:</strong> ${document.getElementById('labTitle').value || 'N/A'}` : 
        `<strong>Assignment:</strong> ${document.getElementById('assignTitle').value || 'N/A'} <br> <strong>Topic:</strong> ${document.getElementById('topicName').value || 'N/A'}`;

    // আউটপুট পেজ জেনারেশন (এখানে আপনার ক্রেডিট থাকবে না)
    outputPage.innerHTML = `
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.08; pointer-events: none; z-index: 0;">
            <img src="${LOGO_URL}" style="width: 450px;" crossorigin="anonymous">
        </div>

        <div style="position: relative; z-index: 1; height: 100%; display: flex; flex-direction: column; border: 2px solid #002b59; padding: 40px; box-sizing: border-box;">
            <div style="text-align: center; margin-bottom: 10px;">
                <img src="${LOGO_URL}" style="height: 85px;" crossorigin="anonymous">
            </div>
            
            <h1 style="text-align:center; color:#002b59; font-size: 20px; text-transform: uppercase; margin-bottom: 5px;">
                Daffodil International University
            </h1>
            <h2 style="text-align:center; color:#444; font-size: 16px; text-transform: uppercase; border-bottom: 2px solid #002b59; padding-bottom: 10px; margin-bottom: 20px;">
                ${currentMode === 'lab' ? 'Lab Report Submission' : 'Assignment Submission'}
            </h2>
            
            <div style="text-align: left; font-size: 15px; line-height: 1.6; color: #222; margin-bottom: 20px;">
                <p><strong>Course Code:</strong> ${d.code}</p>
                <p><strong>Course Name:</strong> ${d.title}</p>
                <p><strong>Semester:</strong> ${d.sem}</p>
                <p>${titleInfo}</p>
            </div>

            <div style="display: flex; flex-direction: column; gap: 25px;">
                <div>
                    <span style="display: inline-block; background: #002b59; color: #fff; padding: 2px 15px; border-radius: 4px; font-size: 12px; margin-bottom: 8px;">Submitted To</span>
                    <div style="padding-left: 15px; border-left: 3px solid #002b59;">
                        <p style="font-size: 17px; font-weight: bold; margin: 0;">${d.fname}</p>
                        <p style="font-size: 13px; color: #555; margin: 2px 0;">${d.fdes}</p>
                        <p style="font-size: 13px; margin: 0;">Department of ${d.fdept}</p>
                        <p style="font-size: 13px; font-weight: bold; color: #002b59;">Daffodil International University</p>
                    </div>
                </div>

                <div>
                    <span style="display: inline-block; background: #002b59; color: #fff; padding: 2px 15px; border-radius: 4px; font-size: 12px; margin-bottom: 8px;">Submitted By</span>
                    <div style="padding-left: 15px; border-left: 3px solid #002b59;">
                        <p style="font-size: 17px; font-weight: bold; margin: 0;">${d.sname}</p>
                        <p style="font-size: 14px; margin: 2px 0;"><strong>ID:</strong> ${d.sid}</p>
                        <p style="font-size: 14px; margin: 2px 0;"><strong>Section:</strong> ${d.sec}</p>
                        <p style="font-size: 14px; margin: 2px 0;"><strong>Date:</strong> ${d.date}</p>
                        <p style="font-size: 13px; font-weight: bold; color: #002b59;">Daffodil International University</p>
                    </div>
                </div>
            </div>

            <div style="margin-top: auto; text-align: center; border-top: 1px solid #ddd; padding-top: 10px;">
                <p style="font-size: 13px; color: #002b59; letter-spacing: 1px; text-transform: uppercase; font-weight: bold; margin: 0;">
                    Daffodil International University
                </p>
                <p style="font-size: 11px; color: #666; margin: 2px 0;">Ashulia, Savar, Dhaka</p>
            </div>
        </div>`;

    previewArea.style.display = 'block';
    // অটো স্ক্রল ডাউন যাতে ইউজার প্রিভিউ দেখতে পায়
    window.scrollTo({ top: outputPage.offsetTop, behavior: 'smooth' });
};

// PDF ডাউনলোড ফাংশন
document.getElementById('downloadBtn').onclick = () => {
    const opt = {
        scale: 3, // হাই কোয়ালিটির জন্য
        useCORS: true,
        allowTaint: false,
        letterRendering: true
    };
    
    html2canvas(outputPage, opt).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF('p', 'pt', 'a4');
        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();
        
        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
        pdf.save(`Cover_Page_${document.getElementById('sid').value || 'DIU'}.pdf`);
    });
};

// ইমেজ ডাউনলোড ফাংশন
document.getElementById('downloadImgBtn').onclick = () => {
    html2canvas(outputPage, { scale: 3, useCORS: true }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'DIU_Cover_Page.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
};
