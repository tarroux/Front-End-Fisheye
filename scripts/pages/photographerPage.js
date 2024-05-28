// Mettre le code JavaScript lié à la page photographer.html

async function displayData(data, id) {
    const mainEL = document.getElementById('main');
    const sectionElementPicture = document.createElement('section');
    data.photographers
        .filter(photographer => photographer.id === id)
        .forEach(photographer => {
            const userHeaderEl = photographerPage(photographer)
                .getUserPhotographerContent();
            mainEL.appendChild(userHeaderEl);
            return photographer;
        })
    data.medias
        .filter(media => media.id === id)
        .forEach(media => {
            const userCardDOM = photographerPage(media)
                .getUserPhotographerContent();
            sectionElementPicture.appendChild(userCardDOM);
        });
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


// Suite :
// Comment faire un filtre sur mes tableaux
// filtrer tableau photographers par rapport à l'id
// récupérer mes éléments de photographers et média

//const queryString_url__id = window.location.search;
