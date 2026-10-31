import React, { useState } from 'react';
import { AnxietyResult } from './anxiety';
import { ANXIETY_QUESTIONS } from './anxietyQuestions';
import {
  getPointsForAnxietyAnswer,
  formatAnxietySummaryForSharing,
  ANXIETY_FIXED_DISCLAIMER,
} from './anxietyCalculator';
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
  HelpCircle,
  PhoneCall,
  UserCheck,
  Activity,
  HeartPulse,
  Brain,
  Zap,
} from 'lucide-react';

interface AnxietyResultsViewProps {
  result: AnxietyResult;
  onRetake: () => void;
  onSaveToHistory: () => void;
  isSaved: boolean;
  onOpenSchedule: () => void;
}

export const AnxietyResultsView: React.FC<AnxietyResultsViewProps> = ({
  result,
  onRetake,
  onSaveToHistory,
  isSaved,
  onOpenSchedule,
}) => {
  const [copied, setCopied] = useState(false);
  const [showItemBreakdown, setShowItemBreakdown] = useState(false);

  const handleCopy = async () => {
    const summary = formatAnxietySummaryForSharing(result);
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

  const getScoreColor = () => {
    if (result.totalScore <= 17) {
      return {
        text: 'text-[#7b7b56]',
        bar: 'bg-gradient-to-r from-[#7b7b56] to-[#949470]',
        badge: 'bg-[#edf2eb] text-[#415e3a] border-[#d1e0ce]',
      };
    }
    if (result.totalScore <= 35) {
      return {
        text: 'text-[#c8a08a]',
        bar: 'bg-gradient-to-r from-[#c8a08a] to-[#d6b29e]',
        badge: 'bg-[#fbf3ea] text-[#8e6132] border-[#edd9c5]',
      };
    }
    if (result.totalScore <= 53) {
      return {
        text: 'text-[#966f44]',
        bar: 'bg-gradient-to-r from-[#966f44] to-[#b38856]',
        badge: 'bg-[#faf2e6] text-[#7d5626] border-[#f0debe]',
      };
    }
    return {
      text: 'text-[#9f4f46]',
      bar: 'bg-gradient-to-r from-[#9f4f46] to-[#b86157]',
      badge: 'bg-[#faede9] text-[#933d32] border-[#f2cfc7]',
    };
  };

  const colors = getScoreColor();

  const getClusterIcon = (clusterId: string) => {
    switch (clusterId) {
      case 'fisiologico':
        return <HeartPulse className="w-4 h-4 text-[#c8a08a]" />;
      case 'cognitivo':
        return <Brain className="w-4 h-4 text-[#7b7b56]" />;
      case 'emocional':
        return <Zap className="w-4 h-4 text-[#c8a08a]" />;
      case 'comportamental':
      default:
        return <Activity className="w-4 h-4 text-[#7b7b56]" />;
    }
  };

  return (
    <div className="space-y-10 py-6 sm:py-10 max-w-4xl mx-auto">
      {/* Printable Clinical Header */}
      <div className="hidden print:block border-b-2 border-[#2d2d2d] pb-4 mb-6">
        <h1 className="text-2xl font-bold font-serif">
          Inventário de Ansiedade — A Mente Vencendo o Humor (Greenberger & Padesky)
        </h1>
        <p className="text-xs text-gray-600 mt-1">
          Data da aplicação: {result.dateFormatted} · Período de referência: Última semana · Escore: {result.totalScore}/72 pontos
        </p>
        <p className="text-xs text-gray-800 font-semibold mt-1">
          {ANXIETY_FIXED_DISCLAIMER}
        </p>
      </div>

      {/* Prominent Clinical Disclaimer */}
      <DisclaimerBanner />

      {/* Main Score Card */}
      <div className="bg-[#ffffff] border border-[#efe6dd] rounded-3xl p-6 sm:p-10 shadow-[0_4px_24px_rgba(123,123,86,0.06)] space-y-8 text-center sm:text-left print-card">
        {/* Top Meta Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#6b6b6b] border-b border-[#f6f0eb] pb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#7b7b56]" />
            <span>Triagem realizada em {result.dateFormatted}</span>
            <span aria-hidden="true">·</span>
            <span>Período avaliado: Última semana</span>
          </div>
          <span className="font-mono text-[#9e9e9e]">Protocolo: {result.id}</span>
        </div>

        {/* Big Score Block */}
        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#7b7b56] block">
            SEU RESULTADO
          </span>

          <div className="flex items-baseline justify-center sm:justify-start gap-2">
            <span className={`font-serif text-6xl sm:text-7xl font-bold tabular-nums leading-none ${colors.text}`}>
              {result.totalScore}
            </span>
            <span className="text-2xl sm:text-3xl text-[#9e9e9e] font-serif font-normal">
              / 72
            </span>
          </div>

          <div className="pt-1">
            <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold border ${colors.badge}`}>
              Faixa: {result.categoryRange} · {result.statusBadge}
            </span>
          </div>
        </div>

        {/* Visual Gauge Bar (0 to 72 with cutoffs at 17, 35, 53) */}
        <div className="space-y-2 pt-2">
          <div className="relative h-4 w-full bg-[#f6f0eb] rounded-full overflow-hidden border border-[#efe6dd]">
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-[#7b7b56]/50 z-10"
              style={{ left: `${(17 / 72) * 100}%` }}
              title="Faixa 17 pontos"
            />
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-[#c8a08a] z-10"
              style={{ left: `${(35 / 72) * 100}%` }}
              title="Faixa 35 pontos"
            />
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-[#9f4f46] z-10"
              style={{ left: `${(53 / 72) * 100}%` }}
              title="Faixa 53 pontos"
            />

            <div
              className={`h-full transition-all duration-700 ease-out ${colors.bar}`}
              style={{ width: `${Math.min(100, Math.max(0, (result.totalScore / 72) * 100))}%` }}
            />
          </div>

          <div className="flex justify-between text-[11px] text-[#9e9e9e] font-mono px-0.5">
            <span>0</span>
            <span>17</span>
            <span>35</span>
            <span>53</span>
            <span>72</span>
          </div>
        </div>

        {/* Action Bar (Print, Copy, Save, Retake) */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#f6f0eb] no-print">
          <button
            type="button"
            onClick={handleCopy}
            className="btn btn-secondary text-xs py-2 px-4 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copiado para transferência!' : 'Copiar Resumo'}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="btn btn-secondary text-xs py-2 px-4 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / Salvar PDF</span>
          </button>

          <button
            type="button"
            onClick={onSaveToHistory}
            disabled={isSaved}
            className={`btn text-xs py-2 px-4 cursor-pointer ${
              isSaved
                ? 'bg-[#edf2eb] text-[#415e3a] border border-[#d1e0ce] cursor-default'
                : 'btn-secondary'
            }`}
          >
            <Save className="w-4 h-4" />
            <span>{isSaved ? 'Salvo no Histórico' : 'Salvar no Histórico'}</span>
          </button>

          <div className="ml-auto">
            <button
              type="button"
              onClick={onRetake}
              className="text-xs font-medium text-[#7b7b56] hover:text-[#5f5f40] flex items-center gap-1.5 py-2 px-3 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Refazer Triagem</span>
            </button>
          </div>
        </div>
      </div>

      {/* "O que isso significa?" Section with Exact Prompt Copy */}
      <div className="style-card space-y-4 print-card">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7b7b56]">
          <HelpCircle className="w-4 h-4" />
          <span>Interpretação dos Indicadores</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#2d2d2d] leading-snug">
          {result.categoryDescription}
        </h2>

        <div className="space-y-2 text-xs sm:text-sm text-[#6b6b6b] leading-relaxed pt-1">
          <p>
            O escore deve ser interpretado considerando o contexto individual, o histórico de vida, a duração temporal dos sintomas, a presença de estressores externos e os eventuais prejuízos funcionais na rotina diária ou nas relações pessoais.
          </p>
        </div>
      </div>

      {/* 4 Clusters Breakdown */}
      <div className="style-card space-y-5 print-card">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#7b7b56] block mb-1">
            Distribuição por Agrupamentos de Sintomas
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#2d2d2d]">
            Como a ansiedade se distribui no seu perfil
          </h3>
          <p className="text-xs text-[#6b6b6b] mt-1">
            Mapeamento da intensidade acumulada em manifestações corporais, pensamentos, emoções e esquivas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {Object.entries(result.clusterScores).map(([key, item]) => (
            <div key={key} className="space-y-2 p-4 bg-[#fbf7f4] rounded-2xl border border-[#efe6dd]">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-semibold text-[#2d2d2d]">
                  {getClusterIcon(key)}
                  <span>{item.name}</span>
                </div>
                <span className="font-mono tabular-nums font-bold text-[#7b7b56]">
                  {item.score} / {item.maxScore} pts
                </span>
              </div>
              <div className="h-2.5 w-full bg-[#efe6dd] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#7b7b56] to-[#c8a08a] transition-all duration-500 rounded-full"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <div className="text-[11px] text-[#9e9e9e] text-right font-mono">
                {item.percentage}% da pontuação máxima do eixo
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Legal & Ethical Disclaimer Card */}
      <div className="crisp-note space-y-1 print-card">
        <div className="font-semibold text-xs text-[#2d2d2d] uppercase tracking-wider">
          Aviso Importante
        </div>
        <p className="text-xs text-[#525343] leading-relaxed">
          {ANXIETY_FIXED_DISCLAIMER}
        </p>
      </div>

      {/* "Quer entender melhor o seu resultado?" with Big Schedule CTA Button */}
      <div className="tcc-panel text-center sm:text-left print-card">
        <div className="tcc-panel-glow" aria-hidden="true" />

        <div className="relative z-10 space-y-5">
          <div className="tcc-badge inline-block">
            TERAPIA COGNITIVO-COMPORTAMENTAL & SUPORTE CLÍNICO
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
            Quer entender melhor o seu resultado?
          </h3>

          <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-2xl">
            Uma avaliação com psicólogo(a) ou médico(a) possibilita analisar os gatilhos específicos, a frequência e o impacto funcional dos sintomas ansiosos, desenvolvendo estratégias estruturadas de reestruturação cognitiva, respiração diafragmática e regulação emocional.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
            <button
              type="button"
              onClick={onOpenSchedule}
              className="btn btn-primary btn-lg w-full sm:w-auto cursor-pointer"
            >
              <UserCheck className="w-5 h-5 mr-1" />
              <span>AGENDAR AVALIAÇÃO</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <span className="text-xs text-white/70">
              Atendimento presencial ou online por profissionais especializados
            </span>
          </div>
        </div>
      </div>

      {/* Item-by-Item Breakdown Accordion */}
      <div className="style-card space-y-4 print-card">
        <button
          type="button"
          onClick={() => setShowItemBreakdown(!showItemBreakdown)}
          className="w-full flex items-center justify-between text-left cursor-pointer group focus:outline-none"
        >
          <div>
            <h4 className="font-serif text-xl font-normal text-[#2d2d2d] group-hover:text-[#7b7b56] transition-colors">
              Detalhamento das 24 Manifestações e Pontos Registrados
            </h4>
            <p className="text-xs text-[#9e9e9e]">
              Consulte a resposta dada a cada item e os respectivos pontos (0 a 3) somados pelo inventário.
            </p>
          </div>
          <div className="p-2 text-[#6b6b6b] group-hover:text-[#2d2d2d]">
            {showItemBreakdown ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </button>

        {showItemBreakdown && (
          <div className="pt-4 border-t border-[#efe6dd] overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#efe6dd] text-[#9e9e9e]">
                  <th className="py-2.5 pr-3 font-semibold w-12 font-mono">#</th>
                  <th className="py-2.5 px-3 font-semibold">Manifestação (Última semana)</th>
                  <th className="py-2.5 px-3 font-semibold">Agrupamento</th>
                  <th className="py-2.5 px-3 font-semibold">Sua Resposta</th>
                  <th className="py-2.5 pl-3 font-semibold text-right font-mono">Pontos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f6f0eb]">
                {ANXIETY_QUESTIONS.map((q) => {
                  const ans = result.answers[q.id];
                  const points = ans ? getPointsForAnxietyAnswer(ans) : '-';
                  const labelMap: Record<string, string> = {
                    nem_um_pouco: 'Nem um pouco',
                    as_vezes: 'Às vezes',
                    frequentemente: 'Frequentemente',
                    a_maior_parte: 'A maior parte do tempo',
                  };

                  return (
                    <tr key={q.id} className="hover:bg-[#fbf7f4]">
                      <td className="py-2.5 pr-3 font-mono text-[#9e9e9e]">{q.id}</td>
                      <td className="py-2.5 px-3 text-[#2d2d2d] max-w-md font-medium">
                        {q.text}
                      </td>
                      <td className="py-2.5 px-3 text-[#6b6b6b]">{q.clusterName}</td>
                      <td className="py-2.5 px-3 text-[#2d2d2d]">
                        {ans ? labelMap[ans] : 'Não respondida'}
                      </td>
                      <td className="py-2.5 pl-3 font-mono tabular-nums text-right font-bold text-[#7b7b56]">
                        {points}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
