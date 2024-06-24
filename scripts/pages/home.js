async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });

}

async function init() {
    const data = await getPhotographers();
    await displayData(data);
    const links = document.querySelectorAll(".photographer_section a");
    links.forEach(link => {
        link.addEventListener('keydown', function (event) {
            if (event.key === "Enter") {
                window.location.href = event.target.href;
            }
        });
    });
}
init();


