import { ChiSquareData } from './ChiSquareData';
import { KolmogorovSmirnovData } from './KolmogorovSmirnovData';

export interface Validator {
  validate(
    randoms: number[],
    alpa: number,
  ): Promise<ChiSquareData | KolmogorovSmirnovData>;
}
