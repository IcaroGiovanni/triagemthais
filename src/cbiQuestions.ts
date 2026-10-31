import { CBIQuestion, ResponseValue } from './cbi';

export const RESPONSE_OPTIONS: Array<{
  value: ResponseValue;
  label: string;
  standardPoints: number;
  reversedPoints: number;
}> = [
  { value: 'sempre', label: 'Sempre', standardPoints: 100, reversedPoints: 0 },
  { value: 'muitas_vezes', label: 'Muitas vezes', standardPoints: 75, reversedPoints: 25 },
  { value: 'as_vezes', label: 'Às vezes', standardPoints: 50, reversedPoints: 50 },
  { value: 'raramente', label: 'Raramente', standardPoints: 25, reversedPoints: 75 },
  { value: 'nunca', label: 'Nunca / Quase nunca', standardPoints: 0, reversedPoints: 100 },
];

export const CBI_QUESTIONS: CBIQuestion[] = [
  {
    id: 1,
    text: 'Com que frequência você se sente fraco e suscetível a doenças?',
    dimension: 'pessoal',
    dimensionName: 'Burnout pessoal',
  },
  {
    id: 2,
    text: 'Você tem energia suficiente para a família e os amigos durante o tempo livre?',
    dimension: 'trabalho',
    dimensionName: 'Burnout relacionado ao trabalho',
    isReversed: true,
    note: 'Item com pontuação invertida: ter mais energia livre reflete menor nível de esgotamento.',
  },
  {
    id: 3,
    text: 'Você às vezes se pergunta por quanto tempo ainda poderá continuar trabalhando com clientes?',
    dimension: 'clientes',
    dimensionName: 'Burnout relacionado a clientes',
    note: 'Considera-se "clientes" qualquer público atendido (pacientes, alunos, usuários, parceiros ou clientes).',
  },
  {
    id: 4,
    text: 'Você acha difícil trabalhar com clientes?',
    dimension: 'clientes',
    dimensionName: 'Burnout relacionado a clientes',
  },
  {
    id: 5,
    text: 'Seu trabalho te frustra?',
    dimension: 'trabalho',
    dimensionName: 'Burnout relacionado ao trabalho',
  },
  {
    id: 6,
    text: 'Você se sente esgotado(a) no final do dia de trabalho?',
    dimension: 'trabalho',
    dimensionName: 'Burnout relacionado ao trabalho',
  },
  {
    id: 7,
    text: 'Com que frequência você se sente esgotado(a)?',
    dimension: 'pessoal',
    dimensionName: 'Burnout pessoal',
  },
  {
    id: 8,
    text: 'Você se sente esgotado(a) por causa do seu trabalho?',
    dimension: 'trabalho',
    dimensionName: 'Burnout relacionado ao trabalho',
  },
  {
    id: 9,
    text: 'Você sente que dá mais do que recebe quando trabalha com clientes?',
    dimension: 'clientes',
    dimensionName: 'Burnout relacionado a clientes',
  },
  {
    id: 10,
    text: 'Você se cansa de trabalhar com clientes?',
    dimension: 'clientes',
    dimensionName: 'Burnout relacionado a clientes',
  },
  {
    id: 11,
    text: 'Trabalhar com clientes lhe causa esgotamento energético?',
    dimension: 'clientes',
    dimensionName: 'Burnout relacionado a clientes',
  },
  {
    id: 12,
    text: 'Com que frequência você se sente emocionalmente exausto(a)?',
    dimension: 'pessoal',
    dimensionName: 'Burnout pessoal',
  },
  {
    id: 13,
    text: 'Você acha frustrante trabalhar com clientes?',
    dimension: 'clientes',
    dimensionName: 'Burnout relacionado a clientes',
  },
  {
    id: 14,
    text: 'Seu trabalho é emocionalmente exaustivo?',
    dimension: 'trabalho',
    dimensionName: 'Burnout relacionado ao trabalho',
  },
  {
    id: 15,
    text: 'Você se sente exausto pela manhã só de pensar em mais um dia de trabalho?',
    dimension: 'trabalho',
    dimensionName: 'Burnout relacionado ao trabalho',
  },
  {
    id: 16,
    text: 'Com que frequência você pensa: “Não aguento mais”?',
    dimension: 'pessoal',
    dimensionName: 'Burnout pessoal',
  },
  {
    id: 17,
    text: 'Você sente que cada hora de trabalho é cansativa para você?',
    dimension: 'trabalho',
    dimensionName: 'Burnout relacionado ao trabalho',
  },
  {
    id: 18,
    text: 'Com que frequência você se sente cansado?',
    dimension: 'pessoal',
    dimensionName: 'Burnout pessoal',
  },
  {
    id: 19,
    text: 'Com que frequência você se sente fisicamente exausto?',
    dimension: 'pessoal',
    dimensionName: 'Burnout pessoal',
  },
];

export const DIMENSION_CONFIG = {
  pessoal: {
    id: 'pessoal' as const,
    name: 'Burnout pessoal',
    subtitle: 'Exaustão física e psicológica genérica, independentemente da ocupação profissional',
    itemIds: [1, 7, 12, 16, 18, 19],
    divisor: 6,
  },
  trabalho: {
    id: 'trabalho' as const,
    name: 'Burnout relacionado ao trabalho',
    subtitle: 'Sintomas de esgotamento atribuídos diretamente à rotina e exigências laborais',
    itemIds: [2, 5, 6, 8, 14, 15, 17],
    divisor: 7,
  },
  clientes: {
    id: 'clientes' as const,
    name: 'Burnout relacionado ao trabalho com clientes',
    subtitle: 'Desgaste e sobrecarga decorrentes da relação com clientes, pacientes, alunos ou usuários',
    itemIds: [3, 4, 9, 10, 11, 13],
    divisor: 6,
  },
};
