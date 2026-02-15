/**
 * PREMUM ROMANTIC EXPERIENCE ENGINE
 * Built with: Three.js, GSAP, ScrollTrigger, Particles.js
 */

const PremiumEngine = {
    // 3D Scene Components
    scene: null,
    camera: null,
    renderer: null,
    heart: null,
    nebula: null,

    init() {
        this.initThree();
        this.initGSAP();
        this.initParticles();
        this.initCursor();
        this.addEventListeners();
        this.animate();
    },

    /**
     * THREE.JS - High-end Visuals
     */
    initThree() {
        const canvas = document.getElementById('canvas3d');
        if (!canvas) return;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Refined Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0xd4af37, 2, 100);
        pointLight1.position.set(5, 5, 5);
        this.scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xffffff, 1, 100);
        pointLight2.position.set(-5, -5, 5);
        this.scene.add(pointLight2);

        this.createHeart();
        this.createNebula();

        this.camera.position.z = 6;
    },

    createHeart() {
        // Optimized Heart Shape Path
        const heartShape = new THREE.Shape();
        heartShape.moveTo(0, 0);
        heartShape.bezierCurveTo(0, -0.3, -0.6, -0.3, -0.6, 0);
        heartShape.bezierCurveTo(-0.6, 0.3, 0, 0.6, 0.5, 1);
        heartShape.bezierCurveTo(1, 0.6, 1.6, 0.3, 1.6, 0);
        heartShape.bezierCurveTo(1.6, -0.3, 1, -0.3, 1, 0);

        const extrudeSettings = {
            depth: 0.4,
            bevelEnabled: true,
            bevelSegments: 12,
            steps: 2,
            bevelSize: 0.2,
            bevelThickness: 0.2
        };

        const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
        geometry.center();

        const material = new THREE.MeshPhysicalMaterial({
            color: 0xc29d59,
            metalness: 0.9,
            roughness: 0.1,
            reflectivity: 1,
            clearcoat: 1,
            clearcoatRoughness: 0.1,
            emissive: 0x221100,
            emissiveIntensity: 0.2
        });

        this.heart = new THREE.Mesh(geometry, material);
        this.heart.rotation.x = Math.PI; // Correct orientation
        this.scene.add(this.heart);
    },

    createNebula() {
        const count = 1000;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 15;
            colors[i] = Math.random();
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.04,
            vertexColors: true,
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending
        });

        this.nebula = new THREE.Points(geometry, material);
        this.scene.add(this.nebula);
    },

    /**
     * Particles.js - Professional Background Dust
     */
    initParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                "particles": {
                    "number": { "value": 40, "density": { "enable": true, "value_area": 800 } },
                    "color": { "value": "#c29d59" },
                    "shape": { "type": "circle" },
                    "opacity": { "value": 0.2, "random": true },
                    "size": { "value": 2, "random": true },
                    "line_linked": { "enable": false },
                    "move": { "enable": true, "speed": 0.6, "direction": "none", "random": true, "out_mode": "out" }
                },
                "interactivity": {
                    "events": { "onhover": { "enable": true, "mode": "bubble" } },
                    "modes": { "bubble": { "distance": 200, "size": 4, "duration": 2, "opacity": 0.5 } }
                }
            });
        }
    },

    /**
     * Custom Cursor Logic
     */
    initCursor() {
        const cursor = document.querySelector('.custom-cursor');
        const outline = document.querySelector('.custom-cursor-outline');

        if (cursor && outline) {
            document.body.classList.add('custom-cursor-active');
        }

        window.addEventListener('mousemove', (e) => {
            gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0 });
            gsap.to(outline, { x: e.clientX, y: e.clientY, duration: 0.15 });
        });

        document.querySelectorAll('button, input').forEach(el => {
            el.addEventListener('mouseenter', () => outline.style.transform = 'translate(-50%, -50%) scale(1.5)');
            el.addEventListener('mouseleave', () => outline.style.transform = 'translate(-50%, -50%) scale(1)');
        });
    },

    /**
     * GSAP & ScrollTrigger - High-end reveals
     */
    initGSAP() {
        gsap.registerPlugin(ScrollTrigger);

        // Verse Animations
        document.querySelectorAll('.verse').forEach(verse => {
            const type = verse.getAttribute('data-animate');

            gsap.from(verse, {
                scrollTrigger: {
                    trigger: verse,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                duration: 1.2,
                opacity: 0,
                y: type === 'fade-up' ? 50 : 0,
                filter: type === 'blur' ? "blur(10px)" : "none",
                scale: type === 'scale-up' ? 0.9 : 1,
                ease: "power3.out"
            });
        });

        // Parallax for titles
        gsap.to('.main-title', {
            scrollTrigger: {
                trigger: '.premium-header',
                start: "top bottom",
                end: "bottom top",
                scrub: true
            },
            y: -100
        });
    },

    addEventListeners() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Magnetic Heart Effect
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;

            if (this.heart) {
                gsap.to(this.heart.rotation, {
                    y: x * 0.4,
                    x: Math.PI + (y * 0.2),
                    duration: 1.5,
                    ease: "power2.out"
                });
            }
        });
    },

    animate() {
        requestAnimationFrame(() => this.animate());
        const time = performance.now() * 0.001;

        if (this.heart) {
            this.heart.position.y = Math.sin(time) * 0.2;
        }

        if (this.nebula) {
            this.nebula.rotation.y = time * 0.05;
        }

        this.renderer.render(this.scene, this.camera);
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => PremiumEngine.init());
