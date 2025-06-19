// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import "/src/index.css";
import { initialCards } from "./components/cards.js";
import { openModal, addListener } from "./components/modal.js";
import { editForm, handleEditFormSubmit } from "./components/edit-form.js";
import { newCardForm, addCard } from "./components/new-card-form.js";
import { createCard, toggleLike } from "./components/card.js";
import { showFullImage } from "./components/full-image.js";
import { deleteCard } from "./components/card.js";

const editBtn = document.querySelector(".profile__edit-button");
const addBtn = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
export const popupFullImage = document.querySelector(".popup_type_image");
const closeBtnEdit = popupEdit.querySelector(".popup__close");
const closeBtnNewCard = popupNewCard.querySelector(".popup__close");
const closeBtnFullImage = popupFullImage.querySelector(".popup__close");

initialCards.forEach((card) =>
  document
    .querySelector(".places__list")
    .append(createCard(card, deleteCard, toggleLike, showFullImage)),
);

editBtn.addEventListener("click", () => {
  openModal(popupEdit);
});
addBtn.addEventListener("click", () => {
  openModal(popupNewCard);
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
