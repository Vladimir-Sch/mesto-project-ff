import '/src/pages/index.css';
import {createCard, deleteCard, likeCard} from './card.js';
import {openModal, closeModal} from './modal.js';
import {enableValidation, clearValidation} from './validation.js';
import {getUserInfo, getInitialCards, updateUserInfo, addNewCard, updateAvatar} from './api.js';

// DOM узлы:
const placesList = document.querySelector('.places__list');
let userId; // ID пользователя от сервера

//Элементы профиля
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const profileTitleName = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');
const profileEditPopup = document.querySelector('.popup_type_edit');
const buttonCloseEditProfilePopup = profileEditPopup.querySelector('.popup__close');
const profileImage = profile.querySelector('.profile__image');

//Форма редактирования профиля
const profileEditForm = document.forms['edit-profile'];
const nameInput = profileEditForm.querySelector('.popup__input_type_name');
const profileDescInput = profileEditForm.querySelector('.popup__input_type_description');
const buttonProfileEdit = profileEditForm.querySelector('.popup__button');

// элементы для добавления новой карточки
const cardAddPopup = document.querySelector('.popup_type_new-card');
const cardAddForm = document.forms['new-place']; 
const cardNameInput = cardAddForm.querySelector('.popup__input_type_card-name');
const cardImgUrlInput = cardAddForm.querySelector('.popup__input_type_url');
const cardAddButton = profile.querySelector('.profile__add-button');
const cardClosePopup = cardAddPopup.querySelector('.popup__close');
const buttonCardAdd = cardAddForm.querySelector('.popup__button');

//Элементы изображений
const imageViewPopup = document.querySelector('.popup_type_image');
const popupImage = imageViewPopup.querySelector('.popup__image');
const popupImageCaption = imageViewPopup.querySelector('.popup__caption');
const popupCloseImage = imageViewPopup.querySelector('.popup__close');

const popupArr = [profileEditPopup, cardAddPopup, imageViewPopup];

//обновление аватара
const formUpdateAvatar = document.forms['new_avatar'];
const inputUrlAvatar = formUpdateAvatar.querySelector('.popup__input_type_url');
const buttonUpdateAvatar = formUpdateAvatar.querySelector('.popup__button');
const popupAvatarEdit = document.querySelector('.popup_new_avatar');
const popupCloseAvatar = popupAvatarEdit.querySelector('.popup__close');


const validationConfig = {
    formSelector: '.popup__form', // селектор форм
    inputSelector: '.popup__input', // селектор полей ввода
    submitButtonSelector: '.popup__button', // селектор кнопок отправки
    inactiveButtonClass: 'popup__button_disabled', // класс неактивной кнопки
    inputErrorClass: 'popup__input-error', //невалидное поле
    errorClass: 'popup__input-error_active' // видимое сообщения об ошибке
}

//открываем модальное окно редактирования профиля 
editButton.addEventListener('click', () => {
  nameInput.value = profileTitleName.textContent;
  profileDescInput.value = profileDescription.textContent;
  clearValidation(profileEditPopup, validationConfig);
  openModal(profileEditPopup);
});

buttonCloseEditProfilePopup.addEventListener('click', () => {
  closeModal(profileEditPopup);
});

//попап для смены аватара
profileImage.addEventListener('click', () => {
    inputUrlAvatar.value = '';
    clearValidation(popupAvatarEdit, validationConfig);
    openModal(popupAvatarEdit);
})

popupCloseAvatar.addEventListener('click', () => {
    closeModal(popupAvatarEdit);
})


//обработчик полей в форме профиля с валидацией
function handleFormEditProfile(evt) {
    evt.preventDefault();
    buttonProfileEdit.textContent = 'Сохранение...';
    buttonProfileEdit.disabled = true;
    const name = nameInput.value;
    const about = profileDescInput.value;
    updateUserInfo(name, about)
      .then((res) => {
        profileTitleName.textContent = res.name;
        profileDescription.textContent = res.about;
      })
      .catch((err) => {
        console.log(err);
        })
      .finally(() => {
        closeModal(profileEditPopup);
        buttonProfileEdit.textContent = 'Сохранить';
        buttonProfileEdit.disabled = false;
      });
}


profileEditForm.addEventListener('submit', handleFormEditProfile);

// @todo: Вывести карточки на страницу
Promise.all([getUserInfo(), getInitialCards()])
.then(([userProfile, initialCards]) => {
    userId = userProfile._id;
    profileTitleName.textContent = userProfile.name;
    profileDescription.textContent = userProfile.about;
    profileImage.style.backgroundImage = `url(${userProfile.avatar})`;

    initialCards.forEach((card) => {
        const newCard = createCard(
            card,
            deleteCard,
            likeCard,
            openImage,
            userId 
        );
        placesList.append(newCard);
    });
})
.catch((err) => {
    console.log(err);
});

//функция создания новой карточки с валидацией
function createNewCardSubmit(evt) {
    evt.preventDefault();
    buttonCardAdd.textContent = 'Сохранение...';
    buttonCardAdd.disabled = true;
    const card = {
        name: cardNameInput.value,
        link: cardImgUrlInput.value
    };
    addNewCard(card.name, card.link)
        .then((card) => {
            const newCard = createCard(
                card,
                deleteCard,
                likeCard,
                openImage, 
                userId
            );
            placesList.prepend(newCard); // в начало
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            closeModal(cardAddPopup);
            buttonCardAdd.textContent = 'Сохранить';
            buttonCardAdd.disabled = false;
        });
}

cardAddForm.addEventListener('submit', createNewCardSubmit);

//кнопка добавления карточки
cardAddButton.addEventListener('click', () => {
    cardNameInput.value = '';
    cardImgUrlInput.value = '';
    clearValidation(cardAddPopup, validationConfig);
    openModal(cardAddPopup);
});

cardClosePopup.addEventListener('click', () => {
    closeModal(cardAddPopup);
});

//функция открытия модального окна просмотра картинки
function openImage(evt) {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupImageCaption.textContent = evt.target.alt;
    openModal(imageViewPopup);
};

popupCloseImage.addEventListener('click', () => {
    closeModal(imageViewPopup);
})

//подключение анимации попапам
popupArr.forEach(popup => popup.classList.add('popup_is-animated'));

//функция обновления аватара
function submitChangeAvatar(evt) {
    evt.preventDefault();
// Получаем URL аватара из поля ввода
    const changeAvatar = inputUrlAvatar.value;
    renderLoading(true, buttonUpdateAvatar);
    buttonUpdateAvatar.disabled = true;

    // Отправляем запрос на сервер с новым аватаром
    updateAvatar(changeAvatar)
      .then((res) => {
        profileImage.style.backgroundImage = `url(${res.avatar})`;
        closeModal(popupAvatarEdit);
        evt.target.reset(); 
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, buttonUpdateAvatar);
        buttonUpdateAvatar.disabled = false;
      });
}

// изменение текста кнопки сохранения (UX)
function renderLoading(isLoading, button) {
    if (isLoading) {
      button.textContent = 'Сохранение...'; 
    } else {
      button.textContent = 'Сохранить'; 
    }
  }

formUpdateAvatar.addEventListener('submit', submitChangeAvatar);

enableValidation(validationConfig);

