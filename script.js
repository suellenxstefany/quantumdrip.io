// Optimized JavaScript with deferred execution

/**
 * FIX APPLIED: Added missing function definitions to resolve "Unexpected end of script" error
 * 
 * WHAT WAS FIXED:
 * - script.js was incomplete with only initHeroInteractions() function defined
 * - Missing functions: initHoodieGallery(), initDeferredEffects(), initAudioControls()
 * - These functions were being called but not defined, causing SyntaxError
 * - Added complete implementations for all missing functions
 * - Completed HTML file which was truncated in the middle of JavaScript code
 * 
 * FUNCTIONS ADDED:
 * - initHoodieGallery(): Handles hoodie front/back view flip functionality
 * - initDeferredEffects(): Manages lazy loading and animations
 * - initAudioControls(): Handles the "Summon the Drip" audio button
 * - initLazyLoading(): Loads images dynamically
 * - initDeferredAnimations(): Handles fade-in animations
 */

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
    // Wait for dynamic content to be loaded
    setTimeout(() => {
        const flipper = document.getElementById('hoodie-flipper');
        const flipBtns = document.querySelectorAll('.flip-btn');
        
        if (!flipper || !flipBtns.length) return;
        
        let isFlipped = false;

        flipBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const side = btn.dataset.side;
                
                // Update active button
                flipBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Flip the hoodie
                if (side === 'back' && !isFlipped) {
                    flipper.classList.add('flipped');
                    isFlipped = true;
                } else if (side === 'front' && isFlipped) {
                    flipper.classList.remove('flipped');
                    isFlipped = false;
                }
            });
        });
    }, 200);
}

function initDeferredEffects() {
    // Initialize lazy loading for images
    initLazyLoading();
    
    // Initialize animations
    initDeferredAnimations();
    
    // Add animations-loaded class to body
    document.body.classList.add('animations-loaded');
}

function initAudioControls() {
    const vibeBtn = document.getElementById('vibeInBtn');
    const quantumTrack = document.getElementById('quantumTrack');
    const audioWarning = document.getElementById('audioWarning');
    
    if (!vibeBtn || !quantumTrack) return;

    let isPlaying = false;

    vibeBtn.addEventListener('click', () => {
        if (!isPlaying) {
            quantumTrack.play().then(() => {
                vibeBtn.classList.add('playing');
                vibeBtn.querySelector('.vibe-text').textContent = 'Quantum Vibes Active';
                isPlaying = true;
                audioWarning.style.display = 'none';
            }).catch(error => {
                console.log('Audio playback failed:', error);
                audioWarning.style.display = 'block';
            });
        } else {
            quantumTrack.pause();
            vibeBtn.classList.remove('playing');
            vibeBtn.querySelector('.vibe-text').textContent = 'Summon the Drip';
            isPlaying = false;
        }
    });
}

function initLazyLoading() {
    const lazyImages = document.querySelectorAll('.lazy-load');
    
    lazyImages.forEach(img => {
        if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        }
    });
}

function initDeferredAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    fadeElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}
