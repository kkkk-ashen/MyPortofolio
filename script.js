const projectData = {
    "HIBA": {
        title: "HIBA - Survival Roguelike",
        image: "projectroguelike.png", 
        desc: "HIBA is a 3D Roguelike Game inspired by <b>Muck</b>, Where you born with an axe and start fight againts enemies such as zombie, slime and much more so you get exp from it to get leveled up, defeat the boss and eventually beat the game. well thats the plan though, for now i only done making procedural generations(meaning: you would not get the same world as you play.), and spawning a pretty boring grass and trees and attacking mechanics."
    }
};

const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDescription");
const modalImg = document.getElementById("modalImg"); 
const closeBtn = document.querySelector(".close-button");
const cards = document.querySelectorAll(".project-card");

cards.forEach(card => {
    card.addEventListener("click", function() {
        const title = this.querySelector(".project-title").innerText;
        const data = projectData[title];

        if (data) {
            modalTitle.innerText = data.title;
            modalDesc.innerHTML = data.desc;
            modalImg.src = data.image; 
            modal.style.display = "block";
        } else {
            modalTitle.innerText = title;
            modalDesc.innerText = "Detail proyek belum ditambahkan.";
            modalImg.src = ""; 
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

const cube = document.querySelector('.cube');
const scene = document.querySelector('.scene');

let isDragging = false;
let previousX = 0;
let previousY = 0;
let rotateX = -30;
let rotateY = 45;

const startDragging = (e) => {
    is
