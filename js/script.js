/**
 * MS UV PRINTING - Elite Identity Engine v8.0
 * Cinematic Studio Motion & Interaction Logic
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Fluid Header Logic
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });

    // 2. Optimized Intersection Observer (Reveal Engine)
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, idx * 70);
            }
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 3. Counter Animation Hub
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = +el.getAttribute('data-target');
                let start = 0;
                const duration = 2000;
                const increment = target / (duration / 16);
                const update = () => {
                    if (start < target) {
                        start += increment;
                        el.innerText = Math.ceil(start) + "+";
                        requestAnimationFrame(update);
                    } else el.innerText = target + "+";
                };
                update();
                countObserver.unobserve(el);
            }
        });
    }, { threshold: 0.8 });
    document.querySelectorAll('.count').forEach(c => countObserver.observe(c));

    // 4. Interactive Studio Gallery (Filters)
    const filters = document.querySelectorAll('.f-btn');
    const mItems = Array.from(document.querySelectorAll('.m-item-v8'));
    filters.forEach(btn => {
        btn.onclick = () => {
            filters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const f = btn.getAttribute('data-f');
            mItems.forEach(item => {
                if (f === 'all' || item.classList.contains(f)) {
                    item.style.display = 'block';
                    setTimeout(() => item.style.opacity = '1', 10);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => item.style.display = 'none', 400);
                }
            });
        };
    });

    // 5. Enhanced Lightbox V8
    const lb = document.getElementById('lightbox-v8');
    const lbImg = document.getElementById('lb-img-v8');
    let curIdx = 0;

    mItems.forEach((item, idx) => {
        item.onclick = () => {
            curIdx = idx;
            openLB(item.querySelector('img').src);
        };
    });

    const openLB = (src) => {
        lbImg.src = src;
        lb.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };

    document.querySelector('.close-lb-v8').onclick = () => {
        lb.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    document.querySelector('.lb-next').onclick = () => {
        curIdx = (curIdx + 1) % mItems.length;
        lbImg.src = mItems[curIdx].querySelector('img').src;
    };

    document.querySelector('.lb-prev').onclick = () => {
        curIdx = (curIdx - 1 + mItems.length) % mItems.length;
        lbImg.src = mItems[curIdx].querySelector('img').src;
    };

    // 6. Service Modal & Quote Injection
    const modal = document.getElementById('service-modal');
    const modalContent = document.getElementById('modal-content');
    const serviceSelector = document.getElementById('service-select');
    const messageBox = document.getElementById('message-box');

    document.querySelectorAll('.s-card-v8').forEach(card => {
        card.addEventListener('click', (e) => {
            const title = card.getAttribute('data-title');
            const apps = card.getAttribute('data-apps') || "Bespoke commercial branding and creative personal projects.";
            const img = card.getAttribute('data-img') || "https://images.unsplash.com/photo-1562564055-71e051d33c19?auto=format&fit=crop&w=800&q=80";

            modalContent.innerHTML = `
                <div class="modal-grid-v8" style="display:grid; grid-template-columns:1fr 1.2fr; gap:50px; align-items:center;">
                    <img src="${img}" style="width:100%; border-radius:30px; box-shadow:var(--shadow-studio);">
                    <div>
                        <h2 style="font-size:3rem; margin-bottom:20px;">${title}</h2>
                        <p style="font-size:1.1rem; color:#666; margin-bottom:30px;">Elevate your brand with industrial-grade precision. Our ${title} solutions are engineered for high-visibility and extreme durability.</p>
                        <h4 style="margin-bottom:10px; color:var(--c-magenta);">APPLICATIONS:</h4>
                        <p style="font-weight:600; margin-bottom:40px;">${apps}</p>
                        <div style="display:flex; gap:15px;">
                            <button class="btn btn-primary" onclick="window.injectService('${title}')">GET QUOTE</button>
                            <a href="https://wa.me/919839831249?text=Interested in ${title}" class="btn btn-wa" style="background:#25d366; color:#fff; padding:18px 35px; border-radius:50px; font-weight:800; text-decoration:none;">WHATSAPP</a>
                        </div>
                    </div>
                </div>
            `;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    window.injectService = (name) => {
        if (serviceSelector) serviceSelector.value = name;
        if (messageBox) messageBox.value = `I would like to enquire about ${name}.`;
        window.closeModal();
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    };

    window.closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };
    document.querySelector('.close-modal').onclick = window.closeModal;

    // 7. Elite Lead Routing (WhatsApp)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.onsubmit = (e) => {
            e.preventDefault();
            const d = new FormData(contactForm);
            let m = `Hello MS UV PRINTING, I would like to enquire about your printing services.%0A--------------------------`;
            for (const [k, v] of d.entries()) m += `%0A*${k}:* ${v}`;
            window.open(`https://wa.me/919839831249?text=${m}`, '_blank');
            contactForm.innerHTML = `<div class="text-center"><h3 style="color:var(--c-magenta);">THANK YOU!</h3><p>Your vision is being routed to our lead studio.</p></div>`;
        };
    }

    // 8. Mobile Menu Interaction
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    if (menuToggle) {
        menuToggle.onclick = () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active-nav');
        };
    }
});
