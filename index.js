const questionContainer = document.querySelector(".question");
const questionBtn = document.querySelector(".question-btn");
const answerBtn = document.querySelector(".answer-btn");
const answerSpn = document.querySelector(".answer");

const url = "https://api.jsonbin.io/b/5eda3e691f9e4e578817d386";

let data = null;
let len = null;
let flag = false;

const getData = () => {
  fetch(url)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error(`Ooops sometnig went wrong: status ${response.status}`);
      }
    })
    .then((response) => {
      const { jokes } = response;
      len = jokes.length;
      data = jokes;
    })
    .catch((err) => console.log(err));
};

const generateAnswer = (index) => {
  answerSpn.textContent = data[index].answer;
};

const generateQues = () => {
  if (data) {
    answerSpn.textContent = "";
    answerBtn.style.visibility = "visible";
    const index = Math.floor(Math.random() * len);
    const content = data[index].question;
    questionContainer.textContent = content;
    answerBtn.addEventListener("click", () => generateAnswer(index));
  } else return;
};

questionBtn.addEventListener("click", generateQues);

getData();
