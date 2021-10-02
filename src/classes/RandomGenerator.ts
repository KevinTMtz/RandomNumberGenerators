export interface RandomGenerator {
  randoms: number[];
  generateRandoms(): Promise<number[]>;
}
