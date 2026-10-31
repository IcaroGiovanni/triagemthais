export type ASRSResponseValue =
  | 'nunca'
  | 'raramente'
  | 'algumas_vezes'
  | 'frequentemente'
  | 'muito_frequentemente';

export type ASRSPart = 'A' | 'B';

export type ASRSSubtype = 'desatencao' | 'hiperatividade_impulsividade';

export interface ASRSQuestion {
  id: number;
  text: string;
  part: ASRSPart;
  subtype: ASRSSubtype;
  subtypeName: string;
  // Threshold for Part A: for items 1-3 it's 'algumas_vezes' (or higher); for 4-6 it's 'frequentemente' (or higher)
  thresholdMinForPoint?: ASRSResponseValue;
}

export type ASRSClassification = 'negativo' | 'positivo';

export interface ASRSResult {
  id: string;
  timestamp: number;
  dateFormatted: string;
  answers: Record<number, ASRSResponseValue>;
  partAScore: number; // 0 to 6
  classification: ASRSClassification;
  classificationTitle: string;
  classificationDescription: string;
  statusBadge: string;
  partAItemPoints: Record<number, number>; // 0 or 1 for items 1 to 6
  partBFrequencies: {
    muitoFrequentemente: number;
    frequentemente: number;
    algumasVezes: number;
    raramente: number;
    nunca: number;
  };
  symptomCounts: {
    desatencaoElevada: number; // count of items 1-9 frequent/very frequent
    hiperatividadeElevada: number; // count of items 10-18 frequent/very frequent
  };
}
