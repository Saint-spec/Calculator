let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
let shouldResetScreen = false;

const currentOperationScreen = document.querySelector(".display__result");
const previousOperation = document.querySelector(".display__history");
const numberButtons = document.querySelectorAll(".buttons__number");
const operationButtons = document.querySelectorAll(".buttons__add, .buttons__subtract, .buttons__multiply, .buttons__divide");
const equalsButton = document.querySelector(".equalsButton");
const deleteButton = document.querySelector(".deleteButton");
const pointButton = document.querySelector(".buttons__number:last-child");

window.addEventListener("keydown", setInput);
equalsButton.addEventListener("click", evaluate);
deleteButton.addEventListener("click", clear);
pointButton.addEventListener("click", appendPoint);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => appendNumber(button.textContent));
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => setOperation(button.textContent));
});

function appendNumber(number) {
  if (currentOperationScreen.textContent === "0" || shouldResetScreen) resetScreen();
  currentOperationScreen.textContent += number;
}

function resetScreen() {
  currentOperationScreen.textContent = "";
  shouldResetScreen = false;
}

function clear() {
  currentOperationScreen.textContent = "0";
  previousOperation.textContent = "";
  firstOperand = "";
  secondOperand = "";
  currentOperation = null;
}

function appendPoint() {
  if (shouldResetScreen) resetScreen();
  if (currentOperationScreen.textContent === "") currentOperationScreen.textContent = "0";
  if (currentOperationScreen.textContent.includes(".")) return;
  currentOperationScreen.textContent += ".";
}

function setOperation(operation) {
  if (currentOperation !== null) evaluate();
  firstOperand = currentOperationScreen.textContent;
  currentOperation = operation;
  previousOperation.textContent = `${firstOperand} ${currentOperation}`;
  shouldResetScreen = true;
}

function evaluate() {
  if (currentOperation === null || shouldResetScreen) return;
  if (currentOperation === "/" && currentOperationScreen.textContent === "0") {
    alert("You can't divide by 0!");
    clear();
    return;
  }
  secondOperand = currentOperationScreen.textContent;
  currentOperationScreen.textContent = roundResult(operate(firstOperand, currentOperation, secondOperand));
  previousOperation.textContent = `${firstOperand} ${currentOperation} ${secondOperand}`;
  currentOperation = null;
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

function setInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === ".") appendPoint();
  if (e.key === "=" || e.key === "Enter") evaluate();
  if (e.key === "Backspace") deleteNumber();
  if (e.key === "Escape") clear();
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") setOperation(convertOperator(e.key));
}

function convertOperator(keyboardOperator) {
  if (keyboardOperator === "/") return "÷";
  if (keyboardOperator === "*") return "×";
  if (keyboardOperator === "-") return "−";
  if (keyboardOperator === "+") return "+";
}


function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return null;
    return a / b;
}
