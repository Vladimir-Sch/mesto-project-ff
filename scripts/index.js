// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard (cards, deleteCard) {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = newCard.querySelector('.card__image');
  const cardTitle = newCard.querySelector('.card__title');
    
  cardTitle.textContent = cards.name;
  cardImage.src = cards.link;
  cardImage.alt = cards.name;
  

  const cardDelButton = newCard.querySelector('.card__delete-button');
  cardDelButton.addEventListener('click', () => {deleteCard(newCard)});

  return newCard;
}

// @todo: Функция удаления карточки
function deleteCard (newCard) {
  newCard.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(item => {
  const newCard = createCard(item, deleteCard);
  placesList.append(newCard);
})