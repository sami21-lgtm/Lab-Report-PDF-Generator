// নিশ্চিত করছি যেন উইন্ডো পুরোপুরি লোড হওয়ার পর কোড কাজ করে
window.onload = function() {
    const LOCAL_LOGO = 'diu.jpg'; 

    const labBtn = document.getElementById('labBtn');
    const assignBtn = document.getElementById('assignBtn');
    const labOnly = document.getElementById('labOnly');
    const assignOnly = document.getElementById('assignOnly');
    const genBtn = document.getElementById('genBtn');
    const outputPage = document.getElementById('outputPage');
    const previewArea = document.getElementById('previewArea');

    let currentMode = 'lab';

    // ১. অ্যাসাইনমেন্ট বাটনের লজিক (ইভেন্ট লিসেনার দিয়ে)
    if(assignBtn) {
        assignBtn.addEventListener('click', function() {
            currentMode = 'assign';
            assignBtn.classList.add('active');
            labBtn.classList.remove('active');
            assignOnly.style.display = 'block';
            labOnly.style.display = 'none';
            console.log("Assignment Mode Activated"); // চেক করার জন্য
        });
    }

    // ২. ল্যাব বাটনের লজিক
    if(labBtn) {
        labBtn.addEventListener('click', function() {
            currentMode = 'lab';
            labBtn.classList.add('active');
            assignBtn.classList.remove('active');
            labOnly.style.display = 'block';
            assignOnly.style.display = 'none';
            console.log("Lab Mode Activated");
        });
    }

    // ৩. জেনারেট বাটনের লজিক
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
            date: `${document.getElementById('dd').value || '00'}/${document.getElementById('mm').value || '00'}/2026`
        };

        let titleInfo = "";
        if (currentMode === 'lab') {
            titleInfo = `<strong>Lab No:</strong> ${document.getElementById('labNo').value} <br> <strong>Lab Title:</strong> ${document.getElementById('labTitle').value}`;
        } else {
            // অ্যাসাইনমেন্ট মোডের জন্য ইনপুট রিড করা
            titleInfo = `<strong>Assignment Title:</strong> ${document.getElementById('assignTitle').value} <br> <strong>Topic Name:</strong> ${document.getElementById('topicName').value}`;
        }

        outputPage.innerHTML = `
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.1; z-index: 0; pointer-events: none;">
                <img src="${LOCAL_LOGO}" style="width: 450px;">
            </div>
            <div style="position: relative; z-index: 1; height: 100%; border: 3px solid #002b59; margin: 30px; padding: 50px; display: flex; flex-direction: column; text-align: left;">
                <div style="text-align: center; margin-bottom: 5px;">
                    <img src="${LOCAL_LOGO}" style="height: 100px;">
                </div>
                <h2 style="text-align: center; color: #002b59; font-size: 16px; text-transform: uppercase; margin-bottom: 25px; font-weight: bold;">Daffodil International University</h2>
                <h1 style="text-align:center; color:#002b59; font-size: 22px; text-transform: uppercase; text-decoration: underline; margin-bottom: 35px; font-weight: bold;">
                    ${currentMode === 'lab' ? 'Lab Report Submission' : 'Assignment Submission'}
                </h1>
                <div style="font-size: 16px; line-height: 1.8; margin-bottom: 40px;">
                    <p><strong>Course Code:</strong> ${d.code}</p>
                    <p><strong>Course Name:</strong> ${d.title}</p>
                    <p><strong>Semester:</strong> ${d.sem}</p>
                    <p>${titleInfo}</p>
                </div>
                // এই অংশটি outputPage.innerHTML এর ভেতরে আপডেট করুন
<div style="display: flex; flex-direction: column; gap: 60px; flex-grow: 1; text-align: left; margin-top: 20px;">
    <div style="padding-left: 20px; border-left: 5px solid #002b59;">
        <p style="font-size: 13px; color: #666; text-transform: uppercase; margin-bottom: 5px; letter-spacing: 1px;">SUBMITTED TO</p>
        <p style="font-size: 22px; font-weight: bold; margin: 5px 0; color: #000;">${d.fname}</p>
        <p style="font-size: 16px; margin: 2px 0;">${d.fdes}</p>
        <p style="font-size: 16px; margin: 2px 0;">Department of ${d.fdept}</p>
    </div>

    <div style="padding-left: 20px; border-left: 5px solid #002b59;">
        <p style="font-size: 13px; color: #666; text-transform: uppercase; margin-bottom: 5px; letter-spacing: 1px;">SUBMITTED BY</p>
        <p style="font-size: 22px; font-weight: bold; margin: 5px 0; color: #000;">${d.sname}</p>
        <p style="font-size: 17px; margin: 3px 0;"><strong>ID:</strong> ${d.sid}</p>
        <p style="font-size: 17px; margin: 3px 0;"><strong>Section:</strong> ${d.sec}</p>
        <p style="font-size: 17px; margin: 3px 0;"><strong>Date:</strong> ${d.date}</p>
    </div>
</div>

        previewArea.style.display = 'block';
        window.scrollTo({ top: outputPage.offsetTop, behavior: 'smooth' });
    };

    // ডাউনলোড পিডিএফ
    document.getElementById('downloadBtn').onclick = () => {
        html2canvas(outputPage, { scale: 3 }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jspdf.jsPDF('p', 'pt', 'a4');
            pdf.addImage(imgData, 'PNG', 0, 0, 595.28, 841.89);
            pdf.save('DIU_Cover_Page.pdf');
        });
    };
};
