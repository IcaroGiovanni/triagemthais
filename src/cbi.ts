export type ResponseValue = 'sempre' | 'muitas_vezes' | 'as_vezes' | 'raramente' | 'nunca';

export type DimensionId = 'pessoal' | 'trabalho' | 'clientes';

export type IntensityLevel = 'baixa' | 'moderada' | 'elevada';

export interface CBIQuestion {
  id: number;
  text: string;
  dimension: DimensionId;
  dimensionName: string;
  isReversed?: boolean;
  note?: string;
}

export interface DimensionScore {
  id: DimensionId;
  name: string;
  score: number;
  itemCount: number;
  itemIds: number[];
  intensity: IntensityLevel;
  intensityLabel: string;
  description: string;
  recommendation: string;
}

export interface ScreeningResult {
  id: string;
  timestamp: number;
  dateFormatted: string;
  answers: Record<number, ResponseValue>;
  dimensions: {
    pessoal: DimensionScore;
    trabalho: DimensionScore;
    clientes: DimensionScore;
  };
  clientWorkApplicable: boolean;
}
