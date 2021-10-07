import { GeneratorValues } from '../../Interfaces/components/types';
import { RandomGenerator } from '../../Interfaces/Generators/RandomGenerator';

export class MiddleSquares implements RandomGenerator {
  private randoms!: number[];

  private validateInput = (values: GeneratorValues) => {
    return (
      values &&
      values.seed &&
      values.seed > 0 &&
      !values.a &&
      !values.c &&
      !values.m
    );
  };

  public generateRandoms = async (
    values: GeneratorValues,
    n?: number,
  ): Promise<number[]> => {
    if (!this.validateInput(values) || (n && n <= 0))
      return Promise.reject('The parameters are not valid');

    this.randoms = [];
    let set = new Set();
    let rnd = values.seed;
    while (!set.has(rnd)) {
      this.randoms.push(rnd / 10000);
      set.add(rnd);
      rnd = this.getNextRandom(rnd);
      if (n && this.randoms.length == n) return this.randoms;
    }
    return this.randoms;
  };

  public getRandoms = (): number[] => {
    if (!this.randoms) return [];
    return this.randoms;
  };

  private getNextRandom = (seed: number): number => {
    let square: String = '' + Math.pow(seed, 2);
    while (square.length < 8) square = '0' + square;
    return Number(square.substr(2, 4));
  };
}
