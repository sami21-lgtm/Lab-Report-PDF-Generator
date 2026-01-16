window.onload = function() {
    const LOCAL_LOGO = 'diu.jpg'; 
    const genBtn = document.getElementById('genBtn');
    const outputPage = document.getElementById('outputPage');
    let currentMode = 'lab';

    document.getElementById('labBtn').onclick = () => { currentMode = 'lab'; switchUI(); };
    document.getElementById('assignBtn').onclick = () => { currentMode = 'assign'; switchUI(); };

    function switchUI() {
        document.getElementById('labOnly').style.display = currentMode === 'lab' ? 'block' : 'none';
        document.getElementById('assignOnly').style.display = currentMode === 'assign' ? 'block' : 'none';
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

        // ল্যাব রিপোর্টের জন্য উপরের বক্স (image_0318c8.png অনুযায়ী)
        let markingTable = `
            <div style="border: 1.5px solid #000; margin-bottom: 30px; font-family: Arial, sans-serif;">
                <div style="text-align: center; border-bottom: 1.5px solid #000; padding: 6px; font-weight: bold; font-size: 14px; background: #fcfcfc;">Only for course Teacher</div>
                <table style="width: 100%; border-collapse: collapse; text-align: center; font-size: 11px;">
                    <tr style="border-bottom: 1px solid #000;"><th style="border-right: 1px solid #000; width: 35%; padding: 5px;"></th><th>Needs Imp.</th><th>Developing</th><th>Sufficient</th><th>Above Avg.</th><th>Total</th></tr>
                    <tr style="border-bottom: 1px solid #000; font-weight: bold;"><td style="border-right: 1px solid #000; text-align: left; padding: 5px;">Allocate mark & %</td><td>25%</td><td>50%</td><td>75%</td><td>100%</td><td>25</td></tr>
                    <tr style="border-bottom: 1px solid #000;"><td style="border-right: 1px solid #000; text-align: left; padding: 8px 5px;">Understanding <span style="float:right; border: 1px solid #000; padding: 0 5px;">3</span></td><td></td><td></td><td></td><td></td><td></td></tr>
                    <tr style="border-bottom: 1px solid #000;"><td style="border-right: 1px solid #000; text-align: left; padding: 8px 5px;">Analysis <span style="float:right; border: 1px solid #000; padding: 0 5px;">4</span></td><td></td><td></td><td></td><td></td><td></td></tr>
                    <tr style="border-bottom: 1px solid #000;"><td style="border-right: 1px solid #000; text-align: left; padding: 8px 5px;">Implementation <span style="float:right; border: 1px solid #000; padding: 0 5px;">8</span></td><td></td><td></td><td></td><td></td><td></td></tr>
                    <tr style="border-bottom: 1px solid #000;"><td style="border-right: 1px solid #000; text-align: left; padding: 8px 5px;">Report Writing <span style="float:right; border: 1px solid #000; padding: 0 5px;">10</span></td><td></td><td></td><td></td><td></td><td></td></tr>
                    <tr style="font-weight: bold;"><td colspan="5" style="border-right: 1px solid #000; text-align: right; padding: 8px;">Total obtained mark</td><td></td></tr>
                </table>
            </div>`;

        // বড় ওয়াটারমার্ক (অ্যাসাইনমেন্টের জন্য)
        let watermark = currentMode === 'assign' ? `<div style="position: absolute; top: 55%; left: 50%; transform: translate(-50%, -50%); opacity: 0.1; z-index: 0;"><img src="${LOCAL_LOGO}" style="width: 550px;"></div>` : "";

        let content = "";
        if (currentMode === 'assign') {
            // অ্যাসাইনমেন্টে অনেক গ্যাপ এবং বড় ফন্ট (image_039189.png অনুযায়ী)
            content = `
                <div style="flex-grow: 1; display: flex; flex-direction: column; justify-content: space-around; font-family: 'Times New Roman', serif; position: relative; z-index: 1;">
                    <div style="line-height: 3.5; font-size: 20px;">
                        <p><strong>Course Code:</strong> ${d.code}</p>
                        <p><strong>Course Name:</strong> ${d.title}</p>
                        <p><strong>Semester:</strong> ${d.sem}</p>
                        <p><strong>Assignment Title:</strong> <span style="font-weight: bold; border-bottom: 2px solid #003366;">${d.aTitle}</span></p>
                        <p><strong>Topic Name:</strong> ${d.topic}</p>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-top: 40px;">
                        <div style="border-left: 8px solid #003366; padding-left: 20px;">
                            <p style="font-size: 14px; color: #555; margin-bottom: 10px;">SUBMITTED TO</p>
                            <p style="font-size: 22px; font-weight: bold; margin: 0;">${d.fname}</p>
                            <p style="font-size: 17px; margin: 3px 0;">${d.fdes}</p>
                        </div>
                        <div style="border-left: 8px solid #003366; padding-left: 20px;">
                            <p style="font-size: 14px; color: #555; margin-bottom: 10px;">SUBMITTED BY</p>
                            <p style="font-size: 22px; font-weight: bold; margin: 0;">${d.sname}</p>
                            <p style="font-size: 18px; margin: 3px 0;">ID: <b>${d.sid}</b></p>
                            <p style="font-size: 17px;">Date: ${d.date}</p>
                        </div>
                    </div>
                </div>`;
        } else {
            // ল্যাব রিপোর্টের তথ্য (বক্সের নিচে)
            content = `
                <div style="font-size: 18px; line-height: 2.8; font-weight: bold; font-family: 'Times New Roman', serif; position: relative; z-index: 1;">
                    <p>Semester: ${d.sem}</p>
                    <p>Student Name: ${d.sname}</p>
                    <p>Student ID: ${d.sid}</p>
                    <p>Batch: ${d.sec}</p>
                    <p>Course Code: ${d.code}</p>
                    <p>Course Name: ${d.title}</p>
                    <p>Lab No: ${d.lNo}</p>
                    <p>Lab Title: ${d.lTitle}</p>
                    <p>Course Teacher Name: ${d.fname}</p>
                    <p>Submission Date: ${d.date}</p>
                </div>`;
        }

        outputPage.innerHTML = `
            ${watermark}
            <div style="position: relative; height: 100%; border: ${currentMode === 'assign' ? '12px double #003366' : '1.5px solid #000'}; padding: 50px; display: flex; flex-direction: column; background: #fff;">
                <div style="text-align: center; margin-bottom: 15px;">
                    <img src="${LOCAL_LOGO}" style="height: 90px;">
                    <h1 style="font-size: 24px; margin: 15px 0 5px 0; color: #003366; font-family: 'Arial Black', sans-serif;">DAFFODIL INTERNATIONAL UNIVERSITY</h1>
                    <div style="width: 50%; height: 3px; background: #003366; margin: 8px auto;"></div>
                    <h2 style="font-size: 18px; letter-spacing: 2px; font-weight: bold;">${currentMode === 'lab' ? 'LAB REPORT SUBMISSION' : 'ASSIGNMENT SUBMISSION'}</h2>
                </div>
                ${currentMode === 'lab' ? markingTable : ''}
                ${content}
                <div style="text-align: center; margin-top: auto; padding-top: 15px; font-size: 12px; color: #777;">www.daffodilvarsity.edu.bd</div>
            </div>`;
    };
};
