let questions = [];
let answers = [];
let showText = 1;
let currentquestion = 7;
let documents1;
let ToggleFunctionLoop = 0;
let numOfQuestionsCorrect = 0;
let numOfQuestionsIncorrect = 0;
let attempts = 0;
let allowCorrect = 1;
let percentageCorrect = 0;
let Countdown = 90;
let done = false;
function setup() {
  new Canvas(800, 400);

  character = new Sprite(400, 0, 50);
  character.color = (205, 127, 50);

  table = new Sprite(395, 307, 150, 75);
  table.color = (205, 127, 50);
  character.overlap(allSprites);

  question = new Sprite(600, 307, 80, 35);
  question.textSize = 15;
  question.text = "Question";
  question.textColor = "white";
  question.color = "indigo";
  question.overlap(table);
  question.opacity = 0;

  proceed = new Sprite(600, 307, 80, 35);
  proceed.textSize = 15;
  proceed.text = "Proceed  >";
  proceed.textColor = "white";
  proceed.color = "indigo";
  proceed.overlap(table);

  reply = new Sprite(600, 307, 80, 35);
  reply.textSize = 15;
  reply.text = "Reply";
  reply.textColor = "white";
  reply.color = "indigo";
  reply.overlap(table);
  reply.opacity = 0;

  document1 = new Sprite(400, 307, 20, 35);
  document1.color = "gray";
  document1.overlap(table);
  document1.opacity = 0;
  document1.overlap(character);
  character.moveTo(table.x, table.y - 100, 3);

  exitAnswering = new Sprite(100, 100, 30, 30);
  exitAnswering.color = "red";
  exitAnswering.text = "X";
  exitAnswering.textSize = 32;
  exitAnswering.textColor = "white";
  exitAnswering.opacity = 0;

  questions = [
    "Hello, my name is Sarah, and I need help with financial calculations on buying a house. I would like to know how much I will need to borrow from the bank. Here is the payement information. Please hover over my document to read.",
    "Thank you, could you also show me how much mortage will I have to pay every month? ",
    "Happy New Year 2024! This Stradivarius violin was now worth $6 million. Could you find the rate of appreciation this violin had? (Inflation doesn’t exist) Round to the nearest thousandth in percentage form",
    "Hi, I’m broke. Here’s the car that I bought. It depreciated 11% after I bought it. The second year, it depreciates by 25%. This trend continues until it is the fifth year, when it starts depreciating by 37%. How much is my car worth now?",
    "Hey, I am Daniel Wu, here is my budget, would I be able to sustain an extra $2000 in rent? My landlord is so annoying with these price raises. Answer Y or N Thank you!",
    "Hey, I'm Daniel Wu like 10 years later, here’s my budget, would I be able to buy this house that’s worth 200000  in 5 months (one-time buy) with my current budget? Answer “Y” or “N”. Thanks!",
    "Hi I am Benyang Fu(yoh!!) and the Commonwealth Bank of Canada is paying me a dividend. I have 5000 shares, how much will I get payed? Here’s the information given by CBC.",
    "I need help with stocks!1!!11! The share price for Pfizer just increased and I need to know the dividend per share NOW!",
    "You've finished all questions!",
  ];
  answers = ["240000", "1211.67", "1.233", "939.02", "Y", "N", "11100", "3.68"];
  documents1Array = [
    "HOUSE INFORMATION: <br> SALE VALUE: $300 000 CAD <br> DOWNPAYEMENT: 20% <br> BANK OFFERS: <br> FIXED RATE MORTAGE: 80% <br> INTEREST RATE: ANNUAL 4.5% 30 YEAR FIXED RATE ",
    "HOUSE INFORMATION: <br> SALE VALUE: $300 000 CAD <br> DOWNPAYEMENT: 20% <br> BANK OFFERS: <br> FIXED RATE MORTAGE: 80% <br> INTEREST RATE: ANNUAL 4.5% 30 YEAR FIXED RATE ",
    "VIOLIN INFORMATION: <br> Luthier: Antonio Stradivari <br> SALE VALUE: $100k <br> TIME SOLD: Year 1680 <br>TIME MADE: Year 1679",
    "CAR INFO: <br> TIME PURCHASED: 2014 <br> PRICE SOLD: $40 000 CAD <br>",
    "MONTHLY BUDGET! <br> <u>Income (10% tax)</u> <br> X-ray Technician: $6000 <br><u>Expenses</u> <br> Rent: $2429 <br> Food: $297 <br> Basic Utilities: $199.02 Internet: $85.81 <br> Entertainment: $94.46",
    "MONTHLY BUDGET! <br> <u>Income (10% tax)</u> <br> Surgeon: $34 055 <br><u>Expenses</u> <br> Mortgage: $2000  <br> Food: $400 <br> Basic Utilities: $200.02, Internet: $100.81 <br> Entertainment: $100.46",
    "Commonwealth Bank of Banana <br> Thank you for buying our shares! <br> Shares dividend: $2.2 CAD",
    "PFIZER SHARE <br> Thanks for buying our shares! <br> Share Price: $38.90 <br> Dividend yield: 9.46%",
  ];

  timerText = new Sprite(40, 370, 75, 50);
  timerText.color = "black";
  timerText.textSize = 30;
  timerText.textColor = "red";
  countDownTimer();
}

function draw() {
  background(0, 255, 255);
  problemOneQuestion();
  questionText();

  if (currentquestion == 8 && !done) {
    done = true;
    sleep(100).then(() => {
      alert(
        "You have finished all questions! Your final grade is: " +
          percentageCorrect
      );
      currentquestion = 9;
      allSprites.remove();
      document.getElementById("text").innerHTML = "thanks for playing :D";
    });
  }
}
function countDownTimer() {
  Countdown--;
  timerText.text = Countdown;

  if (Countdown == -1) {
    alert("You ran out of time! Your answer will be counted as incorrect.");
    numOfQuestionsIncorrect++;
    allowCorrect = 0;
    document.getElementById("Wrong Answers").innerHTML =
      "Wrong Answers: " + numOfQuestionsIncorrect;
  }
  setTimeout(countDownTimer, 1000);
}
function questionText() {
  if (character.y == table.y - 100) {
    document.getElementById("text").innerHTML = questions[currentquestion];
  }
}
function problemOneQuestion() {
  if (proceed.mouse.hovering()) {
    proceed.color = "blue";
  } else {
    proceed.color = "indigo";
  }

  if (proceed.mouse.pressed()) {
    proceed.opacity = 0;
    document.getElementById("text").innerHTML = "";
    character.y = character.y - 1;
    showText = 0;
    moveDocument();
  }
}

function moveDocument() {
  document1.x = character.x;
  document1.y = character.y;
  document1.opacity = 1;
  document1.moveTo(table, 1);
  ToggleFunctionLoop = 1;
  problemOnereplying();
}
function problemOnereplying() {
  if (ToggleFunctionLoop == 1) {
    question.opacity = 1;
    reply.opacity = 1;
    if (question.mouse.hovering()) {
      question.color = "blue";
    } else {
      question.color = "indigo";
    }

    if (question.mouse.hovering()) {
      document.getElementById("text").innerHTML = questions[currentquestion];
      showText = 1;
    } else if (document1.mouse.hovering()) {
      document1.color = "white";
      showText = 2;
    } else {
      document1.color = "grey";

      showText = 0;
    }

    if (reply.mouse.hovering()) {
      reply.color = "blue";
    } else {
      reply.color = "indigo";
    }

    if (reply.mouse.pressed()) {
      const myStyles = `
    transform: translate(-60%, -650%); `;
      const element = document.querySelector(".input-overlay");
      element.style.cssText = myStyles;
      showQuestionResponseBoxes();
      exitAnswering.opacity = 1;
    }

    if (exitAnswering.mouse.pressed()) {
      const myStyles = `transform: translate(-60%, -5000%);`;
      const element = document.querySelector(".input-overlay");
      element.style.cssText = myStyles;
      thisCodeActuallySuskcs();
      thisCodeActuallySuskcsBruh();
      exitAnswering.opacity = 0;
    }
  }

  if (showText == 0) {
    document.getElementById("text").innerHTML = " ";
    const myStyles = `
    transform: translate(5000%, -290%); `;
    const element = document.querySelector(".overlay");
    element.style.cssText = myStyles;
  } else if (showText == 2) {
    document.getElementById("text").innerHTML =
      documents1Array[currentquestion];

    const myStyles = `
    transform: translate(5%, -190%); 
    background-color: rgba(255, 255, 255);
    color: #000000; 
    `;
    const element = document.querySelector(".overlay");
    element.style.cssText = myStyles;
  }
  if (showText == 1) {
    document.getElementById("text").innerHTML = questions[currentquestion];
    const myStyles = `
    transform: translate(5%, -290%); 
    `;
    const element = document.querySelector(".overlay");
    element.style.cssText = myStyles;
  }
  setTimeout(problemOnereplying, 1);
}

function showQuestionResponseBoxes() {
  const myStyles = `
  transform: translate(-60%, -500%); 
  `;
  const element = document.querySelector(".input-overlay2");
  element.style.cssText = myStyles;

  showSubmitResponseBox();
}

function showSubmitResponseBox() {
  const myStyles = `
  transform: translate(-60%, -400%); 
  `;
  const element = document.querySelector(".input-overlay3");
  element.style.cssText = myStyles;
}

function problemOneAnswer() {
  let userAnswer = document.getElementById("input").value;
  if (userAnswer == answers[currentquestion]) {
    alert("Correct! Moving on to next question.");
    if (allowCorrect == 1) {
      numOfQuestionsCorrect++;
    }
    currentquestion++;

    document.getElementById("text").innerHTML = questions[currentquestion];
    document.getElementById("input").innerHTML = "";

    const myStyles = `transform: translate(-60%, -5000%);`;
    const element = document.querySelector(".input-overlay");
    element.style.cssText = myStyles;
    thisCodeActuallySuskcs();

    thisCodeActuallySuskcsBruh();
    document.getElementById("Correct Answers").innerHTML =
      "Correct Answers: " + numOfQuestionsCorrect;
    document.getElementById("Attempts").innerHTML =
      "Attempts on current question: " + attempts;
    document.getElementById("Percent Correct").innerHTML =
      "Your Grade: " + percentageCorrect;
    reset();
  } else {
    if (allowCorrect == 1) {
      numOfQuestionsIncorrect++;
    }
    attempts++;
    console.log(numOfQuestionsIncorrect);
    allowCorrect = 0;
    document.getElementById("Wrong Answers").innerHTML =
      "Wrong Answers: " + numOfQuestionsIncorrect;
    document.getElementById("Percent Correct").innerHTML =
      "Your Grade: " + percentageCorrect;
    document.getElementById("Attempts").innerHTML =
      "Attempts on current question: " + attempts;
    alert("Incorrect, the answer is " + answers[currentquestion]);
  }
  percentageCorrect = (numOfQuestionsCorrect / currentquestion) * 100 + "%";
  if (currentquestion == 0) {
    percentageCorrect = 0 + "%";
  }
  console.log(numOfQuestionsCorrect);
  console.log(currentquestion);
  document.getElementById("Percent Correct").innerHTML =
    "Your Grade: " + percentageCorrect;
}

function thisCodeActuallySuskcs() {
  const myStyles = `
  transform: translate(-60%, -5000%); 
  `;
  const element = document.querySelector(".input-overlay2");
  element.style.cssText = myStyles;
}

function thisCodeActuallySuskcsBruh() {
  const myStyles = `
  transform: translate(-60%, -5000%); 
  `;
  const element = document.querySelector(".input-overlay3");
  element.style.cssText = myStyles;
}

function reset() {
  document.getElementById("Attempts").innerHTML =
    "Attempts on previous question: " + attempts;

  Countdown = 90;
  character.y = 0;
  allowCorrect = 1;
  attempts = 0;
  countDown = question.textSize = 15;
  question.text = "Question";
  question.textColor = "white";
  question.color = "indigo";
  question.overlap(table);
  question.opacity = 0;

  proceed.textSize = 15;
  proceed.text = "Proceed  >";
  proceed.textColor = "white";
  proceed.color = "indigo";
  proceed.opacity = 1;
  proceed.overlap(table);

  reply.textSize = 15;
  reply.text = "Reply";
  reply.textColor = "white";
  reply.color = "indigo";
  reply.overlap(table);
  reply.opacity = 0;

  document1.color = "gray";
  document1.overlap(table);
  document1.opacity = 0;
  document1.overlap(character);
  character.moveTo(table.x, table.y - 100, 3);
  exitAnswering.opacity = 0;
  ToggleFunctionLoop = 0;
  showText = 1;
  redraw();
}
