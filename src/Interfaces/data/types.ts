interface objectWithKeyStr {
  [key: string]: string;
}

export interface InputValues extends objectWithKeyStr {
  seed: string;
  a: string;
  c: string;
  m: string;
}

export interface GeneratorValues {
  seed?: number;
  a?: number;
  c?: number;
  m?: number;
}
