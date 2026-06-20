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
        
        const musicBox = document.getElementById('musicBoxContainer');
        if (musicBox) {
            musicBox.classList.toggle('active');
        }
        
        playClickSfx();
    });
}

document.querySelectorAll('.nav-item a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            menuToggle.classList.remove('active');
            p5Navbar.classList.remove('active');
            
            const musicBox = document.getElementById('musicBoxContainer');
            if (musicBox) {
                musicBox.classList.remove('active');
            }
        }
        playClickSfx();
    });
});

/* --- DATA PROYEK (SUDAH DIPERBAIKI STRUKTUR LINK-NYA) --- */
const projectData = {
    "HIBA": {
        title: "HIBA - Survival Roguelike",
        image: "assets/projectroguelike.png",
        desc: "HIBA is a 3D Roguelike Game inspired by <b>Muck</b>, Where you born with an axe and start fight againts enemies such as zombie, slime and much more so you get exp from it to get leveled up, defeat the boss and eventually beat the game. well thats the plan though, for now i only done making procedural generations(meaning: you would not get the same world as you play.), and spawning a pretty boring grass and trees and attacking mechanics."
    },

    "What's This Place?": { 
        title: "What's this Place?",
        image: "assets/ssWhatsthisgame.png",
        // Di bawah ini tag <a> sudah diperbaiki pakai href dan target='_blank' agar membuka tab baru
        desc: "What's this Place? is a 3D Platformer game with mutations in it, you must get mutated to be able to get to the next stage. the reach or goal is get to the Turtle. this game is done for a GameJam so its not polished at all! if you want to trying it here's the link: <a href='https://centepydd.itch.io/whats-this-place' target='_blank'>https://centepydd.itch.io/whats-this-place</a>"
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
            menuToggle.classList.remove('active');
        }

        if (p5Navbar) p5Navbar.classList.remove('active');
        
        const musicBox = document.getElementById('musicBoxContainer');
        if (musicBox) musicBox.classList.remove('active');
        
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

/* --- PERBAIKAN LANGKAH 2 ADA DI SINI --- */
window.addEventListener('click', (e) => { 
    // Jika yang diklik adalah link <a> di dalam modal, jangan tutup modalnya!
    if (e.target.tagName === 'A') {
        return; 
    }
    // Jika diklik di area hitam luar modal, baru tutup modal
    if (e.target == modal) {
        closeModal(); 
    }
});

const cube = document.querySelector('.cube');
const scene = document.querySelector('.scene');

let isDragging = false;
let prevX = 0, prevY = 0;
let rotX = -25;
let rotY = 45;
let autoRotateY = 45;
let idleTimer;

function updateRotation() {
    if (cube) {
        cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    }
}

function animate() {
    if (!isDragging) {
        autoRotateY += 0.5;
        rotY = autoRotateY; 
        updateRotation();
    }
    requestAnimationFrame(animate);
}

const startDrag = (e) => {
    isDragging = true;
    clearTimeout(idleTimer);
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

const stopDrag = () => {
    if (!isDragging) return;
    isDragging = false;
    if (scene) scene.style.cursor = 'grab';

    idleTimer = setTimeout(() => {
        cube.style.transition = "transform 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        rotX = -25;
        autoRotateY = rotY; 
        updateRotation();

        setTimeout(() => {
            cube.style.transition = "none";
        }, 1500);
    }, 2000); 
};

if (scene) {
    scene.addEventListener('mousedown', startDrag);
    scene.addEventListener('touchstart', startDrag, { passive: false });
}
window.addEventListener('mousemove', moveDrag);
window.addEventListener('touchmove', moveDrag, { passive: false });
window.addEventListener('mouseup', stopDrag);
window.addEventListener('touchend', stopDrag);

animate();

document.addEventListener("DOMContentLoaded", () => {
    const musicPlayer = document.getElementById("musicPlayer");
    const playPauseButton = document.getElementById("playPauseButton");
    const musicBoxContainer = document.getElementById("musicBoxContainer");
    const discImage = document.querySelector(".disc-image");

    let hasInteracted = false;

    function updateMusicUI() {
        if (!musicPlayer || !playPauseButton) return;

        if (musicPlayer.paused) {
            playPauseButton.textContent = "►"; 
            playPauseButton.style.backgroundColor = "#ff0000";
            playPauseButton.style.color = "#ffffff";
            if (discImage) discImage.style.animationPlayState = "paused";
        } else {
            playPauseButton.textContent = "❚❚"; 
            playPauseButton.style.backgroundColor = "#ffffff";
            playPauseButton.style.color = "#ff0000";
            if (discImage) discImage.style.animationPlayState = "running";
        }
    }

    function toggleMusic(triggerSfx = true) {
        if (!musicPlayer) return;
        
        if (triggerSfx) playClickSfx(); 

        if (musicPlayer.paused) {
            musicPlayer.play()
                .then(() => updateMusicUI())
                .catch(err => console.log("Autoplay diblokir browser, menunggu interaksi user."));
        } else {
            musicPlayer.pause();
            updateMusicUI();
        }
    }

    function triggerAutoplay() {
        if (hasInteracted) return;
        hasInteracted = true;
        
        if (musicPlayer && musicPlayer.paused) {
            toggleMusic(false); 
        }

        window.removeEventListener("click", triggerAutoplay);
        window.removeEventListener("scroll", triggerAutoplay);
        window.removeEventListener("touchstart", triggerAutoplay);
    }

    window.addEventListener("click", triggerAutoplay);
    window.addEventListener("scroll", triggerAutoplay);
    window.addEventListener("touchstart", triggerAutoplay);

    if (playPauseButton) {
        playPauseButton.addEventListener("click", (e) => {
            e.stopPropagation();
            hasInteracted = true;
            toggleMusic(true);
        });
    }

    if (musicBoxContainer) {
        musicBoxContainer.addEventListener("click", () => {
            hasInteracted = true;
            toggleMusic(true);
        });
    }
    
    updateMusicUI();
});

const dots = document.querySelectorAll('.nav-dot');

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
        'projects': 'PROJECTS', 
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
    img.addEventListener('dragstart', (e) => e.preventDefault());
    img.addEventListener('contextmenu', (e) => e.preventDefault());
});

window.addEventListener('wheel', (e) => {
    if (e.ctrlKey) e.preventDefault();
}, { passive: false });

document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && (e.key === '+' || e.key === '=' || e.key === '-' || e.key === '0')) {
        e.preventDefault();
    }
});
