/* Header solid background after scroll */
const header = document.getElementById('site-header');
const onScroll = () => {
    if (window.scrollY > 8) header.classList.add('header--solid');
    else header.classList.remove('header--solid');
};
window.addEventListener('scroll', onScroll);
onScroll();

/* Mobile nav toggle */
const toggle = document.querySelector('.nav__toggle');
const nav = document.querySelector('.nav');
toggle.addEventListener('click', () => nav.classList.toggle('open'));

/* Smooth close nav on link click (mobile) */
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

/* GSAP animations */
if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger);

    // Split hero title lines
    const splitLines = document.querySelectorAll('.hero__title .split');
    gsap.from(splitLines, {
        opacity: 0, y: 30, duration: 0.9, ease: 'power3.out', stagger: 0.12
    });
    gsap.to('.hero__bg', {y: 0, duration: 1.2, ease: 'power2.out'});

    // Generic reveal on scroll
    gsap.utils.toArray('[data-animate]').forEach((el) => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            y: 0,
            duration: .8,
            ease: 'power2.out'
        });
    });

    // Counters
    gsap.utils.toArray('[data-counter]').forEach((el) => {
        const target = +el.getAttribute('data-counter');
        const obj = {val: 0};
        ScrollTrigger.create({
            trigger: el, start: 'top 85%',
            onEnter: () => gsap.to(obj, {
                val: target, duration: 1.2, ease: 'power1.out',
                onUpdate() {
                    el.textContent = Math.floor(obj.val).toLocaleString('sv-SE');
                }
            })
        });
    });
}

/* Anchor smooth scroll for older browsers */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const id = this.getAttribute('href');
        if (id.length > 1) {
            e.preventDefault();
            document.querySelector(id).scrollIntoView({behavior: 'smooth'});
        }
    });
});
