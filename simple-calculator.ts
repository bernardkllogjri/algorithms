type Operator = '+' | '*' | '';

/**
 * A simple calculation evaluating addition and multiplication mathematical expression
 * @param {string} expr - Mathematical expression
 * @returns {number} - The result of the mathematical expression
 */
const calculator = (expr: string) => {
  const elements: string[] = expr.split(' ')
  let operator: Operator = '';
  let acc: number = -1;
  if(expr[0] !== '(') return parseInt(expr);
  for(let i = 0; i < elements.length; i++) {
    if(['+', '*'].includes(elements[i])) {
      operator = elements[i] as Operator
      acc = operator === '+' ? 0 : 1
    } else if(!['(', ')'].includes(elements[i])) {
      if(operator === '+') acc += parseInt(elements[i]);
      if(operator === '*') acc *= parseInt(elements[i]);
    } else if(elements[i] === '(' && i !== 0) {
      let innerExprElements: string = elements[i];
      while(elements[++i] !== ')'){
        innerExprElements = innerExprElements + ' ' + elements[i];
      }
      innerExprElements = innerExprElements + ' ' + elements[i];
      acc += calculator(innerExprElements);
    }
  }

  return acc;
}

console.log({ result: calculator('( + ( + 6 8 ) ( * 3 7 1 ) 5 )') })