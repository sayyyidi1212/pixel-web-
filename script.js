// Create animated pixel background
function createPixelBackground() {
    const pixelBg = document.getElementById('pixelBg');
    const colors = ['#00ffff', '#ff00ff', '#ffff00', '#00ff00', '#ff6600'];

    for (let i = 0; i < 100; i++) {
        const pixel = document.createElement('div');
        pixel.className = 'pixel';
        pixel.style.left = Math.random() * 100 + '%';
        pixel.style.top = Math.random() * 100 + '%';
        pixel.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        pixel.style.animationDelay = Math.random() * 6 + 's';
        pixel.style.animationDuration = (Math.random() * 4 + 4) + 's';
        pixelBg.appendChild(pixel);
    }
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Intersection Observer for animations
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 1s ease-out';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card, .gallery-item').forEach(el => {
        observer.observe(el);
    });
}

// Parallax effect for hero section
function setupParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Interactive gallery items
function setupGalleryInteraction() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Add click effect
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
                item.style.transform = 'scale(1.05)';
            }, 150);
            setTimeout(() => {
                item.style.transform = 'scale(1)';
            }, 300);
        });

        // Stagger animation delays
        item.style.animationDelay = `${index * 0.1}s`;
    });
}

// Cursor trail effect
function setupCursorTrail() {
    let mouseMoved = false;
    const trail = [];

    document.addEventListener('mousemove', (e) => {
        if (!mouseMoved) {
            mouseMoved = true;
            setInterval(() => {
                if (trail.length > 0) {
                    const dot = trail.shift();
                    dot.remove();
                }
            }, 100);
        }

        const dot = document.createElement('div');
        dot.style.position = 'fixed';
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
        dot.style.width = '4px';
        dot.style.height = '4px';
        dot.style.background = '#1f6e6eff';
        dot.style.borderRadius = '50%';
        dot.style.pointerEvents = 'none';
        dot.style.zIndex = '9999';
        dot.style.animation = 'fadeOut 1s ease-out forwards';

        document.body.appendChild(dot);
        trail.push(dot);
    });
}

// Add fadeOut animation for cursor trail
const style = document.createElement('style');
style.textContent = `
            @keyframes fadeOut {
                to {
                    opacity: 0;
                    transform: scale(0);
                }
            }
        `;
document.head.appendChild(style);

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    createPixelBackground();
    setupSmoothScrolling();
    setupScrollAnimations();
    setupParallax();
    setupGalleryInteraction();
    setupCursorTrail();
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease-in';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

//nav
function toggleMenu() {
    document.querySelector(".nav-links").classList.toggle("active");
}

//galerry
const uploadForm = document.getElementById("uploadForm");
const uploaderName = document.getElementById("uploaderName");
const uploadImage = document.getElementById("uploadImage");
const galleryGrid = document.getElementById("galleryGrid");

// handle submit
uploadForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = uploaderName.value;
    const file = uploadImage.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        // buat elemen gallery
        const item = document.createElement("div");
        item.classList.add("gallery-item");

        item.innerHTML = `
            <img src="${e.target.result}" alt="Karya">
            <p class="uploader-name">${name}</p>
            <div class="btn-group">
                <button class="like-btn">👍 Like <span class="like-count">0</span></button>
                <a href="${e.target.result}" download="karya-${Date.now()}.png" class="download-btn">⬇️ Unduh</a>
            </div>
        `;

        // tambah ke gallery
        galleryGrid.appendChild(item);
        // reset form
        uploadForm.reset();
        // event like button
        const likeBtn = item.querySelector(".like-btn");
        const likeCount = item.querySelector(".like-count");
        likeBtn.addEventListener("click", () => {
            let count = parseInt(likeCount.textContent);
            likeCount.textContent = count + 1;
        });
    };
    reader.readAsDataURL(file);
});
document.addEventListener("DOMContentLoaded", () => {
    const uploadBtn = document.getElementById("uploadBtn");
    const uploaderNameEl = document.getElementById("uploaderName");
    const uploadImageEl = document.getElementById("uploadImage");
    const galleryGridEl = document.getElementById("galleryGrid");
    const leaderboardListEl = document.getElementById("leaderboardList");

    const leaderboardData = {};

    uploadBtn.addEventListener("click", () => {
        const name = uploaderNameEl.value.trim();
        const file = uploadImageEl.files[0];

        if (!name || !file) return alert("Nama dan gambar wajib diisi!");

        const reader = new FileReader();
        reader.onload = function (e) {
            // buat elemen gallery
            const item = document.createElement("div");
            item.classList.add("gallery-item");

            item.innerHTML = `
                <img src="${e.target.result}" alt="Karya">
                <p class="uploader-name">${name}</p>
                <div class="btn-group">
                    <button class="like-btn">👍 Like <span class="like-count">0</span></button>
                    <a href="${e.target.result}" download="karya-${Date.now()}.png" class="download-btn">⬇️ Unduh</a>
                </div>
            `;

            galleryGridEl.appendChild(item);

            // reset form
            uploaderNameEl.value = "";
            uploadImageEl.value = "";

            // add like event
            const likeBtn = item.querySelector(".like-btn");
            const likeCount = item.querySelector(".like-count");

            if (!leaderboardData[name]) leaderboardData[name] = 0;

            likeBtn.addEventListener("click", () => {
                let count = parseInt(likeCount.textContent);
                likeCount.textContent = count + 1;

                leaderboardData[name]++;
                updateLeaderboard();
            });
        };
        reader.readAsDataURL(file);
    });

    function updateLeaderboard() {
        const sorted = Object.entries(leaderboardData).sort((a, b) => b[1] - a[1]);
        leaderboardListEl.innerHTML = "";

        sorted.forEach(([user, points], i) => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>#${i + 1}</strong> ${user} — ${points} poin`;
            leaderboardListEl.appendChild(li);
        });
    }
});
// Buat animasi pixel di footer
document.addEventListener('DOMContentLoaded', ()=>{
    const canvas = document.getElementById('pixelFooterCanvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    const colors = ['#00ffff','#ff00ff','#ffff00','#ff6600','#07bdbd'];
    const pixels = [];

    // buat 50 pixel neon
    for(let i=0;i<50;i++){
        pixels.push({
            x: Math.random()*width,
            y: Math.random()*height,
            size: Math.random()*6 + 2,
            speed: Math.random()*1.5 + 0.5,
            color: colors[Math.floor(Math.random()*colors.length)],
            direction: Math.random()>0.5?1:-1
        });
    }

    function draw() {
        ctx.fillStyle = '#111';
        ctx.fillRect(0,0,width,height);

        pixels.forEach(p=>{
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x,p.y,p.size,p.size);
            p.y += p.speed * p.direction;
            if(p.y > height) p.y = 0;
            if(p.y < 0) p.y = height;
        });

        requestAnimationFrame(draw);
    }

    draw();
});
// Ambil elemen
const goCreateBtn = document.getElementById("goCreateBtn");
const loginModal = document.getElementById("loginModal");
const closeBtn = document.getElementById("closeBtn");
const loginForm = document.getElementById("loginForm");

const pixelForm = document.getElementById("pixelForm");

// User profile
const userProfile = document.getElementById("userProfile");
const profileDropdown = document.getElementById("profileDropdown");
const userNameDisplay = document.getElementById("userName");
const logoutBtn = document.getElementById("logoutBtn");

// Buka modal login
goCreateBtn.addEventListener("click", () => {
    loginModal.style.display = "flex";
});

// Tutup modal
closeBtn.addEventListener("click", () => {
    loginModal.style.display = "none";
});

// Login dummy
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const email = loginForm.querySelector('input[type="email"]').value;
    
    // Sembunyikan modal
    loginModal.style.display = "none";
    
    // Tampilkan pixel form
    pixelForm.style.display = "block";
    
    // Tampilkan user profile di nav
    userProfile.style.display = "flex";
    
    // Set nama user
    userNameDisplay.textContent = email.split("@")[0]; // contoh ambil username dari email
    
    // Scroll ke form
    window.scrollTo({ top: pixelForm.offsetTop, behavior: 'smooth' });
});

// Toggle dropdown
userProfile.addEventListener("click", () => {
    profileDropdown.style.display = profileDropdown.style.display === "flex" ? "none" : "flex";
});

// Logout
logoutBtn.addEventListener("click", () => {
    userProfile.style.display = "none"; // sembunyikan profile
    pixelForm.style.display = "none";   // sembunyikan pixel form
    profileDropdown.style.display = "none"; // sembunyikan dropdown
    alert("Anda telah logout!");
});
