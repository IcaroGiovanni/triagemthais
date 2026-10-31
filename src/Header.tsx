import React from 'react';
import {
  History,
  BookOpen,
  RotateCcw,
  Brain,
  Flame,
  Activity,
  Target,
  HeartPulse,
  LayoutGrid,
  Sparkles
} from 'lucide-react';

export type ActiveTool = 'depressao' | 'asrs' | 'ansiedade' | 'aq50' | 'burnout';
export type ViewState = 'hub' | 'intro' | 'questionnaire' | 'results';

interface HeaderProps {
  activeTool: ActiveTool;
  onSelectTool: (tool: ActiveTool) => void;
  currentView: ViewState;
  answeredCount: number;
  totalQuestions: number;
  onNavigate: (view: ViewState) => void;
  onOpenHistory: () => void;
  onOpenEducation: () => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTool,
  onSelectTool,
  currentView,
  answeredCount,
  totalQuestions,
  onNavigate,
  onOpenHistory,
  onOpenEducation,
  onReset,
}) => {
  const isHub = currentView === 'hub';

  return (
    <header className="sticky top-0 z-30 bg-[#fbf7f4]/95 backdrop-blur-md border-b border-[#efe6dd] no-print">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Zone 1: Official Logo Button */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('hub')}
            className="flex items-center group cursor-pointer focus:outline-none"
            title="Ir para o Menu Principal de Triagens"
          >
            <img
              src="/logoatt_cdd07c48.png"
              alt="Thais Rodrigues - Psicóloga | Neuropsicóloga - CRP 08/40838"
              className="h-9 sm:h-12 w-auto max-w-[170px] xs:max-w-[210px] sm:max-w-[260px] object-contain transition-transform group-hover:scale-[1.02]"
            />
          </button>

          {/* Quick Hub button on desktop/tablet */}
          <button
            type="button"
            onClick={() => onNavigate('hub')}
            className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
              isHub
                ? 'bg-[#7b7b56] text-white border-[#7b7b56] shadow-2xs'
                : 'bg-white text-[#5f5f40] border-[#efe6dd] hover:bg-[#f6f0eb]'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Menu de Triagens</span>
          </button>

          {/* Instrument Switcher Tabs (visible on wide screens) */}
          <div className="hidden xl:flex items-center p-1 bg-[#f6f0eb] rounded-full border border-[#efe6dd]">
            <button
              type="button"
              onClick={() => {
                onSelectTool('depressao');
                if (isHub) onNavigate('intro');
              }}
              className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
                !isHub && activeTool === 'depressao'
                  ? 'bg-white text-[#2d2d2d] shadow-xs font-semibold'
                  : 'text-[#6b6b6b] hover:text-[#2d2d2d]'
              }`}
            >
              <HeartPulse className="w-3.5 h-3.5 text-[#c8a08a]" />
              <span>Depressão</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onSelectTool('asrs');
                if (isHub) onNavigate('intro');
              }}
              className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
                !isHub && activeTool === 'asrs'
                  ? 'bg-white text-[#2d2d2d] shadow-xs font-semibold'
                  : 'text-[#6b6b6b] hover:text-[#2d2d2d]'
              }`}
            >
              <Target className="w-3.5 h-3.5 text-[#7b7b56]" />
              <span>TDAH</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onSelectTool('ansiedade');
                if (isHub) onNavigate('intro');
              }}
              className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
                !isHub && activeTool === 'ansiedade'
                  ? 'bg-white text-[#2d2d2d] shadow-xs font-semibold'
                  : 'text-[#6b6b6b] hover:text-[#2d2d2d]'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-[#c8a08a]" />
              <span>Ansiedade</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onSelectTool('aq50');
                if (isHub) onNavigate('intro');
              }}
              className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
                !isHub && activeTool === 'aq50'
                  ? 'bg-white text-[#2d2d2d] shadow-xs font-semibold'
                  : 'text-[#6b6b6b] hover:text-[#2d2d2d]'
              }`}
            >
              <Brain className="w-3.5 h-3.5 text-[#7b7b56]" />
              <span>Autismo</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onSelectTool('burnout');
                if (isHub) onNavigate('intro');
              }}
              className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
                !isHub && activeTool === 'burnout'
                  ? 'bg-white text-[#2d2d2d] shadow-xs font-semibold'
                  : 'text-[#6b6b6b] hover:text-[#2d2d2d]'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-[#c8a08a]" />
              <span>Burnout</span>
            </button>
          </div>
        </div>

        {/* Zone 2: Navigation links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs sm:text-sm font-medium text-[#6b6b6b]">
          {!isHub && (
            <>
              <button
                onClick={() => onNavigate('intro')}
                className={`transition-colors whitespace-nowrap shrink-0 text-underline-animated cursor-pointer ${
                  currentView === 'intro' ? 'text-[#7b7b56] font-semibold' : 'hover:text-[#2d2d2d]'
                }`}
              >
                Início
              </button>
              <button
                onClick={() => onNavigate('questionnaire')}
                className={`transition-colors whitespace-nowrap shrink-0 text-underline-animated cursor-pointer ${
                  currentView === 'questionnaire' ? 'text-[#7b7b56] font-semibold' : 'hover:text-[#2d2d2d]'
                }`}
              >
                Questionário ({answeredCount}/{totalQuestions})
              </button>
            </>
          )}

          <button
            onClick={onOpenEducation}
            className="hover:text-[#2d2d2d] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer text-underline-animated"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#7b7b56]" />
            <span>Fundamentos & Corte</span>
          </button>
          <button
            onClick={onOpenHistory}
            className="hover:text-[#2d2d2d] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer text-underline-animated"
          >
            <History className="w-3.5 h-3.5 text-[#c8a08a]" />
            <span>Histórico</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action / Reset */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {!isHub && answeredCount > 0 && currentView !== 'intro' && (
            <button
              onClick={onReset}
              title="Limpar respostas preenchidas"
              className="p-2 sm:p-2.5 text-[#6b6b6b] hover:text-[#2d2d2d] hover:bg-[#efe6dd] rounded-full transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          {isHub ? (
            <button
              onClick={() => {
                onSelectTool('depressao');
                onNavigate('intro');
              }}
              className="btn btn-primary text-xs py-2 px-3 sm:px-5 cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>Começar</span>
            </button>
          ) : currentView === 'intro' ? (
            <button
              onClick={() => onNavigate('questionnaire')}
              className="btn btn-primary text-xs py-2 px-3 sm:px-5 cursor-pointer whitespace-nowrap"
            >
              Iniciar Triagem
            </button>
          ) : currentView === 'questionnaire' ? (
            <button
              onClick={() => onNavigate('results')}
              disabled={answeredCount < totalQuestions}
              className={`btn text-xs py-2 px-3 sm:px-5 whitespace-nowrap ${
                answeredCount === totalQuestions
                  ? 'btn-primary cursor-pointer'
                  : 'bg-[#efe6dd] text-[#9e9e9e] cursor-not-allowed shadow-none'
              }`}
            >
              {answeredCount === totalQuestions ? 'Ver Resultados' : `${answeredCount}/${totalQuestions}`}
            </button>
          ) : (
            <button
              onClick={() => onNavigate('questionnaire')}
              className="btn btn-secondary text-xs py-2 px-3 sm:px-4 cursor-pointer whitespace-nowrap"
            >
              Revisar
            </button>
          )}
        </div>
      </div>

      {/* Mobile Tool Switcher Bar */}
      <div className="xl:hidden px-3 sm:px-4 pb-2.5 flex items-center justify-start gap-1.5 sm:gap-2 border-t border-[#f6f0eb] pt-2 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => onNavigate('hub')}
          className={`py-1.5 px-3 text-xs font-medium rounded-full flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            isHub
              ? 'bg-[#7b7b56] text-white shadow-2xs font-semibold'
              : 'bg-[#f6f0eb] text-[#5f5f40]'
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>Menu</span>
        </button>
        <button
          type="button"
          onClick={() => {
            onSelectTool('depressao');
            if (isHub) onNavigate('intro');
          }}
          className={`py-1.5 px-3 text-xs font-medium rounded-full flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            !isHub && activeTool === 'depressao'
              ? 'bg-[#c8a08a] text-white shadow-2xs font-semibold'
              : 'bg-[#f6f0eb] text-[#6b6b6b]'
          }`}
        >
          <HeartPulse className="w-3.5 h-3.5" />
          <span>Depressão</span>
        </button>
        <button
          type="button"
          onClick={() => {
            onSelectTool('asrs');
            if (isHub) onNavigate('intro');
          }}
          className={`py-1.5 px-3 text-xs font-medium rounded-full flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            !isHub && activeTool === 'asrs'
              ? 'bg-[#7b7b56] text-white shadow-2xs font-semibold'
              : 'bg-[#f6f0eb] text-[#6b6b6b]'
          }`}
        >
          <Target className="w-3.5 h-3.5" />
          <span>TDAH</span>
        </button>
        <button
          type="button"
          onClick={() => {
            onSelectTool('ansiedade');
            if (isHub) onNavigate('intro');
          }}
          className={`py-1.5 px-3 text-xs font-medium rounded-full flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            !isHub && activeTool === 'ansiedade'
              ? 'bg-[#c8a08a] text-white shadow-2xs font-semibold'
              : 'bg-[#f6f0eb] text-[#6b6b6b]'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Ansiedade</span>
        </button>
        <button
          type="button"
          onClick={() => {
            onSelectTool('aq50');
            if (isHub) onNavigate('intro');
          }}
          className={`py-1.5 px-3 text-xs font-medium rounded-full flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            !isHub && activeTool === 'aq50'
              ? 'bg-[#7b7b56] text-white shadow-2xs font-semibold'
              : 'bg-[#f6f0eb] text-[#6b6b6b]'
          }`}
        >
          <Brain className="w-3.5 h-3.5" />
          <span>Autismo</span>
        </button>
        <button
          type="button"
          onClick={() => {
            onSelectTool('burnout');
            if (isHub) onNavigate('intro');
          }}
          className={`py-1.5 px-3 text-xs font-medium rounded-full flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            !isHub && activeTool === 'burnout'
              ? 'bg-[#5f5f40] text-white shadow-2xs font-semibold'
              : 'bg-[#f6f0eb] text-[#6b6b6b]'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          <span>Burnout</span>
        </button>
      </div>
    </header>
  );
};
