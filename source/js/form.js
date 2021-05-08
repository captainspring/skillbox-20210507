const form = document.querySelector('.register__form');

if (form) {
  const nameInput = form.querySelector('#applicant-name');
  const phoneInput = form.querySelector('#applicant-phone');
  const emailInput = form.querySelector('#applicant-email');
  const agreementCheckbox = form.querySelector('#applicant-data-agreement');
  const submitButton = form.querySelector('.form__submit-button');

  submitButton.addEventListener('click', function (evt) {
    if (!nameInput.value || !phoneInput.value || !emailInput.value || !agreementCheckbox.checked) {
      evt.preventDefault();

      if (!emailInput.value) {
        emailInput.focus();
      }

      if (!phoneInput.value) {
        phoneInput.focus();
      }

      if (!nameInput.value) {
        nameInput.focus();
      }
    }
  });
}
