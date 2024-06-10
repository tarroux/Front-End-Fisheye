// Tout ce qui concerne le contenu de la page photographer
function photographerPage(photographersIdentity) {
    // console.log(photographersIdentity);
    const { name, city, country, tagline, portrait } = photographersIdentity;
    // console.log(photographersIdentity);


    // console.log(photographersIdentity);
    // console.log(photographerContentElement);

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
                <img src="${picture}" class="img-el"/>
            </div> 
        `);


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

function setIsOpen(medias) {
    isOpen = !isOpen;
    updateFilterButton(medias);
}

function updateFilterButton(medias) {
    const filterBtn = document.getElementById('filter-btn');
    const dropdownContent = document.getElementById('dropdown-content');

    if (filterBtn && dropdownContent) {
        filterBtn.innerHTML = `
            ${filterItems.find((item) => item.id === filterSelected).title}
            <img src="assets/icons/${isOpen ? "flecheHaut" : "flecheBas"}.png"/>
        `;

        if (isOpen) {
            dropdownContent.style.display = 'block';
            dropdownContent.innerHTML = filterItems.map(item => `
                <div class="dropdown-item" data-sort="${item.filter}">${item.title}</div>
            `).join('');

            document.querySelectorAll('.dropdown-item').forEach(item => {
                item.addEventListener('click', (event) => {
                    const sortById = event.target.getAttribute('data-sort');
                    if (sortById) {
                        // console.log(sortById);
                        // filterSelected = sortById;
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
let filterSelected = 1;

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
                sortedElements.sort((a, b) => a.title.localeCompare(b.title));
                break;
            default:
                console.error('Erreur option de tri :', sortBy);
        }

        cardContainer.innerHTML = ''; // Clear
        sortedElements.forEach((element) => generateCard(cardContainer, element, firstName));
    }
}

function mediaPhotographer(medias, name) {
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
            `);
            // sectionElementPicture.innerHTML += (``);
            const filterBtn = document.getElementById('filter-btn');
            filterBtn.addEventListener('click', () => setIsOpen(medias));
            // console.log(isOpen);

            const firstName = name.split(' ')[0];
            const cardContainer = document.getElementById('card-container');

            // console.log(cardContainer);

            // if (!cardContainer) {
            //     console.error('card-container not found');
            //     return;
            // }


            // function sortAndRender(sortBy) {
            //     let sortedElements = [...medias];

            //     switch (sortBy) {
            //         case 'popularity':
            //             sortedElements.sort((a, b) => b.likes - a.likes);
            //             break;
            //         case 'date':
            //             sortedElements.sort((a, b) => new Date(b.date) - new Date(a.date));
            //             break;
            //         case 'title':
            //             sortedElements.sort((a, b) => a.title.localeCompare(b.title));
            //             break;
            //         default:
            //             console.error('error sort option :', sortBy);
            //         // return;   
            //     }

            //     cardContainer.innerHTML = ''; // Clear
            //     sortedElements.forEach((element) => generateCard(cardContainer, element, firstName));
            //     console.log(cardContainer);

            // }
            // par defaut générer par popularité
            sortAndRender(medias, name, 'popularity');

            const dropdownToggle = document.querySelector('.menu-parent');
            const dropdownContent = document.querySelector('.dropdown-content');
            const openFilter = document.getElementById('open');
            const closeFilter = document.getElementById('close');

            dropdownToggle.addEventListener('click', () => {
                const isOpen = dropdownContent.style.display === 'block';
                dropdownContent.style.display = isOpen ? 'none' : 'block';
                openFilter.style.display = isOpen ? 'block' : 'none';
                closeFilter.style.display = isOpen ? 'none' : 'block';

            });

            document.querySelectorAll('.dropdown-item').forEach(item => {
                item.addEventListener('click', function () {
                    const sortBy = item.getAttribute('data-sort');
                    if (sortBy) {
                        sortAndRender(sortBy);
                        dropdownContent.style.display = 'none';
                        openIcon.style.display = 'block';
                        closeIcon.style.display = 'none';
                    }
                });
            });

            // const sortOptions = document.getElementById('sort-options');
            // sortOptions.addEventListener('click', (event) => {
            //     const sortBy = event.target.getAttribute('data-sort');
            //     if (sortBy) {
            //         sortAndRender(sortBy);
            //     }
            // });
        }


        /*
        Img 
        -> Titre -> nbLike -> svgCoeur
        */
        // Parcourir média 
        // Condition si image/si video

        return (sectionElementPicture);
    }
    return { getUserMediaContent };
}

function generateCard(cardContainer, element, firstName) {
    return (
        cardContainer.innerHTML += (
            `<div class="card-elements">${element.image ? (
                `<img class="" src="assets/photographers/${firstName}/${element.image}" alt=""/>`
            ) : (
                `<video controls><source src="assets/photographers/${firstName}/${element.video}" /></video>`
            )}
                <div>
                    <h2>${element.title}</h2>
                    <div class="like-all-element">
                        <p>${element.likes}</p>
                        <img src="assets/icons/favorite.png" alt="favorite"/>
                    </div>
                </div>
            </div> 
        `)
    );

}





// opération ternaire 
// ? true | : false | si on ne veut pas mettre de false remplace ? par &&
// | -> opt +shift + L
// Modification nom dossier img : Ellie Rose => Ellie