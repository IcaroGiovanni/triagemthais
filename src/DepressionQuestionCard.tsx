import React from 'react';
import { DepressionQuestion, DepressionResponseValue } from './depression';
import { DEPRESSION_RESPONSE_OPTIONS } from './depressionQuestions';
import { Check, ShieldAlert } from 'lucide-react';

interface DepressionQuestionCardProps {
  question: DepressionQuestion;
  index: number;
  total: number;
  selectedValue?: DepressionResponseValue;
  onSelect: (value: DepressionResponseValue) => void;
  showPointsPreview?: boolean;
}

export const DepressionQuestionCard: React.FC<DepressionQuestionCardProps> = ({
  question,
  index,
  total,
  selectedValue,
  onSelect,
  showPointsPreview = false,
}) => {
  return (
    <div className="style-card space-y-6 transition-all duration-200">
      {/* Question Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#7b7b56] font-semibold bg-[#f6f0eb] px-2.5 py-0.5 rounded-full border border-[#efe6dd]">
              Item {index + 1} de {total}
            </span>

            {question.isSafetyCritical && (
              <span className="text-[10px] font-medium tracking-wide text-[#9f4f46] bg-[#fbf2f0] px-2.5 py-0.5 rounded-full border border-[#edd7d4] flex items-center gap-1">
                <ShieldAlert className="w-3 h-3" />
                Item de acolhimento e segurança
              </span>
            )}
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#2d2d2d] leading-snug pt-1">
            {question.text}
          </h3>
        </div>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        {DEPRESSION_RESPONSE_OPTIONS.map((option, optIdx) => {
          const isSelected = selectedValue === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 cursor-pointer group ${
                isSelected
                  ? 'bg-[#ffffff] border-[#7b7b56] ring-2 ring-[#7b7b56]/20 shadow-sm'
                  : 'bg-[#fbf7f4]/60 border-[#efe6dd] hover:bg-[#ffffff] hover:border-[#c8a08a]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-[#7b7b56] border-[#7b7b56] text-white'
                      : 'border-[#dfd4c8] bg-white group-hover:border-[#c8a08a]'
                  }`}
                >
                  {isSelected ? (
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  ) : (
                    <span className="text-[10px] font-mono text-[#9e9e9e] group-hover:text-[#2d2d2d]">
                      {optIdx + 1}
                    </span>
                  )}
                </div>

                <span
                  className={`text-sm ${
                    isSelected ? 'text-[#2d2d2d] font-semibold' : 'text-[#6b6b6b] group-hover:text-[#2d2d2d]'
                  }`}
                >
                  {option.label}
                </span>
              </div>

              {showPointsPreview && (
                <span
                  className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-[#efe6dd] text-[#2d2d2d] font-bold'
                      : 'text-[#9e9e9e] bg-[#f6f0eb]'
                  }`}
                >
                  {option.points} {option.points === 1 ? 'pt' : 'pts'}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
