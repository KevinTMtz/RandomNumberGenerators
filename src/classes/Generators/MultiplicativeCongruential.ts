import { ChiSquareData } from '../../Interfaces/ChiSquareData';
import { InputValues } from '../../Interfaces/InputValues';
import { KolmogorovSmirnovData } from '../../Interfaces/KolmogorovSmirnovData';
import { RandomGenerator } from '../../Interfaces/RandomGenerator';
import { ChiSquare } from '../Validators/ChiSquare';
import { KolmogorovSmirnov } from '../Validators/KolmogorovSmirnov';

export class MultiplicativeCongruential implements RandomGenerator {
  private randoms!: number[];

  private validateInput = (values: InputValues) => {
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

  public generateRandoms = async (
    values: InputValues,
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
      rnd = (values.a! * rnd) % values.m!;
      if (n && this.randoms.length == n) return this.randoms;
    }
    return this.randoms;
  };

  public getRandoms = (): number[] => {
    if (!this.randoms) return [];
    return this.randoms;
  };

  public validate = async (
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
}

const mc = new MultiplicativeCongruential();
const input: InputValues = {
  seed: 51,
  a: 3,
  m: 2,
};
