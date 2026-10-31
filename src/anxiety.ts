export type AnxietyResponseValue =
  | 'nem_um_pouco'
  | 'as_vezes'
  | 'frequentemente'
  | 'a_maior_parte';

export type AnxietyClusterId = 'emocional' | 'cognitivo' | 'fisiologico' | 'comportamental';

export interface AnxietyQuestion {
  id: number;
  text: string;
  cluster: AnxietyClusterId;
  clusterName: string;
}

export type AnxietyCategory = 'faixa_1' | 'faixa_2' | 'faixa_3' | 'faixa_4';

export interface AnxietyResult {
  id: string;
  timestamp: number;
  dateFormatted: string;
  answers: Record<number, AnxietyResponseValue>;
  totalScore: number;
  category: AnxietyCategory;
  categoryRange: string;
  categoryDescription: string;
  statusBadge: string;
  clusterScores: Record<
    AnxietyClusterId,
    { name: string; score: number; maxScore: number; percentage: number }
  >;
}
