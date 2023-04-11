const validationConfig = {
  formSelector: '.popup__content',
  inputSelector: '.popup__info',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_state_invalid',
  activeButtonClass: 'popup__submit_state_valid'
}

const enableValidation = ({ formSelector, ...rest }) => {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach(form => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    setEventListenersValidation(form, rest)
  })
}

const setEventListenersValidation = (formToValidate, { inputSelector, submitButtonSelector, ...rest }) => {
  const formInputs = Array.from(formToValidate.querySelectorAll(inputSelector))
  const formButton = formToValidate.querySelector(submitButtonSelector)
  disableButton(formButton, rest)
  formInputs.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(input);
    })
  if (hasInvalidInput(formInputs)) {
    disableButton(formButton, rest)
  } else {
    enableButton(formButton, rest)
  }
  });
}

const checkInputValidity = (input) => {
  const currentInputErrorContainer = document.querySelector(`#${input.id}-error`)
 if (input.checkValidity()) {
  currentInputErrorContainer.textContent = '';
 } else {
  currentInputErrorContainer.textContent = input.validationMessage;
 }
}

const hasInvalidInput = (formInputs) => {
  return formInputs.some (item => !item.validity.valid)
}

const enableButton = (button, { inactiveButtonClass, activeButtonClass }) => {
  button.classList.remove(inactiveButtonClass);
  button.classList.add(activeButtonClass);
  button.setAttribute('disabled', true);
}

const disableButton = (formButton, { inactiveButtonClass, activeButtonClass }) => {
  formButton.classList.add(inactiveButtonClass);
  formButton.classList.remove(activeButtonClass);
  formButton.removeAttribute('disabled', true);
}

enableValidation(validationConfig)


