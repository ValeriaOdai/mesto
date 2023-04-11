
const showInputError = function (formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add('popup__info_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_active')
}

const hideInputError = function (formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove('popup__info_type_error')
  errorElement.classList.remove('popup__error_active')
  errorElement.textContent = ''
}

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListenersForm = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__info'));
  const buttonElement = formElement.querySelector('.popup__submit');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement)
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const hasInvalidInput = function (inputList) {
  return inputList.some(function (inputList) {
    return !inputList.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__submit_state_invalid');
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove('popup__submit_state_invalid');
    buttonElement.removeAttribute('disabled', true);
  }
}

const enableValidation = function () {
  const formList = Array.from(document.querySelectorAll('.popup__content'));
  formList.forEach(function (formElement) {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
//     const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
//     fieldsetList.forEach(function (fieldSet) {
//       setEventListeners(fieldSet);
//     });
//   });
// };
  setEventListenersForm(formElement);
});
}

enableValidation ();




// const validationConfig = {
//   formSelector: '.popup__content',
//   inputSelector: '.popup__info',
//   submitButtonSelector: '.popup__submit',
//   inactiveButtonClass: 'popup__submit_state_invalid',
//   activeButtonClass: 'popup__submit_state_valid'
// }

// const enableValidation = ({ formSelector, ...rest }) => {
//   const forms = Array.from(document.querySelectorAll(formSelector));
//   forms.forEach(form => {
//     form.addEventListener('submit', (evt) => {
//       evt.preventDefault()
//     })
//     setEventListenersValidation(form, rest)
//   })
// }

// const setEventListenersValidation = (formToValidate, { inputSelector, submitButtonSelector, ...rest }) => {
//   const formInputs = Array.from(formToValidate.querySelectorAll(inputSelector))
//   const formButton = formToValidate.querySelector(submitButtonSelector)
//   disableButton(formButton, rest)
//   formInputs.forEach(input => {
//     input.addEventListener('input', () => {
//       checkInputValidity(input);
//     })
//   if (hasInvalidInput(formInputs)) {
//     disableButton(formButton, rest)
//   } else {
//     enableButton(formButton, rest)
//   }
//   });
// }

// const checkInputValidity = (input) => {
//   const currentInputErrorContainer = document.querySelector(`#${input.id}-error`)
//  if (input.checkValidity()) {
//   currentInputErrorContainer.textContent = '';
//  } else {
//   currentInputErrorContainer.textContent = input.validationMessage;
//  }
// }



// const hasInvalidInput = (formInputs) => {
//   return formInputs.some (item => !item.validity.valid)
// }

// const enableButton = (formButton, { inactiveButtonClass, activeButtonClass }) => {
//   formButton.classList.remove(inactiveButtonClass);
//   formButton.classList.add(activeButtonClass);
//   formButton.setAttribute('disabled', true);
// }

// const disableButton = (formButton, { inactiveButtonClass, activeButtonClass }) => {
//   formButton.classList.add(inactiveButtonClass);
//   formButton.classList.remove(activeButtonClass);
//   formButton.removeAttribute('disabled', true);
// }

// enableValidation(validationConfig)


