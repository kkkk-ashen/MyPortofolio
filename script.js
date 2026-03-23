// 1. Data proyek kamu
const projectData = {
    "HIBA": "HIBA is a 3D Survival Game inspired by <b>muck</b>, Where you born with nothing and start gathering recources such as wood, metal ingot and many more to make tools from it to defeat bosses and beat the game. well thats the plan though, for now i only done making procedural generations(meaning: you would not get the same world as you play.), and spawning a pretty boring grass and trees so you can cut 'em down."
};

// 2. Ambil elemen-elemennya
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDescription");
const closeBtn = document.querySelector(".close-button");
const cards = document.querySelectorAll(".project-card");

// 3. Tambahkan event klik ke setiap kartu
cards.forEach(card => {
    card.addEventListener("click", function() {
        const title = this.querySelector(".project-title").innerText;
        
        // Isi teks ke dalam modal sesuai judul yang diklik
        modalTitle.innerText = title;
        modalDesc.innerHTML = projectData[title] || "Detail proyek belum ditambahkan.";
        
        // Munculkan modal
        modal.style.display = "block";
    });
});

// 4. Tutup modal kalau tombol X diklik
closeBtn.onclick = function() {
    modal.style.display = "none";
}

// 5. Tutup modal kalau user klik di luar kotak putih
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}