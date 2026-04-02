const projectData = {
    "HIBA": "HIBA is a 3D Roguelike Game inspired by <b>Muck</b>, Where you born with an axe and start fight againts enemies such as zombie, slime and much more so you get exp from it to get leveled up, defeat the boss and eventually beat the game. well thats the plan though, for now i only done making procedural generations(meaning: you would not get the same world as you play.), and spawning a pretty boring grass and trees and attacking mechanics."
};

const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDescription");
const closeBtn = document.querySelector(".close-button");
const cards = document.querySelectorAll(".project-card");

cards.forEach(card => {
    card.addEventListener("click", function() {
        const title = this.querySelector(".project-title").innerText;
        
        modalTitle.innerText = title + " - Roguelike Project";
        modalDesc.innerHTML = projectData[title] || "Detail proyek belum ditambahkan.";
        
        modal.style.display = "block";
    });
});

closeBtn.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

const cube = document.querySelector('.cube');
const scene = document.querySelector('.scene');

let isDragging = false;
let previousMouseX = 0;
let previousMouseY = 0;

let rotateX = -30;
let rotateY = 45;

window.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMouseX = e.clientX;
    previousMouseY = e.clientY;
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - previousMouseX;
    const deltaY = e.clientY - previousMouseY;

    rotateY += deltaX * 0.5;
    rotateX -= deltaY * 0.5;

    updateRotation();

    previousMouseX = e.clientX;
    previousMouseY = e.clientY;
});

window.addEventListener('mouseup', () => {
    isDragging = false;
});

function updateRotation() {
    cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

updateRotation();
