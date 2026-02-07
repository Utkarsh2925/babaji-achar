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
        // 3. Broad Section Reveal (Targeting generic and specific containers)
        const sections = document.querySelectorAll('section, article, .reveal-on-scroll, main > div');
        sections.forEach(section => {
            gsap.fromTo(section,
                { opacity: 0, y: 50 }, // Stronger start position
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 90%', // Earlier trigger for better mobile feel
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        // 4. Product Cards & Images (Aggressive targeting for visual impact)
        // Targets: Product cards, shadow containers, card classes, and images in grids
        const cards = document.querySelectorAll('.product-card, .card, div[class*="shadow"], .grid > div, img');
        if (cards.length > 0) {
            ScrollTrigger.batch(cards, {
                onEnter: batch => gsap.to(batch, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    stagger: 0.05, // Faster stagger for snappiness
                    duration: 0.6,
                    ease: 'back.out(1.2)', // Bouncy entrance
                    overwrite: true
                }),
                once: true
            });

            // Set initial state
            gsap.set(cards, { opacity: 0, y: 40, scale: 0.95 });
        }

        // 5. Headings (Slide in)
        const headings = document.querySelectorAll('h1, h2, h3');
        headings.forEach(h => {
            gsap.fromTo(h,
                { opacity: 0, x: -30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.7,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: h,
                        start: 'top 95%'
                    }
                }
            );
        });

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
