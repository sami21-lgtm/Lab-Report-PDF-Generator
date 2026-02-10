window.onload = function() {
    const LOCAL_LOGO = 'diu.jpg'; 

    // 1. Element Selection
    const labBtn = document.getElementById('labBtn');
    const assignBtn = document.getElementById('assignBtn');
    const assessBtn = document.getElementById('assessBtn');

    const labOnly = document.getElementById('labOnly');
    const assignOnly = document.getElementById('assignOnly');
    const assessOnly = document.getElementById('assessOnly');

    const genBtn = document.getElementById('genBtn');
    const outputPage = document.getElementById('outputPage');
    const previewArea = document.getElementById('previewArea');

    let currentMode = 'lab';

    // 2. Toggle Logic (Etai button kaaj korar main jayga)
    function switchTab(mode) {
        currentMode = mode;
        
        // Button Class Update
        labBtn.classList.toggle('active', mode === 'lab');
        assignBtn.classList.toggle('active', mode === 'assign');
        assessBtn.classList.toggle('active', mode === 'assess');

        // Input Fields Show/Hide
        labOnly.style.display = (mode === 'lab' ? 'block' : 'none');
        assignOnly.style.display = (mode === 'assign' ? 'block' : 'none');
        assessOnly.style.display = (mode === 'assess' ? 'block' : 'none');
        
        console.log("Current Mode switched to: " + mode);
    }

    // Button-e click detect korar jonno
    labBtn.onclick = () => switchTab('lab');
    assignBtn.onclick = () => switchTab('assign');
    assessBtn.onclick = () => switchTab('assess');

    // 3. Generate Logic
    if (genBtn) {
        genBtn.onclick = function() {
            const d = {
                code: document.getElementById('courseCode').value,
                title: document.getElementById('courseTitle').value,
                sec: document.getElementById('section').value,
                sem: document.getElementById('semester').value,
                sid: document.getElementById('sid').value,
                sname: document.getElementById('sname').value,
                sdept: document.getElementById('sdepartment').value, 
                fname: document.getElementById('fname').value,
                fdes: document.getElementById('fdesignation').value,
                fdept: document.getElementById('fdepartment').value,
                date: (document.getElementById('dd').value || '00') + '/' + (document.getElementById('mm').value || '00') + '/2026',
                lNo: document.getElementById('labNo').value,
                lTitle: document.getElementById('labTitle').value,
                aNo: document.getElementById('assignNo').value, 
                topic: document.getElementById('topicName').value,
                assessNo: document.getElementById('assessNo').value,
                assessTitle: document.getElementById('assessTitle').value
            };

            // Watermark logic
            let watermark = (currentMode !== 'lab') ? `
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-30deg); opacity: 0.08; z-index: 0; pointer-events: none; width: 80%; text-align: center;">
                    <img src="${LOCAL_LOGO}" style="width: 400px;">
                    <h1 style="font-size: 80px; font-family: 'Arial Black', sans-serif; margin-top: 20px;">DIU</h1>
                </div>` : '';

            // Dynamic Text
            let headerLabel = "LAB REPORT SUBMISSION";
            let midContent = "";
            let markingBox = "";

            if (currentMode === 'lab') {
                headerLabel = "LAB REPORT SUBMISSION";
                markingBox = `<div style="border: 1.5px solid #000; margin-bottom: 20px; font-family: Arial; font-size: 11px;">
                    <div style="text-align: center; border-bottom: 1.5px solid #000; padding: 5px; font-weight: bold; background: #f0f0f0;">Only for course Teacher</div>
                    <table style="width: 100%; border-collapse: collapse; text-align: center;">
                        <tr style="border-bottom: 1px solid #000;">
                            <th style="padding: 5px; border-right: 1px solid #000;">Criteria</th>
                            <th style="border-right: 1px solid #000;">Needs Imp.</th>
                            <th style="border-right: 1px solid #000;">Developing</th>
                            <th style="border-right: 1px solid #000;">Sufficient</th>
                            <th style="border-right: 1px solid #000;">Above Avg.</th>
                            <th>Total</th>
                        </tr>
                        <tr><td style="padding: 10px; border-right: 1px solid #000; text-align: left;">Understanding</td><td border-right: 1px solid #000;></td><td></td><td></td><td></td><td>3</td></tr>
                    </table>
                </div>`;
                midContent = `<div style="font-size: 18px; line-height: 2.8; font-weight: bold;">
                    <p>Course Code: ${d.code}</p><p>Course Name: ${d.title}</p>
                    <p>Lab No: ${d.lNo}</p><p>Lab Title: ${d.lTitle}</p>
                    <p>Semester: ${d.sem}</p>
                </div>`;
            } else {
                headerLabel = currentMode === 'assign' ? "ASSIGNMENT SUBMISSION" : "LAB ASSESSMENT SUBMISSION";
                let no = currentMode === 'assign' ? d.aNo : d.assessNo;
                let title = currentMode === 'assign' ? d.topic : d.assessTitle;
                let labelNo = currentMode === 'assign' ? "Assignment No" : "Assessment No";
                let labelTitle = currentMode === 'assign' ? "Topic Name" : "Assessment Title";

                midContent = `<div style="line-height: 4.5; font-size: 21px; font-family: 'Times New Roman';">
                    <p><strong>Course Code:</strong> ${d.code}</p>
                    <p><strong>Course Name:</strong> ${d.title}</p>
                    <p><strong>Semester:</strong> ${d.sem}</p>
                    <p><strong>${labelNo}:</strong> ${no}</p>
                    <p><strong>${labelTitle}:</strong> ${title}</p>
                </div>`;
            }

            outputPage.innerHTML = `
                <div id="captureArea" style="position: relative; width: 794px; height: 1123px; padding: 50px; border: ${currentMode === 'lab' ? '1px solid #000' : '14px double #003366'}; box-sizing: border-box; background: #fff; margin: 0 auto; display: flex; flex-direction: column; overflow: hidden;">
                    ${watermark}
                    <div style="text-align: center; margin-bottom: 20px;">
                        <img src="${LOCAL_LOGO}" style="height: 80px;">
                        <h1 style="font-size: 24px; color: #003366; margin: 10px 0;">DAFFODIL INTERNATIONAL UNIVERSITY</h1>
                        <h2 style="font-size: 16px; font-weight: bold;">${headerLabel}</h2>
                    </div>
                    ${markingBox}
                    <div style="flex-grow: 1; width: 85%; margin: 0 auto;">${midContent}</div>
                    <div style="display: flex; justify-content: space-between; font-family: 'Times New Roman'; margin-top: 50px; border-top: 1px solid #eee; padding-top: 20px;">
                        <div><p><strong>SUBMITTED TO:</strong></p><p>${d.fname}</p><p>${d.fdes}</p><p>${d.fdept}</p></div>
                        <div style="text-align: right;"><p><strong>SUBMITTED BY:</strong></p><p>${d.sname}</p><p>${d.sid}</p><p>Date: ${d.date}</p></div>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 20px;">
                    <button id="downloadPDF" style="padding: 15px 30px; background: #d9534f; color: white; border: none; cursor: pointer; border-radius: 5px; font-weight: bold;">Download PDF</button>
                </div>`;

            document.getElementById('downloadPDF').onclick = function() {
                const { jsPDF } = window.jspdf;
                html2canvas(document.querySelector("#captureArea"), { scale: 2 }).then(canvas => {
                    const pdf = new jsPDF('p', 'mm', 'a4');
                    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297);
                    pdf.save(`DIU-${currentMode}.pdf`);
                });
            };
            
            previewArea.style.display = 'block';
            window.scrollTo({ top: outputPage.offsetTop, behavior: 'smooth' });
        };
    }
};
