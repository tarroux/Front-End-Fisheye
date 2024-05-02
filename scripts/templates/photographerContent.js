// Tout ce qui concerne le contenu de la page photographer
function photographerPage(data) {
    const { name, city, country, tagline, portrait } = data;

    const picture = `assets/photographers/PhotographersIDPhotos/${portrait}`;

    function getUserPhotographerContent() {

        const headerPhotograph = document.getElementsByClassName('.photograph-header');
        console.log(headerPhotograph);
        const photographIdentity = document.createElement('div');
        photographIdentity.classList.add('identity');
        const h1Photograph = document.createElement('h1');
        h1Photograph.textContent = name;
        // const localisation = document.createElement('p');
        // localisation.classList.add('localisation');
        // localisation.textContent = city + ", " + country;
        // const taglineElHeader = document.createElement('p');
        // taglineElHeader.classList.add('taglineElHeader');
        // taglineElHeader.textContent = tagline;
        //const contactButton = document.querySelector('header-button');
        // console.log(contactButton);//= null
        // const imgContainer = document.createElement('div');
        // imgContainer.classList.add('img-photographer');
        // const img = document.createElement('img');
        // img.setAttribute("src", picture);

        /** Affectation des éléments **/
        headerPhotograph.appendChild(photographIdentity);
        photographIdentity.appendChild(h1Photograph);
        // photographIdentity.appendChild(localisation);
        // photographIdentity.appendChild(taglineElHeader);
        //headerPhotograph.appendChild(contactButton);
        // headerPhotograph.appendChild(imgContainer);
        // imgContainer.appendChild(img);

        return (headerPhotograph);
    }
    console.log(getUserPhotographerContent);
    return { name, picture, getUserPhotographerContent }
}