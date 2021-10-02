import { RandomGenerator } from './RandomGenerator';

export class MiddleSquares implements RandomGenerator {
  public seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  public generateRandoms = async (): Promise<number[]> => {
    let set = new Set();
    const randoms: number[] = [];
    let rnd = this.seed;
    while (!set.has(rnd)) {
      randoms.push(rnd / 10000);
      set.add(rnd);
      rnd = this.getNextRandom(rnd);
    }
    return randoms;
  };

  private getNextRandom = (seed: number): number => {
    let square: String = '' + Math.pow(seed, 2);
    while (square.length < 8) square = '0' + square;
    return Number(square.substr(2, 4));
  };
}
