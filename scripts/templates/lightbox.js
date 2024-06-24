function handleArrowKeys(event) {
    if (event.key === 'ArrowRight') {
        showNextMedia();
    } else if (event.key === 'ArrowLeft') {
        showPrevMedia();
    }
}

function openLightbox(media, index, title) {
    currentMediaIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');
    const lightboxVideoSource = document.getElementById('lightbox-video-source');
    const lightboxTitle = document.getElementById('lightbox-title');

    lightbox.style.display = 'block';

    if (media.tagName === 'IMG') {
        lightboxImg.style.display = 'block';
        lightboxVideo.style.display = 'none';
        lightboxImg.src = media.src;
        lightboxImg.alt = title;
    } else if (media.tagName === 'VIDEO') {
        lightboxImg.style.display = 'none';
        lightboxVideo.style.display = 'block';
        lightboxVideoSource.src = media.querySelector('source').src;
        lightboxVideo.setAttribute('aria-label', title);
        lightboxVideo.load();
    }

    lightboxTitle.textContent = title;
    setTimeout(() => {
        const firstFocusableElement = lightbox.querySelector('img, video, button, [tabindex]:not([tabindex="-1"])');
        if (firstFocusableElement) {
            firstFocusableElement.focus();
        }
    }, 100);
    trapFocus(lightbox);
    lightbox.addEventListener('keydown', handleArrowKeys);
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    // remettre le focus sur la page photographer
    // document.querySelector('').focus();
    if (currentMediaIndex != null) {
        const initiator = document.querySelector(`.card-elements[data-index="${currentMediaIndex}"]`);
        if (initiator) {
            initiator.focus();
        }
    }
    lightbox.removeEventListener('keydown', handleArrowKeys);
}

function showNextMedia() {
    currentMediaIndex = (currentMediaIndex + 1) % mediaElements.length;
    const nextElement = mediaElements[currentMediaIndex];
    const nextTitle = nextElement.nextElementSibling.querySelector('h2').textContent;
    openLightbox(nextElement, currentMediaIndex, nextTitle);
}

function showPrevMedia() {
    currentMediaIndex = (currentMediaIndex - 1 + mediaElements.length) % mediaElements.length;
    const prevElement = mediaElements[currentMediaIndex];
    const prevTitle = prevElement.nextElementSibling.querySelector('h2').textContent;
    openLightbox(prevElement, currentMediaIndex, prevTitle);
}

document.querySelector('.lightbox .close-lightbox').addEventListener('click', closeLightbox);
document.querySelector('.lightbox-nav.left').addEventListener('click', showPrevMedia);
document.querySelector('.lightbox-nav.right').addEventListener('click', showNextMedia);
document.querySelector('.lightbox-nav.left').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        showPrevMedia();
    }
});
document.querySelector('.lightbox-nav.right').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        showNextMedia();
    }
});
document.querySelector('.close-lightbox').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        closeLightbox();
    }
});

function getFocusableElements(lightboxEl) {
    return lightboxEl.querySelectorAll('div, span, [tabindex]:not([tabindex="-1"])');
}

function trapFocus(lightbox) {
    const focusableElements = getFocusableElements(lightbox);
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    lightbox.addEventListener('keydown', function (event) {
        const isTabPressed = event.key === 'Tab' || event.keyCode === 9;

        if (!isTabPressed) {
            return;
        }

        if (event.shiftKey) { // Si la touche Shift est enfoncée en même temps que Tab (navigation inverse)
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus(); // Ramener le focus à la fin
                event.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus(); // Ramener le focus au début
                event.preventDefault();
            }
        }
    });
}
