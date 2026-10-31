import { AQQuestion, AQResponseValue, AQDomainId } from './aq';

export const AQ_RESPONSE_OPTIONS: Array<{
  value: AQResponseValue;
  label: string;
}> = [
  { value: 'concordo_plenamente', label: 'Concordo plenamente' },
  { value: 'concordo_um_pouco', label: 'Concordo um pouco' },
  { value: 'discordo_um_pouco', label: 'Discordo um pouco' },
  { value: 'discordo_plenamente', label: 'Discordo plenamente' },
];

export const AGREE_SCORES_ITEMS = new Set([
  1, 2, 4, 5, 6, 7, 9, 12, 13, 16, 18, 19, 20, 21, 22, 23, 26, 33, 35, 39, 41, 42, 43, 45, 46, 47, 48, 49,
]);

export const DISAGREE_SCORES_ITEMS = new Set([
  3, 8, 10, 11, 14, 15, 17, 24, 25, 27, 28, 29, 30, 31, 32, 34, 36, 37, 38, 40, 44, 50,
]);

export const AQ_DOMAINS_CONFIG: Record<
  AQDomainId,
  { name: string; description: string; itemIds: number[] }
> = {
  habilidades_sociais: {
    name: 'Habilidades sociais',
    description: 'Preferências em situações sociais, facilidade em interagir e fazer novos amigos.',
    itemIds: [1, 11, 13, 15, 22, 36, 44, 45, 47, 48],
  },
  troca_atencao: {
    name: 'Atenção / Troca de atenção',
    description: 'Flexibilidade cognitiva, tolerância a imprevistos, rotinas e facilidade em alternar tarefas.',
    itemIds: [2, 4, 10, 16, 25, 32, 34, 37, 43, 46],
  },
  atencao_detalhes: {
    name: 'Atenção aos detalhes',
    description: 'Percepção minuciosa de padrões, números, datas, pequenos ruídos e detalhes ambientais.',
    itemIds: [5, 6, 9, 12, 19, 23, 28, 29, 30, 49],
  },
  comunicacao: {
    name: 'Comunicação',
    description: 'Dinâmica conversacional, leitura de entrelinhas, compreensão de piadas e turnos de fala.',
    itemIds: [7, 17, 18, 26, 27, 31, 33, 35, 38, 39],
  },
  imaginacao: {
    name: 'Imaginação',
    description: 'Capacidade de visualização mental, faz-de-conta, empatia cognitiva e interesses focados.',
    itemIds: [3, 8, 14, 20, 21, 24, 40, 41, 42, 50],
  },
};

const domainMapping: Record<number, AQDomainId> = {
  1: 'habilidades_sociais',
  2: 'troca_atencao',
  3: 'imaginacao',
  4: 'troca_atencao',
  5: 'atencao_detalhes',
  6: 'atencao_detalhes',
  7: 'comunicacao',
  8: 'imaginacao',
  9: 'atencao_detalhes',
  10: 'troca_atencao',
  11: 'habilidades_sociais',
  12: 'atencao_detalhes',
  13: 'habilidades_sociais',
  14: 'imaginacao',
  15: 'habilidades_sociais',
  16: 'troca_atencao',
  17: 'comunicacao',
  18: 'comunicacao',
  19: 'atencao_detalhes',
  20: 'imaginacao',
  21: 'imaginacao',
  22: 'habilidades_sociais',
  23: 'atencao_detalhes',
  24: 'imaginacao',
  25: 'troca_atencao',
  26: 'comunicacao',
  27: 'comunicacao',
  28: 'atencao_detalhes',
  29: 'atencao_detalhes',
  30: 'atencao_detalhes',
  31: 'comunicacao',
  32: 'troca_atencao',
  33: 'comunicacao',
  34: 'troca_atencao',
  35: 'comunicacao',
  36: 'habilidades_sociais',
  37: 'troca_atencao',
  38: 'comunicacao',
  39: 'comunicacao',
  40: 'imaginacao',
  41: 'imaginacao',
  42: 'imaginacao',
  43: 'troca_atencao',
  44: 'habilidades_sociais',
  45: 'habilidades_sociais',
  46: 'troca_atencao',
  47: 'habilidades_sociais',
  48: 'habilidades_sociais',
  49: 'atencao_detalhes',
  50: 'imaginacao',
};

const RAW_QUESTIONS: Array<{ id: number; text: string }> = [
  { id: 1, text: 'Prefiro fazer coisas com outras pessoas do que sozinho(a).' },
  { id: 2, text: 'Prefiro fazer as coisas sempre da mesma maneira' },
  { id: 3, text: 'Quando tento imaginar uma coisa, tenho muita facilidade em criar uma imagem na minha mente.' },
  { id: 4, text: 'Com frequência fico tão absorvido(a) com uma coisa que esqueço todo o resto.' },
  { id: 5, text: 'Frequentemente noto pequenos ruídos que outras pessoas não ouvem.' },
  { id: 6, text: 'Costumo prestar atenção aos números das placas dos automóveis ou a outras sequências de informação do mesmo tipo.' },
  { id: 7, text: 'As outras pessoas com frequência me dizem que falei algo indelicado, apesar de eu achar que fui delicado(a).' },
  { id: 8, text: 'Quando leio uma história, consigo imaginar facilmente a aparência dos personagens.' },
  { id: 9, text: 'Sou fascinado(a) por datas' },
  { id: 10, text: 'Quando estou em grupo, tenho facilidade em seguir várias conversas ao mesmo tempo.' },
  { id: 11, text: 'Tenho facilidade em compreender situações sociais.' },
  { id: 12, text: 'Tenho tendência a notar detalhes que os outros não reparam.' },
  { id: 13, text: 'Prefiro ir a uma biblioteca do que a uma festa.' },
  { id: 14, text: 'Tenho facilidade em inventar histórias.' },
  { id: 15, text: 'Tenho maior tendência a me aproximar de pessoas do que de coisas.' },
  { id: 16, text: 'Tenho tendência a ter interesses fortes e fico incomodado(a) se não posso me dedicar a eles.' },
  { id: 17, text: 'Gosto de bater papo.' },
  { id: 18, text: 'Quando estou falando, as outras pessoas têm dificuldade em tomar a palavra.' },
  { id: 19, text: 'Sou fascinado(a) por números' },
  { id: 20, text: 'Quando leio uma história, sinto dificuldade em entender as intenções dos personagens.' },
  { id: 21, text: 'Não gosto de ler livros de ficção' },
  { id: 22, text: 'Tenho dificuldade em fazer novos amigos.' },
  { id: 23, text: 'Vejo constantemente padrões nas coisas que me rodeiam.' },
  { id: 24, text: 'Prefiro ir ao teatro do que ir a um museu.' },
  { id: 25, text: 'Não fico incomodado(a) se minha rotina diária for alterada.' },
  { id: 26, text: 'Com frequência sinto que não sei manter uma conversa.' },
  { id: 27, text: 'Tenho facilidade em “ler nas entrelinhas” quando falam comigo.' },
  { id: 28, text: 'Geralmente me concentro mais no todo do que nos detalhes.' },
  { id: 29, text: 'Não sou muito bom/boa em lembrar números de telefone.' },
  { id: 30, text: 'Geralmente não reparo nas pequenas mudanças de uma situação ou na aparência de uma pessoa.' },
  { id: 31, text: 'Consigo dizer quando a pessoa com quem estou conversando fica entediada.' },
  { id: 32, text: 'Consigo facilmente fazer mais do que uma coisa ao mesmo tempo.' },
  { id: 33, text: 'Quando falo no telefone, não tenho a certeza quando é a minha vez de falar.' },
  { id: 34, text: 'Gosto de fazer as coisas de forma espontânea.' },
  { id: 35, text: 'Com frequência sou o(a) último(a) que entende uma piada.' },
  { id: 36, text: 'Tenho facilidade em entender o que uma pessoa está pensando ou sentindo apenas olhando para o seu rosto.' },
  { id: 37, text: 'Se sou interrompido(a), consigo rapidamente voltar ao que estava fazendo.' },
  { id: 38, text: 'Sou bom/boa de papo.' },
  { id: 39, text: 'Os outros frequentemente me dizem que eu insisto muito nas mesmas coisas.' },
  { id: 40, text: 'Quando era criança, gostava de brincar de faz-de-conta com as outras crianças.' },
  { id: 41, text: 'Gosto de colecionar informação sobre categorias de coisas (p. ex., tipos de carros, de aves, de trens, de plantas, etc.).' },
  { id: 42, text: 'Tenho dificuldade de me imaginar na pele de outra pessoa.' },
  { id: 43, text: 'Gosto de planejar com cuidado todas as atividades em que participo.' },
  { id: 44, text: 'Aprecio eventos sociais.' },
  { id: 45, text: 'Tenho dificuldade em entender as intenções das outras pessoas.' },
  { id: 46, text: 'Situações novas me deixam ansioso(a).' },
  { id: 47, text: 'Gosto de conhecer novas pessoas' },
  { id: 48, text: 'Tenho uma postura conciliadora em situações de interação social.' },
  { id: 49, text: 'Tenho dificuldade em lembrar o dia de aniversário dos outros' },
  { id: 50, text: 'Tenho muita facilidade em brincar de faz-de-conta com as crianças.' },
];

export const AQ_QUESTIONS: AQQuestion[] = RAW_QUESTIONS.map((q) => {
  const isAgreeScores = AGREE_SCORES_ITEMS.has(q.id);
  const domain = domainMapping[q.id] || 'habilidades_sociais';

  return {
    id: q.id,
    text: q.text,
    domain,
    domainName: AQ_DOMAINS_CONFIG[domain].name,
    scoringType: isAgreeScores ? 'agree_scores' : 'disagree_scores',
  };
});
