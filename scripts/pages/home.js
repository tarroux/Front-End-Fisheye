/**
 * Affiche les données des photographes dans la section dédiée sur la page.
 * @param {Array} photographers - Liste des photographes à afficher.
 */
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });

}

/**
 * Initialise la page en récupérant les données des photographes et en configurant les événements.
 */
async function init() {
    const data = await getPhotographers();
    await displayData(data);
    const links = document.querySelectorAll("a");
    links.forEach(link => {
        link.addEventListener('keydown', function (event) {
            if (event.key === "Enter") {
                window.location.href = event.target.href;
            }
        });
    });
}
init();


