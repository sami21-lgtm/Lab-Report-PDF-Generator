const LOCAL_LOGO = 'diu.jpg'; 

const labBtn = document.getElementById('labBtn');
const assignBtn = document.getElementById('assignBtn');
const labOnly = document.getElementById('labOnly');
const assignOnly = document.getElementById('assignOnly');
const genBtn = document.getElementById('genBtn');
const outputPage = document.getElementById('outputPage');
const previewArea = document.getElementById('previewArea');

let currentMode = 'lab';

// টগল বাটন লজিক
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
    labBtn.classList.add('active'); // CSS এ কালার ঠিক রাখতে
    labBtn.classList.remove('active'); // ভুল সংশোধন
    assignBtn.classList.add('active');
    labOnly.style.display = 'none'; 
    assignOnly.style.display = 'block'; 
};

genBtn.onclick = function() {
    // কমন ডেটা সংগ্রহ
    const d = {
        code: document.getElementById('courseCode').value || '',
        title: document.getElementById('courseTitle').value || '',
        sec: document.getElementById('section').value || '',
        sem: document.getElementById('semester').value || '',
        sid: document.getElementById('sid').value || '',
        sname: document.getElementById('sname').value || '',
        fname: document.getElementById('fname').value || '',
        fdes: document.getElementById('fdesignation').value || '',
        fdept: document.getElementById('fdept').value || '',
        date: `${document.getElementById('dd').value || '00'}/${document.getElementById('mm').value || '00'}/2026`
    };

    // ল্যাব বা অ্যাসাইনমেন্টের আলাদা ডেটা সংগ্রহ (এটিই আপনার সমস্যা ছিল)
    let titleInfo = "";
    if (currentMode === 'lab') {
        const labNo = document.getElementById('labNo').value || '';
        const labTitle = document.getElementById('labTitle').value || '';
        titleInfo = `<strong>Lab No:</strong> ${labNo} <br> <strong>Lab Title:</strong> ${labTitle}`;
    } else {
        const assignTitle = document.getElementById('assignTitle').value || '';
        const topicName = document.getElementById('topicName').value || '';
        titleInfo = `<strong>Assignment Title:</strong> ${assignTitle} <br> <strong>Topic:</strong> ${topicName}`;
    }

    // আউটপুট পেজ জেনারেশন
    outputPage.innerHTML = `
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.1; z-index: 0; pointer-events: none;">
            <img src="${LOCAL_LOGO}" style="width: 450px;">
        </div>

        <div style="position: relative; z-index: 1; height: 100%; border: 2px solid #002b59; margin: 30px; padding: 50px; display: flex; flex-direction: column; background: transparent;">
            <div style="text-align: center; margin-bottom: 5px;">
                <img src="${LOCAL_LOGO}" style="height: 100px;">
            </div>
            <h2 style="text-align: center; color: #002b59; font-size: 16px; text-transform: uppercase; margin-bottom: 25px; font-weight: bold;">Daffodil International University</h2>
            
            <h1 style="text-align:center; color:#002b59; font-size: 22px; text-transform: uppercase; text-decoration: underline; margin-bottom: 35px; font-weight: bold;">
                ${currentMode === 'lab' ? 'Lab Report Submission' : 'Assignment Submission'}
            </h1>
            
            <div style="font-size: 16px; line-height: 1.8; color: #111; margin-bottom: 40px; text-align: left;">
                <p><strong>Course Code:</strong> ${d.code}</p>
                <p><strong>Course Name:</strong> ${d.title}</p>
                <p><strong>Semester:</strong> ${d.sem}</p>
                <p>${titleInfo}</p>
            </div>

            <div style="display: flex; flex-direction: column; gap: 40px; flex-grow: 1; text-align: left;">
                <div style="padding-left: 20px; border-left: 5px solid #002b59;">
                    <p style="font-size: 11px; color: #666; text-transform: uppercase; margin:0;">Submitted To</p>
                    <p style="font-size: 18px; font-weight: bold; margin: 3px 0;">${d.fname}</p>
                    <p style="font-size: 14px; margin:0;">${d.fdes}</p>
                    <p style="font-size: 14px; margin:0;">Department of ${d.fdept}</p>
                </div>

                <div style="padding-left: 20px; border-left: 5px solid #002b59;">
                    <p style="font-size: 11px; color: #666; text-transform: uppercase; margin:0;">Submitted By</p>
                    <p style="font-size: 18px; font-weight: bold; margin: 3px 0;">${d.sname}</p>
                    <p style="font-size: 15px; margin:0;"><strong>ID:</strong> ${d.sid}</p>
                    <p style="font-size: 15px; margin:0;"><strong>Section:</strong> ${d.sec}</p>
                    <p style="font-size: 15px; margin:0;"><strong>Date:</strong> ${d.date}</p>
                </div>
            </div>

            <div style="text-align: center; border-top: 1px solid #ddd; padding-top: 15px; margin-top: auto;">
                <p style="font-size: 13px; color: #002b59; font-weight: bold; letter-spacing: 2px; text-transform: uppercase;">Daffodil International University</p>
            </div>
        </div>`;

    previewArea.style.display = 'block';
    window.scrollTo({ top: outputPage.offsetTop, behavior: 'smooth' });
};

// PDF ডাউনলোড (আপনার স্ক্রিনশটে লোগো না আসার সমস্যা ফিক্স করা হয়েছে)
document.getElementById('downloadBtn').onclick = () => {
    html2canvas(outputPage, { 
        scale: 3, 
        useCORS: true,
        allowTaint: true 
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF('p', 'pt', 'a4');
        pdf.addImage(imgData, 'PNG', 0, 0, 595.28, 841.89);
        pdf.save('DIU_Cover_Page.pdf');
    });
};
