import { ChiSquareData } from '../Interfaces/ChiSquareData';
import { KolmogorovSmirnovData } from '../Interfaces/KolmogorovSmirnovData';
import { RandomGenerator } from '../Interfaces/RandomGenerator';
import { ChiSquare } from './ChiSquare';
import { KolmogorovSmirnov } from './KolmogorovSmirnov';

export class LinearCongruenial implements RandomGenerator {
  public seed: number;
  public a: number;
  public c: number;
  public m: number;
  private randoms!: number[];

  constructor(seed: number, a: number, c: number, m: number) {
    this.seed = seed;
    this.a = a;
    this.c = c;
    this.m = m;
  }

  public generateRandoms = async (): Promise<number[]> => {
    if (this.seed < 0 || this.a < 0 || this.c < 0 || this.m < 0)
      Promise.reject('The parameters are not valid');

    this.randoms = [];
    let set = new Set();
    let rnd = this.seed;
    while (!set.has(rnd)) {
      this.randoms.push(rnd / this.m);
      set.add(rnd);
      rnd = (this.a * rnd + this.c) % this.m;
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
