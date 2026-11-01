// Replace only this placeholder with the real GA4 measurement ID (G-...).
const GA4_ID = 'GA4_ID';
(() => {
    const key = '87-cookie-consent';
    let consent;
    try { consent = localStorage.getItem(key); } catch (_) { /* Ask again when storage is unavailable. */ }
    let started = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    function startAnalytics() {
        if (started || !/^G-[A-Z0-9]+$/.test(GA4_ID)) return;
        started = true;
        window.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
        window.gtag('js', new Date());
        window.gtag('config', GA4_ID, { allow_google_signals: false });
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA4_ID);
        document.head.append(script);
    }
    window.track87 = (event, parameters = {}) => {
        if (consent === 'accepted' && started) window.gtag('event', event, parameters);
    };
    const banner = document.getElementById('cookieBanner');
    if (banner) banner.hidden = Boolean(consent);
    if (consent === 'accepted') startAnalytics();
    document.querySelectorAll('[data-cookie]').forEach(button => button.addEventListener('click', () => {
        const previous = consent;
        consent = button.dataset.cookie;
        try { localStorage.setItem(key, consent); } catch (_) { /* Consent still applies to this page. */ }
        if (banner) banner.hidden = true;
        if (consent === 'accepted') startAnalytics();
        else if (started || previous === 'accepted') {
            window['ga-disable-' + GA4_ID] = true;
            window.gtag('consent', 'update', { analytics_storage: 'denied' });
            document.cookie.split(';').forEach(item => {
                const name = item.split('=')[0].trim();
                if (/^_ga/.test(name)) {
                    for (const domain of ['', location.hostname, '.' + location.hostname]) {
                        document.cookie = name + '=; Max-Age=0; Path=/' + (domain ? '; Domain=' + domain : '');
                    }
                }
            });
            location.reload();
        }
    }));
    document.getElementById('cookieSettings')?.addEventListener('click', () => { banner.hidden = false; });
    document.addEventListener('click', event => {
        const link = event.target.closest('a[href]');
        if (!link) return;
        const local = link.dataset.local || (link.closest('footer') ? 'rodape' : link.closest('.hero') ? 'hero' : link.classList.contains('whatsapp-float') ? 'flutuante' : link.closest('.chatbot-container') ? 'chat' : 'contato');
        if (link.href.startsWith('https://wa.me/')) window.track87('clique_whatsapp', { local });
        if (link.href.startsWith('tel:')) window.track87('clique_telefone', { local });
        if (link.href.startsWith('https://www.instagram.com/')) window.track87('clique_instagram', { local });
    });
})();
