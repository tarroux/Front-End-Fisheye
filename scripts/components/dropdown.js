const dropdownSortOptions = [
    { id: 1, title: "Popularité", filter: "popularity" },
    { id: 2, title: "Date", filter: "date" },
    { id: 3, title: "Titre", filter: "title" }
];

let isOpen = false;
let selectedDropdownSortOptions = dropdownSortOptions[0].id;
const dropdownContent = document.getElementById('dropdown-content');


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

function toggleDropdown() {
    isOpen = !isOpen;
    document.getElementById('dropdown-content').classList.toggle('show', isOpen);
}

function updateDropdownButton() {
    document.getElementById('filter-btn').innerHTML = `
        <p>${dropdownSortOptions.find(item => item.id === selectedDropdownSortOptions).title}</p>
        <img src="assets/icons/flecheBas.png"/>
    `;
}

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

function attachDropdownItemsEvents(medias, renderMediaCards, name) {
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener("click", (event) => {
            const sortBy = event.target.getAttribute('data-sort');
            selectedDropdownSortOptions = parseInt(event.target.getAttribute('data-id'));
            const sortedMedias = sortMedias(medias, sortBy);
            renderMediaCards(sortedMedias, name);
            // isOpen = false;
            updateDropdownButton();
            toggleDropdown();
        })
    });
}

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