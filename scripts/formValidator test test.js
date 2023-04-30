export default class FormValidator {
  constructor (config, form) {
    this._config = config;
    this._form = form;

    this._inputList = Array.from(form.querySelectorAll(config.inputSelector));
    this._buttonElement = form.querySelector(config.submitButtonSelector);
  }

  enableValidation () {
    this._inputList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListenersForm();
    });
  }
  
  _setEventListenersForm () {
    this._disableButton(this._buttonElement);
    this._inputList.forEach((inputElement) => {
  
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        if (this._hasInvalidInput(this._inputList)) {
          this._disableButton(this._buttonElement);
        } else {
          this._enableButton(this._buttonElement)
        }
      });
    });
  };
  
  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };
  
  _showInputError (inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._config.errorClass)
  }
  
  _hideInputError (inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove(this._config.inputErrorClass)
    errorElement.classList.remove(this._config.errorClass)
    errorElement.textContent = ''
  }
  
  _hasInvalidInput(inputList) {
    return inputList.some(function (inputList) {
      return !inputList.validity.valid;
    })
  };
  
 _enableButton (button) {
    button.classList.remove(this._config.inactiveButtonClass);
    button.classList.add(this._config.activeButtonClass)
    button.removeAttribute('disabled')
  }
  
  _disableButton (button) {
    button.classList.add(this._config.inactiveButtonClass)
    button.classList.remove(this._config.activeButtonClass)
    button.setAttribute('disabled', true)
  }
  
  resetValidation () {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
      this._disableButton(this._buttonElement);
    });
  }

}