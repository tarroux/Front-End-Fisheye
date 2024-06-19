// Mettre le code JavaScript lié à la page photographer.html

let photographerName = '';
async function displayData(data, id) {
    const mainEL = document.getElementById('main');

    const photographUser = data.photographers.find(photographer => photographer.id === id); //mis find à la place de filter
    photographerName = photographUser.name;
    // console.log(photographerName);
    photographerPage(photographUser)
        .getUserPhotographerContent();

    const mediasUser = data.medias.filter(media => media.photographerId === id);

    mediaPhotographer(mediasUser, photographUser.name, photographUser.price)
        .getUserMediaContent();
}

async function init() {
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const id = Number(urlParams.get('id'));
    const data = await getMediaAndPhotographers();
    displayData(data, id);
}

init();


