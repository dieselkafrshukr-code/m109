/**
 * MAGICAL NEON ROMANCE ENGINE
 */

const NeonEngine = {
    heart: null,
    renderer: null,
    scene: null,
    camera: null,

    init() {
        this.initThree();
        this.initParticles();
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

        // Neon Pink Lighting
        const ambient = new THREE.AmbientLight(0xffffff, 0.4);
        const neonLight = new THREE.PointLight(0xff1b6b, 3, 100);
        neonLight.position.set(5, 5, 5);
        this.scene.add(ambient, neonLight);

        // Heart Geometry
        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.bezierCurveTo(0, -0.4, -0.8, -0.4, -0.8, 0);
        shape.bezierCurveTo(-0.8, 0.4, 0, 0.8, 0.5, 1.2);
        shape.bezierCurveTo(1.1, 0.8, 1.8, 0.4, 1.8, 0);
        shape.bezierCurveTo(1.8, -0.4, 1, -0.4, 1, 0);

        const geometry = new THREE.ExtrudeGeometry(shape, { depth: 0.3, bevelEnabled: true });
        geometry.center();

        const material = new THREE.MeshPhysicalMaterial({
            color: 0xff1b6b,
            metalness: 0.8,
            roughness: 0.2,
            clearcoat: 1,
            emissive: 0xff00ff,
            emissiveIntensity: 0.5
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
                    "number": { "value": 100 },
                    "color": { "value": ["#ff1b6b", "#ff00ff", "#45caff"] },
                    "shape": { "type": ["circle", "heart"] },
                    "opacity": { "value": 0.4, "random": true },
                    "size": { "value": 3, "random": true },
                    "move": { "enable": true, "speed": 1.5, "direction": "top", "random": true }
                }
            });
        }
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
            this.heart.rotation.y += 0.015;
            this.heart.position.y = Math.sin(Date.now() * 0.002) * 0.2;
        }
        this.renderer.render(this.scene, this.camera);
    }
};

document.addEventListener('DOMContentLoaded', () => NeonEngine.init());
