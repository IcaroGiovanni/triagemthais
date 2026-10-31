/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Header, ActiveTool, ViewState } from './Header';
import { ClinicalHub } from './ClinicalHub';
import { DepressionHeroIntro } from './DepressionHeroIntro';
import { DepressionQuestionnaire } from './DepressionQuestionnaire';
import { DepressionResultsView } from './DepressionResultsView';
import { ASRSHeroIntro } from './ASRSHeroIntro';
import { ASRSQuestionnaire } from './ASRSQuestionnaire';
import { ASRSResultsView } from './ASRSResultsView';
import { AnxietyHeroIntro } from './AnxietyHeroIntro';
import { AnxietyQuestionnaire } from './AnxietyQuestionnaire';
import { AnxietyResultsView } from './AnxietyResultsView';
import { AQHeroIntro } from './AQHeroIntro';
import { AQQuestionnaire } from './AQQuestionnaire';
import { AQResultsView } from './AQResultsView';
import { HeroIntro } from './HeroIntro';
import { Questionnaire } from './Questionnaire';
import { ResultsView } from './ResultsView';
import { EducationalModal } from './EducationalModal';
import { HistoryModal } from './HistoryModal';
import { ScheduleModal } from './ScheduleModal';
import { DEPRESSION_QUESTIONS } from './depressionQuestions';
import { ASRS_QUESTIONS } from './asrsQuestions';
import { ANXIETY_QUESTIONS } from './anxietyQuestions';
import { AQ_QUESTIONS } from './aqQuestions';
import { CBI_QUESTIONS } from './cbiQuestions';
import { calculateDepressionResult } from './depressionCalculator';
import { calculateASRSResult } from './asrsCalculator';
import { calculateAnxietyResult } from './anxietyCalculator';
import { calculateAQResult } from './aqCalculator';
import { calculateFullResults } from './cbiCalculator';
import { DepressionResponseValue, DepressionResult } from './depression';
import { ASRSResponseValue, ASRSResult } from './asrs';
import { AnxietyResponseValue, AnxietyResult } from './anxiety';
import { AQResponseValue, AQResult } from './aq';
import { ResponseValue, ScreeningResult } from './cbi';

const STORAGE_KEY_DEP_HISTORY = 'depression_screening_history_v1';
const STORAGE_KEY_DEP_DRAFT = 'depression_screening_draft_v1';
const STORAGE_KEY_ASRS_HISTORY = 'asrs_screening_history_v1';
const STORAGE_KEY_ASRS_DRAFT = 'asrs_screening_draft_v1';
const STORAGE_KEY_ANS_HISTORY = 'anxiety_screening_history_v1';
const STORAGE_KEY_ANS_DRAFT = 'anxiety_screening_draft_v1';
const STORAGE_KEY_AQ_HISTORY = 'aq50_screening_history_v1';
const STORAGE_KEY_AQ_DRAFT = 'aq50_screening_draft_v1';
const STORAGE_KEY_CBI_HISTORY = 'cbi_screening_history_v1';
const STORAGE_KEY_CBI_DRAFT = 'cbi_screening_draft_v1';

export default function App() {
  const [activeTool, setActiveTool] = useState<ActiveTool>('depressao');
  // Default to 'hub' so clients see the menu of clinical screenings
  const [currentView, setCurrentView] = useState<ViewState>('hub');

  // --- Depression States ---
  const [depressionAnswers, setDepressionAnswers] = useState<Record<number, DepressionResponseValue>>({});
  const [depressionResult, setDepressionResult] = useState<DepressionResult | null>(null);
  const [depressionHistory, setDepressionHistory] = useState<DepressionResult[]>([]);
  const [isDepressionSaved, setIsDepressionSaved] = useState(false);

  // --- ASRS (TDAH) States ---
  const [asrsAnswers, setAsrsAnswers] = useState<Record<number, ASRSResponseValue>>({});
  const [asrsResult, setAsrsResult] = useState<ASRSResult | null>(null);
  const [asrsHistory, setAsrsHistory] = useState<ASRSResult[]>([]);
  const [isAsrsSaved, setIsAsrsSaved] = useState(false);

  // --- Anxiety States ---
  const [anxietyAnswers, setAnxietyAnswers] = useState<Record<number, AnxietyResponseValue>>({});
  const [anxietyResult, setAnxietyResult] = useState<AnxietyResult | null>(null);
  const [anxietyHistory, setAnxietyHistory] = useState<AnxietyResult[]>([]);
  const [isAnxietySaved, setIsAnxietySaved] = useState(false);

  // --- AQ-50 States ---
  const [aqAnswers, setAqAnswers] = useState<Record<number, AQResponseValue>>({});
  const [aqResult, setAqResult] = useState<AQResult | null>(null);
  const [aqHistory, setAqHistory] = useState<AQResult[]>([]);
  const [isAqSaved, setIsAqSaved] = useState(false);

  // --- CBI Burnout States ---
  const [clientWorkApplicable, setClientWorkApplicable] = useState(true);
  const [cbiAnswers, setCbiAnswers] = useState<Record<number, ResponseValue>>({});
  const [cbiResult, setCbiResult] = useState<ScreeningResult | null>(null);
  const [cbiHistory, setCbiHistory] = useState<ScreeningResult[]>([]);
  const [isCbiSaved, setIsCbiSaved] = useState(false);

  // --- Modals ---
  const [isEducationOpen, setIsEducationOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  // Active CBI questions based on client work applicability
  const activeCBIQuestions = useMemo(() => {
    if (clientWorkApplicable) return CBI_QUESTIONS;
    return CBI_QUESTIONS.filter((q) => q.dimension !== 'clientes');
  }, [clientWorkApplicable]);

  // Load local storage on mount
  useEffect(() => {
    try {
      const savedDepHist = localStorage.getItem(STORAGE_KEY_DEP_HISTORY);
      if (savedDepHist) setDepressionHistory(JSON.parse(savedDepHist));

      const savedDepDraft = localStorage.getItem(STORAGE_KEY_DEP_DRAFT);
      if (savedDepDraft) {
        const parsed = JSON.parse(savedDepDraft);
        if (parsed.answers) setDepressionAnswers(parsed.answers);
      }

      const savedAsrsHist = localStorage.getItem(STORAGE_KEY_ASRS_HISTORY);
      if (savedAsrsHist) setAsrsHistory(JSON.parse(savedAsrsHist));

      const savedAsrsDraft = localStorage.getItem(STORAGE_KEY_ASRS_DRAFT);
      if (savedAsrsDraft) {
        const parsed = JSON.parse(savedAsrsDraft);
        if (parsed.answers) setAsrsAnswers(parsed.answers);
      }

      const savedAnsHist = localStorage.getItem(STORAGE_KEY_ANS_HISTORY);
      if (savedAnsHist) setAnxietyHistory(JSON.parse(savedAnsHist));

      const savedAnsDraft = localStorage.getItem(STORAGE_KEY_ANS_DRAFT);
      if (savedAnsDraft) {
        const parsed = JSON.parse(savedAnsDraft);
        if (parsed.answers) setAnxietyAnswers(parsed.answers);
      }

      const savedAQHist = localStorage.getItem(STORAGE_KEY_AQ_HISTORY);
      if (savedAQHist) setAqHistory(JSON.parse(savedAQHist));

      const savedAQDraft = localStorage.getItem(STORAGE_KEY_AQ_DRAFT);
      if (savedAQDraft) {
        const parsed = JSON.parse(savedAQDraft);
        if (parsed.answers) setAqAnswers(parsed.answers);
      }

      const savedCBIHist = localStorage.getItem(STORAGE_KEY_CBI_HISTORY);
      if (savedCBIHist) setCbiHistory(JSON.parse(savedCBIHist));

      const savedCBIDraft = localStorage.getItem(STORAGE_KEY_CBI_DRAFT);
      if (savedCBIDraft) {
        const parsed = JSON.parse(savedCBIDraft);
        if (parsed.answers) setCbiAnswers(parsed.answers);
        if (typeof parsed.clientWorkApplicable === 'boolean') {
          setClientWorkApplicable(parsed.clientWorkApplicable);
        }
      }
    } catch {
      // localStorage error fallback
    }
  }, []);

  // Sync drafts
  useEffect(() => {
    if (Object.keys(depressionAnswers).length > 0) {
      try {
        localStorage.setItem(
          STORAGE_KEY_DEP_DRAFT,
          JSON.stringify({ answers: depressionAnswers })
        );
      } catch {
        // ignore
      }
    }
  }, [depressionAnswers]);

  // Sync drafts
  useEffect(() => {
    if (Object.keys(asrsAnswers).length > 0) {
      try {
        localStorage.setItem(
          STORAGE_KEY_ASRS_DRAFT,
          JSON.stringify({ answers: asrsAnswers })
        );
      } catch {
        // ignore
      }
    }
  }, [asrsAnswers]);

  useEffect(() => {
    if (Object.keys(anxietyAnswers).length > 0) {
      try {
        localStorage.setItem(
          STORAGE_KEY_ANS_DRAFT,
          JSON.stringify({ answers: anxietyAnswers })
        );
      } catch {
        // ignore
      }
    }
  }, [anxietyAnswers]);

  useEffect(() => {
    if (Object.keys(aqAnswers).length > 0) {
      try {
        localStorage.setItem(
          STORAGE_KEY_AQ_DRAFT,
          JSON.stringify({ answers: aqAnswers })
        );
      } catch {
        // ignore
      }
    }
  }, [aqAnswers]);

  useEffect(() => {
    if (Object.keys(cbiAnswers).length > 0) {
      try {
        localStorage.setItem(
          STORAGE_KEY_CBI_DRAFT,
          JSON.stringify({ answers: cbiAnswers, clientWorkApplicable })
        );
      } catch {
        // ignore
      }
    }
  }, [cbiAnswers, clientWorkApplicable]);

  // --- Handlers: Depression ---
  const handleDepressionAnswer = (questionId: number, value: DepressionResponseValue) => {
    setDepressionAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleFinishDepression = () => {
    const res = calculateDepressionResult(depressionAnswers);
    setDepressionResult(res);
    setIsDepressionSaved(false);
    setCurrentView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetakeDepression = () => {
    setDepressionAnswers({});
    setDepressionResult(null);
    setIsDepressionSaved(false);
    localStorage.removeItem(STORAGE_KEY_DEP_DRAFT);
    setCurrentView('questionnaire');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetDepression = () => {
    if (window.confirm('Deseja limpar as respostas preenchidas no questionário de Sintomas Depressivos?')) {
      setDepressionAnswers({});
      setDepressionResult(null);
      setIsDepressionSaved(false);
      localStorage.removeItem(STORAGE_KEY_DEP_DRAFT);
      setCurrentView('intro');
    }
  };

  const handleSaveDepressionToHistory = () => {
    if (!depressionResult) return;
    try {
      const updated = [depressionResult, ...depressionHistory.filter((h) => h.id !== depressionResult.id)];
      setDepressionHistory(updated);
      localStorage.setItem(STORAGE_KEY_DEP_HISTORY, JSON.stringify(updated));
      setIsDepressionSaved(true);
    } catch {
      // ignore
    }
  };

  const handleDeleteDepressionItem = (id: string) => {
    const updated = depressionHistory.filter((h) => h.id !== id);
    setDepressionHistory(updated);
    localStorage.setItem(STORAGE_KEY_DEP_HISTORY, JSON.stringify(updated));
  };

  const handleApplyDepressionExample = (
    preset: 'normal6' | 'mild16' | 'moderate28' | 'severe46' | 'safetyThoughts' | 'safetyPlan'
  ) => {
    const answers: Record<number, DepressionResponseValue> = {};
    if (preset === 'normal6') {
      DEPRESSION_QUESTIONS.forEach((q, idx) => {
        answers[q.id] = idx < 6 ? 'as_vezes' : 'nem_um_pouco';
      });
      answers[10] = 'nem_um_pouco';
      answers[11] = 'nem_um_pouco';
      answers[12] = 'nem_um_pouco';
    } else if (preset === 'mild16') {
      DEPRESSION_QUESTIONS.forEach((q, idx) => {
        if (idx < 6) answers[q.id] = 'frequentemente';
        else if (idx < 10) answers[q.id] = 'as_vezes';
        else answers[q.id] = 'nem_um_pouco';
      });
      answers[10] = 'nem_um_pouco';
      answers[11] = 'nem_um_pouco';
      answers[12] = 'nem_um_pouco';
    } else if (preset === 'moderate28') {
      DEPRESSION_QUESTIONS.forEach((q, idx) => {
        if (idx < 10) answers[q.id] = 'frequentemente';
        else if (idx < 18) answers[q.id] = 'as_vezes';
        else answers[q.id] = 'nem_um_pouco';
      });
      answers[10] = 'nem_um_pouco';
      answers[11] = 'nem_um_pouco';
      answers[12] = 'nem_um_pouco';
    } else if (preset === 'severe46') {
      DEPRESSION_QUESTIONS.forEach((q) => {
        answers[q.id] = 'a_maior_parte';
      });
      answers[10] = 'nem_um_pouco';
      answers[11] = 'nem_um_pouco';
      answers[12] = 'nem_um_pouco';
      answers[18] = 'as_vezes';
    } else if (preset === 'safetyThoughts') {
      DEPRESSION_QUESTIONS.forEach((q, idx) => {
        answers[q.id] = idx % 2 === 0 ? 'frequentemente' : 'as_vezes';
      });
      answers[10] = 'frequentemente';
      answers[11] = 'nem_um_pouco';
      answers[12] = 'nem_um_pouco';
    } else {
      DEPRESSION_QUESTIONS.forEach((q, idx) => {
        answers[q.id] = idx % 2 === 0 ? 'a_maior_parte' : 'frequentemente';
      });
      answers[10] = 'frequentemente';
      answers[11] = 'frequentemente';
      answers[12] = 'a_maior_parte';
    }
    setDepressionAnswers(answers);
  };

  const handleSelectHistoryDepression = (item: DepressionResult) => {
    setActiveTool('depressao');
    setDepressionResult(item);
    setDepressionAnswers(item.answers);
    setIsDepressionSaved(true);
    setCurrentView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Handlers: ASRS (TDAH) ---
  const handleAsrsAnswer = (questionId: number, value: ASRSResponseValue) => {
    setAsrsAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleFinishASRS = () => {
    const res = calculateASRSResult(asrsAnswers);
    setAsrsResult(res);
    setIsAsrsSaved(false);
    setCurrentView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetakeASRS = () => {
    setAsrsAnswers({});
    setAsrsResult(null);
    setIsAsrsSaved(false);
    localStorage.removeItem(STORAGE_KEY_ASRS_DRAFT);
    setCurrentView('questionnaire');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetASRS = () => {
    if (window.confirm('Deseja limpar as respostas preenchidas na escala ASRS-18 de TDAH?')) {
      setAsrsAnswers({});
      setAsrsResult(null);
      setIsAsrsSaved(false);
      localStorage.removeItem(STORAGE_KEY_ASRS_DRAFT);
      setCurrentView('intro');
    }
  };

  const handleSaveASRSToHistory = () => {
    if (!asrsResult) return;
    try {
      const updated = [asrsResult, ...asrsHistory.filter((h) => h.id !== asrsResult.id)];
      setAsrsHistory(updated);
      localStorage.setItem(STORAGE_KEY_ASRS_HISTORY, JSON.stringify(updated));
      setIsAsrsSaved(true);
    } catch {
      // ignore
    }
  };

  const handleDeleteASRSItem = (id: string) => {
    const updated = asrsHistory.filter((h) => h.id !== id);
    setAsrsHistory(updated);
    localStorage.setItem(STORAGE_KEY_ASRS_HISTORY, JSON.stringify(updated));
  };

  const handleApplyASRSExample = (preset: 'positive5' | 'negative2') => {
    const answers: Record<number, ASRSResponseValue> = {};
    if (preset === 'positive5') {
      // Positive screening (Part A score: 5 / 6)
      // Items 1-3 threshold: algumas_vezes, frequentemente, muito_frequentemente
      // Items 4-6 threshold: frequentemente, muito_frequentemente
      answers[1] = 'muito_frequentemente';
      answers[2] = 'frequentemente';
      answers[3] = 'algumas_vezes';
      answers[4] = 'frequentemente';
      answers[5] = 'muito_frequentemente';
      answers[6] = 'raramente';

      // Part B (items 7 to 18)
      answers[7] = 'frequentemente';
      answers[8] = 'muito_frequentemente';
      answers[9] = 'algumas_vezes';
      answers[10] = 'frequentemente';
      answers[11] = 'muito_frequentemente';
      answers[12] = 'algumas_vezes';
      answers[13] = 'frequentemente';
      answers[14] = 'algumas_vezes';
      answers[15] = 'frequentemente';
      answers[16] = 'muito_frequentemente';
      answers[17] = 'algumas_vezes';
      answers[18] = 'frequentemente';
    } else {
      // Negative screening (Part A score: 2 / 6)
      answers[1] = 'algumas_vezes'; // 1 pt
      answers[2] = 'raramente';     // 0 pt
      answers[3] = 'nunca';         // 0 pt
      answers[4] = 'algumas_vezes'; // 0 pt (threshold starts at frequentemente)
      answers[5] = 'frequentemente';// 1 pt
      answers[6] = 'raramente';     // 0 pt

      // Part B (items 7 to 18)
      answers[7] = 'raramente';
      answers[8] = 'nunca';
      answers[9] = 'raramente';
      answers[10] = 'algumas_vezes';
      answers[11] = 'nunca';
      answers[12] = 'raramente';
      answers[13] = 'algumas_vezes';
      answers[14] = 'nunca';
      answers[15] = 'raramente';
      answers[16] = 'nunca';
      answers[17] = 'raramente';
      answers[18] = 'nunca';
    }
    setAsrsAnswers(answers);
  };

  const handleSelectHistoryASRS = (item: ASRSResult) => {
    setActiveTool('asrs');
    setAsrsResult(item);
    setAsrsAnswers(item.answers);
    setIsAsrsSaved(true);
    setCurrentView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Handlers: Anxiety ---
  const handleAnxietyAnswer = (questionId: number, value: AnxietyResponseValue) => {
    setAnxietyAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleFinishAnxiety = () => {
    const res = calculateAnxietyResult(anxietyAnswers);
    setAnxietyResult(res);
    setIsAnxietySaved(false);
    setCurrentView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetakeAnxiety = () => {
    setAnxietyAnswers({});
    setAnxietyResult(null);
    setIsAnxietySaved(false);
    localStorage.removeItem(STORAGE_KEY_ANS_DRAFT);
    setCurrentView('questionnaire');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetAnxiety = () => {
    if (window.confirm('Deseja limpar as respostas preenchidas no Inventário de Ansiedade?')) {
      setAnxietyAnswers({});
      setAnxietyResult(null);
      setIsAnxietySaved(false);
      localStorage.removeItem(STORAGE_KEY_ANS_DRAFT);
      setCurrentView('intro');
    }
  };

  const handleSaveAnxietyToHistory = () => {
    if (!anxietyResult) return;
    try {
      const updated = [anxietyResult, ...anxietyHistory.filter((h) => h.id !== anxietyResult.id)];
      setAnxietyHistory(updated);
      localStorage.setItem(STORAGE_KEY_ANS_HISTORY, JSON.stringify(updated));
      setIsAnxietySaved(true);
    } catch {
      // ignore
    }
  };

  const handleDeleteAnxietyItem = (id: string) => {
    const updated = anxietyHistory.filter((h) => h.id !== id);
    setAnxietyHistory(updated);
    localStorage.setItem(STORAGE_KEY_ANS_HISTORY, JSON.stringify(updated));
  };

  const handleApplyAnxietyExample = (preset: 'low12' | 'moderate26' | 'higher44' | 'high60') => {
    const answers: Record<number, AnxietyResponseValue> = {};
    if (preset === 'low12') {
      // 12 points total
      ANXIETY_QUESTIONS.forEach((q, idx) => {
        answers[q.id] = idx < 12 ? 'as_vezes' : 'nem_um_pouco'; // 12 * 1 = 12
      });
    } else if (preset === 'moderate26') {
      // 26 points total
      ANXIETY_QUESTIONS.forEach((q, idx) => {
        if (idx < 6) answers[q.id] = 'frequentemente'; // 6 * 2 = 12
        else if (idx < 20) answers[q.id] = 'as_vezes'; // 14 * 1 = 14 -> 26
        else answers[q.id] = 'nem_um_pouco';
      });
    } else if (preset === 'higher44') {
      // 44 points total
      ANXIETY_QUESTIONS.forEach((q, idx) => {
        if (idx < 12) answers[q.id] = 'frequentemente'; // 12 * 2 = 24
        else if (idx < 18) answers[q.id] = 'a_maior_parte'; // 6 * 3 = 18 -> 42
        else if (idx < 20) answers[q.id] = 'as_vezes'; // 2 * 1 = 2 -> 44
        else answers[q.id] = 'nem_um_pouco';
      });
    } else {
      // 60 points total
      ANXIETY_QUESTIONS.forEach((q, idx) => {
        if (idx < 16) answers[q.id] = 'a_maior_parte'; // 16 * 3 = 48
        else if (idx < 22) answers[q.id] = 'frequentemente'; // 6 * 2 = 12 -> 60
        else answers[q.id] = 'nem_um_pouco';
      });
    }
    setAnxietyAnswers(answers);
  };

  // --- Handlers: AQ-50 ---
  const handleAqAnswer = (questionId: number, value: AQResponseValue) => {
    setAqAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleFinishAQ = () => {
    const res = calculateAQResult(aqAnswers);
    setAqResult(res);
    setIsAqSaved(false);
    setCurrentView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetakeAQ = () => {
    setAqAnswers({});
    setAqResult(null);
    setIsAqSaved(false);
    localStorage.removeItem(STORAGE_KEY_AQ_DRAFT);
    setCurrentView('questionnaire');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetAQ = () => {
    if (window.confirm('Deseja limpar as respostas preenchidas no AQ-50?')) {
      setAqAnswers({});
      setAqResult(null);
      setIsAqSaved(false);
      localStorage.removeItem(STORAGE_KEY_AQ_DRAFT);
      setCurrentView('intro');
    }
  };

  const handleSaveAQToHistory = () => {
    if (!aqResult) return;
    try {
      const updated = [aqResult, ...aqHistory.filter((h) => h.id !== aqResult.id)];
      setAqHistory(updated);
      localStorage.setItem(STORAGE_KEY_AQ_HISTORY, JSON.stringify(updated));
      setIsAqSaved(true);
    } catch {
      // ignore
    }
  };

  const handleDeleteAQItem = (id: string) => {
    const updated = aqHistory.filter((h) => h.id !== id);
    setAqHistory(updated);
    localStorage.setItem(STORAGE_KEY_AQ_HISTORY, JSON.stringify(updated));
  };

  const handleApplyAQExample = (preset: 'cutoff29' | 'below26' | 'elevated38') => {
    const answers: Record<number, AQResponseValue> = {};
    if (preset === 'cutoff29') {
      const scoreItems = [
        1, 2, 4, 5, 6, 7, 9, 12, 13, 16, 18, 19, 20, 21, 22, 23, 26,
        3, 8, 10, 11, 14, 15, 17, 24, 25, 27, 28, 29,
      ];
      AQ_QUESTIONS.forEach((q) => {
        if (scoreItems.includes(q.id)) {
          answers[q.id] = q.scoringType === 'agree_scores' ? 'concordo_plenamente' : 'discordo_plenamente';
        } else {
          answers[q.id] = q.scoringType === 'agree_scores' ? 'discordo_plenamente' : 'concordo_plenamente';
        }
      });
    } else if (preset === 'below26') {
      const scoreItems = [1, 2, 4, 5, 6, 7, 9, 12, 13, 16, 3, 8, 10, 11, 14, 15];
      AQ_QUESTIONS.forEach((q) => {
        if (scoreItems.includes(q.id)) {
          answers[q.id] = q.scoringType === 'agree_scores' ? 'concordo_um_pouco' : 'discordo_um_pouco';
        } else {
          answers[q.id] = q.scoringType === 'agree_scores' ? 'discordo_um_pouco' : 'concordo_um_pouco';
        }
      });
    } else {
      const nonScoreItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      AQ_QUESTIONS.forEach((q) => {
        if (!nonScoreItems.includes(q.id)) {
          answers[q.id] = q.scoringType === 'agree_scores' ? 'concordo_plenamente' : 'discordo_plenamente';
        } else {
          answers[q.id] = q.scoringType === 'agree_scores' ? 'discordo_plenamente' : 'concordo_plenamente';
        }
      });
    }
    setAqAnswers(answers);
  };

  // --- Handlers: CBI Burnout ---
  const handleCbiAnswer = (questionId: number, value: ResponseValue) => {
    setCbiAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleFinishCBI = () => {
    const res = calculateFullResults(cbiAnswers, clientWorkApplicable);
    setCbiResult(res);
    setIsCbiSaved(false);
    setCurrentView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetakeCBI = () => {
    setCbiAnswers({});
    setCbiResult(null);
    setIsCbiSaved(false);
    localStorage.removeItem(STORAGE_KEY_CBI_DRAFT);
    setCurrentView('questionnaire');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetCBI = () => {
    if (window.confirm('Deseja limpar as respostas preenchidas no CBI de Burnout?')) {
      setCbiAnswers({});
      setCbiResult(null);
      setIsCbiSaved(false);
      localStorage.removeItem(STORAGE_KEY_CBI_DRAFT);
      setCurrentView('intro');
    }
  };

  const handleSaveCBIToHistory = () => {
    if (!cbiResult) return;
    try {
      const updated = [cbiResult, ...cbiHistory.filter((h) => h.id !== cbiResult.id)];
      setCbiHistory(updated);
      localStorage.setItem(STORAGE_KEY_CBI_HISTORY, JSON.stringify(updated));
      setIsCbiSaved(true);
    } catch {
      // ignore
    }
  };

  const handleDeleteCBIItem = (id: string) => {
    const updated = cbiHistory.filter((h) => h.id !== id);
    setCbiHistory(updated);
    localStorage.setItem(STORAGE_KEY_CBI_HISTORY, JSON.stringify(updated));
  };

  const handleClearAllHistory = () => {
    if (window.confirm('Tem certeza de que deseja apagar todo o histórico de triagens salvas?')) {
      setDepressionHistory([]);
      setAsrsHistory([]);
      setAnxietyHistory([]);
      setAqHistory([]);
      setCbiHistory([]);
      localStorage.removeItem(STORAGE_KEY_DEP_HISTORY);
      localStorage.removeItem(STORAGE_KEY_ASRS_HISTORY);
      localStorage.removeItem(STORAGE_KEY_ANS_HISTORY);
      localStorage.removeItem(STORAGE_KEY_AQ_HISTORY);
      localStorage.removeItem(STORAGE_KEY_CBI_HISTORY);
    }
  };

  const handleApplyCBIExample = (preset: 'userExample' | 'mild' | 'severe') => {
    if (preset === 'userExample') {
      setClientWorkApplicable(true);
      setCbiAnswers({
        1: 'muitas_vezes',
        7: 'sempre',
        12: 'sempre',
        16: 'muitas_vezes',
        18: 'muitas_vezes',
        19: 'as_vezes',
        2: 'muitas_vezes',
        5: 'raramente',
        6: 'as_vezes',
        8: 'raramente',
        14: 'as_vezes',
        15: 'raramente',
        17: 'raramente',
        3: 'sempre',
        4: 'muitas_vezes',
        9: 'sempre',
        10: 'muitas_vezes',
        11: 'muitas_vezes',
        13: 'as_vezes',
      });
    } else if (preset === 'mild') {
      const mildAnswers: Record<number, ResponseValue> = {};
      CBI_QUESTIONS.forEach((q) => {
        mildAnswers[q.id] = q.isReversed ? 'sempre' : 'raramente';
      });
      mildAnswers[1] = 'nunca';
      mildAnswers[8] = 'nunca';
      mildAnswers[16] = 'nunca';
      setCbiAnswers(mildAnswers);
    } else {
      const severeAnswers: Record<number, ResponseValue> = {};
      CBI_QUESTIONS.forEach((q) => {
        severeAnswers[q.id] = q.isReversed ? 'nunca' : 'sempre';
      });
      severeAnswers[4] = 'muitas_vezes';
      severeAnswers[18] = 'muitas_vezes';
      setCbiAnswers(severeAnswers);
    }
  };

  const handleSelectHistoryAnxiety = (item: AnxietyResult) => {
    setActiveTool('ansiedade');
    setAnxietyResult(item);
    setAnxietyAnswers(item.answers);
    setIsAnxietySaved(true);
    setCurrentView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectHistoryAQ = (item: AQResult) => {
    setActiveTool('aq50');
    setAqResult(item);
    setAqAnswers(item.answers);
    setIsAqSaved(true);
    setCurrentView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectHistoryCBI = (item: ScreeningResult) => {
    setActiveTool('burnout');
    setCbiResult(item);
    setCbiAnswers(item.answers);
    setClientWorkApplicable(item.clientWorkApplicable);
    setIsCbiSaved(true);
    setCurrentView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTool = (tool: ActiveTool) => {
    setActiveTool(tool);
    setCurrentView('intro');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectToolFromHub = (tool: ActiveTool, view: 'intro' | 'questionnaire' = 'intro') => {
    setActiveTool(tool);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Tool statistics for hub overview cards
  const toolStats = useMemo(() => {
    return {
      depressao: {
        answered: Object.keys(depressionAnswers).length,
        total: DEPRESSION_QUESTIONS.length,
        completed: depressionResult !== null,
        score: depressionResult?.totalScore,
      },
      asrs: {
        answered: Object.keys(asrsAnswers).length,
        total: ASRS_QUESTIONS.length,
        completed: asrsResult !== null,
        score: asrsResult?.partAScore,
      },
      ansiedade: {
        answered: Object.keys(anxietyAnswers).length,
        total: ANXIETY_QUESTIONS.length,
        completed: anxietyResult !== null,
        score: anxietyResult?.totalScore,
      },
      aq50: {
        answered: Object.keys(aqAnswers).length,
        total: AQ_QUESTIONS.length,
        completed: aqResult !== null,
        score: aqResult?.totalScore,
      },
      burnout: {
        answered: Object.keys(cbiAnswers).filter((id) =>
          activeCBIQuestions.some((q) => q.id === Number(id))
        ).length,
        total: activeCBIQuestions.length,
        completed: cbiResult !== null,
        score: cbiResult ? Math.round(cbiResult.dimensions.pessoal.score) : undefined,
      },
    };
  }, [
    depressionAnswers,
    depressionResult,
    asrsAnswers,
    asrsResult,
    anxietyAnswers,
    anxietyResult,
    aqAnswers,
    aqResult,
    cbiAnswers,
    cbiResult,
    activeCBIQuestions,
  ]);

  // Counts based on active tool
  const currentTotal =
    activeTool === 'depressao'
      ? DEPRESSION_QUESTIONS.length
      : activeTool === 'asrs'
      ? ASRS_QUESTIONS.length
      : activeTool === 'ansiedade'
      ? ANXIETY_QUESTIONS.length
      : activeTool === 'aq50'
      ? AQ_QUESTIONS.length
      : activeCBIQuestions.length;

  const currentAnswered =
    activeTool === 'depressao'
      ? Object.keys(depressionAnswers).length
      : activeTool === 'asrs'
      ? Object.keys(asrsAnswers).length
      : activeTool === 'ansiedade'
      ? Object.keys(anxietyAnswers).length
      : activeTool === 'aq50'
      ? Object.keys(aqAnswers).length
      : Object.keys(cbiAnswers).filter((id) => activeCBIQuestions.some((q) => q.id === Number(id))).length;

  return (
    <div className="min-h-screen text-[#3d3d3d] flex flex-col font-sans selection:bg-[#c8a08a]/30 relative">
      {/* Background Floating Glass Shapes */}
      <div className="bg-glass-container no-print" aria-hidden="true">
        <div className="bg-glass-shape bg-glass-1" />
        <div className="bg-glass-shape bg-glass-2" />
        <div className="bg-glass-shape bg-glass-3" />
        <div className="bg-glass-shape bg-glass-4" />
      </div>

      {/* Top Announcement Bar */}
      <div className="announcement-bar no-print">
        {currentView === 'hub'
          ? 'THAIS RODRIGUES · CRP 08/40838 · TRIAGEM NÃO É DIAGNÓSTICO · RESULTADOS NÃO SUBSTITUEM AVALIAÇÃO CLÍNICA'
          : activeTool === 'depressao'
          ? 'TRIAGEM NÃO É DIAGNÓSTICO · O RESULTADO NÃO ESTABELECE DIAGNÓSTICO E NÃO SUBSTITUI AVALIAÇÃO CLÍNICA'
          : activeTool === 'asrs'
          ? 'TRIAGEM NÃO É DIAGNÓSTICO · O ASRS-18 É UM INSTRUMENTO DE RASTREIO E NÃO SUBSTITUI AVALIAÇÃO CLÍNICA'
          : activeTool === 'ansiedade'
          ? 'TRIAGEM NÃO É DIAGNÓSTICO · O RESULTADO NÃO ESTABELECE DIAGNÓSTICO E NÃO SUBSTITUI AVALIAÇÃO CLÍNICA'
          : activeTool === 'aq50'
          ? 'TRIAGEM NÃO É DIAGNÓSTICO · O AQ-50 NÃO SUBSTITUI AVALIAÇÃO PSICOLÓGICA OU NEUROPSICOLÓGICA'
          : 'TRIAGEM NÃO É DIAGNÓSTICO · OS RESULTADOS NÃO SUBSTITUEM AVALIAÇÃO MÉDICA OU PSICOLÓGICA'}
      </div>

      {/* Header with Tool Switcher */}
      <Header
        activeTool={activeTool}
        onSelectTool={handleSelectTool}
        currentView={currentView}
        answeredCount={currentAnswered}
        totalQuestions={currentTotal}
        onNavigate={(view) => {
          if (view === 'results') {
            if (activeTool === 'depressao') {
              if (!depressionResult) handleFinishDepression();
            } else if (activeTool === 'asrs') {
              if (!asrsResult) handleFinishASRS();
            } else if (activeTool === 'ansiedade') {
              if (!anxietyResult) handleFinishAnxiety();
            } else if (activeTool === 'aq50') {
              if (!aqResult) handleFinishAQ();
            } else {
              if (!cbiResult) handleFinishCBI();
            }
          } else {
            setCurrentView(view);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenEducation={() => setIsEducationOpen(true)}
        onReset={
          activeTool === 'depressao'
            ? handleResetDepression
            : activeTool === 'asrs'
            ? handleResetASRS
            : activeTool === 'ansiedade'
            ? handleResetAnxiety
            : activeTool === 'aq50'
            ? handleResetAQ
            : handleResetCBI
        }
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 relative z-10 pt-2 sm:pt-4">
        {/* === CLINICAL HUB (THAIS RODRIGUES PORTAL) === */}
        {currentView === 'hub' && (
          <ClinicalHub
            onSelectTool={handleSelectToolFromHub}
            onOpenEducation={() => setIsEducationOpen(true)}
            onOpenHistory={() => setIsHistoryOpen(true)}
            onOpenSchedule={(tool) => {
              if (tool) setActiveTool(tool);
              setIsScheduleOpen(true);
            }}
            toolStats={toolStats}
            savedCount={
              depressionHistory.length +
              asrsHistory.length +
              anxietyHistory.length +
              aqHistory.length +
              cbiHistory.length
            }
          />
        )}

        {/* === DEPRESSÃO TOOL === */}
        {currentView !== 'hub' && activeTool === 'depressao' && (
          <>
            {currentView === 'intro' && (
              <DepressionHeroIntro
                onStart={() => {
                  setCurrentView('questionnaire');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenEducation={() => setIsEducationOpen(true)}
                totalAnswered={currentAnswered}
              />
            )}

            {currentView === 'questionnaire' && (
              <DepressionQuestionnaire
                questions={DEPRESSION_QUESTIONS}
                answers={depressionAnswers}
                onAnswer={handleDepressionAnswer}
                onFinish={handleFinishDepression}
                onReset={() => setDepressionAnswers({})}
                onApplyExample={handleApplyDepressionExample}
              />
            )}

            {currentView === 'results' && depressionResult && (
              <DepressionResultsView
                result={depressionResult}
                onRetake={handleRetakeDepression}
                onSaveToHistory={handleSaveDepressionToHistory}
                isSaved={isDepressionSaved}
                onOpenSchedule={() => setIsScheduleOpen(true)}
              />
            )}
          </>
        )}
        {/* === TDAH (ASRS-18) TOOL === */}
        {currentView !== 'hub' && activeTool === 'asrs' && (
          <>
            {currentView === 'intro' && (
              <ASRSHeroIntro
                onStart={() => {
                  setCurrentView('questionnaire');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenEducation={() => setIsEducationOpen(true)}
                totalAnswered={currentAnswered}
              />
            )}

            {currentView === 'questionnaire' && (
              <ASRSQuestionnaire
                questions={ASRS_QUESTIONS}
                answers={asrsAnswers}
                onAnswer={handleAsrsAnswer}
                onFinish={handleFinishASRS}
                onReset={() => setAsrsAnswers({})}
                onApplyExample={handleApplyASRSExample}
              />
            )}

            {currentView === 'results' && asrsResult && (
              <ASRSResultsView
                result={asrsResult}
                onRetake={handleRetakeASRS}
                onSaveToHistory={handleSaveASRSToHistory}
                isSaved={isAsrsSaved}
                onOpenSchedule={() => setIsScheduleOpen(true)}
              />
            )}
          </>
        )}
        {/* === ANSIEDADE TOOL === */}
        {currentView !== 'hub' && activeTool === 'ansiedade' && (
          <>
            {currentView === 'intro' && (
              <AnxietyHeroIntro
                onStart={() => {
                  setCurrentView('questionnaire');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenEducation={() => setIsEducationOpen(true)}
                totalAnswered={currentAnswered}
              />
            )}

            {currentView === 'questionnaire' && (
              <AnxietyQuestionnaire
                questions={ANXIETY_QUESTIONS}
                answers={anxietyAnswers}
                onAnswer={handleAnxietyAnswer}
                onFinish={handleFinishAnxiety}
                onReset={() => setAnxietyAnswers({})}
                onApplyExample={handleApplyAnxietyExample}
              />
            )}

            {currentView === 'results' && anxietyResult && (
              <AnxietyResultsView
                result={anxietyResult}
                onRetake={handleRetakeAnxiety}
                onSaveToHistory={handleSaveAnxietyToHistory}
                isSaved={isAnxietySaved}
                onOpenSchedule={() => setIsScheduleOpen(true)}
              />
            )}
          </>
        )}

        {/* === AQ-50 TOOL === */}
        {currentView !== 'hub' && activeTool === 'aq50' && (
          <>
            {currentView === 'intro' && (
              <AQHeroIntro
                onStart={() => {
                  setCurrentView('questionnaire');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenEducation={() => setIsEducationOpen(true)}
                totalAnswered={currentAnswered}
              />
            )}

            {currentView === 'questionnaire' && (
              <AQQuestionnaire
                questions={AQ_QUESTIONS}
                answers={aqAnswers}
                onAnswer={handleAqAnswer}
                onFinish={handleFinishAQ}
                onReset={() => setAqAnswers({})}
                onApplyExample={handleApplyAQExample}
              />
            )}

            {currentView === 'results' && aqResult && (
              <AQResultsView
                result={aqResult}
                onRetake={handleRetakeAQ}
                onSaveToHistory={handleSaveAQToHistory}
                isSaved={isAqSaved}
                onOpenSchedule={() => setIsScheduleOpen(true)}
              />
            )}
          </>
        )}

        {/* === BURNOUT CBI TOOL === */}
        {currentView !== 'hub' && activeTool === 'burnout' && (
          <>
            {currentView === 'intro' && (
              <HeroIntro
                onStart={() => {
                  setCurrentView('questionnaire');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                clientWorkApplicable={clientWorkApplicable}
                onToggleClientWork={(applicable) => setClientWorkApplicable(applicable)}
                onOpenEducation={() => setIsEducationOpen(true)}
                totalAnswered={currentAnswered}
              />
            )}

            {currentView === 'questionnaire' && (
              <Questionnaire
                questions={activeCBIQuestions}
                answers={cbiAnswers}
                onAnswer={handleCbiAnswer}
                onFinish={handleFinishCBI}
                onReset={() => setCbiAnswers({})}
                onApplyExample={handleApplyCBIExample}
              />
            )}

            {currentView === 'results' && cbiResult && (
              <ResultsView
                result={cbiResult}
                onRetake={handleRetakeCBI}
                onSaveToHistory={handleSaveCBIToHistory}
                isSaved={isCbiSaved}
                onOpenEducation={() => setIsEducationOpen(true)}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#efe6dd] py-10 mt-20 bg-[#ffffff]/80 backdrop-blur-md text-[#6b6b6b] text-xs no-print relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="font-serif text-base font-semibold text-[#2d2d2d]">
              Thais Rodrigues
            </span>
            <span className="hidden sm:inline text-[#c8a08a]" aria-hidden="true">·</span>
            <span>Psicóloga & Neuropsicóloga (CRP 08/40838) · TCC & Neuropsicologia</span>
          </div>

          <div className="flex items-center gap-5 text-[#6b6b6b]">
            <button
              onClick={() => {
                setCurrentView('hub');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#7b7b56] text-underline-animated cursor-pointer font-medium"
            >
              Menu de Triagens
            </button>
            <span aria-hidden="true" className="text-[#efe6dd]">|</span>
            <button
              onClick={() => setIsEducationOpen(true)}
              className="hover:text-[#7b7b56] text-underline-animated cursor-pointer font-medium"
            >
              Metodologia & Validação
            </button>
            <span aria-hidden="true" className="text-[#efe6dd]">|</span>
            <button
              onClick={() => setIsHistoryOpen(true)}
              className="hover:text-[#7b7b56] text-underline-animated cursor-pointer font-medium"
            >
              Histórico ({depressionHistory.length + asrsHistory.length + anxietyHistory.length + aqHistory.length + cbiHistory.length})
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <EducationalModal
        isOpen={isEducationOpen}
        onClose={() => setIsEducationOpen(false)}
        initialTab={activeTool}
      />

      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        depressionHistory={depressionHistory}
        asrsHistory={asrsHistory}
        anxietyHistory={anxietyHistory}
        aqHistory={aqHistory}
        cbiHistory={cbiHistory}
        onSelectDepressionResult={handleSelectHistoryDepression}
        onSelectASRSResult={handleSelectHistoryASRS}
        onSelectAnxietyResult={handleSelectHistoryAnxiety}
        onSelectAQResult={handleSelectHistoryAQ}
        onSelectCBIResult={handleSelectHistoryCBI}
        onDeleteDepressionResult={handleDeleteDepressionItem}
        onDeleteASRSResult={handleDeleteASRSItem}
        onDeleteAnxietyResult={handleDeleteAnxietyItem}
        onDeleteAQResult={handleDeleteAQItem}
        onDeleteCBIResult={handleDeleteCBIItem}
        onClearHistory={handleClearAllHistory}
      />

      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        toolType={activeTool}
        score={
          activeTool === 'depressao'
            ? depressionResult?.totalScore
            : activeTool === 'asrs'
            ? asrsResult?.partAScore
            : activeTool === 'ansiedade'
            ? anxietyResult?.totalScore
            : activeTool === 'aq50'
            ? aqResult?.totalScore
            : undefined
        }
        maxScore={
          activeTool === 'depressao'
            ? 57
            : activeTool === 'asrs'
            ? 6
            : activeTool === 'ansiedade'
            ? 72
            : activeTool === 'aq50'
            ? 50
            : 100
        }
        protocolId={
          activeTool === 'depressao'
            ? depressionResult?.id
            : activeTool === 'asrs'
            ? asrsResult?.id
            : activeTool === 'ansiedade'
            ? anxietyResult?.id
            : activeTool === 'aq50'
            ? aqResult?.id
            : cbiResult?.id
        }
      />
    </div>
  );
}
