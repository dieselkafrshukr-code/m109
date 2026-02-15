/**
 * ROYAL CRIMSON EXPERIENCE ENGINE
 */

const RoyalEngine = {
    heart: null,
    renderer: null,
    scene: null,
    camera: null,

    init() {
        this.initThree();
        this.initParticles();
        this.initCursor();
        this.animate();
        this.bindEvents();
    },

    initThree() {
        const canvas = document.getElementById('canvas3d');
        if (!canvas) return;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        // Balanced antialiasing for performance/visuals
        this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Royal Lighting System
        const ambient = new THREE.AmbientLight(0xffffff, 0.3);
        const redLight = new THREE.PointLight(0xe63946, 3, 100);
        redLight.position.set(5, 5, 5);
        const goldLight = new THREE.PointLight(0xd4a373, 2, 100);
        goldLight.position.set(-5, -5, 5);
        this.scene.add(ambient, redLight, goldLight);

        // Hero Heart (High-Poly 느낌 Extrude)
        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.bezierCurveTo(0, -0.4, -0.8, -0.4, -0.8, 0);
        shape.bezierCurveTo(-0.8, 0.4, 0, 0.8, 0.5, 1.2);
        shape.bezierCurveTo(1.1, 0.8, 1.8, 0.4, 1.8, 0);
        shape.bezierCurveTo(1.8, -0.4, 1, -0.4, 1, 0);

        const extrudeSettings = { depth: 0.5, bevelEnabled: true, bevelSegments: 20, steps: 2, bevelSize: 0.2, bevelThickness: 0.2 };
        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        geometry.center();

        const material = new THREE.MeshPhysicalMaterial({
            color: 0xe63946,
            metalness: 0.9,
            roughness: 0.1,
            reflectivity: 1,
            clearcoat: 1,
            emissive: 0x440000,
            emissiveIntensity: 0.2
        });

        this.heart = new THREE.Mesh(geometry, material);
        this.heart.rotation.x = Math.PI; // Flip correct orientation
        this.scene.add(this.heart);

        this.camera.position.z = 5;
    },

    initParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                "particles": {
                    "number": { "value": 80 },
                    "color": { "value": ["#e63946", "#ffadad", "#d4a373"] },
                    "shape": { "type": "heart" },
                    "opacity": { "value": 0.2, "random": true },
                    "size": { "value": 3, "random": true },
                    "move": { "enable": true, "speed": 1.2, "direction": "top", "random": true }
                }
            });
        }
    },

    initCursor() {
        const cursor = document.getElementById('cursor');
        if (!cursor) return;

        window.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.2,
                ease: "power2.out"
            });
        });

        // Effect for interactive items
        document.querySelectorAll('button, input').forEach(el => {
            el.addEventListener('mouseenter', () => gsap.to(cursor, { scale: 3, opacity: 0.5, duration: 0.3 }));
            el.addEventListener('mouseleave', () => gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 }));
        });
    },

    bindEvents() {
        window.addEventListener('resize', () => {
            if (!this.camera) return;
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    },

    animate() {
        requestAnimationFrame(() => this.animate());
        if (this.heart) {
            this.heart.rotation.y += 0.008;
            this.heart.position.y = Math.sin(Date.now() * 0.0015) * 0.15;
            this.heart.rotation.z = Math.sin(Date.now() * 0.001) * 0.1;
        }
        this.renderer.render(this.scene, this.camera);
    }
};

document.addEventListener('DOMContentLoaded', () => RoyalEngine.init());
