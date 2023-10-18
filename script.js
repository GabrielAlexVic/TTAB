const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");

import questions from "./questions.js";

let currentIndex = 0;
let MDQpoints = 0;
let HCRpoints = 0;
let SRApoints = 0;
let points = 0;

btnRestart.onclick = () => {
  content.style.display = "flex";
  contentFinish.style.display = "none";

  currentIndex = 0;
  MDQpoints = 0;
  HCRpoints = 0;
  SRApoints = 0;
  points = 0;


  loadQuestion();
};

function nextQuestion(e) {
  const correct = e.target.getAttribute("data-correct") === "true";

  if (correct) {
    if (currentIndex <= 3) {
      MDQpoints++;
      console.log("entrou MDQ");
    } else if (currentIndex >= 4 && currentIndex <= 6) {
      HCRpoints++;
      console.log("entrou HCR");
    } else if (currentIndex >= 7 && currentIndex <= 13) {
      SRApoints++;
      console.log("entrou SRA");
    }
  }
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion();
  } else {
    finish();
  }
}

function finish() {
  if(MDQpoints == 0 && HCRpoints <= 1 && SRApoints == 0) {
    textFinish.innerHTML = `Trata-se de um quadro NÃO SUGESTIVO <br> para Transtorno Afetivo Bipolar.<br>` + "Você marcou " + (MDQpoints+HCRpoints+SRApoints) + " de 14 questões.";
    content.style.display = "none";
    contentFinish.style.display = "flex";
  }
  else if(MDQpoints == 0 && HCRpoints <= 2 && SRApoints == 0) {
    textFinish.innerHTML = `Trata-se de um quadro POUCO SUGESTIVO <br> para Transtorno Afetivo Bipolar.<br>` + "Você marcou " + (MDQpoints+HCRpoints+SRApoints) + " de 14 questões.";
    content.style.display = "none";
    contentFinish.style.display = "flex";
  }
  else if(MDQpoints == 1 || HCRpoints <= 3) {
    textFinish.innerHTML = `Trata-se de um quadro SUGESTIVO <br> para Transtorno Afetivo Bipolar.<br>` + "Você marcou " + (MDQpoints+HCRpoints+SRApoints) + " de 14 questões.";
    content.style.display = "none";
    contentFinish.style.display = "flex";
  }
  else if(MDQpoints >= 2 || HCRpoints >= 4) {
    textFinish.innerHTML = `Trata-se de um quadro MUITO SUGESTIVO <br> para Transtorno Afetivo Bipolar.<br>` + "Você marcou " + (MDQpoints+HCRpoints+SRApoints) + " de 14 questões.";
    content.style.display = "none";
    contentFinish.style.display = "flex";
  }
   else {
     textFinish.innerHTML = `Nao caiu em nenhuma`;
     content.style.display = "none";
     contentFinish.style.display = "flex";
  }
  console.log("MDQ: ", MDQpoints," HCR: ", HCRpoints," SRA: ", SRApoints)
}

function loadQuestion() {
  spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`;
  const item = questions[currentIndex];
  answers.innerHTML = "";
  question.innerHTML = item.question;

  item.answers.forEach((answer) => {
    const div = document.createElement("div");

    div.innerHTML = `
        <button class="btn btn-primary button answer" data-correct="${answer.correct}">
          ${answer.option}
        </button>
    `;

    answers.appendChild(div);
  });

  document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", nextQuestion);
  });
}

loadQuestion();
