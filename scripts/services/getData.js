
async function getData() {
    return fetch("/data/photographers.json")
        .then((response) => response.json())
        .then((res) => res)
        .catch(err => console.log(err))
}

/**
 * Récupère photographer
 */
async function getPhotographers() {
    const { photographers } = await getData();
    return photographers;
}

async function getMediaAndPhotographers() {
    return await getData();
}