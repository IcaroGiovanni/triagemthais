import React from 'react';
import { DisclaimerBanner } from './DisclaimerBanner';
import { ArrowRight, BookOpen, Users, Brain, Eye, MessageSquare, Sparkles } from 'lucide-react';

interface AQHeroIntroProps {
  onStart: () => void;
  onOpenEducation: () => void;
  totalAnswered: number;
}

export const AQHeroIntro: React.FC<AQHeroIntroProps> = ({
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
          <span>AUTISM SPECTRUM QUOTIENT · AQ-50</span>
        </div>

        <h1 className="hero-title text-balance">
          Triagem de características do espectro autista{' '}
          <span className="hero-title-accent">em adultos</span>.
        </h1>

        <p className="text-base sm:text-lg text-[#6b6b6b] leading-relaxed max-w-2xl">
          O <strong>AQ-50 (Quociente do Espectro do Autismo)</strong> é um instrumento internacional de autoavaliação construído para mapear a presença e a intensidade de traços associados ao espectro autista em cinco domínios do funcionamento cognitivo e social.
        </p>
      </div>

      {/* 5 Domains Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#7b7b56] uppercase tracking-wider">
            Os Cinco Domínios Avaliados (10 itens cada)
          </span>
          <span className="text-xs text-[#9e9e9e] font-mono">50 itens no total</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="style-card p-5! space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#efe6dd]/60 flex items-center justify-center text-[#7b7b56]">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base text-[#2d2d2d] font-normal">Habilidades Sociais</h3>
            <p className="text-xs text-[#6b6b6b] leading-relaxed">
              Interação em grupo, facilidade em fazer amigos e preferência por convívio social.
            </p>
          </div>

          <div className="style-card p-5! space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#f6f0eb] flex items-center justify-center text-[#c8a08a]">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base text-[#2d2d2d] font-normal">Troca de Atenção</h3>
            <p className="text-xs text-[#6b6b6b] leading-relaxed">
              Flexibilidade diante de mudanças de rotina e capacidade de alternar focos.
            </p>
          </div>

          <div className="style-card p-5! space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#efe6dd]/60 flex items-center justify-center text-[#7b7b56]">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base text-[#2d2d2d] font-normal">Atenção a Detalhes</h3>
            <p className="text-xs text-[#6b6b6b] leading-relaxed">
              Percepção de padrões, datas, números, sons sutis e minúcias do ambiente.
            </p>
          </div>

          <div className="style-card p-5! space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#f6f0eb] flex items-center justify-center text-[#c8a08a]">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base text-[#2d2d2d] font-normal">Comunicação</h3>
            <p className="text-xs text-[#6b6b6b] leading-relaxed">
              Compreensão de entrelinhas, piadas, conversação recíproca e turnos de fala.
            </p>
          </div>

          <div className="style-card p-5! space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#efe6dd]/60 flex items-center justify-center text-[#7b7b56]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base text-[#2d2d2d] font-normal">Imaginação</h3>
            <p className="text-xs text-[#6b6b6b] leading-relaxed">
              Visualização mental, empatia cognitiva, faz-de-conta e leitura de personagens.
            </p>
          </div>
        </div>
      </div>

      {/* Rationale and Non-Diagnostic Principle */}
      <div className="tcc-panel">
        <div className="tcc-panel-glow" aria-hidden="true" />
        <div className="relative z-10 space-y-4">
          <div className="tcc-badge">
            PRINCÍPIOS DO RASTREIO · BARON-COHEN ET AL. (2001)
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal">
            O que o AQ mede — e o que ele <em className="italic text-[#f1d8c9]">não</em> determina
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-white/80 leading-relaxed">
            <p>
              O AQ-50 quantifica traços cognitivos e comportamentais em um <strong>continuum dimensional</strong>. Ele não estabelece se você é ou não autista, nem classifica em graus de gravidade ("leve", "moderado" ou "grave") ou níveis de suporte (1, 2 ou 3).
            </p>
            <p>
              Estudos científicos adotam referências de corte de <strong>26 pontos</strong> (ponto de corte de triagem) e <strong>32 pontos</strong> (referência clínica para investigação médica e neuropsicológica especializada).
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <button
          onClick={onStart}
          className="btn btn-primary btn-lg w-full sm:w-auto"
        >
          <span>{totalAnswered > 0 ? 'Continuar Questionário AQ-50' : 'Iniciar Triagem AQ-50 (50 questões)'}</span>
          <ArrowRight className="w-5 h-5 ml-1" />
        </button>

        <button
          onClick={onOpenEducation}
          className="btn btn-secondary w-full sm:w-auto"
        >
          <BookOpen className="w-4 h-4 text-[#7b7b56]" />
          <span>Ver pontuação e estudos científicos do AQ-50</span>
        </button>
      </div>
    </div>
  );
};
