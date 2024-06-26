/**
 * Organizes a list of media according to a specified sorting criterion.
 * @param {Array} medias - An array containing media objects (photos, videos, etc.).
 * @param {string} sortBy - The sorting criterion can be 'popularity', 'date', or 'title'.
 * @returns {Array} - The media array sorted by the specified criteria.
 */
function sortMedias(medias, sortBy) {
    let sortedElements = [...medias];

    switch (sortBy) {
        case 'popularity':
            sortedElements.sort((a, b) => b.likes - a.likes);
            break;
        case 'date':
            sortedElements.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'title':
            sortedElements.sort((a, b) => a.title > b.title);
            break;
        default:
            console.error('Erreur option de tri :', sortBy);
    }
    return sortedElements;
}