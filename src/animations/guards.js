// guards.js - Strict performance and device checks

export const canRunAnimations = () => {
    if (typeof window === 'undefined') return false;

    // 1. Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
        console.log('🛑 Animation Layer: Reduced motion preferred. Animations disabled.');
        return false;
    }

    // 2. Check for very low-end devices via hardware concurrency (heuristic)
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
        console.log('⚠️ Animation Layer: Low-end device detected. Animations disabled.');
        return false;
    }

    // 3. Check for specific low-power mode (if available in future browsers)
    // Currently relying on reduced motion and general performant code.

    return true;
};

export const canRunThreeJS = () => {
    if (!canRunAnimations()) return false;

    // 1. Disable Three.js on Mobile for maximum stability/battery
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        console.log('📱 Animation Layer: Mobile detected. Three.js disabled for battery saving.');
        return false;
    }

    return true;
};

export const safeExecute = (fn, name = 'Animation') => {
    try {
        fn();
    } catch (e) {
        console.warn(`⚠️ ${name} failed safely:`, e);
        // Fail silently, do not re-throw
    }
};
