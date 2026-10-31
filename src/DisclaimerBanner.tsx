import React from 'react';
import { AlertCircle, ShieldCheck } from 'lucide-react';

interface DisclaimerBannerProps {
  compact?: boolean;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="crisp-note flex items-start gap-3 text-xs leading-relaxed no-print">
        <AlertCircle className="w-4 h-4 text-[#7b7b56] shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold text-[#2d2d2d]">TRIAGEM NÃO É DIAGNÓSTICO:</strong> Os resultados têm finalidade orientativa e de auto-observação, não substituindo avaliação psicológica, neuropsicológica ou médica especializada.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#ffffff] border border-[#efe6dd] rounded-2xl p-6 sm:p-7 shadow-[0_8px_30px_rgba(123,123,86,0.06)] relative overflow-hidden">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#f6f0eb] to-[#ffffff] border border-[#efe6dd] flex items-center justify-center shrink-0 text-[#7b7b56] shadow-xs">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7b7b56]">
            <span>Aviso Ético Obrigatório</span>
            <span aria-hidden="true">·</span>
            <span>Uso Responsável</span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#2d2d2d] leading-snug">
            TRIAGEM NÃO É DIAGNÓSTICO
          </h2>
          <p className="text-sm text-[#6b6b6b] leading-relaxed">
            Os resultados obtidos através desta triagem <strong>não substituem uma avaliação psicológica, neuropsicológica ou médica</strong>. O <em>Copenhagen Burnout Inventory (CBI)</em> mapeia a frequência e a intensidade subjetiva de indicadores de exaustão em três dimensões autônomas. Nenhuma faixa deste sistema define que você possui a síndrome clínica de burnout.
          </p>
          <div className="pt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#9e9e9e]">
            <span>Sem rótulos clínicos precipitados</span>
            <span aria-hidden="true">·</span>
            <span>Sem média geral agregada</span>
            <span aria-hidden="true">·</span>
            <span>Apoio à conversa com seu profissional de saúde</span>
          </div>
        </div>
      </div>
    </div>
  );
};
