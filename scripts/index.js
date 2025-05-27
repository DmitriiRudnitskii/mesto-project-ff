// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

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
