import '/src/pages/index.css';
import {createCard, deleteCard, likeCardToggle} from './card.js';
import {openModal, closeModal} from './modal.js';
import {initialCards} from './cards.js';

// DOM узлы:
const placesList = document.querySelector('.places__list');

//Элементы профиля
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const profileTitleName = profile.querySelector('.profile__title');
const profileJob = profile.querySelector('.profile__description');
const profileEditPopup = document.querySelector('.popup_type_edit');
const buttonCloseEditProfilePopup = profileEditPopup.querySelector('.popup__close');

//Форма редактирования профиля
const profileEditForm = document.forms['edit-profile'];
const nameInput = profileEditForm.querySelector('.popup__input_type_name');
const jobInput = profileEditForm.querySelector('.popup__input_type_description');

//открываем модальное окно редактирования профиля 
editButton.addEventListener('click', () => {
  nameInput.value = profileTitleName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(profileEditPopup);
});

buttonCloseEditProfilePopup.addEventListener('click', () => {
  closeModal(profileEditPopup);
});

//обработчик полей в форме профиля
function handleFormEditProfile(evt) {
    evt.preventDefault();
    profileTitleName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closeModal(profileEditPopup);
}

profileEditForm.addEventListener('submit', handleFormEditProfile);

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
    const newCard = createCard(
        card,
        deleteCard,
        likeCardToggle,
        openImage 
    );
    placesList.append(newCard);
})

// элементы для добавления новой карточки
const cardAddPopup = document.querySelector('.popup_type_new-card');
const cardAddForm = document.forms['new-place']; 
const cardNameInput = cardAddForm.querySelector('.popup__input_type_card-name');
const cardImgUrlInput = cardAddForm.querySelector('.popup__input_type_url');

//функция создания новой карточки
function createNewCardSubmit(evt) {
    evt.preventDefault();
    const card = {};
    card.name = cardNameInput.value;
    card.link = cardImgUrlInput.value;
    const newCard = createCard(
        card,
        deleteCard,
        likeCardToggle,
        openImage 
    );
    placesList.prepend(newCard); // в начало
    closeModal(cardAddPopup);
    evt.target.reset(); // Очищаем поля ввода
}

cardAddForm.addEventListener('submit', createNewCardSubmit);

//кнопка добавления карточки
const cardAddButton = profile.querySelector('.profile__add-button');
cardAddButton.addEventListener('click', () => {
    openModal(cardAddPopup);
});

const cardClosePopup = cardAddPopup.querySelector('.popup__close');
cardClosePopup.addEventListener('click', () => {
    closeModal(cardAddPopup);
});

//Элементы изображений
const imageViewPopup = document.querySelector('.popup_type_image');
const popupImage = imageViewPopup.querySelector('.popup__image');
const popupImageCaption = imageViewPopup.querySelector('.popup__caption');

//функция открытия модального окна просмотра картинки
function openImage(evt) {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupImageCaption.textContent = evt.target.alt;
    openModal(imageViewPopup);
};

const popupCloseImage = imageViewPopup.querySelector('.popup__close');
popupCloseImage.addEventListener('click', () => {
    closeModal(imageViewPopup);
})

//подключение анимации попапам
const popupArr = [profileEditPopup, cardAddPopup, imageViewPopup];
popupArr.forEach(popup => popup.classList.add('popup_is-animated'));







