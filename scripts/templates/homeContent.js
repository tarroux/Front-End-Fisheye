/**
 * Crée un modèle pour la carte d'un photographe et fournit une fonction pour générer son DOM.
 * @param {Object} data - Contient les informations d'un photographe (nom, portrait, ville, etc.).
 * @returns {Object} - Objet contenant le nom, l'image du photographe et une fonction pour obtenir le DOM de la carte du photographe.
 */
function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/PhotographersIDPhotos/${portrait}`;

    /**
     * Construit et retourne le DOM de la carte du photographe.
     * @returns {HTMLElement} - L'élément HTML 'a' qui contient toute la carte du photographe.
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