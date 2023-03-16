const profileEditButton = document.querySelector('.profile__edit-button');
const popupElement = document.querySelector('.popup');
const popupCloseButton = popupElement.querySelector('.popup__close-button');

const openPopup = function () {
popupElement.classList.toggle('popup_opened');
};

profileEditButton.addEventListener('click', openPopup);

popupCloseButton.addEventListener('click', openPopup);

let formElement = document.querySelector('.popup__content'); 
let nameInput = formElement.querySelector('.popup__name'); 
let jobInput = formElement.querySelector('.popup__subtitle'); 


function handleFormSubmit (evt) {
    evt.preventDefault(); 
    let profileNameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;
    
    let profileNameValue = document.querySelector('.profile__name');
    let profileSubtitleValue = document.querySelector('.profile__subtitle');
   
    profileNameValue.textContent = profileNameInputValue;
    profileSubtitleValue.textContent = jobInputValue; 
  }

formElement.addEventListener('submit', handleFormSubmit); 