// Optimized JavaScript with deferred execution

document.addEventListener('DOMContentLoaded', () => {
    initHeroInteractions();
    initHoodieGallery();

    requestAnimationFrame(() => {
        setTimeout(() => {
            initDeferredEffects();
            initAudioControls();
        }, 100);
    });
});

function initHeroInteractions() {
    const hero = document.getElementById('hero');
    const glow = document.getElementById('glow');
    if (!hero || !glow) return;

    let mouseMoveTimeout;
    hero.addEventListener('mousemove', (e) => {
        clearTimeout(mouseMoveTimeout);
        mouseMoveTimeout = setTimeout(() => {
            const rect = hero.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            hero.style.setProperty('--mouse-x', `${x}%`);
            hero.style.setProperty('--mouse-y', `${y}%`);

            glow.style.left = `${e.clientX - 150}px`;
            glow.style.top = `${e.clientY - 150}px`;
            glow.style.opacity = '0.8';
        }, 16);
    });

    hero.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
    });
}

function initHoodieGallery() {
    const flipper = document.getElementById('hoodie-flipper');
    const flipBtns = document.querySelectorAll('.flip-btn');
    if (!flipper) return;

    let isFlipped = false;
    flipper.addEventListener('click', toggleFlip);

    flipBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const side = btn.dataset.side;

            flipBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (side === 'back' && !isFlipped) {
                toggleFlip();
            } else if (side === 'front' && isFlipped) {
                toggleFlip();
            }
        });
    });

    function toggleFlip() {
        isFlipped = !isFlipped;
        flipper.classList.toggle('flipped');

        flipBtns.forEach(btn => btn.classList.remove('active'));
        const targetBtn = document.querySelector(`[data-side="${isFlipped ? 'back' : 'front'}"]`);
        if (targetBtn) targetBtn.classList.add('active');
    }

    let startX = 0;
    flipper.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    flipper.addEventListener('touchend', (e) => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            toggleFlip();
        }
    });
}

function initAudioControls() {
    const vibeBtn = document.getElementById('vibeInBtn');
    const track = document.getElementById('quantumTrack');
    const warning = document.getElementById('audioWarning');
    const logo = document.querySelector('.logo');
    if (!vibeBtn || !track) return;

    vibeBtn.addEventListener('click', () => {
        const playAttempt = track.play();
        if (playAttempt !== undefined) {
            playAttempt.then(() => {
                vibeBtn.classList.add('playing');
                if (logo) {
                    logo.style.filter = 'drop-shadow(0 0 50px rgba(0, 255, 127, 0.9)) hue-rotate(120deg)';
                    logo.style.animation = 'beat-pulse 0.5s ease-in-out infinite';
                }
            }).catch(() => {
                if (warning) warning.style.display = 'block';
            });
        }
    });

    function resetLogo() {
        if (logo) {
            logo.style.filter = 'drop-shadow(0 0 30px rgba(255, 105, 180, 0.6))';
            logo.style.animation = 'liquid-logo-alive 4s ease-in-out infinite';
        }
        vibeBtn.classList.remove('playing');
    }

    track.addEventListener('pause', resetLogo);
    track.addEventListener('ended', resetLogo);
}

function initDeferredEffects() {
    initLazyLoading();
    initDeferredAnimations();
}

function initLazyLoading() {
    const lazyImages = document.querySelectorAll('.lazy-load');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy-load');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

function initDeferredAnimations() {
    document.body.classList.add('animations-loaded');
}
