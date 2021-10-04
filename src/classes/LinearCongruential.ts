import { error } from 'console';
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
  private validator!: ChiSquare | KolmogorovSmirnov;

  constructor(seed: number, a: number, c: number, m: number) {
    this.seed = seed;
    this.a = a;
    this.c = c;
    this.m = m;
  }

  public generateRandoms = async (): Promise<number[]> => {
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
    return this.randoms;
  };

  public validate = async (
    test: 'cs' | 'ks',
    alpha: number,
  ): Promise<boolean> => {
    if (!this.randoms)
      Promise.reject('To validate the randoms you need to generate them first');
    this.validator = test == 'cs' ? new ChiSquare() : new KolmogorovSmirnov();
    return await this.validator.validate(this.randoms.sort(), alpha);
  };

  public getValidationData = (): ChiSquareData | KolmogorovSmirnovData => {
    if (!this.validator)
      throw error('To get the validation data, you have to validate first');
    return this.validator.getData();
  };
}
