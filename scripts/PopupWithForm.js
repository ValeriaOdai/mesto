import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputValue = document.querySelectorAll('.popup__info');
    this._form = document.querySelector('.popup__content')
    this._inputs = {};
  }

  _getInputValues() {
    this._inputValue.forEach((input) => {
      return this._inputs[input.name] = input.value;
    });
    return this._inputs;
  }

  setInputValues() {
    this._inputValue.forEach((item) => {
      item.value = data[item.name];
    })
  }

  setEventListners() {
    super.setEventListners();
    this._form.addEventListener('submit', this._handleFormSubmit);
  }
}
