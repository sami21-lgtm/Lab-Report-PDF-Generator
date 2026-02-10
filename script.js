window.onload = function() {
    const LOCAL_LOGO = 'diu.jpg'; 

    // Elements selection
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

    // 1. Toggle Logic (Button click e kaaj korbe ebar)
    function setMode(mode) {
        currentMode = mode;
        
        // CSS class toggle
        labBtn.classList.toggle('active', mode === 'lab');
        assignBtn.classList.toggle('active', mode === 'assign');
        assessBtn.classList.toggle('active', mode === 'assess');

        // Input Field Show/Hide
        labOnly.style.display = (mode === 'lab' ? 'block' : 'none');
        assignOnly.style.display = (mode === 'assign' ? 'block' : 'none');
        assessOnly.style.display = (mode === 'assess' ? 'block' : 'none');
        
        console.log("Current Mode: " + mode);
    }

    // Event Listeners for buttons
    labBtn.onclick = () => setMode('lab');
    assignBtn.onclick = () => setMode('assign');
    assessBtn.onclick = () => setMode('assess');

    // 2. Generation Logic
    if (genBtn) {
        genBtn.onclick = function() {
            // Collecting Data
            const d = {
                code: document.getElementById('courseCode').value || '',
                title: document.getElementById('courseTitle').value || '',
                sec: document.getElementById('section').value || '',
                sem: document.getElementById('semester').value || '',
                sid: document.getElementById('sid').value || '',
                sname: document.getElementById('sname').value || '',
                sdept: document.getElementById('sdepartment').value || '', 
                fname: document.getElementById('fname').value || '',
                fdes: document.getElementById('fdesignation').value || '',
                fdept: document.getElementById('fdepartment').value || '',
                date: (document.getElementById('dd').value || '00') + '/' + (document.getElementById('mm').value || '00') + '/2026',
                lNo: document.getElementById('labNo').value || '',
                lTitle: document.getElementById('labTitle').value || '',
                aNo: document.getElementById('assignNo').value || '', 
                topic: document.getElementById('topicName').value || '',
                assessNo: document.getElementById('assessNo').value || '',
                assessTitle: document.getElementById('assessTitle').value || ''
            };

            // Watermark Logic
            let watermark = (currentMode !== 'lab') ? `
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-30deg); opacity: 0.08; z-index: 0; pointer-events: none; width: 80%; text-align: center;">
                    <img src="${LOCAL_LOGO}" style="width: 400px;">
                    <h1 style="font-size: 80px; font-family: 'Arial Black', sans-serif; margin-top: 20px;">DIU</h1>
                </div>` : '';

            // Body Content logic
            let headText = "LAB REPORT SUBMISSION";
            let midContent = "";
            let markingTable = "";

            if (currentMode === 'lab') {
                headText = "LAB REPORT SUBMISSION";
                markingTable = `<div style="border: 1.5px solid #000; margin-bottom: 20px; font-family: Arial; font-size: 11px; z-index: 2; position: relative;">
                    <div style="text-align: center; border-bottom: 1.5px solid #000; padding: 5px; font-weight: bold; background: #f0f0f0;">Only for course Teacher</div>
                    <table style="width: 100%; border-collapse: collapse; text-align: center;">
                        <tr style="border-bottom: 1px solid #000;"><th style="padding: 5px; border-right: 1px solid #000;">Criteria</th><th>25%</th><th>50%</th><th>75%</th><th>100%</th><th>Total</th></tr>
                        <tr style="border-bottom: 1px solid #000;"><td>Understanding</td><td></td><td></td><td></td><td></td><td>3</td></tr>
                        <tr style="border-bottom: 1px solid #000;"><td>Analysis</td><td></td><td></td><td></td><td></td><td>4</td></tr>
                        <tr style="border-bottom: 1px solid #000;"><td>Implementation</td><td></td><td></td><td></td><td></td><td>8</td></tr>
                        <tr><td>Report Writing</td><td></td><td></td><td></td><td></td><td>10</td></tr>
                    </table>
                </div>`;
                midContent = `<div style="font-size: 18px; line-height: 2.8; font-family: 'Times New Roman', serif; font-weight: bold;">
                                <p>Course Code: ${d.code}</p> <p>Course Name: ${d.title}</p>
                                <p>Lab No: ${d.lNo}</p> <p>Lab Title: ${d.lTitle}</p>
                                <p>Semester: ${d.sem}</p>
                            </div>`;
            } else {
                headText = (currentMode === 'assign' ? "ASSIGNMENT SUBMISSION" : "LAB ASSESSMENT SUBMISSION");
                let subNo = (currentMode === 'assign' ? d.aNo : d.assessNo);
                let subTitle = (currentMode === 'assign' ? d.topic : d.assessTitle);
                let labelNo = (currentMode === 'assign' ? "Assignment No" : "Assessment No");
                let labelTopic = (currentMode === 'assign' ? "Topic Name" : "Assessment Title");

                midContent = `<div style="line-height: 4.5; font-size: 21px; font-family: 'Times New Roman', serif;">
                                <p><strong>Course Code:</strong> ${d.code}</p>
                                <p><strong>Course Name:</strong> ${d.title}</p>
                                <p><strong>Semester:</strong> ${d.sem}</p>
                                <p><strong>${labelNo}:</strong> ${subNo}</p>
                                <p><strong>${labelTopic}:</strong> ${subTitle}</p>
                            </div>`;
            }

            // Preview Render
            outputPage.innerHTML = `
                <div id="captureArea">
                    ${watermark}
                    <div style="text-align: center; margin-bottom: 25px; z-index: 2; position: relative;">
                        <img src="${LOCAL_LOGO}" style="height: 80px;">
                        <h1 style="font-size: 24px; color: #003366; margin: 15px 0 5px 0;">DAFFODIL INTERNATIONAL UNIVERSITY</h1>
                        <h2 style="font-size: 16px; border-bottom: 2px solid #000; display: inline-block; padding-bottom: 5px;">${headText}</h2>
                    </div>
                    ${markingTable}
                    <div style="flex-grow: 1; width: 85%; margin: 0 auto; z-index: 2; position: relative;">${midContent}</div>
                    <div style="display: flex; justify-content: space-between; margin-top: 50px; border-top: 1px solid #eee; padding-top: 20px; font-family: 'Times New Roman'; z-index: 2; position: relative;">
                        <div><p><strong>SUBMITTED TO:</strong></p><p>${d.fname}</p><p>${d.fdes}</p><p>${d.fdept}</p></div>
                        <div style="text-align: right;"><p><strong>SUBMITTED BY:</strong></p><p>${d.sname}</p><p>${d.sid}</p><p>Batch: ${d.sec}</p><p>Date: ${d.date}</p></div>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 20px; padding-bottom: 40px;">
                    <button id="downloadPDF" style="padding: 15px 30px; background: #d9534f; color: #fff; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">Download PDF</button>
                </div>`;

            // PDF Action
            document.getElementById('downloadPDF').onclick = function() {
                const { jsPDF } = window.jspdf;
                html2canvas(document.querySelector("#captureArea"), { scale: 3 }).then(canvas => {
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
