/**
 * Handles arrow keys to navigate between media in the lightbox.
 * @param {KeyboardEvent} event - The keyboard event captured.
 */
function handleArrowKeys(event) {
    if (event.key === 'ArrowRight') {
        showNextMedia();
    } else if (event.key === 'ArrowLeft') {
        showPrevMedia();
    }
}

/**
 * Opens the lightbox for the selected media, brings in the appropriate content and traps the focus.
 * @param {HTMLElement} media - The selected media item (image or video).
 * @param {number} index - The index of the media in the collection.
 * @param {string} title - The title of the media.
 */
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

/**
 * Closes the lightbox and restores focus to the initiating element.
 */
function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    if (currentMediaIndex != null) {
        const initiator = document.querySelector(`.card-elements[data-index="${currentMediaIndex}"]`);
        if (initiator) {
            initiator.focus();
        }
    }
    lightbox.removeEventListener('keydown', handleArrowKeys);
}

/**
 * Displays the following media in the lightbox.
 */
function showNextMedia() {
    currentMediaIndex = (currentMediaIndex + 1) % mediaElements.length;
    const nextElement = mediaElements[currentMediaIndex];
    const nextTitle = nextElement.nextElementSibling.querySelector('h2').textContent;
    openLightbox(nextElement, currentMediaIndex, nextTitle);
}

/**
 * Shows the previous media in the lightbox.
 */
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

/**
 * Retrieves all elements that can be focusable in the lightbox.
 * @param {HTMLElement} lightboxEl - The lightbox element.
 * @returns {NodeList} - A list of all focusable elements.
 */
function getFocusableElements(lightboxEl) {
    return lightboxEl.querySelectorAll('div, span, [tabindex]:not([tabindex="-1"])');
}

/**
 * Traps the focus inside the lightbox to improve accessibility.
 * @param {HTMLElement} lightbox - The lightbox element.
 */
function trapFocus(lightbox) {
    const focusableElements = getFocusableElements(lightbox);
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    lightbox.addEventListener('keydown', function (event) {
        const isTabPressed = event.key === 'Tab' || event.keyCode === 9;

        if (!isTabPressed) {
            return;
        }

        if (event.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus();
                event.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus();
                event.preventDefault();
            }
        }
    });
}
