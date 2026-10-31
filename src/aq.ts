export type AQResponseValue =
  | 'concordo_plenamente'
  | 'concordo_um_pouco'
  | 'discordo_um_pouco'
  | 'discordo_plenamente';

export type AQDomainId =
  | 'habilidades_sociais'
  | 'troca_atencao'
  | 'atencao_detalhes'
  | 'comunicacao'
  | 'imaginacao';

export interface AQQuestion {
  id: number;
  text: string;
  domain: AQDomainId;
  domainName: string;
  scoringType: 'agree_scores' | 'disagree_scores'; // agree_scores: Concordo = 1, disagree_scores: Discordo = 1
}

export type AQCutoffCategory = 'faixa_1' | 'faixa_2' | 'faixa_3';

export interface AQDomainScore {
  domain: AQDomainId;
  domainName: string;
  score: number;
  totalItems: number;
  percentage: number;
}

export interface AQResult {
  id: string;
  timestamp: number;
  dateFormatted: string;
  answers: Record<number, AQResponseValue>;
  totalScore: number;
  category: AQCutoffCategory;
  categoryTitle: string;
  categoryDescription: string;
  statusBadge: string;
  domains: Record<AQDomainId, AQDomainScore>;
}
