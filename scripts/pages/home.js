/**
 * Shows photographer data in the dedicated section on the page.
 * @param {Array} photographers - List of photographers to display.
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
 * Initializes the page by retrieving data from photographers and configuring events.
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


