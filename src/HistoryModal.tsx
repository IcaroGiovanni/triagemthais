import React, { useState } from 'react';
import { ScreeningResult } from './cbi';
import { AQResult } from './aq';
import { AnxietyResult } from './anxiety';
import { ASRSResult } from './asrs';
import { DepressionResult } from './depression';
import { X, History, Trash2, ArrowUpRight, Calendar, AlertCircle, Brain, Flame, Activity, Target, HeartPulse, ShieldAlert } from 'lucide-react';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  depressionHistory: DepressionResult[];
  asrsHistory: ASRSResult[];
  anxietyHistory: AnxietyResult[];
  aqHistory: AQResult[];
  cbiHistory: ScreeningResult[];
  onSelectDepressionResult: (result: DepressionResult) => void;
  onSelectASRSResult: (result: ASRSResult) => void;
  onSelectAnxietyResult: (result: AnxietyResult) => void;
  onSelectAQResult: (result: AQResult) => void;
  onSelectCBIResult: (result: ScreeningResult) => void;
  onDeleteDepressionResult: (id: string) => void;
  onDeleteASRSResult: (id: string) => void;
  onDeleteAnxietyResult: (id: string) => void;
  onDeleteAQResult: (id: string) => void;
  onDeleteCBIResult: (id: string) => void;
  onClearHistory: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  depressionHistory = [],
  asrsHistory = [],
  anxietyHistory,
  aqHistory,
  cbiHistory,
  onSelectDepressionResult,
  onSelectASRSResult,
  onSelectAnxietyResult,
  onSelectAQResult,
  onSelectCBIResult,
  onDeleteDepressionResult,
  onDeleteASRSResult,
  onDeleteAnxietyResult,
  onDeleteAQResult,
  onDeleteCBIResult,
  onClearHistory,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'depressao' | 'asrs' | 'ansiedade' | 'aq' | 'cbi'>('all');

  if (!isOpen) return null;

  const totalCount =
    (depressionHistory?.length || 0) +
    (asrsHistory?.length || 0) +
    anxietyHistory.length +
    aqHistory.length +
    cbiHistory.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/45 backdrop-blur-md overflow-y-auto no-print">
      <div className="bg-[#ffffff] border border-[#efe6dd] rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-4 sm:p-8 space-y-5 sm:space-y-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="flex items-center justify-between gap-4 border-b border-[#f6f0eb] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#f6f0eb] to-[#ffffff] border border-[#efe6dd] flex items-center justify-center text-[#c8a08a] shadow-xs">
              <History className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-[#c8a08a] uppercase tracking-wider block">
                Histórico Clínico Local
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#2d2d2d]">
                Aplicações Salvas ({totalCount})
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#f6f0eb] hover:bg-[#efe6dd] text-[#6b6b6b] hover:text-[#2d2d2d] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center p-1 bg-[#f6f0eb] rounded-full border border-[#efe6dd] overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'all' ? 'bg-white text-[#2d2d2d] shadow-2xs font-semibold' : 'text-[#6b6b6b]'
              }`}
            >
              Todos ({totalCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('depressao')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'depressao' ? 'bg-white text-[#2d2d2d] shadow-2xs font-semibold' : 'text-[#6b6b6b]'
              }`}
            >
              Depressão ({depressionHistory?.length || 0})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('asrs')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'asrs' ? 'bg-white text-[#2d2d2d] shadow-2xs font-semibold' : 'text-[#6b6b6b]'
              }`}
            >
              TDAH ASRS ({asrsHistory?.length || 0})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('ansiedade')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'ansiedade' ? 'bg-white text-[#2d2d2d] shadow-2xs font-semibold' : 'text-[#6b6b6b]'
              }`}
            >
              Ansiedade ({anxietyHistory.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('aq')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'aq' ? 'bg-white text-[#2d2d2d] shadow-2xs font-semibold' : 'text-[#6b6b6b]'
              }`}
            >
              Autismo AQ-50 ({aqHistory.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('cbi')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'cbi' ? 'bg-white text-[#2d2d2d] shadow-2xs font-semibold' : 'text-[#6b6b6b]'
              }`}
            >
              Burnout CBI ({cbiHistory.length})
            </button>
          </div>

          {totalCount > 0 && (
            <button
              type="button"
              onClick={onClearHistory}
              className="text-[#9f4f46] hover:underline cursor-pointer whitespace-nowrap shrink-0"
            >
              Limpar tudo
            </button>
          )}
        </div>

        {totalCount === 0 ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-[#f6f0eb] text-[#9e9e9e] flex items-center justify-center mx-auto border border-[#efe6dd]">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif text-lg text-[#2d2d2d]">Nenhuma triagem salva ainda</h4>
              <p className="text-xs text-[#6b6b6b] max-w-sm mx-auto leading-relaxed">
                Ao concluir qualquer questionário (Depressão, TDAH ASRS-18, Ansiedade, AQ-50 ou CBI), clique em "Salvar no Histórico" para acompanhar a evolução das suas respostas.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Depression Entries */}
            {(activeTab === 'all' || activeTab === 'depressao') &&
              depressionHistory?.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    item.safety.hasSafetyRisk
                      ? 'bg-[#fcf2f0] border-[#edd0cc] hover:border-[#9f4f46]'
                      : 'bg-[#fbf7f4] border-[#efe6dd] hover:border-[#c8a08a]'
                  }`}
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 text-xs flex-wrap">
                      <span className="px-2 py-0.5 rounded-full bg-[#f6f0eb] text-[#c8a08a] font-semibold border border-[#efe6dd] flex items-center gap-1">
                        <HeartPulse className="w-3 h-3" />
                        Depressão (Padesky)
                      </span>
                      <span className="text-[#9e9e9e] font-mono">{item.dateFormatted}</span>
                      {item.safety.hasSafetyRisk && (
                        <span className="text-[10px] text-[#9f4f46] bg-white px-2 py-0.5 rounded-full border border-[#edd0cc] flex items-center gap-1 font-semibold">
                          <ShieldAlert className="w-3 h-3" />
                          Atenção clínica
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs pt-1">
                      <span className="font-serif text-lg font-bold text-[#2d2d2d] leading-none">
                        Escore: {item.totalScore} <span className="text-xs font-normal text-[#9e9e9e]">/ 57 pts</span>
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-md font-semibold ${
                        item.severityBand === 'grave'
                          ? 'bg-[#9f4f46]/20 text-[#9f4f46]'
                          : item.severityBand === 'moderada'
                          ? 'bg-[#c8a08a]/20 text-[#8c4f36]'
                          : item.severityBand === 'leve'
                          ? 'bg-[#efe6dd] text-[#6b5042]'
                          : 'bg-[#7b7b56]/20 text-[#4a4a2f]'
                      }`}>
                        {item.statusBadge}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectDepressionResult(item);
                        onClose();
                      }}
                      className="btn btn-secondary text-xs py-1.5 px-3.5 cursor-pointer"
                    >
                      <span>Ver Resultados</span>
                      <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteDepressionResult(item.id)}
                      className="p-2 text-[#9e9e9e] hover:text-[#9f4f46] hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                      title="Excluir este registro"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            {/* ASRS TDAH Entries */}
            {(activeTab === 'all' || activeTab === 'asrs') &&
              asrsHistory?.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-[#fbf7f4] border border-[#efe6dd] rounded-2xl hover:border-[#7b7b56] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2 py-0.5 rounded-full bg-[#f6f0eb] text-[#7b7b56] font-semibold border border-[#efe6dd] flex items-center gap-1">
                        <Target className="w-3 h-3" />
                        TDAH (ASRS-18)
                      </span>
                      <span className="text-[#9e9e9e] font-mono">{item.dateFormatted}</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs pt-1">
                      <span className="font-serif text-lg font-bold text-[#2d2d2d] leading-none">
                        Parte A: {item.partAScore} <span className="text-xs font-normal text-[#9e9e9e]">/ 6 pts</span>
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-md font-semibold ${
                        item.classification === 'positivo'
                          ? 'bg-[#c8a08a]/20 text-[#8c4f36]'
                          : 'bg-[#7b7b56]/20 text-[#4a4a2f]'
                      }`}>
                        {item.statusBadge}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectASRSResult(item);
                        onClose();
                      }}
                      className="btn btn-secondary text-xs py-1.5 px-3.5 cursor-pointer"
                    >
                      <span>Ver Resultados</span>
                      <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteASRSResult(item.id)}
                      className="p-2 text-[#9e9e9e] hover:text-[#9f4f46] hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                      title="Excluir este registro"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            {/* Anxiety Entries */}
            {(activeTab === 'all' || activeTab === 'ansiedade') &&
              anxietyHistory.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-[#fbf7f4] border border-[#efe6dd] rounded-2xl hover:border-[#c8a08a] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2 py-0.5 rounded-full bg-[#f6f0eb] text-[#c8a08a] font-semibold border border-[#efe6dd] flex items-center gap-1">
                        <Activity className="w-3 h-3" />
                        Ansiedade (Padesky)
                      </span>
                      <span className="text-[#9e9e9e] font-mono">{item.dateFormatted}</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs pt-1">
                      <span className="font-serif text-lg font-bold text-[#2d2d2d] leading-none">
                        {item.totalScore} <span className="text-xs font-normal text-[#9e9e9e]">/ 72 pts</span>
                      </span>
                      <span className="text-xs text-[#6b6b6b]">
                        {item.statusBadge}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectAnxietyResult(item);
                        onClose();
                      }}
                      className="btn btn-secondary text-xs py-1.5 px-3.5 cursor-pointer"
                    >
                      <span>Ver Resultados</span>
                      <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteAnxietyResult(item.id)}
                      className="p-2 text-[#9e9e9e] hover:text-[#9f4f46] hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                      title="Excluir este registro"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

            {/* AQ-50 Entries */}
            {(activeTab === 'all' || activeTab === 'aq') &&
              aqHistory.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-[#fbf7f4] border border-[#efe6dd] rounded-2xl hover:border-[#7b7b56] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2 py-0.5 rounded-full bg-[#f6f0eb] text-[#7b7b56] font-semibold border border-[#efe6dd] flex items-center gap-1">
                        <Brain className="w-3 h-3" />
                        Autismo AQ-50
                      </span>
                      <span className="text-[#9e9e9e] font-mono">{item.dateFormatted}</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs pt-1">
                      <span className="font-serif text-lg font-bold text-[#2d2d2d] leading-none">
                        {item.totalScore} <span className="text-xs font-normal text-[#9e9e9e]">/ 50 pts</span>
                      </span>
                      <span className="text-xs text-[#6b6b6b]">
                        {item.statusBadge}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectAQResult(item);
                        onClose();
                      }}
                      className="btn btn-secondary text-xs py-1.5 px-3.5 cursor-pointer"
                    >
                      <span>Ver Resultados</span>
                      <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteAQResult(item.id)}
                      className="p-2 text-[#9e9e9e] hover:text-[#9f4f46] hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                      title="Excluir este registro"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

            {/* CBI Burnout Entries */}
            {(activeTab === 'all' || activeTab === 'cbi') &&
              cbiHistory.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-[#fbf7f4] border border-[#efe6dd] rounded-2xl hover:border-[#c8a08a] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2 py-0.5 rounded-full bg-[#f6f0eb] text-[#c8a08a] font-semibold border border-[#efe6dd] flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        Burnout CBI
                      </span>
                      <span className="text-[#9e9e9e] font-mono">{item.dateFormatted}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono pt-1">
                      <span>Pessoal: <strong className="text-[#2d2d2d]">{item.dimensions.pessoal.score}</strong></span>
                      <span className="text-[#dfd4c8]">·</span>
                      <span>Trabalho: <strong className="text-[#2d2d2d]">{item.dimensions.trabalho.score}</strong></span>
                      <span className="text-[#dfd4c8]">·</span>
                      <span>Clientes: <strong className="text-[#2d2d2d]">{item.clientWorkApplicable ? item.dimensions.clientes.score : 'N/A'}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectCBIResult(item);
                        onClose();
                      }}
                      className="btn btn-secondary text-xs py-1.5 px-3.5 cursor-pointer"
                    >
                      <span>Ver Resultados</span>
                      <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteCBIResult(item.id)}
                      className="p-2 text-[#9e9e9e] hover:text-[#9f4f46] hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                      title="Excluir este registro"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Footer Note */}
        <div className="pt-2 border-t border-[#f6f0eb] text-[11px] text-[#9e9e9e] flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-[#c8a08a]" />
          <span>Os dados do histórico ficam armazenados estritamente na memória local do seu navegador (localStorage).</span>
        </div>
      </div>
    </div>
  );
};
