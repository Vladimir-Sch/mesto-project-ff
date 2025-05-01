//функции для работы модульных окон (попапов)
function openModal(popup) {
  popup.classList.add('popup_is-opened'); 
  popup.addEventListener('click', closeModalOverlay);
  document.addEventListener('keydown', closeModalEsc);
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  popup.removeEventListener('click', closeModalOverlay);
  document.removeEventListener('keydown', closeModalEsc);
}

function closeModalOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
      closeModal(evt.target);
  }
}

function closeModalEsc(evt) {
  if (evt.key === 'Escape') {
      const popup = document.querySelector('.popup_is-opened');
      closeModal(popup);
  }
}

export {openModal, closeModal};