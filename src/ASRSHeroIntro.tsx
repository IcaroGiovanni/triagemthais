import React from 'react';
import { DisclaimerBanner } from './DisclaimerBanner';
import { ArrowRight, BookOpen, Brain, CheckCircle2, FileText, Target, HelpCircle, Layers } from 'lucide-react';

interface ASRSHeroIntroProps {
  onStart: () => void;
  onOpenEducation: () => void;
  totalAnswered: number;
}

export const ASRSHeroIntro: React.FC<ASRSHeroIntroProps> = ({
  onStart,
  onOpenEducation,
  totalAnswered,
}) => {
  return (
    <div className="space-y-12 py-8 sm:py-12">
      {/* Primary Clinical Disclaimer */}
      <DisclaimerBanner />

      {/* Main Hero Header */}
      <div className="space-y-5 max-w-3xl">
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-dot" />
          <span>OMS / ASRS-v1.1 · TDAH EM ADULTOS</span>
        </div>

        <h1 className="hero-title text-balance">
          Escala de autoavaliação de TDAH em adultos{' '}
          <span className="hero-title-accent">(ASRS-18)</span>.
        </h1>

        <p className="text-base sm:text-lg text-[#6b6b6b] leading-relaxed max-w-2xl">
          A <strong>ASRS-18 (Adult ADHD Self-Report Scale v1.1)</strong> é o instrumento padrão ouro desenvolvido em conjunto com a Organização Mundial da Saúde (OMS) para rastreio dos sintomas de Transtorno do Déficit de Atenção com Hiperatividade em adultos.
        </p>
      </div>

      {/* The 2 Parts Architecture Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PARTE A */}
        <div className="style-card flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#efe6dd]/60 border border-[rgba(123,123,86,0.12)] flex items-center justify-center text-[#7b7b56] shadow-xs">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-[#7b7b56] uppercase tracking-wider block mb-1">
                Parte A · Itens 1 a 6
              </span>
              <h2 className="font-serif text-2xl font-normal text-[#2d2d2d]">Escore Oficial de Rastreio</h2>
            </div>
            <p className="text-xs sm:text-sm text-[#6b6b6b] leading-relaxed">
              Os 6 itens mais sensíveis para predizer TDAH em adultos. Somam-se <strong>somente</strong> os pontos obtidos na Parte A (0 a 6 pontos):
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="p-2.5 bg-[#f6f0eb] rounded-xl border border-[#efe6dd]">
                <strong className="block text-[#2d2d2d]">0 a 3 pontos</strong>
                <span className="text-[#6b6b6b]">Rastreio negativo</span>
              </div>
              <div className="p-2.5 bg-[#f6f0eb] rounded-xl border border-[#efe6dd]">
                <strong className="block text-[#7b7b56]">4 a 6 pontos</strong>
                <span className="text-[#6b6b6b]">Rastreio positivo</span>
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-[#efe6dd] mt-6 flex items-center justify-between text-xs text-[#9e9e9e]">
            <span>6 Perguntas-chave</span>
            <span className="font-mono">Ponto de corte = 4</span>
          </div>
        </div>

        {/* PARTE B */}
        <div className="style-card flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#f6f0eb] border border-[#efe6dd] flex items-center justify-center text-[#c8a08a] shadow-xs">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-[#c8a08a] uppercase tracking-wider block mb-1">
                Parte B · Itens 7 a 18
              </span>
              <h2 className="font-serif text-2xl font-normal text-[#2d2d2d]">Perfil Complementar de Sintomas</h2>
            </div>
            <p className="text-xs sm:text-sm text-[#6b6b6b] leading-relaxed">
              Os itens 7 a 18 detalham a frequência dos sintomas de desatenção, inquietação e impulsividade. <strong>Não são somados à Parte A</strong> e não possuem ponto de corte global, funcionando como mapa clínico para anamnese.
            </p>
          </div>
          <div className="pt-4 border-t border-[#efe6dd] mt-6 flex items-center justify-between text-xs text-[#9e9e9e]">
            <span>12 Manifestações</span>
            <span className="font-mono">Informação complementar</span>
          </div>
        </div>
      </div>

      {/* Rationale Panel */}
      <div className="tcc-panel">
        <div className="tcc-panel-glow" aria-hidden="true" />
        <div className="relative z-10 space-y-4">
          <div className="tcc-badge">
            METODOLOGIA PADRÃO OMS · ASRS-v1.1
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal">
            Por que o rastreio avalia especificamente a <em className="italic text-[#f1d8c9]">Parte A</em>?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-white/80 leading-relaxed">
            <p>
              Estudos psicométricos internacionais demonstraram que os itens 1 a 6 são os que possuem maior capacidade de distinguir adultos com TDAH da população geral. Por essa razão, a OMS determinou que apenas a Parte A define o rastreio (positivo com 4 ou mais pontos).
            </p>
            <p>
              A Parte B (itens 7 a 18) oferece o quadro completo sobre desorganização, impulsividade e hiperatividade verbal ou motora, fornecendo ao psicólogo ou psiquiatra subsídios ricos para a avaliação clínica e diagnóstico diferencial.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <button
          onClick={onStart}
          className="btn btn-primary btn-lg w-full sm:w-auto cursor-pointer"
        >
          <span>{totalAnswered > 0 ? 'Continuar Questionário ASRS-18' : 'Iniciar Triagem ASRS-18 (18 itens)'}</span>
          <ArrowRight className="w-5 h-5 ml-1" />
        </button>

        <button
          onClick={onOpenEducation}
          className="btn btn-secondary w-full sm:w-auto cursor-pointer"
        >
          <BookOpen className="w-4 h-4 text-[#7b7b56]" />
          <span>Ver pontuação e metodologia do ASRS-18</span>
        </button>
      </div>
    </div>
  );
};
