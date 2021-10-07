import { InputValues } from './InputValues';

export interface RandomGenerator {
  generateRandoms(
    values: InputValues | InputValues[],
    n?: number,
  ): Promise<number[]>;
  getRandoms(): number[];
}
