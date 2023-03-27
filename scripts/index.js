const profileEditButton = document.querySelector('.profile__edit-button');
const popupElement = document.querySelector('.popup');
const popupCloseButton = popupElement.querySelector('.popup__close-button');
const popupSubmitButton = popupElement.querySelector('.popup__submit');
let formElement = document.querySelector('.popup__content');
let nameInput = formElement.querySelector('.popup__info_type_name');
let jobInput = formElement.querySelector('.popup__info_type_occupation');
let profileNameValue = document.querySelector('.profile__name');
let profileSubtitleValue = document.querySelector('.profile__subtitle')
const cardsSection = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;

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

initialCards.forEach(createCard);

function createCard(data) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__name').textContent = data.name;
  cardElement.querySelector('.element__photo').src = data.link;
  cardElement.querySelector('.element__photo').alt = data.name;
  cardsSection.append(cardElement);
};

function renderCard(data, cardsSection) {
  const cardElement = createCard(data);
  cardsSection.prepend(cardElement);
}


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

