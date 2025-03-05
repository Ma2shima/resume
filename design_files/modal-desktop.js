var contactForm = document.querySelector('.desktop-modal');
var btnSubmit = contactForm.querySelector('#submitform');
var inputName = contactForm.querySelector('#name');
var errorName = contactForm.querySelector('.nameInputError');
var inputProjectName = contactForm.querySelector('#project-desc');
var errorProjectName = contactForm.querySelector('.projectInputError');
var inputEmail = contactForm.querySelector('#email-field');
var errorEmail = contactForm.querySelector('.emailInputError');
var stepSuccess = document.querySelector(".step-success");

function nextStep(elem, error) {
    var validation = false;
    var r = /^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i;

    if (elem.id === 'email-field' && r.test(elem.value)) {
        validation = true;
    } else if (elem.id !== 'email-field' && elem.value !== '' && elem.value !== elem.getAttribute('data-attr')) {
        validation = true;
    } else {
        error.innerHTML = '<span>' + svg + error.getAttribute('data-attr') + '</span>';
    }

    return validation;
}

btnSubmit.addEventListener('click', function (e) {
    e.preventDefault();

    var validation = nextStep(inputName, errorName)
        && nextStep(inputEmail, errorEmail)
        && nextStep(inputProjectName, errorProjectName);

    if (validation) {
        setTimeout(function () {
            stepSuccess.classList.add('slideup-submit-success');
        }, 1000);

        setTimeout(function () {
            closeModal();
        }, 2000);
    }
});

// svg-icon
var svg = '<svg width="18" height="18" viewBox="0 0 22 22"><g fill="#e0e0e0"><path d="M20 11a9 9 0 0 1-9 9v2c6.075 0 11-4.925 11-11zm-9 9a9 9 0 0 1-9-9H0c0 6.075 4.925 11 11 11zm-9-9a9 9 0 0 1 9-9V0C4.925 0 0 4.925 0 11zm9-9a9 9 0 0 1 9 9h2c0-6.075-4.925-11-11-11zM10 15a1 1 0 0 0 2 0zm2-4a1 1 0 1 0-2 0zm0 4v-4h-2v4zM11 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></g></svg>';
