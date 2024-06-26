/**
 * Récupère les données depuis le fichier JSON des photographes en utilisant une requête fetch.
 * @returns {Promise<Object>} - Promesse qui résout en objet contenant les données des photographes et médias.
 */
async function getData() {
    return fetch("/data/photographers.json")
        .then((response) => response.json())
        .then((res) => res)
        .catch(err => console.log(err))
}

/**
 * Récupère uniquement les données des photographes.
 * @returns {Promise<Array>} - Promesse qui résout en un tableau contenant les données des photographes.
 */
async function getPhotographers() {
    const { photographers } = await getData();
    return photographers;
}

/**
 * Récupère les données des photographes ainsi que les médias associés.
 * @returns {Promise<Object>} - Promesse qui résout en objet contenant à la fois les photographes et les médias.
 */
async function getMediaAndPhotographers() {
    return await getData();
}