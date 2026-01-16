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

    if (assignBtn && labBtn) {
        assignBtn.onclick = () => {
            currentMode = 'assign';
            assignBtn.classList.add('active');
            labBtn.classList.remove('active');
            assignOnly.style.display = 'block';
            labOnly.style.display = 'none';
        };
        labBtn.onclick = () => {
            currentMode = 'lab';
            labBtn.classList.add('active');
            assignBtn.classList.remove('active');
            labOnly.style.display = 'block';
            assignOnly.style.display = 'none';
        };
    }

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
                fdept: document.getElementById('fdept')?.value || document.getElementById('fdepartment')?.value || '',
                date: (document.getElementById('dd')?.value || '00') + '/' + (document.getElementById('mm')?.value || '00') + '/2026',
                lNo: document.getElementById('labNo')?.value || '',
                lTitle: document.getElementById('labTitle')?.value || '',
                aNo: document.getElementById('assignNo')?.value || '', 
                topic: document.getElementById('topicName')?.value || ''
            };

            // ১. ওয়াটারমার্ক (শুধুমাত্র অ্যাসাইনমেন্টের জন্য)
            let watermark = currentMode === 'assign' ? `
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-30deg); opacity: 0.08; z-index: 0; pointer-events: none; width: 80%; text-align: center;">
                    <img src="${LOCAL_LOGO}" style="width: 400px;">
                    <h1 style="font-size: 60px; font-family: 'Arial Black', sans-serif; margin-top: 20px;">DIU</h1>
                </div>` : '';

            // ২. ল্যাব মার্কিং টেবিল (বক্স)
            let markingTable = `
                <div style="position: relative; z-index: 1; border: 1.5px solid #000; margin: 0 auto 20px auto; width: 95%; font-family: Arial, sans-serif;">
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

            // ৩. সাবমিশন সেকশন (উভয় পাশে প্রতিষ্ঠান ফিক্সড)
            let submissionInfo = `
                <div style="position: relative; z-index: 1; display: flex; justify-content: space-between; margin-top: auto; padding-top: 40px; font-family: 'Times New Roman', serif; width: 90%; margin-left: auto; margin-right: auto;">
                    <div style="flex: 1; border-left: 6px solid #003366; padding-left: 15px; text-align: left;">
                        <p style="font-size: 13px; font-weight: bold; color: #666; margin: 0 0 5px 0;">SUBMITTED TO</p>
                        <p style="font-size: 18px; font-weight: bold; margin: 0;">${d.fname}</p>
                        <p style="font-size: 15px; margin: 4px 0;">${d.fdes}</p>
                        <p style="font-size: 14px; margin: 0;">${d.fdept}</p>
                        <p style="font-size: 14px; font-weight: bold; margin: 4px 0; color: #003366;">Daffodil International University</p>
                    </div>
                    <div style="flex: 1; border-left: 6px solid #003366; padding-left: 15px; text-align: left; margin-left: 40px;">
                        <p style="font-size: 13px; font-weight: bold; color: #666; margin: 0 0 5px 0;">SUBMITTED BY</p>
                        <p style="font-size: 18px; font-weight: bold; margin: 0;">${d.sname}</p>
                        <p style="font-size: 15px; margin: 4px 0;">ID: <b>${d.sid}</b></p>
                        <p style="font-size: 14px; margin: 0;">Dept: ${d.sdept}</p>
                        <p style="font-size: 14px; margin: 4px 0;">Batch: ${d.sec}</p>
                        <p style="font-size: 14px; font-weight: bold; margin: 4px 0; color: #003366;">Daffodil International University</p>
                        <p style="font-size: 13px; margin-top: 5px;">Date: ${d.date}</p>
                    </div>
                </div>`;

            let bodyHTML = currentMode === 'assign' ? 
                `<div style="position: relative; z-index: 1; flex-grow: 1; display: flex; flex-direction: column; justify-content: center; font-family: 'Times New Roman', serif; width: 85%; margin: 0 auto; text-align: left;">
                    <div style="line-height: 4.5; font-size: 21px;">
                        <p><strong>Course Code:</strong> ${d.code}</p>
                        <p><strong>Course Name:</strong> ${d.title}</p>
                        <p><strong>Semester:</strong> ${d.sem}</p>
                        <p><strong>Assignment No:</strong> ${d.aNo}</p>
                        <p><strong>Topic Name:</strong> ${d.topic}</p>
                    </div>
                </div>` :
                `<div style="position: relative; z-index: 1; flex-grow: 1; display: flex; flex-direction: column; justify-content: flex-start; margin-top: 10px; width: 85%; margin: 0 auto; text-align: left;">
                    <div style="font-size: 18px; line-height: 2.8; font-weight: bold; font-family: 'Times New Roman', serif;">
                        <p>Course Code: ${d.code}</p>
                        <p>Course Name: ${d.title}</p>
                        <p>Lab No: ${d.lNo}</p>
                        <p>Lab Title: ${d.lTitle}</p>
                        <p>Semester: ${d.sem}</p>
                    </div>
                </div>`;

            outputPage.innerHTML = `
                <div id="captureArea" style="position: relative; width: 794px; height: 1123px; padding: 45px; border: ${currentMode === 'assign' ? '14px double #003366' : '1px solid #000'}; box-sizing: border-box; background: #fff; margin: 0 auto; display: flex; flex-direction: column; overflow: hidden;">
                    ${watermark}
                    <div style="position: relative; z-index: 1; text-align: center; margin-bottom: 20px;">
                        <img src="${LOCAL_LOGO}" style="height: 75px;">
                        <h1 style="font-size: 22px; color: #003366; margin: 12px 0 4px 0; font-family: 'Arial Black', sans-serif;">DAFFODIL INTERNATIONAL UNIVERSITY</h1>
                        <h2 style="font-size: 15px; font-weight: bold; letter-spacing: 1.5px;">${currentMode === 'lab' ? 'LAB REPORT SUBMISSION' : 'ASSIGNMENT SUBMISSION'}</h2>
                    </div>
                    ${currentMode === 'lab' ? markingTable : ''}
                    ${bodyHTML}
                    ${submissionInfo}
                </div>
                <div style="text-align: center; margin-top: 25px;">
                    <button id="downloadPDF" style="padding: 12px 25px; background: #d9534f; color: white; border: none; cursor: pointer; font-weight: bold;">Download PDF</button>
                    <button id="downloadIMG" style="padding: 12px 25px; background: #5cb85c; color: white; border: none; cursor: pointer; font-weight: bold; margin-left: 15px;">Download Image</button>
                </div>`;

            // PDF & Image Download Handlers
            document.getElementById('downloadPDF').onclick = function() {
                const { jsPDF } = window.jspdf;
                html2canvas(document.querySelector("#captureArea"), { scale: 3 }).then(canvas => {
                    const pdf = new jsPDF('p', 'mm', 'a4');
                    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297);
                    pdf.save("DIU-Cover-Page.pdf");
                });
            };

            document.getElementById('downloadIMG').onclick = function() {
                html2canvas(document.querySelector("#captureArea"), { scale: 3 }).then(canvas => {
                    const link = document.createElement('a');
                    link.download = 'DIU-Cover-Page.png';
                    link.href = canvas.toDataURL();
                    link.click();
                });
            };
            
            previewArea.style.display = 'block';
            window.scrollTo({ top: outputPage.offsetTop, behavior: 'smooth' });
        };
    }
};
