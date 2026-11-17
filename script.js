// Enhanced Space Background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Create multiple layers of stars
const layers = [
    { count: 15000, size: 0.5, range: 2000, opacity: 0.4 },
    { count: 10000, size: 0.8, range: 3000, opacity: 0.5 },
    { count: 5000, size: 1.2, range: 4000, opacity: 0.6 }
];

const starGroups = layers.map(layer => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(layer.count * 3);
    const colors = new Float32Array(layer.count * 3);
    const sizes = new Float32Array(layer.count);
    const color = new THREE.Color();

    for (let i = 0; i < layer.count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * layer.range;
        pos[i * 3 + 1] = (Math.random() - 0.5) * layer.range;
        pos[i * 3 + 2] = (Math.random() - 0.5) * layer.range;
        sizes[i] = layer.size + Math.random() * layer.size;

        const r = Math.random();
        if (r > 0.7) color.set(0xffffff);
        else if (r > 0.4) color.set(0x88ccff);
        else color.set(0x00ffff);

        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.PointsMaterial({
        size: layer.size,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: layer.opacity,
        blending: THREE.AdditiveBlending
    });
    const stars = new THREE.Points(geo, mat);
    scene.add(stars);
    return stars;
});

camera.position.z = 10;
let rot = { x: 0, y: 0 }, target = { x: 0, y: 0 };

// Rotation control
window.addEventListener('mousemove', (e) => {
    target.y = (e.clientX - window.innerWidth / 2) * 0.0001;
    target.x = (e.clientY - window.innerHeight / 2) * 0.0001;
});

// Mobile orientation support
window.addEventListener('deviceorientation', (e) => {
    if (e.gamma !== null && e.beta !== null) {
        target.y = e.gamma * 0.001;
        target.x = e.beta * 0.001;
    }
});

function animate() {
    requestAnimationFrame(animate);
    // Animate rotations
    rot.x += (target.x - rot.x) * 0.05;
    rot.y += (target.y - rot.y) * 0.05;

    // Automatic slow rotation
    const time = Date.now() * 0.0001;

    starGroups.forEach((group, index) => {
        group.rotation.x = rot.x * (index + 1) * 0.2 + time * 0.1 * (index + 1);
        group.rotation.y = rot.y * (index + 1) * 0.2 + time * 0.2 * (index + 1);

        // Subtle pulsation
        const scale = 1 + Math.sin(time * 5 + index) * 0.02;
        group.scale.set(scale, scale, scale);
    });

    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Floating words
const container = document.getElementById('words-container');
const words = ["Ева", "Love", "ЛП", "Soulmate", "Bestie", "Forever"];
setInterval(() => {
    const span = document.createElement('span');
    span.className = 'word';
    span.innerText = words[Math.floor(Math.random() * words.length)];
    span.style.left = Math.random() * 80 + 10 + 'vw';
    span.style.animationDuration = (Math.random() * 10 + 10) + 's';
    container.appendChild(span);
    setTimeout(() => span.remove(), 20000);
}, 1000);

// Shooting stars
function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.top = Math.random() * 100 + 'vh';
    star.style.left = Math.random() * 100 + 'vw';
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 2000);
}
setInterval(createShootingStar, 3000);

// Светлячки
function createFirefly() {
    const firefly = document.createElement('div');
    firefly.className = 'firefly';
    firefly.style.top = Math.random() * 100 + 'vh';
    firefly.style.left = Math.random() * 100 + 'vw';
    document.body.appendChild(firefly);
    setTimeout(() => firefly.remove(), 10000);
}
setInterval(createFirefly, 500);

// Surprise interaction
const btn = document.getElementById('surprise-btn');
const photo = document.getElementById('photo');

// Эффект при клике на экран
window.addEventListener('click', (e) => {
    // Не запускаем эффект, если кликнули на кнопку
    if (e.target.id === 'surprise-btn') return;

    const ripple = document.createElement('div');
    ripple.className = 'click-effect';
    ripple.style.width = '50px';
    ripple.style.height = '50px';
    ripple.style.left = (e.clientX - 25) + 'px';
    ripple.style.top = (e.clientY - 25) + 'px';

    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
});

const loveWords = [
    "Люблю тебя, моя ЛПшечка",
    "I love you, my bestie",
    "Te amo, minha melhor amiga",
    "Je t'aime, ma meilleure amie",
    "Ich liebe dich, meine beste Freundin",
    "Ti amo, mia migliore amica",
    "Seni seviyorum, benim kankam",
    "Eu te amo, minha amiga",
    "Kocham Cię, przyjaciółko",
    "Я люблю тебя, моя ЛПшечка"
];

const extraPhotos = [
    "photo_2026-11-11_08-38-43.jpg",
    "photo_2026-11-14_17-34-01.jpg",
    "photo_2026-11-17_13-51-59.jpg",
    "photo_2026-11-17_13-54-38.jpg",
    "photo_2026-11-17_13-54-58.jpg",
    "photo_2026-11-17_13-55-26.jpg"
];

btn.addEventListener('click', () => {
    btn.style.display = 'none';
    photo.style.display = 'block';

    // Добавляем requestAnimationFrame, чтобы браузер успел применить display: block
    // и рассчитать размеры элемента перед вычислениями координат
    requestAnimationFrame(() => {
        // Show extra photos
        const container = document.getElementById('extra-photos-container');
        const photoRect = photo.getBoundingClientRect(); // Получаем позицию главной фото
        const centerX = photoRect.left + photoRect.width / 2;
        const centerY = photoRect.top + photoRect.height / 2;
        const radius = Math.min(250, Math.min(window.innerWidth, window.innerHeight) / 2 - 70); // Адаптивный радиус

        // Добавляем обработчик перемещения для каждой фото
        extraPhotos.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.className = 'extra-photo';

            // Позиционируем по кругу
            const angle = (index / extraPhotos.length) * Math.PI * 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;

            img.style.left = x + 'px';
            img.style.top = y + 'px';
            img.style.position = 'absolute';
            img.style.cursor = 'grab';

            container.appendChild(img);

            // Анимация появления
            setTimeout(() => {
                img.style.opacity = '1';
                img.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 500 + index * 200);

            // Логика перетаскивания (Mouse + Touch)
            function startDrag(e) {
                const clientX = e.clientX || (e.touches && e.touches[0].clientX);
                const clientY = e.clientY || (e.touches && e.touches[0].clientY);

                let shiftX = clientX - img.getBoundingClientRect().left;
                let shiftY = clientY - img.getBoundingClientRect().top;

                function moveAt(pageX, pageY) {
                    img.style.left = pageX - shiftX + 'px';
                    img.style.top = pageY - shiftY + 'px';
                }

                function onMove(e) {
                    const pageX = e.pageX || (e.touches && e.touches[0].pageX);
                    const pageY = e.pageY || (e.touches && e.touches[0].pageY);
                    if (pageX && pageY) moveAt(pageX, pageY);
                }

                document.addEventListener('mousemove', onMove);
                document.addEventListener('touchmove', onMove, { passive: false });

                function onEnd() {
                    document.removeEventListener('mousemove', onMove);
                    document.removeEventListener('touchmove', onMove);
                    document.onmouseup = null;
                    document.ontouchend = null;
                    img.style.cursor = 'grab';
                }

                document.onmouseup = onEnd;
                document.ontouchend = onEnd;

                img.style.cursor = 'grabbing';
                if (e.type !== 'touchstart') e.preventDefault();
            }

            img.addEventListener('mousedown', startDrag);
            img.addEventListener('touchstart', startDrag, { passive: false });

            img.ondragstart = function() {
                return false;
            };
        });
    });
});
