const enableValidation = function (validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach(function (formElement) {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListenersForm(formElement, validationConfig);
  });
}

const setEventListenersForm = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationConfig)
      toggleButtonState(inputList, buttonElement, validationConfig)
    });
  });
};

const checkInputValidity = (formElement, inputElement, validationConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

const hasInvalidInput = function (inputList) {
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, validationConfig)
  } else {
    enableButton(buttonElement, validationConfig)
  }
}

const disableButton = function (button, validationConfig) {
  button.classlist.add(validationConfig.inactiveButtonClass)
  button.setAttribute('disabled')
}

const enableButton = function (button, validationConfig) {
  button.classlist.remove(validationConfig.inactiveButtonClass)
  button.setAttribute('disabled', true)
}

const showInputError = function (formElement, inputElement, errorMessage, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass)
}

const hideInputError = function (formElement, inputElement, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove(validationConfig.inputErrorClass)
  errorElement.classList.remove(validationConfig.errorClass)
  errorElement.textContent = ''
}

enableValidation(validationConfig);

const resetValidation = function (formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach(function (inputElement) {
    hideInputError(formElement, inputElement, validationConfig);
    toggleButtonState(inputList, buttonElement, validationConfig)
  });
}
