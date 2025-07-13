const showInputError = (form,input, errorMessage, objectSettings) => {
  const formError = form.querySelector(`.${input.id}-error`);
  input.classList.add(objectSettings.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(objectSettings.errorClass);

};
const hideInputError = (form,input, objectSettings) => {
  const formError = form.querySelector(`.${input.id}-error`);
  input.classList.remove(objectSettings.inputErrorClass);
  formError.classList.remove(objectSettings.errorClass);
  formError.textContent = "";
};
const checkInputValidity = (form, input, objectSettings) => {
  if (input.validity.patternMismatch) {
  input.setCustomValidity(input.dataset.errorMessage);
  } else{
    input.setCustomValidity("");
  }
  
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, objectSettings);
  } else {
    hideInputError(form,input, objectSettings);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};
const toggleButtonState = (inputList, button, objectSettings) => {
  if (hasInvalidInput(inputList)) {
    button.disabled = true;
    button.classList.add(objectSettings.inactiveButtonClass);
  } else {
    button.disabled = false;
    button.classList.remove(objectSettings.inactiveButtonClass);
  }
};



const setEvenListeners = (form, objectSettings)  => {
  const inputList = Array.from(form.querySelectorAll(objectSettings.inputSelector));
  const button = form.querySelector(objectSettings.submitButtonSelector);
  toggleButtonState(inputList, button, objectSettings);

  inputList.forEach((input) => {
  input.addEventListener("input", () => {
    checkInputValidity(form, input, objectSettings);
    toggleButtonState(inputList, button, objectSettings);
  });
  });
  
};



export function enableValidation(objectSettings) {
  const formList = Array.from(document.querySelectorAll(objectSettings.formSelector));
  formList.forEach((form) => {
    setEvenListeners(form, objectSettings);
  });

}

export const clearValidation = (form, objectSettings) => {
const inputList = Array.from(form.querySelectorAll(objectSettings.inputSelector));
inputList.forEach((input) => {
  hideInputError(form, input, objectSettings);
})};