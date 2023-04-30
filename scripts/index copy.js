class CardTemplate {
  constructor (containterSelector) {
    this._container = document.querySelector(containerSelector);
  }

  addCard(card) {
    this._container.append(card);

  }
}

class CardItem {

  constructor (data) {
    this._data = data;
  }

  _onDelete = () => {
    this._card.remove()
  }

  _createCard () {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardPhotoElement = cardElement.querySelector('.element__photo');
  this._card = this.cardTemplate.querySelector('.element').cloneNode(true);
  this._card.querySelector('.element__name').textContent = this._data.name;

  this._card.querySelector('.element__delete-button').addEventListener('click', this._onDelete)
 }

  getCard () {
    this._createCard();
    return this._card; 
  }


}

/*********** */
class TodoForm {
  constructor (formSelector, onAddItem) {
    this._formSelector = formSelector;
    this._onAddItem = onAddItem;
    document.querySelector(this._formSelector).addEventListener('submit', this._onSubmot)

  }

  _onSubmit = (evt) => {
    evt.preventDefault();

    const data = Object.fromEntries(new FormData(evt.target));
    this._onAddItem(data);
    evt.target.reset();
  }

}

const todoForm = new TodoForm('#todo-form', (data) => {
  const cardItem = new CardItem(data, cardTemplate);
  const card = cardItem.getCard();
  cardTemplate.addCard(card);
});


/************* */

const cardTemplate = new CardTemplate('#card-template')
const cardItem = new CardItem({text: 'Имя места'})

const card = cardItem.getCard()

cardTemplate.addCard(card)
