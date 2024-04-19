function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/PhotographersIDPhotos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        // article.innerHTML = (
        //     <img src={picture}/>
        // )
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('card-photographer');
        const img = document.createElement('img');
        img.setAttribute("src", picture)
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
        imgContainer.appendChild(img);
        article.appendChild(imgContainer);
        article.appendChild(h2);
        article.appendChild(locationDiv);
        article.appendChild(taglineEl);
        article.appendChild(priceEl);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}