const panel = document.querySelector(".result-area");
const numbers = document.querySelectorAll("[number]");
const operators = [...document.querySelectorAll(".operator")];
operators.pop();

const firstNumber = [],
  secondNumber = [];
let operator,
  controller = 1;
let n1, n2;

numbers.forEach((n) => {
  n.addEventListener("click", () => {
    registerNumber(n);
  });
});

operators.forEach((o) => {
  o.addEventListener("click", () => {
    defineOperation(o);
  });
});

function defineOperation(element) {
  if (n1 !== undefined) {
    operator = element.innerText;
    controller = 2;
  }
  console.log(operator);
}

function registerNumber(number) {
  if (controller === 1) {
    if (panel.innerText.length < 8) firstNumber.push(Number(number.innerText));

    panel.innerText = `${Number(firstNumber.toString().replace(/,/g, ""))}`;
    n1 = Number(panel.innerText);
  } else if (controller === 2) {
    if (panel.innerText.length < 8) secondNumber.push(Number(number.innerText));

    panel.innerText = `${Number(secondNumber.toString().replace(/,/g, ""))}`;
    n2 = Number(panel.innerText);
  }
  console.log(n1, n2);
}

document.querySelector("#equal").addEventListener("click", () => {
  if (n2 === undefined) n2 = 0;
  if (n1 === undefined) n1 = 0;

  switch (operator) {
    case "+":
      n1 = n1 + n2;
      break;
    case "-":
      n1 = n1 - n2;
      break;
    case "x":
      n1 = n1 * n2;
      break;
    case "/":
      n1 = n1 / n2 === NaN || n1 / n2 === Infinity ? 0 : n1 / n2;
      break;
  }

  panel.innerText = n1.toString().length > 9 ? n1.toFixed(3) : n1;
  n2 = 0;
  controller = 1;
  firstNumber.splice(0, firstNumber.length);
  secondNumber.splice(0, secondNumber.length);

  console.log(n1, n2);
});

document.querySelector("#c").addEventListener("click", () => {
  if (controller === 1) {
    n1 = 0;
    firstNumber.splice(0, firstNumber.length);
    panel.innerText = n1;
  } else if (controller === 2) {
    n2 = 0;
    secondNumber.splice(0, secondNumber.length);
    panel.innerText = n2;
  }
});

document.querySelector("#plus-minus").addEventListener("click", () => {
  console.log(n1, n2);
  if (n1 !== NaN && n1 !== undefined) {
    if (controller === 1) {
      if (firstNumber.length !== 0) {
        firstNumber[0] === "-" ? firstNumber.shift() : firstNumber.unshift("-");
        panel.innerText = `${firstNumber.toString().replace(/,/g, "")}`;
      } else {
        n1 = n1 > 0 ? Number("-" + n1) : Number(n1.toString().replace("-", ""));
        panel.innerText = n1;
      }
      n1 = Number(panel.innerText);
    } else if (controller === 2) {
      secondNumber[0] === "-"
        ? secondNumber.shift()
        : secondNumber.unshift("-");
      panel.innerText = `${Number(secondNumber.toString().replace(/,/g, ""))}`;
      n2 = Number(panel.innerText);
    }
  }
});

document.querySelector("#dot").addEventListener("click", () => {
  if (controller === 1) {
    if (firstNumber.includes(".")) {
      firstNumber.slice(firstNumber.indexOf("."), 1);
      panel.innerText = `${firstNumber.toString().replace(/,/g, "")}`;
    } else {
      firstNumber.push(".");
      panel.innerText = `${firstNumber.toString().replace(/,/g, "")}`;
    }
    n1 = Number(panel.innerText);
  } else if (controller === 2) {
    if (secondNumber.includes(".")) {
      secondNumber.slice(secondNumber.indexOf("."), 1);
      panel.innerText = `${secondNumber.toString().replace(/,/g, "")}`;
    } else {
      secondNumber.push(".");
      panel.innerText = `${secondNumber.toString().replace(/,/g, "")}`;
    }
    n2 = Number(panel.innerText);
  }
});
