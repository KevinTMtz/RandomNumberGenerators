import { ChiSquareData } from './ChiSquareData';
import { KolmogorovSmirnovData } from './KolmogorovSmirnovData';

export interface Validator {
  validate(randoms: number[], alpa: number): Promise<boolean>;
  getData(): ChiSquareData | KolmogorovSmirnovData;
}
