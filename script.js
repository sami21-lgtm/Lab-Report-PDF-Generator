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

    // 1. Toggle Logic
    function setMode(mode) {
        currentMode = mode;
        labBtn.classList.toggle('active', mode === 'lab');
        assignBtn.classList.toggle('active', mode === 'assign');
        assessBtn.classList.toggle('active', mode === 'assess');

        labOnly.style.display = (mode === 'lab' ? 'block' : 'none');
        assignOnly.style.display = (mode === 'assign' ? 'block' : 'none');
        assessOnly.style.display = (mode === 'assess' ? 'block' : 'none');
    }

    labBtn.onclick = () => setMode('lab');
    assignBtn.onclick = () => setMode('assign');
    assessBtn.onclick = () => setMode('assess');

    // 2. Generation Logic
    if (genBtn) {
        genBtn.onclick = function() {
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

            let watermark = (currentMode !== 'lab') ? `
                <div style="position: absolute; top: 55%; left: 50%; transform: translate(-50%, -50%) rotate(-35deg); opacity: 0.07; z-index: 0; pointer-events: none; width: 80%; text-align: center;">
                    <img src="${LOCAL_LOGO}" style="width: 450px;">
                    <h1 style="font-size: 90px; font-family: 'Arial Black', sans-serif; margin-top: 10px; color: #000;">DIU</h1>
                </div>` : '';

            let headText = "LAB REPORT SUBMISSION";
            let midContent = "";
            let markingTable = "";

            if (currentMode === 'lab') {
                headText = "LAB REPORT SUBMISSION";
                markingTable = `<div style="border: 1.5px solid #000; margin-bottom: 30px; font-family: Arial; font-size: 11px; position: relative; z-index: 2;">
                    <div style="text-align: center; border-bottom: 1.5px solid #000; padding: 6px; font-weight: bold; background: #f2f2f2;">Only for course Teacher</div>
                    <table style="width: 100%; border-collapse: collapse; text-align: center;">
                        <tr style="border-bottom: 1px solid #000;"><th style="padding: 6px; border-right: 1px solid #000;">Criteria</th><th>25%</th><th>50%</th><th>75%</th><th>100%</th><th>Total</th></tr>
                        <tr style="border-bottom: 1px solid #000;"><td>Understanding</td><td></td><td></td><td></td><td></td><td>3</td></tr>
                        <tr style="border-bottom: 1px solid #000;"><td>Analysis</td><td></td><td></td><td></td><td></td><td>4</td></tr>
                        <tr style="border-bottom: 1px solid #000;"><td>Implementation</td><td></td><td></td><td></td><td></td><td>8</td></tr>
                        <tr><td>Report Writing</td><td></td><td></td><td></td><td></td><td>10</td></tr>
                    </table>
                </div>`;
                midContent = `<div style="font-size: 19px; line-height: 2.8; font-family: 'Times New Roman', serif; font-weight: bold;">
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

                midContent = `<div style="line-height: 4.2; font-size: 22px; font-family: 'Times New Roman', serif;">
                                <p><strong>Course Code:</strong> ${d.code}</p>
                                <p><strong>Course Name:</strong> ${d.title}</p>
                                <p><strong>Semester:</strong> ${d.sem}</p>
                                <p><strong>${labelNo}:</strong> ${subNo}</p>
                                <p><strong>${labelTopic}:</strong> ${subTitle}</p>
                            </div>`;
            }

            // Preview Render with Fixed Bottom Logic
            outputPage.innerHTML = `
                <div id="previewContainer" style="display: flex; flex-direction: column; align-items: center; width: 100%;">
                    <div id="captureArea" style="
                        display: flex; 
                        flex-direction: column; 
                        width: 794px; 
                        height: 1123px; 
                        padding: 60px 60px; 
                        box-sizing: border-box; 
                        background: #fff; 
                        position: relative;
                        border: ${currentMode === 'lab' ? '1px solid #000' : '14px double #003366'};
                    ">
                        ${watermark}
                        
                        <div style="text-align: center; margin-bottom: 30px; position: relative; z-index: 2;">
                            <img src="${LOCAL_LOGO}" style="height: 85px;">
                            <h1 style="font-size: 26px; color: #003366; margin: 15px 0 5px 0; font-family: Arial;">DAFFODIL INTERNATIONAL UNIVERSITY</h1>
                            <h2 style="font-size: 16px; border-bottom: 2px solid #000; display: inline-block; padding-bottom: 5px; font-family: Arial; font-weight: bold;">${headText}</h2>
                        </div>

                        <div style="flex-grow: 1; position: relative; z-index: 2;">
                            ${markingTable}
                            <div style="width: 90%; margin: 0 auto;">
                                ${midContent}
                            </div>
                        </div>

                        <div style="
                            margin-top: auto; 
                            display: flex; 
                            justify-content: space-between; 
                            border-top: 1.5px solid #000; 
                            padding-top: 25px; 
                            font-family: 'Times New Roman', serif; 
                            position: relative; 
                            z-index: 2; 
                            width: 100%;
                        ">
                            <div style="flex: 1;">
                                <p style="font-weight: bold; margin-bottom: 10px; font-size: 15px;">SUBMITTED TO:</p>
                                <p style="font-size: 19px; font-weight: bold; margin: 0;">${d.fname}</p>
                                <p style="margin: 3px 0; font-size: 16px;">${d.fdes}</p>
                                <p style="margin: 0; font-size: 15px;">Dept. of ${d.fdept}</p>
                            </div>
                            <div style="flex: 1; text-align: right;">
                                <p style="font-weight: bold; margin-bottom: 10px; font-size: 15px;">SUBMITTED BY:</p>
                                <p style="font-size: 18px; margin: 0;">Name: <b>${d.sname}</b></p>
                                <p style="margin: 3px 0; font-size: 16px;">ID: <b>${d.sid}</b></p>
                                <p style="margin: 3px 0; font-size: 15px;">Batch: ${d.sec}</p>
                                <p style="margin: 0; font-size: 15px;">Date: ${d.date}</p>
                            </div>
                        </div>
                    </div>

                    <div style="margin: 30px 0 50px 0;">
                        <button id="downloadPDF" style="padding: 16px 45px; background: #d9534f; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 18px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                            Download PDF
                        </button>
                    </div>
                </div>`;

            // PDF Action
            document.getElementById('downloadPDF').onclick = function() {
                const { jsPDF } = window.jspdf;
                const element = document.querySelector("#captureArea");
                
                html2canvas(element, { 
                    scale: 3, 
                    useCORS: true,
                    backgroundColor: "#ffffff"
                }).then(canvas => {
                    const pdf = new jsPDF('p', 'mm', 'a4');
                    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297);
                    pdf.save(`DIU-${currentMode}.pdf`);
                });
            };
            
            previewArea.style.display = 'block';
            window.scrollTo({ top: outputPage.offsetTop - 50, behavior: 'smooth' });
        };
    }
};
