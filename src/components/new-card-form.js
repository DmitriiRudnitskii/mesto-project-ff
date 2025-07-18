import { showFullImage } from "./full-image.js";
import { closeModal } from "./modal.js";
import { createCard } from "./card.js";
import { addNewCard } from "./api.js";
import {
  addLikeCallback,
  deleteCardCallback,
  renderLoading,
  initialCards,
} from "../index.js";
export const newCardForm = document.forms["new-place"];
const placeInput = newCardForm.elements["place-name"];
const linkInput = newCardForm.elements["link"];

export const addCard = (evt, popup) => {
  evt.preventDefault();
  renderLoading(true, evt.target);
  addNewCard(placeInput.value, linkInput.value)
    .then((res) => {
      const cardObject = res;
      // initialCards.unshift(cardObject);
      const newCard = createCard(
        cardObject,
        deleteCardCallback,
        addLikeCallback,
        showFullImage,
        cardObject.owner._id,
      );
      newCard.querySelector(".card").setAttribute("data-id", res._id);
      document.querySelector(".places__list").prepend(newCard);
      closeModal(popup);
      newCardForm.reset();
    })
    .catch((err) => {
      console.error("Ошибка добавления карточки", err);
    })
    .finally(() => {
      renderLoading(false, evt.target);
    });
};
