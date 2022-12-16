import './style.css';
import { isValid } from './utils';
import { Question } from './question';

const form = document.getElementById("form");
const input = form.querySelector("#question-input");
const submit = form.querySelector("#submit");

window.addEventListener('load', Question.renderList)
form.addEventListener('submit', submitFormHandler);
input.addEventListener('input', () => {
    submit.disabled = !isValid(input.value)
});

function submitFormHandler(event) {
    event.preventDefault();

    if(isValid(input.value)) {
        submit.disabled = true;

        const question = {
            text: input.value.trim(),
            date: new Date().toJSON(),
        }
        console.log(question, 'qqq')
        Question.create(question).then(() => {
            input.value = '';
            input.className = '';
            submit.disabled = false;
        })
    }
}
