const enableValidation = function ({ formSelector, ...rest }) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach(function (formElement) {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListenersForm(formElement, rest);
  });
}

const setEventListenersForm = (formElement, { inputSelector, submitButtonSelector, ...rest }) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  /*++*/disableButton(buttonElement, rest)
  //toggleButtonState(inputList, buttonElement, rest);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement)
      /* ++ но не помню, что было до */
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
    showInputError(formElement, inputElement, rest);
  } else {
    hideInputError(formElement, inputElement, rest);
  }
};

const hasInvalidInput = function (inputList) {
  return inputList.some(function (inputList) {
    return !inputList.validity.valid;
  })
};


/* НОВЫЙ КОД НА КНОПКУ */
const enableButton = function (button, { inactiveButtonClass }) {
  button.classlist.remove(inactiveButtonClass)
  buttonElement.setAttribute('disabled', true)
}

const disableButton = function (button, { inactiveButtonClass }) {
  button.classlist.add(inactiveButtonClass)
  button.setAttribute('disabled')
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

enableValidation(validationConfig);

const resetValidation = function (formElement, { inputSelector, submitButtonSelector }, inactiveButtonClass, inputErrorClass, errorClass) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  inputList.forEach(function (inputElement) {
    hideInputError(formElement, inputElement, validationConfig.inputErrorClass, validationConfig.errorClass);
    toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass)
  });
}
