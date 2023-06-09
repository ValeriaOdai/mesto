import Popup from './Popup.js'

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._deleteButton = this._popup.querySelector('.popup__submit-delete-card')
  }

  setEventListeners() {
    super.setEventListeners();
    // this._deleteButton.addEventListener('submit', ())
  }
}