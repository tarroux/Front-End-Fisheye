function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/PhotographersIDPhotos/${portrait}`;

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

        // linkPagePhotographer.addEventListener('focus', (event) => {
        //     console.log(`Focus sur ${name}`);
        // }, true);
        // linkPagePhotographer.addEventListener('keypress', (event) => {
        //     if (event.key === 'Enter') {
        //         window.location.href = linkPagePhotographer.href;
        //     }
        // });
        return (linkPagePhotographer);
    }
    return { name, picture, getUserCardDOM }
}