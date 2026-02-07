// gsapLayer.js - Lightweight DOM animations directly using GSAP
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { safeExecute } from './guards';

// Register ScrollTrigger safely (Client-side only)
if (typeof window !== 'undefined') {
    safeExecute(() => {
        gsap.registerPlugin(ScrollTrigger);
    }, 'GSAP Registration');
}

export const initGSAP = () => {
    safeExecute(() => {
        // 1. Global Cleanup (in case of re-init)
        ScrollTrigger.getAll().forEach(t => t.kill());

        // 2. Page Fade In
        gsap.fromTo('body',
            { opacity: 0 },
            { opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.1 }
        );

        // 3. Section Reveal on Scroll
        // We'll target generic sections or specific containers if they have IDs
        const sections = document.querySelectorAll('section, .reveal-on-scroll');
        sections.forEach(section => {
            gsap.fromTo(section,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        // 4. Product Cards (Staggered entrance)
        // Assuming products have a class or we can target them. 
        // If not, we'll try to find grid items.
        const cards = document.querySelectorAll('.product-card, .grid > div');
        if (cards.length > 0) {
            // Batching for performance
            ScrollTrigger.batch(cards, {
                onEnter: batch => gsap.to(batch, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.1,
                    duration: 0.4,
                    ease: 'back.out(1.2)',
                    overwrite: true
                }),
                // Simple fade out/reset on leave back often causes issues, so we stick to play/none/none/reverse logic or just animate once.
                // For safety/performance, let's just animate ONCE.
                once: true
            });

            // Set initial state
            gsap.set(cards, { opacity: 0, y: 30 });
        }

    }, 'GSAP Init');
};

// Button Hover Effects (Exported for manual usage if needed, or we attach globally)
export const attachButtonEffects = () => {
    safeExecute(() => {
        const buttons = document.querySelectorAll('button, .btn, a.button');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                gsap.to(btn, { scale: 1.05, duration: 0.2, ease: 'power1.out' });
            });
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, { scale: 1, duration: 0.2, ease: 'power1.out' });
            });
        });
    }, 'Button Effects');
};
