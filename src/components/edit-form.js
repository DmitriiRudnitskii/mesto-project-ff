import { closeModal } from "./modal.js";
import { editUserInfo } from "./api.js";
import { renderLoading } from "../index.js";

export const editForm = document.forms["edit-profile"];
const nameInput = editForm.elements.name;
const jobInput = editForm.elements.description;
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
export function setValue() {
  jobInput.value = profileDescription.textContent;
  nameInput.value = profileName.textContent;
}

export const handleEditFormSubmit = (evt, popup) => {
  evt.preventDefault();
  renderLoading(true, evt.target);
  editUserInfo(nameInput.value, jobInput.value)
    .then((res) => {
      profileName.textContent = res.name;
      profileDescription.textContent = res.about;
      closeModal(popup);
    })
    .catch((err) => {
      console.error("Ошибка редактирования профиля", err);
    })
    .finally(() => {
      renderLoading(false, evt.target);
    });
};
