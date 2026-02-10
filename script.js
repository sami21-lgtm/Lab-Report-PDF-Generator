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

    // Toggle Logic
    const btns = [labBtn, assignBtn, assessBtn];
    const divs = [labOnly, assignOnly, assessOnly];

    function handleToggle(mode, activeBtn, activeDiv) {
        currentMode = mode;
        btns.forEach(btn => btn.classList.remove('active'));
        divs.forEach(div => div.style.display = 'none');
        activeBtn.classList.add('active');
        activeDiv.style.display = 'block';
    }

    labBtn.onclick = () => handleToggle('lab', labBtn, labOnly);
    assignBtn.onclick = () => handleToggle('assign', assignBtn, assignOnly);
    assessBtn.onclick = () => handleToggle('assess', assessBtn, assessOnly);

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

            // Watermark (For Assign & Assess)
            let watermark = (currentMode === 'assign' || currentMode === 'assess') ? `
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-30deg); opacity: 0.08; z-index: 0; pointer-events: none; width: 80%; text-align: center;">
                    <img src="${LOCAL_LOGO}" style="width: 400px;">
                    <h1 style="font-size: 80px; font-family: 'Arial Black', sans-serif; margin-top: 20px;">DIU</h1>
                </div>` : '';

            // Body Layout Logic
            let bodyHTML = "";
            let headerText = "";
            let markingTable = "";

            if (currentMode === 'lab') {
                headerText = "LAB REPORT SUBMISSION";
                markingTable = `<div style="border: 1.5px solid #000; margin-bottom: 20px; font-family: Arial; font-size: 11px;">
                    <div style="text-align: center; border-bottom: 1.5px solid #000; padding: 5px; font-weight: bold; background: #f0f0f0;">Only for course Teacher</div>
                    <table style="width: 100%; border-collapse: collapse; text-align: center;">
                        <tr style="border-bottom: 1px solid #000;"><th style="padding: 5px; border-right: 1px solid #000;">Criteria</th><th>25%</th><th>50%</th><th>75%</th><th>100%</th><th>Total</th></tr>
                        <tr style="border-bottom: 1px solid #000;"><td>Understanding</td><td></td><td></td><td></td><td></td><td>3</td></tr>
                        <tr style="border-bottom: 1px solid #000;"><td>Analysis</td><td></td><td></td><td></td><td></td><td>4</td></tr>
                        <tr style="border-bottom: 1px solid #000;"><td>Implementation</td><td></td><td></td><td></td><td></td><td>8</td></tr>
                        <tr><td>Report Writing</td><td></td><td></td><td></td><td></td><td>10</td></tr>
                    </table>
                </div>`;
                bodyHTML = `<div style="font-size: 18px; line-height: 2.8; font-family: 'Times New Roman', serif; font-weight: bold;">
                                <p>Course Code: ${d.code}</p> <p>Course Name: ${d.title}</p>
                                <p>Lab No: ${d.lNo}</p> <p>Lab Title: ${d.lTitle}</p>
                                <p>Semester: ${d.sem}</p>
                            </div>`;
            } else {
                headerText = currentMode === 'assign' ? "ASSIGNMENT SUBMISSION" : "LAB ASSESSMENT SUBMISSION";
                let noLabel = currentMode === 'assign' ? "Assignment No" : "Assessment No";
                let titleLabel = currentMode === 'assign' ? "Topic Name" : "Assessment Title";
                let noVal = currentMode === 'assign' ? d.aNo : d.assessNo;
                let titleVal = currentMode === 'assign' ? d.topic : d.assessTitle;

                bodyHTML = `<div style="line-height: 4.2; font-size: 20px; font-family: 'Times New Roman', serif;">
                                <p><strong>Course Code:</strong> ${d.code}</p>
                                <p><strong>Course Name:</strong> ${d.title}</p>
                                <p><strong>Semester:</strong> ${d.sem}</p>
                                <p><strong>${noLabel}:</strong> ${noVal}</p>
                                <p><strong>${titleLabel}:</strong> ${titleVal}</p>
                            </div>`;
            }

            outputPage.innerHTML = `
                <div id="captureArea" style="position: relative; width: 794px; height: 1123px; padding: 50px; border: ${currentMode !== 'lab' ? '14px double #003366' : '1px solid #000'}; box-sizing: border-box; background: #fff; margin: 0 auto; display: flex; flex-direction: column;">
                    ${watermark}
                    <div style="text-align: center; margin-bottom: 30px;">
                        <img src="${LOCAL_LOGO}" style="height: 80px;">
                        <h1 style="font-size: 24px; color: #003366; margin: 15px 0 5px 0;">DAFFODIL INTERNATIONAL UNIVERSITY</h1>
                        <h2 style="font-size: 16px; letter-spacing: 1.5px; border-bottom: 2px solid #000; display: inline-block; padding-bottom: 5px;">${headerText}</h2>
                    </div>
                    ${markingTable}
                    <div style="flex-grow: 1; width: 90%; margin: 0 auto;">${bodyHTML}</div>
                    <div style="display: flex; justify-content: space-between; margin-top: 50px; font-family: 'Times New Roman'; border-top: 1px solid #eee; padding-top: 20px;">
                        <div><p><strong>SUBMITTED TO:</strong></p><p>${d.fname}</p><p>${d.fdes}</p><p>${d.fdept}</p></div>
                        <div style="text-align: right;"><p><strong>SUBMITTED BY:</strong></p><p>${d.sname}</p><p>${d.sid}</p><p>Batch: ${d.sec}</p><p>Date: ${d.date}</p></div>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 20px; padding-bottom: 50px;">
                    <button id="downloadPDF" style="padding: 15px 30px; background: #d9534f; color: #fff; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">Download PDF</button>
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
