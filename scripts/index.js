const profileEditButton = document.querySelector('.profile__edit-button');
const popupElement = document.querySelector('.popup');
const popupCloseButton = popupElement.querySelector('.popup__close-button');
const popupSubmitButton = popupElement.querySelector('.popup__submit');
let formElement = document.querySelector('.popup__content');
let nameInput = formElement.querySelector('.popup__info_type_name');
let jobInput = formElement.querySelector('.popup__info_type_occupation');
let profileNameValue = document.querySelector('.profile__name');
let profileSubtitleValue = document.querySelector('.profile__subtitle')


function openPopup () {
  nameInput.value = profileNameValue.textContent;
  jobInput.value = profileSubtitleValue.textContent;
  popupElement.classList.add('popup_opened');
}

function closePopup () {
  popupElement.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileNameValue.textContent = nameInput.value;
  profileSubtitleValue.textContent = jobInput.value;
  closePopup();
}

profileEditButton.addEventListener('click', openPopup);

popupCloseButton.addEventListener('click', closePopup);

formElement.addEventListener('submit', handleFormSubmit); 