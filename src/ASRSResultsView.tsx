import React, { useState } from 'react';
import { ASRSResult } from './asrs';
import { ASRS_QUESTIONS } from './asrsQuestions';
import {
  getPointForPartAItem,
  formatASRSSummaryForSharing,
  ASRS_FIXED_DISCLAIMER,
} from './asrsCalculator';
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
  Target,
  Layers,
  Brain,
  Zap,
} from 'lucide-react';

interface ASRSResultsViewProps {
  result: ASRSResult;
  onRetake: () => void;
  onSaveToHistory: () => void;
  isSaved: boolean;
  onOpenSchedule: () => void;
}

export const ASRSResultsView: React.FC<ASRSResultsViewProps> = ({
  result,
  onRetake,
  onSaveToHistory,
  isSaved,
  onOpenSchedule,
}) => {
  const [copied, setCopied] = useState(false);
  const [showItemBreakdown, setShowItemBreakdown] = useState(false);

  const handleCopy = async () => {
    const summary = formatASRSSummaryForSharing(result);
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

  const isPositive = result.classification === 'positivo';

  const colors = isPositive
    ? {
        text: 'text-[#c8a08a]',
        bar: 'bg-gradient-to-r from-[#c8a08a] to-[#d6b29e]',
        badge: 'bg-[#fbf3ea] text-[#8e6132] border-[#edd9c5]',
      }
    : {
        text: 'text-[#7b7b56]',
        bar: 'bg-gradient-to-r from-[#7b7b56] to-[#949470]',
        badge: 'bg-[#edf2eb] text-[#415e3a] border-[#d1e0ce]',
      };

  return (
    <div className="space-y-10 py-6 sm:py-10 max-w-4xl mx-auto">
      {/* Printable Clinical Header */}
      <div className="hidden print:block border-b-2 border-[#2d2d2d] pb-4 mb-6">
        <h1 className="text-2xl font-bold font-serif">
          Relatório de Triagem - Escala de TDAH em Adultos (ASRS-18 / ASRS-v1.1 OMS)
        </h1>
        <p className="text-xs text-gray-600 mt-1">
          Data da aplicação: {result.dateFormatted} · Protocolo: {result.id} · Escore Parte A: {result.partAScore}/6 pontos
        </p>
        <p className="text-xs text-gray-800 font-semibold mt-1">
          {ASRS_FIXED_DISCLAIMER}
        </p>
      </div>

      {/* Prominent Clinical Disclaimer */}
      <DisclaimerBanner />

      {/* Main Score Card for PARTE A */}
      <div className="bg-[#ffffff] border border-[#efe6dd] rounded-3xl p-6 sm:p-10 shadow-[0_4px_24px_rgba(123,123,86,0.06)] space-y-8 text-center sm:text-left print-card">
        {/* Top Meta Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#6b6b6b] border-b border-[#f6f0eb] pb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#7b7b56]" />
            <span>Triagem realizada em {result.dateFormatted}</span>
            <span aria-hidden="true">·</span>
            <span>Critério OMS ASRS-v1.1</span>
          </div>
          <span className="font-mono text-[#9e9e9e]">Protocolo: {result.id}</span>
        </div>

        {/* Big Score Block */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <Target className="w-4 h-4 text-[#7b7b56]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#7b7b56]">
              RESULTADO DA PARTE A (RASTREIO OFICIAL)
            </span>
          </div>

          <div className="flex items-baseline justify-center sm:justify-start gap-2">
            <span className={`font-serif text-6xl sm:text-7xl font-bold tabular-nums leading-none ${colors.text}`}>
              {result.partAScore}
            </span>
            <span className="text-2xl sm:text-3xl text-[#9e9e9e] font-serif font-normal">
              / 6 pontos
            </span>
          </div>

          <div className="pt-1">
            <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold border uppercase tracking-wider ${colors.badge}`}>
              {isPositive
                ? '4 A 6 PONTOS: RASTREIO POSITIVO · COM SINAIS SUFICIENTES PARA TDAH'
                : '0 A 3 PONTOS: RASTREIO NEGATIVO · SEM SINAIS SUFICIENTES PARA TDAH'}
            </span>
          </div>
        </div>

        {/* Visual Gauge Bar (0 to 6 with cutoffs at 4) */}
        <div className="space-y-2 pt-2">
          <div className="relative h-4 w-full bg-[#f6f0eb] rounded-full overflow-hidden border border-[#efe6dd]">
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-[#c8a08a] z-10"
              style={{ left: `${(4 / 6) * 100}%` }}
              title="Ponto de corte de rastreio: 4 pontos"
            />

            <div
              className={`h-full transition-all duration-700 ease-out ${colors.bar}`}
              style={{ width: `${Math.min(100, Math.max(0, (result.partAScore / 6) * 100))}%` }}
            />
          </div>

          <div className="flex justify-between text-[11px] text-[#9e9e9e] font-mono px-0.5">
            <span>0</span>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span className="text-[#c8a08a] font-bold">4 (corte positivo)</span>
            <span>5</span>
            <span>6</span>
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

      {/* "O que isso significa?" Section */}
      <div className="style-card space-y-4 print-card">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7b7b56]">
          <HelpCircle className="w-4 h-4" />
          <span>Interpretação da Parte A</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#2d2d2d] leading-snug">
          {result.classificationTitle}
        </h2>

        <div className="space-y-3 text-sm text-[#525343] leading-relaxed">
          <p>{result.classificationDescription}</p>
        </div>
      </div>

      {/* PARTE B: Perfil Complementar de Frequência */}
      <div className="style-card space-y-5 print-card">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#c8a08a] mb-1">
            <Layers className="w-4 h-4" />
            <span>PARTE B · ITENS 7 A 18</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#2d2d2d]">
            Informações Complementares sobre a Frequência dos Sintomas
          </h3>
          <p className="text-xs text-[#6b6b6b] mt-1 leading-relaxed">
            <strong>Importante:</strong> No método tradicional do ASRS-v1.1, <em>não se deve criar um ponto de corte global para a Parte B</em>, nem somar os itens da Parte B à pontuação da Parte A. As respostas abaixo servem para fornecer um mapa complementar da frequência das queixas ao profissional avaliador.
          </p>
        </div>

        {/* Frequencies breakdown in Part B */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          <div className="p-3.5 bg-[#fbf7f4] rounded-2xl border border-[#efe6dd] text-center">
            <span className="text-xs text-[#6b6b6b] block">Muito Frequentemente</span>
            <strong className="font-serif text-2xl text-[#c8a08a] block mt-1">
              {result.partBFrequencies.muitoFrequentemente}
            </strong>
            <span className="text-[10px] text-[#9e9e9e]">itens na Parte B</span>
          </div>

          <div className="p-3.5 bg-[#fbf7f4] rounded-2xl border border-[#efe6dd] text-center">
            <span className="text-xs text-[#6b6b6b] block">Frequentemente</span>
            <strong className="font-serif text-2xl text-[#7b7b56] block mt-1">
              {result.partBFrequencies.frequentemente}
            </strong>
            <span className="text-[10px] text-[#9e9e9e]">itens na Parte B</span>
          </div>

          <div className="p-3.5 bg-[#fbf7f4] rounded-2xl border border-[#efe6dd] text-center">
            <span className="text-xs text-[#6b6b6b] block">Algumas Vezes</span>
            <strong className="font-serif text-2xl text-[#2d2d2d] block mt-1">
              {result.partBFrequencies.algumasVezes}
            </strong>
            <span className="text-[10px] text-[#9e9e9e]">itens na Parte B</span>
          </div>

          <div className="p-3.5 bg-[#fbf7f4] rounded-2xl border border-[#efe6dd] text-center">
            <span className="text-xs text-[#6b6b6b] block">Raramente</span>
            <strong className="font-serif text-2xl text-[#2d2d2d] block mt-1">
              {result.partBFrequencies.raramente}
            </strong>
            <span className="text-[10px] text-[#9e9e9e]">itens na Parte B</span>
          </div>

          <div className="p-3.5 bg-[#fbf7f4] rounded-2xl border border-[#efe6dd] text-center col-span-2 sm:col-span-1">
            <span className="text-xs text-[#6b6b6b] block">Nunca</span>
            <strong className="font-serif text-2xl text-[#2d2d2d] block mt-1">
              {result.partBFrequencies.nunca}
            </strong>
            <span className="text-[10px] text-[#9e9e9e]">itens na Parte B</span>
          </div>
        </div>

        {/* Breakdown by Symptom Axes (Desatenção vs Hiperatividade/Impulsividade) */}
        <div className="pt-3 border-t border-[#efe6dd] grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-[#f6f0eb] rounded-2xl border border-[#efe6dd] space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#5f5f40]">
              <Brain className="w-4 h-4 text-[#7b7b56]" />
              <span>Eixo Desatenção (Itens 1 a 9)</span>
            </div>
            <div className="text-xs text-[#6b6b6b]">
              Manifestações com frequência elevada (Frequentemente / Muito Freq.):
              <strong className="block text-base font-serif text-[#2d2d2d] mt-1">
                {result.symptomCounts.desatencaoElevada} de 9 sintomas
              </strong>
            </div>
          </div>

          <div className="p-4 bg-[#f6f0eb] rounded-2xl border border-[#efe6dd] space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#8c6550]">
              <Zap className="w-4 h-4 text-[#c8a08a]" />
              <span>Eixo Hiperatividade / Impulsividade (Itens 10 a 18)</span>
            </div>
            <div className="text-xs text-[#6b6b6b]">
              Manifestações com frequência elevada (Frequentemente / Muito Freq.):
              <strong className="block text-base font-serif text-[#2d2d2d] mt-1">
                {result.symptomCounts.hiperatividadeElevada} de 9 sintomas
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Legal & Ethical Disclaimer Card */}
      <div className="crisp-note space-y-1 print-card">
        <div className="font-semibold text-xs text-[#2d2d2d] uppercase tracking-wider">
          Aviso Clínico Obrigatório
        </div>
        <p className="text-xs text-[#525343] leading-relaxed">
          {ASRS_FIXED_DISCLAIMER}
        </p>
      </div>

      {/* "Quer entender melhor o seu resultado?" with Big Schedule CTA Button */}
      <div className="tcc-panel text-center sm:text-left print-card">
        <div className="tcc-panel-glow" aria-hidden="true" />

        <div className="relative z-10 space-y-5">
          <div className="tcc-badge inline-block">
            AVALIAÇÃO NEUROPSICOLÓGICA & DIAGNÓSTICO DIFERENCIAL DE TDAH
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
            Quer entender melhor o seu resultado?
          </h3>

          <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-2xl">
            O diagnóstico de TDAH em adultos é clínico e compreensivo. A investigação avalia se os sintomas estavam presentes desde a infância (mesmo compensados), o impacto nas funções executivas, trabalho e relações, e realiza diagnóstico diferencial com ansiedade, autismo (TEA) e sobrecarga crônica.
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
              Detalhamento das 18 Questões e Respostas Registradas
            </h4>
            <p className="text-xs text-[#9e9e9e]">
              Veja a resposta dada a cada item e os pontos computados no rastreio da Parte A (itens 1 a 6).
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
                  <th className="py-2.5 px-3 font-semibold">Questão ASRS-18</th>
                  <th className="py-2.5 px-3 font-semibold">Parte</th>
                  <th className="py-2.5 px-3 font-semibold">Subtipo</th>
                  <th className="py-2.5 px-3 font-semibold">Sua Resposta</th>
                  <th className="py-2.5 pl-3 font-semibold text-right font-mono">Ponto Parte A</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f6f0eb]">
                {ASRS_QUESTIONS.map((q) => {
                  const ans = result.answers[q.id];
                  const isPartA = q.part === 'A';
                  const point = isPartA && ans ? getPointForPartAItem(q.id, ans) : null;
                  const labelMap: Record<string, string> = {
                    nunca: 'Nunca',
                    raramente: 'Raramente',
                    algumas_vezes: 'Algumas Vezes',
                    frequentemente: 'Frequentemente',
                    muito_frequentemente: 'Muito Frequentemente',
                  };

                  return (
                    <tr key={q.id} className="hover:bg-[#fbf7f4]">
                      <td className="py-2.5 pr-3 font-mono text-[#9e9e9e]">{q.id}</td>
                      <td className="py-2.5 px-3 text-[#2d2d2d] max-w-md font-medium">
                        {q.text}
                      </td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                            isPartA ? 'bg-[#efe6dd] text-[#5f5f40]' : 'bg-[#f6f0eb] text-[#c8a08a]'
                          }`}
                        >
                          Parte {q.part}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-[#6b6b6b]">{q.subtypeName}</td>
                      <td className="py-2.5 px-3 text-[#2d2d2d]">
                        {ans ? labelMap[ans] : 'Não respondida'}
                      </td>
                      <td className="py-2.5 pl-3 font-mono tabular-nums text-right font-bold text-[#7b7b56]">
                        {isPartA ? `${point} pt` : '—'}
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
