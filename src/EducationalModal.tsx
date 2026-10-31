import React, { useState } from 'react';
import { X, BookOpen, AlertCircle, Scale, Brain, Flame, Activity, Target, HeartPulse, ShieldAlert, LifeBuoy } from 'lucide-react';

export type EducationalTab = 'depressao' | 'asrs' | 'ansiedade' | 'aq50' | 'burnout';

interface EducationalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: EducationalTab;
}

export const EducationalModal: React.FC<EducationalModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'depressao',
}) => {
  const [activeTab, setActiveTab] = useState<EducationalTab>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/45 backdrop-blur-md overflow-y-auto no-print">
      <div className="bg-[#ffffff] border border-[#efe6dd] rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-4 sm:p-8 space-y-5 sm:space-y-6 animate-in fade-in zoom-in-95 duration-200 relative">
        {/* Top Header */}
        <div className="flex items-center justify-between gap-4 border-b border-[#f6f0eb] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#f6f0eb] to-[#ffffff] border border-[#efe6dd] flex items-center justify-center text-[#7b7b56] shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-[#7b7b56] uppercase tracking-wider block">
                Fundamentos Psicométricos & Clínicos
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#2d2d2d]">
                Metodologia dos Instrumentos
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

        {/* 5-Way Tab Switcher */}
        <div className="flex items-center p-1 bg-[#f6f0eb] rounded-full border border-[#efe6dd] w-full overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('depressao')}
            className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-full flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'depressao'
                ? 'bg-white text-[#2d2d2d] shadow-xs font-semibold'
                : 'text-[#6b6b6b] hover:text-[#2d2d2d]'
            }`}
          >
            <HeartPulse className="w-3.5 h-3.5 text-[#c8a08a]" />
            <span>Depressão</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('asrs')}
            className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-full flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'asrs'
                ? 'bg-white text-[#2d2d2d] shadow-xs font-semibold'
                : 'text-[#6b6b6b] hover:text-[#2d2d2d]'
            }`}
          >
            <Target className="w-3.5 h-3.5 text-[#7b7b56]" />
            <span>TDAH</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ansiedade')}
            className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-full flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'ansiedade'
                ? 'bg-white text-[#2d2d2d] shadow-xs font-semibold'
                : 'text-[#6b6b6b] hover:text-[#2d2d2d]'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-[#c8a08a]" />
            <span>Ansiedade</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('aq50')}
            className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-full flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'aq50'
                ? 'bg-white text-[#2d2d2d] shadow-xs font-semibold'
                : 'text-[#6b6b6b] hover:text-[#2d2d2d]'
            }`}
          >
            <Brain className="w-3.5 h-3.5 text-[#7b7b56]" />
            <span>Autismo</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('burnout')}
            className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-full flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'burnout'
                ? 'bg-white text-[#2d2d2d] shadow-xs font-semibold'
                : 'text-[#6b6b6b] hover:text-[#2d2d2d]'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-[#c8a08a]" />
            <span>Burnout</span>
          </button>
        </div>

        {/* --- Tab 0: Depressão (Greenberger & Padesky) --- */}
        {activeTab === 'depressao' && (
          <div className="space-y-6">
            <div className="crisp-note space-y-1">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#c8a08a] shrink-0" />
                <strong className="text-[#2d2d2d]">SISTEMA DE PONTUAÇÃO & ÉTICA CLÍNICA</strong>
              </div>
              <p className="text-xs text-[#6b6b6b] leading-relaxed">
                O questionário possui <strong>19 itens</strong> pontuados de 0 a 3 (escore total de <strong>0 a 57 pontos</strong>). O resultado <strong>não estabelece diagnóstico de depressão</strong> e deve ser interpretado considerando o contexto individual com profissional habilitado.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-serif text-base text-[#2d2d2d]">Faixas de Referência de Sintomas</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#f6f0eb] rounded-xl border border-[#efe6dd]">
                  <strong className="block text-[#2d2d2d]">0 a 12 pontos</strong>
                  <span className="text-[#6b6b6b]">Normal (poucos sintomas indicados)</span>
                </div>
                <div className="p-3 bg-[#f6f0eb] rounded-xl border border-[#efe6dd]">
                  <strong className="block text-[#2d2d2d]">13 a 21 pontos</strong>
                  <span className="text-[#6b6b6b]">Leve (observar interferência na rotina)</span>
                </div>
                <div className="p-3 bg-[#f6f0eb] rounded-xl border border-[#efe6dd]">
                  <strong className="block text-[#2d2d2d]">22 a 38 pontos</strong>
                  <span className="text-[#6b6b6b]">Moderada (avaliação recomendada)</span>
                </div>
                <div className="p-3 bg-[#f6f0eb] rounded-xl border border-[#efe6dd]">
                  <strong className="block text-[#2d2d2d]">39 a 57 pontos</strong>
                  <span className="text-[#6b6b6b]">Grave (alta concentração de sintomas)</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#fcf2f0] border border-[#edd0cc] space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#9f4f46] uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4" />
                <span>Protocolo de Segurança para Itens 10, 11 e 12</span>
              </div>
              <p className="text-xs text-[#4a4a4a] leading-relaxed">
                Qualquer pontuação maior que 0 nos itens relacionados a pensamentos suicidas (Item 10), pensamentos de morte (Item 11) ou plano suicida (Item 12) aciona imediatamente orientações de cuidado e os canais de apoio 24 horas: <strong>CVV (188)</strong> e <strong>SAMU (192)</strong>.
              </p>
            </div>
          </div>
        )}

        {/* --- Tab 1: ASRS-18 (TDAH) --- */}
        {activeTab === 'asrs' && (
          <div className="space-y-6">
            <div className="crisp-note space-y-1">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#7b7b56] shrink-0" />
                <strong className="text-[#2d2d2d]">REGRA DE PONTUAÇÃO DO ASRS-18 (OMS)</strong>
              </div>
              <p className="text-xs text-[#6b6b6b] leading-relaxed">
                Somam-se <strong>exclusivamente os itens de 1 a 6 (Parte A)</strong>, gerando pontuação de 0 a 6. A Parte B (itens 7 a 18) não é somada à Parte A e não possui nota de corte global.
              </p>
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-[#6b6b6b] leading-relaxed">
              <h3 className="font-serif text-lg font-normal text-[#2d2d2d] flex items-center gap-2">
                <Scale className="w-4 h-4 text-[#7b7b56]" />
                <span>Origem e Validação Clínica</span>
              </h3>
              <p>
                A escala ASRS-v1.1 (Adult ADHD Self-Report Scale) foi desenvolvida pela Organização Mundial da Saúde (OMS) em conjunto com pesquisadores da New York University e Harvard Medical School.
              </p>
              <p>
                No Brasil, a escala foi validada pelo Grupo de Estudos do Déficit de Atenção (GEDA/UFRJ - Mattos et al., 2006) e é recomendada pela Associação Brasileira do Déficit de Atenção (ABDA).
              </p>
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm text-[#6b6b6b] leading-relaxed">
              <h3 className="font-serif text-lg font-normal text-[#2d2d2d] flex items-center gap-2">
                <Target className="w-4 h-4 text-[#7b7b56]" />
                <span>Pontos de Corte da Parte A</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs pt-1">
                <div className="p-3 bg-[#edf2eb] text-[#415e3a] rounded-xl border border-[#d1e0ce]">
                  <strong className="block font-mono font-bold text-sm">0 a 3 pontos (Parte A)</strong>
                  <span>Rastreio negativo: sem sinais suficientes para TDAH na triagem.</span>
                </div>
                <div className="p-3 bg-[#fbf3ea] text-[#8e6132] rounded-xl border border-[#edd9c5]">
                  <strong className="block font-mono font-bold text-sm">4 a 6 pontos (Parte A)</strong>
                  <span>Rastreio positivo: com sinais suficientes para TDAH, indicando investigação especializada.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- Tab 2: Ansiedade --- */}
        {activeTab === 'ansiedade' && (
          <div className="space-y-6">
            <div className="crisp-note space-y-1">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#7b7b56] shrink-0" />
                <strong className="text-[#2d2d2d]">RASTREIO E MONITORAMENTO DE SINTOMAS</strong>
              </div>
              <p className="text-xs text-[#6b6b6b] leading-relaxed">
                Este questionário é um recurso de rastreio e monitoramento de sintomas. O resultado não estabelece diagnóstico de transtorno de ansiedade e não substitui avaliação psicológica ou médica.
              </p>
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm text-[#6b6b6b] leading-relaxed">
              <h3 className="font-serif text-lg font-normal text-[#2d2d2d]">Faixas de Pontuação (0 a 72 pontos)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 bg-[#edf2eb] text-[#415e3a] rounded-xl border border-[#d1e0ce]">
                  <strong>0–17 pts:</strong> Poucos indicadores de sintomas ansiosos.
                </div>
                <div className="p-3 bg-[#fbf3ea] text-[#8e6132] rounded-xl border border-[#edd9c5]">
                  <strong>18–35 pts:</strong> Indicadores identificados; observar impacto na rotina.
                </div>
                <div className="p-3 bg-[#faf2e6] text-[#7d5626] rounded-xl border border-[#f0debe]">
                  <strong>36–53 pts:</strong> Concentração maior de sintomas; avaliação recomendada.
                </div>
                <div className="p-3 bg-[#faede9] text-[#933d32] rounded-xl border border-[#f2cfc7]">
                  <strong>54–72 pts:</strong> Alta concentração; recomendada avaliação clínica aprofundada.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- Tab 3: Autismo AQ-50 --- */}
        {activeTab === 'aq50' && (
          <div className="space-y-6">
            <div className="crisp-note space-y-1">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#7b7b56] shrink-0" />
                <strong className="text-[#2d2d2d]">O AQ-50 É INSTRUMENTO DE RASTREIO, NÃO DIAGNÓSTICO</strong>
              </div>
              <p className="text-xs text-[#6b6b6b] leading-relaxed">
                O questionário quantifica traços autorreferidos em um continuum (0 a 50 pontos). Ele não diagnostica TEA e não classifica em "graus de autismo" ou "níveis de suporte".
              </p>
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm text-[#6b6b6b] leading-relaxed">
              <h3 className="font-serif text-lg font-normal text-[#2d2d2d]">Pontos de Corte Científicos</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-3 bg-[#edf2eb] text-[#415e3a] rounded-xl border border-[#d1e0ce]">
                  <strong>0–25 pts:</strong> Abaixo do ponto de corte.
                </div>
                <div className="p-3 bg-[#fbf3ea] text-[#8e6132] rounded-xl border border-[#edd9c5]">
                  <strong>26–31 pts:</strong> Corte de rastreio atingido.
                </div>
                <div className="p-3 bg-[#faede9] text-[#933d32] rounded-xl border border-[#f2cfc7]">
                  <strong>32–50 pts:</strong> Corte clínico clássico.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- Tab 4: Burnout CBI --- */}
        {activeTab === 'burnout' && (
          <div className="space-y-6">
            <div className="crisp-note space-y-1">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#7b7b56] shrink-0" />
                <strong className="text-[#2d2d2d]">O CBI NÃO UTILIZA MÉDIA GERAL</strong>
              </div>
              <p className="text-xs text-[#6b6b6b] leading-relaxed">
                O Copenhagen Burnout Inventory foi desenhado para medir separadamente a exaustão física/pessoal, o desgaste no trabalho e a sobrecarga com clientes, evitando que médias agregadas escondam a verdadeira origem da dor.
              </p>
            </div>
          </div>
        )}

        {/* Bottom Close Button */}
        <div className="pt-2 border-t border-[#f6f0eb] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-primary text-xs py-2 px-5 cursor-pointer"
          >
            Entendido, fechar
          </button>
        </div>
      </div>
    </div>
  );
};
