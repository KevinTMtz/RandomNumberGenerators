export interface RandomGenerator {
  generateRandoms(): Promise<number[]>;
  getRandoms(): number[];
}
