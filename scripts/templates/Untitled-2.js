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
            <button aria-label="Formulaire de contact" class="contact_button header-button" onclick="displayModal()" >Contactez-moi</button>
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

// function setIsOpen(medias) {
//     isOpen = !isOpen;
//     updateFilterButton(medias);
// }
// function setIsOpen(medias) {
//     const dropdownContent = document.getElementById('dropdown-content');
//     isOpen = !isOpen;
//     isOpen ? dropdownContent.style.display = 'block' : dropdownContent.style.display = 'none';
//     updateFilterButton(medias, dropdownContent);
// }
// Découpler updateFilterButton de setIsOpen
// Il faut renommer setIsOpen (ex : isShowDropdownContent)
// Dans set IsOpen -> inclure display none : block
// function updateFilterButton(medias) {
//     const filterBtn = document.getElementById('filter-btn');
//     const dropdownContent = document.getElementById('dropdown-content');

//     if (filterBtn && dropdownContent) {
//         filterBtn.innerHTML = `
//             <p>${filterItems.find((item) => item.id === filterSelected).title}</p>
//             <img src="assets/icons/flecheBas.png"/>
//         `;

//         // modification, quand dropdown est ouvert mettre la fleche et supprimer condition ternaire : <img src="assets/icons/${isOpen ? "flecheHaut" : "flecheBas"}.png"/>
//         if (isOpen) {
//             dropdownContent.style.display = 'block';
//             dropdownContent.innerHTML = filterItems.map((item, index) => `
//                 <div tabindex="0" class="dropdown-item" data-sort="${item.filter}" data-id="${item.id}">${item.title}
//                 ${index < filterItems.length - 2 ? `<img src="assets/icons/flecheHaut.png"/>` : ''}
//                 </div>

//                 ${index < filterItems.length - 1 ? '<hr class="separate-line">' : ''}
//             `).join('');

//             function dropdownEvent(event) {
//                 console.log('ferf');
//                 const sortById = event.target.getAttribute('data-sort');
//                 let id = parseInt(event.target.getAttribute('data-id'));
//                 if (sortById) {
//                     // console.log(sortById);
//                     filterSelected = id;
//                     sortAndRender(medias, currentName, sortById);
//                     isOpen = false;
//                     updateFilterButton();
//                 }
//             }
//             document.querySelectorAll('.dropdown-item').forEach(item => {
//                 item.addEventListener('click', (event) => dropdownEvent(event));
//                 item.addEventListener('keydown', (event) => {
//                     // event.preventDefault();
//                     console.log(event);
//                     if (event.code === "Enter") {
//                         console.log('ici enter');
//                         dropdownEvent(event);
//                     }


//                 });
//             });
//         } else {
//             dropdownContent.style.display = 'none';
//         }
//     }
// }

function updateFilterButton() {
    const filterBtn = document.getElementById('filter-btn');
    if (filterBtn) {
        const selectedItem = filterItems.find(item => item.id === filterSelected);
        filterBtn.innerHTML = `
            <p>${selectedItem.title}</p>
            <img src="assets/icons/flecheBas.png"/>
        `;
    }
}//<img src="assets/icons/${isOpen ? "flecheHaut" : "flecheBas"}.png"/>

function toggleDropdown(medias) { // ajou medias 
    // console.log("toggleDropdown", medias);
    const dropdownContent = document.getElementById('dropdown-content');
    console.log('toggleDropdown', isOpen);
    if (dropdownContent) {
        if (isOpen) {
            dropdownContent.style.display = 'block';
            dropdownContent.innerHTML = filterItems.map((item, index) => {
                const arrowImg = (item.filter === "popularity") ? `<img src="assets/icons/flecheHaut.png" />` : '';
                return `
                    <div tabindex="0" class="dropdown-item" data-sort="${item.filter}" data-id="${item.id}">
                        ${item.title} ${arrowImg}
                    </div>
                    ${index < filterItems.length - 1 ? '<hr class="separate-line">' : ''}
                `;
            }).join('');
            //${index < filterItems.length - 1 ? '<hr class="separate-line">' : ''}
            attachDropdownEvents(medias);
        } else {
            dropdownContent.style.display = 'none';
        }
    }
}

function attachDropdownEvents(medias) {
    console.log("attachDropdownEvents", medias);
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', event => dropdownEvent(event, medias));
        item.addEventListener('keydown', event => {
            if (event.key === "Enter") {
                dropdownEvent(event, medias);
            }
        });
    });
}

function dropdownEvent(event, medias) {
    console.log("dropdownEvent", medias);
    const sortById = event.target.getAttribute('data-sort');
    const id = parseInt(event.target.getAttribute('data-id'));
    if (sortById) {
        filterSelected = id;
        sortAndRender(medias, currentName, sortById);
        isOpen = false;
        updateFilterButton();
        toggleDropdown();
    }
}

function setIsOpen(medias) {
    console.log('setIsOpen début fonction', medias);
    // isOpen = !isOpen;
    isOpen = true; //forcer temporairement
    updateFilterButton();
    toggleDropdown(medias);
    if (isOpen) {
        console.log('setIsOpen fin fonction ds condition', medias);
        attachDropdownEvents(medias);
    }
}

function sortAndRender(medias, name, sortBy) {
    // console.log('sortAndRender', medias);
    console.log('sortAndRender', isOpen);
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
                    <button id="filter-btn" aria-label="Trier le contenu par popularité, date ou titre">
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
            console.log("Vérifier dropDown", document.getElementById('dropdown-content'));
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

function generateCard(cardContainer, element, firstName, index) { //enlevé de card-element : tabindex="0" role="button" aria-label="Visionner dans la lightbox" ¡ enlevé de source (vidéo) :  alt="${element.title}
    //Suppression du return
    cardContainer.innerHTML += (
        `<div class="card-elements">${element.image ? (
            `<img class="media-element" src="assets/photographers/${firstName}/${element.image}" alt="${element.title}" tabindex="0" role="button"/>`
        ) : (
            `<video class="media-element video"><source src="assets/photographers/${firstName}/${element.video}"" tabindex="0" role="button" aria-label="Play ${element.title}"/></video>`
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
    // cardContainer.insertAdjacentHTML('beforeend', cardHTML);
    // const newCard = cardContainer.lastChild;
    // newCard.addEventListener('keydown', function (event) {
    //     if (event.key === 'Enter') {
    //         openLightbox(element, index);
    //     }
    // });

    // newCard.addEventListener('click', function () {
    //     openLightbox(element, index);
    // });
    // const cards = document.querySelector(".card-elements");
    const mediaElement = document.querySelector('.media-element');
    mediaElement.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
            cards.click();
            event.preventDefault();
        }
    });

    mediaElement.addEventListener('click', function () {
        openLightbox(element, index); // Ou autre logique de clic
    });
    // Promise.resolve().then(() => {
    //     document.getElementById(`favorite-${index}`).addEventListener('click', () => {
    //         element.likes += element.liked ? -1 : 1;
    //         element.liked = !element.liked;
    //         document.getElementById(`like-count-${index}`).textContent = element.likes;
    //         updateTotalLikes();
    //     });

    //     document.querySelectorAll('.media-element').forEach((media, idx) => {
    //         media.addEventListener('click', () => {
    //             openLightbox(media, idx, element.title);
    //         });
    //     });

    //     // Mise à jour des éléments média pour la navigation
    //     mediaElements = document.querySelectorAll('.media-element');
    // });
    Promise.resolve().then(() => {
        setupFavoriteInteraction(element, index);
        setupMediaInteractions([element]); // Si setupMediaInteractions prend un tableau
    });
}
// Depuis que j'ai sorti le système de like, sur le premier élément on ne peut plus like
function setupFavoriteInteraction(element, index) {
    const favoriteButton = document.getElementById(`favorite-${index}`);
    favoriteButton.addEventListener('click', () => {
        element.likes += element.liked ? -1 : 1;
        element.liked = !element.liked;
        document.getElementById(`like-count-${index}`).textContent = element.likes;
        updateTotalLikes();
    });
}
function setupMediaInteractions(mediaArray) {
    mediaArray.forEach((media, idx) => {
        const mediaElement = document.querySelectorAll('.media-element')[idx];
        mediaElement.addEventListener('click', () => {
            openLightbox(media, idx, media.title);
        });
    });

    // Mise à jour de la variable globale pour la navigation dans la lightbox
    mediaElements = document.querySelectorAll('.media-element');
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


//Photographerpage suppression
// const filterBtn = document.getElementById('filter-btn');
    // if (filterBtn) {
    //     const mediasUser = data.medias.filter(media => media.photographerId === id);
    //     console.log("filterBtn", mediasUser);
    //     filterBtn.addEventListener('click', () => setIsOpen(mediasUser));
    //     console.log("click filterBtn");
    // }