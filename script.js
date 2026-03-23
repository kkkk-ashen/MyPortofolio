const projectData = {
    "HIBA": "HIBA is a 3D Survival Game inspired by <b>muck</b>, Where you born with nothing and start gathering recources such as wood, metal ingot and many more to make tools from it to defeat bosses and beat the game. well thats the plan though, for now i only done making procedural generations(meaning: you would not get the same world as you play.), and spawning a pretty boring grass and trees so you can cut 'em down."
};

const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDescription");
const closeBtn = document.querySelector(".close-button");
const cards = document.querySelectorAll(".project-card");

cards.forEach(card => {
    card.addEventListener("click", function() {
        const title = this.querySelector(".project-title").innerText;
        
        modalTitle.innerText = title;
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
