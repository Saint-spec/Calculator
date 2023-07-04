function appendToResult(value) {
  const resultInput = document.getElementById("result");
  const currentResult = resultInput.value;
  const lastChar = currentResult[currentResult.length - 1];

  if (isNumber(value)) {
    resultInput.value += value;
  } else if (isOperator(value) && isNumber(lastChar)) {
    resultInput.value += value;
  } else if (value === '.' && isValidDecimal(currentResult)) {
    resultInput.value += value;
  }
}

function isNumber(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

function isOperator(value) {
  return value === '+' || value === '-' || value === '*' || value === '/';
}

function isValidDecimal(result) {
  const lastOperatorIndex = Math.max(
    result.lastIndexOf('+'),
    result.lastIndexOf('-'),
    result.lastIndexOf('*'),
    result.lastIndexOf('/')
  );
  const decimalIndex = result.indexOf('.', lastOperatorIndex);

  return decimalIndex === -1;
}


function clearResult() {
  document.getElementById("result").value = "";
}

function calculateResult() {
  const result = document.getElementById("result").value;
  let calculatedResult;

  try {
    calculatedResult = eval(result);
  } catch (error) {
    calculatedResult = "Error";
  }

  document.getElementById("result").value = calculatedResult;
}
