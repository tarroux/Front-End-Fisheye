/**
 * Creates and inserts the photographer's profile into the DOM from the data provided.
 * @param {Object} photographersIdentity - Contains the photographer's information such as name, city, country, ...
 * @returns {Object} - An object with a method for getting and displaying the photographer's header.
 */
function createPhotographerProfile(photographersIdentity) {
    const { name, city, country, tagline, portrait, price } = photographersIdentity;
    const picture = `assets/photographers/PhotographersIDPhotos/${portrait}`;

    /**
     * Generates and returns the photographer header content.
     * @returns {HTMLElement} - The Photographer header HTML element.
     */
    function getPhotographerHeader() {
        const headerPhotograph = document.querySelector('.photograph-header');
        headerPhotograph.innerHTML = (
            `<div class="identity">
                <h1 class="nameEl">${name}</h1>
                <p class="localisation">${city}, ${country}</p>
                <p class="tagline-header">${tagline}</p>
            </div>
            <button aria-label="Formulaire de contact" class="contact_button header-button" onclick="displayModal()" >Contactez-moi</button>
            <div class="img-photographer">
                <img src="${picture}" class="img-el" alt="${name}"/>
            </div> 
        `);
        return (headerPhotograph);
    }
    return { getPhotographerHeader }
}

/**
 * Creates media content for each photographer and inserts it into the DOM.
 * @param {Array} medias - List of media to display.
 * @param {String} name - Name of photographer.
 * @param {Number} price - Photographer's daily price.
 * @returns {HTMLElement} - The section element containing the media.
 */
function createMediaContent(medias, name, price) {
    const sectionElementPicture = document.querySelector('.section-element');
    if (!sectionElementPicture) { return }
    const { dropdownHtml, attachDropdownEvents } = createDropdown(medias, renderMediaCards, name);
    sectionElementPicture.innerHTML += (`
        ${dropdownHtml}
        <div id="card-container"></div>
            <div class="infos">
                <div class="likes-and-img">
                    <p class="total-like"></p>
                    <img src="assets/icons/favorite-24px 1.png"/>
                </div>
                <p class="tarif-jour">${price}€/jour</p>
            </div>`
    );
    attachDropdownEvents(medias, renderMediaCards, name);
    renderMediaCards(medias, name);
    updateTotalLikes(medias);

    return (sectionElementPicture);
}

/**
 * Generates and displays cards for each photographer's media.
 * @param {Array} medias - Photographer's media list.
 * @param {String} name - Name of photographer.
 */
function renderMediaCards(medias, name) {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    generateCard(cardContainer, medias, name.split(' ')[0]);
}

/**
 * Creates the HTML elements for the media cards and inserts them into the container.
 * @param {HTMLElement} cardContainer - Media card container.
 * @param {Array} medias - Photographer's media list.
 * @param {String} firstName - Prénom du photographe.
 */
function generateCard(cardContainer, medias, firstName) {

    const cardsHTML = medias.map((media, index) => (
        `<div class="card-elements" tabindex="0" role="button" aria-label="Visionner dans la lightbox" data-index="${index}">${media.image ? (
            `<img class="media-element" src="assets/photographers/${firstName}/${media.image}" alt="${media.title}"/>`
        ) : (
            `<video class="media-element video"><source src="assets/photographers/${firstName}/${media.video}" alt="${media.title}"/></video>`
        )}
                <div>
                    <h2>${media.title}</h2>
                    <div class="like-all-element">
                        <p id="like-count-${index}">${media.likes}</p>
                        <img id="favorite-${index}" class="favorite-icon" src="assets/icons/favorite.png" alt="favorite"/>
                    </div>
                </div>
            </div> 
        `)).join('');

    cardContainer.innerHTML = cardsHTML;


    document.querySelectorAll('.card-elements').forEach((cardElement) => {
        const index = cardElement.getAttribute('data-index');
        const media = medias[index];
        const mediaElement = cardElement.querySelector('.media-element');

        cardElement.addEventListener('click', () => openLightbox(mediaElement, index, media.title));

        cardElement.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                openLightbox(mediaElement, index, media.title);
            }
        });

        const favoriteIcon = cardElement.querySelector('.favorite-icon');
        favoriteIcon.addEventListener('click', (event) => {
            event.stopPropagation();
            medias[index].likes += medias[index].liked ? -1 : 1;
            medias[index].liked = !medias[index].liked;
            cardElement.querySelector(`#like-count-${index}`).textContent = medias[index].likes;
            updateTotalLikes();
        });

        const mediaElements = cardElement.querySelectorAll('.media-element');
        mediaElements.forEach((mediaElement, idx) => {
            mediaElement.addEventListener('click', () => {
                openLightbox(mediaElement, idx, medias[index].title);
            });
        });
    });
    mediaElements = document.querySelectorAll('.media-element');
}

/**
 * Calculates and updates the total likes for all media displayed on the page.
 */
function updateTotalLikes() {
    const allMediaLikes = document.querySelectorAll('.like-all-element > p');
    const totalLikes = Array.from(allMediaLikes).reduce((total, likeElement) => {
        return total + parseInt(likeElement.textContent);
    }, 0);

    const totalLikesElement = document.querySelector('.total-like');
    if (totalLikesElement) {
        totalLikesElement.textContent = totalLikes;
    }
}

