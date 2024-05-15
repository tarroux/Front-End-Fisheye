// Mettre le code JavaScript lié à la page photographer.html

async function displayData(data) {
    const mainEL = document.querySelector('#main');
    // console.log(data.photographers);
    // console.log(data.media);
    const photographObj = data.photographers;
    const mediaObj = data.media;

    const photographSelectId = photographObj.find((element) => element.id === id);
    console.log(photographSelectId);
    // const mediaElSelectId = mediaObj.find((element) => element.photographerId === id);
    // console.log(mediaElSelectId);

    // console.log(typeof photographObj, typeof mediaObj);

    // const photographerContent = photographerPage(photographObj, mediaObj);
    // const userCardDOM = photographerContent.getUserPhotographerContent(photographObj, mediaObj);
    // // mainEL.appendChild(userCardDOM[0]);
    // mainEL.contains(userCardDOM);
    // 

    // photographObj.array.forEach(element => {
    //     element.id === id;
    //     const photographerContent = photographerPage(data);
    //     // console.log(id);
    // });
    // mediaObj.array.forEach(element => {
    //     element.id === photographerId;
    // });

    // console.log(mainEL);
    // const { photographers, media } = data;
    // data.array.forEach(element => {

    // });
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
    await displayData(data);
}

init();


// Suite :
// Comment faire un filtre sur mes tableaux
// filtrer tableau photographers par rapport à l'id
// récupérer mes éléments de photographers et média

//const queryString_url__id = window.location.search;
