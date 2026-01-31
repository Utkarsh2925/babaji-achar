export const imageResolver = (url: string | undefined): string => {
    if (!url) return '/images/fallback.jpg';

    try {
        // If it's a google drive link, try to adjust it
        if (url.includes('drive.google.com') && url.includes('/view')) {
            const idMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
            if (idMatch && idMatch[1]) {
                return `https://drive.google.com/uc?export=view&id=${idMatch[1]}`;
            }
        }
        return url;
    } catch (e) {
        return '/images/fallback.jpg';
    }
};

export default imageResolver;
