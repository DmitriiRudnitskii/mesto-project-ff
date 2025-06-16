// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import '/src/index.css';
import {initialCards} from '/src/cards.js';
import { openModal, closeModal, addListener} from './components/modal.js';
const editBtn = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const closeBtn = document.querySelector('.popup__close');
const cardsTemplate = document.querySelector("#card-template").content;
function createCard(cardObject, deleteCallback) {
  const cardElement = cardsTemplate.cloneNode(true);
  cardElement.querySelector(".card__title").textContent = cardObject.name;
  cardElement.querySelector(".card__image").src = cardObject.link;
  cardElement.querySelector(".card__image").alt = cardObject.name;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", (evt) => {
      const deleteButton = evt.target.closest('.card');
      deleteCallback(deleteButton);
    });

  return cardElement;
}

initialCards.forEach((card) =>
  document.querySelector(".places__list").append(createCard(card, deleteCard)),
);

function deleteCard(cardElement) {
  cardElement.remove();
}
editBtn.addEventListener('click', ()=>{
    openModal(popupEdit);
});
addListener(popupEdit, closeBtn);
addListener(popupNewCard, closeBtn);
addListener(popupImage, closeBtn);