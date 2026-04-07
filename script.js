const modal = document.getElementById("projectModal");
const menuToggle = document.getElementById('menuToggle');
const p5Navbar = document.getElementById('p5Navbar');
const closeBtn = document.querySelector(".close-button");
const cards = document.querySelectorAll(".project-card");
const bubbleTextElement = document.getElementById('bubbleTypingText');
const locationName = document.getElementById('currentLocation');

const playClickSfx = () => {
    const clickSfx = document.getElementById("p5ClickSfx");
    if (clickSfx) {
        clickSfx.volume = 0.3;
        clickSfx.currentTime = 0;
        clickSfx.play().catch(() => console.log("Sfx tertunda: Klik layar dulu!"));
    }
};

const phrases = [
    "Hi, nice to meet you!",
    "I'm Ada Guna",
    "Welcome to my palace...",
    "Ready to see my projects?"
];
let phraseIndex = 0, charIndex = 0, isDeleting = false, typeSpeed = 100;

function type() {
    if (!bubbleTextElement) return;
    const currentPhrase = phrases[phraseIndex];
    
    bubbleTextElement.textContent = isDeleting 
        ? currentPhrase.substring(0, charIndex - 1) 
        : currentPhrase.substring(0, charIndex + 1);

    charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
    typeSpeed = isDeleting ? 50 : 100;

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

if (menuToggle && p5Navbar) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        p5Navbar.classList.toggle('active');
        playClickSfx();
    });
}

document.querySelectorAll('.nav-item a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            menuToggle.classList.remove('active');
            p5Navbar.classList.remove('active');
        }
        playClickSfx();
    });
});

const projectData = {
    "HIBA": {
        title: "HIBA - Survival Roguelike",
        image: "projectroguelike.png",
        desc: "HIBA is a 3D Roguelike Game inspired by <b>Muck</b>, Where you born with an axe and start fight againts enemies such as zombie, slime and much more so you get exp from it to get leveled up, defeat the boss and eventually beat the game."
    }
};

cards.forEach(card => {
    card.addEventListener("click", function() {
        const title = this.querySelector(".project-title").innerText;
        const data = projectData[title];

        if (data) {
            document.getElementById("modalTitle").innerText = data.title;
            document.getElementById("modalDescription").innerHTML = data.desc;
            document.getElementById("modalImg").src = data.image;
        }
        
        modal.style.display = "block";
        if (menuToggle) {
            menuToggle.style.opacity = "0";
            menuToggle.style.pointerEvents = "none";
        }
        playClickSfx();
    });
});

const closeModal = () => {
    if (!modal) return;
    modal.style.display = "none";
    if (menuToggle) {
        menuToggle.style.opacity = "1";
        menuToggle.style.pointerEvents = "auto";
    }
    playClickSfx();
};

if (closeBtn) closeBtn.onclick = closeModal;
window.addEventListener('click', (e) => { if (e.target == modal) closeModal(); });

const cube = document.querySelector('.cube');
const scene = document.querySelector('.scene');

let isDragging = false, prevX = 0, prevY = 0;

let rotX = -25;
let rotY = 45;

function updateRotation() {
    if (cube) {
        cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    }
}

updateRotation();

const startDrag = (e) => {
    isDragging = true;
    prevX = e.touches ? e.touches[0].clientX : e.clientX;
    prevY = e.touches ? e.touches[0].clientY : e.clientY;
    if (scene) scene.style.cursor = 'grabbing';
};

const moveDrag = (e) => {
    if (!isDragging || !cube) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    
    rotY += (x - prevX) * 0.5;
    rotX -= (y - prevY) * 0.5;
    
    updateRotation(); 
    
    prevX = x; prevY = y;
};

window.addEventListener('mousedown', startDrag);
window.addEventListener('touchstart', startDrag, { passive: false });
window.addEventListener('mousemove', moveDrag);
window.addEventListener('touchmove', moveDrag, { passive: false });
window.addEventListener('mouseup', () => isDragging = false);
window.addEventListener('touchend', () => isDragging = false);

const dots = document.querySelectorAll('.nav-dot');
const sections = document.querySelectorAll('div[id], section[id], footer[id]');

window.addEventListener('scroll', () => {
    let current = "";
    const checkpoint = window.innerHeight / 3;
    const navSections = ['profile', 'tools', 'projects'];

    if (window.scrollY < 100) {
        current = "profile";
    } else {
        navSections.forEach(id => {
            const s = document.getElementById(id);
            if (s) {
                const rect = s.getBoundingClientRect();
                if (rect.top <= checkpoint && rect.bottom >= checkpoint) {
                    current = id;
                }
            }
        });
    }

    dots.forEach(dot => {
        const target = dot.getAttribute('data-target');
        if (target === current) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });

    const nameMap = { 
        'profile': 'PROFILE', 
        'tools': 'EQUIPPED_TOOLS', 
        'projects': 'CURRENT_PROJECTS', 
        'contact': 'CONTACT_INFO' 
    };

    if (nameMap[current] && locationName) {
        if (locationName.innerText !== nameMap[current]) {
            locationName.innerText = nameMap[current];
            locationName.style.opacity = "0";
            setTimeout(() => locationName.style.opacity = "1", 50);
        }
    }
});

document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
    if (e.key === "F12" || (e.ctrlKey && e.shiftKey && ["I","J","C"].includes(e.key)) || (e.ctrlKey && e.key === "u")) {
        e.preventDefault();
    }
});

document.querySelectorAll('.tool-item').forEach(tool => {
    tool.addEventListener('click', function() {
        const url = this.getAttribute('data-url');
        if (url) { playClickSfx(); setTimeout(() => window.open(url, '_blank'), 150); }
    });
    tool.addEventListener('mouseenter', playClickSfx);
});

document.addEventListener('DOMContentLoaded', type);

document.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', (e) => {
        e.preventDefault();
        return false;
    });

    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });
});
