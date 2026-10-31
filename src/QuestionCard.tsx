import React from 'react';
import { CBIQuestion, ResponseValue } from './cbi';
import { RESPONSE_OPTIONS } from './cbiQuestions';
import { Check, Info } from 'lucide-react';

interface QuestionCardProps {
  question: CBIQuestion;
  index: number;
  total: number;
  currentAnswer?: ResponseValue;
  onSelectAnswer: (value: ResponseValue) => void;
  showPoints?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  index,
  total,
  currentAnswer,
  onSelectAnswer,
  showPoints = false,
}) => {
  const getDimensionBadge = (dim: CBIQuestion['dimension']) => {
    switch (dim) {
      case 'pessoal':
        return {
          label: 'Burnout Pessoal',
          bg: 'bg-[#f6f0eb] text-[#5f5f40] border-[#efe6dd]',
        };
      case 'trabalho':
        return {
          label: 'Burnout no Trabalho',
          bg: 'bg-[#fbf7f4] text-[#c8a08a] border-[#efe6dd]',
        };
      case 'clientes':
        return {
          label: 'Burnout com Clientes',
          bg: 'bg-[#f6f0eb] text-[#7b7b56] border-[#efe6dd]',
        };
    }
  };

  const badge = getDimensionBadge(question.dimension);

  return (
    <div className="style-card space-y-6">
      {/* Top Metadata */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-[#6b6b6b]">
          <span className="font-semibold text-[#2d2d2d]">Questão {index + 1} de {total}</span>
          <span aria-hidden="true">·</span>
          <span>Item #{question.id} do CBI</span>
        </div>

        <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${badge.bg}`}>
          {badge.label}
        </div>
      </div>

      {/* Question Text */}
      <div className="space-y-3">
        <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#2d2d2d] leading-snug text-balance">
          {question.text}
        </h3>

        {question.isReversed && (
          <div className="crisp-note">
            <div className="flex items-start gap-2.5">
              <Info className="w-4 h-4 shrink-0 text-[#7b7b56] mt-0.5" />
              <span>
                <strong>Item de pontuação invertida:</strong> responder "Sempre" aqui significa ter energia preservada para família e amigos, portanto pontua 0 para esgotamento.
              </span>
            </div>
          </div>
        )}

        {question.note && !question.isReversed && (
          <p className="text-xs text-[#6b6b6b] italic">{question.note}</p>
        )}
      </div>

      {/* Answer Options styled with refined pill-cards */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
        {RESPONSE_OPTIONS.map((opt, optIdx) => {
          const isSelected = currentAnswer === opt.value;
          const points = question.isReversed ? opt.reversedPoints : opt.standardPoints;

          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSelectAnswer(opt.value)}
              className={`min-h-[64px] px-3 py-3 rounded-2xl border text-left sm:text-center transition-all flex sm:flex-col items-center justify-between sm:justify-center gap-2 cursor-pointer focus:outline-none ${
                isSelected
                  ? 'bg-gradient-to-br from-[#7b7b56] to-[#5f5f40] text-white border-[#5f5f40] shadow-[0_8px_20px_rgba(123,123,86,0.25)] -translate-y-1'
                  : 'bg-white hover:bg-[#f6f0eb] text-[#3d3d3d] border-[#efe6dd] hover:border-[#c8a08a] hover:-translate-y-0.5 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-2 sm:gap-1 sm:flex-col">
                <span className={`text-[11px] font-mono ${isSelected ? 'text-white/70' : 'text-[#9e9e9e]'}`}>
                  [{optIdx + 1}]
                </span>
                <span className="text-sm font-medium">{opt.label}</span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {showPoints && (
                  <span
                    className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-[#efe6dd] text-[#6b6b6b]'
                    }`}
                  >
                    {points} pts
                  </span>
                )}
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-white text-[#7b7b56] flex items-center justify-center shadow-xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
