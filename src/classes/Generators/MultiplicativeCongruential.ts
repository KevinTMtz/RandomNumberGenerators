import { ChiSquareData } from '../../Interfaces/Validators/ChiSquareData';
import { KolmogorovSmirnovData } from '../../Interfaces/Validators/KolmogorovSmirnovData';
import {
  RandomGenerator,
  RandomValidator,
} from '../../Interfaces/Generators/RandomGenerator';
import { ChiSquare } from '../Validators/ChiSquare';
import { KolmogorovSmirnov } from '../Validators/KolmogorovSmirnov';
import { GeneratorValues } from '../../Interfaces/data/types';

export const MultiplicativeCongruential: RandomGenerator &
  RandomValidator = class MultiplicativeCongruential {
  private static randoms: number[];

  private static validateInput = (values: GeneratorValues) => {
    return (
      values &&
      values.seed &&
      values.seed > 0 &&
      values.a &&
      values.a > 0 &&
      !values.c &&
      values.m &&
      values.m > 0 &&
      values.m > values.a &&
      values.m > values.seed
    );
  };

  public static generateRandoms = async (
    values: GeneratorValues,
    n?: number,
  ): Promise<number[]> => {
    if (!this.validateInput(values) || (n && n <= 0))
      return Promise.reject('The parameters are not valid');

    this.randoms = [];
    let set = new Set();
    let rnd = values.seed;
    while (!set.has(rnd)) {
      this.randoms.push(rnd! / values.m!);
      set.add(rnd);
      rnd = (values.a! * rnd!) % values.m!;
      if (n && this.randoms.length === n) return this.randoms;
    }
    return this.randoms;
  };

  public static getRandoms = (): number[] => {
    if (!this.randoms) return [];
    return this.randoms;
  };

  public static validate = async (
    type: 'CS' | 'KS',
    alpha: number,
  ): Promise<ChiSquareData | KolmogorovSmirnovData> => {
    if (!this.randoms)
      return Promise.reject(
        'To validate the randoms you need to generate them first',
      );
    return type === 'CS'
      ? ChiSquare.validate(this.randoms.sort(), alpha)
      : KolmogorovSmirnov.validate(this.randoms.sort(), alpha);
  };
};
