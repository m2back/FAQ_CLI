//Requirments
const fs = require("fs");
const term = require("terminal-kit").terminal;
// const stringSimilarity = require("string-similarity");

//Basic Configs
const faqFile = JSON.parse(fs.readFileSync("faq.json", "utf8"));
const faqs = faqFile.faqs;
const questions = faqs.map((faq) => faq.question);
const answers = faqs.map((faq) => faq.answer);

/**********************************Main Functions***************************************/
const findAnswer = (query) => {
  // const matches = stringSimilarity.findBestMatch(query, questions);
  let question = questions.find((q, index) => {
    if (q.toLowerCase().includes(query.toLowerCase())) {
      answer = answers[index];
      return true;
    }
  });
  if (!question)
    return {
      question: "Couldn't find any related question!",
      answer: "N/A",
    };
  return {
    question: question,
    answer: answer,
  };
};

/**********************************Terminal-Kit Pages***********************************/
const questionPage = () => {
  term.clear();
  term.cyan("Ask your Question Here:\n");
  term.inputField({ cancelable: true }, (error, input) => {
    if (input === "") {
      term.red("\n Please Enter Question or Press ESC to Exit.\n");
      questionPage();
    } else if (input !== undefined) {
      answerPage(input);
    } else {
      term.clear();
      process.exit();
    }
  });
};

const answerPage = (question) => {
  const aaOptions = ["Ask More Questions", "Exit"];
  term.gray("\nQuestion: ");
  term.red(findAnswer(question).question + "\n");
  term.gray("Answer: ");
  term.green(findAnswer(question).answer + "\n");
  term.singleColumnMenu(aaOptions, { cancelable: true }, (error, response) => {
    if (response.selectedIndex === 0) {
      questionPage();
    } else {
      term.clear();
      process.exit();
    }
  });
};

questionPage();
