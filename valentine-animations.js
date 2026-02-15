/**
 * ETERNAL BLOOM EXPERIENCE ENGINE
 * Theme: Ruby Heart & Velvet Night
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

        // Ruby Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        this.scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0xff4444, 2, 100);
        pointLight1.position.set(5, 5, 5);
        this.scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x8b0000, 3, 100);
        pointLight2.position.set(-5, -5, 5);
        this.scene.add(pointLight2);

        this.createHeart();
        this.createNebula();

        this.camera.position.z = 6;
    },

    createHeart() {
        const heartShape = new THREE.Shape();
        heartShape.moveTo(0, 0);
        heartShape.bezierCurveTo(0, -0.3, -0.6, -0.3, -0.6, 0);
        heartShape.bezierCurveTo(-0.6, 0.3, 0, 0.6, 0.5, 1);
        heartShape.bezierCurveTo(1, 0.6, 1.6, 0.3, 1.6, 0);
        heartShape.bezierCurveTo(1.6, -0.3, 1, -0.3, 1, 0);

        const extrudeSettings = {
            depth: 0.4,
            bevelEnabled: true,
            bevelSegments: 15,
            steps: 2,
            bevelSize: 0.2,
            bevelThickness: 0.2
        };

        const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
        geometry.center();

        const material = new THREE.MeshPhysicalMaterial({
            color: 0x8b0000, // Deep Ruby
            metalness: 0.8,
            roughness: 0.1,
            reflectivity: 1,
            clearcoat: 1,
            clearcoatRoughness: 0.05,
            emissive: 0x440000,
            emissiveIntensity: 0.5
        });

        this.heart = new THREE.Mesh(geometry, material);
        this.heart.rotation.x = Math.PI;
        this.scene.add(this.heart);
    },

    createNebula() {
        const count = 1500;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 20;
            // More Red/Crimson dust
            if (i % 3 === 0) colors[i] = 0.8 + Math.random() * 0.2; // Red
            else if (i % 3 === 1) colors[i] = 0.1 + Math.random() * 0.2; // Green
            else colors[i] = 0.2 + Math.random() * 0.2; // Blue
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.03,
            vertexColors: true,
            transparent: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending
        });

        this.nebula = new THREE.Points(geometry, material);
        this.scene.add(this.nebula);
    },

    /**
     * Particles.js - Heart Dust
     */
    initParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                "particles": {
                    "number": { "value": 50, "density": { "enable": true, "value_area": 800 } },
                    "color": { "value": "#d43f3f" },
                    "shape": { "type": "heart" },
                    "opacity": { "value": 0.2, "random": true },
                    "size": { "value": 3, "random": true },
                    "line_linked": { "enable": false },
                    "move": { "enable": true, "speed": 1, "direction": "top", "random": true, "out_mode": "out" }
                }
            });
        }
    },

    /**
     * Cursor Logic - Reliable & Smooth
     */
    initCursor() {
        const cursor = document.querySelector('.custom-cursor');
        const outline = document.querySelector('.custom-cursor-outline');
        if (!cursor || !outline) return;

        window.addEventListener('mousemove', (e) => {
            gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.05, ease: "power2.out" });
            gsap.to(outline, { x: e.clientX, y: e.clientY, duration: 0.3, ease: "power2.out" });
        });

        document.querySelectorAll('button, input, a').forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(outline, { scale: 1.8, backgroundColor: "rgba(212, 63, 63, 0.1)", duration: 0.3 });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(outline, { scale: 1, backgroundColor: "transparent", duration: 0.3 });
            });
        });
    },

    /**
     * GSAP Reveals
     */
    initGSAP() {
        gsap.registerPlugin(ScrollTrigger);

        document.querySelectorAll('.verse').forEach(verse => {
            gsap.from(verse, {
                scrollTrigger: {
                    trigger: verse,
                    start: "top 90%",
                },
                duration: 1.5,
                opacity: 0,
                y: 30,
                filter: "blur(10px)",
                ease: "expo.out"
            });
        });
    },

    addEventListeners() {
        window.addEventListener('resize', () => {
            if (!this.camera) return;
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            if (this.heart) {
                gsap.to(this.heart.rotation, {
                    y: x * 0.5,
                    x: Math.PI + (y * 0.3),
                    duration: 2,
                    ease: "power2.out"
                });
            }
        });
    },

    animate() {
        requestAnimationFrame(() => this.animate());
        const time = performance.now() * 0.001;
        if (this.heart) this.heart.position.y = Math.sin(time) * 0.15;
        if (this.nebula) this.nebula.rotation.y = time * 0.03;
        this.renderer.render(this.scene, this.camera);
    }
};

document.addEventListener('DOMContentLoaded', () => PremiumEngine.init());
