export class Question {
    static create(question) {
        return fetch('https://auth-app-cb4e7-default-rtdb.firebaseio.com/questions.json', {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(response => {
            question.id = response.name;
            return question;
        })
        .then(addToLocalStorage)
        .then(this.renderList)
    }
    static renderList() {
        const questions = getQuestionsFromLocalStorage();

        const html = questions.length ? questions.map(toCard).join('') : `<div>No questions yet</div>`;

        const list = document.getElementById('list');
        list.innerHTML = html;
    }
}

function toCard(question) {
    return `
    <div class="mui--text-black-54">${new Date(question.date).toLocaleDateString()} ${new Date(question.date).toLocaleTimeString()}</div>
    <div>${question.text}</div>
    `
}

function addToLocalStorage(question) {
    const allQuestions = getQuestionsFromLocalStorage();
    allQuestions.push(question);
    localStorage.setItem('questions', JSON.stringify(allQuestions))
}

function getQuestionsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('questions') || '[]')
}