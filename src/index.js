// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import "/src/index.css";
import { initialCards } from "./components/cards.js";
import { openModal, addListener } from "./components/modal.js";
import { editForm, handleEditFormSubmit, setValue } from "./components/edit-form.js";
import { newCardForm, addCard } from "./components/new-card-form.js";
import { createCard, toggleLike } from "./components/card.js";
import { showFullImage } from "./components/full-image.js";
import { deleteCard } from "./components/card.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {getInitialCards, getUserInfo} from "./components/api.js";

const editBtn = document.querySelector(".profile__edit-button");
const addBtn = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
export const popupFullImage = document.querySelector(".popup_type_image");
const closeBtnEdit = popupEdit.querySelector(".popup__close");
const closeBtnNewCard = popupNewCard.querySelector(".popup__close");
const closeBtnFullImage = popupFullImage.querySelector(".popup__close");
const objectSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active',
};


editBtn.addEventListener("click", () => {
  openModal(popupEdit);
  setValue();
  clearValidation(editForm, objectSettings)});
addBtn.addEventListener("click", () => {
  openModal(popupNewCard);
  newCardForm.reset();
  clearValidation(newCardForm, objectSettings);
});
addListener(popupEdit, closeBtnEdit);
addListener(popupNewCard, closeBtnNewCard);
addListener(popupFullImage, closeBtnFullImage);
editForm.addEventListener("submit", (evt) => {
  handleEditFormSubmit(evt, popupEdit);
});
newCardForm.addEventListener("submit", (evt) => {
  addCard(evt, popupNewCard);
});
enableValidation(objectSettings);

const promises = [getUserInfo(), getInitialCards()];
Promise.all(promises)
  .then(results => {
    const [userInfo, cards] = results;
    cards.forEach((card) => {
      document
        .querySelector(".places__list")
        .append(createCard(card, deleteCard, toggleLike, showFullImage));
    });
    const avatar = document.querySelector('.profile__image');
    const name = document.querySelector('.profile__title');
    const description = document.querySelector('.profile__description');
    avatar.src = userInfo.avatar;
    name.textContent = userInfo.name;
    description.textContent = userInfo.about;
  });
