import Popup from './Popup.js'

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formConfirmation = this._popup.querySelector('.popup__content_type_confirmation');
    this._submitButton = this._popup.querySelector('.popup__submit-delete-button')
  }

  openPopup(element, elementId) {
    super.openPopup();
    this._element = element,
    this._elementId = elementId;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formConfirmation.addEventListener('submit', (evt) => {
      console.log('click')
      evt.preventDefault();
      this._handleFormSubmit(this._element, this._elementId);
      super.closePopup();
    })
  }

}