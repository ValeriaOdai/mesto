const enableValidation = ({ formSelector, ...rest }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListenersForm(formElement, rest);
  });
}

const setEventListenersForm = (formElement, { inputSelector, submitButtonSelector, ...rest }) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  inputList.forEach((inputElement) => {
    disableButton(buttonElement, rest);
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement)
      if (hasInvalidInput(inputList)) {
        disableButton(buttonElement, rest);
      } else {
        enableButton(buttonElement, rest)
      }
    });
  });
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig.inputErrorClass, validationConfig.errorClass);
  } else {
    hideInputError(formElement, inputElement, validationConfig.inputErrorClass, validationConfig.errorClass);
  }
};

const showInputError = function (formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass)
}

const hideInputError = function (formElement, inputElement, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove(inputErrorClass)
  errorElement.classList.remove(errorClass)
  errorElement.textContent = ''
}

const hasInvalidInput = function (inputList) {
  return inputList.some(function (inputList) {
    return !inputList.validity.valid;
  })
};

const enableButton = (button, { inactiveButtonClass, activeButtonClass }) => {
  button.classList.remove(inactiveButtonClass);
  button.classList.add(activeButtonClass)
  button.removeAttribute('disabled')
}

const disableButton = (button, { inactiveButtonClass, activeButtonClass }) => {
  button.classList.add(inactiveButtonClass)
  button.classList.remove(activeButtonClass)
  button.setAttribute('disabled', true)
}


/* ТЕСТИРУЕМ ВЕБИНАР ХАЗА *//*
const toggleButtonState = (inputList, buttonElement, { inactiveButtonClass }) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled', true);
    buttonElement.classList.remove(inactiveButtonClass);
  }
}
*////////////////////////////////////


enableValidation(validationConfig);

// const resetValidation = function (formElement, { inputSelector, submitButtonSelector }, inactiveButtonClass, inputErrorClass, errorClass) {
//   const inputList = Array.from(formElement.querySelectorAll(inputSelector));
//   const buttonElement = formElement.querySelector(submitButtonSelector);
//   inputList.forEach(function (inputElement) {
//     hideInputError(formElement, inputElement, validationConfig.inputErrorClass, validationConfig.errorClass);
//     toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass)
//   });
// }
