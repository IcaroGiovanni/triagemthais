import React, { useState, useEffect } from 'react';
import { DepressionQuestion, DepressionResponseValue } from './depression';
import { DepressionQuestionCard } from './DepressionQuestionCard';
import { DisclaimerBanner } from './DisclaimerBanner';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  RotateCcw,
  List,
  Layers,
  Eye,
  CheckCircle2,
  ShieldAlert,
} from 'lucide-react';

interface DepressionQuestionnaireProps {
  questions: DepressionQuestion[];
  answers: Record<number, DepressionResponseValue>;
  onAnswer: (questionId: number, value: DepressionResponseValue) => void;
  onFinish: () => void;
  onReset: () => void;
  onApplyExample: (preset: 'normal6' | 'mild16' | 'moderate28' | 'severe46' | 'safetyThoughts' | 'safetyPlan') => void;
}

export const DepressionQuestionnaire: React.FC<DepressionQuestionnaireProps> = ({
  questions,
  answers,
  onAnswer,
  onFinish,
  onReset,
  onApplyExample,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'stepper' | 'continuous'>('stepper');
  const [showPoints, setShowPoints] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(true);

  const total = questions.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / total) * 100);
  const isComplete = answeredCount === total;

  const currentQuestion = questions[currentIndex] || questions[0];

  useEffect(() => {
    if (viewMode !== 'stepper') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const keyMap: Record<string, DepressionResponseValue> = {
        '1': 'nem_um_pouco',
        '2': 'as_vezes',
        '3': 'frequentemente',
        '4': 'a_maior_parte',
      };

      if (keyMap[e.key]) {
        e.preventDefault();
        handleSelectAnswer(currentQuestion.id, keyMap[e.key]);
      } else if (e.key === 'ArrowRight' && currentIndex < total - 1) {
        e.preventDefault();
        setCurrentIndex((prev) => Math.min(total - 1, prev + 1));
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        e.preventDefault();
        setCurrentIndex((prev) => Math.max(0, prev - 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, viewMode, currentQuestion, total]);

  const handleSelectAnswer = (questionId: number, value: DepressionResponseValue) => {
    onAnswer(questionId, value);
    if (viewMode === 'stepper' && autoAdvance && currentIndex < total - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => Math.min(total - 1, prev + 1));
      }, 260);
    }
  };

  return (
    <div className="space-y-8 py-6">
      {/* Top Disclaimer Banner */}
      <DisclaimerBanner />

      {/* Progress & Controls Bar */}
      <div className="bg-[#ffffff] border border-[#efe6dd] rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-[11px] font-semibold text-[#7b7b56] uppercase tracking-wider block">
              Triagem de Sintomas Depressivos · Greenberger & Padesky
            </span>
            <span className="text-[#2d2d2d] font-serif text-base sm:text-lg">
              {answeredCount} de {total} itens respondidos ({progressPercent}%)
            </span>
          </div>

          {/* Quick preset helpers */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-[#9e9e9e] font-medium hidden md:inline">Simular:</span>
            <button
              type="button"
              onClick={() => onApplyExample('normal6')}
              className="px-2.5 py-1 text-[11px] rounded-full bg-[#f6f0eb] hover:bg-[#efe6dd] text-[#6b6b6b] hover:text-[#2d2d2d] transition-colors cursor-pointer border border-[#efe6dd]"
              title="Preenche simulação de escore normal (poucos sintomas)"
            >
              Normal (6 pts)
            </button>
            <button
              type="button"
              onClick={() => onApplyExample('moderate28')}
              className="px-2.5 py-1 text-[11px] rounded-full bg-[#f6f0eb] hover:bg-[#efe6dd] text-[#6b6b6b] hover:text-[#2d2d2d] transition-colors cursor-pointer border border-[#efe6dd]"
              title="Preenche simulação moderada"
            >
              Moderada (28 pts)
            </button>
            <button
              type="button"
              onClick={() => onApplyExample('safetyThoughts')}
              className="px-2.5 py-1 text-[11px] rounded-full bg-[#fbf2f0] hover:bg-[#edd7d4] text-[#9f4f46] transition-colors cursor-pointer border border-[#edd7d4] flex items-center gap-1"
              title="Preenche teste com Item 10 positivo (pensamentos suicidas)"
            >
              <ShieldAlert className="w-3 h-3" />
              <span>Teste: Item 10</span>
            </button>
            <button
              type="button"
              onClick={() => onApplyExample('safetyPlan')}
              className="px-2.5 py-1 text-[11px] rounded-full bg-[#fbf2f0] hover:bg-[#edd7d4] text-[#9f4f46] font-semibold transition-colors cursor-pointer border border-[#edd7d4] flex items-center gap-1"
              title="Preenche teste com Item 12 positivo (plano suicida)"
            >
              <ShieldAlert className="w-3 h-3" />
              <span>Teste: Item 12 (Plano)</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#f6f0eb] rounded-full h-2.5 overflow-hidden border border-[#efe6dd]">
          <div
            className="h-full bg-gradient-to-r from-[#7b7b56] to-[#c8a08a] transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* View Switchers & Options */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs text-[#6b6b6b] border-t border-[#f6f0eb]">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setViewMode('stepper')}
              className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'stepper'
                  ? 'bg-[#7b7b56] text-white font-semibold'
                  : 'bg-[#f6f0eb] hover:bg-[#efe6dd] text-[#6b6b6b]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Passo a Passo</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('continuous')}
              className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'continuous'
                  ? 'bg-[#7b7b56] text-white font-semibold'
                  : 'bg-[#f6f0eb] hover:bg-[#efe6dd] text-[#6b6b6b]'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Lista Contínua</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowPoints(!showPoints)}
              className={`px-2.5 py-1 rounded-full flex items-center gap-1 transition-colors cursor-pointer ${
                showPoints ? 'bg-[#efe6dd] text-[#2d2d2d] font-medium' : 'text-[#9e9e9e] hover:text-[#2d2d2d]'
              }`}
              title="Exibir pontuação numérica (0 a 3) em cada botão de resposta"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showPoints ? 'Ocultar pontos' : 'Ver pontos (0–3)'}</span>
            </button>

            {viewMode === 'stepper' && (
              <label className="flex items-center gap-1.5 cursor-pointer text-xs select-none">
                <input
                  type="checkbox"
                  checked={autoAdvance}
                  onChange={(e) => setAutoAdvance(e.target.checked)}
                  className="rounded border-[#dfd4c8] text-[#7b7b56] focus:ring-[#7b7b56]"
                />
                <span className="text-[#9e9e9e]">Avançar auto</span>
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Jump Matrix Grid */}
      <div className="bg-[#ffffff] border border-[#efe6dd] rounded-2xl p-4 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-xs text-[#6b6b6b]">
          <span className="font-medium text-[#2d2d2d]">Matriz de Navegação (19 itens):</span>
          <span className="text-[11px] text-[#9e9e9e]">Clique em qualquer número para ir direto ao item</span>
        </div>
        <div className="grid grid-cols-10 sm:grid-cols-19 gap-1.5 pt-1">
          {questions.map((q, idx) => {
            const isAnswered = answers[q.id] !== undefined;
            const isCurrent = viewMode === 'stepper' && idx === currentIndex;
            const isSafetyItem = q.isSafetyCritical;

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => {
                  setCurrentIndex(idx);
                  if (viewMode === 'continuous') {
                    const el = document.getElementById(`dep-q-${q.id}`);
                    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
                className={`h-8 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer relative flex items-center justify-center ${
                  isCurrent
                    ? 'ring-2 ring-[#7b7b56] ring-offset-1 bg-[#7b7b56] text-white shadow-xs'
                    : isAnswered
                    ? 'bg-[#efe6dd] text-[#2d2d2d] font-semibold hover:bg-[#e4d6c7]'
                    : isSafetyItem
                    ? 'bg-[#fbf2f0] text-[#9f4f46] border border-[#edd7d4] hover:bg-[#f6e1dd]'
                    : 'bg-[#f6f0eb] text-[#9e9e9e] hover:bg-[#efe6dd]'
                }`}
                title={`Item ${q.id}: ${q.text} ${isAnswered ? '(Respondido)' : '(Pendente)'}`}
              >
                {q.id}
                {isSafetyItem && !isAnswered && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9f4f46] absolute -top-0.5 -right-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Questionnaire Body */}
      {viewMode === 'stepper' ? (
        <div className="space-y-6">
          <DepressionQuestionCard
            question={currentQuestion}
            index={currentIndex}
            total={total}
            selectedValue={answers[currentQuestion.id]}
            onSelect={(val) => handleSelectAnswer(currentQuestion.id, val)}
            showPointsPreview={showPoints}
          />

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className={`btn btn-secondary text-xs py-2.5 px-4 flex items-center gap-1.5 ${
                currentIndex === 0 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <span className="text-xs text-[#9e9e9e] hidden sm:inline">
              Dica: use as teclas <strong>1</strong> a <strong>4</strong> para responder rapidamente
            </span>

            {currentIndex < total - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentIndex((prev) => Math.min(total - 1, prev + 1))}
                className="btn btn-secondary text-xs py-2.5 px-4 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Próxima</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onFinish}
                disabled={!isComplete}
                className={`btn text-xs py-2.5 px-5 flex items-center gap-2 ${
                  isComplete
                    ? 'btn-primary cursor-pointer'
                    : 'bg-[#efe6dd] text-[#9e9e9e] cursor-not-allowed shadow-none'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Concluir e Ver Escore</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Continuous Mode */
        <div className="space-y-6">
          {questions.map((q, idx) => (
            <div key={q.id} id={`dep-q-${q.id}`}>
              <DepressionQuestionCard
                question={q}
                index={idx}
                total={total}
                selectedValue={answers[q.id]}
                onSelect={(val) => onAnswer(q.id, val)}
                showPointsPreview={showPoints}
              />
            </div>
          ))}

          {/* Bottom Action in Continuous Mode */}
          <div className="p-6 rounded-3xl bg-[#ffffff] border border-[#efe6dd] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-serif text-lg text-[#2d2d2d]">Finalização da Triagem</h4>
              <p className="text-xs text-[#6b6b6b]">
                {isComplete
                  ? 'Todos os 19 itens foram preenchidos. Você já pode visualizar o escore.'
                  : `Faltam ${total - answeredCount} itens para completar a triagem.`}
              </p>
            </div>

            <button
              type="button"
              onClick={onFinish}
              disabled={!isComplete}
              className={`btn text-xs py-3 px-6 flex items-center gap-2 ${
                isComplete
                  ? 'btn-primary cursor-pointer'
                  : 'bg-[#efe6dd] text-[#9e9e9e] cursor-not-allowed shadow-none'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Concluir e Ver Escore ({answeredCount}/{total})</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
