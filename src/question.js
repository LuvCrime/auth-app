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
    }
}

function addToLocalStorage(question) {
    const allQuestions = getQuestionsFromLocalStorage();
    allQuestions.push(question);
    localStorage.setItem('questions', JSON.stringify(allQuestions))
}

function getQuestionsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('questions') || '[]')
}