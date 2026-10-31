import {
  AGREE_SCORES_ITEMS,
  AQ_DOMAINS_CONFIG,
  AQ_QUESTIONS,
} from './aqQuestions';
import {
  AQCutoffCategory,
  AQDomainId,
  AQDomainScore,
  AQResponseValue,
  AQResult,
} from './aq';

export function getPointsForAQAnswer(
  questionId: number,
  answer: AQResponseValue
): number {
  const isAgreeScores = AGREE_SCORES_ITEMS.has(questionId);

  if (isAgreeScores) {
    // Concordo = 1, Discordo = 0
    return answer === 'concordo_plenamente' || answer === 'concordo_um_pouco'
      ? 1
      : 0;
  } else {
    // Discordo = 1, Concordo = 0 (invertida)
    return answer === 'discordo_um_pouco' || answer === 'discordo_plenamente'
      ? 1
      : 0;
  }
}

export function getAQCategory(totalScore: number): {
  category: AQCutoffCategory;
  categoryTitle: string;
  categoryDescription: string;
  statusBadge: string;
} {
  if (totalScore <= 25) {
    return {
      category: 'faixa_1',
      categoryTitle:
        'Seu resultado não atingiu o ponto de corte de rastreio utilizado nesta triagem.',
      categoryDescription: `Você obteve ${totalScore} pontos de 50.\n\nSeu resultado ficou abaixo do ponto de corte de rastreio de 26 pontos utilizado em algumas aplicações do AQ-50.\n\nIsso significa que, neste questionário, você não apresentou uma quantidade de respostas que atingisse esse ponto de referência.\n\nÉ importante lembrar que um resultado abaixo do ponto de corte não exclui, sozinho, a possibilidade de autismo. Questionários de rastreio são instrumentos auxiliares e devem ser interpretados considerando a história do desenvolvimento, características atuais e contexto individual.`,
      statusBadge: 'Pontuação abaixo do ponto de corte (0–25)',
    };
  }

  if (totalScore <= 31) {
    return {
      category: 'faixa_2',
      categoryTitle: 'Seu resultado atingiu o ponto de corte de rastreio.',
      categoryDescription: `Você obteve ${totalScore} pontos de 50.\n\nSeu resultado atingiu o ponto de corte de 26 pontos, utilizado como referência de rastreio em estudos com o AQ-50.\n\nIsso indica a presença de características que podem justificar uma investigação mais aprofundada.\n\nEsse resultado não significa que você tenha TEA. Características identificadas por instrumentos de rastreio também podem aparecer em diferentes condições e contextos.\n\nA avaliação profissional considera, entre outros aspectos, a história do desenvolvimento, funcionamento social e comunicativo, padrões de comportamento, interesses, aspectos sensoriais, estratégias de adaptação e diagnóstico diferencial.`,
      statusBadge: 'Pontuação no ponto de corte de rastreio (26–31)',
    };
  }

  return {
    category: 'faixa_3',
    categoryTitle: 'Seu resultado apresentou uma pontuação elevada no AQ-50.',
    categoryDescription: `Você obteve ${totalScore} pontos de 50.\n\nSeu resultado atingiu ou ultrapassou o ponto de corte de 32 pontos, referência clínica originalmente proposta para o AQ-50.\n\nEsse resultado indica uma quantidade elevada de características autorreferidas relacionadas aos domínios avaliados pelo questionário e pode justificar uma investigação profissional mais aprofundada.\n\nO resultado não confirma diagnóstico de Transtorno do Espectro Autista.\n\nO diagnóstico de TEA não é realizado pela pontuação de um questionário isolado. É necessária uma avaliação clínica abrangente, considerando a história do desenvolvimento e o funcionamento da pessoa em diferentes contextos.`,
    statusBadge: 'Pontuação clinicamente expressiva (32–50)',
  };
}

export function calculateAQResult(
  answers: Record<number, AQResponseValue>
): AQResult {
  let totalScore = 0;

  const domainScores: Record<
    AQDomainId,
    { score: number; totalItems: number }
  > = {
    habilidades_sociais: { score: 0, totalItems: 10 },
    troca_atencao: { score: 0, totalItems: 10 },
    atencao_detalhes: { score: 0, totalItems: 10 },
    comunicacao: { score: 0, totalItems: 10 },
    imaginacao: { score: 0, totalItems: 10 },
  };

  AQ_QUESTIONS.forEach((q) => {
    const ans = answers[q.id];
    if (ans) {
      const pts = getPointsForAQAnswer(q.id, ans);
      totalScore += pts;
      domainScores[q.domain].score += pts;
    }
  });

  const domains: Record<AQDomainId, AQDomainScore> = {} as any;
  (Object.keys(domainScores) as AQDomainId[]).forEach((d) => {
    const raw = domainScores[d];
    domains[d] = {
      domain: d,
      domainName: AQ_DOMAINS_CONFIG[d].name,
      score: raw.score,
      totalItems: raw.totalItems,
      percentage: Math.round((raw.score / raw.totalItems) * 100),
    };
  });

  const catInfo = getAQCategory(totalScore);

  const now = new Date();
  const dateFormatted = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(now);

  return {
    id: 'aq-' + Date.now(),
    timestamp: Date.now(),
    dateFormatted,
    answers,
    totalScore,
    ...catInfo,
    domains,
  };
}

export const AQ_FIXED_DISCLAIMER =
  'Importante: este questionário é uma ferramenta de rastreio e não substitui uma avaliação psicológica ou neuropsicológica. A pontuação deve ser interpretada dentro do contexto individual e não permite, isoladamente, confirmar ou excluir um diagnóstico de Transtorno do Espectro Autista.';

export function formatAQSummaryForSharing(res: AQResult): string {
  return [
    '📋 TRIAGEM DO ESPECTRO DO AUTISMO - AQ-50 (AUTISM SPECTRUM QUOTIENT)',
    `Data da aplicação: ${res.dateFormatted}`,
    `Código de rastreio: ${res.id}`,
    '',
    `PONTUAÇÃO TOTAL: ${res.totalScore} / 50 pontos`,
    `Classificação: ${res.statusBadge}`,
    '',
    `Título: ${res.categoryTitle}`,
    '',
    'PONTUAÇÃO POR ÁREAS DO AQ-50:',
    `• Habilidades sociais: ${res.domains.habilidades_sociais.score}/10 pontos`,
    `• Atenção / troca de atenção: ${res.domains.troca_atencao.score}/10 pontos`,
    `• Atenção aos detalhes: ${res.domains.atencao_detalhes.score}/10 pontos`,
    `• Comunicação: ${res.domains.comunicacao.score}/10 pontos`,
    `• Imaginação: ${res.domains.imaginacao.score}/10 pontos`,
    '',
    'AVISO DE RASTREIO:',
    AQ_FIXED_DISCLAIMER,
    '',
    'Nota: O AQ-50 não estabelece diagnóstico, probabilidade percentual nem graus de autismo (leve/moderado/grave).',
  ].join('\n');
}
