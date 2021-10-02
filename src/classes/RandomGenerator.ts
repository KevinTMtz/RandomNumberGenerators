export interface RandomGenerator {
  generateRandoms(): Promise<number[]>;
}
