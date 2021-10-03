export class ChiSquare {
  public range!: number;
  public k!: number;
  public classes!: number;
  public table!: ChiSquareCell[];
  public X0!: number;
  public X1!: number;
  public isValid!: boolean;

  public validate = (randoms: number[], alpha: number) => {
    this.range = randoms[-1] - randoms[0];
    this.k = Math.floor(1 + 3.322 * Math.log10(randoms.length));
    this.classes = this.range / this.k;
    this.createTable(randoms);
  };

  private createTable = (randoms: number[]) => {
    let i = 0;
    let j = 0;
    this.table = [];
    this.X0 = 0;
    while (i < this.k) {
      const start = i * this.classes;
      let end = (i + 1) * this.classes;
      let absolute = 0;
      while (randoms[j] <= end) {
        absolute++;
        j++;
        if (randoms[j] > end && absolute < 5) {
          i++;
          end = (i + 1) * this.classes;
        }
      }
      const probability = end - start;
      const theoretical = randoms.length * probability;
      const result = Math.pow(absolute - theoretical, 2) / theoretical;
      const cell: ChiSquareCell = {
        start: start,
        end: end,
        absolute: absolute,
        probability: probability,
        theoretical: theoretical,
        result: result,
      };
      this.table.push(cell);
      this.X0 += cell.result;
    }
  };
}

interface ChiSquareCell {
  start: number;
  end: number;
  absolute: number;
  probability: number;
  theoretical: number;
  result: number;
}

export interface ChiSquareResults {
  range: number;
  k: number;
  classes: number;
  table: ChiSquareCell[];
  X0: number;
  X1: number;
  valid: boolean;
}
