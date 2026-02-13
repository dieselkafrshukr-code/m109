// ==================== Valentine's Day Advanced Animations ====================
// Using: Anime.js, Particles.js, GSAP, and custom Canvas animations

// ==================== Particles.js Configuration ====================
function initParticles() {
    if (typeof particlesJS === 'undefined') {
        console.warn('Particles.js not loaded');
        return;
    }

    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ['#ff6b9d', '#c44569', '#ffa07a', '#ff69b4', '#ff1493']
            },
            shape: {
                type: ['circle', 'heart', 'edge'],
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 8,
                random: true,
                anim: {
                    enable: true,
                    speed: 4,
                    size_min: 0.3,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ff6b9d',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });

    // Valentine particles for content page
    particlesJS('valentine-particles', {
        particles: {
            number: {
                value: 60,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ['#ff6b9d', '#ff69b4', '#ff1493', '#ffd700']
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.3,
                random: true
            },
            size: {
                value: 5,
                random: true
            },
            move: {
                enable: true,
                speed: 1.5,
                direction: 'top',
                random: true,
                out_mode: 'out'
            }
        }
    });
}

// ==================== 3D Hearts Canvas ====================
function init3DHearts() {
    const canvas = document.getElementById('hearts-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const hearts = [];
    const heartCount = 30;

    class Heart {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + 50;
            this.size = Math.random() * 30 + 20;
            this.speed = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.3;
            this.swing = Math.random() * 2 - 1;
            this.swingSpeed = Math.random() * 0.02 + 0.01;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.05;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.scale(this.size / 20, this.size / 20);

            // Draw heart shape
            ctx.fillStyle = `hsl(${330 + Math.random() * 30}, 100%, 60%)`;
            ctx.beginPath();
            ctx.moveTo(0, 5);
            ctx.bezierCurveTo(-10, -5, -15, 0, 0, 15);
            ctx.bezierCurveTo(15, 0, 10, -5, 0, 5);
            ctx.fill();

            ctx.restore();
        }

        update() {
            this.y -= this.speed;
            this.x += Math.sin(this.y * 0.01) * this.swing;
            this.rotation += this.rotationSpeed;

            if (this.y < -50) {
                this.reset();
            }

            this.draw();
        }
    }

    // Create hearts
    for (let i = 0; i < heartCount; i++) {
        hearts.push(new Heart());
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hearts.forEach(heart => heart.update());
        requestAnimationFrame(animate);
    }

    animate();

    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ==================== Confetti Canvas ====================
function initConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confetti = [];
    const colors = ['#ff6b9d', '#c44569', '#ffa07a', '#ff69b4', '#ff1493', '#ffd700'];

    class ConfettiPiece {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -20;
            this.size = Math.random() * 10 + 5;
            this.speed = Math.random() * 3 + 2;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 10 - 5;
            this.opacity = Math.random() * 0.5 + 0.5;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }

        update() {
            this.y += this.speed;
            this.rotation += this.rotationSpeed;

            if (this.y > canvas.height + 20) {
                this.reset();
            }

            this.draw();
        }
    }

    // Create confetti
    for (let i = 0; i < 100; i++) {
        confetti.push(new ConfettiPiece());
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confetti.forEach(piece => piece.update());
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ==================== Anime.js Animations ====================
function initAnimeAnimations() {
    if (typeof anime === 'undefined') {
        console.warn('Anime.js not loaded');
        return;
    }

    // Roses animation
    anime({
        targets: '.rose',
        translateY: [
            { value: -20, duration: 2000 },
            { value: 0, duration: 2000 }
        ],
        rotate: [
            { value: -15, duration: 2000 },
            { value: 15, duration: 2000 }
        ],
        scale: [
            { value: 1.1, duration: 2000 },
            { value: 0.9, duration: 2000 }
        ],
        opacity: [
            { value: 1, duration: 2000 },
            { value: 0.5, duration: 2000 }
        ],
        easing: 'easeInOutSine',
        loop: true,
        delay: anime.stagger(300)
    });

    // Love letters animation
    anime({
        targets: '.letter',
        translateX: function () {
            return anime.random(-100, 100);
        },
        translateY: function () {
            return anime.random(-50, 50);
        },
        rotate: function () {
            return anime.random(-360, 360);
        },
        scale: [0.8, 1.2],
        opacity: [0.3, 1],
        duration: 4000,
        easing: 'easeInOutQuad',
        loop: true,
        delay: anime.stagger(500)
    });

    // Cupid arrows animation
    anime({
        targets: '.arrow',
        translateX: [
            { value: -200, duration: 0 },
            { value: 200, duration: 3000 }
        ],
        translateY: function () {
            return anime.random(-50, 50);
        },
        rotate: 45,
        easing: 'easeInOutQuad',
        loop: true,
        delay: anime.stagger(1000)
    });

    // Login box entrance
    anime({
        targets: '.animated-box',
        scale: [0, 1],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutElastic(1, .8)'
    });

    // 3D Hearts floating
    anime({
        targets: '.heart-3d',
        translateY: [
            { value: -30, duration: 2000 },
            { value: 30, duration: 2000 }
        ],
        translateX: function () {
            return [
                { value: anime.random(-50, 50), duration: 2000 },
                { value: anime.random(-50, 50), duration: 2000 }
            ];
        },
        scale: [
            { value: 1.2, duration: 2000 },
            { value: 0.8, duration: 2000 }
        ],
        rotate: [
            { value: -20, duration: 2000 },
            { value: 20, duration: 2000 }
        ],
        easing: 'easeInOutSine',
        loop: true,
        delay: anime.stagger(200)
    });
}

// ==================== GSAP Animations ====================
function initGSAPAnimations() {
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded');
        return;
    }

    // Heart ring rotation
    gsap.to('.heart-ring', {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none'
    });

    // Sparkles effect
    gsap.to('.sparkles-container', {
        opacity: [0.3, 1],
        scale: [0.8, 1.2],
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
    });
}

// ==================== Sparkles Generator ====================
function createSparkles() {
    const container = document.querySelector('.sparkles-container');
    if (!container) return;

    for (let i = 0; i < 50; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 3 + 's';
        sparkle.textContent = '✨';
        container.appendChild(sparkle);
    }
}

// ==================== Heart Ring ====================
function createHeartRing() {
    const ring = document.querySelector('.heart-ring');
    if (!ring) return;

    const heartCount = 12;
    const radius = 150;

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'ring-heart';
        heart.textContent = '💖';

        const angle = (i / heartCount) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        heart.style.left = `calc(50% + ${x}px)`;
        heart.style.top = `calc(50% + ${y}px)`;
        heart.style.animationDelay = `${i * 0.1}s`;

        ring.appendChild(heart);
    }
}

// ==================== Fireworks on Login Success ====================
function createFireworks() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const fireworks = [];

    class Firework {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.particles = [];

            for (let i = 0; i < 50; i++) {
                this.particles.push({
                    x: x,
                    y: y,
                    vx: (Math.random() - 0.5) * 10,
                    vy: (Math.random() - 0.5) * 10,
                    life: 100,
                    color: `hsl(${Math.random() * 360}, 100%, 60%)`
                });
            }
        }

        update() {
            this.particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.1; // gravity
                p.life--;
            });

            this.particles = this.particles.filter(p => p.life > 0);
        }

        draw() {
            this.particles.forEach(p => {
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.life / 100;
                ctx.fillRect(p.x, p.y, 3, 3);
            });
        }

        isDead() {
            return this.particles.length === 0;
        }
    }

    // Launch fireworks
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            fireworks.push(new Firework(
                Math.random() * canvas.width,
                Math.random() * canvas.height / 2
            ));
        }, i * 300);
    }

    function animateFireworks() {
        if (fireworks.length === 0) return;

        ctx.globalAlpha = 1;
        fireworks.forEach((fw, index) => {
            fw.update();
            fw.draw();

            if (fw.isDead()) {
                fireworks.splice(index, 1);
            }
        });

        requestAnimationFrame(animateFireworks);
    }

    animateFireworks();
}

// ==================== Initialize All Animations ====================
function initAllAnimations() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        // Small delay to ensure all libraries are loaded
        setTimeout(() => {
            initParticles();
            init3DHearts();
            initAnimeAnimations();
            initGSAPAnimations();
            createSparkles();
            createHeartRing();
        }, 100);
    }
}

// ==================== Export Functions ====================
window.valentineAnimations = {
    initAll: initAllAnimations,
    createFireworks: createFireworks,
    initConfetti: initConfetti
};

// Auto-initialize
initAllAnimations();

// ==================== Custom Events ====================
// Listen for successful login to trigger special effects
document.addEventListener('loginSuccess', () => {
    createFireworks();

    // Animate content page elements
    if (typeof anime !== 'undefined') {
        anime({
            targets: '.verse',
            translateX: [-100, 0],
            opacity: [0, 1],
            duration: 1000,
            delay: anime.stagger(100),
            easing: 'easeOutElastic(1, .8)'
        });
    }
});

console.log('%c💖 Valentine\'s Day Animations Loaded! 💖', 'color: #ff6b9d; font-size: 20px; font-weight: bold;');
