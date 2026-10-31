import React, { useState } from 'react';
import { ScreeningResult } from './cbi';
import { CBI_QUESTIONS } from './cbiQuestions';
import { getPointsForAnswer, formatResultSummaryForSharing } from './cbiCalculator';
import { DisclaimerBanner } from './DisclaimerBanner';
import {
  Printer,
  Copy,
  Check,
  RotateCcw,
  Heart,
  Briefcase,
  Users,
  ChevronDown,
  ChevronUp,
  Info,
  Calendar,
  Save,
  PhoneCall,
  Sparkles,
} from 'lucide-react';

interface ResultsViewProps {
  result: ScreeningResult;
  onRetake: () => void;
  onSaveToHistory: () => void;
  isSaved: boolean;
  onOpenEducation: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  result,
  onRetake,
  onSaveToHistory,
  isSaved,
  onOpenEducation,
}) => {
  const [copied, setCopied] = useState(false);
  const [showItemBreakdown, setShowItemBreakdown] = useState(false);

  const handleCopy = async () => {
    const summary = formatResultSummaryForSharing(result);
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

  const getIntensityBadge = (intensity: string) => {
    switch (intensity) {
      case 'baixa':
        return {
          label: 'Menor intensidade (0–49)',
          badgeClass: 'bg-[#edf2eb] text-[#415e3a] border-[#d1e0ce]',
          barColor: 'bg-gradient-to-r from-[#7b7b56] to-[#949470]',
        };
      case 'moderada':
        return {
          label: 'Intensidade moderada (50–74)',
          badgeClass: 'bg-[#fbf3ea] text-[#8e6132] border-[#edd9c5]',
          barColor: 'bg-gradient-to-r from-[#c8a08a] to-[#d6b29e]',
        };
      case 'elevada':
      default:
        return {
          label: 'Intensidade elevada (75–100)',
          badgeClass: 'bg-[#faede9] text-[#933d32] border-[#f2cfc7]',
          barColor: 'bg-gradient-to-r from-[#9f4f46] to-[#b86157]',
        };
    }
  };

  const { pessoal, trabalho, clientes } = result.dimensions;

  const getComparativeAnalysis = () => {
    if (pessoal.score >= 75 && trabalho.score < 50 && clientes.score >= 75) {
      return 'Nota-se uma alta intensidade de exaustão na esfera pessoal e no contato direto com clientes/público, enquanto a rotina formal de trabalho em si apresenta menor intensidade. Isso demonstra o poder do CBI: separar as fontes de sobrecarga ao invés de rotular o trabalho todo de forma genérica.';
    }

    if (trabalho.score >= 75 && pessoal.score < 50) {
      return 'Os indicadores apontam intensidade elevada especificamente na rotina e exigências do trabalho, com preservação relativa do tempo e energia na vida pessoal. Isso sugere sobrecarga contextual profissional pontual.';
    }

    if (pessoal.score >= 75 && trabalho.score >= 75) {
      return 'Observa-se intensidade elevada concomitante no âmbito pessoal e no trabalho, sugerindo transbordamento do desgaste ocupacional para as demais áreas da vida diária.';
    }

    if (pessoal.score < 50 && trabalho.score < 50 && (!result.clientWorkApplicable || clientes.score < 50)) {
      return 'Todas as três dimensões situam-se na faixa de menor intensidade de sinais (0–49). O padrão indica preservação da recuperação de energia, sem evidências de sobrecarga crônica no período avaliado.';
    }

    return 'Os resultados revelam disparidades importantes entre as dimensões, o que reforça que a exaustão raramente é homogênea. A análise individualizada por fonte orienta intervenções muito mais precisas.';
  };

  return (
    <div className="space-y-10 py-6 sm:py-10 max-w-4xl mx-auto">
      {/* Printable Clinical Header */}
      <div className="hidden print:block border-b-2 border-[#2d2d2d] pb-4 mb-6">
        <h1 className="text-2xl font-bold font-serif">Relatório de Triagem - Copenhagen Burnout Inventory (CBI)</h1>
        <p className="text-xs text-gray-600 mt-1">
          Data e hora da aplicação: {result.dateFormatted} · Protocolo: {result.id}
        </p>
        <p className="text-xs text-gray-800 font-semibold mt-1">
          AVISO OBRIGATÓRIO: TRIAGEM NÃO É DIAGNÓSTICO. Os resultados não substituem avaliação médica ou psicológica.
        </p>
      </div>

      {/* Prominent Clinical Disclaimer */}
      <DisclaimerBanner />

      {/* Results Header Card with Reference Style */}
      <div className="bg-[#ffffff] border border-[#efe6dd] rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_rgba(123,123,86,0.06)] space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#6b6b6b]">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#7b7b56]" />
            <span>Triagem realizada em {result.dateFormatted}</span>
          </div>
          <span className="font-mono text-[#9e9e9e]">Protocolo: {result.id}</span>
        </div>

        <div className="space-y-2">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            <span>DIAGNÓSTICO DIMENSIONAL · TRÊS RESULTADOS INDEPENDENTES</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#2d2d2d]">
            Resultado das Três Subescalas CBI
          </h1>
          <p className="text-sm text-[#6b6b6b] leading-relaxed max-w-2xl">
            Conforme as diretrizes psicométricas do instrumento, cada subescala é calculada de <strong>0 a 100 pontos</strong> sem média agregada geral, revelando com clareza onde reside a real sobrecarga.
          </p>
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

      {/* The 3 Independent Dimension Cards Styled as style-card */}
      <div className="space-y-6">
        {/* Dimensão 1: Burnout Pessoal */}
        <div className="style-card space-y-4 print-card">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#7b7b56] uppercase tracking-wider">
                <Heart className="w-4 h-4" />
                <span>Dimensão 1 · 6 itens (1, 7, 12, 16, 18, 19)</span>
              </div>
              <h2 className="font-serif text-2xl font-normal text-[#2d2d2d]">
                Burnout Pessoal
              </h2>
              <p className="text-xs text-[#6b6b6b]">
                Exaustão física e psicológica genérica, vivenciada independente do trabalho.
              </p>
            </div>

            {/* Score Display inspired by summary-rating */}
            <div className="text-right">
              <div className="text-4xl sm:text-5xl font-serif text-[#7b7b56] font-semibold tabular-nums leading-none">
                {pessoal.score}
                <span className="text-base text-[#9e9e9e] font-sans font-normal ml-1">/100</span>
              </div>
              <span className={`inline-block px-3 py-0.5 rounded-full text-xs font-medium border mt-2 ${getIntensityBadge(pessoal.intensity).badgeClass}`}>
                {pessoal.intensityLabel}
              </span>
            </div>
          </div>

          {/* Visual Gauge Bar */}
          <div className="space-y-1.5 pt-2">
            <div className="h-3 w-full bg-[#f6f0eb] rounded-full overflow-hidden flex border border-[#efe6dd]">
              <div
                className={`h-full transition-all duration-700 ease-out ${getIntensityBadge(pessoal.intensity).barColor}`}
                style={{ width: `${Math.min(100, Math.max(0, pessoal.score))}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-[#9e9e9e] font-mono px-0.5">
              <span>0 (Mínimo)</span>
              <span>49 (Limite inferior)</span>
              <span>74 (Moderado)</span>
              <span>100 (Máximo)</span>
            </div>
          </div>

          {/* Description & Clinical Meaning */}
          <div className="crisp-note space-y-1.5 text-xs sm:text-sm">
            <p>
              <strong>Interpretação:</strong> {pessoal.description}
            </p>
            <p className="text-xs text-[#6b6b6b]">
              <strong>Orientação:</strong> {pessoal.recommendation}
            </p>
          </div>
        </div>

        {/* Dimensão 2: Burnout no Trabalho */}
        <div className="style-card space-y-4 print-card">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#c8a08a] uppercase tracking-wider">
                <Briefcase className="w-4 h-4" />
                <span>Dimensão 2 · 7 itens (2 invertido, 5, 6, 8, 14, 15, 17)</span>
              </div>
              <h2 className="font-serif text-2xl font-normal text-[#2d2d2d]">
                Burnout Relacionado ao Trabalho
              </h2>
              <p className="text-xs text-[#6b6b6b]">
                Sinais de esgotamento e frustração atribuídos especificamente às exigências do cargo.
              </p>
            </div>

            {/* Score Display */}
            <div className="text-right">
              <div className="text-4xl sm:text-5xl font-serif text-[#c8a08a] font-semibold tabular-nums leading-none">
                {trabalho.score}
                <span className="text-base text-[#9e9e9e] font-sans font-normal ml-1">/100</span>
              </div>
              <span className={`inline-block px-3 py-0.5 rounded-full text-xs font-medium border mt-2 ${getIntensityBadge(trabalho.intensity).badgeClass}`}>
                {trabalho.intensityLabel}
              </span>
            </div>
          </div>

          {/* Visual Gauge Bar */}
          <div className="space-y-1.5 pt-2">
            <div className="h-3 w-full bg-[#f6f0eb] rounded-full overflow-hidden flex border border-[#efe6dd]">
              <div
                className={`h-full transition-all duration-700 ease-out ${getIntensityBadge(trabalho.intensity).barColor}`}
                style={{ width: `${Math.min(100, Math.max(0, trabalho.score))}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-[#9e9e9e] font-mono px-0.5">
              <span>0 (Mínimo)</span>
              <span>49 (Limite inferior)</span>
              <span>74 (Moderado)</span>
              <span>100 (Máximo)</span>
            </div>
          </div>

          {/* Description & Clinical Meaning */}
          <div className="crisp-note space-y-1.5 text-xs sm:text-sm">
            <p>
              <strong>Interpretação:</strong> {trabalho.description}
            </p>
            <p className="text-xs text-[#6b6b6b]">
              <strong>Orientação:</strong> {trabalho.recommendation}
            </p>
          </div>
        </div>

        {/* Dimensão 3: Burnout com Clientes */}
        {result.clientWorkApplicable ? (
          <div className="style-card space-y-4 print-card">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#7b7b56] uppercase tracking-wider">
                  <Users className="w-4 h-4" />
                  <span>Dimensão 3 · 6 itens (3, 4, 9, 10, 11, 13)</span>
                </div>
                <h2 className="font-serif text-2xl font-normal text-[#2d2d2d]">
                  Burnout Relacionado aos Clientes
                </h2>
                <p className="text-xs text-[#6b6b6b]">
                  Esgotamento emocional decorrente do contato contínuo com clientes, alunos, pacientes ou público.
                </p>
              </div>

              {/* Score Display */}
              <div className="text-right">
                <div className="text-4xl sm:text-5xl font-serif text-[#7b7b56] font-semibold tabular-nums leading-none">
                  {clientes.score}
                  <span className="text-base text-[#9e9e9e] font-sans font-normal ml-1">/100</span>
                </div>
                <span className={`inline-block px-3 py-0.5 rounded-full text-xs font-medium border mt-2 ${getIntensityBadge(clientes.intensity).badgeClass}`}>
                  {clientes.intensityLabel}
                </span>
              </div>
            </div>

            {/* Visual Gauge Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="h-3 w-full bg-[#f6f0eb] rounded-full overflow-hidden flex border border-[#efe6dd]">
                <div
                  className={`h-full transition-all duration-700 ease-out ${getIntensityBadge(clientes.intensity).barColor}`}
                  style={{ width: `${Math.min(100, Math.max(0, clientes.score))}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-[#9e9e9e] font-mono px-0.5">
                <span>0 (Mínimo)</span>
                <span>49 (Limite inferior)</span>
                <span>74 (Moderado)</span>
                <span>100 (Máximo)</span>
              </div>
            </div>

            {/* Description & Clinical Meaning */}
            <div className="crisp-note space-y-1.5 text-xs sm:text-sm">
              <p>
                <strong>Interpretação:</strong> {clientes.description}
              </p>
              <p className="text-xs text-[#6b6b6b]">
                <strong>Orientação:</strong> {clientes.recommendation}
              </p>
            </div>
          </div>
        ) : (
          <div className="crisp-note text-xs text-[#6b6b6b]">
            Dimensão 3 (Clientes): desativada pelo respondente (função sem atendimento direto ao público).
          </div>
        )}
      </div>

      {/* Comparative Analysis & Clinical Context Card */}
      <div className="style-card space-y-4 print-card">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7b7b56]">
          <Info className="w-4 h-4" />
          <span>Leitura Clínica Integrada</span>
        </div>
        <h3 className="font-serif text-2xl font-normal text-[#2d2d2d]">
          O que o padrão das suas dimensões revela
        </h3>
        <p className="text-sm text-[#6b6b6b] leading-relaxed">
          {getComparativeAnalysis()}
        </p>

        <div className="pt-3 border-t border-[#efe6dd] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#6b6b6b]">
          <div className="p-3.5 bg-[#f6f0eb] rounded-xl border border-[#efe6dd]">
            <span className="font-semibold block text-[#2d2d2d] mb-1">0–49: Menor intensidade</span>
            Sinais brandos ou pontuais; manutenção dos fatores protetivos e lazer.
          </div>
          <div className="p-3.5 bg-[#f6f0eb] rounded-xl border border-[#efe6dd]">
            <span className="font-semibold block text-[#2d2d2d] mb-1">50–74: Moderada</span>
            Presença relevante de exaustão; merece atenção e avaliação preventiva.
          </div>
          <div className="p-3.5 bg-[#f6f0eb] rounded-xl border border-[#efe6dd]">
            <span className="font-semibold block text-[#2d2d2d] mb-1">75–100: Elevada</span>
            Frequência expressiva de indicadores; recomendada avaliação clínica especializada.
          </div>
        </div>
      </div>

      {/* Next Steps: Using stage-list from reference CSS */}
      <div className="bg-[#ffffff] border border-[#efe6dd] rounded-3xl p-6 sm:p-8 space-y-6 print-card shadow-[0_4px_20px_rgba(123,123,86,0.06)]">
        <div>
          <span className="hero-eyebrow text-[11px] mb-2">
            ACOLHIMENTO & ORIENTAÇÃO
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#2d2d2d] mt-2">
            Como proceder após esta triagem?
          </h3>
        </div>

        <div className="space-y-4">
          <div className="stage-item">
            <div className="stage-number">01</div>
            <div>
              <h4 className="font-serif text-lg font-medium text-[#2d2d2d] mb-1">
                Compartilhe com um Profissional de Saúde
              </h4>
              <p className="text-xs sm:text-sm text-[#6b6b6b] leading-relaxed">
                Leve este resumo estruturado para o seu psicólogo, psiquiatra ou médico do trabalho. Ter a divisão entre esfera pessoal, trabalho e clientes agiliza a anamnese clínica.
              </p>
            </div>
          </div>

          <div className="stage-item">
            <div className="stage-number">02</div>
            <div>
              <h4 className="font-serif text-lg font-medium text-[#2d2d2d] mb-1">
                Investigue os Estressores do Ambiente
              </h4>
              <p className="text-xs sm:text-sm text-[#6b6b6b] leading-relaxed">
                O burnout é reconhecido pela OMS (CID-11 QD85) como um fenômeno ocupacional decorrente do estresse crônico do ambiente de trabalho, e não uma fraqueza individual.
              </p>
            </div>
          </div>

          <div className="stage-item">
            <div className="stage-number">03</div>
            <div>
              <h4 className="font-serif text-lg font-medium text-[#2d2d2d] mb-1">
                Estabeleça Limites e Proteção Energética
              </h4>
              <p className="text-xs sm:text-sm text-[#6b6b6b] leading-relaxed">
                Repactue metas insustentáveis, negocie redistribuição de tarefas desgastantes e assegure desconexão digital real nos períodos de descanso.
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Resources */}
        <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-[#f6f0eb] rounded-2xl border border-[#efe6dd]">
          <div className="flex items-center gap-3 text-xs text-[#3d3d3d]">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#c8a08a] shrink-0 shadow-2xs">
              <PhoneCall className="w-4 h-4" />
            </div>
            <span>
              <strong>Precisa de acolhimento emocional imediato?</strong> Ligue para o <strong>188 (CVV)</strong> — atendimento gratuito, confidencial 24h em todo o Brasil.
            </span>
          </div>
          <button
            type="button"
            onClick={onOpenEducation}
            className="text-xs text-[#7b7b56] hover:underline whitespace-nowrap font-medium cursor-pointer"
          >
            Saiba mais sobre o método CBI &rarr;
          </button>
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
              Detalhamento das 19 Questões e Respostas Registradas
            </h4>
            <p className="text-xs text-[#9e9e9e]">
              Consulte a resposta dada a cada item e os respectivos pontos (0, 25, 50, 75, 100) atribuídos pelo protocolo CBI.
            </p>
          </div>
          <div className="p-2 text-[#6b6b6b] group-hover:text-[#2d2d2d]">
            {showItemBreakdown ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </button>

        {showItemBreakdown && (
          <div className="pt-4 border-t border-[#efe6dd] overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#efe6dd] text-[#9e9e9e]">
                  <th className="py-2.5 pr-3 font-semibold w-12 font-mono">#</th>
                  <th className="py-2.5 px-3 font-semibold">Pergunta</th>
                  <th className="py-2.5 px-3 font-semibold">Dimensão</th>
                  <th className="py-2.5 px-3 font-semibold">Sua Resposta</th>
                  <th className="py-2.5 pl-3 font-semibold text-right font-mono">Pontos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f6f0eb]">
                {CBI_QUESTIONS.map((q) => {
                  const ans = result.answers[q.id];
                  const points = ans ? getPointsForAnswer(q.id, ans) : '-';
                  const labelMap: Record<string, string> = {
                    sempre: 'Sempre',
                    muitas_vezes: 'Muitas vezes',
                    as_vezes: 'Às vezes',
                    raramente: 'Raramente',
                    nunca: 'Nunca / Quase nunca',
                  };

                  return (
                    <tr key={q.id} className="hover:bg-[#fbf7f4]">
                      <td className="py-2.5 pr-3 font-mono text-[#9e9e9e]">{q.id}</td>
                      <td className="py-2.5 px-3 text-[#2d2d2d] max-w-md">
                        {q.text}
                        {q.isReversed && (
                          <span className="block text-[11px] text-[#c8a08a] italic">
                            (Item com pontuação invertida)
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 capitalize text-[#6b6b6b]">{q.dimension}</td>
                      <td className="py-2.5 px-3 font-medium text-[#2d2d2d]">
                        {ans ? labelMap[ans] : 'Não respondida'}
                      </td>
                      <td className="py-2.5 pl-3 font-mono tabular-nums text-right font-semibold text-[#7b7b56]">
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
