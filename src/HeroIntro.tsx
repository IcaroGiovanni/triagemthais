import React from 'react';
import { DisclaimerBanner } from './DisclaimerBanner';
import { ArrowRight, BookOpen, Heart, Briefcase, Users, HelpCircle, ArrowRightLeft } from 'lucide-react';

interface HeroIntroProps {
  onStart: () => void;
  clientWorkApplicable: boolean;
  onToggleClientWork: (applicable: boolean) => void;
  onOpenEducation: () => void;
  totalAnswered: number;
}

export const HeroIntro: React.FC<HeroIntroProps> = ({
  onStart,
  clientWorkApplicable,
  onToggleClientWork,
  onOpenEducation,
  totalAnswered,
}) => {
  return (
    <div className="space-y-12 py-8 sm:py-12">
      {/* Primary Clinical Disclaimer */}
      <DisclaimerBanner />

      {/* Main Hero Header */}
      <div className="space-y-5 max-w-3xl">
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-dot" />
          <span>COPENHAGEN BURNOUT INVENTORY · TRIAGEM CIENTÍFICA</span>
        </div>

        <h1 className="hero-title text-balance">
          Mapeie as origens do seu cansaço{' '}
          <span className="hero-title-accent">sem rótulos precipitados</span>.
        </h1>

        <p className="text-base sm:text-lg text-[#6b6b6b] leading-relaxed max-w-2xl">
          O esgotamento raramente atinge todas as esferas da vida da mesma forma. 
          O instrumento CBI avalia separadamente o <strong>desgaste pessoal</strong>, 
          a <strong>sobrecarga profissional</strong> e a <strong>fadiga gerada pelo contato com clientes</strong>, 
          sem mascarar a realidade com médias artificiais.
        </p>
      </div>

      {/* The 3 Independent Dimensions as Luxury Style Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Dimensão 1 */}
        <div className="style-card flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#efe6dd]/60 border border-[rgba(123,123,86,0.12)] flex items-center justify-center text-[#7b7b56] shadow-sm">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-[#7b7b56] uppercase tracking-wider block mb-1">
                Dimensão 1 · 6 itens
              </span>
              <h2 className="font-serif text-2xl font-normal text-[#2d2d2d]">Burnout Pessoal</h2>
            </div>
            <p className="text-xs sm:text-sm text-[#6b6b6b] leading-relaxed">
              Avalia o grau de exaustão física e psicológica contínua vivenciada pelo indivíduo, independente de sua ocupação ou status de trabalho.
            </p>
          </div>
          <div className="pt-4 border-t border-[#efe6dd] mt-6 flex items-center justify-between text-xs text-[#9e9e9e]">
            <span>Itens 1, 7, 12, 16, 18, 19</span>
            <span className="font-mono">0–100 pts</span>
          </div>
        </div>

        {/* Dimensão 2 */}
        <div className="style-card flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#f6f0eb] border border-[rgba(200,160,138,0.25)] flex items-center justify-center text-[#c8a08a] shadow-sm">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-[#c8a08a] uppercase tracking-wider block mb-1">
                Dimensão 2 · 7 itens
              </span>
              <h2 className="font-serif text-2xl font-normal text-[#2d2d2d]">Relacionado ao Trabalho</h2>
            </div>
            <p className="text-xs sm:text-sm text-[#6b6b6b] leading-relaxed">
              Mapeia os sintomas e a sensação de esgotamento que a própria pessoa atribui diretamente à sua rotina e exigências da função laboral.
            </p>
          </div>
          <div className="pt-4 border-t border-[#efe6dd] mt-6 flex items-center justify-between text-xs text-[#9e9e9e]">
            <span>Itens 2 (invertido), 5, 6, 8, 14, 15, 17</span>
            <span className="font-mono">0–100 pts</span>
          </div>
        </div>

        {/* Dimensão 3 */}
        <div className="style-card flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#efe6dd]/60 border border-[rgba(123,123,86,0.12)] flex items-center justify-center text-[#7b7b56] shadow-sm">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-[#7b7b56] uppercase tracking-wider block mb-1">
                Dimensão 3 · 6 itens
              </span>
              <h2 className="font-serif text-2xl font-normal text-[#2d2d2d]">Relacionado a Clientes</h2>
            </div>
            <p className="text-xs sm:text-sm text-[#6b6b6b] leading-relaxed">
              Mensura a fadiga e esvaziamento de energia resultantes da relação direta com usuários, clientes, pacientes, parceiros ou alunos.
            </p>
          </div>
          <div className="pt-4 border-t border-[#efe6dd] mt-6 flex items-center justify-between text-xs text-[#9e9e9e]">
            <span>Itens 3, 4, 9, 10, 11, 13</span>
            <span className="font-mono">0–100 pts</span>
          </div>
        </div>
      </div>

      {/* Atmospheric TCC / CBI Clinical Flow Panel */}
      <div className="tcc-panel">
        <div className="tcc-panel-glow" aria-hidden="true" />
        
        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="tcc-badge">
              ARQUITETURA MULTIDIMENSIONAL · CBI ORIGINAL
            </div>
            <span className="text-xs text-white/70 font-mono">
              Kristensen et al. (2005)
            </span>
          </div>

          <div className="space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal">
              Por que o CBI não utiliza um <em className="italic text-[#f1d8c9]">resultado geral</em> somado?
            </h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-2xl">
              Imagine o seguinte caso real: <strong>Pessoal: 78</strong> (elevado), <strong>Trabalho: 32</strong> (menor intensidade) e <strong>Clientes: 81</strong> (elevado).
              Uma média unificada geraria 63, escondendo a informação clínica mais valiosa: a rotina do trabalho em si está equilibrada, mas o indivíduo está profundamente esgotado no contato com pessoas e em sua vida privada.
            </p>
          </div>

          {/* 3 Frosted Glass Nodes Flow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="tcc-node">
              <span className="text-xs text-white/60 font-mono block mb-1">FONTE 01</span>
              <h3 className="font-serif text-lg text-white font-medium mb-1">Vida Pessoal</h3>
              <p className="text-xs text-white/75 leading-relaxed">
                Fadiga física, cansaço matinal e suscetibilidade a doenças que permeiam o dia a dia.
              </p>
            </div>

            <div className="tcc-node">
              <span className="text-xs text-white/60 font-mono block mb-1">FONTE 02</span>
              <h3 className="font-serif text-lg text-white font-medium mb-1">Rotina de Trabalho</h3>
              <p className="text-xs text-white/75 leading-relaxed">
                Sobrecarga das tarefas, clima institucional e sobra de energia para família no tempo livre.
              </p>
            </div>

            <div className="tcc-node">
              <span className="text-xs text-white/60 font-mono block mb-1">FONTE 03</span>
              <h3 className="font-serif text-lg text-white font-medium mb-1">Contato com Clientes</h3>
              <p className="text-xs text-white/75 leading-relaxed">
                Sensação de dar mais do que recebe e drenagem energética na relação com o público.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scope Settings: Does the user work with clients/public? */}
      <div className="bg-[#ffffff] border border-[#efe6dd] rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="space-y-1">
          <h3 className="font-serif text-lg text-[#2d2d2d] font-normal">
            Você atende diretamente clientes, pacientes, alunos ou público?
          </h3>
          <p className="text-xs text-[#6b6b6b]">
            Se a sua função não possui relacionamento frequente com público externo, você pode desativar a Dimensão 3.
          </p>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => onToggleClientWork(true)}
            className={`px-4 py-2 text-xs font-medium rounded-full transition-all cursor-pointer ${
              clientWorkApplicable
                ? 'bg-[#7b7b56] text-white shadow-sm'
                : 'bg-[#f6f0eb] text-[#6b6b6b] hover:bg-[#efe6dd]'
            }`}
          >
            Sim, atendo clientes (19 itens)
          </button>
          <button
            type="button"
            onClick={() => onToggleClientWork(false)}
            className={`px-4 py-2 text-xs font-medium rounded-full transition-all cursor-pointer ${
              !clientWorkApplicable
                ? 'bg-[#7b7b56] text-white shadow-sm'
                : 'bg-[#f6f0eb] text-[#6b6b6b] hover:bg-[#efe6dd]'
            }`}
          >
            Não atendo público (13 itens)
          </button>
        </div>
      </div>

      {/* Call to Action */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <button
          onClick={onStart}
          className="btn btn-primary btn-lg w-full sm:w-auto"
        >
          <span>{totalAnswered > 0 ? 'Continuar Questionário' : 'Iniciar Triagem CBI'}</span>
          <ArrowRight className="w-5 h-5 ml-1" />
        </button>

        <button
          onClick={onOpenEducation}
          className="btn btn-secondary w-full sm:w-auto"
        >
          <BookOpen className="w-4 h-4 text-[#7b7b56]" />
          <span>Ver detalhes do cálculo e estudos de validação</span>
        </button>
      </div>
    </div>
  );
};
