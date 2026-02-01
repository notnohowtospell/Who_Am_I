// ========================================
// SMOOTH SCROLL ANIMATIONS
// ========================================

// Intersection Observer for scroll-triggered animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all gallery items
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        observer.observe(item);
    });

    // Show first item immediately
    if (galleryItems.length > 0) {
        galleryItems[0].classList.add('visible');
    }

    // Hide scroll indicator after first scroll
    let hasScrolled = false;
    window.addEventListener('scroll', () => {
        if (!hasScrolled && window.scrollY > 100) {
            hasScrolled = true;
            const indicator = document.querySelector('.scroll-indicator');
            if (indicator) {
                indicator.style.animation = 'fadeOut 0.5s forwards';
            }
        }
    });

    // Lazy loading images
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
        // If already loaded (cached)
        if (img.complete) {
            img.classList.add('loaded');
        }
    });
});

// ========================================
// SMOOTH KEYBOARD NAVIGATION
// ========================================
document.addEventListener('keydown', (e) => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const currentIndex = Array.from(galleryItems).findIndex(item => {
        const rect = item.getBoundingClientRect();
        return rect.top >= 0 && rect.top < window.innerHeight / 2;
    });

    if (e.key === 'ArrowDown' && currentIndex < galleryItems.length - 1) {
        e.preventDefault();
        galleryItems[currentIndex + 1].scrollIntoView({ behavior: 'smooth' });
    } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        e.preventDefault();
        galleryItems[currentIndex - 1].scrollIntoView({ behavior: 'smooth' });
    }
});

// ========================================
// FADE OUT ANIMATION FOR SCROLL INDICATOR
// ========================================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        to {
            opacity: 0;
            visibility: hidden;
        }
    }
`;
document.head.appendChild(style);
