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

    // বাটন সিলেকশন ফিক্স
    if (assignBtn && labBtn) {
        assignBtn.onclick = () => {
            currentMode = 'assign';
            assignBtn.style.background = '#003366'; assignBtn.style.color = 'white';
            labBtn.style.background = '#f8f9fa'; labBtn.style.color = '#333';
            assignOnly.style.display = 'block'; labOnly.style.display = 'none';
        };
        labBtn.onclick = () => {
            currentMode = 'lab';
            labBtn.style.background = '#003366'; labBtn.style.color = 'white';
            assignBtn.style.background = '#f8f9fa'; assignBtn.style.color = '#333';
            labOnly.style.display = 'block'; assignOnly.style.display = 'none';
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
                fname: document.getElementById('fname')?.value || '',
                fdes: document.getElementById('fdesignation')?.value || '',
                date: (document.getElementById('dd')?.value || '00') + '/' + (document.getElementById('mm')?.value || '00') + '/2026',
                lNo: document.getElementById('labNo')?.value || '',
                lTitle: document.getElementById('labTitle')?.value || '',
                aTitle: document.getElementById('assignTitle')?.value || '',
                topic: document.getElementById('topicName')?.value || ''
            };

            // ল্যাব রিপোর্টের বক্স - উইডথ ৭০% এবং ফন্ট সাইজ একদম ছোট করা হয়েছে
            let markingTable = `
                <div style="border: 0.8px solid #000; margin: 0 auto 15px auto; width: 70%; font-family: Arial, sans-serif;">
                    <div style="text-align: center; border-bottom: 0.8px solid #000; padding: 2px; font-weight: bold; background: #f9f9f9; font-size: 9px;">Only for course Teacher</div>
                    <table style="width: 100%; border-collapse: collapse; text-align: center; font-size: 7.5px;">
                        <tr style="border-bottom: 0.5px solid #000;"><th style="border-right: 0.5px solid #000; width: 35%;"></th><th>Needs Imp.</th><th>Developing</th><th>Sufficient</th><th>Above Avg.</th><th>Total</th></tr>
                        <tr style="border-bottom: 0.5px solid #000; font-weight: bold;"><td style="border-right: 0.5px solid #000; text-align: left; padding: 2px;">Allocate mark & %</td><td>25%</td><td>50%</td><td>75%</td><td>100%</td><td>25</td></tr>
                        <tr style="border-bottom: 0.5px solid #000;"><td style="border-right: 0.5px solid #000; text-align: left; padding: 3px;">Understanding <span style="float:right; border: 0.5px solid #000; padding: 0 2px;">3</span></td><td></td><td></td><td></td><td></td><td></td></tr>
                        <tr style="border-bottom: 0.5px solid #000;"><td style="border-right: 0.5px solid #000; text-align: left; padding: 3px;">Analysis <span style="float:right; border: 0.5px solid #000; padding: 0 2px;">4</span></td><td></td><td></td><td></td><td></td><td></td></tr>
                        <tr style="border-bottom: 0.5px solid #000;"><td style="border-right: 0.5px solid #000; text-align: left; padding: 3px;">Implementation <span style="float:right; border: 0.5px solid #000; padding: 0 2px;">8</span></td><td></td><td></td><td></td><td></td><td></td></tr>
                        <tr style="border-bottom: 0.5px solid #000;"><td style="border-right: 0.5px solid #000; text-align: left; padding: 3px;">Report Writing <span style="float:right; border: 0.5px solid #000; padding: 0 2px;">10</span></td><td></td><td></td><td></td><td></td><td></td></tr>
                        <tr style="font-weight: bold;"><td colspan="5" style="border-right: 0.5px solid #000; text-align: right; padding: 3px;">Total obtained mark</td><td></td></tr>
                    </table>
                </div>`;

            let bodyHTML = currentMode === 'assign' ? 
                `<div style="flex-grow: 1; display: flex; flex-direction: column; justify-content: space-around; font-family: 'Times New Roman', serif;">
                    <div style="line-height: 4.0; font-size: 19px;">
                        <p><strong>Course Code:</strong> ${d.code}</p><p><strong>Course Name:</strong> ${d.title}</p><p><strong>Semester:</strong> ${d.sem}</p><p><strong>Assignment Title:</strong> ${d.aTitle}</p><p><strong>Topic Name:</strong> ${d.topic}</p>
                    </div>
                </div>` :
                `<div style="font-size: 16px; line-height: 2.8; font-weight: bold; font-family: 'Times New Roman', serif; width: 70%; margin: 0 auto;">
                    <p>Semester: ${d.sem}</p><p>Student Name: ${d.sname}</p><p>Student ID: ${d.sid}</p><p>Batch: ${d.sec}</p><p>Course Code: ${d.code}</p><p>Course Name: ${d.title}</p><p>Lab No: ${d.lNo}</p><p>Lab Title: ${d.lTitle}</p><p>Course Teacher Name: ${d.fname}</p><p>Submission Date: ${d.date}</p>
                </div>`;

            outputPage.innerHTML = `
                <div id="captureArea" style="width: 794px; height: 1123px; padding: 50px; border: ${currentMode === 'assign' ? '12px double #003366' : '1px solid #000'}; box-sizing: border-box; background: #fff; margin: 0 auto; display: flex; flex-direction: column;">
                    <div style="text-align: center; margin-bottom: 10px;">
                        <img src="${LOCAL_LOGO}" style="height: 65px;">
                        <h1 style="font-size: 19px; color: #003366; margin: 8px 0;">DAFFODIL INTERNATIONAL UNIVERSITY</h1>
                        <h2 style="font-size: 13px; border-top: 1.5px solid #003366; display: inline-block; padding-top: 4px;">${currentMode === 'lab' ? 'LAB REPORT SUBMISSION' : 'ASSIGNMENT SUBMISSION'}</h2>
                    </div>
                    ${currentMode === 'lab' ? markingTable : ''}
                    ${bodyHTML}
                </div>
                <div style="text-align: center; margin-top: 20px;">
                    <button id="downloadPDF" style="padding: 10px 20px; background: #d9534f; color: white; border: none; border-radius: 5px; cursor: pointer; margin-right: 10px;">Download PDF</button>
                    <button id="downloadIMG" style="padding: 10px 20px; background: #5cb85c; color: white; border: none; border-radius: 5px; cursor: pointer;">Download Image</button>
                </div>`;

            // PDF ডাউনলোড ফাংশন
            document.getElementById('downloadPDF').onclick = function() {
                const { jsPDF } = window.jspdf;
                html2canvas(document.querySelector("#captureArea")).then(canvas => {
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF('p', 'mm', 'a4');
                    pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
                    pdf.save("Cover-Page.pdf");
                });
            };

            // Image ডাউনলোড ফাংশন
            document.getElementById('downloadIMG').onclick = function() {
                html2canvas(document.querySelector("#captureArea")).then(canvas => {
                    const link = document.createElement('a');
                    link.download = 'Cover-Page.png';
                    link.href = canvas.toDataURL();
                    link.click();
                });
            };
            
            previewArea.style.display = 'block';
        };
    }
};
