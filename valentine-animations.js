/**
 * VELVET ROMANCE ENGINE
 */

const VisualEngine = {
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
        this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Light
        const ambient = new THREE.AmbientLight(0xffffff, 0.5);
        const point = new THREE.PointLight(0xff3366, 2, 100);
        point.position.set(5, 5, 5);
        this.scene.add(ambient, point);

        // Heart
        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.bezierCurveTo(0, -0.3, -0.6, -0.3, -0.6, 0);
        shape.bezierCurveTo(-0.6, 0.3, 0, 0.6, 0.5, 1);
        shape.bezierCurveTo(1, 0.6, 1.6, 0.3, 1.6, 0);
        shape.bezierCurveTo(1.6, -0.3, 1, -0.3, 1, 0);

        const geometry = new THREE.ExtrudeGeometry(shape, { depth: 0.4, bevelEnabled: true });
        geometry.center();

        const material = new THREE.MeshPhysicalMaterial({
            color: 0xff3366,
            metalness: 0.7,
            roughness: 0.2,
            clearcoat: 1
        });

        this.heart = new THREE.Mesh(geometry, material);
        this.heart.rotation.x = Math.PI;
        this.scene.add(this.heart);

        this.camera.position.z = 5;
    },

    initParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                "particles": {
                    "number": { "value": 60 },
                    "color": { "value": "#ff3366" },
                    "shape": { "type": "heart" },
                    "opacity": { "value": 0.3, "random": true },
                    "size": { "value": 3, "random": true },
                    "move": { "enable": true, "speed": 1.5, "direction": "top" }
                }
            });
        }
    },

    initCursor() {
        const follower = document.getElementById('cursor-follower');
        if (!follower) return;

        document.addEventListener('mousemove', (e) => {
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            gsap.to(follower, { opacity: 0 });
        });
    },

    bindEvents() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    },

    animate() {
        requestAnimationFrame(() => this.animate());
        if (this.heart) {
            this.heart.rotation.y += 0.01;
            this.heart.position.y = Math.sin(Date.now() * 0.002) * 0.2;
        }
        this.renderer.render(this.scene, this.camera);
    }
};

document.addEventListener('DOMContentLoaded', () => VisualEngine.init());
