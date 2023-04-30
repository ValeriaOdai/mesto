// const enableValidation = ({ formSelector, ...rest }) => {
//   const formList = Array.from(document.querySelectorAll(formSelector));
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//     });
//     setEventListenersForm(formElement, rest);
//   });
// }

// const setEventListenersForm = (formElement, { inputSelector, submitButtonSelector, ...rest }) => {
//   const inputList = Array.from(formElement.querySelectorAll(inputSelector));
//   const buttonElement = formElement.querySelector(submitButtonSelector);
//   disableButton(buttonElement, rest);
//   inputList.forEach((inputElement) => {

//     inputElement.addEventListener('input', () => {
//       checkInputValidity(formElement, inputElement, rest);
//       if (hasInvalidInput(inputList)) {
//         disableButton(buttonElement, rest);
//       } else {
//         enableButton(buttonElement, rest)
//       }
//     });
//   });
// };

// const checkInputValidity = (formElement, inputElement, { inputErrorClass, errorClass }) => {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, { inputErrorClass, errorClass });
//   } else {
//     hideInputError(formElement, inputElement, { inputErrorClass, errorClass });
//   }
// };

// const showInputError = function (formElement, inputElement, { inputErrorClass, errorClass }) {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
//   inputElement.classList.add(inputErrorClass);
//   errorElement.textContent = inputElement.validationMessage;
//   errorElement.classList.add(errorClass)
// }

// const hideInputError = function (formElement, inputElement, { inputErrorClass, errorClass }) {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
//   inputElement.classList.remove(inputErrorClass)
//   errorElement.classList.remove(errorClass)
//   errorElement.textContent = ''
// }

// const hasInvalidInput = function (inputList) {
//   return inputList.some(function (inputList) {
//     return !inputList.validity.valid;
//   })
// };

// const enableButton = (button, { inactiveButtonClass, activeButtonClass }) => {
//   button.classList.remove(inactiveButtonClass);
//   button.classList.add(activeButtonClass)
//   button.removeAttribute('disabled')
// }

// const disableButton = (button, { inactiveButtonClass, activeButtonClass }) => {
//   button.classList.add(inactiveButtonClass)
//   button.classList.remove(activeButtonClass)
//   button.setAttribute('disabled', true)
// }


// enableValidation(validationConfig);

// const resetValidation = function (formElement, { inputSelector, submitButtonSelector, ...rest }) {
//   const inputList = Array.from(formElement.querySelectorAll(inputSelector));
//   const buttonElement = formElement.querySelector(submitButtonSelector);
//   inputList.forEach(function (inputElement) {
//     hideInputError(formElement, inputElement, rest);
//     disableButton(buttonElement, rest);
//   });
// }
