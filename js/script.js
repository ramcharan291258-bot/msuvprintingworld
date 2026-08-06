/**
 * MS UV PRINTING WORLD - Elite Agency Masterpiece Engine
 * High-Performance Digital Identity System
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Luxury Loader
    const loader = document.getElementById('loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
                setTimeout(() => loader.style.display = 'none', 800);
            }, 1200);
        });
    }

    // 2. Typing Engine
    const typingElement = document.querySelector('.typing-target');
    const phrases = ["UV Printing", "Acrylic Art", "Customized Gifts", "Glass & Wood Prints"];
    let phraseIdx = 0, charIdx = 0, isDeleting = false;

    const runTyping = () => {
        const current = phrases[phraseIdx];
        typingElement.textContent = isDeleting ? current.substring(0, charIdx - 1) : current.substring(0, charIdx + 1);
        charIdx = isDeleting ? charIdx - 1 : charIdx + 1;

        let delta = isDeleting ? 70 : 150;
        if (!isDeleting && charIdx === current.length) { isDeleting = true; delta = 2500; }
        else if (isDeleting && charIdx === 0) { isDeleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; delta = 600; }
        setTimeout(runTyping, delta);
    };
    if (typingElement) runTyping();

    // 3. Smart Search
    const openSearch = document.getElementById('open-search');
    const closeSearch = document.querySelector('.close-search');
    const searchOverlay = document.getElementById('search-overlay');
    const searchInput = document.getElementById('live-search');
    const searchResults = document.getElementById('search-results');

    const searchData = [
        { t: "UV Printing", c: "Core Service", l: "#services" },
        { t: "Flex Printing", c: "Core Service", l: "#services" },
        { t: "Sign Boards", c: "Core Service", l: "#services" },
        { t: "Portfolio", c: "Showcase", l: "#portfolio" },
        { t: "Contact", c: "Support", l: "#contact" }
    ];

    if (openSearch) {
        openSearch.onclick = () => {
            searchOverlay.style.display = 'flex';
            setTimeout(() => searchOverlay.classList.add('active'), 10);
            searchInput.focus();
        };
    }
    if (closeSearch) {
        closeSearch.onclick = () => {
            searchOverlay.classList.remove('active');
            setTimeout(() => searchOverlay.style.display = 'none', 400);
        };
    }

    searchInput?.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase();
        searchResults.innerHTML = '';
        if (q.length < 2) return;
        searchData.filter(i => i.t.toLowerCase().includes(q)).forEach(res => {
            const div = document.createElement('div');
            div.className = 'search-item';
            div.innerHTML = `<h4>${res.t}</h4><small>${res.c}</small>`;
            div.onclick = () => { window.location.href = res.l; closeSearch.click(); };
            searchResults.appendChild(div);
        });
    });

    // 4. Reveal & Counter Engine
    const reveals = document.querySelectorAll('.reveal');
    const counts = document.querySelectorAll('.count');

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('count')) {
                    const el = entry.target;
                    const target = +el.getAttribute('data-target');
                    let start = 0;
                    const update = () => {
                        if (start < target) {
                            start += target / 100;
                            el.innerText = Math.ceil(start);
                            requestAnimationFrame(update);
                        } else el.innerText = target + "+";
                    };
                    update();
                    io.unobserve(el);
                } else {
                    entry.target.classList.add('active');
                }
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach(r => io.observe(r));
    counts.forEach(c => io.observe(c));

    // 5. WhatsApp Routing
    const handleWA = (formId, adminNum) => {
        const form = document.getElementById(formId);
        if (!form) return;
        form.onsubmit = (e) => {
            e.preventDefault();
            const data = new FormData(form);
            let msg = `*New Masterpiece Request*%0A--------------------------`;
            for (const [key, value] of data.entries()) msg += `%0A*${key}:* ${value}`;
            window.open(`https://wa.me/${adminNum}?text=${msg}`, '_blank');
        };
    };
    handleWA('quoteForm', '919573786648');
    handleWA('orderForm', '919573786648');

    // 6. UI Interactions
    const header = document.getElementById('header');
    const progress = document.getElementById('scroll-progress');
    const btt = document.getElementById('back-to-top');

    window.onscroll = () => {
        const s = window.scrollY;
        const h = document.documentElement.scrollHeight - window.innerHeight;
        if (progress) progress.style.width = (s / h * 100) + "%";
        if (s > 80) header.classList.add('scrolled'); else header.classList.remove('scrolled');
        if (s > 800) btt.classList.add('show'); else btt.classList.remove('show');
    };

    if (btt) btt.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    // FAQ Accordion
    document.querySelectorAll('.faq-header').forEach(h => {
        h.onclick = () => {
            const item = h.parentElement;
            const active = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!active) item.classList.add('active');
        };
    });
});
