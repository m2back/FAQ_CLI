//Requirments
const fs = require("fs");
const term = require("terminal-kit").terminal;
// const stringSimilarity = require("string-similarity");

//Basic Configs
const faqFile = JSON.parse(fs.readFileSync("faq.json", "utf8"));
const faqs = faqFile.faqs;

/**********************************Main Functions***************************************/
const findAnswer = (query_raw) => {
  query = query_raw.toLocaleLowerCase();

  let matched_faq = faqs.find((faq) => {
    return faq.question.toLocaleLowerCase().includes(query);
  });

  if (!matched_faq) {
    return {
      question: "Couldn't find any related question!",
      answer: "N/A",
    };
  }

  return matched_faq;
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
