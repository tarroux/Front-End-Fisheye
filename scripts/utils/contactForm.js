const modal = document.getElementById("contact-modal");
const form = document.getElementById('form');

// Message error
const errorMessages = {
    first: "Veuillez entrer 2 caractères ou plus pour le champ du prénom",
    last: "Veuillez entrer 2 caractères ou plus pour le champ du nom",
    email: "Veuillez corriger votre adresse mail",
    message: "Veuillez écrire votre message",
};

// Définir la modal sur display none
modal.style.display = "none";

form.innerHTML = `
    <div>
        <label for="first">Prénom</label>
        <input id="first" name="first" type="text"/>
        <span class="error-message" id="first-error"></span>
        <label for="last" >Nom</label>
        <input id="last" name="last" type="text"/>
        <span class="error-message" id="last-error"></span>
        <label for="email">Email</label>
        <input id="email" type="email" name="email"/>
        <span class="error-message" id="email-error"></span>
        <label for="message">Message</label>
        <input type="text" name="message" id="message"/>
        <span class="error-message" id="message-error"></span>
    </div>
    <button type="submit" class="contact_button">Envoyer</button>
`;

form.addEventListener("submit", event => validateForm(event));

/**
 * Check all input
 * @param {*} e 
 * @returns 
 */
function validateForm(e) {
    e.preventDefault();
    let allValid = true;
    form.querySelectorAll("input").forEach((input) => {
        if (!checkInput(input)) {
            allValid = false;
        }
        // console.log("Validation", allValid);
    });
    if (allValid) {
        formSubmission();
    }
}

/**
 * Form control input
 * @param {*} input 
 * @returns 
 */
function checkInput(input) {
    let valid = true;
    if (input.name === "first" && input.value.length < 2) {
        valid = false;
        message(input, errorMessages[input.name]);
    } else if (input.name === "last" && input.value.length < 2) {
        valid = false;
        message(input, errorMessages[input.name]);
    } else if (input.name === "email" && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.value)) {
        valid = false;
        message(input, errorMessages[input.name]);
    } else if (input.name === "message" && input.value.length <= 0) {
        valid = false;
        message(input, errorMessages[input.name]);
    } else {
        message(input, '');
    }
    return valid;
}
/**
 * Add error message
 * @param {*} input 
 * @param {*} errorMessage 
 */
function message(input, errorMessage) {
    const spanError = document.getElementById(input.name + '-error');
    if (spanError) {
        spanError.textContent = errorMessage;
    }
}

function displayModal(photographerName) {
    setPhotographerName(photographerName);
    modal.style.display = "block";
    trapFocus(modal);

    const firstFocusableElement = modal.querySelectorAll('input, button, span, [tabindex]:not([tabindex="-1"])')[0];
    firstFocusableElement.focus();
    document.querySelector('.close-modal').addEventListener('click', closeModal);

    document.querySelector('.close-modal').addEventListener('keydown', function (e) {
        // Activer avec Enter ou Espace
        if (e.key === 'Enter' || e.key === ' ') {
            closeModal();
            e.preventDefault(); // Empêche le défilement de la page pour la touche Espace
        }
    });
}

let lastFocusedElement;

function trapFocus(element) {
    const focusableEls = element.querySelectorAll('input, button, span, [tabindex]:not([tabindex="-1"])');
    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];

    element.addEventListener('keydown', function (e) {
        const isTabPressed = (e.key === 'Tab' || e.keyCode === 9);

        if (!isTabPressed) {
            return;
        }

        if (e.shiftKey) /* shift + tab */ {
            if (document.activeElement === firstFocusableEl) {
                lastFocusableEl.focus();
                e.preventDefault();
            }
        } else /* tab */ {
            if (document.activeElement === lastFocusableEl) {
                firstFocusableEl.focus();
                e.preventDefault();
            }
        }
    });
}

function closeModal() {
    modal.style.display = "none";
    if (lastFocusedElement) lastFocusedElement.focus();
}

function setPhotographerName(name) {
    const nameElement = document.querySelector('.name-photograph');
    if (nameElement) {
        nameElement.textContent = name;
    }
}

function formSubmission() {
    getFormContent();
    console.log('Formulaire soumis avec succès !', 'Données du formulaire :', formContent);
    closeModal();
    // Récupérer l'ID du photographe depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = urlParams.get('id');
    // console.log(photographerId);

    // Rediriger vers la même page avec l'ID du photographe : POSE PROBLEME 
    // window.location.href = `photographer.html?id=${photographerId}`;
    // Réinitialiser le formulaire
    form.reset();
}

const formContent = {};
function getFormContent() {

    form.querySelectorAll('input').forEach(input => {
        formContent[input.name] = input.value;
    });
    return formContent;
}

