// লোগো ইউআরএল আপডেট (Proxy ব্যবহার করে লোগো লোড করা হচ্ছে)
const LOGO_URL = 'https://upload.wikimedia.org/wikipedia/en/3/3c/Daffodil_International_University_logo.png';

// Generate বাটনের ভেতরের HTML পার্টটি এভাবে রিপ্লেস করুন
outputPage.innerHTML = `
    <div style="position: absolute; top: 55%; left: 50%; transform: translate(-50%, -50%); opacity: 0.08; pointer-events: none; z-index: 0;">
        <img src="${LOGO_URL}" style="width: 450px;" crossorigin="anonymous">
    </div>

    <div style="position: relative; z-index: 1; height: 100%; border: 3px solid #002b59; margin: 30px; padding: 50px; display: flex; flex-direction: column; background: transparent;">
        
        <div style="text-align: center; margin-bottom: 5px;">
            <img src="${LOGO_URL}" style="height: 100px;" crossorigin="anonymous">
        </div>
        
        <h2 style="text-align: center; color: #002b59; font-size: 18px; text-transform: uppercase; margin-bottom: 25px; letter-spacing: 1px; font-weight: bold;">
            Daffodil International University
        </h2>

        <h1 style="text-align:center; color:#002b59; font-size: 24px; text-transform: uppercase; text-decoration: underline; margin-bottom: 40px; font-weight: bold;">
            ${currentMode === 'lab' ? 'Lab Report Submission' : 'Assignment Submission'}
        </h1>

        <div style="font-size: 17px; line-height: 1.8; color: #111; margin-bottom: 50px;">
            <p><strong>Course Code:</strong> ${d.code}</p>
            <p><strong>Course Name:</strong> ${d.title}</p>
            <p><strong>Semester:</strong> ${d.sem}</p>
            <p>${titleInfo}</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 40px; flex-grow: 1;">
            <div style="padding-left: 20px; border-left: 5px solid #002b59;">
                <p style="font-size: 12px; color: #666; text-transform: uppercase; margin:0;">Submitted To</p>
                <p style="font-size: 20px; font-weight: bold; margin: 4px 0;">${d.fname}</p>
                <p style="font-size: 15px; margin:0;">${d.fdes}</p>
                <p style="font-size: 15px; margin:0;">Department of ${d.fdept}</p>
                <p style="font-size: 15px; font-weight: bold; color: #002b59;">Daffodil International University</p>
            </div>

            <div style="padding-left: 20px; border-left: 5px solid #002b59;">
                <p style="font-size: 12px; color: #666; text-transform: uppercase; margin:0;">Submitted By</p>
                <p style="font-size: 20px; font-weight: bold; margin: 4px 0;">${d.sname}</p>
                <p style="font-size: 15px; margin:0;"><strong>ID:</strong> ${d.sid}</p>
                <p style="font-size: 15px; margin:0;"><strong>Section:</strong> ${d.sec}</p>
                <p style="font-size: 15px; margin:0;"><strong>Date:</strong> ${d.date}</p>
                <p style="font-size: 15px; font-weight: bold; color: #002b59;">Daffodil International University</p>
            </div>
        </div>

        <div style="text-align: center; border-top: 1px solid #ddd; padding-top: 15px;">
             <p style="font-size: 14px; color: #002b59; font-weight: bold; letter-spacing: 2px; text-transform: uppercase;">Daffodil International University</p>
        </div>
    </div>`;
