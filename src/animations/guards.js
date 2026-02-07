export const canRunAnimations = () => {
    if (typeof window === 'undefined') return false;

    // 1. Check for reduced motion preference (Accessibility - Keep this)
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
        return false;
    }

    // ENABLE for all devices as requested
    return true;
};

export const canRunThreeJS = () => {
    if (!canRunAnimations()) return false;

    // ENABLE Three.js for mobile too
    return true;
};

export const safeExecute = (fn, name = 'Animation') => {
    try {
        fn();
    } catch (e) {
        console.warn(`⚠️ ${name} failed safely:`, e);
    }
};
