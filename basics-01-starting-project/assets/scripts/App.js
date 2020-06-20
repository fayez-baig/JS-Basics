// function add() {
//   currentResult = currentResult + parseInt(userInput.value);
//  // currentResult = currentResult + +userInput.value;   samething different method  this will also covert string to number;
// }

let currentResult = 0;
let logEntries = [];
function getUserInput() {
  return parseInt(userInput.value);
}

function createAndWriteOutput(operator, resultBeforeCalc, calcNumber) {
  const text = `${resultBeforeCalc} ${operator} ${calcNumber}`;
  outputResult(currentResult, text);
}
function writeToLog(operationIdentifier, prevResult, operationNum, newResult) {
  const logEntry = {
    operation: operationIdentifier,
    number: operationNum,
    prevResult: prevResult,
    result: newResult,
  };
  logEntries.push(logEntry);
  console.log(logEntries);
}

// function calculateResult(calculationType) {
//   const enteredNumber = getUserInput();
//   const initResult = currentResult;
//   let mathOperator;
//   if (calculationType === "ADD") {
//     currentResult += enteredNumber;
//     mathOperator = "+";
//     createAndWriteOutput(mathOperator, initResult, enteredNumber);
//     writeToLog(calculationType, initResult, enteredNumber, currentResult);
//   } else if (calculationType === "SUBTRACT") {
//     mathOperator = "-";
//     currentResult -= enteredNumber;
//     createAndWriteOutput(mathOperator, initResult, enteredNumber);
//     writeToLog(calculationType, initResult, enteredNumber, currentResult);
//   } else if (calculationType === "MULTIPLY") {
//     mathOperator = "*";
//     currentResult *= enteredNumber;
//     createAndWriteOutput(mathOperator, initResult, enteredNumber);
//     writeToLog(calculationType, initResult, enteredNumber, currentResult);
//   } else if (calculationType === "DIVISION") {
//     mathOperator = "/";
//     currentResult /= enteredNumber;
//     createAndWriteOutput(mathOperator, initResult, enteredNumber);
//     writeToLog(calculationType, initResult, enteredNumber, currentResult);
//   }
// }
// function add() {
//   calculateResult("ADD");
// }

// function subtract() {
//   calculateResult("SUBTRACT");
// }

// function multiply() {
//   calculateResult("MULTIPLY");
// }

// function division() {
//   calculateResult("DIVISION");
// }

// addBtn.addEventListener("click", add);
// subtractBtn.addEventListener("click", subtract);
// multiplyBtn.addEventListener("click", multiply);
// divideBtn.addEventListener("click", division);

function calculate(operation) {
  const enteredNumber = getUserInput();
  const initialResult = currentResult;
  let operator;
  if (operation === "ADD") {
    currentResult += enteredNumber;
    operator = "+";
  } else if (operation === "SUBTRACT") {
    currentResult -= enteredNumber;
    operator = "-";
  } else if (operation === "MULTIPLY") {
    currentResult *= enteredNumber;
    operator = "*";
  } else {
    currentResult /= enteredNumber;
    operator = "/";
  }
  createAndWriteOutput(operator, initialResult, enteredNumber);
  writeToLog(operation, initialResult, enteredNumber, currentResult);
}

addBtn.addEventListener("click", calculate.bind(this, "ADD"));
subtractBtn.addEventListener("click", calculate.bind(this, "SUBTRACT"));
multiplyBtn.addEventListener("click", calculate.bind(this, "MULTIPLY"));
divideBtn.addEventListener("click", calculate.bind(this, "DIVIDE"));
