import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupSelector.querySelector('.popup__content');
    this._inputValue = this._form.querySelectorAll('.popup__info');
    this._inputs = {};
  }

  _getInputValues() {
    this._inputValue.forEach((input) => {
      this._inputs[input.name] = input.value;
    });

    return this._inputs;
    console.log(this._inputs)
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.closePopup();
    });
  }

  closePopup() {
    super.closePopup();
    this._form.reset(); 
  }

}
