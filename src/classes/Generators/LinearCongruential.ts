import { ChiSquareData } from '../../Interfaces/Validators/ChiSquareData';
import { KolmogorovSmirnovData } from '../../Interfaces/Validators/KolmogorovSmirnovData';
import {
  RandomGenerator,
  RandomValidator,
} from '../../Interfaces/Generators/RandomGenerator';
import { ChiSquare } from '../Validators/ChiSquare';
import { KolmogorovSmirnov } from '../Validators/KolmogorovSmirnov';
import { GeneratorValues } from '../../Interfaces/components/types';

export const LinearCongruential: RandomGenerator &
  RandomValidator = class LinearCongruenial {
  private static randoms: number[];

  private static validateInput = (values: GeneratorValues) => {
    return (
      values &&
      values.seed &&
      values.seed > 0 &&
      values.a &&
      values.a > 0 &&
      values.c &&
      values.c > 0 &&
      values.m &&
      values.m > 0
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
      this.randoms.push(rnd / values.m!);
      set.add(rnd);
      rnd = (values.a! * rnd + values.c!) % values.m!;
      if (n && this.randoms.length == n) return this.randoms;
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
    const validator = type == 'CS' ? new ChiSquare() : new KolmogorovSmirnov();
    return validator.validate(this.randoms.sort(), alpha);
  };
};

const input: GeneratorValues = {
  seed: 4,
  a: 5,
  c: 7,
  m: 8,
};

LinearCongruential.generateRandoms(input).then((randoms) => {
  console.log(randoms);
  LinearCongruential.validate('KS', 0).then((data) => console.log(data));
});