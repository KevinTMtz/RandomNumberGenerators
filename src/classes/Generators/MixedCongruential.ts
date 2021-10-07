import { ChiSquareData } from '../../Interfaces/ChiSquareData';
import { InputValues } from '../../Interfaces/InputValues';
import { KolmogorovSmirnovData } from '../../Interfaces/KolmogorovSmirnovData';
import { RandomGenerator } from '../../Interfaces/RandomGenerator';
import { ChiSquare } from '../Validators/ChiSquare';
import { KolmogorovSmirnov } from '../Validators/KolmogorovSmirnov';

export class MixedCongruential implements RandomGenerator {
  private randoms!: number[];

  private validateInput = (values: InputValues) => {
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

  private validHullDobell = (values: InputValues): boolean => {
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
      RelativePrimes(values.c!, values.m!) &&
      PrimeDivision(values.a!, values.m!) &&
      FourDivision(values.a!, values.m!)
    );
  };

  public generateRandoms = async (
    values: InputValues,
    n?: number,
  ): Promise<number[]> => {
    if (
      !this.validateInput(values) ||
      !this.validHullDobell(values) ||
      (n && n <= 0)
    )
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
