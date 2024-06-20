async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
    // document.querySelector(".photographer_section a").focus();
}

async function init() {
    const data = await getPhotographers();
    await displayData(data);
    // document.querySelector(".photographer_section a").focus();
}
init();


