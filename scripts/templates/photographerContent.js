/**
 * Crée et insère le profil du photographe dans le DOM à partir des données fournies.
 * @param {Object} photographersIdentity - Contient les informations du photographe telles que nom, ville, pays, etc.
 * @returns {Object} - Un objet avec une méthode pour obtenir et afficher l'en-tête du photographe.
 */
function createPhotographerProfile(photographersIdentity) {
    const { name, city, country, tagline, portrait, price } = photographersIdentity;
    const picture = `assets/photographers/PhotographersIDPhotos/${portrait}`;

    /**
     * Génère et retourne le contenu de l'en-tête du photographe.
     * @returns {HTMLElement} - L'élément HTML de l'en-tête du photographe.
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
 * Crée le contenu médiatique pour chaque photographe et l'insère dans le DOM.
 * @param {Array} medias - Liste des médias à afficher.
 * @param {String} name - Nom du photographe.
 * @param {Number} price - Prix journalier du photographe.
 * @returns {HTMLElement} - L'élément de section contenant les médias.
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
 * Génère et affiche les cartes pour chaque média du photographe.
 * @param {Array} medias - Liste des médias du photographe.
 * @param {String} name - Nom du photographe.
 */
function renderMediaCards(medias, name) {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    generateCard(cardContainer, medias, name.split(' ')[0]);
}

/**
 * Crée les éléments HTML pour les cartes des médias et les insère dans le conteneur.
 * @param {HTMLElement} cardContainer - Conteneur des cartes médias.
 * @param {Array} medias - Liste des médias du photographe.
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
                // event.preventDefault();
                openLightbox(mediaElement, index, media.title);
            }
        });

        const favoriteIcon = cardElement.querySelector('.favorite-icon');
        favoriteIcon.addEventListener('click', (event) => {
            event.stopPropagation(); // Empêche le déclenchement de l'événement de clic sur la carte
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
 * Calcule et met à jour le total des "j'aime" pour tous les médias affichés sur la page.
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

