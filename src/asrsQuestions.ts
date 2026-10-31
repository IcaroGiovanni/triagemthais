import { ASRSQuestion, ASRSResponseValue } from './asrs';

export const ASRS_RESPONSE_OPTIONS: Array<{
  value: ASRSResponseValue;
  label: string;
}> = [
  { value: 'nunca', label: 'Nunca' },
  { value: 'raramente', label: 'Raramente' },
  { value: 'algumas_vezes', label: 'Algumas Vezes' },
  { value: 'frequentemente', label: 'Frequentemente' },
  { value: 'muito_frequentemente', label: 'Muito Frequentemente' },
];

export const ASRS_QUESTIONS: ASRSQuestion[] = [
  // --- PARTE A: ITENS 1 A 6 (Rastreio) ---
  {
    id: 1,
    text: 'Com que frequência você comete erros por falta de atenção quando tem de trabalhar num projeto chato ou difícil?',
    part: 'A',
    subtype: 'desatencao',
    subtypeName: 'Desatenção',
    thresholdMinForPoint: 'algumas_vezes',
  },
  {
    id: 2,
    text: 'Com que frequência você tem dificuldade para manter a atenção quando está fazendo um trabalho chato ou repetitivo?',
    part: 'A',
    subtype: 'desatencao',
    subtypeName: 'Desatenção',
    thresholdMinForPoint: 'algumas_vezes',
  },
  {
    id: 3,
    text: 'Com que frequência você tem dificuldade para se concentrar no que as pessoas dizem, mesmo quando elas estão falando diretamente com você?',
    part: 'A',
    subtype: 'desatencao',
    subtypeName: 'Desatenção',
    thresholdMinForPoint: 'algumas_vezes',
  },
  {
    id: 4,
    text: 'Com que frequência você deixa um projeto pela metade depois de já ter feito as partes mais difíceis?',
    part: 'A',
    subtype: 'desatencao',
    subtypeName: 'Desatenção',
    thresholdMinForPoint: 'frequentemente',
  },
  {
    id: 5,
    text: 'Com que frequência você tem dificuldade para fazer um trabalho que exige organização?',
    part: 'A',
    subtype: 'desatencao',
    subtypeName: 'Desatenção',
    thresholdMinForPoint: 'frequentemente',
  },
  {
    id: 6,
    text: 'Quando você precisa fazer algo que exige muita concentração, com que frequência você evita ou adia o início?',
    part: 'A',
    subtype: 'desatencao',
    subtypeName: 'Desatenção',
    thresholdMinForPoint: 'frequentemente',
  },

  // --- PARTE B: ITENS 7 A 18 (Perfil Complementar de Sintomas) ---
  {
    id: 7,
    text: 'Com que frequência você coloca as coisas fora do lugar ou tem dificuldade de encontrar as coisas em casa ou no trabalho?',
    part: 'B',
    subtype: 'desatencao',
    subtypeName: 'Desatenção',
  },
  {
    id: 8,
    text: 'Com que frequência você se distrai com atividades ou barulho a sua volta?',
    part: 'B',
    subtype: 'desatencao',
    subtypeName: 'Desatenção',
  },
  {
    id: 9,
    text: 'Com que frequência você tem dificuldade para lembrar de compromissos ou obrigações?',
    part: 'B',
    subtype: 'desatencao',
    subtypeName: 'Desatenção',
  },
  {
    id: 10,
    text: 'Com que frequência você fica se mexendo na cadeira ou balançando as mãos ou os pés quando precisa ficar sentado (a) por muito tempo?',
    part: 'B',
    subtype: 'hiperatividade_impulsividade',
    subtypeName: 'Hiperatividade / Impulsividade',
  },
  {
    id: 11,
    text: 'Com que frequência você se levanta da cadeira em reuniões ou em outras situações onde deveria ficar sentado (a)?',
    part: 'B',
    subtype: 'hiperatividade_impulsividade',
    subtypeName: 'Hiperatividade / Impulsividade',
  },
  {
    id: 12,
    text: 'Com que frequência você se sente inquieto (a) ou agitado (a)?',
    part: 'B',
    subtype: 'hiperatividade_impulsividade',
    subtypeName: 'Hiperatividade / Impulsividade',
  },
  {
    id: 13,
    text: 'Com que frequência você tem dificuldade para sossegar e relaxar quando tem tempo livre para você?',
    part: 'B',
    subtype: 'hiperatividade_impulsividade',
    subtypeName: 'Hiperatividade / Impulsividade',
  },
  {
    id: 14,
    text: 'Com que frequência você se sente ativo (a) demais e necessitando fazer coisas, como se estivesse “com um motor ligado”?',
    part: 'B',
    subtype: 'hiperatividade_impulsividade',
    subtypeName: 'Hiperatividade / Impulsividade',
  },
  {
    id: 15,
    text: 'Com que frequência você se pega falando demais em situações sociais?',
    part: 'B',
    subtype: 'hiperatividade_impulsividade',
    subtypeName: 'Hiperatividade / Impulsividade',
  },
  {
    id: 16,
    text: 'Quando você está conversando, com que frequência você se pega terminando as frases das pessoas antes delas?',
    part: 'B',
    subtype: 'hiperatividade_impulsividade',
    subtypeName: 'Hiperatividade / Impulsividade',
  },
  {
    id: 17,
    text: 'Com que frequência você tem dificuldade para esperar nas situações onde cada um tem a sua vez?',
    part: 'B',
    subtype: 'hiperatividade_impulsividade',
    subtypeName: 'Hiperatividade / Impulsividade',
  },
  {
    id: 18,
    text: 'Com que frequência você interrompe os outros quando eles estão ocupados?',
    part: 'B',
    subtype: 'hiperatividade_impulsividade',
    subtypeName: 'Hiperatividade / Impulsividade',
  },
];
