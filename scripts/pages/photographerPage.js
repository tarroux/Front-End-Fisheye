// Mettre le code JavaScript lié à la page photographer.html

async function displayData(data) {
    const mainEL = document.querySelector('#main');
    // console.log(data);

    // photographers.forEach((photographer) => {
    //     const photographerContent = photographerPage(photographer);
    //     //console.log(photographerContent);

    //     const userCardDOM = photographerContent.getUserPhotographerContent();
    //     //console.log(userCardDOM);
    //     // mainEL.appendChild(userCardDOM[0]);
    //     mainEL.contains(userCardDOM);


    // });
}

async function init() {
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const id = urlParams.get('id');
    console.log(id);
    const data = await getMediaAndPhotographers();
    console.log(data);
    // await displayData(data);
}

init();


// Suite :
// Comment faire un filtre sur mes tableaux
// filtrer tableau photographers par rapport à l'id
// récupérer mes éléments de photographers et média
