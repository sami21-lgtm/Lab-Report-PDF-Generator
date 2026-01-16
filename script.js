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

    // বাটন ক্লিক ইভেন্টগুলো ঠিক করা হয়েছে
    if(assignBtn) {
        assignBtn.onclick = function() {
            currentMode = 'assign';
            assignBtn.style.backgroundColor = '#003366'; // একটিভ কালার
            assignBtn.style.color = 'white';
            labBtn.style.backgroundColor = '#f0f0f0';
            labBtn.style.color = 'black';
            assignOnly.style.display = 'block';
            labOnly.style.display = 'none';
        };
    }

    if(labBtn) {
        labBtn.onclick = function() {
            currentMode = 'lab';
            labBtn.style.backgroundColor = '#003366';
            labBtn.style.color = 'white';
            assignBtn.style.backgroundColor = '#f0f0f0';
            assignBtn.style.color = 'black';
            labOnly.style.display = 'block';
            assignOnly.style.display = 'none';
        };
    }

    genBtn.onclick = function() {
        // ডেটা কালেকশন
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

        // ল্যাব অ্যাসেসমেন্ট টেবিল (image_0318c8.png অনুযায়ী)
        let markingTable = `
            <div style="border: 1.5px solid #000; margin-bottom: 40px; font-family: Arial, sans-serif;">
                <div style="text-align: center; border-bottom: 1.5px solid #000; padding: 6px; font-weight: bold; background: #f9f9f9;">Only for course Teacher</div>
                <table style="width: 100%; border-collapse: collapse; text-align: center; font-size: 11px;">
                    <tr style="border-bottom: 1px solid #000;"><th style="border-right: 1px solid #000; width: 35%; padding: 5px;"></th><th>Needs Imp.</th><th>Developing</th><th>Sufficient</th><th>Above Avg.</th><th>Total</th></tr>
                    <tr style="border-bottom: 1px solid #000; font-weight: bold;"><td style="border-right: 1px solid #000; text-align: left; padding: 5px;">Allocate mark & %</td><td>25%</td><td>50%</td><td>75%</td><td>100%</td><td>25</td></tr>
                    <tr style="border-bottom: 1px solid #000;"><td style="border-right: 1px solid #000; text-align: left; padding: 12px 5px;">Understanding <span style="float:right; border: 1px solid #000; padding: 0 6px;">3</span></td><td></td><td></td><td></td><td></td><td></td></tr>
                    <tr style="border-bottom: 1px solid #000;"><td style="border-right: 1px solid #000; text-align: left; padding: 12px 5px;">Analysis <span style="float:right; border: 1px solid #000; padding: 0 6px;">4</span></td><td></td><td></td><td></td><td></td><td></td></tr>
                    <tr style="border-bottom: 1px solid #000;"><td style="border-right: 1px solid #000; text-align: left; padding: 12px 5px;">Implementation <span style="float:right; border: 1px solid #000; padding: 0 6px;">8</span></td><td></td><td></td><td></td><td></td><td></td></tr>
                    <tr style="border-bottom: 1px solid #000;"><td style="border-right: 1px solid #000; text-align: left; padding: 12px 5px;">Report Writing <span style="float:right; border: 1px solid #000; padding: 0 6px;">10</span></td><td></td><td></td><td></td><td></td><td></td></tr>
                    <tr style="font-weight: bold;"><td colspan="5" style="border-right: 1px solid #000; text-align: right; padding: 10px;">Total obtained mark</td><td></td></tr>
                </table>
            </div>`;

        // বড় ওয়াটারমার্ক লোগো (Assignment-এর জন্য)
        let watermark = currentMode === 'assign' ? `<div style="position: absolute; top: 55%; left: 50%; transform: translate(-50%, -50%); opacity: 0.12; z-index: 0;"><img src="${LOCAL_LOGO}" style="width: 650px;"></div>` : "";

        let bodyContent = "";
        if (currentMode === 'assign') {
            // অ্যাসাইনমেন্টে অনেক বড় গ্যাপ এবং বড় ফন্ট (image_039189.png অনুযায়ী)
            bodyContent = `
                <div style="flex-grow: 1; display: flex; flex-direction: column; justify-content: space-around; font-family: 'Times New Roman', serif; position: relative; z-index: 1;">
                    <div style="line-height: 4.2; font-size: 21px; margin-top: 20px;">
                        <p><strong>Course Code:</strong> ${d.code}</p>
                        <p><strong>Course Name:</strong> ${d.title}</p>
                        <p><strong>Semester:</strong> ${d.sem}</p>
                        <p><strong>Assignment Title:</strong> <span style="font-weight: bold; color: #003366;">${d.aTitle}</span></p>
                        <p><strong>Topic Name:</strong> ${d.topic}</p>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-top: 60px; margin-bottom: 40px;">
                        <div style="border-left: 10px solid #003366; padding-left: 20px; width: 45%;">
                            <p style="font-size: 14px; font-weight: bold; color: #666; margin-bottom: 15px;">SUBMITTED TO</p>
                            <p style="font-size: 24px; font-weight: bold; margin: 0;">${d.fname}</p>
                            <p style="font-size: 18px; margin: 5px 0;">${d.fdes}</p>
                        </div>
                        <div style="border-left: 10px solid #003366; padding-left: 20px; width: 45%;">
                            <p style="font-size: 14px; font-weight: bold; color: #666; margin-bottom: 15px;">SUBMITTED BY</p>
                            <p style="font-size: 24px; font-weight: bold; margin: 0;">${d.sname}</p>
                            <p style="font-size: 19px; margin: 5px 0;">ID: <b>${d.sid}</b></p>
                            <p style="font-size: 18px;">Date: ${d.date}</p>
                        </div>
                    </div>
                </div>`;
        } else {
            // ল্যাব রিপোর্টের স্পেসিং ও তথ্য (বক্সের নিচে)
            bodyContent = `
                <div style="font-size: 19px; line-height: 3.2; font-weight: bold; font-family: 'Times New Roman', serif; position: relative; z-index: 1; margin-top: 10px;">
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
            <div style="position: relative; height: 100%; border: ${currentMode === 'assign' ? '15px double #003366' : '1.5px solid #000'}; padding: 55px; display: flex; flex-direction: column; background: #fff; overflow: hidden;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <img src="${LOCAL_LOGO}" style="height: 100px;">
                    <h1 style="font-size: 26px; margin: 15px 0 5px 0; color: #003366; font-family: 'Arial Black', sans-serif;">DAFFODIL INTERNATIONAL UNIVERSITY</h1>
                    <div style="width: 55%; height: 3px; background: #003366; margin: 10px auto;"></div>
                    <h2 style="font-size: 20px; letter-spacing: 3px; font-weight: bold;">${currentMode === 'lab' ? 'LAB REPORT SUBMISSION' : 'ASSIGNMENT SUBMISSION'}</h2>
                </div>
                ${currentMode === 'lab' ? markingTable : ''}
                ${bodyContent}
            </div>`;
        
        previewArea.style.display = 'block';
    };
};
