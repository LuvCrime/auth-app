import "./style.css";
import { isValid, createModal } from "./utils";
import { Question } from "./question";
import { getAuthForm, authWithEmailAndPassword } from "./auth";

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
  document
    .getElementById("auth-form")
    .addEventListener("submit", authFormHandler, { once: true });
}

function authFormHandler() {
  event.preventDefault();

  const email = event.target.querySelector("#email").value;
  const password = event.target.querySelector("#password").value;
  authWithEmailAndPassword(email, password)
    .then(Question.getAllQuestions)
    .then(renderModalAfterAuth);
}

function renderModalAfterAuth(content) {
  if (typeof content === "string") {
    createModal("Error", content);
  } else {
    createModal("Questions list", Question.listToHTML(content));
  }
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
