/**
 * Developed by Emtiaz Hossain Sami | 2026
 * DIU Cover Page Generator Logic
 */

function updatePage() {
    // ইনপুট থেকে ডেটা নিয়ে আউটপুটে বসানো
    const fields = {
        'outType': 'type',
        'outTopic': 'topic',
        'outCC': 'courseCode',
        'outCT': 'courseTitle',
        'outName': 'name',
        'outId': 'id',
        'outSec': 'section',
        'outInsName': 'insName',
        'outInsDes': 'insDesig'
    };

    for (let outId in fields) {
        let value = document.getElementById(fields[outId]).value;
        document.getElementById(outId).innerText = value || (outId.includes('out') ? "---" : "");
    }

    // টাইপ টেক্সট বড় হাতের করা
    document.getElementById('outType').innerText = document.getElementById('type').value.toUpperCase();
    
    // তারিখ অটোমেটিক ফরম্যাট করা (যেমন: 15 January, 2026)
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    document.getElementById('outDate').innerText = new Date().toLocaleDateString('en-GB', options);
}

// PDF হিসেবে ডাউনলোড করার ফাংশন
function downloadPDF() {
    const element = document.getElementById('coverPage');
    const studentName = document.getElementById('name').value || "Student";
    
    const opt = {
        margin: 0,
        filename: `DIU_CoverPage_${studentName}.pdf`,
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { 
            scale: 3, // হাই কোয়ালিটির জন্য স্কেল ৩ রাখা হয়েছে
            useCORS: true, 
            logging: false 
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // ডাউনলোড শুরু
    html2pdf().set(opt).from(element).save();
}

// Image হিসেবে ডাউনলোড করার ফাংশন
function downloadImage() {
    const element = document.getElementById('coverPage');
    
    html2canvas(element, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff"
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'DIU_Cover_Sami_2026.png';
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}

// পেজ লোড হওয়ার সাথে সাথে প্রিভিউ আপডেট করা
window.onload = function() {
    updatePage();
};
