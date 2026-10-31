import { DepressionQuestion, DepressionResponseValue } from './depression';

export const DEPRESSION_RESPONSE_OPTIONS: {
  value: DepressionResponseValue;
  label: string;
  points: number;
}[] = [
  { value: 'nem_um_pouco', label: 'Nem um pouco', points: 0 },
  { value: 'as_vezes', label: 'Às vezes', points: 1 },
  { value: 'frequentemente', label: 'Frequentemente', points: 2 },
  { value: 'a_maior_parte', label: 'A maior parte do tempo', points: 3 },
];

export const DEPRESSION_QUESTIONS: DepressionQuestion[] = [
  {
    id: 1,
    text: 'Humor triste ou deprimido',
  },
  {
    id: 2,
    text: 'Sentimentos de culpa',
  },
  {
    id: 3,
    text: 'Humor irritado',
  },
  {
    id: 4,
    text: 'Menos interesse ou prazer em atividades costumeiras',
  },
  {
    id: 5,
    text: 'Afastado ou evitando as pessoas',
  },
  {
    id: 6,
    text: 'Achando mais difícil fazer as coisas do que de costume',
  },
  {
    id: 7,
    text: 'Vendo a mim mesmo como inútil',
  },
  {
    id: 8,
    text: 'Dificuldade de concentração',
  },
  {
    id: 9,
    text: 'Dificuldade de tomar decisões',
  },
  {
    id: 10,
    text: 'Pensamentos suicidas',
    isSafetyCritical: true,
    safetyLevel: 'thoughts',
  },
  {
    id: 11,
    text: 'Pensamentos recorrentes de morte',
    isSafetyCritical: true,
    safetyLevel: 'death',
  },
  {
    id: 12,
    text: 'Pensando em um plano suicida',
    isSafetyCritical: true,
    safetyLevel: 'plan',
  },
  {
    id: 13,
    text: 'Baixa autoestima',
  },
  {
    id: 14,
    text: 'Vendo o futuro sem esperança',
  },
  {
    id: 15,
    text: 'Pensamentos de autocrítica',
  },
  {
    id: 16,
    text: 'Cansaço ou perda de energia',
  },
  {
    id: 17,
    text: 'Perda de peso significativa ou diminuição do apetite (não inclui perda de peso com um plano de dieta)',
  },
  {
    id: 18,
    text: 'Alteração no padrão de sono – dificuldade para dormir ou dormindo mais ou menos do que de costume',
  },
  {
    id: 19,
    text: 'Diminuição do desejo sexual',
  },
];
