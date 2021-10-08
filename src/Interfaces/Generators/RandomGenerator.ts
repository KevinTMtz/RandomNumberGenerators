import { GeneratorValues } from '../data/types';
import { ChiSquareData } from '../Validators/ChiSquareData';
import { KolmogorovSmirnovData } from '../Validators/KolmogorovSmirnovData';

export interface RandomGenerator {
  generateRandoms(
    values: GeneratorValues | GeneratorValues[],
    n?: number,
  ): Promise<number[]>;
  getRandoms(): number[];
}

export interface RandomValidator {
  validate(
    type: 'CS' | 'KS',
    alpha: number,
  ): Promise<ChiSquareData | KolmogorovSmirnovData>;
}
