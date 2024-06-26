const dropdownSortOptions = [
    { id: 1, title: "Popularité", filter: "popularity" },
    { id: 2, title: "Date", filter: "date" },
    { id: 3, title: "Titre", filter: "title" }
];

let isOpen = false;
let selectedDropdownSortOptions = dropdownSortOptions[0].id;
const dropdownContent = document.getElementById('dropdown-content');

/**
 * Crée un menu déroulant pour trier les médias et attache les événements nécessaires.
 * @param {Array} medias - Liste des médias du photographe.
 * @param {Function} renderMediaCards - Fonction pour afficher les cartes de médias.
 * @param {String} name - Nom du photographe.
 * @returns {Object} - Objet contenant le HTML du menu déroulant et la fonction pour attacher les événements.
 */
function createDropdown(medias, renderMediaCards, name) {
    const dropdownHtml = (
        `<div class="filter">
                <p>Trier par</p>
                <button id="filter-btn" aria-label="Trier le contenu par popularité, date ou titre">
                    ${dropdownSortOptions.find((item) => item.id === selectedDropdownSortOptions).title}
                    <img src="assets/icons/${isOpen ? "flecheHaut" : "flecheBas"}.png"/>
                </button>
                <div id="dropdown-content" class="dropdown-content"></div>
            </div>`
    );

    /**
     * Attache des événements pour ouvrir/fermer le menu déroulant et pour trier les médias.
     * @param {Array} medias - Médias à afficher.
     * @param {Function} renderMediaCards - Fonction pour afficher les cartes de médias.
     * @param {String} name - Nom du photographe.
     */
    function attachDropdownEvents(medias, renderMediaCards, name) {
        const dropdownContent = document.getElementById('dropdown-content');

        document.getElementById('filter-btn').addEventListener("click", () => {
            isOpen = !isOpen;
            renderDropdownOptions(medias, renderMediaCards, name);
            dropdownContent.classList.toggle('show', isOpen);
        });
    }
    return { dropdownHtml, attachDropdownEvents }
}

/**
 * Bascule l'affichage du menu déroulant.
 */
function toggleDropdown() {
    isOpen = !isOpen;
    document.getElementById('dropdown-content').classList.toggle('show', isOpen);
}

/**
 * Met à jour le bouton du menu déroulant pour refléter l'option sélectionnée.
 */
function updateDropdownButton() {
    document.getElementById('filter-btn').innerHTML = `
        <p>${dropdownSortOptions.find(item => item.id === selectedDropdownSortOptions).title}</p>
        <img src="assets/icons/flecheBas.png"/>
    `;
}

/**
 * Affiche les options du menu déroulant pour trier les médias.
 * @param {Array} medias - Médias à trier.
 * @param {Function} renderMediaCards - Fonction pour afficher les cartes de médias.
 * @param {String} name - Nom du photographe.
 */
function renderDropdownOptions(medias, renderMediaCards, name) {
    const dropdownContent = document.getElementById('dropdown-content');

    if (dropdownContent) {
        dropdownContent.innerHTML = dropdownSortOptions.map((item, index) => `
            <div tabindex="0" class="dropdown-item" data-sort="${item.filter}" data-id="${item.id}">${item.title}
                ${index < dropdownSortOptions.length - 2 ? `<img src="assets/icons/flecheHaut.png"/>` : ''}
            </div>
            ${index < dropdownSortOptions.length - 1 ? '<hr class="separate-line">' : ''}
        `).join('');
    }
    attachDropdownItemsEvents(medias, renderMediaCards, name);
}

/**
 * Attache des événements de clic et de touche "Enter" aux éléments du menu déroulant pour gérer la sélection.
 * @param {Array} medias - Médias à trier et afficher.
 * @param {Function} renderMediaCards - Fonction pour afficher les cartes de médias après le tri.
 * @param {String} name - Nom du photographe.
 */
function attachDropdownItemsEvents(medias, renderMediaCards, name) {
    document.querySelectorAll('.dropdown-item').forEach(item => {
        // Écouteur pour les clics de souris
        item.addEventListener("click", (event) => {
            handleDropdownSelection(event.target, medias, renderMediaCards, name);
        });

        // Écouteur pour la touche Enter
        item.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault(); // Empêche tout comportement par défaut
                handleDropdownSelection(event.target, medias, renderMediaCards, name);
            }
        });
    });
}

/**
 * Gère la sélection dans le menu déroulant, trie les médias et met à jour l'affichage.
 * @param {HTMLElement} target - L'élément sélectionné du menu déroulant.
 * @param {Array} medias - Liste des médias du photographe à trier.
 * @param {Function} renderMediaCards - Fonction pour afficher les cartes de médias.
 * @param {String} name - Nom du photographe.
 */
function handleDropdownSelection(target, medias, renderMediaCards, name) {
    const sortBy = target.getAttribute('data-sort');
    selectedDropdownSortOptions = parseInt(target.getAttribute('data-id'));
    const sortedMedias = sortMedias(medias, sortBy);
    renderMediaCards(sortedMedias, name);
    updateDropdownButton();
    toggleDropdown(); // Fermer le dropdown après la sélection
}

/**
 * Ferme le menu déroulant lorsque l'utilisateur clique en dehors de celui-ci.
 */
function closeDropdownOnClickOutside() {
    const dropdownContent = document.getElementById('dropdown-content');
    const filterBtn = document.getElementById('filter-btn');
    if (dropdownContent && filterBtn && !dropdownContent.contains(event.target) && !filterBtn.contains(event.target)) {
        isOpen = false;
        dropdownContent.classList.remove('show');
    }
}

document.addEventListener('click', closeDropdownOnClickOutside);
document.addEventListener('keyup', closeDropdownOnClickOutside);