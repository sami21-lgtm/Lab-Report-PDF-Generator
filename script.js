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

    // ১. অ্যাসাইনমেন্ট বাটনের লজিক
    if(assignBtn) {
        assignBtn.addEventListener('click', function() {
            currentMode = 'assign';
            assignBtn.classList.add('active');
            labBtn.classList.remove('active');
            assignOnly.style.display = 'block';
            labOnly.style.display = 'none';
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

        // মোড অনুযায়ী ওয়াটারমার্ক এবং টেবিল সেট করা
        let watermark = currentMode === 'assign' ? `<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.1; z-index: 0; pointer-events: none;"><img src="${LOCAL_LOGO}" style="width: 450px;"></div>` : "";
        
        let markingTable = currentMode === 'lab' ? `
            <div style="margin-top: 20px; border: 1px solid #000; width: 100%; border-collapse: collapse; font-family: Arial, sans-serif; z-index: 2; position: relative;">
                <div style="text-align: center; border-bottom: 1px solid #000; padding: 5px; font-weight: bold; font-size: 13px; background-color: #f2f2f2;">Only for course Teacher</div>
                <table style="width: 100%; border-collapse: collapse; text-align: center; font-size: 11px;">
                    <tr style="border-bottom: 1px solid #000;"><th style="border-right: 1px solid #000; padding: 5px; width: 35%;"></th><th style="border-right: 1px solid #000;">Needs Imp.</th><th style="border-right: 1px solid #000;">Developing</th><th style="border-right: 1px solid #000;">Sufficient</th><th style="border-right: 1px solid #000;">Above Avg.</th><th>Total</th></tr>
                    <tr style="border-bottom: 1px solid #000; font-weight: bold;">
                        <td style="border-right: 1px solid #000; padding: 5px; text-align: left;">Mark & %</td><td style="border-right: 1px solid #000;">25%</td><td style="border-right: 1px solid #000;">50%</td><td style="border-right: 1px solid #000;">75%</td><td style="border-right: 1px solid #000;">100%</td><td>25</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #000;"><td style="border-right: 1px solid #000; padding: 5px; text-align: left;">Understanding <span style="float:right; border: 1px solid #000; padding: 0 4px;">3</span></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td></td></tr>
                    <tr style="border-bottom: 1px solid #000;"><td style="border-right: 1px solid #000; padding: 5px; text-align: left;">Analysis <span style="float:right; border: 1px solid #000; padding: 0 4px;">4</span></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td></td></tr>
                    <tr style="border-bottom: 1px solid #000;"><td style="border-right: 1px solid #000; padding: 5px; text-align: left;">Implementation <span style="float:right; border: 1px solid #000; padding: 0 4px;">8</span></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td></td></tr>
                    <tr style="border-bottom: 1px solid #000;"><td style="border-right: 1px solid #000; padding: 5px; text-align: left;">Report Writing <span style="float:right; border: 1px solid #000; padding: 0 4px;">10</span></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td></td></tr>
                    <tr style="border-bottom: 1px solid #000; font-weight: bold;"><td colspan="5" style="border-right: 1px solid #000; padding: 5px; text-align: right;">Total obtained mark</td><td></td></tr>
                    <tr><td style="border-right: 1px solid #000; padding: 5px; text-align: left;">Comments</td><td colspan="5"></td></tr>
                </table>
            </div>` : "";

        let titleInfo = "";
        if (currentMode === 'lab') {
            titleInfo = `<strong>Lab No:</strong> ${document.getElementById('labNo').value} <br> <strong>Lab Title:</strong> ${document.getElementById('labTitle').value}`;
        } else {
            titleInfo = `<strong>Assignment Title:</strong> ${document.getElementById('assignTitle').value} <br> <strong>Topic Name:</strong> ${document.getElementById('topicName').value}`;
        }

        outputPage.innerHTML = `
            ${watermark}
            <div style="position: relative; z-index: 1; height: 100%; border: 3px solid #002b59; margin: 30px; padding: 40px; display: flex; flex-direction: column; text-align: left;">
                <div style="text-align: center; margin-bottom: 5px;">
                    <img src="${LOCAL_LOGO}" style="height: 90px;">
                </div>
                <h2 style="text-align: center; color: #002b59; font-size: 16px; text-transform: uppercase; margin-bottom: 20px; font-weight: bold;">Daffodil International University</h2>
                <h1 style="text-align:center; color:#002b59; font-size: 20px; text-transform: uppercase; text-decoration: underline; margin-bottom: 25px; font-weight: bold;">
                    ${currentMode === 'lab' ? 'Lab Report Submission' : 'Assignment Submission'}
                </h1>
                
                <div style="font-size: 15px; line-height: 1.6; margin-bottom: 30px;">
                    <p><strong>Course Code:</strong> ${d.code}</p>
                    <p><strong>Course Name:</strong> ${d.title}</p>
                    <p><strong>Semester:</strong> ${d.sem}</p>
                    <p>${titleInfo}</p>
                </div>
                
                <div style="display: flex; flex-direction: column; gap: 30px; flex-grow: 1; text-align: left;">
                    <div style="padding-left: 20px; border-left: 5px solid #002b59;">
                        <p style="font-size: 12px; color: #666; text-transform: uppercase; margin-bottom: 3px;">SUBMITTED TO</p>
                        <p style="font-size: 20px; font-weight: bold; margin: 2px 0;">${d.fname}</p>
                        <p style="font-size: 15px;">${d.fdes}</p>
                        <p style="font-size: 15px;">Department of ${d.fdept}</p>
                    </div>

                    <div style="padding-left: 20px; border-left: 5px solid #002b59;">
                        <p style="font-size: 12px; color: #666; text-transform: uppercase; margin-bottom: 3px;">SUBMITTED BY</p>
                        <p style="font-size: 20px; font-weight: bold; margin: 2px 0;">${d.sname}</p>
                        <p style="font-size: 16px;"><strong>ID:</strong> ${d.sid}</p>
                        <p style="font-size: 16px;"><strong>Section:</strong> ${d.sec}</p>
                        <p style="font-size: 16px;"><strong>Date:</strong> ${d.date}</p>
                    </div>
                </div>

                ${markingTable}

                <div style="text-align: center; border-top: 1px solid #ddd; padding-top: 10px; margin-top: 20px;">
                    <p style="font-size: 13px; color: #002b59; font-weight: bold; letter-spacing: 2px;">DAFFODIL INTERNATIONAL UNIVERSITY</p>
                </div>
            </div>`;

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
