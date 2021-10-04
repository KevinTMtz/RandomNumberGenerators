import { error } from 'console';
import { ChiSquareData, ChiSquareCell } from '../Interfaces/ChiSquareData';
import { Validator } from '../Interfaces/Validator';

export class ChiSquare implements Validator {
  public range!: number;
  private k!: number;
  private classes!: number;
  private table!: ChiSquareCell[];
  private X0!: number;
  private X1!: number;

  public validate = async (
    randoms: number[],
    alpha: number,
  ): Promise<boolean> => {
    if (randoms.length <= 4) {
      return Promise.reject(
        'Not enough information provided to make the validation',
      );
    }
    this.range = randoms[randoms.length - 1] - randoms[0];
    this.k = Math.floor(1 + 3.322 * Math.log10(randoms.length));
    this.classes = 1 / this.k;
    this.createTable(randoms);
    this.getTheoreticalValue(alpha);
    return this.X0 < this.X1;
  };

  public getData = (): ChiSquareData => {
    const data: ChiSquareData = {
      range: this.range,
      k: this.k,
      classes: this.classes,
      table: this.table,
      X0: this.X0,
      X1: this.X1,
    };
    return data;
  };

  private createTable = (randoms: number[]) => {
    let i = 0;
    let j = 0;
    this.table = [];
    this.X0 = 0;
    while (i < this.k) {
      let start = i * this.classes;
      let end = (i + 1) * this.classes;
      let absolute = 0;
      while (randoms[j] <= end) {
        absolute++;
        j++;
        if (j < randoms.length && randoms[j] > end && absolute < 5) {
          i++;
          end = (i + 1) * this.classes;
        }
      }
      if (absolute < 5 && i >= this.k - 1) {
        const last = this.table.pop();
        start = last!.start;
        absolute += last!.absolute;
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
      i++;
    }
    this.k = this.table.length;
  };

  private getTheoreticalValue = (alpha: number) => {
    const v = this.k - 1;
    //TODO: Get value from tables with v and alpha
    this.X1 = Number.MAX_SAFE_INTEGER;
  };
}
