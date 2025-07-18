// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import "/src/index.css";
import { openModal, addListener } from "./components/modal.js";
import {
  editForm,
  handleEditFormSubmit,
  setValue,
} from "./components/edit-form.js";
import { newCardForm, addCard } from "./components/new-card-form.js";
import {
  avatarForm,
  handleAvatarFormSubmit,
} from "./components/avatar-form.js";
import { createCard, toggleLikeHandler } from "./components/card.js";
import { showFullImage } from "./components/full-image.js";
import { deleteCard, updateLikeCounter } from "./components/card.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getInitialCards,
  getUserInfo,
  deleteCardRequest,
  addLike,
  deleteLike,
} from "./components/api.js";

const editBtn = document.querySelector(".profile__edit-button");
const addBtn = document.querySelector(".profile__add-button");
const avatar = document.querySelector(".profile__image");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
export const popupFullImage = document.querySelector(".popup_type_image");
const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");
const closeBtnEdit = popupEdit.querySelector(".popup__close");
const closeBtnNewCard = popupNewCard.querySelector(".popup__close");
const closeBtnFullImage = popupFullImage.querySelector(".popup__close");
export const renderLoading = (isLoading, form) => {
  const submitButton = form.querySelector(".popup__button");
  if (isLoading) {
    submitButton.textContent = "Сохранение...";
  } else {
    submitButton.textContent = "Сохранить";
  }
};
export const closeBtnEditAvatar =
  popupEditAvatar.querySelector(".popup__close");
const objectSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_active",
};
export let initialCards = [];
export let profileInfo;
export const deleteCardCallback = (card) => {
  deleteCardRequest(card.dataset.id);
  deleteCard(card);
};
export const addLikeCallback = (evt) => {
  const likedCard = evt.target.closest(".card");
  const cardLikeButton = likedCard.querySelector(".card__like-button");
  if (cardLikeButton.classList.contains("card__like-button_is-active")) {
    deleteLike(likedCard.dataset.id)
      .then((result) => {
        updateLikeCounter(likedCard, result.likes.length);
        toggleLikeHandler(evt);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
     addLike(likedCard.dataset.id)
      .then((result) => {
        updateLikeCounter(likedCard, result.likes.length);
        toggleLikeHandler(evt);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  
};

editBtn.addEventListener("click", () => {
  openModal(popupEdit);
  setValue();
  clearValidation(editForm, objectSettings);
});
addBtn.addEventListener("click", () => {
  openModal(popupNewCard);
  newCardForm.reset();
  clearValidation(newCardForm, objectSettings);
});
avatar.addEventListener("click", () => {
  openModal(popupEditAvatar);
  avatarForm.reset();
  clearValidation(popupEditAvatar, objectSettings);
});
addListener(popupEdit, closeBtnEdit);
addListener(popupNewCard, closeBtnNewCard);
addListener(popupFullImage, closeBtnFullImage);
addListener(popupEditAvatar, closeBtnEditAvatar);
editForm.addEventListener("submit", (evt) => {
  handleEditFormSubmit(evt, popupEdit);
});
newCardForm.addEventListener("submit", (evt) => {
  addCard(evt, popupNewCard);
});
avatarForm.addEventListener("submit", (evt) => {
  handleAvatarFormSubmit(evt, popupEditAvatar);
});
enableValidation(objectSettings);

const promises = [getUserInfo(), getInitialCards()];
Promise.all(promises)
  .then((results) => {
    const [userInfo, cards] = results;
    initialCards = cards;
    profileInfo = userInfo;
    cards.forEach((card) => {
      const cardElement = createCard(
        card,
        deleteCardCallback,
        addLikeCallback,
        showFullImage,
        profileInfo._id,
      );
      cardElement.querySelector(".card").setAttribute("data-id", card._id);
      document.querySelector(".places__list").append(cardElement);
    });

    const avatar = document.querySelector(".profile__image");
    const name = document.querySelector(".profile__title");
    const description = document.querySelector(".profile__description");
    avatar.style.backgroundImage = `url(${userInfo.avatar})`;
    name.textContent = userInfo.name;
    description.textContent = userInfo.about;
  })
  .catch((err) => {
    console.error(err);
  });
