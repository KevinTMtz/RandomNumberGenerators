import { ChiSquareData } from '../../Interfaces/Validators/ChiSquareData';
import { KolmogorovSmirnovData } from '../../Interfaces/Validators/KolmogorovSmirnovData';
import {
  RandomGenerator,
  RandomValidator,
} from '../../Interfaces/Generators/RandomGenerator';
import { ChiSquare } from '../Validators/ChiSquare';
import { KolmogorovSmirnov } from '../Validators/KolmogorovSmirnov';
import { GeneratorValues } from '../../Interfaces/data/types';
import { HullDobell } from '../../Interfaces/Validators/HullDobell';

interface IMixedCongruential extends RandomGenerator, RandomValidator {
  validHullDobell(): HullDobell;
}

export const MixedCongruential: IMixedCongruential = class MixedCongruential {
  private static randoms: number[];
  private static values: GeneratorValues;

  private static validateInput = (values: GeneratorValues) => {
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

  public static validHullDobell = (): HullDobell => {
    let general = true;

    const RelativePrimes = (
      c: number,
      m: number,
    ): { areRelativePrimes: boolean } => {
      let i = 2;
      let limit = Math.min(c, m);
      while (i <= limit) {
        if (m % i === 0 && c % i === 0) {
          general = false;
          return { areRelativePrimes: false };
        }
        i++;
      }
      return { areRelativePrimes: true };
    };

    const PrimeDivision = (
      a: number,
      m: number,
    ): { primeDivision: boolean } => {
      const getPrimes = (m: number): number[] => {
        var sieve = [],
          i,
          j,
          primes = [];
        for (i = 2; i <= m; ++i) {
          if (!sieve[i]) {
            if (m % i === 0) primes.push(i);
            for (j = i << 1; j <= m; j += i) {
              sieve[j] = true;
            }
          }
        }
        return primes;
      };

      const primes = getPrimes(m);

      for (const prime of primes) {
        if (m % prime === 0 && (a - 1) % prime !== 0) {
          general = false;
          return {
            primeDivision: false,
          };
        }
      }

      return {
        primeDivision: true,
      };
    };

    const FourDivision = (
      a: number,
      m: number,
    ): { mDivision: boolean; aDivision: boolean } => {
      const mCheck = m % 4 === 0;
      const aCheck = (a - 1) % 4 === 0;

      if (mCheck && !aCheck) general = false;

      return { mDivision: mCheck, aDivision: aCheck };
    };

    return {
      rule1: RelativePrimes(this.values.c!, this.values.m!),
      rule2: PrimeDivision(this.values.a!, this.values.m!),
      rule3: FourDivision(this.values.a!, this.values.m!),
      general: { check: general },
    };
  };

  public static generateRandoms = async (
    values: GeneratorValues,
    n?: number,
  ): Promise<number[]> => {
    this.values = values;

    if (!this.validateInput(values) || (n && n <= 0))
      return Promise.reject('The parameters are not valid');

    this.randoms = [];
    let set = new Set();
    let rnd = values.seed;
    while (!set.has(rnd)) {
      this.randoms.push(rnd! / values.m!);
      set.add(rnd);
      rnd = (values.a! * rnd! + values.c!) % values.m!;
      if (n && this.randoms.length === n) return this.randoms;
    }
    return this.randoms;
  };

  public static getRandoms = (): number[] => {
    if (!this.randoms) return [];
    return this.randoms;
  };

  public static validate = async (
    type: 'CS' | 'KS',
    alpha: number,
  ): Promise<ChiSquareData | KolmogorovSmirnovData> => {
    if (!this.randoms)
      return Promise.reject(
        'To validate the randoms you need to generate them first',
      );
    return type === 'CS'
      ? ChiSquare.validate(this.randoms.sort(), alpha)
      : KolmogorovSmirnov.validate(this.randoms.sort(), alpha);
  };
};
