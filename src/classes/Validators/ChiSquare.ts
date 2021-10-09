import {
  ChiSquareData,
  ChiSquareCell,
} from '../../Interfaces/Validators/ChiSquareData';
import { Validator } from '../../Interfaces/Validators/Validator';
import { chiSquareDistributionTable } from '../../utils/ChiSquareCritical';

export const ChiSquare: Validator = class ChiSquare {
  public static range: number;
  private static k: number;
  private static classes: number;
  private static table: ChiSquareCell[];
  private static X0: number;
  private static X1: number;

  public static validate = async (
    randoms: number[],
    alpha: number,
  ): Promise<ChiSquareData> => {
    if (randoms.length <= 4 || !(alpha in chiSquareDistributionTable[1])) {
      return Promise.reject(
        'Not enough information provided to make the validation',
      );
    }

    this.table = [];
    this.range = randoms[randoms.length - 1] - randoms[0];
    this.k = Math.floor(1 + 3.322 * Math.log10(randoms.length));
    this.classes = 1 / this.k;
    this.createTable(randoms);
    if (this.k === 1) {
      return Promise.reject(
        'The randoms are not enough to validate the distribution',
      );
    }
    this.getTheoreticalValue(alpha);

    const data: ChiSquareData = {
      isValid: this.X0 < this.X1,
      range: this.range,
      k: this.k,
      classes: this.classes,
      table: this.table,
      X0: this.X0,
      X1: this.X1,
    };
    return data;
  };

  private static createTable = (randoms: number[]) => {
    let i = 0;
    let j = 0;
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

  private static getTheoreticalValue = (alpha: number) => {
    const v = this.k - 1;
    this.X1 = chiSquareDistributionTable[v][alpha];
  };
};
