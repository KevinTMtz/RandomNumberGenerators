export interface ChiSquareData {
  isValid: boolean;
  range: number;
  k: number;
  classes: number;
  table: ChiSquareCell[];
  X0: number;
  X1: number;
}

export interface ChiSquareCell {
  start: number;
  end: number;
  absolute: number;
  probability: number;
  theoretical: number;
  result: number;
}
