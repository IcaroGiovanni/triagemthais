import { CBI_QUESTIONS, DIMENSION_CONFIG, RESPONSE_OPTIONS } from './cbiQuestions';
import { DimensionId, DimensionScore, IntensityLevel, ResponseValue, ScreeningResult } from './cbi';

export function getPointsForAnswer(questionId: number, value: ResponseValue): number {
  const option = RESPONSE_OPTIONS.find((opt) => opt.value === value);
  if (!option) return 0;
  
  const question = CBI_QUESTIONS.find((q) => q.id === questionId);
  if (question?.isReversed) {
    return option.reversedPoints;
  }
  return option.standardPoints;
}

export function getIntensityInfo(score: number): {
  intensity: IntensityLevel;
  intensityLabel: string;
  description: string;
  recommendation: string;
} {
  if (score < 50) {
    return {
      intensity: 'baixa',
      intensityLabel: 'Menor intensidade de sinais',
      description: 'Indica menor frequência/intensidade de indicadores de exaustão naquela dimensão avaliada.',
      recommendation:
        'Sinais atenuados nesta dimensão. É benéfico preservar momentos de descompressão, manter sono reparador e limites saudáveis.',
    };
  }
  if (score < 75) {
    return {
      intensity: 'moderada',
      intensityLabel: 'Intensidade moderada',
      description: 'Indica presença relevante de sinais de exaustão naquela dimensão, merecendo investigação clínica e contextual.',
      recommendation:
        'Sinais de alerta presentes. Vale a pena mapear a rotina, identificar gatilhos específicos de sobrecarga e ponderar acompanhamento com psicólogo ou profissional de saúde.',
    };
  }
  return {
    intensity: 'elevada',
    intensityLabel: 'Intensidade elevada',
    description: 'Indica frequência/intensidade elevada de indicadores de exaustão naquela dimensão, recomendando avaliação clínica mais aprofundada.',
    recommendation:
      'Recomenda-se fortemente agendar uma avaliação psicológica, psiquiátrica ou com médico do trabalho para contextualizar os sintomas e construir um plano de acolhimento e manejo.',
  };
}

export function calculateDimensionScore(
  dimensionId: DimensionId,
  answers: Record<number, ResponseValue>
): DimensionScore {
  const config = DIMENSION_CONFIG[dimensionId];
  let sum = 0;
  let answeredCount = 0;

  for (const itemId of config.itemIds) {
    const val = answers[itemId];
    if (val !== undefined) {
      sum += getPointsForAnswer(itemId, val);
      answeredCount += 1;
    }
  }

  // Divisor is the standard items count for this subscale (6 or 7)
  const rawScore = answeredCount > 0 ? sum / config.divisor : 0;
  const roundedScore = Math.round(rawScore * 10) / 10;

  const info = getIntensityInfo(roundedScore);

  return {
    id: dimensionId,
    name: config.name,
    score: roundedScore,
    itemCount: config.itemIds.length,
    itemIds: config.itemIds,
    ...info,
  };
}

export function calculateFullResults(
  answers: Record<number, ResponseValue>,
  clientWorkApplicable = true
): ScreeningResult {
  const pessoal = calculateDimensionScore('pessoal', answers);
  const trabalho = calculateDimensionScore('trabalho', answers);
  const clientes = calculateDimensionScore('clientes', answers);

  const now = new Date();
  const dateFormatted = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(now);

  return {
    id: 'cbi-' + Date.now(),
    timestamp: Date.now(),
    dateFormatted,
    answers,
    dimensions: {
      pessoal,
      trabalho,
      clientes,
    },
    clientWorkApplicable,
  };
}

export function formatResultSummaryForSharing(result: ScreeningResult): string {
  const text = [
    '📋 TRIAGEM DE BURNOUT - COPENHAGEN BURNOUT INVENTORY (CBI)',
    `Data: ${result.dateFormatted}`,
    '',
    '⚠️ AVISO IMPORTANTE: TRIAGEM NÃO É DIAGNÓSTICO.',
    'Os resultados não substituem avaliação psicológica, neuropsicológica ou médica.',
    'O CBI avalia dimensões independentes de 0 a 100 pontos.',
    '',
    'DIMENSÕES AVALIADAS:',
    `• Burnout pessoal: ${result.dimensions.pessoal.score}/100 — ${result.dimensions.pessoal.intensityLabel}`,
    `  "${result.dimensions.pessoal.description}"`,
    '',
    `• Burnout relacionado ao trabalho: ${result.dimensions.trabalho.score}/100 — ${result.dimensions.trabalho.intensityLabel}`,
    `  "${result.dimensions.trabalho.description}"`,
    '',
    result.clientWorkApplicable
      ? `• Burnout relacionado ao trabalho com clientes: ${result.dimensions.clientes.score}/100 — ${result.dimensions.clientes.intensityLabel}\n  "${result.dimensions.clientes.description}"`
      : '• Burnout com clientes: Não aplicável (usuário não atua com atendimento a clientes/público)',
    '',
    'Faixas de Interpretação CBI:',
    '0–49: Menor intensidade de sinais',
    '50–74: Intensidade moderada',
    '75–100: Intensidade elevada',
    '',
    'Nota: O instrumento não estabelece cut-off diagnóstico universal nem utiliza pontuação geral agregada para não mascarar a fonte predominante de esgotamento.',
  ].join('\n');

  return text;
}
