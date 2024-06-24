async function displayPhotographerData(data, id) {
    const photographUser = data.photographers.find(photographer => photographer.id === id);
    createPhotographerProfile(photographUser).getPhotographerHeader();

    const mediasUser = data.medias.filter(media => media.photographerId === id);
    createMediaContent(mediasUser, photographUser.name, photographUser.price);
}

async function initializePage() {
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const id = Number(urlParams.get('id'));
    const data = await getMediaAndPhotographers();
    displayPhotographerData(data, id);
}

initializePage();


