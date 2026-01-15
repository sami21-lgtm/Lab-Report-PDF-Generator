const logoInput  = document.getElementById('logoInput');
const coverForm  = document.getElementById('coverForm');
const previewArea= document.getElementById('previewArea');
const coverPage  = document.getElementById('coverPage');
const downloadBtn= document.getElementById('downloadBtn');

let logoDataURL = ''; // store uploaded logo

/* 1. Logo preview */
logoInput.addEventListener('change', e=>{
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = ev=>{
     logoDataURL = ev.target.result;
     document.getElementById('logoPreview').src = logoDataURL;
  };
  reader.readAsDataURL(file);
});

/* 2. Form submit -> show preview */
coverForm.addEventListener('submit', e=>{
  e.preventDefault();
  // fill preview
  document.getElementById('pTitle').textContent    = document.getElementById('title').value;
  document.getElementById('pCourse').textContent   = document.getElementById('course').value;
  document.getElementById('pSection').textContent  = document.getElementById('section').value;
  document.getElementById('pSemester').textContent = document.getElementById('semester').value;
  document.getElementById('pSid').textContent      = document.getElementById('sid').value;
  document.getElementById('pSname').textContent    = document.getElementById('sname').value;
  document.getElementById('pFname').textContent    = document.getElementById('fname').value;

  if(!logoDataURL) alert("Please upload DIU logo first!");
  else { previewArea.classList.remove('hidden'); window.scrollTo(0, previewArea.offsetTop); }
});

/* 3. Download PDF */
downloadBtn.addEventListener('click', ()=>{
  html2canvas(coverPage, { scale: 2, useCORS: true }).then(canvas=>{
     const imgData = canvas.toDataURL('image/png');
     const pdf = new jspdf.jsPDF('p','pt','a4');
     const imgWidth = 595; // A4 width in pt
     const imgHeight = (canvas.height * imgWidth) / canvas.width;
     pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
     pdf.save('DIU_CoverPage.pdf');
  });
});
