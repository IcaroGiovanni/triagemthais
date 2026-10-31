import React, { useState } from 'react';
import { DepressionResult } from './depression';
import { DEPRESSION_QUESTIONS, DEPRESSION_RESPONSE_OPTIONS } from './depressionQuestions';
import {
  formatDepressionSummaryForSharing,
  DEPRESSION_FIXED_DISCLAIMER,
  VALUE_TO_POINTS,
} from './depressionCalculator';
import { DisclaimerBanner } from './DisclaimerBanner';
import {
  Printer,
  Copy,
  Check,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Calendar,
  Save,
  ArrowRight,
  PhoneCall,
  UserCheck,
  HeartPulse,
  ShieldAlert,
  AlertTriangle,
  Info,
  LifeBuoy,
} from 'lucide-react';

interface DepressionResultsViewProps {
  result: DepressionResult;
  onRetake: () => void;
  onSaveToHistory: () => void;
  isSaved: boolean;
  onOpenSchedule: () => void;
}

export const DepressionResultsView: React.FC<DepressionResultsViewProps> = ({
  result,
  onRetake,
  onSaveToHistory,
  isSaved,
  onOpenSchedule,
}) => {
  const [copied, setCopied] = useState(false);
  const [showItemBreakdown, setShowItemBreakdown] = useState(false);

  const handleCopy = async () => {
    const summary = formatDepressionSummaryForSharing(result);
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const maxScore = 57;
  const scorePercent = Math.min(100, Math.round((result.totalScore / maxScore) * 100));

  return (
    <div className="space-y-8 py-8 sm:py-12">
      {/* 1. Clinical Disclaimer Banner */}
      <DisclaimerBanner />

      {/* 2. CRITICAL SAFETY ALERT (Shows before or at top if item 10, 11, or 12 > 0) */}
      {result.safety.hasSafetyRisk && (
        <div
          role="alert"
          className={`p-6 sm:p-8 rounded-3xl border shadow-lg space-y-6 ${
            result.safety.isImmediateEmergency
              ? 'bg-[#fcf2f0] border-[#edd0cc] text-[#2d2d2d]'
              : 'bg-[#fff9f4] border-[#f2ded1] text-[#2d2d2d]'
          }`}
        >
          {/* Header */}
          <div className="flex items-start gap-4">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                result.safety.isImmediateEmergency
                  ? 'bg-[#9f4f46] text-white'
                  : 'bg-[#c8a08a] text-white'
              }`}
            >
              <ShieldAlert className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#9f4f46] block">
                {result.safety.isImmediateEmergency
                  ? 'Protocolo Clínico de Atenção Imediata'
                  : 'Aviso Clínico de Atenção e Cuidado'}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#2d2d2d] leading-snug">
                {result.safety.alertHeadline}
              </h2>
            </div>
          </div>

          {/* Safety Body Text */}
          <div className="space-y-3 text-sm sm:text-base text-[#4a4a4a] leading-relaxed pl-0 sm:pl-16">
            <p className="whitespace-pre-line font-medium text-[#2d2d2d]">
              {result.safety.alertMessage}
            </p>

            <div className="p-4 rounded-2xl bg-white/80 border border-[#edd7d4] text-xs sm:text-sm text-[#6b6b6b] space-y-1">
              <div className="flex items-center gap-2 text-[#9f4f46] font-semibold">
                <Info className="w-4 h-4 shrink-0" />
                <span>O que este questionário faz e não faz:</span>
              </div>
              <p>
                Este instrumento é apenas um rastreio geral e <strong>não realiza avaliação de risco suicida</strong>. Não afirmamos que você está ou não está em risco apenas com base neste questionário on-line; a avaliação clínica presencial ou com serviço habilitado é imprescindível.
              </p>
            </div>
          </div>

          {/* Emergency Hotlines & Contacts */}
          <div className="pt-2 border-t border-[#edd0cc]/80 space-y-3 pl-0 sm:pl-16">
            <span className="text-xs font-semibold text-[#2d2d2d] uppercase tracking-wider block">
              Canais Oficiais de Ajuda Imediata e Acolhimento 24 Horas:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {/* CVV */}
              <a
                href="tel:188"
                className="p-4 rounded-2xl bg-white border border-[#edd7d4] hover:border-[#9f4f46] hover:shadow-sm transition-all flex items-center justify-between gap-3 text-left group"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#9f4f46] font-bold block">
                    Apoio Emocional 24h
                  </span>
                  <strong className="text-base font-serif text-[#2d2d2d] block group-hover:text-[#9f4f46]">
                    CVV · Ligue 188
                  </strong>
                  <span className="text-[11px] text-[#6b6b6b]">Ligação gratuita e sigilosa</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#fbf2f0] group-hover:bg-[#9f4f46] group-hover:text-white text-[#9f4f46] flex items-center justify-center shrink-0 transition-colors">
                  <PhoneCall className="w-4 h-4" />
                </div>
              </a>

              {/* SAMU */}
              <a
                href="tel:192"
                className="p-4 rounded-2xl bg-white border border-[#edd7d4] hover:border-[#9f4f46] hover:shadow-sm transition-all flex items-center justify-between gap-3 text-left group"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#9f4f46] font-bold block">
                    Emergência Médica
                  </span>
                  <strong className="text-base font-serif text-[#2d2d2d] block group-hover:text-[#9f4f46]">
                    SAMU · Ligue 192
                  </strong>
                  <span className="text-[11px] text-[#6b6b6b]">Resgate e urgências médicas</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#fbf2f0] group-hover:bg-[#9f4f46] group-hover:text-white text-[#9f4f46] flex items-center justify-center shrink-0 transition-colors">
                  <PhoneCall className="w-4 h-4" />
                </div>
              </a>

              {/* UPA / Pronto Socorro */}
              <div className="p-4 rounded-2xl bg-white border border-[#edd7d4] flex items-center justify-between gap-3 text-left">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#7b7b56] font-bold block">
                    Pronto Atendimento
                  </span>
                  <strong className="text-base font-serif text-[#2d2d2d] block">
                    UPA / Emergência
                  </strong>
                  <span className="text-[11px] text-[#6b6b6b]">Dirija-se à unidade mais próxima</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#f6f0eb] text-[#7b7b56] flex items-center justify-center shrink-0">
                  <LifeBuoy className="w-4 h-4" />
                </div>
              </div>
            </div>

            <p className="text-xs text-[#9f4f46] font-medium pt-1">
              • Recomendação de segurança: se você sente que não consegue se manter seguro(a), procure imediatamente uma pessoa de sua confiança para acompanhá-lo(a) ou vá ao pronto atendimento.
            </p>
          </div>
        </div>
      )}

      {/* 3. Main Result Score Card */}
      <div className="bg-[#ffffff] border border-[#efe6dd] rounded-3xl p-6 sm:p-10 shadow-lg space-y-8">
        {/* Top Meta info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#f6f0eb] pb-6">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-[#7b7b56] uppercase tracking-wider block">
              Triagem de Sintomas Depressivos · Greenberger & Padesky
            </span>
            <div className="flex items-center gap-2 text-xs text-[#9e9e9e]">
              <Calendar className="w-3.5 h-3.5" />
              <span>{result.dateFormatted}</span>
              <span className="text-[#dfd4c8]">·</span>
              <span className="font-mono">ID: {result.id}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                result.severityBand === 'normal'
                  ? 'bg-[#7b7b56]/15 text-[#4a4a2f] border-[#7b7b56]/30'
                  : result.severityBand === 'leve'
                  ? 'bg-[#efe6dd] text-[#6b5042] border-[#dfd4c8]'
                  : result.severityBand === 'moderada'
                  ? 'bg-[#c8a08a]/20 text-[#8c4f36] border-[#c8a08a]/40'
                  : 'bg-[#9f4f46]/15 text-[#9f4f46] border-[#9f4f46]/30 font-bold'
              }`}
            >
              {result.statusBadge}
            </span>
          </div>
        </div>

        {/* Big Escore Display (Requested format: Escore de sintomas depressivos: X/57) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-2 text-center lg:text-left">
            <span className="text-xs uppercase tracking-wider text-[#6b6b6b] font-medium block">
              Pontuação Total Obtida
            </span>
            <div className="font-serif text-5xl sm:text-6xl font-normal text-[#2d2d2d] tracking-tight">
              {result.totalScore}{' '}
              <span className="text-2xl sm:text-3xl font-light text-[#9e9e9e]">/ 57</span>
            </div>
            <p className="text-xs font-serif text-[#7b7b56] font-medium">
              Escore de sintomas depressivos: {result.totalScore}/57.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-[#6b6b6b]">
                <span className="font-medium text-[#2d2d2d]">{result.bandLabel}</span>
                <span className="font-mono">{scorePercent}% do escore total</span>
              </div>

              {/* Multi-segment reference bar */}
              <div className="relative h-4 bg-[#f6f0eb] rounded-full overflow-hidden border border-[#efe6dd]">
                {/* 4 reference regions */}
                <div className="absolute inset-0 flex">
                  {/* Normal: 0 to 12 (12 / 57 = 21.05%) */}
                  <div
                    style={{ width: `${(12 / 57) * 100}%` }}
                    className="border-r border-white/60 bg-[#7b7b56]/20"
                    title="0–12 Normal"
                  />
                  {/* Leve: 13 to 21 (9 / 57 = 15.79%) */}
                  <div
                    style={{ width: `${(9 / 57) * 100}%` }}
                    className="border-r border-white/60 bg-[#c8a08a]/20"
                    title="13–21 Leve"
                  />
                  {/* Moderada: 22 to 38 (17 / 57 = 29.82%) */}
                  <div
                    style={{ width: `${(17 / 57) * 100}%` }}
                    className="border-r border-white/60 bg-[#c8a08a]/40"
                    title="22–38 Moderada"
                  />
                  {/* Grave: 39 to 57 (19 / 57 = 33.33%) */}
                  <div
                    style={{ width: `${(19 / 57) * 100}%` }}
                    className="bg-[#9f4f46]/25"
                    title="39–57 Grave"
                  />
                </div>

                {/* Score Fill Marker */}
                <div
                  className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[#7b7b56] via-[#c8a08a] to-[#9f4f46] rounded-full transition-all duration-500 opacity-80"
                  style={{ width: `${scorePercent}%` }}
                />
              </div>

              {/* Band Legend Labels */}
              <div className="flex justify-between text-[10px] text-[#9e9e9e] font-mono px-0.5">
                <span>0 (Normal)</span>
                <span>13 (Leve)</span>
                <span>22 (Moderada)</span>
                <span>39 (Grave)</span>
                <span>57</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#4a4a4a] leading-relaxed bg-[#fbf7f4] p-4 rounded-2xl border border-[#efe6dd]">
              {result.scoreDescription}
            </p>
          </div>
        </div>

        {/* 4. MANDATORY ETHICAL STATEMENT (Strict user requirement) */}
        <div className="p-5 rounded-2xl bg-[#f6f0eb] border border-[#efe6dd] space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#7b7b56] uppercase tracking-wider">
            <Info className="w-4 h-4" />
            <span>Aviso Ético Obrigatório sobre a Interpretação:</span>
          </div>
          <p className="text-xs sm:text-sm text-[#4a4a4a] leading-relaxed">
            “Este resultado representa a pontuação obtida neste questionário e não estabelece diagnóstico de depressão. A interpretação deve considerar o contexto individual e, quando necessário, ser realizada por profissional habilitado.”
          </p>
          <p className="text-[11px] text-[#9e9e9e] leading-relaxed">
            O questionário é uma ferramenta de rastreio e monitoramento de sintomas. Ele não é utilizado para emitir diagnóstico automático de depressão, funcionando como apoio à reflexão e indicação de possível necessidade de avaliação profissional.
          </p>
        </div>

        {/* 5. Clinical Action CTA & Schedule */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#fbf7f4] to-[#f6f0eb] border border-[#efe6dd] flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-[#7b7b56] text-xs font-semibold uppercase tracking-wider">
              <UserCheck className="w-4 h-4" />
              <span>Acompanhamento Especializado</span>
            </div>
            <h4 className="font-serif text-xl font-normal text-[#2d2d2d]">
              Deseja conversar com um(a) psicólogo(a)?
            </h4>
            <p className="text-xs text-[#6b6b6b] max-w-lg leading-relaxed">
              Agende uma consulta ou avaliação clínica. Seus resultados podem ser compartilhados com o profissional para contextualizar o momento atual.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenSchedule}
            className="btn btn-primary text-xs py-3.5 px-6 shrink-0 cursor-pointer flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <span>Agendar Avaliação</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 6. Utility Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#f6f0eb]">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="btn btn-secondary text-xs py-2 px-3.5 flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#7b7b56]" />
              <span>Imprimir Relatório</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="btn btn-secondary text-xs py-2 px-3.5 flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-[#c8a08a]" />}
              <span>{copied ? 'Sumário Copiado!' : 'Copiar Sumário'}</span>
            </button>

            <button
              type="button"
              onClick={onSaveToHistory}
              disabled={isSaved}
              className={`btn text-xs py-2 px-3.5 flex items-center gap-1.5 ${
                isSaved
                  ? 'bg-[#f6f0eb] text-[#7b7b56] border border-[#efe6dd] cursor-default'
                  : 'btn-secondary cursor-pointer'
              }`}
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaved ? 'Salvo no Histórico' : 'Salvar no Histórico'}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onRetake}
            className="text-xs text-[#6b6b6b] hover:text-[#2d2d2d] flex items-center gap-1.5 cursor-pointer py-1 text-underline-animated"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Refazer Questionário</span>
          </button>
        </div>
      </div>

      {/* 7. Detailed 19-Item Breakdown Accordion */}
      <div className="bg-[#ffffff] border border-[#efe6dd] rounded-3xl p-6 shadow-sm space-y-4">
        <button
          type="button"
          onClick={() => setShowItemBreakdown(!showItemBreakdown)}
          className="w-full flex items-center justify-between text-left cursor-pointer group"
        >
          <div className="space-y-0.5">
            <h3 className="font-serif text-lg font-normal text-[#2d2d2d] group-hover:text-[#7b7b56] transition-colors">
              Detalhamento dos 19 Itens Respondidos
            </h3>
            <p className="text-xs text-[#9e9e9e]">
              Veja como cada sintoma foi avaliado durante a última semana
            </p>
          </div>

          <div className="p-2 rounded-full bg-[#f6f0eb] group-hover:bg-[#efe6dd] text-[#6b6b6b] transition-colors">
            {showItemBreakdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {showItemBreakdown && (
          <div className="pt-4 border-t border-[#f6f0eb] space-y-2 animate-in fade-in duration-200">
            {DEPRESSION_QUESTIONS.map((q) => {
              const ansVal = result.answers[q.id];
              const points = ansVal ? VALUE_TO_POINTS[ansVal] : 0;
              const optionObj = DEPRESSION_RESPONSE_OPTIONS.find((o) => o.value === ansVal);
              const isSafety = q.isSafetyCritical;

              return (
                <div
                  key={q.id}
                  className={`p-3.5 rounded-2xl border text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                    isSafety && points > 0
                      ? 'bg-[#fcf2f0] border-[#edd0cc]'
                      : 'bg-[#fbf7f4]/60 border-[#efe6dd]'
                  }`}
                >
                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[#9e9e9e]">#{q.id}</span>
                      <span className="font-medium text-[#2d2d2d]">{q.text}</span>
                      {isSafety && (
                        <span className="text-[10px] text-[#9f4f46] bg-white px-2 py-0.5 rounded-full border border-[#edd0cc]">
                          Item de segurança
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[#6b6b6b]">{optionObj?.label || 'Não respondido'}</span>
                    <span
                      className={`font-mono font-bold px-2.5 py-0.5 rounded-full ${
                        points === 0
                          ? 'bg-[#f6f0eb] text-[#9e9e9e]'
                          : points === 1
                          ? 'bg-[#efe6dd] text-[#2d2d2d]'
                          : points === 2
                          ? 'bg-[#c8a08a]/20 text-[#8c4f36]'
                          : 'bg-[#9f4f46]/20 text-[#9f4f46]'
                      }`}
                    >
                      {points} {points === 1 ? 'pt' : 'pts'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
