// initAnimations.js - Entry point for all visual enhancements
import { canRunAnimations, canRunThreeJS, safeExecute } from './guards';

// Lazy load to avoid blocking main bundle
const loadAnimations = async () => {
    if (!canRunAnimations()) return;

    // 1. Load and Init GSAP (Primary)
    safeExecute(async () => {
        const { initGSAP, attachButtonEffects } = await import('./gsapLayer');
        initGSAP();
        attachButtonEffects();
    }, 'GSAP Loader');

    // 2. Load and Init Three.js (Secondary - Heavy)
    if (canRunThreeJS()) {
        safeExecute(async () => {
            // Delay Three.js slightly to prioritize LCP
            setTimeout(async () => {
                const { initThreeJS } = await import('./threeLayer');
                initThreeJS();
            }, 1000);
        }, 'ThreeJS Loader');
    }
};

export const initVisualLayer = () => {
    if (typeof window !== 'undefined') {
        // Run on idle or after load
        if (document.readyState === 'complete') {
            loadAnimations();
        } else {
            window.addEventListener('load', loadAnimations);
        }
    }
};
