import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._photoInputImage = this._popup.querySelector('.popup__photo');
    this._photoInputName = this._popup.querySelector('.popup__caption');
  }

  openPopup(name, link) {
    super.openPopup();
    this._photoInputImage.src = link;
    this._photoInputImage.alt = name;
    this._photoInputName.textContent = name;
}
}