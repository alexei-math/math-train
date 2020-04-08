export function getRandom(minNumber: number, maxNumber: number) {
  return Math.floor(Math.random() * (Number(maxNumber) - Number(minNumber) + 1) + Number(minNumber));
}

export function GCD(n: number, m: number) {

  while (m) {
    const t = m;
    m = n % m;
    n = t;
  }

  return n;
}

export function LCM(n: number, m: number) {
  return n * m / GCD (n, m);
}

export function div(dividend: number, divisor: number) {
  return (dividend - dividend % divisor) / divisor;
}

export class NumQ {

  private nominator: number;
  private denominator: number;

  constructor(n: number = 1, private d: number = 1) {

    this.nominator = n;
    this.denominator = d;
  }

  public get nom(): number {
    return this.nominator;
  }

  public set nom(n: number) {
    this.nominator = n;
  }
  public get denom(): number {
    return this.denominator;
  }

  public set denom(d: number) {
    this.denominator = d;
  }

  correctSign() {
    if (this.denom < 0) {
      this.nom = - this.nom;
      this.denom = - this.denom;
    }
  }

  multiply(q: NumQ): NumQ {

    const tempQ: NumQ = new NumQ();

    tempQ.nom = q.nom * this.nom;
    tempQ.denom = q.denom * this.denom;
    tempQ.correctSign();
    tempQ.reduce();

    return tempQ;
  }

  divide(q: NumQ): NumQ {
    const tempQ: NumQ = new NumQ();

    tempQ.nom = this.nom * q.denom;
    tempQ.denom = this.denom * q.nom;
    tempQ.correctSign();
    tempQ.reduce();

    return tempQ;
  }

  reduce(): void {
    const r = GCD (Math.abs(this.nom), this.denom);
    this.nom = this.nom / r;
    this.denom = this.denom / r;
  }

  add(q: NumQ): NumQ {

    const tempQ: NumQ = new NumQ();

    tempQ.denom = LCM( q.denom, this.denom);

    const mul1: number =  tempQ.denom / this.denom;
    const mul2: number = tempQ.denom / q.denom;

    tempQ.nom = this.nom * mul1 + q.nom * mul2;
    tempQ.correctSign();
    tempQ.reduce();

    return tempQ;
  }

  subtract(q: NumQ): NumQ {

    const tempQ: NumQ = new NumQ();

    tempQ.denom = LCM( q.denom, this.denom);

    const mul1: number =  tempQ.denom / this.denom;
    const mul2: number = tempQ.denom / q.denom;

    tempQ.nom = this.nom * mul1 - q.nom * mul2;
    tempQ.correctSign();
    tempQ.reduce();

    return tempQ;
  }

  power(n: number): NumQ {

    let tempQ: NumQ = new NumQ(1, 1);

    let i: number;

    if (n > 0) {
      for (i = 0; i < n; i += 1) {
        tempQ = tempQ.multiply (this);
      }
    } else if (n < 0) {
      for (i = 0; i < Math.abs(n); i += 1) {
        tempQ = tempQ.multiply (this);
      }
      const t = tempQ.nom;
      tempQ.nom = tempQ.denom;
      tempQ.denom = t;
    }

    tempQ.correctSign();
    tempQ.reduce();

    return tempQ;
  }

  isInt(): boolean {
    return this.denom === 1;
  }

  toInt(): number {
    return div(this.nom, this.denom);
  }

  isEqual(q: NumQ): boolean {
    return this.nom === q.nom && this.denom === q.denom;
  }
}
