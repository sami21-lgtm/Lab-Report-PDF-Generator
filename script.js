window.onload = function() {
    const LOCAL_LOGO = 'diu.jpg'; // নিশ্চিত করুন এই ফাইলটি আপনার প্রজেক্ট ফোল্ডারে আছে

    // HTML এলিমেন্টগুলো সিলেক্ট করা
    const labBtn = document.getElementById('labBtn');
    const assignBtn = document.getElementById('assignBtn');
    const labOnly = document.getElementById('labOnly');
    const assignOnly = document.getElementById('assignOnly');
    const genBtn = document.getElementById('genBtn');
    const outputPage = document.getElementById('outputPage');
    const previewArea = document.getElementById('previewArea');

    let currentMode = 'lab';

    // ১. অ্যাসাইনমেন্ট ও ল্যাব বাটন ফিক্স (image_03a3ae.png অনুযায়ী)
    if (assignBtn && labBtn) {
        assignBtn.addEventListener('click', function() {
            currentMode = 'assign';
            assignBtn.style.backgroundColor = '#003366';
            assignBtn.style.color = 'white';
            labBtn.style.backgroundColor = '#f8f9fa';
            labBtn.style.color = '#333';
            if(assignOnly) assignOnly.style.display = 'block';
            if(labOnly) labOnly.style.display = 'none';
        });

        labBtn.addEventListener('click', function() {
            currentMode = 'lab';
            labBtn.style.backgroundColor = '#003366';
            labBtn.style.color = 'white';
            assignBtn.style.backgroundColor = '#f8f9fa';
            assignBtn.style.color = '#333';
            if(labOnly) labOnly.style.display = 'block';
            if(assignOnly) assignOnly.style.display = 'none';
        });
    }

    // ২. জেনারেট বাটন ফিক্স (image_039d01.png অনুযায়ী)
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
                date: `${document.getElementById('dd')?.value || '00'}/${document.getElementById('mm')?.value || '00'}/2026`,
                lNo: document.getElementById('labNo')?.value || '',
                lTitle: document.getElementById('labTitle')?.value || '',
                aTitle: document.getElementById('assignTitle')?.value || '',
                topic: document.getElementById('topicName')?.value || ''
            };

            // ল্যাব রিপোর্টের জন্য অ্যাসেসমেন্ট টেবিল (image_0318c8.png অনুযায়ী)
            let markingTable = `
                <div style="border: 1.5px solid #000; margin-bottom: 40px; font-family: Arial, sans-serif;">
                    <div style="text-align: center; border-bottom: 1.5px solid #000; padding: 6px; font-weight: bold; background: #f2f2f2;">Only for course Teacher</div>
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

            // অ্যাসাইনমেন্টের জন্য বড় লোগো ওয়াটারমার্ক (image_039189.png অনুযায়ী)
            let watermark = currentMode === 'assign' ? `<div style="position: absolute; top: 55%; left: 50%; transform: translate(-50%, -50%); opacity: 0.12; z-index: 0;"><img src="${LOCAL_LOGO}" style="width: 700px;"></div>` : "";

            let bodyContent = "";
            if (currentMode === 'assign') {
                // অ্যাসাইনমেন্টে অনেক বড় গ্যাপ এবং বড় ফন্ট
                bodyContent = `
                    <div style="flex-grow: 1; display: flex; flex-direction: column; justify-content: space-around; font-family: 'Times New Roman', serif; position: relative; z-index: 1;">
                        <div style="line-height: 4.5; font-size: 22px; margin-top: 20px;">
                            <p><strong>Course Code:</strong> ${d.code}</p>
                            <p><strong>Course Name:</strong> ${d.title}</p>
                            <p><strong>Semester:</strong> ${d.sem}</p>
                            <p><strong>Assignment Title:</strong> <span style="font-weight: bold; color: #003366;">${d.aTitle}</span></p>
                            <p><strong>Topic Name:</strong> ${d.topic}</p>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-top: 80px; margin-bottom: 50px;">
                            <div style="border-left: 12px solid #003366; padding-left: 20px; width: 45%;">
                                <p style="font-size: 15px; font-weight: bold; color: #666; margin-bottom: 15px;">SUBMITTED TO</p>
                                <p style="font-size: 26px; font-weight: bold; margin: 0;">${d.fname}</p>
                                <p style="font-size: 20px; margin: 5px 0;">${d.fdes}</p>
                            </div>
                            <div style="border-left: 12px solid #003366; padding-left: 20px; width: 45%;">
                                <p style="font-size: 15px; font-weight: bold; color: #666; margin-bottom: 15px;">SUBMITTED BY</p>
                                <p style="font-size: 26px; font-weight: bold; margin: 0;">${d.sname}</p>
                                <p style="font-size: 20px; margin: 5px 0;">ID: <b>${d.sid}</b></p>
                                <p style="font-size: 20px;">Date: ${d.date}</p>
                            </div>
                        </div>
                    </div>`;
            } else {
                // ল্যাব রিপোর্টের জন্য (image_0318c8.png এর ডিজাইন বজায় রাখা হয়েছে)
                bodyContent = `
                    <div style="font-size: 20px; line-height: 3.5; font-weight: bold; font-family: 'Times New Roman', serif; position: relative; z-index: 1;">
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
                <div style="position: relative; height: 100%; border: ${currentMode === 'assign' ? '18px double #003366' : '1.5px solid #000'}; padding: 60px; display: flex; flex-direction: column; background: #fff; overflow: hidden;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <img src="${LOCAL_LOGO}" style="height: 110px;">
                        <h1 style="font-size: 28px; margin: 15px 0 5px 0; color: #003366; font-family: 'Arial Black', sans-serif;">DAFFODIL INTERNATIONAL UNIVERSITY</h1>
                        <div style="width: 60%; height: 3px; background: #003366; margin: 10px auto;"></div>
                        <h2 style="font-size: 22px; letter-spacing: 4px; font-weight: bold;">${currentMode === 'lab' ? 'LAB REPORT SUBMISSION' : 'ASSIGNMENT SUBMISSION'}</h2>
                    </div>
                    ${currentMode === 'lab' ? markingTable : ''}
                    ${bodyContent}
                </div>`;
            
            if(previewArea) previewArea.style.display = 'block';
            window.scrollTo({ top: outputPage.offsetTop, behavior: 'smooth' });
        };
    }
};
