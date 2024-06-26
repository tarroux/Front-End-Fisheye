/**
 * Récupère et affiche les données du photographe et ses médias correspondants.
 * @param {Object} data - Objet contenant les données des photographes et des médias.
 * @param {Number} id - ID unique du photographe dont les données doivent être affichées.
 */
async function displayPhotographerData(data, id) {
    const photographUser = data.photographers.find(photographer => photographer.id === id);
    createPhotographerProfile(photographUser).getPhotographerHeader();

    const mediasUser = data.medias.filter(media => media.photographerId === id);
    createMediaContent(mediasUser, photographUser.name, photographUser.price);
}

/**
 * Initialise la page en récupérant les données des photographes et médias, puis affiche celles correspondant à l'ID spécifié dans l'URL.
 */
async function initializePage() {
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const id = Number(urlParams.get('id'));
    const data = await getMediaAndPhotographers();
    displayPhotographerData(data, id);
}

initializePage();


