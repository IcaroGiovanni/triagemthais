import {
  DepressionResponseValue,
  DepressionResult,
  DepressionSafetyInfo,
  DepressionSeverityBand,
  SafetyAlertLevel,
} from './depression';
import { DEPRESSION_QUESTIONS, DEPRESSION_RESPONSE_OPTIONS } from './depressionQuestions';

export const DEPRESSION_FIXED_DISCLAIMER =
  'Este questionário foi desenvolvido por Dennis Greenberger e Christine A. Padesky e é utilizado como recurso de identificação e acompanhamento de sintomas relacionados ao humor deprimido. Importante: o resultado não estabelece diagnóstico de depressão e deve ser interpretado considerando o contexto clínico individual e, quando necessário, por profissional habilitado.';

export const VALUE_TO_POINTS: Record<DepressionResponseValue, number> = {
  nem_um_pouco: 0,
  as_vezes: 1,
  frequentemente: 2,
  a_maior_parte: 3,
};

export function evaluateDepressionSafety(
  answers: Record<number, DepressionResponseValue>
): DepressionSafetyInfo {
  const item10Score = answers[10] ? VALUE_TO_POINTS[answers[10]] : 0;
  const item11Score = answers[11] ? VALUE_TO_POINTS[answers[11]] : 0;
  const item12Score = answers[12] ? VALUE_TO_POINTS[answers[12]] : 0;

  const hasSafetyRisk = item10Score > 0 || item11Score > 0 || item12Score > 0;

  let highestLevel: SafetyAlertLevel = 'none';
  let alertHeadline = '';
  let alertMessage = '';
  let isImmediateEmergency = false;

  // Precedence rule: Item 12 (plan) > Item 10 (suicidal thoughts) > Item 11 (thoughts of death)
  if (item12Score > 0) {
    highestLevel = 'item12_plan';
    isImmediateEmergency = true;
    alertHeadline = 'Procure ajuda imediatamente se houver risco atual.';
    alertMessage =
      'Você indicou ter pensado em um plano suicida. Um questionário on-line não consegue avaliar adequadamente a urgência ou o risco dessa situação. Se esse plano está relacionado a uma intenção atual de se machucar, se você acredita que pode agir ou se não consegue se manter em segurança, procure imediatamente um serviço de emergência ou vá ao pronto atendimento mais próximo. Não permaneça sozinho(a) nesse momento e procure uma pessoa de confiança para permanecer com você.';
  } else if (item10Score > 0) {
    highestLevel = 'item10_suicidal_thoughts';
    isImmediateEmergency = false;
    alertHeadline = 'Precisamos conversar sobre isso.';
    alertMessage =
      'Sua resposta indica que você relatou pensamentos suicidas na última semana. Este questionário não permite avaliar sozinho o nível de risco. Se esses pensamentos estão acontecendo agora, se você sente que pode se machucar ou se existe risco imediato, procure atendimento de urgência ou acione o serviço de emergência da sua região. Se não há risco imediato, considere conversar o quanto antes com um profissional de saúde mental.';
  } else if (item11Score > 0) {
    highestLevel = 'item11_death';
    isImmediateEmergency = false;
    alertHeadline = 'Sua resposta merece atenção.';
    alertMessage =
      'Você indicou ter tido pensamentos recorrentes relacionados à morte na última semana. Isso não significa, por si só, que exista intenção suicida, mas é uma informação importante que merece ser compreendida em contexto clínico. Considere buscar avaliação profissional, especialmente se esses pensamentos estiverem aumentando, causando sofrimento ou associados a pensamentos de se machucar.';
  }

  return {
    hasSafetyRisk,
    highestLevel,
    item10Score,
    item11Score,
    item12Score,
    alertHeadline,
    alertMessage,
    isImmediateEmergency,
  };
}

export function calculateDepressionResult(
  answers: Record<number, DepressionResponseValue>
): DepressionResult {
  let totalScore = 0;

  DEPRESSION_QUESTIONS.forEach((q) => {
    const ans = answers[q.id];
    if (ans) {
      totalScore += VALUE_TO_POINTS[ans];
    }
  });

  // Reference severity bands
  let severityBand: DepressionSeverityBand = 'normal';
  let bandLabel = 'Faixa de referência: 0 a 12 pontos (Normal / Poucos sintomas)';
  let scoreDescription =
    'Foram identificados poucos indicadores de sintomas depressivos neste questionário. Mantenha hábitos de autocuidado e monitore seu bem-estar emocional.';
  let statusBadge = 'Poucos indicadores (0–12 pts)';

  if (totalScore >= 39) {
    severityBand = 'grave';
    bandLabel = 'Faixa de referência: 39 a 57 pontos (Concentração acentuada)';
    scoreDescription =
      'Foi identificada uma alta concentração de sintomas relacionados ao humor deprimido. Recomenda-se fortemente buscar uma avaliação profissional (médica ou psicológica) para compreender a intensidade, o impacto e os fatores associados aos sintomas.';
    statusBadge = 'Alta concentração (39–57 pts)';
  } else if (totalScore >= 22) {
    severityBand = 'moderada';
    bandLabel = 'Faixa de referência: 22 a 38 pontos (Concentração moderada)';
    scoreDescription =
      'Foi identificada uma concentração moderada de sintomas relacionados ao humor deprimido. Uma avaliação profissional com psicólogo ou médico pode ser muito valiosa para compreender esses sintomas e os prejuízos na sua rotina.';
    statusBadge = 'Concentração moderada (22–38 pts)';
  } else if (totalScore >= 13) {
    severityBand = 'leve';
    bandLabel = 'Faixa de referência: 13 a 21 pontos (Concentração leve)';
    scoreDescription =
      'Foram identificados indicadores de sintomas depressivos em nível leve. Pode ser útil observar como esses sintomas estão interferindo no seu dia a dia e dialogar com um profissional de saúde mental.';
    statusBadge = 'Indicadores leves (13–21 pts)';
  }

  const safety = evaluateDepressionSafety(answers);

  const now = new Date();
  const dateFormatted = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(now);

  return {
    id: 'depressao-' + Date.now(),
    timestamp: Date.now(),
    dateFormatted,
    answers,
    totalScore,
    severityBand,
    bandLabel,
    scoreDescription,
    statusBadge,
    safety,
    disclaimerText: DEPRESSION_FIXED_DISCLAIMER,
  };
}

export function formatDepressionSummaryForSharing(res: DepressionResult): string {
  const lines: string[] = [
    '====================================================',
    'TRIAGEM DE SINTOMAS DEPRESSIVOS (GREENBERGER & PADESKY)',
    '====================================================',
    `Data da Aplicação: ${res.dateFormatted}`,
    `Protocolo: ${res.id}`,
    '',
    `Escore de sintomas depressivos: ${res.totalScore}/57 pontos`,
    `${res.bandLabel}`,
    '',
    'INTERPRETAÇÃO CLÍNICA:',
    res.scoreDescription,
    '',
  ];

  if (res.safety.hasSafetyRisk) {
    lines.push(
      '----------------------------------------------------',
      'ALERTA CLÍNICO DE SEGURANÇA:',
      res.safety.alertHeadline,
      res.safety.alertMessage,
      '',
      'CANAIS DE APOIO IMEDIATO:',
      '• CVV (Centro de Valorização da Vida): Ligue 188 (ligação gratuita 24h)',
      '• SAMU: Ligue 192 (emergência médica)',
      '• Procure a UPA ou Pronto Atendimento de Emergência mais próximo',
      '----------------------------------------------------',
      ''
    );
  }

  lines.push(
    'AVISO ÉTICO IMPORTANTE:',
    'Este resultado representa a pontuação obtida neste questionário e não estabelece diagnóstico de depressão. A interpretação deve considerar o contexto individual e, quando necessário, ser realizada por profissional habilitado.',
    '===================================================='
  );

  return lines.join('\n');
}
