---
trigger: always_on
---


# 📘 Full-Stack Development Style Guide (JavaScript)

## 📐 General Code Style & Formatting
- Gunakan bahasa Inggris untuk semua kode dan dokumentasi.
- Hindari penggunaan `any` (tidak relevan di JS, tapi tetap hindari struktur data ambigu).
- Gunakan komentar JSDoc untuk mendokumentasikan fungsi publik dan kelas.
- Jangan sisakan baris kosong dalam fungsi.
- Satu ekspor utama per file (default atau named).
- Gunakan linter (seperti ESLint) dan formatter (seperti Prettier) untuk konsistensi.
- Panjang maksimal baris: **100 karakter**.

## 🧾 Naming Conventions
- **PascalCase** untuk class dan komponen.
- **camelCase** untuk variabel, fungsi, dan metode.
- **kebab-case** untuk nama file dan folder.
- **UPPERCASE** untuk variabel environment dan konstanta.
- Hindari magic numbers; definisikan sebagai konstanta bernama.
- Gunakan nama variabel/fungsi yang **semantik** dan jelas.

## 🔧 Functions & Logic
- Fungsi pendek dan satu tujuan utama (**< 20 baris**).
- Hindari blok bersarang dalam dengan:
  - Return awal (early returns).
  - Ekstraksi logika ke fungsi utilitas.
- Gunakan fungsi bawaan seperti `map`, `filter`, `reduce` bila memungkinkan.
- Gunakan **arrow functions** untuk fungsi sederhana.
- Gunakan nilai default parameter (`param = defaultValue`) daripada cek null/undefined.
- Gunakan pola **RO-RO** (Receive Object, Return Object) untuk parameter/fungsi kompleks.
- Tangani error dengan `try/catch`.

## 📊 Data Handling
- Bungkus data kompleks dalam objek alih-alih tipe primitif mentah.
- Validasi data dilakukan di lapisan batas, bukan di fungsi logika inti.
- Gunakan `Object.freeze()` untuk menjaga data tetap immutable jika perlu.
- Pilih struktur data yang sesuai (array, map, object, dll) demi performa dan kejelasan.

## 🎨 UI/UX Standards
- Gunakan arsitektur berbasis komponen.
- Desain responsif menggunakan Flexbox/Grid.
- Gunakan **CSS variables** untuk konsistensi styling dan theming.
- Aksesibilitas:
  - Gunakan elemen HTML semantik.
  - Tambahkan atribut ARIA jika diperlukan.
  - Pastikan navigasi keyboard berfungsi.
  - Gunakan kontras warna yang memadai.
- Gunakan sistem desain (spacing, tipografi, warna) secara konsisten.
- Implementasikan **loading state** dan penanganan error dengan baik.
- Komponen UI harus dapat digunakan ulang dengan properti yang terdokumentasi.
- Gunakan Storybook (atau serupa) untuk dokumentasi komponen.
- Validasi form dengan feedback visual yang jelas.
- Gunakan animasi/transisi secara efisien dan tidak berlebihan.

## 🖥️ Backend Development
- Gunakan **Node.js (ES6+)** sebagai bahasa backend.
- Gunakan **Express.js** untuk membuat REST API.
- Gunakan `mysql2` atau ORM seperti **Sequelize** untuk koneksi ke MySQL.
- Gunakan `db.js` sebagai file konfigurasi pool/ORM bersama.
- Gunakan query parameterized untuk keamanan (hindari SQL Injection).
- Gunakan `mathjs`, `chart.js`, atau `plotly.js` jika butuh komputasi/data visualization.

## 🎨 Frontend Development
- Komponen terstruktur dengan pemisahan tanggung jawab yang jelas.
- Gunakan state management sesuai dengan kompleksitas aplikasi.
- Styling modern:
  - Gunakan **CSS Modules**, atau `styled-components`, atau Tailwind (jika digunakan).
  - Gunakan CSS custom properties (`--color-primary`, dll).
  - Desain responsif dimulai dari mobile (mobile-first).
- Optimasi asset dan rendering komponen.
- Tangani form dengan validasi dan UX yang baik.
- Buat visual hierarchy yang jelas (typografi, ukuran, jarak).
- Indikator loading dan error harus jelas dan informatif.

## 🔍 Code Review Checklist
- Fungsionalitas berjalan sesuai requirement.
- UI sesuai dengan desain.
- Responsif di berbagai ukuran layar.
- Navigasi keyboard dan pembaca layar berfungsi.
- Edge case dan error state ditangani dengan baik.
- Konsistensi styling dan adherence ke design system.
- Transisi/animasi tidak mengganggu UX.
