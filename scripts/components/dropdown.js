const dropdownSortOptions = [
    { id: 1, title: "Popularité", filter: "popularity" },
    { id: 2, title: "Date", filter: "date" },
    { id: 3, title: "Titre", filter: "title" }
];

let isOpen = false;
let selectedDropdownSortOptions = dropdownSortOptions[0].id;
const dropdownContent = document.getElementById('dropdown-content');

/**
 * Create a drop-down menu to sort the media and attach the necessary events.
 * @param {Array} medias - Photographer's media list.
 * @param {Function} renderMediaCards - Function to display media cards.
 * @param {String} name - Name of photographer.
 * @returns {Object} - Object containing the HTML of the drop-down menu and the function to attach the events.
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
     * Attaches events to open/close drop-down menu and to sort media.
     * @param {Array} medias - Media to display.
     * @param {Function} renderMediaCards - Function to display media cards.
     * @param {String} name - Name of photographer.
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
 * Toggles the drop-down menu display.
 */
function toggleDropdown() {
    isOpen = !isOpen;
    document.getElementById('dropdown-content').classList.toggle('show', isOpen);
}

/**
 * Updates the drop-down menu button to reflect the selected option.
 */
function updateDropdownButton() {
    document.getElementById('filter-btn').innerHTML = `
        <p>${dropdownSortOptions.find(item => item.id === selectedDropdownSortOptions).title}</p>
        <img src="assets/icons/flecheBas.png"/>
    `;
}

/**
 * Shows drop-down menu options for sorting media.
 * @param {Array} medias - Media to sort.
 * @param {Function} renderMediaCards - Function to display media cards.
 * @param {String} name - Name of photographer.
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
 * Attaches click and Enter key events to drop-down menu items to handle selection.
 * @param {Array} medias - Media to sort and display.
 * @param {Function} renderMediaCards - Function to display media cards after sorting.
 * @param {String} name - Name of photographer.
 */
function attachDropdownItemsEvents(medias, renderMediaCards, name) {
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener("click", (event) => {
            handleDropdownSelection(event.target, medias, renderMediaCards, name);
        });
        item.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault(); // Empêche tout comportement par défaut
                handleDropdownSelection(event.target, medias, renderMediaCards, name);
            }
        });
    });
}

/**
 * Manages the selection in the drop-down menu, sorts the media and updates the display.
 * @param {HTMLElement} target - The selected item from the drop-down menu.
 * @param {Array} medias - List of photographer's media to sort.
 * @param {Function} renderMediaCards - Function to display media cards.
 * @param {String} name - Name of photographer.
 */
function handleDropdownSelection(target, medias, renderMediaCards, name) {
    const sortBy = target.getAttribute('data-sort');
    selectedDropdownSortOptions = parseInt(target.getAttribute('data-id'));
    const sortedMedias = sortMedias(medias, sortBy);
    renderMediaCards(sortedMedias, name);
    updateDropdownButton();
    toggleDropdown();
}

/**
 * Closes the drop-down menu when the user clicks outside of it.
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