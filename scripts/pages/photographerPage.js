// Mettre le code JavaScript lié à la page photographer.html

async function displayData(data, id) {
    const mainEL = document.getElementById('main');
    // const sectionElementPicture = document.createElement('section');
    // sectionElementPicture.classList.add('section-element');

    const photographUser = data.photographers.filter(photographer => photographer.id === id);
    console.log(photographUser);

    photographerPage(photographUser[0])
        .getUserPhotographerContent();
    // mainEL.appendChild(userHeaderEl[0]);
    // console.log(userHeaderEl);

    const mediasUser = data.medias.filter(media => media.photographerId === id);
    // console.log(mediasUser);

    mediaPhotographer(mediasUser, photographUser[0].name)
        .getUserMediaContent();
    // console.log(photographUser);

    // mediasUser.forEach(media => {
    //     const userCardDOM = mediaPhotographer(media, photographUser.name)
    //         .getUserMediaContent();
    //     // mainEL.appendChild(sectionElementPicture);
    //     // mainEL.appendChild(userCardDOM[1]);
    //     // console.log(media);
    //     return media;
    // });
    // console.log(media);

    // mainEL.appendChild(userHeaderEl);
    // mainEL.appendChild(userCardDOM);
}

async function init() {
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const id = Number(urlParams.get('id'));
    // console.log(id);
    const data = await getMediaAndPhotographers();
    // console.log(data);
    await displayData(data, id);
}

init();


