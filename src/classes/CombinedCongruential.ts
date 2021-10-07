import { log } from 'console';
import { RandomGenerator } from '../Interfaces/RandomGenerator';
import { MultiplicativeCongruential } from './MultiplicativeCongruential';

export class CombinedCongruential implements RandomGenerator {
  public k: number;
  public seed: number[];
  public a: number[];
  public m: number[];
  private randoms!: number[];

  constructor(k: number, seed: number[], a: number[], m: number[]) {
    this.k = k;
    this.seed = seed;
    this.a = a;
    this.m = m;
  }

  public generateRandoms = async (): Promise<number[]> => {
    if (
      this.seed.length != this.k ||
      this.a.length != this.k ||
      this.m.length != this.k
    )
      return Promise.reject('The parameters are not valid');

    this.randoms = [];

    const gen_rnds: number[][] = [];
    for (let i = 0; i < this.k; i++) {
      const gen = new MultiplicativeCongruential(
        this.seed[i],
        this.a[i],
        this.m[i],
      );
      await gen.generateRandoms().then(
        (rnds) => gen_rnds.push(rnds),
        (error) => console.log(error),
      );
    }

    let period = 1;
    let mod = 0;
    this.m.forEach((m) => {
      period *= m - 1;
      mod = Math.max(mod, m);
    });
    period /= 2;

    let i = 0;
    while (i < period) {
      let rnd = this.getNextRandom(gen_rnds, i, mod);
      this.randoms.push(rnd > 0 ? rnd / (mod + 1) : mod / (mod + 1));
      i++;
    }
    return this.randoms;
  };

  private getNextRandom = (gen_rnds: number[][], col: number, mod: number) => {
    let rnd = 0;
    let mult = 1;
    for (let j = 0; j < this.k; j++) {
      rnd += mult * gen_rnds[j][col % gen_rnds[j].length] * this.m[j];
      mult *= -1;
    }
    return rnd >= 0 ? rnd % mod : (rnd % mod) + mod;
  };

  public getRandoms = (): number[] => {
    if (!this.randoms) return [];
    return this.randoms;
  };
}

const cc = new CombinedCongruential(2, [1, 3], [3, 5], [5, 7]);
cc.generateRandoms().then((randoms) => console.log(randoms));
