import { closeModal } from "./modal";
import { createCard } from "/src/index.js";
export const newCardForm = document.forms['new-place'];
const placeInput = newCardForm.elements['place-name'];
const linkInput = newCardForm.elements['link'];

export const addCard = (evt, popup) => {
  evt.preventDefault();
  const cardObject = {
    name: placeInput.value,
    link: linkInput.value,
  };
  const newCard = createCard(cardObject);
  document.querySelector(".places__list").prepend(newCard);
  closeModal(popup);
  newCardForm.reset();
}