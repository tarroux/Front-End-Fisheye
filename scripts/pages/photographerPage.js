/**
 * Retrieves and displays photographer data and their corresponding media.
 * @param {Object} data - Object containing photographer and media data.
 * @param {Number} id - Unique ID of the photographer whose data should be displayed.
 */
async function displayPhotographerData(data, id) {
    const photographUser = data.photographers.find(photographer => photographer.id === id);
    createPhotographerProfile(photographUser).getPhotographerHeader();

    const mediasUser = data.medias.filter(media => media.photographerId === id);
    createMediaContent(mediasUser, photographUser.name, photographUser.price);
}

/**
 * Initializes the page by retrieving data from photographers and media, 
 * then displays those matching the ID specified in the URL.
 */
async function initializePage() {
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const id = Number(urlParams.get('id'));
    const data = await getMediaAndPhotographers();
    displayPhotographerData(data, id);
}

initializePage();


