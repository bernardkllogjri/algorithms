/*
* @example
* 13 -> 13
* ( + 1 5 ) -> 6
* ( + 3 4 9 ) -> 16
* ( + ( + 6 8 ) ( * 3 7 1 ) 5 )-> 40
*/


/**
 * A simple calculation evaluating addition and multiplication mathematical expression
 * @param {string} expr - Mathematical expression
 * @returns {number} - The result of the mathematical expression
 */

type Operator = '+' | '*' | '';

const calculate = (expr: string) => {
  const members: string[] = expr.split(' ')
  let operator: Operator = '';
  let acc: number = -1;
  if(expr[0] !== '(') return parseInt(expr);
  for(let i = 0; i < members.length; i++) {
    if(['+', '*'].includes(members[i])) operator = members[i] as Operator
    if(members[i] === '+') {
      operator = '+';
      acc = 0;
    } 
    else if(members[i] === '*') {
      operator = '*';
      acc = 1;
    } 
    else if(members[i] !== '(' && members[i] !== ')') {
      if(operator === '+') acc += parseInt(members[i]);
      if(operator === '*') acc *= parseInt(members[i]);
    } else if(members[i] === '(' && i !== 0) {
      let innerExprMembers: string = members[i];
      while(members[++i] !== ')'){
        innerExprMembers = innerExprMembers + ' ' + members[i];
      }
      innerExprMembers = innerExprMembers + ' ' + members[i];
      acc += calculate(innerExprMembers);
    }
  }

  return acc;
}

console.log({ result: calculate('( + ( + 6 8 ) ( * 3 7 1 ) 5 )') })