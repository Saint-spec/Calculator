function appendToResult(value) {
  document.getElementById("result").value += value;
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
