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

export enum OperationType {Add, Subtract, Multiply, Divide}

export enum TypeTask { MultTable = 1, GroupZ, RingZ, GroupQ1, RingQ, FieldQ, SquareEq}
