import "./style.css";
import { isValid, createModal } from "./utils";
import { Question } from "./question";
import { getAuthForm } from "./auth";

const modalButton = document.getElementById("modal-button");
const form = document.getElementById("form");
const input = form.querySelector("#question-input");
const submit = form.querySelector("#submit");

window.addEventListener("load", Question.renderList);
form.addEventListener("submit", submitFormHandler);
modalButton.addEventListener("click", openModal);
input.addEventListener("input", () => {
  submit.disabled = !isValid(input.value);
});

function openModal() {
  createModal("Authorization", getAuthForm());
}

function submitFormHandler(event) {
  event.preventDefault();

  if (isValid(input.value)) {
    submit.disabled = true;

    const question = {
      text: input.value.trim(),
      date: new Date().toJSON(),
    };

    Question.create(question).then(() => {
      input.value = "";
      input.className = "";
      submit.disabled = false;
    });
  }
}
