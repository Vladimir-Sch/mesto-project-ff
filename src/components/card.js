//Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
function createCard (
  cards,
  deleteCard,
  likeCardToggle,
  openImage  
) {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = newCard.querySelector('.card__image');
  const cardTitle = newCard.querySelector('.card__title');
    
  cardTitle.textContent = cards.name;
  cardImage.src = cards.link;
  cardImage.alt = cards.name;
  

  const cardDelButton = newCard.querySelector('.card__delete-button');
  cardDelButton.addEventListener('click', () => {deleteCard(newCard)});

  const cardLikeButton = newCard.querySelector('.card__like-button');
  cardLikeButton.addEventListener('click', likeCardToggle);
  cardImage.addEventListener('click', (evt) => {openImage(evt)});

  return newCard;
}

// @todo: Функция удаления карточки
function deleteCard (newCard) {
  newCard.remove();
}

// Функция like карточки
function likeCardToggle(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export {createCard, deleteCard, likeCardToggle};