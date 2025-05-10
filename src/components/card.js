import {deleteNewCard, toggleLike} from "./api.js";
//Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки с валидацией
function createCard (
  cards,
  deleteCard,
  likeCard,
  openImage,
  userId  
) {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = newCard.querySelector('.card__image');
  cardImage.src = cards.link;
  cardImage.alt = cards.name;
  
  const cardTitle = newCard.querySelector('.card__title');
  cardTitle.textContent = cards.name;
  
   
  const cardDelButton = newCard.querySelector('.card__delete-button');
  if(cards.owner._id === userId) {
    cardDelButton.classList.remove('card__delete-button_off');
    cardDelButton.addEventListener('click', (evt) => {
        deleteCard(evt.target, cards._id);
    })
  } else {
  cardDelButton.classList.add('card__delete-button_off');
  }

  const cardLikeButton = newCard.querySelector('.card__like-button');
  const cardLikeCount = newCard.querySelector('.card__like_count');
  cardLikeCount.textContent = cards.likes.length;
  checkActiveLike(cards, cardLikeButton, userId);
    cardLikeButton.addEventListener('click', () => {
      likeCard(cardLikeButton, cardLikeCount, cards._id);
    });
       
  cardImage.addEventListener('click', (evt) => {openImage(evt)});

  return newCard;
}

function checkActiveLike(cards, cardLikeButton, userId) {
  if(cards.likes.some((like) => like._id === userId)) {
      cardLikeButton.classList.add('card__like-button_is-active');
  }
}

// @todo: Функция удаления карточки
function deleteCard (cardDelButton, cardId) {
  const newCard = cardDelButton.closest('.card');
  deleteNewCard(cardId)
        .then(() => {
          newCard.remove();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        });
}

// *Функция like карточки*
function likeCard(cardLikeButton, likeCounter, cardId) {
  const isLiked = cardLikeButton.classList.contains('card__like-button_is-active');
  
  // Отправляем запрос на постановку/снятие лайка
  toggleLike(cardId, !isLiked)
    .then((res) => {
      likeCounter.textContent = res.likes.length;
      cardLikeButton.classList.toggle('card__like-button_is-active');
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}

export {createCard, deleteCard, likeCard};