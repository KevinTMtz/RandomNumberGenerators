import { ChiSquareData } from '../../Interfaces/ChiSquareData';
import { KolmogorovSmirnovData } from '../../Interfaces/KolmogorovSmirnovData';
import { RandomGenerator } from '../../Interfaces/RandomGenerator';
import { ChiSquare } from '../Validators/ChiSquare';
import { KolmogorovSmirnov } from '../Validators/KolmogorovSmirnov';

export class MixedCongruential implements RandomGenerator {
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

  private validHullDobell = (): boolean => {
    const RelativePrimes = (c: number, m: number): boolean => {
      let i = 2;
      let limit = Math.min(c, m);
      while (i <= limit) {
        if (m % i == 0 && c % i == 0) return false;
        i++;
      }
      return true;
    };

    const PrimeDivision = (a: number, m: number): boolean => {
      const getPrimes = (m: number): number[] => {
        const limit = Math.ceil(Math.sqrt(m));
        var sieve = [],
          i,
          j,
          primes = [];
        for (i = 2; i <= limit; ++i) {
          if (!sieve[i]) {
            primes.push(i);
            for (j = i << 1; j <= limit; j += i) {
              sieve[j] = true;
            }
          }
        }
        return primes;
      };

      const primes = getPrimes(m);
      primes.forEach((prime) => {
        if (m % prime == 0 && (a - 1) % prime != 0) return false;
      });

      return true;
    };

    const FourDivision = (a: number, m: number): boolean => {
      if (m % 4 == 0) {
        return (a - 1) % 4 == 0 ? true : false;
      }
      return true;
    };

    return (
      RelativePrimes(this.c, this.m) &&
      PrimeDivision(this.a, this.m) &&
      FourDivision(this.a, this.m)
    );
  };

  public generateRandoms = async (n?: number): Promise<number[]> => {
    if (
      !this.validHullDobell() ||
      this.seed < 0 ||
      this.a < 0 ||
      this.c < 0 ||
      this.m < 0 ||
      (n && n <= 0)
    )
      return Promise.reject('The parameters are not valid');

    this.randoms = [];
    let set = new Set();
    let rnd = this.seed;
    while (!set.has(rnd)) {
      this.randoms.push(rnd / this.m);
      set.add(rnd);
      rnd = (this.a * rnd + this.c) % this.m;
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
