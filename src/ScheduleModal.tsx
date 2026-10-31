import React, { useState } from 'react';
import {
  X,
  MessageCircle,
  Copy,
  Check,
  ShieldCheck,
  UserCheck,
  Instagram,
  Heart,
  Brain,
  Sparkles
} from 'lucide-react';

export type ScheduleToolType = 'depressao' | 'asrs' | 'tdah' | 'ansiedade' | 'aq50' | 'autismo' | 'burnout';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolType?: ScheduleToolType;
  score?: number;
  maxScore?: number;
  protocolId?: string;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isOpen,
  onClose,
  toolType = 'depressao',
  score,
  maxScore = 57,
  protocolId,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const getToolTitle = () => {
    switch (toolType) {
      case 'depressao':
        return 'Triagem de Sintomas Depressivos (Greenberger & Padesky)';
      case 'asrs':
      case 'tdah':
        return 'Escala de Autoavaliação de TDAH em Adultos (ASRS-18)';
      case 'ansiedade':
        return 'Inventário de Ansiedade (Greenberger & Padesky)';
      case 'aq50':
      case 'autismo':
        return 'Quociente do Espectro do Autismo (AQ-50)';
      case 'burnout':
        return 'Inventário de Burnout de Copenhague (CBI)';
    }
  };

  const defaultMessage =
    score !== undefined
      ? `Olá, Thais! Realizei a triagem online de ${getToolTitle()} e obtive a pontuação de ${score}/${maxScore} pontos (Protocolo: ${protocolId || 'gerado'}). Gostaria de informações sobre agendamento de consulta/avaliação clínica com você.`
      : `Olá, Thais! Gostaria de informações sobre agendamento de consulta psicológica ou avaliação neuropsicológica.`;

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(defaultMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const whatsappUrl = `https://wa.me/5543991814458?text=${encodeURIComponent(defaultMessage)}`;
  const instagramUrl = 'https://www.instagram.com/thais_rodriguesf/';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/45 backdrop-blur-md overflow-y-auto no-print">
      <div className="bg-[#ffffff] border border-[#efe6dd] rounded-2xl sm:rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-4 sm:p-8 space-y-4 sm:space-y-6 animate-in fade-in zoom-in-95 duration-200 relative">
        {/* Top Header */}
        <div className="flex items-center justify-between gap-4 border-b border-[#f6f0eb] pb-4">
          <div className="flex items-center gap-3">
            <div className="h-11 sm:h-12 max-w-[170px] sm:max-w-[200px] flex items-center shrink-0">
              <img
                src="/logoatt_cdd07c48.png"
                alt="Thais Rodrigues"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-semibold text-[#7b7b56] uppercase tracking-wider">
                  Thais Rodrigues · CRP 08/40838
                </span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#2d2d2d]">
                Agendar Consulta ou Avaliação
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#f6f0eb] hover:bg-[#efe6dd] text-[#6b6b6b] hover:text-[#2d2d2d] flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Professional summary & pillars */}
        <div className="p-4 rounded-2xl bg-[#fbf7f4] border border-[#efe6dd] space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="font-serif text-base font-semibold text-[#2d2d2d]">
              Thais Rodrigues
            </span>
            <span className="text-xs text-[#7b7b56] font-medium">CRP 08/40838</span>
          </div>
          <p className="text-xs text-[#525343] leading-relaxed">
            Especialista em <strong>Terapia Cognitiva Comportamental (TCC)</strong> e <strong>Neuropsicologia</strong>.
            Atendimentos fundamentados em ciência, acolhimento e propósito.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1 text-[11px]">
            <span className="px-2.5 py-0.5 rounded-full bg-white border border-[#efe6dd] text-[#6b6b6b]">
              Psicoterapia Mulheres (Online)
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-white border border-[#efe6dd] text-[#6b6b6b]">
              Avaliação Neuropsicológica (Todas idades)
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-white border border-[#efe6dd] text-[#6b6b6b]">
              Infantil e Adolescentes (Presencial)
            </span>
          </div>
        </div>

        {/* Score Context Reminder */}
        {score !== undefined && (
          <div className="p-4 bg-white rounded-2xl border border-[#c8a08a]/40 shadow-2xs flex items-center justify-between gap-4">
            <div>
              <span className="text-xs text-[#6b6b6b] block">Sua pontuação na triagem:</span>
              <strong className="font-serif text-xl text-[#2d2d2d]">
                {score} de {maxScore} pontos {toolType === 'asrs' || toolType === 'tdah' ? '(Parte A)' : ''}
              </strong>
            </div>
            <span className="text-[11px] font-mono text-[#9e9e9e] px-2.5 py-1 bg-[#fbf7f4] rounded-full border border-[#efe6dd]">
              {protocolId}
            </span>
          </div>
        )}

        {/* What to expect in assessment */}
        <div className="space-y-3 text-xs sm:text-sm text-[#525343] leading-relaxed">
          <h3 className="font-serif text-base font-normal text-[#2d2d2d]">
            Como funciona a consulta e o processo avaliativo?
          </h3>
          <ul className="space-y-2 text-xs text-[#6b6b6b]">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#7b7b56] mt-1.5 shrink-0" />
              <span><strong>Anamnese aprofundada:</strong> investigação detalhada de histórico de vida, queixas atuais e funcionalidade no dia a dia.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#7b7b56] mt-1.5 shrink-0" />
              <span><strong>Instrumentos e Bateria de Testes:</strong> aplicação de instrumentos normatizados e validados pelo SATEPSI.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#7b7b56] mt-1.5 shrink-0" />
              <span><strong>Laudo e Devolutiva:</strong> entrega de documento detalhado com orientações práticas e encaminhamentos pertinentes.</span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#1eb857] hover:to-[#0f7a6e] text-white font-medium text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Falar no WhatsApp: (43) 99181-4458</span>
          </a>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleCopyMessage}
              className="btn btn-secondary text-xs py-2.5 cursor-pointer flex items-center justify-center gap-2"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Mensagem copiada!' : 'Copiar texto pré-formatado'}</span>
            </button>

            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary text-xs py-2.5 cursor-pointer flex items-center justify-center gap-2"
            >
              <Instagram className="w-4 h-4 text-[#E1306C]" />
              <span>Instagram: @thais_rodriguesf</span>
            </a>
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-2 border-t border-[#f6f0eb] flex items-center justify-between text-[11px] text-[#9e9e9e]">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#7b7b56]" />
            Atendimento confidencial segundo o Código de Ética do Psicólogo
          </span>
          <button
            type="button"
            onClick={onClose}
            className="hover:underline text-[#6b6b6b] cursor-pointer"
          >
            Fechar janela
          </button>
        </div>
      </div>
    </div>
  );
};
