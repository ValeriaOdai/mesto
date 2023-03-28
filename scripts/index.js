const popupSection = document.querySelector('.popup')
const profileEditButton = document.querySelector('.profile__edit-button');
const popupElement = document.querySelector('.popup_type_profile');
const cardsAddButton = document.querySelector('.profile__add-button');
const popupCardsElement = document.querySelector('.popup_type_card');
const popupCloseButton = popupElement.querySelector('.popup__close-button_type_profile');
const popupCardsCloseButton = popupCardsElement.querySelector('.popup__close-button_type_cards');
const popupSubmitButton = popupElement.querySelector('.popup__submit');
let formElement = document.querySelector('.popup__content_type_profile');
let formCardElement = document.querySelector('.popup__content_type_card');
let nameInput = formElement.querySelector('.popup__info_type_name');
let jobInput = formElement.querySelector('.popup__info_type_occupation');
let profileNameValue = document.querySelector('.profile__name');
let profileSubtitleValue = document.querySelector('.profile__subtitle')
const cardsSection = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;
let cardNameInput = document.querySelector('.popup__info_type_place-name');
let cardImageInput = document.querySelector('.popup__info_type_place-link');


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Алтай',
    link: 'https://images.unsplash.com/photo-1634206813058-44ccf5b33e50?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1051&q=80'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Владивосток',
    link: 'https://images.unsplash.com/photo-1604371601849-2fe991a86d0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1634&q=80'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

function createCard(data) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__name').textContent = data.name;
  cardElement.querySelector('.element__photo').src = data.link;
  cardElement.querySelector('.element__photo').alt = data.name;
  setEventListeners (cardElement);
  return cardElement;
}; 

function renderCard(item) {
  const cardElement = createCard(item);
  cardsSection.prepend(cardElement);
}

initialCards.forEach(function(item) {
  const card = createCard(item);
  cardsSection.append(card);
});


/**/function openProfilePopup () {
  nameInput.value = profileNameValue.textContent;
  jobInput.value = profileSubtitleValue.textContent;
  popupElement.classList.add('popup_opened');
}

/**/
function closeProfilePopup () {
  popupElement.classList.remove('popup_opened');
}  

/**/
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameValue.textContent = nameInput.value;
  profileSubtitleValue.textContent = jobInput.value;
  closeProfilePopup();
}

/**/
profileEditButton.addEventListener('click', openProfilePopup);
formElement.addEventListener('submit', handleProfileFormSubmit); 
popupCloseButton.addEventListener('click', closeProfilePopup);

/**/
function openCardsPopup () {
  popupCardsElement.classList.add('popup_opened');
}

/**/
function closeCardsPopup () {
  popupCardsElement.classList.remove('popup_opened');
}  

/**/
cardsAddButton.addEventListener('click', openCardsPopup);

/**/
function handleCardsFormSubmit(evt) {
  evt.preventDefault();
  const item = {name: cardNameInput.value, link: cardImageInput.value};
  renderCard(item);
  closeCardsPopup();
  evt.target.reset();
} 

/**/
popupCardsCloseButton.addEventListener('click', closeCardsPopup);

/**/
formCardElement.addEventListener('submit', handleCardsFormSubmit); 

function setEventListeners (cardElement) {
  cardElement.querySelector('.element__delete-button').addEventListener('click', handleCardDelete);
  cardElement.querySelector('.element__like-icon').addEventListener('click', handleCardLike);
}

function handleCardDelete (event) {
  event.target.closest('.element').remove();
}

function handleCardLike (event) {
  console.log('like');

 // event.target.closest('.element').classList.add('.')
}




 




