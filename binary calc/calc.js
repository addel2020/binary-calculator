const userInput = document.querySelector("#user_input");
var expression = "";

press = (num) => {
  // Ensure that we do not start an expression with an operator
  if (expression === "" && ['+', '-', '*', '/'].includes(num)) {
    return;
  }

  // Prevent adding multiple operators in sequence
  if (['+', '-', '*', '/'].includes(num) && ['+', '-', '*', '/'].includes(expression.slice(-1))) {
    return;
  }

  expression += num;
  userInput.value = expression;
}

equal = () => {
  if (expression === "") return;

  // Evaluate the binary expression
  try {
    // Convert binary expression into a decimal calculation, then convert the result back to binary
    const evalBinaryExpression = (expr) => {
      return expr.split(/([\+\-\*\/])/g).reduce((acc, part) => {
        if (['+', '-', '*', '/'].includes(part)) {
          return [acc[0], part];
        }
        let num = parseInt(part, 2);
        if (acc[1] === '+') num = acc[0] + num;
        if (acc[1] === '-') num = acc[0] - num;
        if (acc[1] === '*') num = acc[0] * num;
        if (acc[1] === '/') num = Math.floor(acc[0] / num);
        return [num];
      }, [0])[0];
    };

    let result = evalBinaryExpression(expression).toString(2);
    userInput.value = result;
  } catch (error) {
    userInput.value = "Error";
  }

  expression = ""; // Clear the expression after calculation
}

erase = () => {
  expression = "";
  userInput.value = "";
}
