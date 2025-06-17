// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import '/src/index.css';
import {initialCards} from '/src/cards.js';
import { openModal, closeModal, addListener} from './components/modal.js';
import { editForm, handleEditFormSubmit } from './components/edit-form.js';
import { newCardForm, addCard } from './components/new-card-form.js';
const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const closeBtnEdit = popupEdit.querySelector('.popup__close');
const closeBtnNewCard = popupNewCard.querySelector('.popup__close');
const closeBtnImage = popupImage.querySelector('.popup__close');
const cardsTemplate = document.querySelector("#card-template").content;
export function createCard(cardObject) {
  const cardElement = cardsTemplate.cloneNode(true);
  cardElement.querySelector(".card__title").textContent = cardObject.name;
  cardElement.querySelector(".card__image").src = cardObject.link;
  cardElement.querySelector(".card__image").alt = cardObject.name;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", (evt) => {
      const deleteButton = evt.target.closest('.card');
      deleteCard(deleteButton);
    });

  return cardElement;
}

initialCards.forEach((card) =>
  document.querySelector(".places__list").append(createCard(card)),
);

function deleteCard(cardElement) {
  cardElement.remove();
}
editBtn.addEventListener('click', ()=>{
    openModal(popupEdit);
});
addBtn.addEventListener('click', () => {
  openModal(popupNewCard);
});
addListener(popupEdit, closeBtnEdit);
addListener(popupNewCard, closeBtnNewCard);
addListener(popupImage, closeBtnImage);
editForm.addEventListener('submit', (evt) => {
  handleEditFormSubmit(evt, popupEdit);
});
newCardForm.addEventListener('submit', (evt) => {
  addCard(evt, popupNewCard);
}
);