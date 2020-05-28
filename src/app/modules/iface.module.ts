export interface ViewData {
  header: string;
  description: string;
  problemText: string;
  inputDisabled: boolean;
}

export interface ScoreData {
  totalProblems: number;
  givenProblems: number;
  solvedProblems: number;
}

export interface MathExpression {
  leftExp: number | MathExpression;
  rightExp: number | MathExpression;
  operation: string;
}

export class Visited {
  page: string;
  visited: number;
}

export class SimpleTask {
  problemText: string;
  answer: number;
}

export class QN {
  nominator: number;
  denominator: number;
}

export class QTask {
  problemText: string;
  answer: QN;
}

export class User {
  iss: string;
  aud: string;
  iat: string;
  nbf: string;
  exp: string;
  type: string;
  data: {
    id: string;
    logname: string;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
  };
}

export class UserJWT {
  message: string;
  jwt: string;
  jwt_r: string;
}

export enum OperationType {Add, Subtract, Multiply, Divide}

export enum TypeTask { MultTable = 1, GroupZ, RingZ, GroupQ1, RingQ, FieldQ, SquareEq}
