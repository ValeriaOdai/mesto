import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    //this._handleFormOpen = handleFormOpen;
    this._inputValue = this._popupSelector.querySelectorAll('.popup__info');
    this._form = this._popupSelector.querySelector('.popup__content');
  }

  _getInputValues() {
    this._inputs = {};
    this._inputValue.forEach((input) => {
      this._inputs[input.name] = input.value;
    });
    return this._inputs;
  }

  // closePopup() {
  //   this._form.reset();
  //   super.close();
  // }

  // setInputValues(data) {
  //   this._inputValue.forEach((item) => {
  //     item.value = data[item.name];
  //   })
  // }

  // openPopup() {
  //   super.openPopup();
  //   this._handleFormOpen();
  // }

  setEventListeners() {
    console.log('где листенеры')
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.closePopup();
    });
  }
}
