function updatePage() {
    document.getElementById('outType').innerText = document.getElementById('type').value.toUpperCase();
    document.getElementById('outTopic').innerText = document.getElementById('topic').value || "Enter Topic Name";
    document.getElementById('outCC').innerText = document.getElementById('courseCode').value || "N/A";
    document.getElementById('outCT').innerText = document.getElementById('courseTitle').value || "N/A";
    document.getElementById('outName').innerText = document.getElementById('name').value || "Student Name";
    document.getElementById('outId').innerText = document.getElementById('id').value || "ID Number";
    document.getElementById('outSec').innerText = document.getElementById('section').value || "N/A";
    document.getElementById('outInsName').innerText = document.getElementById('insName').value || "Instructor Name";
    document.getElementById('outInsDes').innerText = document.getElementById('insDesig').value || "Designation";
    
    // অটো আজকের তারিখ নেওয়া
    const today = new Date().toLocaleDateString();
    document.getElementById('outDate').innerText = today;
}

// PDF হিসেবে ডাউনলোড
function downloadPDF() {
    const element = document.getElementById('coverPage');
    const opt = {
        margin: 0,
        filename: 'DIU_Cover_Page.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
}

// Image হিসেবে ডাউনলোড
function downloadImage() {
    const element = document.getElementById('coverPage');
    html2canvas(element).then(canvas => {
        const link = document.createElement('a');
        link.download = 'Cover_Page.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}
