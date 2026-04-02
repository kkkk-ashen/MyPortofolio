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

    if (e.touches) e.preventDefault(); 

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
    cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

updateRotation();
