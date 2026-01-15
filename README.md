# 📄 DIU Assignment Cover Page Generator

A dead-simple, **client-side** tool that creates **official-looking assignment cover pages** for **Daffodil International University** students in **one click**.

---

## ✨ Features
- Upload **transparent DIU logo** (PNG/SVG) – optional  
- Fill form → **live preview** → **download A4 PDF**  
- **Faculty Name + Department** both printed  
- Date format: **MM/YY/DD**  
- Footer shows **“Daffodil International University”** only in PDF / print  
- **“Developed by Emtiaz Hossain Sami”** appears **only on webpage**, **never in exported file**  
- **Zero back-end** – works offline after first load  

---

## ⚡ Quick Start
1. Download / clone this repo  
2. Double-click `index.html` (or serve via any static host)  
3. Upload logo (optional) → fill form → **Generate Cover**  
4. Hit **Download PDF** → print / submit to BLC

---

## 📁 File Map
| File        | Purpose |
|-------------|---------|
| `index.html` | Mark-up & live preview |
| `style.css`  | A4 print-ready styles |
| `script.js`  | Logo preview + html2canvas + jsPDF glue |
| `README.md`  | This file |

---

## 🛠️ Tech Stack
- Vanilla HTML5 / CSS3 / ES6  
- [html2canvas 1.4.1](https://html2canvas.hertzen.com) – rasterise DOM  
- [jsPDF 2.5.1](https://github.com/parallax/jsPDF) – generate PDF in-browser  

---

## ⚠️ Tips
- Use **transparent PNG/SVG** logo to avoid white box in PDF  
- Disable browser’s *“Print headers & footers”* if printing HTML directly  
- PDF is already **A4 portrait** – no extra page setup needed

---

## 📄 License
MIT – feel free to fork / modify / redistribute.  
Back-link or credit line appreciated 🙂

---

## 📬 Bug / Feature / PR
Open an issue or ping: **samiemtiaz38@gmail.com**
