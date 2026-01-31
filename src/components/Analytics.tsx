import { useEffect } from 'react';
import { ANALYTICS_CONFIG } from '../analyticsConfig';

declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
        clarity: any;
    }
}

const Analytics = () => {
    useEffect(() => {
        // 1. Google Analytics 4
        if (ANALYTICS_CONFIG.GA_MEASUREMENT_ID) {
            const script = document.createElement('script');
            script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.GA_MEASUREMENT_ID}`;
            script.async = true;
            document.head.appendChild(script);

            window.dataLayer = window.dataLayer || [];
            function gtag(...args: any[]) {
                window.dataLayer.push(args);
            }
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', ANALYTICS_CONFIG.GA_MEASUREMENT_ID);
        }

        // 2. Google Tag Manager
        if (ANALYTICS_CONFIG.GTM_CONTAINER_ID) {
            (function (w: any, d: any, s: any, l: any, i: any) {
                w[l] = w[l] || [];
                w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
                var f = d.getElementsByTagName(s)[0],
                    j = d.createElement(s),
                    dl = l !== 'dataLayer' ? '&l=' + l : '';
                j.async = true;
                j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                f.parentNode.insertBefore(j, f);
            })(window, document, 'script', 'dataLayer', ANALYTICS_CONFIG.GTM_CONTAINER_ID);
        }

        // 3. Microsoft Clarity
        if (ANALYTICS_CONFIG.CLARITY_PROJECT_ID) {
            (function (c: any, l: any, a: any, r: any, i: any) {
                c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
                const t = l.createElement(r);
                t.async = 1;
                t.src = "https://www.clarity.ms/tag/" + i;
                const y = l.getElementsByTagName(r)[0];
                y.parentNode.insertBefore(t, y);
            })(window, document, "clarity", "script", ANALYTICS_CONFIG.CLARITY_PROJECT_ID);
        }

        // 4. Google Verification Meta Tag
        if (ANALYTICS_CONFIG.GOOGLE_VERIFICATION_CONTENT) {
            const meta = document.createElement('meta');
            meta.name = "google-site-verification";
            meta.content = ANALYTICS_CONFIG.GOOGLE_VERIFICATION_CONTENT;
            document.head.appendChild(meta);
        }

    }, []);

    return null; // This component does not render anything visual
};

export default Analytics;
