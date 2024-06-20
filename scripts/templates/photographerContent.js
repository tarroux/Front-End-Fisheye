// Tout ce qui concerne le contenu de la page photographer
function photographerPage(photographersIdentity) {
    const { name, city, country, tagline, portrait, price } = photographersIdentity;

    const picture = `assets/photographers/PhotographersIDPhotos/${portrait}`;

    function getUserPhotographerContent() {

        // Header
        const headerPhotograph = document.querySelector('.photograph-header');
        headerPhotograph.innerHTML = (
            `<div class="identity">
                <h1 class="nameEl">${name}</h1>
                <p class="localisation">${city}, ${country}</p>
                <p class="tagline-header">${tagline}</p>
            </div>
            <button class="contact_button header-button" onclick="displayModal()">Contactez-moi</button>
            <div class="img-photographer">
                <img src="${picture}" class="img-el" alt="${name}"/>
            </div> 
        `);

        const priceElement = document.querySelector('.tarif-jour');
        if (priceElement) {
            priceElement.textContent = `${price}€/jour`;
        }

        return (headerPhotograph);
    }
    //console.log(getUserPhotographerContent);
    return { name, getUserPhotographerContent }// picture,
}

const filterItems = [
    { id: 1, title: "Popularité", filter: "popularity" },
    { id: 2, title: "Date", filter: "date" },
    { id: 3, title: "Titre", filter: "title" }
];

let isOpen = false;
let currentName;
let filterSelected = 1;

function setIsOpen(medias) {
    isOpen = !isOpen;
    updateFilterButton(medias);
}

function updateFilterButton(medias) {
    const filterBtn = document.getElementById('filter-btn');
    const dropdownContent = document.getElementById('dropdown-content');

    if (filterBtn && dropdownContent) {
        filterBtn.innerHTML = `
            <p>${filterItems.find((item) => item.id === filterSelected).title}</p>
            <img src="assets/icons/flecheBas.png"/>
        `;

        // modification, quand dropdown est ouvert mettre la fleche et supprimer condition ternaire : <img src="assets/icons/${isOpen ? "flecheHaut" : "flecheBas"}.png"/>
        if (isOpen) {
            dropdownContent.style.display = 'block';
            dropdownContent.innerHTML = filterItems.map((item, index) => `
                <div class="dropdown-item" data-sort="${item.filter}" data-id="${item.id}">${item.title}
                ${index < filterItems.length - 2 ? `<img src="assets/icons/flecheHaut.png"/>` : ''}
                </div>
                
                ${index < filterItems.length - 1 ? '<hr class="separate-line">' : ''}
            `).join('');

            document.querySelectorAll('.dropdown-item').forEach(item => {
                item.addEventListener('click', (event) => {
                    const sortById = event.target.getAttribute('data-sort');
                    let id = parseInt(event.target.getAttribute('data-id'));
                    if (sortById) {
                        // console.log(sortById);
                        filterSelected = id;
                        sortAndRender(medias, currentName, sortById);
                        // sortAndRender(filterItems.find(f => f.id === sortById).title.toLowerCase());
                        isOpen = false;
                        updateFilterButton();
                    }
                });
            });
        } else {
            dropdownContent.style.display = 'none';
        }
    }
}


function sortAndRender(medias, name, sortBy) {
    const firstName = name.split(' ')[0];
    const cardContainer = document.getElementById('card-container');

    if (cardContainer) {
        let sortedElements = [...medias];

        switch (sortBy) {
            case 'popularity':
                sortedElements.sort((a, b) => b.likes - a.likes);
                break;
            case 'date':
                sortedElements.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'title':
                sortedElements.sort((a, b) => a.title > b.title); //localeCompare
                break;
            default:
                console.error('Erreur option de tri :', sortBy);
        }

        cardContainer.innerHTML = ''; // Clear
        sortedElements.forEach((element, index) => generateCard(cardContainer, element, firstName, index));
        const totalLikes = calculateTotalLikes(sortedElements);
        updateTotalLikes();
    }
}

function mediaPhotographer(medias, name, price) {
    currentName = name;
    // mediasElements.forEach((element) => console.log(element));
    // console.log(name);
    function getUserMediaContent() {
        // Section
        const sectionElementPicture = document.querySelector('.section-element');

        if (sectionElementPicture) {
            // sectionElementPicture.classList.add('section-element');
            sectionElementPicture.innerHTML += (`
                <div class="filter">
                    <p>Trier par</p>
                    <button id="filter-btn">
                        ${filterItems.find((item) => item.id === filterSelected).title}
                        <img src="assets/icons/${isOpen ? "flecheHaut" : "flecheBas"}.png"/>
                    </button>
                    <div id="dropdown-content" class="dropdown-content"></div>
                </div>
                <div id="card-container"></div>
                <div class="infos">
                    <div class="likes-and-img">
                        <p class="total-like"></p>
                        <img src="assets/icons/favorite-24px 1.png"/>
                    </div>
                    <p class="tarif-jour"></p>
                </div>
            `);

            const filterBtn = document.getElementById('filter-btn');
            filterBtn.addEventListener('click', () => setIsOpen(medias));
            // console.log(filterBtn);

            const firstName = name.split(' ')[0];
            const cardContainer = document.getElementById('card-container');

            // par defaut générer par popularité
            sortAndRender(medias, name, 'popularity');
            updatePriceElement(price);
        }

        return (sectionElementPicture);
    }
    return { getUserMediaContent };
}

function updatePriceElement(price) {
    const priceElement = document.querySelector('.tarif-jour');
    if (priceElement) {
        priceElement.textContent = `${price}€/jour`;
    }
}

function generateCard(cardContainer, element, firstName, index) {
    //Suppression du return
    cardContainer.innerHTML += (
        `<div class="card-elements" tabindex="0" role="button" aria-label="Visionner dans la lightbox">${element.image ? (
            `<img class="media-element" src="assets/photographers/${firstName}/${element.image}" alt="${element.title}"/>`
        ) : (
            `<video class="media-element video"><source src="assets/photographers/${firstName}/${element.video}" alt="${element.title}"/></video>`
        )}
                <div>
                    <h2>${element.title}</h2>
                    <div class="like-all-element">
                        <p id="like-count-${index}">${element.likes}</p>
                        <img id="favorite-${index}" class="favorite-icon" src="assets/icons/favorite.png" alt="favorite"/>
                    </div>
                </div>
            </div> 
        `);
    const card = document.querySelector(".card-elements");
    // card.addEventListener('keydown', function(event) {
    //     if (event.key === 'Enter' || event.key === ' ') {
    //         card.click();  // Simuler un clic lorsque Enter ou Espace est pressé
    //         event.preventDefault();
    //     }
    // });

    // Écouteur de clic pour la logique normale de clic
    card.addEventListener('click', function () {
        openLightbox(element, index); // Ou autre logique de clic
    });
    Promise.resolve().then(() => {
        document.getElementById(`favorite-${index}`).addEventListener('click', () => {
            element.likes += element.liked ? -1 : 1;
            element.liked = !element.liked;
            document.getElementById(`like-count-${index}`).textContent = element.likes;
            updateTotalLikes();
        });

        document.querySelectorAll('.media-element').forEach((media, idx) => {
            media.addEventListener('click', () => {
                openLightbox(media, idx, element.title);
            });
        });

        // Mise à jour des éléments média pour la navigation
        mediaElements = document.querySelectorAll('.media-element');
    });
}

function calculateTotalLikes(medias) {
    return medias.reduce((total, media) => total + media.likes, 0);
}

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

/* LIGHTBOX */
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
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
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

document.querySelector('.lightbox .closeLightbox').addEventListener('click', closeLightbox);
document.querySelector('.lightbox-nav.left').addEventListener('click', showPrevMedia);
document.querySelector('.lightbox-nav.right').addEventListener('click', showNextMedia);

