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

    // বাটন ক্লিক ইভেন্ট
    if (assignBtn && labBtn) {
        assignBtn.onclick = function() {
            currentMode = 'assign';
            this.style.backgroundColor = '#003366';
            this.style.color = 'white';
            labBtn.style.backgroundColor = '#f8f9fa';
            labBtn.style.color = '#333';
            if(assignOnly) assignOnly.style.display = 'block';
            if(labOnly) labOnly.style.display = 'none';
        };

        labBtn.onclick = function() {
            currentMode = 'lab';
            this.style.backgroundColor = '#003366';
            this.style.color = 'white';
            assignBtn.style.backgroundColor = '#f8f9fa';
            assignBtn.style.color = '#333';
            if(labOnly) labOnly.style.display = 'block';
            if(assignOnly) assignOnly.style.display = 'none';
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

            // ল্যাব রিপোর্টের বক্স - উইডথ ৯০% করে ছোট করা হয়েছে যাতে বর্ডার না কাটে
            let markingTable = `
                <div style="border: 1px solid #000; margin: 0 auto 15px auto; width: 90%; font-family: Arial, sans-serif; box-sizing: border-box;">
                    <div style="text-align: center; border-bottom: 1px solid #000; padding: 3px; font-weight: bold; background: #f2f2f2; font-size: 11px;">Only for course Teacher</div>
                    <table style="width: 100%; border-collapse: collapse; text-align: center; font-size: 9px;">
                        <tr style="border-bottom: 1px solid #000;">
                            <th style="border-right: 1px solid #000; width: 35%; padding: 3px;"></th>
                            <th>Needs Imp.</th><th>Developing</th><th>Sufficient</th><th>Above Avg.</th><th>Total</th>
                        </tr>
                        <tr style="border-bottom: 1px solid #000; font-weight: bold;">
                            <td style="border-right: 1px solid #000; text-align: left; padding: 3px;">Allocate mark & %</td>
                            <td>25%</td><td>50%</td><td>75%</td><td>100%</td><td>25</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #000;">
                            <td style="border-right: 1px solid #000; text-align: left; padding: 5px 3px;">Understanding <span style="float:right; border: 1px solid #000; padding: 0 3px;">3</span></td>
                            <td></td><td></td><td></td><td></td><td></td>
                        </tr>
                        <tr style="border-bottom: 1px solid #000;">
                            <td style="border-right: 1px solid #000; text-align: left; padding: 5px 3px;">Analysis <span style="float:right; border: 1px solid #000; padding: 0 3px;">4</span></td>
                            <td></td><td></td><td></td><td></td><td></td>
                        </tr>
                        <tr style="border-bottom: 1px solid #000;">
                            <td style="border-right: 1px solid #000; text-align: left; padding: 5px 3px;">Implementation <span style="float:right; border: 1px solid #000; padding: 0 3px;">8</span></td>
                            <td></td><td></td><td></td><td></td><td></td>
                        </tr>
                        <tr style="border-bottom: 1px solid #000;">
                            <td style="border-right: 1px solid #000; text-align: left; padding: 5px 3px;">Report Writing <span style="float:right; border: 1px solid #000; padding: 0 3px;">10</span></td>
                            <td></td><td></td><td></td><td></td><td></td>
                        </tr>
                        <tr style="font-weight: bold;">
                            <td colspan="5" style="border-right: 1px solid #000; text-align: right; padding: 5px;">Total obtained mark</td>
                            <td></td>
                        </tr>
                    </table>
                </div>`;

            let watermark = currentMode === 'assign' ? `<div style="position: absolute; top: 55%; left: 50%; transform: translate(-50%, -50%); opacity: 0.1; z-index: 0;"><img src="${LOCAL_LOGO}" style="width: 550px;"></div>` : "";

            let bodyHTML = "";
            if (currentMode === 'assign') {
                bodyHTML = `
                <div style="flex-grow: 1; display: flex; flex-direction: column; justify-content: space-around; font-family: 'Times New Roman', serif; position: relative; z-index: 1;">
                    <div style="line-height: 4.2; font-size: 21px;">
                        <p><strong>Course Code:</strong> ${d.code}</p>
                        <p><strong>Course Name:</strong> ${d.title}</p>
                        <p><strong>Semester:</strong> ${d.sem}</p>
                        <p><strong>Assignment Title:</strong> <span style="font-weight: bold; color: #003366;">${d.aTitle}</span></p>
                        <p><strong>Topic Name:</strong> ${d.topic}</p>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-top: 60px;">
                        <div style="border-left: 8px solid #003366; padding-left: 12px;">
                            <p style="font-size: 13px; font-weight: bold; color: #666;">SUBMITTED TO</p>
                            <p style="font-size: 22px; font-weight: bold; margin: 5px 0;">${d.fname}</p>
                            <p style="font-size: 17px;">${d.fdes}</p>
                        </div>
                        <div style="border-left: 8px solid #003366; padding-left: 12px;">
                            <p style="font-size: 13px; font-weight: bold; color: #666;">SUBMITTED BY</p>
                            <p style="font-size: 22px; font-weight: bold; margin: 5px 0;">${d.sname}</p>
                            <p style="font-size: 18px;">ID: <b>${d.sid}</b></p>
                            <p style="font-size: 16px;">Date: ${d.date}</p>
                        </div>
                    </div>
                </div>`;
            } else {
                bodyHTML = `
                <div style="font-size: 18px; line-height: 3.0; font-weight: bold; font-family: 'Times New Roman', serif;">
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
                <div style="position: relative; height: 100%; border: ${currentMode === 'assign' ? '12px double #003366' : '1px solid #000'}; padding: 40px; box-sizing: border-box; display: flex; flex-direction: column; background: #fff; overflow: hidden;">
                    <div style="text-align: center; margin-bottom: 15px;">
                        <img src="${LOCAL_LOGO}" style="height: 80px;">
                        <h1 style="font-size: 22px; margin: 10px 0 5px 0; color: #003366;">DAFFODIL INTERNATIONAL UNIVERSITY</h1>
                        <div style="width: 45%; height: 2px; background: #003366; margin: 6px auto;"></div>
                        <h2 style="font-size: 16px; letter-spacing: 2px; font-weight: bold;">${currentMode === 'lab' ? 'LAB REPORT SUBMISSION' : 'ASSIGNMENT SUBMISSION'}</h2>
                    </div>
                    ${currentMode === 'lab' ? markingTable : ''}
                    <div style="flex-grow: 1; display: flex; flex-direction: column; justify-content: center;">
                        ${bodyHTML}
                    </div>
                </div>`;
            
            if(previewArea) previewArea.style.display = 'block';
        };
    }
};
