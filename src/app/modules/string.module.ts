import { MathExpression } from './iface.module';
import {div} from './math.module';

export function mkLeftPartExp() {
  let tempStr = '';
  if (typeof(this.leftExp) === 'number') {
    tempStr += this.leftExp + this.operation;
  } else if (typeof(this.leftExp) === 'object') {
    const flagBracket = (this.operation === '*'
      || this.operation === ':')
      && (this.leftExp.operation === '+'
        || this.leftExp.operation === '-');
    if (flagBracket) {
      tempStr += '( ';
    }

    tempStr += mkMathExp(this.leftExp);

    if (flagBracket) {
      tempStr += ' )';
    }
    tempStr += this.operation;
  }
  return tempStr;
}

export function mkRightPartExp() {
  let tempStr = '';
  if (typeof(this.rightExp) === 'number') {
    tempStr += this.rightExp;
  } else if (typeof(this.rightExp) === 'object') {
    const flagBracket = (this.operation === '*'
      || this.operation === ':')
      && (this.rightExp.operation === '+'
        || this.rightExp.operation === '-');
    if (flagBracket) {
      tempStr += '( ';
    }
    tempStr += mkMathExp(this.rightExp);
    if (flagBracket) {
      tempStr += ' )';
    }
  }
  if (tempStr[0] === '-') {
    let i = 1;
    while(!isNaN(+tempStr[i])) {
      i += 1;
    }
    if (tempStr[i] === '*' || tempStr[i] === ':') {
      let t = '(';
      t += tempStr.substring(0, i);
      t += ')';
      t += tempStr.substring(i);
      tempStr = t;
    } else {
      tempStr = '(' + tempStr + ')';
    }
  }
  return tempStr;
}

export function mkMathExp(m: MathExpression) {
  let tempStr = mkLeftPartExp.bind(m)();
  tempStr += mkRightPartExp.bind(m)();
  return tempStr;
}

export function mkTimeString(value: number): string {
  const minutes = div(value, 60);
  const seconds = value % 60;
  let timerString = '';
  timerString += (minutes < 10) ? '0' : '';
  timerString += minutes + ':';
  timerString += (seconds < 10) ? '0' : '';
  timerString += seconds;
  return timerString;
}
