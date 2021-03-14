function getLetterInformation(letter,bracketsConfig) {
  let res = {
    isValid: false,
    isOpen: false,
    isEqual: false,
    rulse: []
  };
  for(let i = 0; i < bracketsConfig.length; i++) {
    const rule = bracketsConfig[i];
    const index = rule.indexOf(letter);
    if (index === 0 || index === 1) {
      res.isValid = true;
      res.isOpen = index === 0;
      res.rulse = rule;
      if (letter === rule[0] && letter === rule[1]) {
        res.isEqual = true;
      }
      return res;
    }
  }
  return res;
}

module.exports = function check(str, bracketsConfig) {
  let res = true;
  const letters = str.split("");
  const stack = [];
  for (let i = 0; i < letters.length; i++) {
    const letter = str[i];
    const info = getLetterInformation(letter,bracketsConfig);
    if (info.isValid === true) {
      if (info.isOpen === true) {
        if (info.isEqual === true && stack.includes(letter)) {
        stack.pop();
      } else {
        stack.push(letter);
      }
      } else {
        const count = stack.length;
        const openBracket = info.rulse[0];
        if (stack[count - 1] === openBracket) {
          stack.pop();
        } else {
          res = false;
          break;
        }
      }
    }
  }
    if (stack.length !==0) {
      res = false;
  }
  return res;
}
