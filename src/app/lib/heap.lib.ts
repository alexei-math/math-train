export class Entity {
  prior: number;
  value: number;
  pos: number;

  constructor(v: number, p: number, pos: number) {
    this.value = v;
    this.prior = p;
    this.pos = pos;
  }
}

export class HeapMax {
  public queue: Array<Entity>;
  public arr: Array<Entity>;
  public heapSize: number;

  constructor() {
    this.queue = [];
    this.arr = [];
    this.heapSize = 0;
  }

  private siftUp = (i: number) => {
    while (i > 0 && this.queue[i].prior > this.queue[Math.floor((i - 1) / 2)].prior) {
      const temp = this.queue[i];
      this.queue[i] = this.queue[Math.floor((i - 1) / 2)];
      this.queue[Math.floor((i - 1) / 2)] = temp;
      this.queue[i].pos = i;
      this.queue[Math.floor((i - 1) / 2)].pos = Math.floor((i - 1) / 2);
      i = Math.floor((i - 1) / 2);
    }
  }

  private siftDown = (i: number) => {
    while (2 * i + 1 < this.heapSize) {
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      let j = left;
      if (right < this.heapSize && this.queue[right].prior > this.queue[left].prior) {
        j = right;
      }

      if (this.queue[i].prior >= this.queue[j].prior) {
        break;
      }

      const temp = this.queue[i];
      this.queue[i] = this.queue[j];
      this.queue[j] = temp;
      this.queue[i].pos = i;
      this.queue[j].pos = j;

      i = j;
    }

  }

  public insert(e: Entity) {
    this.queue.push(e);
    this.arr.push(e);
    this.heapSize += 1;
    this.queue[this.heapSize - 1].pos = this.heapSize - 1;
    this.siftUp(this.heapSize - 1);
  }

  public getTop() {
    const t = this.queue[0];
    this.queue[0] = this.queue.pop();
    this.queue[0].pos = 0;
    this.heapSize -= 1;
    this.siftDown(0);
    t.pos = -1;
    return t;
  }

  public viewTop() {
    return this.queue[0];
  }

  public incPriority(n: number, count: number) {
    if (this.arr[n].pos !== -1) {

      this.arr[n].prior += count;
      this.siftUp(this.arr[n].pos);

    }
  }

  public decPriority(n: number, count: number) {
    if (this.arr[n].pos !== -1) {

      this.arr[n].prior = (this.arr[n].prior - count > 0) ? this.arr[n].prior - count : 0;
      this.siftDown(this.arr[n].pos);

    }
  }
}
