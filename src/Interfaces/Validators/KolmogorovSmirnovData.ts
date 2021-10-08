export interface KolmogorovSmirnovData {
  isValid: boolean;
  table: KolmogorovSmirnovCell[];
  deviation_max_plus: number;
  deviation_max_minus: number;
  deviation_max: number;
  deviation_critical: number;
}

export interface KolmogorovSmirnovCell {
  cdf: number;
  cdf_empirical: number;
  deviation_plus: number;
  deviation_minus: number;
}
