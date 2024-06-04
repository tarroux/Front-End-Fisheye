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

        // const sectionElement = document.querySelector('.section-element');
        // sectionElement.innerHTML = (
        //     `<p>Trier par</p>
        // `);
        // sectionElementPicture.innerHTML = (`

        // `);
        // Body (content)

        // const photographElement = document.createElement('section');
        // photographElement.classList.add("section-content");

        // Section container : content elements photograph

        // const contentElPhotograph = document.createElement('section');
        // contentElPhotograph.classList.add("section-content");
        // contentElPhotograph.innerHTML = (
        //     `<div>
        //         <p>Trier par </p>
        //     </div>
        //     `);

        //console.log(getUserPhotographerContent());




        // const headerPhotograph = document.getElementsByClassName('photograph-header');
        // //console.log(headerPhotograph);
        // const photographIdentity = document.createElement('div');
        // photographIdentity.classList.add('identity');
        // const h1Photograph = document.createElement('h1');
        // h1Photograph.classList.add('nameEL')
        // h1Photograph.textContent = name;
        // const localisation = document.createElement('p');
        // localisation.classList.add('localisation');
        // localisation.textContent = city + ", " + country;
        // const taglineElHeader = document.createElement('p');
        // taglineElHeader.classList.add('tagline-header');
        // taglineElHeader.textContent = tagline;
        // const contactButton = document.querySelector('.header-button');
        // //console.log(contactButton);//= null
        // const imgContainer = document.createElement('div');
        // imgContainer.classList.add('img-photographer');
        // const img = document.createElement('img');
        // img.classList.add('img-el');
        // img.setAttribute("src", picture);

        // // Content

        // /** Affectation des éléments **/
        // // Header
        // headerPhotograph[0].appendChild(photographIdentity);
        // photographIdentity.appendChild(h1Photograph);
        // photographIdentity.appendChild(localisation);
        // photographIdentity.appendChild(taglineElHeader);
        // headerPhotograph[0].appendChild(contactButton);
        // headerPhotograph[0].appendChild(imgContainer);
        // imgContainer.appendChild(img);

        // Content

        return (headerPhotograph);
    }
    //console.log(getUserPhotographerContent);
    return { name, getUserPhotographerContent }// picture,
}

function mediaPhotographer(mediasElements, name) {
    // mediasElements.forEach((element) => console.log(element));
    // console.log(name);
    function getUserMediaContent() {
        // Section
        const sectionElementPicture = document.querySelector('.section-element');

        if (sectionElementPicture) {
            // sectionElementPicture.classList.add('section-element');
            sectionElementPicture.innerHTML = (
                `<div class="filter">
                    <p>Trier par</p>
                    <ul id="sort-options">
                        <li class="menu-parent" data-sort="popularity">
                        Popularité 
                            <img class="open" src="assets/icons/flecheBas.png"/>
                            <img class="close" src="assets/icons/flecheHaut.png"/>
                            <div class="line1"></div>
                        </li>
                        <li class="parent-line2" data-sort="date">
                        Date
                            <div class="line2"></div>
                        </li>
                        <li data-sort="title>Titre</li>
                    </ul>
                </div>
                <div id="card-container"></div>
            `);
            const firstName = name.split(' ')[0];
            const cardContainer = document.getElementById('card-container');
            // console.log(cardContainer);

            // if (!cardContainer) {
            //     console.error('card-container not found');
            //     return;
            // }

            function sortAndRender(sortBy) {
                let sortedElements = [...mediasElements];

                switch (sortBy) {
                    case 'populatity':
                        sortedElements.sort((a, b) => b.likes - a.likes);
                        break;
                    case 'date':
                        sortedElements.sort((a, b) => new Date(b.date) - new Date(a.date));
                        break;
                    case 'title':
                        sortedElements.sort((a, b) => a.title.localeCompare(b.title));
                        break;
                    default:
                        console.error('error sort option :', sortBy);
                        return;
                }

                cardContainer.innerHTML = ''; // Clear
                sortedElements.forEach((element) => generateCard(cardContainer, element, firstName));
                console.log(cardContainer);

            }
            // par defaut générer par popularité
            sortAndRender('popularity');

            const sortOptions = document.getElementById('sort-options');
            sortOptions.addEventListener('click', (event) => {
                const sortBy = event.target.getAttribute('data-sort');
                if (sortBy) {
                    sortAndRender(sortBy);
                }
            });
        }

        /*
        Ajouter les img pour le menu ouvert ou fermé :
        <img src="assets/icons/flecheBas.png" alt="fleche fermeture">
        <img src="assets/icons/flecheHaut.png" alt="fleche ouverture">
        */

        // console.log(mediasElements);

        // const likeImg = "assets/icons/favorite.png";
        // mediasElements.forEach(element => {
        //     const cardContainer = document.getElementById('card-container');
        //     generateCard(cardContainer, element, firstName);
        // });

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
                `<img class="" src="assets/photographers/${firstName[0]}/${element.image}" alt=""/>`
            ) : (
                `<video controls><source src="assets/photographers/${firstName[0]}/${element.video}" /></video>`
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