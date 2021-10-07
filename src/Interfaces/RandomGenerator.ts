export interface RandomGenerator {
  generateRandoms(n?: number): Promise<number[]>;
  getRandoms(): number[];
}
