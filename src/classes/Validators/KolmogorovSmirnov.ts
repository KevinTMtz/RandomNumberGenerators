import {
  KolmogorovSmirnovCell,
  KolmogorovSmirnovData,
} from '../../Interfaces/KolmogorovSmirnovData';
import { Validator } from '../../Interfaces/Validator';

export class KolmogorovSmirnov implements Validator {
  private table!: KolmogorovSmirnovCell[];
  private deviation_max_plus!: number;
  private deviation_max_minus!: number;
  private deviation_max!: number;
  private deviation_critical!: number;

  public validate = async (
    randoms: number[],
    alpha: number,
  ): Promise<KolmogorovSmirnovData> => {
    if (randoms.length < 1) {
      return Promise.reject(
        'Not enough information provided to make the validation',
      );
    }

    this.table = [];
    this.deviation_max_plus = 0;
    this.deviation_max_minus = 0;
    this.deviation_max = 0;
    this.createTable(randoms);
    this.getTheoreticalValue(alpha);

    const data: KolmogorovSmirnovData = {
      isValid: this.deviation_max < this.deviation_critical,
      table: this.table,
      deviation_max_plus: this.deviation_max_plus,
      deviation_max_minus: this.deviation_max_minus,
      deviation_max: this.deviation_max,
      deviation_critical: this.deviation_critical,
    };
    return data;
  };

  private createTable = (randoms: number[]) => {
    let i = 1;
    const n = randoms.length;
    randoms.forEach((rnd) => {
      const cdf = rnd;
      const cdf_empirical = i / n;
      const deviation_plus = Math.abs(cdf_empirical - cdf);
      const deviation_minus =
        i != 1 ? Math.abs(cdf - this.table[i - 2].cdf_empirical) : cdf;

      const cell: KolmogorovSmirnovCell = {
        cdf: cdf,
        cdf_empirical: cdf_empirical,
        deviation_plus: deviation_plus,
        deviation_minus: deviation_minus,
      };
      this.table.push(cell);

      this.deviation_max_plus = Math.max(
        this.deviation_max_plus,
        deviation_plus,
      );

      this.deviation_max_minus = Math.max(
        this.deviation_max_minus,
        deviation_minus,
      );

      this.deviation_max = Math.max(
        this.deviation_max_plus,
        this.deviation_max_minus,
      );
      i++;
    });
  };

  private getTheoreticalValue = (alpha: number) => {
    const n = this.table.length;
    //TODO: Get value from tables with n and alpha
    this.deviation_critical = Number.MAX_SAFE_INTEGER;
  };
}
