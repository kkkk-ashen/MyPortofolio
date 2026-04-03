// ==========================================
// 1. KODE MODAL PROJECT (JANGAN DIHAPUS)
// ==========================================
const projectData = {
    "HIBA": {
        title: "HIBA - Survival Roguelike",
        image: "projectroguelike.png", // Ganti dengan nama file screenshot/logo kamu
        desc: "HIBA is a 3D Roguelike Game inspired by <b>Muck</b>, Where you born with an axe and start fight againts enemies such as zombie, slime and much more so you get exp from it to get leveled up, defeat the boss and eventually beat the game. well thats the plan though, for now i only done making procedural generations(meaning: you would not get the same world as you play.), and spawning a pretty boring grass and trees and attacking mechanics."
    }
};

const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDescription");
const modalImg = document.getElementById("modalImg"); // Ambil elemen img modal
const closeBtn = document.querySelector(".close-button");
const cards = document.querySelectorAll(".project-card");

cards.forEach(card => {
    card.addEventListener("click", function() {
        const title = this.querySelector(".project-title").innerText;
        const data = projectData[title];

        if (data) {
            modalTitle.innerText = data.title;
            modalDesc.innerHTML = data.desc;
            modalImg.src = data.image; // Ganti gambar modal sesuai data
            modal.style.display = "block";
        } else {
            modalTitle.innerText = title;
            modalDesc.innerText = "Detail proyek belum ditambahkan.";
            modalImg.src = ""; // Kosongkan kalau gak ada gambar
            modal.style.display = "block";
        }
    });
});

if (closeBtn) {
    closeBtn.onclick = () => modal.style.display = "none";
}

window.onclick = (event) => {
    if (event.target == modal) modal.style.display = "none";
};

// ==========================================
// 2. KODE ROTASI KUBUS (INTERAKTIF)
// ==========================================
const cube = document.querySelector('.cube');
const scene = document.querySelector('.scene');

let isDragging = false;
let previousX = 0;
let previousY = 0;
let rotateX = -30;
let rotateY = 45;

const startDragging = (e) => {
    isDragging = true;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    previousX = clientX;
    previousY = clientY;
};

const moveDragging = (e) => {
    if (!isDragging) return;

    // KUNCI: Cek apakah jari/mouse nempel di area scene (kotak)
    // Biar gak ganggu klik tombol lain atau scroll
    if (e.touches && (e.target.closest('.scene') || e.target.closest('.cube'))) {
        e.preventDefault(); 
    }

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const deltaX = clientX - previousX;
    const deltaY = clientY - previousY;

    rotateY += deltaX * 0.5;
    rotateX -= deltaY * 0.5;

    updateRotation();

    previousX = clientX;
    previousY = clientY;
};

const stopDragging = () => {
    isDragging = false;
};

// Pasang Event di window biar drag-nya luas
window.addEventListener('mousedown', startDragging);
window.addEventListener('mousemove', moveDragging);
window.addEventListener('mouseup', stopDragging);

// Pasang di scene/window dengan hati-hati untuk mobile
window.addEventListener('touchstart', startDragging, { passive: false });
window.addEventListener('touchmove', moveDragging, { passive: false });
window.addEventListener('touchend', stopDragging);

function updateRotation() {
    if (cube) {
        cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
}

updateRotation();
