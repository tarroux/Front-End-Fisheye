/**
 * Retrieves data from the photographers JSON file using a fetch request.
 * @returns {Promise<Object>} - Promise that resolves to an object containing data from photographers and media.
 */
async function getData() {
    return fetch("/data/photographers.json")
        .then((response) => response.json())
        .then((res) => res)
        .catch(err => console.log(err))
}

/**
 * Only retrieves data from photographers.
 * @returns {Promise<Array>} - Promise that resolves into a table containing the photographers' data.
 */
async function getPhotographers() {
    const { photographers } = await getData();
    return photographers;
}

/**
 * Retrieves photographer data and associated media.
 * @returns {Promise<Object>} - Promise that resolves into object containing both photographers and media.
 */
async function getMediaAndPhotographers() {
    return await getData();
}