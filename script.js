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
            fdept: document.getElementById('fdept').value,
            date: `${document.getElementById('dd').value || '00'}/${document.getElementById('mm').value || '00'}/2026`
        };

        // মোড অনুযায়ী ওয়াটারমার্ক লজিক
        let watermark = currentMode === 'assign' ? `<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.1; z-index: 0; pointer-events: none;"><img src="${LOCAL_LOGO}" style="width: 450px;"></div>` : "";
        
        // ল্যাব রিপোর্টের জন্য অ্যাসেসমেন্ট টেবিল (ছবির মতো ডিজাইন)
        let markingTable = currentMode === 'lab' ? `
            <div style="margin-bottom: 30px; border: 1px solid #000; width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;">
                <div style="text-align: center; border-bottom: 1px solid #000; padding: 5px; font-weight: bold; font-size: 14px; background-color: #f2f2f2;">Only for course Teacher</div>
                <table style="width: 100%; border-collapse: collapse; text-align: center; font-size: 11px;">
                    <tr style="border-bottom: 1px solid #000;"><th style="border-right: 1px solid #000; padding: 5px; width: 35%;"></th><th style="border-right: 1px solid #000;">Needs Imp.</th><th style="border-right: 1px solid #000;">Developing</th><th style="border-right: 1px solid #000;">Sufficient</th><th style="border-right: 1px solid #000;">Above Avg.</th><th>Total</th></tr>
                    <tr style="border-bottom: 1px solid #000; font-weight: bold;">
                        <td style="border-right: 1px solid #000; padding: 5px; text-align: left;">Allocate mark & %</td><td style="border-right: 1px solid #000;">25%</td><td style="border-right: 1px solid #000;">50%</td><td style="border-right: 1px solid #000;">75%</td><td style="border-right: 1px solid #000;">100%</td><td>25</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #000;"><td style="border-right: 1px solid #000; padding: 8px; text-align: left;">Understanding <span style="float:right; border: 1px solid #000; padding: 0 4px;">3</span></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td></td></tr>
                    <tr style="border-bottom: 1px solid #000;"><td style="border-right: 1px solid #000; padding: 8px; text-align: left;">Analysis <span style="float:right; border: 1px solid #000; padding: 0 4px;">4</span></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td></td></tr>
                    <tr style="border-bottom: 1px solid #000;"><td style="border-right: 1px solid #000; padding: 8px; text-align: left;">Implementation <span style="float:right; border: 1px solid #000; padding: 0 4px;">8</span></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td></td></tr>
                    <tr style="border-bottom: 1px solid #000;"><td style="border-right: 1px solid #000; padding: 8px; text-align: left;">Report Writing <span style="float:right; border: 1px solid #000; padding: 0 4px;">10</span></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td></td></tr>
                    <tr style="border-bottom: 1px solid #000; font-weight: bold;"><td colspan="5" style="border-right: 1px solid #000; padding: 10px; text-align: right;">Total obtained mark</td><td></td></tr>
                    <tr><td style="border-right: 1px solid #000; padding: 10px; text-align: left;">Comments</td><td colspan="5"></td></tr>
                </table>
            </div>` : "";

        let titleInfo = "";
        if (currentMode === 'lab') {
            titleInfo = `<strong>Lab No:</strong> ${document.getElementById('labNo').value} <br> <strong>Lab Title:</strong> ${document.getElementById('labTitle').value}`;
        } else {
            titleInfo = `<strong>Assignment Title:</strong> ${document.getElementById('assignTitle').value} <br> <strong>Topic Name:</strong> ${document.getElementById('topicName').value}`;
        }

        // আউটপুট পেইজের স্ট্রাকচার (ফাঁকা ডিজাইন)
        outputPage.innerHTML = `
            ${watermark}
            <div style="position: relative; z-index: 1; height: 100%; border: 2px solid #002b59; margin: 30px; padding: 50px; display: flex; flex-direction: column; text-align: left;">
                
                <div style="text-align: center; margin-bottom: 15px;">
                    <img src="${LOCAL_LOGO}" style="height: 80px;">
                    <h2 style="color: #002b59; font-size: 18px; text-transform: uppercase; margin-top: 10px; font-weight: bold;">Daffodil International University</h2>
                    <h1 style="color:#002b59; font-size: 22px; text-transform: uppercase; text-decoration: underline; margin-top: 15px; font-weight: bold;">
                        ${currentMode === 'lab' ? 'Lab Report Submission' : 'Assignment Submission'}
                    </h1>
                </div>

                ${markingTable}

                <div style="font-size: 16px; line-height: 2.2; margin-top: 20px; flex-grow: 1;">
                    <p><strong>Semester:</strong> ${d.sem}</p>
                    <p><strong>Student Name:</strong> ${d.sname}</p>
                    <p><strong>Student ID:</strong> ${d.sid}</p>
                    <p><strong>Section:</strong> ${d.sec}</p>
                    <p><strong>Course Code:</strong> ${d.code}</p>
                    <p><strong>Course Name:</strong> ${d.title}</p>
                    <p><strong>Course Teacher Name:</strong> ${d.fname}</p>
                    <p><strong>Designation:</strong> ${d.fdes}</p>
                    <p><strong>Submission Date:</strong> ${d.date}</p>
                </div>

                <div style="text-align: center; border-top: 1px solid #ddd; padding-top: 15px;">
                    <p style="font-size: 12px; color: #002b59; font-weight: bold; letter-spacing: 2px;">DAFFODIL INTERNATIONAL UNIVERSITY</p>
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
            pdf.save('DIU_Cover_Page.pdf');
        });
    };
};
