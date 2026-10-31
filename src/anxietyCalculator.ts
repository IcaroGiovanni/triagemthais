import { ANXIETY_CLUSTERS_CONFIG, ANXIETY_QUESTIONS, ANXIETY_RESPONSE_OPTIONS } from './anxietyQuestions';
import {
  AnxietyCategory,
  AnxietyClusterId,
  AnxietyResponseValue,
  AnxietyResult,
} from './anxiety';

export const ANXIETY_FIXED_DISCLAIMER =
  'Este questionário é um recurso de rastreio e monitoramento de sintomas. O resultado não estabelece diagnóstico de transtorno de ansiedade e não substitui avaliação psicológica ou médica.';

export function getPointsForAnxietyAnswer(val: AnxietyResponseValue): number {
  const opt = ANXIETY_RESPONSE_OPTIONS.find((o) => o.value === val);
  return opt ? opt.points : 0;
}

export function getAnxietyCategory(totalScore: number): {
  category: AnxietyCategory;
  categoryRange: string;
  categoryDescription: string;
  statusBadge: string;
} {
  if (totalScore <= 17) {
    return {
      category: 'faixa_1',
      categoryRange: '0–17 pontos',
      categoryDescription:
        'Poucos indicadores de sintomas ansiosos foram identificados neste questionário.',
      statusBadge: 'Poucos indicadores (0–17)',
    };
  }

  if (totalScore <= 35) {
    return {
      category: 'faixa_2',
      categoryRange: '18–35 pontos',
      categoryDescription:
        'Foram identificados indicadores de sintomas ansiosos. Pode ser útil observar como esses sintomas estão interferindo na sua rotina.',
      statusBadge: 'Indicadores identificados (18–35)',
    };
  }

  if (totalScore <= 53) {
    return {
      category: 'faixa_3',
      categoryRange: '36–53 pontos',
      categoryDescription:
        'Foi identificada uma concentração maior de sintomas relacionados à ansiedade. Uma avaliação profissional pode ajudar a compreender esses sintomas e seus possíveis fatores associados.',
      statusBadge: 'Concentração maior de sintomas (36–53)',
    };
  }

  return {
    category: 'faixa_4',
    categoryRange: '54–72 pontos',
    categoryDescription:
      'Foi identificada uma alta concentração de sintomas relacionados à ansiedade. Recomenda-se considerar uma avaliação profissional para compreender a intensidade, o impacto e os possíveis fatores associados aos sintomas.',
    statusBadge: 'Alta concentração de sintomas (54–72)',
  };
}

export function calculateAnxietyResult(
  answers: Record<number, AnxietyResponseValue>
): AnxietyResult {
  let totalScore = 0;

  const clusterScores: Record<
    AnxietyClusterId,
    { name: string; score: number; count: number }
  > = {
    fisiologico: { name: ANXIETY_CLUSTERS_CONFIG.fisiologico.name, score: 0, count: 0 },
    cognitivo: { name: ANXIETY_CLUSTERS_CONFIG.cognitivo.name, score: 0, count: 0 },
    emocional: { name: ANXIETY_CLUSTERS_CONFIG.emocional.name, score: 0, count: 0 },
    comportamental: { name: ANXIETY_CLUSTERS_CONFIG.comportamental.name, score: 0, count: 0 },
  };

  ANXIETY_QUESTIONS.forEach((q) => {
    clusterScores[q.cluster].count += 1;
    const ans = answers[q.id];
    if (ans) {
      const pts = getPointsForAnxietyAnswer(ans);
      totalScore += pts;
      clusterScores[q.cluster].score += pts;
    }
  });

  const formattedClusters: Record<
    AnxietyClusterId,
    { name: string; score: number; maxScore: number; percentage: number }
  > = {} as any;

  (Object.keys(clusterScores) as AnxietyClusterId[]).forEach((k) => {
    const raw = clusterScores[k];
    const max = raw.count * 3;
    formattedClusters[k] = {
      name: raw.name,
      score: raw.score,
      maxScore: max,
      percentage: max > 0 ? Math.round((raw.score / max) * 100) : 0,
    };
  });

  const categoryInfo = getAnxietyCategory(totalScore);

  const now = new Date();
  const dateFormatted = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(now);

  return {
    id: 'ans-' + Date.now(),
    timestamp: Date.now(),
    dateFormatted,
    answers,
    totalScore,
    ...categoryInfo,
    clusterScores: formattedClusters,
  };
}

export function formatAnxietySummaryForSharing(res: AnxietyResult): string {
  return [
    '📋 INVENTÁRIO DE ANSIEDADE — A MENTE VENCENDO O HUMOR (GREENBERGER & PADESKY)',
    `Data da aplicação: ${res.dateFormatted}`,
    `Período avaliado: Última semana`,
    `Código de rastreio: ${res.id}`,
    '',
    `PONTUAÇÃO TOTAL: ${res.totalScore} / 72 pontos`,
    `Faixa descritiva: ${res.categoryRange}`,
    '',
    `Resultado: "${res.categoryDescription}"`,
    '',
    'DISTRIBUIÇÃO POR AGRUPAMENTOS DE SINTOMAS:',
    `• Sintomas Fisiológicos / Corporais: ${res.clusterScores.fisiologico.score} / ${res.clusterScores.fisiologico.maxScore} pts`,
    `• Sintomas Cognitivos / Pensamentos: ${res.clusterScores.cognitivo.score} / ${res.clusterScores.cognitivo.maxScore} pts`,
    `• Sintomas Emocionais / Afetivos: ${res.clusterScores.emocional.score} / ${res.clusterScores.emocional.maxScore} pts`,
    `• Sintomas Comportamentais: ${res.clusterScores.comportamental.score} / ${res.clusterScores.comportamental.maxScore} pts`,
    '',
    'AVISO:',
    ANXIETY_FIXED_DISCLAIMER,
    '',
    'Nota: O escore deve ser interpretado considerando o contexto individual, histórico, duração dos sintomas e prejuízos funcionais, sem rotulação diagnóstica precipitada.',
  ].join('\n');
}
