import { InputValues } from '../../Interfaces/InputValues';
import { RandomGenerator } from '../../Interfaces/RandomGenerator';
import { MultiplicativeCongruential } from './MultiplicativeCongruential';

export class CombinedCongruential implements RandomGenerator {
  private randoms!: number[];

  private validateInput = (values: InputValues[]) => {
    if (!values || values.length == 0) return false;
    values.forEach((val) => {
      if (
        !val ||
        !val.seed ||
        val.seed <= 0 ||
        !val.a ||
        val.a <= 0 ||
        val.c ||
        !val.m ||
        val.m <= 0
      )
        return false;
    });
    return true;
  };

  public generateRandoms = async (
    values: InputValues[],
    n?: number,
  ): Promise<number[]> => {
    if (values.length < 2 || !this.validateInput(values) || (n && n <= 0))
      return Promise.reject('The parameters are not valid');

    this.randoms = [];
    const k = values.length;
    const gen_rnds: number[][] = [];
    for (let i = 0; i < k; i++) {
      const gen = new MultiplicativeCongruential();
      await gen.generateRandoms(values[i]).then(
        (rnds) => {
          rnds = rnds.map((rnd) => {
            return rnd * values[i].m!;
          });
          gen_rnds.push(rnds);
        },
        (error) => console.log(error),
      );
    }

    let period = 1;
    let mod = 0;
    values.forEach((val) => {
      period *= val.m! - 1;
      mod = Math.max(mod, val.m!);
    });
    period /= 2;
    let i = 0;
    while (i < period) {
      let rnd = this.getNextRandom(gen_rnds, i, mod, k);
      this.randoms.push(rnd > 0 ? rnd / mod : (mod - 1) / mod);
      i++;
      if (n && i == n) return this.randoms;
    }
    return this.randoms;
  };

  private getNextRandom = (
    gen_rnds: number[][],
    col: number,
    mod: number,
    k: number,
  ) => {
    let rnd = 0;
    let mult = 1;
    for (let j = 0; j < k; j++) {
      rnd += mult * gen_rnds[j][col % gen_rnds[j].length];
      mult *= -1;
    }
    return rnd >= 0 ? rnd % mod : (rnd % mod) + mod;
  };

  public getRandoms = (): number[] => {
    if (!this.randoms) return [];
    return this.randoms;
  };
}
