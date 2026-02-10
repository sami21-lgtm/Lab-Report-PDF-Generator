window.onload = function() {
    const LOCAL_LOGO = 'diu.jpg'; 

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

    // Toggle Function - Notun kore kora hoyeche jate button kaj kore
    function setMode(mode) {
        currentMode = mode;
        
        // Active Button Style Change
        labBtn.classList.toggle('active', mode === 'lab');
        assignBtn.classList.toggle('active', mode === 'assign');
        assessBtn.classList.toggle('active', mode === 'assess');

        // Div Show/Hide Change
        labOnly.style.display = (mode === 'lab' ? 'block' : 'none');
        assignOnly.style.display = (mode === 'assign' ? 'block' : 'none');
        assessOnly.style.display = (mode === 'assess' ? 'block' : 'none');
    }

    // Button Event Listeners
    labBtn.addEventListener('click', () => setMode('lab'));
    assignBtn.addEventListener('click', () => setMode('assign'));
    assessBtn.addEventListener('click', () => setMode('assess'));

    if (genBtn) {
        genBtn.onclick = function() {
            const d = {
                code: document.getElementById('courseCode')?.value || '',
                title: document.getElementById('courseTitle')?.value || '',
                sec: document.getElementById('section')?.value || '',
                sem: document.getElementById('semester')?.value || '',
                sid: document.getElementById('sid')?.value || '',
                sname: document.getElementById('sname')?.value || '',
                sdept: document.getElementById('sdepartment')?.value || '', 
                fname: document.getElementById('fname')?.value || '',
                fdes: document.getElementById('fdesignation')?.value || '',
                fdept: document.getElementById('fdepartment')?.value || '',
                date: (document.getElementById('dd')?.value || '00') + '/' + (document.getElementById('mm')?.value || '00') + '/2026',
                lNo: document.getElementById('labNo')?.value || '',
                lTitle: document.getElementById('labTitle')?.value || '',
                aNo: document.getElementById('assignNo')?.value || '', 
                topic: document.getElementById('topicName')?.value || '',
                assessNo: document.getElementById('assessNo')?.value || '',
                assessTitle: document.getElementById('assessTitle')?.value || ''
            };

            let watermark = (currentMode !== 'lab') ? `
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-30deg); opacity: 0.08; z-index: 0; pointer-events: none; width: 80%; text-align: center;">
                    <img src="${LOCAL_LOGO}" style="width: 400px;">
                    <h1 style="font-size: 80px; font-family: 'Arial Black', sans-serif; margin-top: 20px;">DIU</h1>
                </div>` : '';

            let bodyHTML = "";
            let headerText = "";
            let markingTable = "";

            if (currentMode === 'lab') {
                headerText = "LAB REPORT SUBMISSION";
                markingTable = `<div style="position: relative; z-index: 1; border: 1.5px solid #000; margin: 0 auto 20px auto; width: 95%; font-family: Arial, sans-serif;">
                    <div style="text-align: center; border-bottom: 1.5px solid #000; padding: 5px; font-weight: bold; background: #f0f0f0; font-size: 13px;">Only for course Teacher</div>
                    <table style="width: 100%; border-collapse: collapse; text-align: center; font-size: 11px;">
                        <tr style="border-bottom: 1px solid #000;"><th style="border-right: 1px solid #000; width: 35%; padding: 5px;"></th><th>Needs Imp.</th><th>Developing</th><th>Sufficient</th><th>Above Avg.</th><th>Total</th></tr>
                        <tr style="border-bottom: 1px solid #000; font-weight: bold; background: #fafafa;"><td style="border-right: 1px solid #000; text-align: left; padding: 5px;">Allocate mark & %</td><td>25%</td><td>50%</td><td>75%</td><td>100%</td><td>25</td></tr>
                        <tr style="border-bottom: 1px solid #000;"><td style="border-right: 1px solid #000; text-align: left; padding: 12px 5px;">Understanding <span style="float:right; border: 1px solid #000; padding: 0 5px;">3</span></td><td></td><td></td><td></td><td></td><td></td></tr>
                        <tr style="border-bottom: 1px solid #000;"><td style="border-right: 1px solid #000; text-align: left; padding: 12px 5px;">Analysis <span style="float:right; border: 1px solid #000; padding: 0 5px;">4</span></td><td></td><td></td><td></td><td></td><td></td></tr>
                        <tr style="border-bottom: 1px solid #000;"><td style="border-right: 1px solid #000; text-align: left; padding: 12px 5px;">Implementation <span style="float:right; border: 1px solid #000; padding: 0 5px;">8</span></td><td></td><td></td><td></td><td></td><td></td></tr>
                        <tr style="border-bottom: 1px solid #000;"><td style="border-right: 1px solid #000; text-align: left; padding: 12px 5px;">Report Writing <span style="float:right; border: 1px solid #000; padding: 0 5px;">10</span></td><td></td><td></td><td></td><td></td><td></td></tr>
                        <tr style="font-weight: bold;"><td colspan="5" style="border-right: 1px solid #000; text-align: right; padding: 10px;">Total obtained mark</td><td style="background: #fff;"></td></tr>
                    </table>
                </div>`;
                bodyHTML = `<div style="position: relative; z-index: 1; flex-grow: 1; display: flex; flex-direction: column; justify-content: flex-start; margin-top: 10px; width: 85%; margin: 0 auto; text-align: left;">
                                <div style="font-size: 18px; line-height: 2.8; font-weight: bold; font-family: 'Times New Roman', serif;">
                                    <p>Course Code: ${d.code}</p> <p>Course Name: ${d.title}</p>
                                    <p>Lab No: ${d.lNo}</p> <p>Lab Title: ${d.lTitle}</p>
                                    <p>Semester: ${d.sem}</p>
                                </div>
                            </div>`;
            } else {
                headerText = (currentMode === 'assign' ? "ASSIGNMENT SUBMISSION" : "LAB ASSESSMENT SUBMISSION");
                let subNo = (currentMode === 'assign' ? d.aNo : d.assessNo);
                let subTitle = (currentMode === 'assign' ? d.topic : d.assessTitle);
                let subLabel = (currentMode === 'assign' ? "Assignment No" : "Assessment No");
                let topicLabel = (currentMode === 'assign' ? "Topic Name" : "Assessment Title");

                bodyHTML = `<div style="position: relative; z-index: 1; flex-grow: 1; display: flex; flex-direction: column; justify-content: center; font-family: 'Times New Roman', serif; width: 85%; margin: 0 auto; text-align: left;">
                                <div style="line-height: 4.5; font-size: 21px;">
                                    <p><strong>Course Code:</strong> ${d.code}</p>
                                    <p><strong>Course Name:</strong> ${d.title}</p>
                                    <p><strong>Semester:</strong> ${d.sem}</p>
                                    <p><strong>${subLabel}:</strong> ${subNo}</p>
                                    <p><strong>${topicLabel}:</strong> ${subTitle}</p>
                                </div>
                            </div>`;
            }

            outputPage.innerHTML = `
                <div id="captureArea" style="position: relative; width: 794px; height: 1123px; padding: 45px; border: ${currentMode !== 'lab' ? '14px double #003366' : '1px solid #000'}; box-sizing: border-box; background: #fff; margin: 0 auto; display: flex; flex-direction: column; overflow: hidden;">
                    ${watermark}
                    <div style="position: relative; z-index: 1; text-align: center; margin-bottom: 20px;">
                        <img src="${LOCAL_LOGO}" style="height: 75px;">
                        <h1 style="font-size: 22px; color: #003366; margin: 12px 0 4px 0; font-family: 'Arial Black', sans-serif;">DAFFODIL INTERNATIONAL UNIVERSITY</h1>
                        <h2 style="font-size: 15px; font-weight: bold; letter-spacing: 1.5px;">${headerText}</h2>
                    </div>
                    ${markingTable}
                    ${bodyHTML}
                    <div style="position: relative; z-index: 1; display: flex; justify-content: space-between; margin-top: auto; padding-top: 40px; font-family: 'Times New Roman', serif; width: 90%; margin-left: auto; margin-right: auto;">
                        <div style="flex: 1; border-left: 6px solid #003366; padding-left: 15px;">
                            <p style="font-size: 13px; font-weight: bold; color: #666; margin: 0 0 5px 0;">SUBMITTED TO</p>
                            <p style="font-size: 18px; font-weight: bold; margin: 0;">${d.fname}</p>
                            <p style="font-size: 15px; margin: 4px 0;">${d.fdes}</p>
                            <p style="font-size: 14px; margin: 0;">${d.fdept}</p>
                        </div>
                        <div style="flex: 1; border-left: 6px solid #003366; padding-left: 15px; margin-left: 40px;">
                            <p style="font-size: 13px; font-weight: bold; color: #666; margin: 0 0 5px 0;">SUBMITTED BY</p>
                            <p style="font-size: 17px; margin: 0;">Name: <b>${d.sname}</b></p>
                            <p style="font-size: 15px; margin: 4px 0;">ID: <b>${d.sid}</b></p>
                            <p style="font-size: 13px; margin-top: 5px;">Date: ${d.date}</p>
                        </div>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 25px;">
                    <button id="downloadPDF" style="padding: 12px 25px; background: #d9534f; color: white; border: none; cursor: pointer; font-weight: bold; border-radius: 5px;">Download PDF</button>
                </div>`;

            document.getElementById('downloadPDF').onclick = function() {
                const { jsPDF } = window.jspdf;
                html2canvas(document.querySelector("#captureArea"), { scale: 3 }).then(canvas => {
                    const pdf = new jsPDF('p', 'mm', 'a4');
                    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297);
                    pdf.save(`DIU-${currentMode}-Cover.pdf`);
                });
            };
            
            previewArea.style.display = 'block';
            window.scrollTo({ top: outputPage.offsetTop, behavior: 'smooth' });
        };
    }
};
