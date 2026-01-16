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

    if(assignBtn) {
        assignBtn.addEventListener('click', function() {
            currentMode = 'assign';
            assignBtn.classList.add('active');
            labBtn.classList.remove('active');
            assignOnly.style.display = 'block';
            labOnly.style.display = 'none';
        });
    }

    if(labBtn) {
        labBtn.addEventListener('click', function() {
            currentMode = 'lab';
            labBtn.classList.add('active');
            assignBtn.classList.remove('active');
            labOnly.style.display = 'block';
            assignOnly.style.display = 'none';
        });
    }

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
            date: `${document.getElementById('dd').value || '00'}/${document.getElementById('mm').value || '00'}/2026`,
            lNo: document.getElementById('labNo')?.value || '',
            lTitle: document.getElementById('labTitle')?.value || '',
            aTitle: document.getElementById('assignTitle')?.value || '',
            topic: document.getElementById('topicName')?.value || ''
        };

        // ল্যাব রিপোর্টের টেবিল (আপনার আগের পছন্দমতো অপরিবর্তিত)
        let markingTable = `
            <div style="margin: 10px 0 20px 0; border: 1.5px solid #000; width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;">
                <div style="text-align: center; border-bottom: 1.5px solid #000; padding: 4px; font-weight: bold; font-size: 14px; background: #f9f9f9;">Only for course Teacher</div>
                <table style="width: 100%; border-collapse: collapse; text-align: center; font-size: 11px;">
                    <tr style="border-bottom: 1px solid #000;"><th style="border-right: 1px solid #000; width: 30%; padding: 5px;"></th><th style="border-right: 1px solid #000;">Needs Improvement</th><th style="border-right: 1px solid #000;">Developing</th><th style="border-right: 1px solid #000;">Sufficient</th><th style="border-right: 1px solid #000;">Above Average</th><th>Total Mark</th></tr>
                    <tr style="border-bottom: 1px solid #000; font-weight: bold;"><td style="border-right: 1px solid #000; text-align: left; padding: 5px;">Allocate mark & Percentage</td><td style="border-right: 1px solid #000;">25%</td><td style="border-right: 1px solid #000;">50%</td><td style="border-right: 1px solid #000;">75%</td><td style="border-right: 1px solid #000;">100%</td><td>25</td></tr>
                    <tr style="border-bottom: 1px solid #000;"><td style="border-right: 1px solid #000; text-align: left; padding: 6px 5px;">Understanding <span style="float:right; border: 1px solid #000; padding: 0 4px;">3</span></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td></td></tr>
                    <tr style="border-bottom: 1px solid #000;"><td style="border-right: 1px solid #000; text-align: left; padding: 6px 5px;">Analysis <span style="float:right; border: 1px solid #000; padding: 0 4px;">4</span></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td></td></tr>
                    <tr style="border-bottom: 1px solid #000;"><td style="border-right: 1px solid #000; text-align: left; padding: 6px 5px;">Implementation <span style="float:right; border: 1px solid #000; padding: 0 4px;">8</span></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td></td></tr>
                    <tr style="border-bottom: 1px solid #000;"><td style="border-right: 1px solid #000; text-align: left; padding: 6px 5px;">Report Writing <span style="float:right; border: 1px solid #000; padding: 0 4px;">10</span></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td></td></tr>
                    <tr style="border-bottom: 1px solid #000; font-weight: bold;"><td colspan="5" style="border-right: 1px solid #000; text-align: right; padding: 6px;">Total obtained mark</td><td></td></tr>
                    <tr><td style="border-right: 1px solid #000; text-align: left; padding: 10px 5px;">Comments</td><td colspan="5"></td></tr>
                </table>
            </div>`;

        // অ্যাসাইনমেন্টের জন্য বড় করে ওয়াটারমার্ক
        let watermark = currentMode === 'assign' ? `<div style="position: absolute; top: 55%; left: 50%; transform: translate(-50%, -50%); opacity: 0.08; z-index: 0; pointer-events: none;"><img src="${LOCAL_LOGO}" style="width: 500px;"></div>` : "";

        // বডি কন্টেন্ট জেনারেশন
        let bodyContent = "";
        if (currentMode === 'assign') {
            // অ্যাসাইনমেন্টের জন্য আপনার স্ক্রিনশটের মতো Stylish & Spaced Layout
            bodyContent = `
                <div style="font-family: 'Times New Roman', Times, serif; color: #000; margin-top: 20px; flex-grow: 1; display: flex; flex-direction: column; justify-content: space-around;">
                    <div style="line-height: 2.8; margin-bottom: 20px;">
                        <p style="font-size: 19px; margin: 0;"><strong>Course Code:</strong> ${d.code}</p>
                        <p style="font-size: 19px; margin: 0;"><strong>Course Name:</strong> ${d.title}</p>
                        <p style="font-size: 19px; margin: 0;"><strong>Semester:</strong> ${d.sem}</p>
                        <p style="font-size: 19px; margin: 20px 0 5px 0;"><strong>Assignment Title:</strong> <span style="font-weight: bold; color: #003366;">${d.aTitle}</span></p>
                        <p style="font-size: 19px; margin: 0;"><strong>Topic Name:</strong> ${d.topic}</p>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 40px; margin-top: 30px;">
                        <div style="border-left: 6px solid #003366; padding-left: 20px;">
                            <p style="font-size: 13px; font-weight: bold; color: #555; text-transform: uppercase; margin-bottom: 10px; letter-spacing: 2px;">SUBMITTED TO</p>
                            <p style="font-size: 22px; font-weight: bold; margin: 0;">${d.fname}</p>
                            <p style="font-size: 17px; margin: 3px 0;">${d.fdes}</p>
                            <p style="font-size: 16px; margin: 0; color: #333;">Daffodil International University</p>
                        </div>
                        
                        <div style="border-left: 6px solid #003366; padding-left: 20px;">
                            <p style="font-size: 13px; font-weight: bold; color: #555; text-transform: uppercase; margin-bottom: 10px; letter-spacing: 2px;">SUBMITTED BY</p>
                            <p style="font-size: 22px; font-weight: bold; margin: 0;">${d.sname}</p>
                            <p style="font-size: 18px; margin: 3px 0;">ID: <b>${d.sid}</b></p>
                            <p style="font-size: 18px; margin: 3px 0;">Section: <b>${d.sec}</b></p>
                            <p style="font-size: 17px; margin: 5px 0;">Date: ${d.date}</p>
                        </div>
                    </div>
                </div>`;
        } else {
            // ল্যাব রিপোর্টের সেই চিরচেনা 'purba' ফরম্যাট
            bodyContent = `
                <div style="font-size: 17px; line-height: 2.3; margin-top: 15px; font-weight: bold; font-family: 'Times New Roman', serif;">
                    <p>Semester: ${d.sem}</p>
                    <p>Student Name: ${d.sname}</p>
                    <p>Student ID: ${d.sid}</p>
                    <p>Batch: ${d.sec.split('-')[0] || ''} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Section: ${d.sec.split('-')[1] || d.sec}</p>
                    <p>Course Code: ${d.code}</p>
                    <p>Course Name: ${d.title}</p>
                    <p>Course Teacher Name: ${d.fname}</p>
                    <p>Designation: ${d.fdes}</p>
                    <p>Submission Date: ${d.date}</p>
                </div>`;
        }

        outputPage.innerHTML = `
            ${watermark}
            <div style="position: relative; z-index: 1; height: 100%; border: ${currentMode === 'assign' ? '12px double #003366' : '1.5px solid #000'}; margin: 15px; padding: 50px; display: flex; flex-direction: column; text-align: left; background: #fff;">
                
                <div style="text-align: center; margin-bottom: 15px;">
                    <img src="${LOCAL_LOGO}" style="height: 80px;">
                    <h1 style="font-size: 24px; margin: 15px 0 5px 0; color: #003366; font-family: 'Arial Black', sans-serif;">DAFFODIL INTERNATIONAL UNIVERSITY</h1>
                    <div style="width: 60%; height: 3px; background: #003366; margin: 8px auto 12px auto;"></div>
                    <h2 style="font-size: 20px; font-weight: bold; text-transform: uppercase; letter-spacing: 3px;">${currentMode === 'lab' ? 'Lab Report Submission' : 'ASSIGNMENT SUBMISSION'}</h2>
                </div>

                ${currentMode === 'lab' ? markingTable : ''}
                ${bodyContent}

                <div style="text-align: center; margin-top: auto; padding-top: 25px;">
                    <p style="font-size: 13px; color: #666; letter-spacing: 2px; font-family: sans-serif;">www.daffodilvarsity.edu.bd</p>
                </div>
            </div>`;

        previewArea.style.display = 'block';
        window.scrollTo({ top: outputPage.offsetTop, behavior: 'smooth' });
    };

    document.getElementById('downloadBtn').onclick = () => {
        html2canvas(outputPage, { scale: 3 }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jspdf.jsPDF('p', 'pt', 'a4');
            pdf.addImage(imgData, 'PNG', 0, 0, 595.28, 841.89);
            pdf.save(`DIU_${currentMode}_Cover.pdf`);
        });
    };
};
