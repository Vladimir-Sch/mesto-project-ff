// ошибка валидации для поля
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  config) => {
  //id поля + суффикс '-error'
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-error`); 
  //красная рамкой для невалидного поля
  inputElement.classList.add(config.inputErrorClass); 
  errorElement.textContent = errorMessage;
  //сообщение об ошибке видимо
  errorElement.classList.add(config.errorClass);
}

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = ''; // Очищаем текст ошибки
}

//проверка наличия невалидных полей
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => { //хотя бы одно
      return !inputElement.validity.valid;
  })
}

//проверка валидности поля
const isValid = (formElement, inputElement, config) => {
  //соответствие паттерна
  if(inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
      inputElement.setCustomValidity("");
  }
  //валидность поля
  if(!inputElement.validity.valid) {
      showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        config);
  } else {
      hideInputError(formElement, inputElement, config);
  }
}

//пеерключение состояния кнопки
const toggleButtonState = (inputList, buttonElement, config) => {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass); // добавить класс неактивной кнопки
    buttonElement.disabled = true; //откл кнопки
      
  } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(config.inactiveButtonClass);
  }
}

//установка обработчиков событий для формы
const setEventListeners = (formElement, config) => {
  // все поля ввода формы
  const inputList = Array.from( 
    formElement.querySelectorAll(config.inputSelector)
  );
  //кнопка отправки формы
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);
  //При вводе проверяем валидность поля и состояние кнопки
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

//включение валидации
export const enableValidation = (config) => {
  const formList = Array.from(
    document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

// очистка валидации формы
export const clearValidation = (formElement, config) => {
  const inputList = formElement.querySelectorAll(config.inputSelector); //все поля ввода формы
  const submitButton = formElement.querySelector(config.submitButtonSelector);
 
  submitButton.classList.add(config.inactiveButtonClass);
  submitButton.disabled = true;
  
  // очищаем ошибки
  inputList.forEach((input) => {
      hideInputError(formElement, input, config);
      input.setCustomValidity("");
 });
}