import React from 'react';
import { DisclaimerBanner } from './DisclaimerBanner';
import { ArrowRight, BookOpen, Activity, AlertCircle, Calendar, HeartPulse, Brain, Zap, Shield } from 'lucide-react';

interface AnxietyHeroIntroProps {
  onStart: () => void;
  onOpenEducation: () => void;
  totalAnswered: number;
}

export const AnxietyHeroIntro: React.FC<AnxietyHeroIntroProps> = ({
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
          <span>A MENTE VENCENDO O HUMOR · GREENBERGER & PADESKY</span>
        </div>

        <h1 className="hero-title text-balance">
          Mapeamento e rastreio de sintomas ansiosos{' '}
          <span className="hero-title-accent">na última semana</span>.
        </h1>

        <p className="text-base sm:text-lg text-[#6b6b6b] leading-relaxed max-w-2xl">
          O <strong>Inventário de Ansiedade</strong> de Dennis Greenberger & Christine A. Padesky é um recurso clínico de Terapia Cognitivo-Comportamental (TCC) amplamente utilizado para identificar e monitorar a frequência de manifestações físicas, emocionais, cognitivas e comportamentais da ansiedade nos últimos 7 dias.
        </p>
      </div>

      {/* Timeframe & Instrument Context Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="style-card flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#f6f0eb] border border-[#efe6dd] flex items-center justify-center text-[#c8a08a] shadow-xs">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-[#c8a08a] uppercase tracking-wider block mb-1">
                Janela Temporal
              </span>
              <h2 className="font-serif text-2xl font-normal text-[#2d2d2d]">Última Semana</h2>
            </div>
            <p className="text-xs sm:text-sm text-[#6b6b6b] leading-relaxed">
              Considere como você se sentiu nos últimos 7 dias ao responder a cada uma das 24 manifestações listadas.
            </p>
          </div>
          <div className="pt-4 border-t border-[#efe6dd] mt-6 flex items-center justify-between text-xs text-[#9e9e9e]">
            <span>24 Manifestações</span>
            <span className="font-mono">0 a 72 pts</span>
          </div>
        </div>

        <div className="style-card flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#efe6dd]/60 border border-[rgba(123,123,86,0.12)] flex items-center justify-center text-[#7b7b56] shadow-xs">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-[#7b7b56] uppercase tracking-wider block mb-1">
                Escala de Frequência
              </span>
              <h2 className="font-serif text-2xl font-normal text-[#2d2d2d]">4 Níveis de Intensidade</h2>
            </div>
            <p className="text-xs sm:text-sm text-[#6b6b6b] leading-relaxed">
              Nem um pouco (0) · Às vezes (1) · Frequentemente (2) · A maior parte do tempo (3).
            </p>
          </div>
          <div className="pt-4 border-t border-[#efe6dd] mt-6 flex items-center justify-between text-xs text-[#9e9e9e]">
            <span>Sem somatório forçado</span>
            <span className="font-mono">Rastreio contínuo</span>
          </div>
        </div>

        <div className="style-card flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#f6f0eb] border border-[#efe6dd] flex items-center justify-center text-[#7b7b56] shadow-xs">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-[#7b7b56] uppercase tracking-wider block mb-1">
                Diretriz Ética
              </span>
              <h2 className="font-serif text-2xl font-normal text-[#2d2d2d]">Sem Rótulos de Gravidade</h2>
            </div>
            <p className="text-xs sm:text-sm text-[#6b6b6b] leading-relaxed">
              O instrumento não rotula com "ansiedade leve/moderada/grave", indicando a concentração de sintomas para reflexão e suporte clínico.
            </p>
          </div>
          <div className="pt-4 border-t border-[#efe6dd] mt-6 flex items-center justify-between text-xs text-[#9e9e9e]">
            <span>Monitoramento TCC</span>
            <span className="font-mono">Greenberger & Padesky</span>
          </div>
        </div>
      </div>

      {/* The 4 Symptom Clusters Panel */}
      <div className="tcc-panel">
        <div className="tcc-panel-glow" aria-hidden="true" />
        <div className="relative z-10 space-y-6">
          <div className="tcc-badge">
            SISTEMA INTEGRADO DE SINTOMAS · MODELO COGNITIVO
          </div>

          <div className="space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal">
              Como a ansiedade se expressa em diferentes níveis
            </h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-2xl">
              Em Terapia Cognitivo-Comportamental, a ansiedade é compreendida como uma resposta orquestrada que envolve o corpo, a mente, o afeto e os comportamentos de proteção.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="tcc-node">
              <span className="text-xs text-white/60 font-mono block mb-1">EIXO 01</span>
              <h3 className="font-serif text-base text-white font-medium mb-1">Fisiológico</h3>
              <p className="text-xs text-white/75 leading-relaxed">
                Tensão muscular, palpitação, falta de ar, tontura, tremores e estômago embrulhado.
              </p>
            </div>

            <div className="tcc-node">
              <span className="text-xs text-white/60 font-mono block mb-1">EIXO 02</span>
              <h3 className="font-serif text-base text-white font-medium mb-1">Cognitivo</h3>
              <p className="text-xs text-white/75 leading-relaxed">
                Preocupações intrusivas, pensamentos de perigo ou de catástrofe iminente.
              </p>
            </div>

            <div className="tcc-node">
              <span className="text-xs text-white/60 font-mono block mb-1">EIXO 03</span>
              <h3 className="font-serif text-base text-white font-medium mb-1">Emocional</h3>
              <p className="text-xs text-white/75 leading-relaxed">
                Nervosismo, inquietação, sobressaltos e estado de alerta prolongado.
              </p>
            </div>

            <div className="tcc-node">
              <span className="text-xs text-white/60 font-mono block mb-1">EIXO 04</span>
              <h3 className="font-serif text-base text-white font-medium mb-1">Comportamental</h3>
              <p className="text-xs text-white/75 leading-relaxed">
                Esquiva de situações gatilho e alterações na rotina do sono.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <button
          onClick={onStart}
          className="btn btn-primary btn-lg w-full sm:w-auto cursor-pointer"
        >
          <span>{totalAnswered > 0 ? 'Continuar Questionário de Ansiedade' : 'Iniciar Triagem de Ansiedade (24 itens)'}</span>
          <ArrowRight className="w-5 h-5 ml-1" />
        </button>

        <button
          onClick={onOpenEducation}
          className="btn btn-secondary w-full sm:w-auto cursor-pointer"
        >
          <BookOpen className="w-4 h-4 text-[#7b7b56]" />
          <span>Ver pontuação e fundamentos de Greenberger & Padesky</span>
        </button>
      </div>
    </div>
  );
};
