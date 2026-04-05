const playClickSfx = () => {
    const clickSfx = document.getElementById("p5ClickSfx");
    if (clickSfx) {
        clickSfx.volume = 0.3; 

        clickSfx.currentTime = 0;
        let playPromise = clickSfx.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Sfx tertunda: Klik layar dulu!");
            });
        }
    }
};

const bubbleTextElement = document.getElementById('bubbleTypingText');
const phrases = [
    "Hi, nice to meet you!",
    "I'm Ada Guna",
    "Welcome to my palace...",
    "Ready to see my projects?"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        bubbleTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        bubbleTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000; 
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    type();
});

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
    isDragging = true;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    previousX = clientX;
    previousY = clientY;
};

const moveDragging = (e) => {
    if (!isDragging) return;

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

window.addEventListener('mousedown', startDragging);
window.addEventListener('mousemove', moveDragging);
window.addEventListener('mouseup', stopDragging);

window.addEventListener('touchstart', startDragging, { passive: false });
window.addEventListener('touchmove', moveDragging, { passive: false });
window.addEventListener('touchend', stopDragging);

function updateRotation() {
    if (cube) {
        cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
}

updateRotation();

cards.forEach(card => {
    card.addEventListener("click", () => {
        playClickSfx();
    });
});

if (closeBtn) {
    closeBtn.addEventListener("click", () => {
        playClickSfx();
    });
}

document.querySelectorAll('.nav-item').forEach(nav => {
    nav.addEventListener('click', () => {
        playClickSfx();
    });
});

document.querySelectorAll('.tool-item').forEach(tool => {
    tool.addEventListener('mouseenter', () => {
        playClickSfx();
    });
});

const menuToggle = document.getElementById('menuToggle');
const p5Navbar = document.getElementById('p5Navbar');
const navLinks = document.querySelectorAll('.nav-item a');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        p5Navbar.classList.toggle('active');
        playClickSfx(); 
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            menuToggle.classList.remove('active');
            p5Navbar.classList.remove('active');
        }
    });
});

const locationName = document.getElementById('currentLocation');
const sections = document.querySelectorAll('div[id], section[id], footer[id]');

const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px', 
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            
            const nameMap = {
                'profile': 'PROFILE',
                'tools': 'EQUIPPED_TOOLS',
                'projects': 'CURRENT_PROJECTS',
                'contact': 'CONTACT_INFO'
            };

            if (nameMap[id]) {
                locationName.innerText = nameMap[id];
                
                locationName.style.opacity = "0";
                setTimeout(() => { locationName.style.opacity = "1"; }, 50);
            }
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

const dots = document.querySelectorAll('.nav-dot');
const sectionList = ['profile', 'tools', 'projects'];

window.addEventListener('scroll', () => {
    let current = "";
    
    const checkpoint = window.innerHeight / 3; 

    sectionList.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
            const rect = section.getBoundingClientRect();
            
            if (rect.top <= checkpoint) {
                current = id;
            }
        }
    });

    dots.forEach((dot) => {
        dot.classList.remove('active');
        if (dot.getAttribute('data-target') === current) {
            dot.classList.add('active');
        }
    });
});

document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    if (typeof playClickSfx === "function") playClickSfx();
});

document.addEventListener('keydown', (e) => {
    if (e.key === "F12") {
        e.preventDefault();
        return false;
    }

    if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) {
        e.preventDefault();
        return false;
    }

    if (e.ctrlKey && e.key === "u") {
        e.preventDefault();
        return false;
    }
});

document.querySelectorAll('.tool-item').forEach(tool => {
    tool.style.cursor = "pointer";

    tool.addEventListener('click', function() {
        const url = this.getAttribute('data-url');
        
        if (url) {
            if (typeof playClickSfx === "function") playClickSfx();

            setTimeout(() => {
                window.open(url, '_blank'); 
            }, 150); 
        }
    });
});
