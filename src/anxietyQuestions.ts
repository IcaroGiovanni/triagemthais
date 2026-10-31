import { AnxietyQuestion, AnxietyResponseValue, AnxietyClusterId } from './anxiety';

export const ANXIETY_RESPONSE_OPTIONS: Array<{
  value: AnxietyResponseValue;
  label: string;
  points: number;
}> = [
  { value: 'nem_um_pouco', label: 'Nem um pouco', points: 0 },
  { value: 'as_vezes', label: 'Às vezes', points: 1 },
  { value: 'frequentemente', label: 'Frequentemente', points: 2 },
  { value: 'a_maior_parte', label: 'A maior parte do tempo', points: 3 },
];

export const ANXIETY_CLUSTERS_CONFIG: Record<
  AnxietyClusterId,
  { name: string; description: string }
> = {
  fisiologico: {
    name: 'Sintomas Fisiológicos / Corporais',
    description: 'Respostas autonômicas como tensão muscular, tremores, batimento acelerado, falta de ar e alterações gastrintestinais.',
  },
  cognitivo: {
    name: 'Sintomas Cognitivos / Pensamentos',
    description: 'Preocupações recorrentes, pensamentos de perigo e sensação de incapacidade de lidar com desafios.',
  },
  emocional: {
    name: 'Sintomas Emocionais / Afetivos',
    description: 'Nervosismo, inquietação, sensação de alerta contínuo e irritabilidade.',
  },
  comportamental: {
    name: 'Sintomas Comportamentais',
    description: 'Esquiva de ambientes disparadores de ansiedade e impacto nos padrões de sono.',
  },
};

export const ANXIETY_QUESTIONS: AnxietyQuestion[] = [
  { id: 1, text: 'Nervosismo', cluster: 'emocional', clusterName: 'Emocional' },
  { id: 2, text: 'Preocupação', cluster: 'cognitivo', clusterName: 'Cognitivo' },
  { id: 3, text: 'Tremores, palpitação, espasmos musculares', cluster: 'fisiologico', clusterName: 'Fisiológico' },
  { id: 4, text: 'Tensão muscular, dores musculares, nevralgia', cluster: 'fisiologico', clusterName: 'Fisiológico' },
  { id: 5, text: 'Inquietação', cluster: 'emocional', clusterName: 'Emocional' },
  { id: 6, text: 'Cansaço fácil', cluster: 'fisiologico', clusterName: 'Fisiológico' },
  { id: 7, text: 'Falta de ar', cluster: 'fisiologico', clusterName: 'Fisiológico' },
  { id: 8, text: 'Batimento cardíaco acelerado', cluster: 'fisiologico', clusterName: 'Fisiológico' },
  { id: 9, text: 'Transpiração (não resultante de calor)', cluster: 'fisiologico', clusterName: 'Fisiológico' },
  { id: 10, text: 'Boca seca', cluster: 'fisiologico', clusterName: 'Fisiológico' },
  { id: 11, text: 'Tontura ou vertigem', cluster: 'fisiologico', clusterName: 'Fisiológico' },
  { id: 12, text: 'Náusea, diarreia ou problemas estomacais', cluster: 'fisiologico', clusterName: 'Fisiológico' },
  { id: 13, text: 'Aumento na urgência urinária', cluster: 'fisiologico', clusterName: 'Fisiológico' },
  { id: 14, text: 'Rubores (calores) ou calafrios', cluster: 'fisiologico', clusterName: 'Fisiológico' },
  { id: 15, text: 'Dificuldade para engolir ou “nó na garganta”', cluster: 'fisiologico', clusterName: 'Fisiológico' },
  { id: 16, text: 'Sentindo-se tenso ou excitado', cluster: 'emocional', clusterName: 'Emocional' },
  { id: 17, text: 'Facilmente assustado', cluster: 'emocional', clusterName: 'Emocional' },
  { id: 18, text: 'Dificuldade de concentração', cluster: 'cognitivo', clusterName: 'Cognitivo' },
  { id: 19, text: 'Dificuldade para adormecer ou dormir', cluster: 'comportamental', clusterName: 'Comportamental' },
  { id: 20, text: 'Irritabilidade', cluster: 'emocional', clusterName: 'Emocional' },
  { id: 21, text: 'Evitando lugares onde posso ficar ansioso', cluster: 'comportamental', clusterName: 'Comportamental' },
  { id: 22, text: 'Pensamentos de perigo', cluster: 'cognitivo', clusterName: 'Cognitivo' },
  { id: 23, text: 'Sentindo-me incapaz de lidar com as dificuldades', cluster: 'cognitivo', clusterName: 'Cognitivo' },
  { id: 24, text: 'Pensamentos de que algo terrível irá acontecer', cluster: 'cognitivo', clusterName: 'Cognitivo' },
];
