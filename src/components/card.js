import { profileInfo, initialCards } from "../index.js";

const cardsTemplate = document.querySelector("#card-template").content;
export function createCard(cardObject, deleteCallback, likeCallback, showFullImageCallback) {
  const cardElement = cardsTemplate.cloneNode(true);
  ;
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  
  cardTitle.textContent = cardObject.name;
  cardImage.src = cardObject.link;
  cardImage.alt = cardObject.name;
  if (cardObject.likes.length > 0) {
    updateLikeCounter(cardElement, cardObject.likes.length);
  }

  if(cardObject.owner._id !== profileInfo._id) {
    cardDeleteButton.classList.add('card__delete-button-hidden');
  }

  if(cardObject.likes.some(like => like._id === profileInfo._id)) {
    toggleLike(cardLikeButton);
  }
  cardDeleteButton
    .addEventListener("click", (evt) => {
      const deleteCard = evt.target.closest(".card");
      deleteCallback(deleteCard);
    });
  cardLikeButton
    .addEventListener("click", likeCallback);
  cardImage.addEventListener("click", showFullImageCallback);
  return cardElement;
}

export function toggleLikeHandler(evt) {
  toggleLike(evt.target);
}

export function toggleLike(element) {
  element.classList.toggle("card__like-button_is-active");
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function updateLikeCounter(card, value) {
  const likeCounter = card.querySelector('.card__like-counter');
    likeCounter.textContent = value;

}
