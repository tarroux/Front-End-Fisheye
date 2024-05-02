// Mettre le code JavaScript lié à la page photographer.html

async function getPhotographers() {
    return fetch("/data/photographers.json")
        .then((response) => response.json())
        .then((json) => json)
        .catch(err => console.log(err))
}

async function displayData(photographers) {
    // const photographHeader = document.querySelector(".photograph-header");
    // console.log(photographHeader);
    const sectionEl = document.createElement('section');
    sectionEl.classList.add('photograph');
    //console.log(photograph);

    photographers.forEach((photographer) => {
        const photographerContent = photographerPage(photographer);
        //console.log(photographerContent);

        const userCardDOM = photographerContent.getUserPhotographerContent();
        console.log(userCardDOM);
        photograph.appendChild(userCardDOM);

    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    console.log(photographers);
    displayData(photographers);
}

init();