// কনস্ট্যান্ট লোগো URL
const LOGO_URL = 'https://upload.wikimedia.org/wikipedia/en/3/3c/Daffodil_International_University_logo.png';

// এলিমেন্টগুলো সিলেক্ট করা
const labBtn = document.getElementById('labBtn');
const assignBtn = document.getElementById('assignBtn');
const labOnly = document.getElementById('labOnly');
const assignOnly = document.getElementById('assignOnly');
const genBtn = document.getElementById('genBtn');
const outputPage = document.getElementById('outputPage');
const previewArea = document.getElementById('previewArea');

let currentMode = 'lab';

// ট্যাব সুইচিং লজিক (Lab/Assignment)
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

// কভার পেজ জেনারেট করার লজিক
genBtn.onclick = function() {
    // ইনপুট থেকে ডেটা নেওয়া
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
        dd: document.getElementById('dd').value || 'DD',
        mm: document.getElementById('mm').value || 'MM',
        yy: document.getElementById('yy').value || 'YYYY'
    };

    // ল্যাব বা অ্যাসাইনমেন্টের নির্দিষ্ট তথ্য
    let subTitleHTML = currentMode === 'lab' ? 
        `<strong>Lab No:</strong> ${document.getElementById('labNo').value || 'N/A'} <br> 
         <strong>Lab Name:</strong> ${document.getElementById('labTitle').value || 'Untitled Lab'}` : 
        `<strong>Assignment No:</strong> ${document.getElementById('assignNo').value || 'N/A'} <br> 
         <strong>Topic:</strong> ${document.getElementById('topicName').value || 'N/A'}`;

    // আউটপুট পেজের HTML গঠন
    outputPage.innerHTML = `
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.05; pointer-events: none; z-index: 0;">
            <img src="${LOGO_URL}" style="width: 420px;" crossorigin="anonymous">
        </div>

        <div style="position: relative; z-index: 1; height: 100%; display: flex; flex-direction: column;">
            
            <img src="${LOGO_URL}" style="display: block; margin: 0 auto 15px; height: 85px;" crossorigin="anonymous">
            
            <h1 style="text-align:center; color:#002b59; font-size: 22px; text-transform: uppercase; margin-bottom:5px; text-decoration: underline;">
                ${currentMode === 'lab' ? 'Lab Report Submission' : 'Assignment Submission'}
            </h1>
            
            <div style="text-align: left; font-size: 15px; color: #333; line-height: 1.8; margin-top: 20px;">
                <p><strong>Course Code:</strong> ${d.code}</p>
                <p><strong>Course Name:</strong> ${d.title}</p>
                <p><strong>Semester:</strong> ${d.sem}</p> 
                <p>${subTitleHTML}</p>
            </div>

            <div style="margin-top: 35px; display: flex; flex-direction: column; gap: 25px;">
                
                <div style="text-align: center;">
                    <span style="background: #eef2f7; padding: 3px 25px; border-radius: 20px; font-weight: bold; border: 1px solid #ccc; font-size: 14px; color:#002b59;">Submitted To</span>
                </div>
                <div style="text-align: left; padding-left: 15px; border-left: 3px solid #002b59; margin-left: 10px;">
                    <p style="font-size: 16px; font-weight: bold;">${d.fname}</p>
                    <p style="font-size: 13px; font-style: italic; color: #555;">${d.fdes}</p>
                    <p style="font-size: 14px;">Dept. of ${d.fdept}</p>
                    <p style="font-size: 14px; font-weight: 500;">Daffodil International University</p>
                </div>

                <div style="text-align: center;">
                    <span style="background: #eef2f7; padding: 3px 25px; border-radius: 20px; font-weight: bold; border: 1px solid #ccc; font-size: 14px; color:#002b59;">Submitted By</span>
                </div>
                <div style="text-align: left; padding-left: 15px; border-left: 3px solid #002b59; margin-left: 10px;">
                    <p style="font-size: 16px; font-weight: bold;">${d.sname}</p>
                    <p style="font-size: 14px;"><strong>ID:</strong> ${d.sid}</p>
                    <p style="font-size: 14px;"><strong>Section:</strong> ${d.sec}</p>
                    <p style="font-size: 14px; font-weight: 500;">Daffodil International University</p>
                </div>
            </div>

            <div style="margin-top: 40px; text-align: center;">
                <span style="border: 1px solid #002b59; padding: 6px 25px; border-radius: 25px; font-weight: bold; font-size: 14px; background: #fff;">
                    Submission Date: ${d.dd}/${d.mm}/${d.yy}
                </span>
            </div>

            <div style="margin-top: auto; text-align: center; border-top: 1px solid #eee; padding-top: 10px;">
                <p style="font-size: 10px; color: #999; margin-bottom: 2px;">www.diucoverpage.com</p>
                <p style="font-family: 'Georgia', serif; font-size: 15px; color: #002b59; font-style: italic; letter-spacing: 2px; text-transform: uppercase; font-weight: 500;">
                    Daffodil International University
                </p>
            </div>
        </div>`;

    // প্রিভিউ এরিয়া দেখানো এবং স্ক্রল করা
    previewArea.style.display = 'block';
    window.scrollTo({ top: outputPage.offsetTop - 50, behavior: 'smooth' });
};

// PDF ডাউনলোড করার ফাংশন
document.getElementById('downloadBtn').onclick = function() {
    html2canvas(outputPage, { scale: 3, useCORS: true }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF('p', 'pt', 'a4');
        pdf.addImage(imgData, 'PNG', 0, 0, 595.28, (canvas.height * 595.28) / canvas.width);
        pdf.save('DIU_Cover_Page.pdf');
    });
};

// ইমেজ (Pic) হিসেবে ডাউনলোড করার ফাংশন
document.getElementById('downloadImgBtn').onclick = function() {
    html2canvas(outputPage, { scale: 3, useCORS: true }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'DIU_Cover_Page.png';
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
};
