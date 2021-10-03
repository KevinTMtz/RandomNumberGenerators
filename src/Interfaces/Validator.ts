import { ChiSquareData } from './ChiSquareData';

export interface Validator {
  validate(randoms: number[], alpa: number): boolean;
  getData(): ChiSquareData;
}
