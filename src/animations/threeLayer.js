// threeLayer.js - Subtle Ambient Background (Performance Optimized)
import * as THREE from 'three';
import { safeExecute } from './guards';

let renderer, scene, camera, particles;
let animationFrameId;

export const initThreeJS = () => {
    safeExecute(() => {
        const canvas = document.createElement('canvas');
        canvas.id = 'ambient-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-1';
        canvas.style.pointerEvents = 'none';
        canvas.style.opacity = '0.6'; // Subtle
        document.body.appendChild(canvas);

        // Scene Setup
        scene = new THREE.Scene();
        // scene.background = new THREE.Color(0xffffff); // Transparent or match bg

        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 30;

        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false }); // Antialias false for perf
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Particles (Make them look like floating spices/dust)
        const geometry = new THREE.BufferGeometry();
        const particlesCount = 200; // Keep count low
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            // Random spread
            posArray[i] = (Math.random() - 0.5) * 60;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        // Material - Warm Orange/Spice Color
        const material = new THREE.PointsMaterial({
            size: 0.15,
            color: 0xea580c, // Tailwind Orange-600
            transparent: true,
            opacity: 0.6,
        });

        particles = new THREE.Points(geometry, material);
        scene.add(particles);

        // Mouse interaction (very subtle)
        let mouseX = 0;
        let mouseY = 0;

        const onDocumentMouseMove = (event) => {
            mouseX = event.clientX - window.innerWidth / 2;
            mouseY = event.clientY - window.innerHeight / 2;
        };
        document.addEventListener('mousemove', onDocumentMouseMove);

        // Resize
        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', onWindowResize);

        // Animation Loop
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            // Gentle rotation
            particles.rotation.y += 0.001;
            particles.rotation.x += 0.0005;

            // Mouse parallax
            particles.rotation.x += mouseY * 0.00001;
            particles.rotation.y += mouseX * 0.00001;

            renderer.render(scene, camera);
        };

        animate();

        // Cleanup function attached to window for route changes if needed
        window.__cleanupThreeJS = () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', onWindowResize);
            document.removeEventListener('mousemove', onDocumentMouseMove);
            if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
            if (geometry) geometry.dispose();
            if (material) material.dispose();
            if (renderer) renderer.dispose();
        };

    }, 'ThreeJS Init');
};
