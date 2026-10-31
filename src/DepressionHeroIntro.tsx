import React from 'react';
import { DisclaimerBanner } from './DisclaimerBanner';
import { ArrowRight, BookOpen, HeartPulse, CheckCircle2, FileText, AlertTriangle, ShieldCheck } from 'lucide-react';

interface DepressionHeroIntroProps {
  onStart: () => void;
  onOpenEducation: () => void;
  totalAnswered: number;
}

export const DepressionHeroIntro: React.FC<DepressionHeroIntroProps> = ({
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
          <span>GREENBERGER & PADESKY · A MENTE VENCENDO O HUMOR</span>
        </div>

        <h1 className="hero-title text-balance">
          Triagem de sintomas depressivos{' '}
          <span className="hero-title-accent">(19 Itens)</span>.
        </h1>

        <p className="text-base sm:text-lg text-[#6b6b6b] leading-relaxed max-w-2xl">
          Este questionário foi desenvolvido por <strong>Dennis Greenberger e Christine A. Padesky</strong> e é utilizado como recurso de identificação e acompanhamento de sintomas relacionados ao humor deprimido.
        </p>

        <div className="p-4 rounded-2xl bg-[#f6f0eb] border border-[#efe6dd] text-xs sm:text-sm text-[#4a4a4a] leading-relaxed max-w-2xl">
          <strong className="text-[#2d2d2d] block mb-1">Importante:</strong>
          O resultado não estabelece diagnóstico de depressão e deve ser interpretado considerando o contexto clínico individual e, quando necessário, ser avaliado por profissional habilitado.
        </div>
      </div>

      {/* Feature / Dimension Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="style-card flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#efe6dd]/70 border border-[rgba(123,123,86,0.12)] flex items-center justify-center text-[#7b7b56] shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-xl font-normal text-[#2d2d2d]">19 Itens Clínicos</h2>
            <p className="text-xs sm:text-sm text-[#6b6b6b] leading-relaxed">
              Avalia manifestações cognitivas, afetivas e comportamentais com pontuação de 0 a 3 por item (escore total de 0 a 57).
            </p>
          </div>
          <div className="pt-4 border-t border-[#f6f0eb] text-[11px] text-[#7b7b56] font-medium">
            Período de referência: última semana
          </div>
        </div>

        <div className="style-card flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#efe6dd]/70 border border-[rgba(200,160,138,0.2)] flex items-center justify-center text-[#c8a08a] shadow-xs">
              <HeartPulse className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-xl font-normal text-[#2d2d2d]">Faixas de Referência</h2>
            <p className="text-xs sm:text-sm text-[#6b6b6b] leading-relaxed">
              Organizado em faixas informativas de intensidade (0–12 normal, 13–21 leve, 22–38 moderada, 39–57 grave) para reflexão individual.
            </p>
          </div>
          <div className="pt-4 border-t border-[#f6f0eb] text-[11px] text-[#c8a08a] font-medium">
            Acompanhamento longitudinal
          </div>
        </div>

        <div className="style-card flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#efe6dd]/70 border border-[rgba(123,123,86,0.12)] flex items-center justify-center text-[#7b7b56] shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-xl font-normal text-[#2d2d2d]">Protocolo Ético de Segurança</h2>
            <p className="text-xs sm:text-sm text-[#6b6b6b] leading-relaxed">
              Monitoramento responsável de itens sensíveis (10, 11 e 12) com orientações imediatas de busca de apoio e canais de emergência (CVV 188 e SAMU 192).
            </p>
          </div>
          <div className="pt-4 border-t border-[#f6f0eb] text-[11px] text-[#7b7b56] font-medium">
            Cuidado e acolhimento clínico
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#ffffff] via-[#fbf7f4] to-[#f6f0eb] border border-[#efe6dd] shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h3 className="font-serif text-2xl font-normal text-[#2d2d2d]">Pronto(a) para iniciar?</h3>
          <p className="text-xs sm:text-sm text-[#6b6b6b] leading-relaxed">
            O questionário leva cerca de 4 a 6 minutos. Responda pensando em como você tem se sentido durante a última semana.
          </p>
          {totalAnswered > 0 && (
            <p className="text-xs text-[#7b7b56] font-medium">
              Você já respondeu {totalAnswered} de 19 itens (progresso salvo neste navegador).
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto shrink-0">
          <button
            type="button"
            onClick={onOpenEducation}
            className="btn btn-secondary text-xs py-3 px-5 cursor-pointer justify-center"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            <span>Fundamentação & Faixas</span>
          </button>
          <button
            type="button"
            onClick={onStart}
            className="btn btn-primary text-xs py-3 px-6 cursor-pointer justify-center"
          >
            <span>{totalAnswered > 0 ? 'Continuar Triagem' : 'Iniciar Triagem'}</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};
