import { editAvatar } from "./api.js";
import { closeModal } from "./modal.js";
import { renderLoading } from "../index.js";
export const  avatarForm = document.forms["avatar"];
const avatarInput = avatarForm.elements["link"];

export const handleAvatarFormSubmit = (evt, popup) => {
  evt.preventDefault();
  const profileImage = document.querySelector(".profile__image");
  let backgroundImage;
    renderLoading(true, evt.target);
  editAvatar(avatarInput.value)
    .then((res) => {
      backgroundImage = `url(${res.avatar})`;
      profileImage.style.backgroundImage = backgroundImage;
      closeModal(popup);
    })
    .catch((err) => {
      console.error("Ошибка редактирования аватара", err);
    })
    .finally(() => {
      renderLoading(false, evt.target);
    });
}

