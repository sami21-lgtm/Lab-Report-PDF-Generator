# DIU Cover Page Generator

A tiny, client-side tool that lets **Daffodil International University** students create official-looking cover-pages for assignments, lab-reports or final reports in **less than 10 seconds**.

- No design skills needed  
- No back-end / server / database  
- Works completely offline after first load  
- Exports crisp **A4 PDF** (≈ 300 DPI) with **transparent-logo support**  
- Footer prints only **“Daffodil International University”** (no personal watermark)  
- Page header shows **“Developed by Md. Emtiaz Hossain Sami”** (won’t appear in the PDF)

---

## 🚀 Quick Start

1. Clone / download this repo  
2. Double-click `index.html` (or serve via any static host)  
3. Upload a **transparent-background** DIU logo (PNG/SVG)  
4. Fill the form → **Preview** → **Download PDF**  
5. Print or submit to BLC

---

## 📁 File Map

| File        | Purpose |
|-------------|---------|
| `index.html` | Mark-up & live preview |
| `style.css`  | A4-sized layout, print-friendly styles |
| `script.js`  | Logo preview + html2canvas + jsPDF glue |
| `README.md`  | This file |

---

## 🛠️ Tech Stack

- Vanilla HTML5 / CSS3 / ES6  
- [html2canvas 1.4.1](https://html2canvas.hertzen.com) – rasterise the DOM  
- [jsPDF 2.5.1](https://github.com/parallax/jsPDF) – generate PDF in-browser  

---

## ⚠️ Tips for Perfect Output

- Use **transparent PNG/SVG** logo – white boxes won’t appear  
- Keep logo height ≤ 150 px for better balance  
- Disable browser’s **“Print headers and footers”** if you ever print the HTML directly  
- PDF is already **A4 portrait** – no extra page-setup needed

---

## 📄 License

MIT – feel free to fork / modify / redistribute.  
If you republish, a back-link or credit line is appreciated 🙂

---

## 🐛 Bug Report / Feature Request

Open an issue or ping: **emtiazsami@gmail.com**
