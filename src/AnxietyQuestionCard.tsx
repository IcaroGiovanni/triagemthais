import React from 'react';
import { AnxietyQuestion, AnxietyResponseValue } from './anxiety';
import { ANXIETY_RESPONSE_OPTIONS } from './anxietyQuestions';
import { Check } from 'lucide-react';
import { getPointsForAnxietyAnswer } from './anxietyCalculator';

interface AnxietyQuestionCardProps {
  question: AnxietyQuestion;
  index: number;
  total: number;
  currentAnswer?: AnxietyResponseValue;
  onSelectAnswer: (value: AnxietyResponseValue) => void;
  showPoints?: boolean;
}

export const AnxietyQuestionCard: React.FC<AnxietyQuestionCardProps> = ({
  question,
  index,
  total,
  currentAnswer,
  onSelectAnswer,
  showPoints = false,
}) => {
  return (
    <div className="style-card space-y-6">
      {/* Top Metadata */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-[#6b6b6b]">
          <span className="font-semibold text-[#2d2d2d]">Manifestação {index + 1} de {total}</span>
          <span aria-hidden="true">·</span>
          <span>Período: Última semana</span>
        </div>

        <div className="px-3 py-1 rounded-full text-xs font-semibold border bg-[#f6f0eb] text-[#5f5f40] border-[#efe6dd]">
          {question.clusterName}
        </div>
      </div>

      {/* Question Text */}
      <div className="space-y-1.5">
        <span className="text-xs text-[#9e9e9e] uppercase tracking-wider block">
          Na última semana, com que frequência você sentiu:
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#2d2d2d] leading-snug text-balance">
          {question.text}
        </h3>
      </div>

      {/* 4 Answer Options */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
        {ANXIETY_RESPONSE_OPTIONS.map((opt, optIdx) => {
          const isSelected = currentAnswer === opt.value;
          const points = getPointsForAnxietyAnswer(opt.value);

          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSelectAnswer(opt.value)}
              className={`min-h-[64px] px-4 py-3.5 rounded-2xl border text-left sm:text-center transition-all flex sm:flex-col items-center justify-between sm:justify-center gap-2 cursor-pointer focus:outline-none ${
                isSelected
                  ? 'bg-gradient-to-br from-[#7b7b56] to-[#5f5f40] text-white border-[#5f5f40] shadow-[0_8px_20px_rgba(123,123,86,0.25)] -translate-y-1 font-medium'
                  : 'bg-white hover:bg-[#f6f0eb] text-[#3d3d3d] border-[#efe6dd] hover:border-[#c8a08a] hover:-translate-y-0.5 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-2 sm:gap-1 sm:flex-col">
                <span className={`text-[11px] font-mono ${isSelected ? 'text-white/70' : 'text-[#9e9e9e]'}`}>
                  [{optIdx + 1}]
                </span>
                <span className="text-sm">{opt.label}</span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {showPoints && (
                  <span
                    className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-[#efe6dd] text-[#6b6b6b]'
                    }`}
                  >
                    {points} {points === 1 ? 'pt' : 'pts'}
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
