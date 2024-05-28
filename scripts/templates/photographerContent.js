// Tout ce qui concerne le contenu de la page photographer
function photographerPage(photographersIdentity) {
    // console.log(photographersIdentity);
    const { name, city, country, tagline, portrait } = photographersIdentity;

    // const { title, image, likes, date, price } = photographerContentElement;

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