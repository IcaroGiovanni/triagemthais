import React from 'react';
import { ASRSQuestion, ASRSResponseValue } from './asrs';
import { ASRS_RESPONSE_OPTIONS } from './asrsQuestions';
import { Check } from 'lucide-react';
import { getPointForPartAItem } from './asrsCalculator';

interface ASRSQuestionCardProps {
  question: ASRSQuestion;
  index: number;
  total: number;
  currentAnswer?: ASRSResponseValue;
  onSelectAnswer: (value: ASRSResponseValue) => void;
  showPoints?: boolean;
}

export const ASRSQuestionCard: React.FC<ASRSQuestionCardProps> = ({
  question,
  index,
  total,
  currentAnswer,
  onSelectAnswer,
  showPoints = false,
}) => {
  const isPartA = question.part === 'A';

  return (
    <div className="style-card space-y-6">
      {/* Top Metadata */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-[#6b6b6b]">
          <span className="font-semibold text-[#2d2d2d]">Questão {index + 1} de {total}</span>
          <span aria-hidden="true">·</span>
          <span>ASRS-v1.1</span>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${
              isPartA
                ? 'bg-[#efe6dd] text-[#5f5f40] border-[#dfd4c8]'
                : 'bg-[#f6f0eb] text-[#c8a08a] border-[#efe6dd]'
            }`}
          >
            {isPartA ? 'Parte A (Rastreio)' : 'Parte B (Complementar)'}
          </div>

          <div className="px-3 py-1 rounded-full text-xs font-medium border bg-[#fbf7f4] text-[#6b6b6b] border-[#efe6dd]">
            {question.subtypeName}
          </div>
        </div>
      </div>

      {/* Question Text */}
      <div className="space-y-1.5">
        <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#2d2d2d] leading-snug text-balance">
          {question.text}
        </h3>
        {isPartA && (
          <p className="text-xs text-[#9e9e9e]">
            *Item da Parte A: avalia frequência associada ao critério oficial de rastreio de TDAH.
          </p>
        )}
      </div>

      {/* 5 Answer Options */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 pt-2">
        {ASRS_RESPONSE_OPTIONS.map((opt, optIdx) => {
          const isSelected = currentAnswer === opt.value;
          const point = isPartA ? getPointForPartAItem(question.id, opt.value) : 0;

          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSelectAnswer(opt.value)}
              className={`min-h-[64px] px-3 py-3 rounded-2xl border text-left sm:text-center transition-all flex sm:flex-col items-center justify-between sm:justify-center gap-2 cursor-pointer focus:outline-none ${
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
                {showPoints && isPartA && (
                  <span
                    className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-[#efe6dd] text-[#6b6b6b]'
                    }`}
                  >
                    {point} pt
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
