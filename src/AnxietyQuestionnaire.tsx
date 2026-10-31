import React, { useState, useEffect } from 'react';
import { AnxietyQuestion, AnxietyResponseValue } from './anxiety';
import { AnxietyQuestionCard } from './AnxietyQuestionCard';
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
} from 'lucide-react';

interface AnxietyQuestionnaireProps {
  questions: AnxietyQuestion[];
  answers: Record<number, AnxietyResponseValue>;
  onAnswer: (questionId: number, value: AnxietyResponseValue) => void;
  onFinish: () => void;
  onReset: () => void;
  onApplyExample: (preset: 'low12' | 'moderate26' | 'higher44' | 'high60') => void;
}

export const AnxietyQuestionnaire: React.FC<AnxietyQuestionnaireProps> = ({
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
      const keyMap: Record<string, AnxietyResponseValue> = {
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
        setCurrentIndex((prev) => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        e.preventDefault();
        setCurrentIndex((prev) => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, currentQuestion, total, viewMode]);

  const handleSelectAnswer = (questionId: number, val: AnxietyResponseValue) => {
    onAnswer(questionId, val);
    if (viewMode === 'stepper' && autoAdvance && currentIndex < total - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => Math.min(prev + 1, total - 1));
      }, 150);
    }
  };

  return (
    <div className="space-y-8 py-6 sm:py-8">
      {/* Top Disclaimer in compact format */}
      <DisclaimerBanner compact />

      {/* Progress & Controls Bar */}
      <div className="bg-[#ffffff] border border-[#efe6dd] rounded-2xl p-5 sm:p-6 shadow-[0_4px_16px_rgba(123,123,86,0.04)] space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-[#6b6b6b]">
              <span className="font-semibold text-[#2d2d2d]">
                Progresso: {answeredCount} de {total} respondidas
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums text-[#7b7b56] font-bold">{progressPercent}%</span>
            </div>
            {/* Progress line */}
            <div className="w-52 sm:w-72 h-2.5 bg-[#f6f0eb] rounded-full overflow-hidden p-0.5 border border-[#efe6dd]">
              <div
                className="h-full bg-gradient-to-r from-[#7b7b56] to-[#c8a08a] rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* View Mode & Helper toggles */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Stepper vs List switch */}
            <div className="flex items-center p-1 bg-[#f6f0eb] rounded-full border border-[#efe6dd]">
              <button
                type="button"
                onClick={() => setViewMode('stepper')}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'stepper'
                    ? 'bg-white text-[#2d2d2d] shadow-sm font-semibold'
                    : 'text-[#6b6b6b] hover:text-[#2d2d2d]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Passo a passo</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('continuous')}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'continuous'
                    ? 'bg-white text-[#2d2d2d] shadow-sm font-semibold'
                    : 'text-[#6b6b6b] hover:text-[#2d2d2d]'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Lista completa (24)</span>
              </button>
            </div>

            {/* Points toggle */}
            <button
              type="button"
              onClick={() => setShowPoints(!showPoints)}
              title="Exibir pontuação (0 a 3) de cada alternativa"
              className={`px-3.5 py-1.5 text-xs font-medium rounded-full border transition-all flex items-center gap-1.5 cursor-pointer ${
                showPoints
                  ? 'bg-[#7b7b56]/10 text-[#7b7b56] border-[#7b7b56]/30'
                  : 'bg-white text-[#6b6b6b] border-[#efe6dd] hover:bg-[#f6f0eb]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showPoints ? 'Ocultar pontos' : 'Ver pontos (0–3)'}</span>
            </button>
          </div>
        </div>

        {/* Matrix of Question Numbers */}
        <div className="pt-3 border-t border-[#f6f0eb]">
          <div className="flex items-center justify-between text-xs text-[#9e9e9e] mb-2.5">
            <span>Mapa de navegação direta (24 manifestações):</span>
            {viewMode === 'stepper' && (
              <label className="flex items-center gap-1.5 cursor-pointer text-[#6b6b6b] select-none text-xs">
                <input
                  type="checkbox"
                  checked={autoAdvance}
                  onChange={(e) => setAutoAdvance(e.target.checked)}
                  className="rounded text-[#7b7b56] focus:ring-[#7b7b56]"
                />
                <span>Avançar automaticamente ao responder</span>
              </label>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {questions.map((q, idx) => {
              const isAns = answers[q.id] !== undefined;
              const isCurr = viewMode === 'stepper' && idx === currentIndex;

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => {
                    setCurrentIndex(idx);
                    if (viewMode === 'continuous') {
                      const el = document.getElementById(`ans-question-card-${q.id}`);
                      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl text-xs font-mono font-medium transition-all flex items-center justify-center cursor-pointer ${
                    isCurr
                      ? 'ring-2 ring-[#7b7b56] ring-offset-1 bg-[#7b7b56] text-white font-bold shadow-xs'
                      : isAns
                      ? 'bg-[#efe6dd] text-[#5f5f40] border border-[#dfd4c8]'
                      : 'bg-white text-[#9e9e9e] border border-[#efe6dd] hover:border-[#7b7b56]'
                  }`}
                  title={`Manifestação ${idx + 1}: ${q.text}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Preset Example Clinical Profiles */}
      <div className="bg-[#f6f0eb]/70 border border-[#efe6dd] rounded-2xl px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="text-[#6b6b6b] flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#c8a08a]" />
          <span>Exemplos para testes rápidos das faixas do inventário:</span>
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onApplyExample('low12')}
            className="px-3 py-1.5 bg-white hover:bg-[#f6f0eb] text-[#2d2d2d] border border-[#efe6dd] rounded-full text-xs font-medium transition-all cursor-pointer shadow-2xs"
          >
            Faixa 0–17 (12 pts)
          </button>
          <button
            type="button"
            onClick={() => onApplyExample('moderate26')}
            className="px-3 py-1.5 bg-white hover:bg-[#f6f0eb] text-[#2d2d2d] border border-[#efe6dd] rounded-full text-xs font-medium transition-all cursor-pointer shadow-2xs"
          >
            Faixa 18–35 (26 pts)
          </button>
          <button
            type="button"
            onClick={() => onApplyExample('higher44')}
            className="px-3 py-1.5 bg-white hover:bg-[#f6f0eb] text-[#2d2d2d] border border-[#efe6dd] rounded-full text-xs font-medium transition-all cursor-pointer shadow-2xs"
          >
            Faixa 36–53 (44 pts)
          </button>
          <button
            type="button"
            onClick={() => onApplyExample('high60')}
            className="px-3 py-1.5 bg-white hover:bg-[#f6f0eb] text-[#2d2d2d] border border-[#efe6dd] rounded-full text-xs font-medium transition-all cursor-pointer shadow-2xs"
          >
            Faixa 54–72 (60 pts)
          </button>
          {answeredCount > 0 && (
            <button
              type="button"
              onClick={onReset}
              className="px-2.5 py-1 text-[#c8a08a] hover:text-[#5f5f40] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Limpar</span>
            </button>
          )}
        </div>
      </div>

      {/* Questions Render */}
      {viewMode === 'stepper' ? (
        <div className="space-y-6">
          <AnxietyQuestionCard
            question={currentQuestion}
            index={currentIndex}
            total={total}
            currentAnswer={answers[currentQuestion.id]}
            onSelectAnswer={(val) => handleSelectAnswer(currentQuestion.id, val)}
            showPoints={showPoints}
          />

          {/* Stepper Navigation */}
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className={`btn btn-secondary ${currentIndex === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <span className="text-xs text-[#9e9e9e] font-mono hidden sm:inline">
              Use as teclas 1 a 4 ou clique
            </span>

            {currentIndex < total - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentIndex((prev) => Math.min(total - 1, prev + 1))}
                className="btn btn-secondary"
              >
                <span>Próxima</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onFinish}
                disabled={!isComplete}
                className={`btn btn-primary ${!isComplete ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Finalizar e Ver Resultados</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {questions.map((q, idx) => (
            <div key={q.id} id={`ans-question-card-${q.id}`}>
              <AnxietyQuestionCard
                question={q}
                index={idx}
                total={total}
                currentAnswer={answers[q.id]}
                onSelectAnswer={(val) => onAnswer(q.id, val)}
                showPoints={showPoints}
              />
            </div>
          ))}

          {/* Bottom Action in continuous mode */}
          <div className="bg-[#ffffff] border border-[#efe6dd] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-4 shadow-lg">
            <div>
              <p className="font-medium text-sm text-[#2d2d2d]">
                {answeredCount === total
                  ? 'Todas as 24 manifestações foram preenchidas!'
                  : `Faltam ${total - answeredCount} questões a responder.`}
              </p>
              <p className="text-xs text-[#9e9e9e]">
                O instrumento calculará o escore total (0 a 72) e a distribuição dos sintomas.
              </p>
            </div>
            <button
              type="button"
              onClick={onFinish}
              disabled={!isComplete}
              className={`btn btn-primary ${!isComplete ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isComplete ? 'Calcular Resultado de Ansiedade' : `Preencha todas (${answeredCount}/${total})`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
