const quizApp = document.getElementById('quiz-app');

const questions = [
  {
    question: 'Hva heter ballen laget av gull i Rumpeldunk?',
    answers: ['Gullklumpen', 'Engelen', 'Gullsnoppen'],
    correctIndex: 2
  },
  {
    question: 'Knuckles\'s home country?',
    answers: ['USA', 'Uganda', 'Japan'],
    correctIndex: 1
  },
  {
    question: 'Who toucha my spaget?',
    answers: ['Somebody', 'Me', 'You'],
    correctIndex: 0
  },
  {
    question: 'Hvem har laget denne quizen?',
    answers: ['Julenissen', 'Amandus', 'Harry Potter'],
    correctIndex: 1
  },
  {
    question: 'Hvem vant VM i fotball i 2013?',
    answers: ['Tyskland', 'Spania', 'Ingen'],
    correctIndex: 2
  },
  {
    question: 'Er fysikken i filmen "Interstellar" korrekt?',
    answers: ['Ja', 'Nei', 'Delvis'],
    correctIndex: 0
  },
  {
    question: 'Hva står "GPU" for?',
    answers: ['Graphical Processing Unit', 'Graphics Processing Unit', 'GeoGebra Pro Utregner'],
    correctIndex: 1
  },
  {
    question: 'Svaret på livet, universet og alt mulig',
    answers: ['42', 'Ta det som det kommer', 'Finnes ikke noe svar'],
    correctIndex: 0
  }
];

let questionIndex = 0;
let correctAnswers = 0;

renderQuestion(questions[0]);

function renderQuestion(questionObject) {
  console.log(questionObject);
  let answerHtml = '';
  questionObject.answers.forEach((answer, index) => {
    answerHtml += `<button onclick="answer(${index})">${answer}</button>`;
  });
  quizApp.innerHTML = `<div>Question: <b>${questionObject.question}</b></div>
  ${answerHtml}`;
}

function renderResult() {
  quizApp.innerHTML = `<div>
  You answered correct on ${correctAnswers} out of ${questions.length} questions!
  </div>`;
}

function answer(index) {
  console.log('Answered', index);

  if (index === questions[questionIndex].correctIndex) {
    correctAnswers++;
  }

  questionIndex++;
  if (questionIndex >= questions.length) {
    renderResult();
    return;
  }

  renderQuestion(questions[questionIndex]);
}
