import { ASRS_QUESTIONS } from './asrsQuestions';
import {
  ASRSClassification,
  ASRSQuestion,
  ASRSResponseValue,
  ASRSResult,
} from './asrs';

export const ASRS_FIXED_DISCLAIMER =
  'Este questionário é um instrumento de rastreio de sintomas e não substitui uma avaliação médica, neuropsicológica ou psiquiátrica. O diagnóstico de TDAH em adultos requer anamnese clínica detalhada, investigação do histórico na infância, avaliação de prejuízos em múltiplos ambientes e diagnóstico diferencial.';

/**
 * Calculates whether an item in Part A scores a point (0 or 1).
 * Standard WHO / ASRS-v1.1 rule:
 * Items 1, 2, 3: "Algumas Vezes", "Frequentemente" or "Muito Frequentemente" = 1 point
 * Items 4, 5, 6: "Frequentemente" or "Muito Frequentemente" = 1 point
 */
export function getPointForPartAItem(
  questionId: number,
  answer: ASRSResponseValue
): number {
  if (questionId <= 3) {
    return answer === 'algumas_vezes' ||
      answer === 'frequentemente' ||
      answer === 'muito_frequentemente'
      ? 1
      : 0;
  }
  if (questionId <= 6) {
    return answer === 'frequentemente' || answer === 'muito_frequentemente'
      ? 1
      : 0;
  }
  return 0; // Items 7-18 are Part B and are not scored into Part A
}

export function isAnswerInShadedThreshold(
  question: ASRSQuestion,
  answer: ASRSResponseValue
): boolean {
  if (question.part !== 'A') return false;
  return getPointForPartAItem(question.id, answer) === 1;
}

export function calculateASRSResult(
  answers: Record<number, ASRSResponseValue>
): ASRSResult {
  let partAScore = 0;
  const partAItemPoints: Record<number, number> = {};

  // Part A (items 1 to 6)
  for (let id = 1; id <= 6; id++) {
    const ans = answers[id];
    const pt = ans ? getPointForPartAItem(id, ans) : 0;
    partAItemPoints[id] = pt;
    partAScore += pt;
  }

  // Classification based on Part A (0 to 6)
  const isPositive = partAScore >= 4;
  const classification: ASRSClassification = isPositive ? 'positivo' : 'negativo';

  const classificationTitle = isPositive
    ? 'Rastreio Positivo: Com Sinais Suficientes para TDAH'
    : 'Rastreio Negativo: Sem Sinais Suficientes para TDAH';

  const statusBadge = isPositive
    ? 'Com Sinais Suficientes para TDAH'
    : 'Sem Sinais Suficientes para TDAH';

  const classificationDescription = isPositive
    ? `Você pontuou ${partAScore} de 6 pontos na Parte A do ASRS-v1.1. Esta pontuação atinge o critério de corte de rastreio positivo (4 a 6 pontos), indicando uma frequência expressiva de sintomas compatíveis com o Transtorno do Déficit de Atenção com Hiperatividade (TDAH). Recomenda-se considerar uma avaliação médica ou neuropsicológica especializada para investigar a história do desenvolvimento, persistência dos sintomas e impacto funcional.`
    : `Você pontuou ${partAScore} de 6 pontos na Parte A do ASRS-v1.1. Esta pontuação situa-se na faixa de rastreio negativo (0 a 3 pontos), indicando que, no momento atual avaliado, não foram identificados sinais em frequência suficiente para sugerir rastreio positivo para TDAH. Vale ressaltar que questionários de autoavaliação são ferramentas auxiliares e não excluem isoladamente a necessidade de investigação caso haja queixas pontuais.`;

  // Part B frequencies (items 7 to 18)
  const partBFrequencies = {
    muitoFrequentemente: 0,
    frequentemente: 0,
    algumasVezes: 0,
    raramente: 0,
    nunca: 0,
  };

  let desatencaoElevada = 0; // items 1-9
  let hiperatividadeElevada = 0; // items 10-18

  ASRS_QUESTIONS.forEach((q) => {
    const ans = answers[q.id];
    if (q.part === 'B' && ans) {
      if (ans === 'muito_frequentemente') partBFrequencies.muitoFrequentemente++;
      else if (ans === 'frequentemente') partBFrequencies.frequentemente++;
      else if (ans === 'algumas_vezes') partBFrequencies.algumasVezes++;
      else if (ans === 'raramente') partBFrequencies.raramente++;
      else if (ans === 'nunca') partBFrequencies.nunca++;
    }

    // Supplementary symptom frequency analysis (items 1-18)
    if (ans === 'frequentemente' || ans === 'muito_frequentemente') {
      if (q.subtype === 'desatencao') desatencaoElevada++;
      else hiperatividadeElevada++;
    }
  });

  const now = new Date();
  const dateFormatted = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(now);

  return {
    id: 'asrs-' + Date.now(),
    timestamp: Date.now(),
    dateFormatted,
    answers,
    partAScore,
    classification,
    classificationTitle,
    classificationDescription,
    statusBadge,
    partAItemPoints,
    partBFrequencies,
    symptomCounts: {
      desatencaoElevada,
      hiperatividadeElevada,
    },
  };
}

export function formatASRSSummaryForSharing(res: ASRSResult): string {
  return [
    '📋 ESCALA DE AUTOAVALIAÇÃO DE TDAH EM ADULTOS — ASRS-18 (OMS / ASRS-v1.1)',
    `Data da aplicação: ${res.dateFormatted}`,
    `Código de rastreio: ${res.id}`,
    '',
    `RESULTADO DA PARTE A (RASTREIO OFICIAL):`,
    `Pontuação: ${res.partAScore} de 6 pontos`,
    `Classificação: ${res.classificationTitle.toUpperCase()}`,
    '',
    `Interpretação:`,
    res.classificationDescription,
    '',
    'PARTE B (PERFIL COMPLEMENTAR DE SINTOMAS - ITENS 7 A 18):',
    `• Muito Frequentemente: ${res.partBFrequencies.muitoFrequentemente} itens`,
    `• Frequentemente: ${res.partBFrequencies.frequentemente} itens`,
    `• Algumas Vezes: ${res.partBFrequencies.algumasVezes} itens`,
    `• Raramente: ${res.partBFrequencies.raramente} itens`,
    `• Nunca: ${res.partBFrequencies.nunca} itens`,
    '',
    `Sintomas com frequência elevada (Frequentemente / Muito Frequentemente no total de 18 itens):`,
    `• Eixo de Desatenção (Itens 1 a 9): ${res.symptomCounts.desatencaoElevada} de 9 sintomas`,
    `• Eixo de Hiperatividade / Impulsividade (Itens 10 a 18): ${res.symptomCounts.hiperatividadeElevada} de 9 sintomas`,
    '',
    'AVISO CLÍNICO OBRIGATÓRIO:',
    ASRS_FIXED_DISCLAIMER,
    '',
    'Nota: A Parte B não possui nota de corte global no método tradicional da OMS, funcionando como levantamento complementar de sintomas para apoiar a anamnese clínica.',
  ].join('\n');
}
