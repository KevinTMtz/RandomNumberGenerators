import { RandomGenerator } from '../Interfaces/RandomGenerator';

export class MiddleSquares implements RandomGenerator {
  public seed: number;
  private randoms!: number[];

  constructor(seed: number) {
    this.seed = seed;
  }

  public generateRandoms = async (): Promise<number[]> => {
    if (this.seed < 0) return Promise.reject('The parameters are not valid');

    this.randoms = [];
    let set = new Set();
    let rnd = this.seed;
    while (!set.has(rnd)) {
      this.randoms.push(rnd / 10000);
      set.add(rnd);
      rnd = this.getNextRandom(rnd);
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
