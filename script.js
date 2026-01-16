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

    // মোড সুইচ লজিক
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

        // ছবির মতো টিচার অ্যাসেসমেন্ট টেবিল (পজিশন: টপ)
        let markingTable = `
            <div style="margin: 10px 0 25px 0; border: 1.2px solid #000; width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;">
                <div style="text-align: center; border-bottom: 1.2px solid #000; padding: 4px; font-weight: bold; font-size: 14px; background: #fff;">Only for course Teacher</div>
                <table style="width: 100%; border-collapse: collapse; text-align: center; font-size: 11px;">
                    <tr style="border-bottom: 1px solid #000;">
                        <th style="border-right: 1px solid #000; width: 35%; padding: 5px;"></th>
                        <th style="border-right: 1px solid #000;">Needs Improvement</th>
                        <th style="border-right: 1px solid #000;">Developing</th>
                        <th style="border-right: 1px solid #000;">Sufficient</th>
                        <th style="border-right: 1px solid #000;">Above Average</th>
                        <th>Total Mark</th>
                    </tr>
                    <tr style="border-bottom: 1px solid #000; font-weight: bold;">
                        <td style="border-right: 1px solid #000; text-align: left; padding: 5px;">Allocate mark & Percentage</td>
                        <td style="border-right: 1px solid #000;">25%</td>
                        <td style="border-right: 1px solid #000;">50%</td>
                        <td style="border-right: 1px solid #000;">75%</td>
                        <td style="border-right: 1px solid #000;">100%</td>
                        <td>25</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #000;">
                        <td style="border-right: 1px solid #000; text-align: left; padding: 6px 5px;">Understanding <span style="float:right; border: 1px solid #000; padding: 0 5px;">3</span></td>
                        <td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td></td>
                    </tr>
                    <tr style="border-bottom: 1px solid #000;">
                        <td style="border-right: 1px solid #000; text-align: left; padding: 6px 5px;">Analysis <span style="float:right; border: 1px solid #000; padding: 0 5px;">4</span></td>
                        <td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td></td>
                    </tr>
                    <tr style="border-bottom: 1px solid #000;">
                        <td style="border-right: 1px solid #000; text-align: left; padding: 6px 5px;">Implementation <span style="float:right; border: 1px solid #000; padding: 0 5px;">8</span></td>
                        <td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td></td>
                    </tr>
                    <tr style="border-bottom: 1px solid #000;">
                        <td style="border-right: 1px solid #000; text-align: left; padding: 6px 5px;">Report Writing <span style="float:right; border: 1px solid #000; padding: 0 5px;">10</span></td>
                        <td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td style="border-right: 1px solid #000;"></td><td></td>
                    </tr>
                    <tr style="border-bottom: 1px solid #000; font-weight: bold;">
                        <td colspan="5" style="border-right: 1px solid #000; text-align: right; padding: 6px;">Total obtained mark</td><td></td>
                    </tr>
                    <tr><td style="border-right: 1px solid #000; text-align: left; padding: 12px 5px;">Comments</td><td colspan="5"></td></tr>
                </table>
            </div>`;

        // ওয়াটারমার্ক (অ্যাসাইনমেন্টের জন্য)
        let watermark = currentMode === 'assign' ? `<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.1; z-index: 0; pointer-events: none;"><img src="${LOCAL_LOGO}" style="width: 450px;"></div>` : "";

        outputPage.innerHTML = `
            ${watermark}
            <div style="position: relative; z-index: 1; height: 100%; border: 1.5px solid #000; margin: 20px; padding: 45px; display: flex; flex-direction: column; text-align: left; font-family: 'Times New Roman', Times, serif; color: #000;">
                
                <div style="text-align: center; margin-bottom: 5px;">
                    <img src="${LOCAL_LOGO}" style="height: 65px;">
                    <h1 style="font-size: 20px; margin: 10px 0 5px 0; font-weight: bold; color: #003366;">Daffodil International University</h1>
                    <h2 style="font-size: 18px; margin: 0 0 10px 0; text-decoration: none; font-weight: bold;">${currentMode === 'lab' ? 'Lab Report' : 'Assignment'}</h2>
                </div>

                ${currentMode === 'lab' ? markingTable : ''}

                <div style="font-size: 17px; line-height: 2.3; margin-top: 10px; font-weight: 600;">
                    <p><strong>Semester:</strong> ${d.sem}</p>
                    <p><strong>Student Name:</strong> ${d.sname}</p>
                    <p><strong>Student ID:</strong> ${d.sid}</p>
                    <p><strong>Batch:</strong> ${d.sec.split('-')[0] || ''} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>Section:</strong> ${d.sec.split('-')[1] || d.sec}</p>
                    <p><strong>Course Code:</strong> ${d.code}</p>
                    <p><strong>Course Name:</strong> ${d.title}</p>
                    ${currentMode === 'lab' ? 
                        `<p><strong>Lab No:</strong> ${d.lNo}</p><p><strong>Lab Title:</strong> ${d.lTitle}</p>` : 
                        `<p><strong>Assignment Title:</strong> ${d.aTitle}</p><p><strong>Topic Name:</strong> ${d.topic}</p>`
                    }
                    <p><strong>Course Teacher Name:</strong> ${d.fname}</p>
                    <p><strong>Designation:</strong> ${d.fdes}</p>
                    <p><strong>Submission Date:</strong> ${d.date}</p>
                </div>

                <div style="text-align: center; margin-top: auto; padding-top: 15px; border-top: 1px solid #eee;">
                    <p style="font-size: 11px; letter-spacing: 1px; color: #555;">www.daffodilvarsity.edu.bd</p>
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
