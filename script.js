
// Optimized JavaScript with deferred execution

document.addEventListener('DOMContentLoaded', function() {
    // Initialize critical interactive features first
    initHeroInteractions();
    initHoodieGallery();
    
    // Defer heavy animations and effects
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

            hero.style.setProperty('--mouse-x', x + '%');
            hero.style.setProperty('--mouse-y', y + '%');

            glow.style.left = (e.clientX - 150) + 'px';
            glow.style.top = (e.clientY - 150) + 'px';
            glow.style.opacity = '0.8';
        }, 16); // ~60fps throttling
    });

    hero.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
    });
}

function initHoodieGallery() {
    // TODO: implement hoodie gallery interactions
}

function initDeferredEffects() {
    // TODO: implement deferred visual effects
}

function initAudioControls() {
    // TODO: implement audio playback controls
}
