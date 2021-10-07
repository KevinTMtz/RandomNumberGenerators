import { GeneratorValues } from '../components/types';

export interface RandomGenerator {
  generateRandoms(
    values: GeneratorValues | GeneratorValues[],
    n?: number,
  ): Promise<number[]>;
  getRandoms(): number[];
}
