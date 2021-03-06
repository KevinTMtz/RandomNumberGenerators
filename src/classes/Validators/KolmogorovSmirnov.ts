import {
  KolmogorovSmirnovCell,
  KolmogorovSmirnovData,
} from '../../Interfaces/Validators/KolmogorovSmirnovData';
import { Validator } from '../../Interfaces/Validators/Validator';
import { ksDistributionTable } from '../../utils/KolmogorovSmirnovCritical';

export const KolmogorovSmirnov: Validator = class KolmogorovSmirnov {
  private static table: KolmogorovSmirnovCell[];
  private static deviation_max_plus: number;
  private static deviation_max_minus: number;
  private static deviation_max: number;
  private static deviation_critical: number;

  public static validate = async (
    randoms: number[],
    alpha: number,
  ): Promise<KolmogorovSmirnovData> => {
    if (randoms.length < 1 || !(alpha in ksDistributionTable[1])) {
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

  private static createTable = (randoms: number[]) => {
    let i = 1;
    const n = randoms.length;
    randoms.forEach((rnd) => {
      const cdf = rnd;
      const cdf_empirical = i / n;
      const deviation_plus = Math.abs(cdf_empirical - cdf);
      const deviation_minus =
        i !== 1 ? Math.abs(cdf - this.table[i - 2].cdf_empirical) : cdf;

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

  private static getTheoreticalValue = (alpha: number) => {
    const n = this.table.length;
    if (n > 50) {
      switch (alpha) {
        case 0.2:
          return 1.07 / Math.sqrt(n);
        case 0.1:
          return 1.22 / Math.sqrt(n);
        case 0.05:
          return 1.36 / Math.sqrt(n);
        case 0.02:
          return 1.52 / Math.sqrt(n);
        case 0.01:
          return 1.63 / Math.sqrt(n);
        case 0.005:
          return 1.73 / Math.sqrt(n);
        case 0.002:
          return 1.85 / Math.sqrt(n);
        case 0.001:
          return 1.95 / Math.sqrt(n);
      }
    }
    this.deviation_critical = ksDistributionTable[n][alpha];
  };
};
