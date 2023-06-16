import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__content');
    this._inputValue = this._form.querySelectorAll('.popup__info');
    this._submitButton = this._popup.querySelector('.popup__submit')
    this._submitButtonDefault = this._submitButton.textContent;
  }

  _getInputValues() {
    this._inputs = {};
    this._inputValue.forEach(input => {
      this._inputs[input.name] = input.value;
    });
    return this._inputs;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...'
    } else {
      this._submitButton.textContent = this._submitButtonDefault;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }
}
