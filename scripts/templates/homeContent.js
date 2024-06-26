/**
 * Creates a template for a photographer's card and provides a function to generate its DOM.
 * @param {Object} data - Contains a photographer's information (name, portrait, city, etc.).
 * @returns {Object} - Object containing the photographer's name, image, and a function to get the photographer's map DOM.
 */
function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/PhotographersIDPhotos/${portrait}`;

    /**
     * Constructs and returns the photographer map DOM.
     * @returns {HTMLElement} - The HTML element 'a' which contains the entire photographer's map.
     */
    function getUserCardDOM() {
        const linkPagePhotographer = document.createElement('a');
        linkPagePhotographer.setAttribute("href", `photographer.html?id=${id}`);
        linkPagePhotographer.setAttribute("aria-label", "Profile de " + name);
        const article = document.createElement('article');
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('card-photographer');
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        const h2 = document.createElement('h2');
        h2.textContent = name;
        const locationDiv = document.createElement('div');
        locationDiv.classList.add('location');
        locationDiv.textContent = city + ", " + country;
        const taglineEl = document.createElement('p');
        taglineEl.classList.add('taglineElement');
        taglineEl.textContent = tagline;
        const priceEl = document.createElement('p');
        priceEl.classList.add('priceElement');
        priceEl.textContent = price + "/jour";

        linkPagePhotographer.appendChild(article);
        article.appendChild(imgContainer);
        imgContainer.appendChild(img);
        article.appendChild(h2);
        article.appendChild(locationDiv);
        article.appendChild(taglineEl);
        article.appendChild(priceEl);

        return (linkPagePhotographer);
    }
    return { name, picture, getUserCardDOM }
}