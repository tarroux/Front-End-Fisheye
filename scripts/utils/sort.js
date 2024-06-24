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
            sortedElements.sort((a, b) => a.title > b.title); //localeCompare
            break;
        default:
            console.error('Erreur option de tri :', sortBy);
    }
    return sortedElements;
}