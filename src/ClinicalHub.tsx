import React from 'react';
import {
  HeartPulse,
  Target,
  Activity,
  Brain,
  Flame,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Instagram,
  MessageCircle,
  BookOpen,
  History,
  AlertCircle,
  FileCheck,
  UserCheck
} from 'lucide-react';
import { ActiveTool } from './Header';

interface ClinicalHubProps {
  onSelectTool: (tool: ActiveTool, view?: 'intro' | 'questionnaire') => void;
  onOpenEducation: () => void;
  onOpenHistory: () => void;
  onOpenSchedule: (tool?: ActiveTool) => void;
  toolStats: {
    depressao: { answered: number; total: number; completed: boolean; score?: number };
    asrs: { answered: number; total: number; completed: boolean; score?: number };
    ansiedade: { answered: number; total: number; completed: boolean; score?: number };
    aq50: { answered: number; total: number; completed: boolean; score?: number };
    burnout: { answered: number; total: number; completed: boolean; score?: number };
  };
  savedCount: number;
}

export const ClinicalHub: React.FC<ClinicalHubProps> = ({
  onSelectTool,
  onOpenEducation,
  onOpenHistory,
  onOpenSchedule,
  toolStats,
  savedCount,
}) => {
  const WHATSAPP_URL =
    'https://wa.me/5543991814458?text=Ol%C3%A1%20Thais!%20Acessei%20seu%20portal%20de%20triagens%20cl%C3%ADnicas%20e%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20atendimento%20e%20avalia%C3%A7%C3%A3o.';
  const INSTAGRAM_URL = 'https://www.instagram.com/thais_rodriguesf/';

  const screenings = [
    {
      id: 'depressao' as ActiveTool,
      title: 'Sintomas Depressivos',
      subtitle: 'Inventário de Depressão — Greenberger & Padesky',
      book: 'A Mente Vencendo o Humor (2ª Ed.)',
      questionsCount: 19,
      duration: '5 a 7 min',
      scoreRange: '0 a 57 pontos',
      description:
        'Rastreio padronizado de humor deprimido, anedonia, desesperança, fadiga e padrões cognitivos autocríticos com protocolo ético de segurança.',
      icon: HeartPulse,
      accentColor: '#c8a08a',
      tagBg: 'bg-[#c8a08a]/10',
      tagText: 'text-[#9c6a53]',
      stats: toolStats.depressao,
      badge: 'Terapia Cognitiva',
    },
    {
      id: 'asrs' as ActiveTool,
      title: 'TDAH em Adultos',
      subtitle: 'Adult ADHD Self-Report Scale (ASRS-18 v1.1)',
      book: 'Organização Mundial da Saúde (OMS / WHO)',
      questionsCount: 18,
      duration: '4 a 6 min',
      scoreRange: 'Parte A (0–6) + Parte B',
      description:
        'Instrumento oficial da OMS para rastreio de Déficit de Atenção, Desorganização Executiva, Procrastinação, Hiperatividade e Impulsividade.',
      icon: Target,
      accentColor: '#7b7b56',
      tagBg: 'bg-[#7b7b56]/10',
      tagText: 'text-[#5f5f40]',
      stats: toolStats.asrs,
      badge: 'Neuropsicologia',
    },
    {
      id: 'ansiedade' as ActiveTool,
      title: 'Sintomas Ansiosos',
      subtitle: 'Inventário de Ansiedade — Greenberger & Padesky',
      book: 'A Mente Vencendo o Humor (2ª Ed.)',
      questionsCount: 24,
      duration: '6 a 8 min',
      scoreRange: '0 a 72 pontos',
      description:
        'Mapeia a intensidade de sintomas ansiosos na última semana, abrangendo reações físicas, preocupações cognitivas, hipervigilância e tensão.',
      icon: Activity,
      accentColor: '#c8a08a',
      tagBg: 'bg-[#c8a08a]/10',
      tagText: 'text-[#9c6a53]',
      stats: toolStats.ansiedade,
      badge: 'Terapia Cognitiva',
    },
    {
      id: 'aq50' as ActiveTool,
      title: 'Autismo em Adultos',
      subtitle: 'Quociente do Espectro do Autismo (AQ-50)',
      book: 'Prof. Simon Baron-Cohen (Cambridge)',
      questionsCount: 50,
      duration: '10 a 12 min',
      scoreRange: '0 a 50 pontos (Corte 29/32)',
      description:
        'Rastreio neurocognitivo de traços do espectro autista em 5 domínios: habilidades sociais, atenção a detalhes, alternância, comunicação e imaginação.',
      icon: Brain,
      accentColor: '#7b7b56',
      tagBg: 'bg-[#7b7b56]/10',
      tagText: 'text-[#5f5f40]',
      stats: toolStats.aq50,
      badge: 'Neurodesenvolvimento',
    },
    {
      id: 'burnout' as ActiveTool,
      title: 'Burnout Ocupacional',
      subtitle: 'Copenhagen Burnout Inventory (CBI)',
      book: 'Kristensen et al. (Copenhague)',
      questionsCount: 19,
      duration: '5 min',
      scoreRange: '0 a 100% (3 dimensões)',
      description:
        'Avaliação multidimensional do esgotamento crônico: exaustão pessoal, desgaste diretamente relacionado ao trabalho e estresse com atendimento a clientes.',
      icon: Flame,
      accentColor: '#5f5f40',
      tagBg: 'bg-[#5f5f40]/10',
      tagText: 'text-[#3d3d28]',
      stats: toolStats.burnout,
      badge: 'Saúde Ocupacional',
    },
  ];

  return (
    <div className="space-y-8 sm:space-y-12 pb-16 animate-in fade-in duration-300">
      {/* ============================================================ */}
      {/* 1. HERO BRANDING SECTION - THAIS RODRIGUES                   */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#ffffff] via-[#fdfbf9] to-[#fbf7f4] border border-[#efe6dd] shadow-xs sm:shadow-md p-4 sm:p-8 lg:p-10 text-[#2d2d2d]">
        {/* Soft decorative background circles */}
        <div
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#c8a08a]/10 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#7b7b56]/10 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
          {/* Official Horizontal Logo Lockup Card */}
          <div className="w-full max-w-lg p-3 sm:p-5 bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-[#efe6dd] shadow-xs hover:shadow-sm transition-shadow">
            <img
              src="/logoatt_cdd07c48.png"
              alt="Thais Rodrigues - Psicóloga | Neuropsicóloga - CRP 08/40838"
              className="w-full h-auto max-h-32 sm:max-h-40 object-contain mx-auto"
            />
          </div>

          {/* Quick credentials badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-[#7b7b56]/10 text-[#5f5f40] font-semibold border border-[#7b7b56]/20">
              CRP 08/40838
            </span>
            <span className="px-3 py-1 rounded-full bg-[#c8a08a]/15 text-[#8f5e49] font-medium border border-[#c8a08a]/30">
              Terapia Cognitiva Comportamental
            </span>
            <span className="px-3 py-1 rounded-full bg-[#7b7b56]/10 text-[#5f5f40] font-medium border border-[#7b7b56]/20">
              Neuropsicologia
            </span>
          </div>

          {/* Narrative Welcome */}
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7b7b56]/10 text-[#5f5f40] text-[11px] font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#7b7b56]" />
              Portal de Autoavaliação & Triagem Clínica
            </div>
            <p className="text-xs sm:text-sm text-[#525343] leading-relaxed font-normal">
              Bem-vindo(a) ao portal de triagens estruturadas. Este espaço foi desenhado para
              proporcionar a você instrumentos científicos reconhecidos internacionalmente para o
              rastreio e monitoramento de sintomas psicológicos, neuropsicológicos e ocupacionais.
            </p>
          </div>

          {/* The 3 Pillars from Brand */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-1">
            <div className="p-3 sm:p-3.5 rounded-2xl bg-white/85 border border-[#efe6dd] text-center shadow-2xs">
              <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-[#c8a08a]/15 text-[#8f5e49] flex items-center justify-center">
                <HeartPulse className="w-4 h-4" />
              </div>
              <h4 className="font-semibold text-xs text-[#2d2d2d]">Psicoterapia para Mulheres</h4>
              <p className="text-[11px] text-[#7b7b56] font-medium mt-0.5">Atendimento Online</p>
            </div>

            <div className="p-3 sm:p-3.5 rounded-2xl bg-white/85 border border-[#efe6dd] text-center shadow-2xs">
              <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-[#7b7b56]/15 text-[#5f5f40] flex items-center justify-center">
                <Brain className="w-4 h-4" />
              </div>
              <h4 className="font-semibold text-xs text-[#2d2d2d]">Avaliação Neuropsicológica</h4>
              <p className="text-[11px] text-[#7b7b56] font-medium mt-0.5">Todas as Idades</p>
            </div>

            <div className="p-3 sm:p-3.5 rounded-2xl bg-white/85 border border-[#efe6dd] text-center shadow-2xs">
              <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-[#c8a08a]/15 text-[#8f5e49] flex items-center justify-center">
                <Target className="w-4 h-4" />
              </div>
              <h4 className="font-semibold text-xs text-[#2d2d2d]">Infantil e Adolescentes</h4>
              <p className="text-[11px] text-[#7b7b56] font-medium mt-0.5">Presencial</p>
            </div>
          </div>

          {/* Action buttons (full-width on mobile, auto on desktop) */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 pt-2">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#1eb857] hover:to-[#0f7a6e] text-white text-xs font-semibold shadow-xs transition-all"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>WhatsApp: (43) 99181-4458</span>
            </a>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-white hover:bg-[#f6f0eb] text-[#2d2d2d] border border-[#efe6dd] text-xs font-semibold transition-colors"
            >
              <Instagram className="w-4 h-4 text-[#E1306C] shrink-0" />
              <span>@thais_rodriguesf</span>
            </a>

            <button
              type="button"
              onClick={() => onOpenSchedule()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#f6f0eb] hover:bg-[#efe6dd] text-[#5f5f40] text-xs font-semibold transition-colors cursor-pointer"
            >
              <UserCheck className="w-4 h-4 shrink-0" />
              <span>Agendar Avaliação</span>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. ETHICAL NOTICE BANNER                                     */}
      {/* ============================================================ */}
      <section className="rounded-2xl bg-[#f6f0eb] border border-[#efe6dd] p-4 sm:p-5 text-[#2d2d2d] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-white text-[#7b7b56] shadow-2xs shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="space-y-0.5">
            <h3 className="font-serif text-sm sm:text-base font-semibold text-[#2d2d2d]">
              Diretriz Ética Fundamental: Triagem Não É Diagnóstico
            </h3>
            <p className="text-xs text-[#525343] leading-relaxed">
              Os questionários abaixo são instrumentos científicos de autoavaliação e rastreio. Os
              resultados não estabelecem diagnósticos definitivos e não substituem uma avaliação
              clínica individualizada conduzida por psicólogo, neuropsicólogo ou médico psiquiatra.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenEducation}
          className="text-xs font-medium text-[#7b7b56] hover:text-[#5f5f40] underline cursor-pointer flex items-center gap-1.5 shrink-0 self-end sm:self-auto"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Fundamentação</span>
        </button>
      </section>

      {/* ============================================================ */}
      {/* 3. SCREENINGS SELECTION GRID (THE 5 INSTRUMENTS)             */}
      {/* ============================================================ */}
      <section className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 border-b border-[#efe6dd] pb-3">
          <div>
            <span className="text-xs font-semibold text-[#7b7b56] uppercase tracking-wider block">
              Menu de Instrumentos Clínicos
            </span>
            <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-normal text-[#2d2d2d]">
              Escolha a Triagem Desejada
            </h2>
          </div>
          <p className="text-xs text-[#6b6b6b]">
            5 instrumentos científicos validados
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {screenings.map((tool) => {
            const Icon = tool.icon;
            const isCompleted = tool.stats.completed;
            const inProgress = tool.stats.answered > 0 && !isCompleted;

            return (
              <div
                key={tool.id}
                className="group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-white border border-[#efe6dd] hover:border-[#c8a08a] shadow-2xs hover:shadow-md transition-all duration-300 p-5 sm:p-6"
              >
                {/* Top badges and icon */}
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3 sm:mb-4">
                    <div
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 shrink-0"
                      style={{
                        backgroundColor: `${tool.accentColor}18`,
                        color: tool.accentColor,
                      }}
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`text-[10px] sm:text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${tool.tagBg} ${tool.tagText}`}
                      >
                        {tool.badge}
                      </span>

                      {/* State Badge */}
                      {isCompleted ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          Concluído ({tool.stats.score} pts)
                        </span>
                      ) : inProgress ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          <Clock className="w-3 h-3" />
                          {tool.stats.answered}/{tool.questionsCount}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  {/* Title & Reference */}
                  <h3 className="font-serif text-lg sm:text-xl font-normal text-[#2d2d2d] group-hover:text-[#7b7b56] transition-colors leading-snug">
                    {tool.title}
                  </h3>

                  <p className="text-xs font-medium text-[#7b7b56] mt-0.5">
                    {tool.subtitle}
                  </p>
                  <p className="text-[11px] text-[#9e9e9e] italic mb-2.5">
                    {tool.book}
                  </p>

                  <p className="text-xs text-[#525343] leading-relaxed mb-4">
                    {tool.description}
                  </p>
                </div>

                {/* Bottom Metadata & Primary Button */}
                <div className="pt-3 sm:pt-4 border-t border-[#f6f0eb] space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-[#6b6b6b]">
                    <span className="flex items-center gap-1">
                      <FileCheck className="w-3.5 h-3.5 text-[#7b7b56]" />
                      <strong>{tool.questionsCount}</strong> questões
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#c8a08a]" />
                      {tool.duration}
                    </span>
                  </div>

                  {/* Call to action button */}
                  <button
                    type="button"
                    onClick={() => onSelectTool(tool.id, inProgress ? 'questionnaire' : 'intro')}
                    className="w-full py-3 px-4 rounded-full font-medium text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs group-hover:shadow-md text-white min-h-[44px]"
                    style={{
                      backgroundColor:
                        tool.id === 'depressao' || tool.id === 'ansiedade'
                          ? '#c8a08a'
                          : tool.id === 'aq50' || tool.id === 'asrs'
                          ? '#7b7b56'
                          : '#5f5f40',
                    }}
                  >
                    <span>
                      {isCompleted
                        ? 'Ver Resultado / Refazer'
                        : inProgress
                        ? 'Continuar Preenchimento'
                        : 'Iniciar Triagem'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. CLINICAL METHODOLOGY & SAVED HISTORY CARDS                */}
      {/* ============================================================ */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-2">
        {/* Card 1: Fundamentos Psicométricos */}
        <div className="rounded-2xl sm:rounded-3xl bg-[#fbf7f4] border border-[#efe6dd] p-5 sm:p-7 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white border border-[#efe6dd] text-[#7b7b56] flex items-center justify-center shadow-2xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-normal text-[#2d2d2d]">
              Metodologia, Referências & Pontos de Corte
            </h3>
            <p className="text-xs text-[#525343] leading-relaxed">
              Consulte a fundamentação teórica de cada instrumento: critérios de pontuação,
              sensibilidade psicométrica, orientações de acolhimento e artigos de validação científica.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenEducation}
            className="btn btn-secondary w-full text-xs py-2.5 cursor-pointer flex items-center justify-center gap-2 min-h-[44px]"
          >
            <span>Ver Fundamentação Completa</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 2: Histórico Local e Segurança de Dados */}
        <div className="rounded-2xl sm:rounded-3xl bg-[#fbf7f4] border border-[#efe6dd] p-5 sm:p-7 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white border border-[#efe6dd] text-[#c8a08a] flex items-center justify-center shadow-2xs">
              <History className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-serif text-lg sm:text-xl font-normal text-[#2d2d2d]">
                Histórico de Triagens Salvas
              </h3>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white border border-[#efe6dd] text-[#7b7b56]">
                {savedCount} {savedCount === 1 ? 'salvo' : 'salvos'}
              </span>
            </div>
            <p className="text-xs text-[#525343] leading-relaxed">
              Seus dados são 100% privados e salvos apenas no navegador do seu dispositivo
              (LocalStorage), em total conformidade com o sigilo ético profissional.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenHistory}
            className="btn btn-secondary w-full text-xs py-2.5 cursor-pointer flex items-center justify-center gap-2 min-h-[44px]"
          >
            <span>Abrir Painel de Histórico</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. URGENCY & SUPPORT CHANNELS (CVV / SAMU)                   */}
      {/* ============================================================ */}
      <section className="rounded-2xl border border-rose-200/80 bg-rose-50/50 p-4 sm:p-5 text-[#2d2d2d] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-serif text-sm font-semibold text-rose-950">
              Precisa de ajuda imediata ou está em sofrimento agudo?
            </h4>
            <p className="text-xs text-rose-900/80 mt-0.5">
              Caso esteja vivenciando ideação suicida ou crise intensa, busque suporte
              especializado. O <strong>CVV</strong> atende pelo <strong>188</strong> (ligação gratuita 24h). Em caso de
              emergência física ou risco, acione o <strong>SAMU (192)</strong>.
            </p>
          </div>
        </div>

        <a
          href="tel:188"
          className="w-full sm:w-auto text-center shrink-0 px-4 py-2.5 rounded-full bg-white border border-rose-300 text-rose-800 text-xs font-semibold hover:bg-rose-100/60 transition-colors"
        >
          Ligar 188 (CVV)
        </a>
      </section>
    </div>
  );
};
