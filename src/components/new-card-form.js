import { toggleLikeHandler } from "./card.js";
import { showFullImage } from "./full-image.js";
import { closeModal } from "./modal.js";
import { createCard } from "./card.js";
import { addNewCard } from "./api.js";
import { addLikeCallback, deleteCardCallback } from "../index.js";
export const newCardForm = document.forms["new-place"];
const placeInput = newCardForm.elements["place-name"];
const linkInput = newCardForm.elements["link"];

export const addCard = (evt, popup) => {
  evt.preventDefault();

  addNewCard(placeInput.value, linkInput.value)
    .then((res) => {
      const cardObject = {
        name: res.name,
        link: res.link,
      };
  const newCard = createCard(cardObject, deleteCardCallback, addLikeCallback, showFullImage);
  newCard.querySelector('.card').setAttribute('data-id', res._id)
  document.querySelector(".places__list").prepend(newCard);
  closeModal(popup);
  newCardForm.reset();
})};
