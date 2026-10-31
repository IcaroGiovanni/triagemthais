export type DepressionResponseValue =
  | 'nem_um_pouco'
  | 'as_vezes'
  | 'frequentemente'
  | 'a_maior_parte';

export interface DepressionQuestion {
  id: number;
  text: string;
  isSafetyCritical?: boolean;
  safetyLevel?: 'thoughts' | 'death' | 'plan';
}

export type DepressionSeverityBand = 'normal' | 'leve' | 'moderada' | 'grave';

export type SafetyAlertLevel = 'none' | 'item11_death' | 'item10_suicidal_thoughts' | 'item12_plan';

export interface DepressionSafetyInfo {
  hasSafetyRisk: boolean; // item10 > 0 || item11 > 0 || item12 > 0
  highestLevel: SafetyAlertLevel;
  item10Score: number;
  item11Score: number;
  item12Score: number;
  alertHeadline: string;
  alertMessage: string;
  isImmediateEmergency: boolean;
}

export interface DepressionResult {
  id: string;
  timestamp: number;
  dateFormatted: string;
  answers: Record<number, DepressionResponseValue>;
  totalScore: number; // 0 to 57
  severityBand: DepressionSeverityBand;
  bandLabel: string;
  scoreDescription: string;
  statusBadge: string;
  safety: DepressionSafetyInfo;
  disclaimerText: string;
}
