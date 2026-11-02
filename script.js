// Tugas 3 - Interaktivitas halaman profil dengan JavaScript
// Pola kerja: PILIH elemen -> DENGARKAN event -> UBAH tampilan

// ===== 1. Memilih elemen (DOM selection) =====
const tombolTema = document.querySelector('#tema');
const daftarTanya = document.querySelectorAll('.faq-tanya');
const tombolAtas = document.querySelector('#ke-atas');
const KUNCI_TEMA = 'tema-profil';

// ===== 2. Fitur Dark/Light Mode =====
function bacaTema() {
    try {
        return localStorage.getItem(KUNCI_TEMA);
    } catch (galat) {
        return null; // penyimpanan tidak tersedia, pakai tema terang
    }
}

function simpanTema(gelap) {
    try {
        localStorage.setItem(KUNCI_TEMA, gelap ? 'gelap' : 'terang');
    } catch (galat) {
        // abaikan: tema tetap berubah walau tidak tersimpan
    }
}

function terapkanTema(gelap) {
    document.body.classList.toggle('gelap', gelap);
    tombolTema.textContent = gelap ? 'Mode Terang' : 'Mode Gelap';
    tombolTema.setAttribute('aria-pressed', String(gelap));
}

function ubahTema() {
    const gelap = !document.body.classList.contains('gelap');
    terapkanTema(gelap);
    simpanTema(gelap);
}

// ===== 3. Fitur FAQ / Accordion =====
function bukaTutupJawaban(tombol) {
    const jawaban = document.getElementById(tombol.getAttribute('aria-controls'));
    jawaban.hidden = !jawaban.hidden;
    tombol.setAttribute('aria-expanded', String(!jawaban.hidden));
}

// ===== 4. Fitur Tombol Kembali ke Atas =====
function cekPosisiGulir() {
    // tombol hanya muncul setelah halaman digulir lebih dari 400px
    tombolAtas.hidden = window.scrollY < 400;
}

function kembaliKeAtas() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== 5. Mendengarkan event (event handling) =====
tombolTema.addEventListener('click', ubahTema);

daftarTanya.forEach(function (tombol) {
    tombol.addEventListener('click', function () {
        bukaTutupJawaban(tombol);
    });
});

window.addEventListener('scroll', cekPosisiGulir);
tombolAtas.addEventListener('click', kembaliKeAtas);

// ===== 6. Kondisi awal saat halaman dibuka =====
terapkanTema(bacaTema() === 'gelap');
cekPosisiGulir();
