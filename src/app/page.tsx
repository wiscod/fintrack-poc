"use client";

import React, { useState } from "react";
import {
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  Smartphone,
  Monitor,
  Wallet,
  PiggyBank,
  RefreshCw,
  Sparkles,
  Briefcase,
  User,
  ArrowUpRight,
  ArrowDownLeft,
  Terminal,
  Lock,
  Trash2,
  ChevronRight,
  ChevronLeft,
  Zap,
  Check,
  X,
  Building2,
  ArrowRight
} from "lucide-react";

interface Transaction {
  id: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  type: "expense" | "income";
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: "1", name: "Virement Client / Salaire", category: "Revenus", date: "01 Sept", amount: 2100, type: "income" },
  { id: "2", name: "Réserve Épargne Automatique", category: "Épargne", date: "02 Sept", amount: 500, type: "expense" },
  { id: "3", name: "Loyer & Charges Résidence", category: "Logement", date: "03 Sept", amount: 820, type: "expense" },
  { id: "4", name: "Courses Carrefour Market", category: "Alimentation", date: "08 Sept", amount: 180, type: "expense" },
  { id: "5", name: "Pass Navigo Transports", category: "Mobilité", date: "12 Sept", amount: 86.4, type: "expense" },
  { id: "6", name: "Spotify & Netflix", category: "Loisirs", date: "15 Sept", amount: 28.6, type: "expense" },
  { id: "7", name: "Restaurant & Sorties", category: "Loisirs", date: "18 Sept", amount: 75, type: "expense" },
];

interface StrengthPoint {
  id: number;
  title: string;
  tabLabel: string;
  badge: string;
  shortDesc: string;
  traditionalProblem: string;
  fintrackBreakthrough: string;
  presenters: string;
  mode: "b2c" | "freelance";
}

const STRENGTHS: StrengthPoint[] = [
  {
    id: 1,
    title: "IA Prédictive & Proactive à 30 Jours (J-6)",
    tabLabel: "1. IA Prédictive J-6",
    badge: "Anticipation vs Constat",
    shortDesc: "Modèle ML anticipant le découvert 6 jours avant l'échéance critique du prélèvement EDF.",
    traditionalProblem: "Banques traditionnelles : constatent le découvert après coup et facturent 45 € d'agios et commissions.",
    fintrackBreakthrough: "FinTrack : prédiction temporelle continue (séries temporelles) alertant à J-6 pour agir avant l'incident.",
    presenters: "Super Abel TCHOUFONG (CTO) & Rayan Trevis (Dev)",
    mode: "b2c"
  },
  {
    id: 2,
    title: "Actionnabilité en 1 Clic (Gain Financier Réel)",
    tabLabel: "2. Action 1-Clic (+60 €)",
    badge: "Résolution Immédiate",
    shortDesc: "Micro-arbitrage indolore depuis l'épargne disponible pour sécuriser le solde à +15 €.",
    traditionalProblem: "Apps bancaires & agrégateurs : graphiques passifs anxiogènes sans aucune solution concrète d'action.",
    fintrackBreakthrough: "FinTrack : exécution instantanée d'un virement de 60 € ➔ solde sécurisé et économie nette de 45 € d'agios.",
    presenters: "Randy Neil TCHIMKIO (UX) & Super Abel (CTO)",
    mode: "b2c"
  },
  {
    id: 3,
    title: "Module Hybride Freelance (Tirelire Fiscale)",
    tabLabel: "3. Tirelire Freelance",
    badge: "Sanctuarisation Fiscale",
    shortDesc: "Isolation automatique URSSAF (22%) et TVA (20%) sur sous-comptes pour révéler le vrai net.",
    traditionalProblem: "Gestion freelance classique : risque d'impôt impayé, trésorerie mélangée et anxiété de fin de trimestre.",
    fintrackBreakthrough: "FinTrack : sanctuarisation instantanée de 935 € URSSAF et 850 € TVA ➔ le freelance sait qu'il lui reste 2 465 € nets.",
    presenters: "Duval NGUEDIA (DAF) & Hassâne ABACE (RH)",
    mode: "freelance"
  },
  {
    id: 4,
    title: "Open Banking DSP2 Certifié (Zero Login Storage)",
    tabLabel: "4. Open Banking DSP2",
    badge: "Connectivité Bancaire",
    shortDesc: "Agrégation temps réel via Bridge (Groupe BPCE) avec authentification forte OAuth2.",
    traditionalProblem: "Ancien scraping bancaire : stockage d'identifiants et codes secrets en clair, risques massifs de fuite.",
    fintrackBreakthrough: "FinTrack : flux API officiels européens DSP2 ➔ zéro identifiant stocké sur nos serveurs.",
    presenters: "Rayan Trevis (Dev) & Edy Wise DJIHOUA (Sécurité)",
    mode: "b2c"
  },
  {
    id: 5,
    title: "Cybersécurité Souveraine & Droit à l'Oubli",
    tabLabel: "5. Sécurité & RGPD",
    badge: "Souveraineté & Art. 17",
    shortDesc: "Chiffrement AES-256 HSM, hébergement français OVHcloud et Crypto-Shredding interactif.",
    traditionalProblem: "Acteurs US & fintechs : profilage publicitaire, monétisation des flux et rétention abusive des données.",
    fintrackBreakthrough: "FinTrack : architecture Zero-Knowledge (identité ≠ solde) et destruction mathématique irréversible des clés.",
    presenters: "Edy Wise DJIHOUA (Ingénieur Cybersécurité & DPO)",
    mode: "b2c"
  }
];

export default function FinTrackPOC() {
  const [mode, setMode] = useState<"b2c" | "freelance">("b2c");
  const [viewMode, setViewMode] = useState<"phone" | "fullscreen">("phone");
  const [isResolved, setIsResolved] = useState<boolean>(false);
  const [showSecurityConsole, setShowSecurityConsole] = useState<boolean>(false);
  const [isKeyDestroyed, setIsKeyDestroyed] = useState<boolean>(false);

  const [activeStrengthId, setActiveStrengthId] = useState<number | null>(1);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(true);

  // Exact live financial logic
  const baseBalance = 410.0;
  const initialSavings = 2850.0;
  const transferAmount = 60.0;
  const fixedPending = 455.0;

  const currentBalance = isResolved ? baseBalance + transferAmount : baseBalance;
  const currentSavings = isResolved ? initialSavings - transferAmount : initialSavings;
  const projectedEndOfMonth = currentBalance - fixedPending; // -45 € vs +15 €

  // Freelance exact figures
  const freelanceBilled = 4250;
  const urssafReserve = 935; // 22% of 4250
  const tvaReserve = 850; // 20% of 4250
  const netAvailableFreelance = freelanceBilled - urssafReserve - tvaReserve; // 2465 €

  const handleReset = () => {
    setIsResolved(false);
    setIsKeyDestroyed(false);
  };

  const handleSelectStrength = (id: number) => {
    setActiveStrengthId(id);
    setIsGuideOpen(true);
    const s = STRENGTHS.find((item) => item.id === id);
    if (s) {
      if (s.mode === "freelance") {
        setMode("freelance");
      } else {
        setMode("b2c");
      }
      if (s.id === 5) {
        setShowSecurityConsole(true);
      } else {
        setShowSecurityConsole(false);
      }
    }
  };

  const handleNextStrength = () => {
    if (activeStrengthId === null) {
      handleSelectStrength(1);
    } else {
      const nextId = activeStrengthId < 5 ? activeStrengthId + 1 : 1;
      handleSelectStrength(nextId);
    }
  };

  const handlePrevStrength = () => {
    if (activeStrengthId === null) {
      handleSelectStrength(1);
    } else {
      const prevId = activeStrengthId > 1 ? activeStrengthId - 1 : 5;
      handleSelectStrength(prevId);
    }
  };

  const currentStrength = STRENGTHS.find((s) => s.id === activeStrengthId);

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900 relative">
      
      {/* Subtile ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-emerald-100/40 via-teal-50/20 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Top Header Navigation (Apple / Stripe style) */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-xl px-4 sm:px-6 py-3 transition-colors">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          
          {/* Brand Logo & Presentation Tag */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center font-black text-white text-sm shadow-md shadow-emerald-500/20">
              FT
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm tracking-tight text-slate-900">FINTRACK</span>
                <span className="px-2 py-0.5 text-[10px] rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold tracking-wide">
                  LIVE DEMO
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Copilote Financier Prédictif • ÉSTIAM StartUp&apos;IT 2026
              </p>
            </div>
          </div>

          {/* Quick Action Controls */}
          <div className="flex items-center gap-2.5">
            
            {/* Guide Toggle Button */}
            <button
              onClick={() => setIsGuideOpen(!isGuideOpen)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border text-xs font-semibold transition cursor-pointer ${
                isGuideOpen
                  ? "bg-emerald-50 text-emerald-800 border-emerald-300 shadow-xs"
                  : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-xs"
              }`}
              title="Afficher/Masquer le guide des points forts du projet"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Points Forts</span>
            </button>

            {/* Mode Switcher: Particulier vs Freelance */}
            <div className="flex bg-slate-100/90 p-1 rounded-2xl border border-slate-200/80 shadow-inner">
              <button
                onClick={() => setMode("b2c")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  mode === "b2c"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <User className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline">Particulier</span>
              </button>
              <button
                onClick={() => setMode("freelance")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  mode === "freelance"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden sm:inline">Freelance</span>
              </button>
            </div>

            {/* Device View: Phone vs Fullscreen */}
            <div className="hidden md:flex bg-slate-100/90 p-1 rounded-2xl border border-slate-200/80">
              <button
                onClick={() => setViewMode("phone")}
                className={`p-1.5 rounded-xl transition-all duration-200 cursor-pointer ${
                  viewMode === "phone" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
                }`}
                title="Format Smartphone"
              >
                <Smartphone className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("fullscreen")}
                className={`p-1.5 rounded-xl transition-all duration-200 cursor-pointer ${
                  viewMode === "fullscreen" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
                }`}
                title="Format Plein Écran"
              >
                <Monitor className="w-4 h-4" />
              </button>
            </div>

            {/* Security Console Trigger (Edy Wise DJIHOUA) */}
            <button
              onClick={() => setShowSecurityConsole(!showSecurityConsole)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border text-xs font-semibold transition cursor-pointer ${
                showSecurityConsole
                  ? "bg-teal-50 text-teal-800 border-teal-300 shadow-xs"
                  : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-xs"
              }`}
              title="Console Cybersécurité & RGPD"
            >
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span className="hidden sm:inline">Sécurité DPO</span>
            </button>

          </div>

        </div>
      </header>

      {/* ⭐ INTERACTIVE SHOWCASE OF PROJECT STRENGTHS (Guide Soutenance Jury - Light Mode Aéré) */}
      {isGuideOpen && (
        <section className="w-full bg-white border-b border-slate-200/80 py-5 px-4 sm:px-6 shadow-xs">
          <div className="max-w-5xl mx-auto flex flex-col gap-4">
            
            {/* Top Bar with Tabs and Stepper */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Points Forts du Projet
                </span>
                <span className="text-xs text-slate-500 hidden md:inline">
                  (Cliquez sur un point fort pour l&apos;activer en direct dans l&apos;interface)
                </span>
              </div>

              {/* Stepper Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrevStrength}
                  className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                  title="Point précédent"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono font-bold text-slate-900 px-2">
                  {activeStrengthId || 1} / 5
                </span>
                <button
                  onClick={handleNextStrength}
                  className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                  title="Point suivant"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsGuideOpen(false)}
                  className="ml-2 text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100"
                  title="Masquer le guide"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 5 Points Forts Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
              {STRENGTHS.map((st) => {
                const isCurrent = activeStrengthId === st.id;
                return (
                  <button
                    key={st.id}
                    onClick={() => handleSelectStrength(st.id)}
                    className={`p-3.5 rounded-2xl text-left transition-all duration-200 border cursor-pointer flex flex-col justify-between gap-2 ${
                      isCurrent
                        ? "bg-emerald-50/90 border-emerald-400 ring-2 ring-emerald-500/20 shadow-sm"
                        : "bg-slate-50/70 hover:bg-slate-100 border-slate-200/80 text-slate-600"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold tracking-tight uppercase ${isCurrent ? "text-emerald-700" : "text-slate-400"}`}>
                        {st.badge}
                      </span>
                      {isCurrent && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
                    </div>
                    <span className={`text-xs font-bold leading-snug line-clamp-2 ${isCurrent ? "text-slate-900" : "text-slate-700"}`}>
                      {st.tabLabel}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Strength Detailed Comparative Callout */}
            {currentStrength && (
              <div className="mt-2 p-5 rounded-3xl bg-slate-50/80 border border-slate-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 text-xs">
                
                {/* Left side: Context & Presenter */}
                <div className="space-y-1.5 md:max-w-md">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
                      {currentStrength.title}
                    </h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-xs">
                    {currentStrength.shortDesc}
                  </p>
                  <div className="text-[11px] text-slate-500 pt-1">
                    🎤 <span className="text-slate-800 font-semibold">Orateurs démo :</span> {currentStrength.presenters}
                  </div>
                </div>

                {/* Right side: Traditional vs FinTrack Breakthrough */}
                <div className="w-full md:w-auto flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  
                  {/* Traditional Market problem */}
                  <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200/80 text-slate-800">
                    <span className="text-rose-700 font-bold block text-[10px] uppercase tracking-wider mb-1">
                      ❌ Banques Traditionnelles
                    </span>
                    <p className="leading-relaxed text-[11px] text-rose-950">{currentStrength.traditionalProblem}</p>
                  </div>

                  {/* FinTrack Innovation */}
                  <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 text-slate-900">
                    <span className="text-emerald-700 font-bold block text-[10px] uppercase tracking-wider mb-1">
                      ✓ Rupture FinTrack
                    </span>
                    <p className="leading-relaxed text-[11px] text-emerald-950 font-medium">{currentStrength.fintrackBreakthrough}</p>
                  </div>

                </div>

              </div>
            )}

          </div>
        </section>
      )}

      {/* Main Container Area */}
      <div className="flex-1 w-full max-w-5xl mx-auto p-4 sm:p-6 md:py-8 flex flex-col items-center justify-start">
        
        {/* Scenario Status Pill */}
        <div className="w-full max-w-md mb-6 flex items-center justify-between px-4 py-2.5 bg-white border border-slate-200/80 rounded-2xl text-xs shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className={`w-2.5 h-2.5 rounded-full ${isResolved ? "bg-emerald-500" : "bg-rose-500 animate-ping"}`} />
            <span className="text-slate-700 font-semibold">
              {isResolved ? "Scénario résolu (+15 € fin de mois sécurisée)" : "Alerte proactive J-6 : Risque découvert (-45 €)"}
            </span>
          </div>
          {isResolved && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-bold transition cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Rejouer</span>
            </button>
          )}
        </div>

        {/* Device Frame (Apple iPhone / Wallet Ergonomics) */}
        <div
          className={`w-full transition-all duration-300 ${
            viewMode === "phone"
              ? "max-w-md rounded-[48px] border-[8px] border-slate-200 bg-white shadow-[0_25px_60px_-15px_rgba(15,23,42,0.12),0_0_0_1px_rgba(15,23,42,0.04)] overflow-hidden"
              : "max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-xl"
          }`}
        >
          {/* Dynamic Island Header (Phone Mode) */}
          {viewMode === "phone" && (
            <div className="pt-3.5 px-8 pb-3 flex items-center justify-between text-xs font-semibold text-slate-600 select-none bg-white">
              <span>09:41</span>
              <div className="w-24 h-5 bg-slate-900 rounded-full flex items-center justify-end px-2.5 gap-1.5">
                <div className="w-2 h-2 rounded-full bg-slate-800" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold">5G</span>
                <div className="w-4 h-2.5 border border-slate-400 rounded-xs p-0.5 flex items-center">
                  <div className="w-full h-full bg-emerald-500 rounded-3xs" />
                </div>
              </div>
            </div>
          )}

          {/* App Body Content (Spacieux, Aéré, Lumineux) */}
          <div className="p-5 sm:p-7 flex flex-col gap-6">
            
            {/* User Greeting & Open Banking Badge (Point Fort #4 Highlight) */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400">Bonjour Maxime 👋</p>
                <h1 className="text-lg font-black text-slate-900 tracking-tight mt-0.5">
                  {mode === "b2c" ? "Vue Budgétaire Proactive" : "Espace Trésorerie Freelance"}
                </h1>
              </div>
              
              {/* Point Fort 4 Badge: DSP2 */}
              <button
                onClick={() => handleSelectStrength(4)}
                className={`px-3 py-1.5 rounded-full border flex items-center gap-1.5 transition cursor-pointer ${
                  activeStrengthId === 4
                    ? "bg-teal-50 border-teal-400 text-teal-800 ring-2 ring-teal-500/20 shadow-xs"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
                title="Cliquer pour voir le Point Fort #4 : Open Banking DSP2"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-bold">DSP2 Connecté</span>
                <span className="text-[10px] px-1 rounded bg-teal-100 text-teal-800 font-mono font-semibold">#4</span>
              </button>
            </div>

            {/* Hero Card: Solde & Reste à Vivre Prédictif (Apple Wallet Style) */}
            <div className={`relative overflow-hidden rounded-3xl bg-white border p-6 sm:p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 ${
              activeStrengthId === 2
                ? "border-emerald-400 ring-4 ring-emerald-500/10 shadow-lg shadow-emerald-500/5"
                : "border-slate-200/90"
            }`}>
              
              {/* Top metadata */}
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                  <Wallet className="w-4 h-4 text-emerald-600" />
                  Solde Courant
                </span>
                <span className="text-[11px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg font-medium border border-slate-200/60">
                  Banque Principale (BPCE)
                </span>
              </div>

              {/* Big Clean Balance */}
              <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight my-2 tabular-nums">
                {currentBalance.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
              </div>

              {/* Split Sub-Cards: Epargne & Reste a Vivre */}
              <div className="grid grid-cols-2 gap-3.5 pt-5 mt-5 border-t border-slate-100">
                
                {/* Epargne Reserve */}
                <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-4 flex flex-col">
                  <span className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                    <PiggyBank className="w-4 h-4 text-teal-600" />
                    Réserve Épargne
                  </span>
                  <span className="text-lg font-extrabold text-slate-900 mt-1 tabular-nums">
                    {currentSavings.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5">Disponible sans préavis</span>
                </div>

                {/* Projected Safe-to-Spend Balance */}
                <div className={`rounded-2xl p-4 flex flex-col border transition-all duration-300 ${
                  projectedEndOfMonth < 0
                    ? "bg-rose-50/80 border-rose-200/80"
                    : "bg-emerald-50/80 border-emerald-200/80"
                }`}>
                  <span className="text-xs font-semibold flex items-center gap-1.5">
                    <Sparkles className={`w-4 h-4 ${projectedEndOfMonth < 0 ? "text-rose-600" : "text-emerald-600"}`} />
                    <span className={projectedEndOfMonth < 0 ? "text-rose-800" : "text-emerald-800"}>
                      Reste à Vivre au 30
                    </span>
                  </span>
                  <span className={`text-lg font-black mt-1 tabular-nums ${
                    projectedEndOfMonth < 0 ? "text-rose-600" : "text-emerald-700"
                  }`}>
                    {projectedEndOfMonth < 0
                      ? `${projectedEndOfMonth.toFixed(2)} €`
                      : `+${projectedEndOfMonth.toFixed(2)} €`}
                  </span>
                  <span className={`text-[10px] font-bold mt-0.5 ${
                    projectedEndOfMonth < 0 ? "text-rose-600" : "text-emerald-700"
                  }`}>
                    {projectedEndOfMonth < 0 ? "⚠ Risque d'agios (-45 €)" : "✓ Budget sécurisé (+15 €)"}
                  </span>
                </div>

              </div>

            </div>

            {/* ⭐ POINT FORT #1 & #2: Proactive AI Copilot Card (Revolut / Stripe Light) */}
            {!isResolved ? (
              <div className={`rounded-3xl bg-gradient-to-b from-rose-50/60 to-white border p-6 shadow-sm relative overflow-hidden transition-all duration-300 ${
                activeStrengthId === 1 || activeStrengthId === 2
                  ? "border-rose-400 ring-4 ring-rose-500/10 shadow-md"
                  : "border-rose-200"
              }`}>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-rose-100 text-rose-600 shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <h2 className="font-extrabold text-sm text-rose-950">Alerte IA : Découvert au 24/09</h2>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-mono font-bold">
                          Point Fort #1
                        </span>
                      </div>
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-rose-500 text-white font-black shadow-xs">
                        J-6
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed">
                      Le prélèvement <strong className="text-slate-950 font-bold">EDF (110 €)</strong> et vos charges fixes feront chuter votre solde à <strong className="text-rose-600 font-black">-45,00 €</strong>.
                    </p>

                    <div className="mt-4 p-4 rounded-2xl bg-white border border-rose-100 flex flex-col gap-3 shadow-xs">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-medium text-slate-700 flex items-center gap-1.5">
                          <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Action conseillée : Micro-virement de <strong className="text-slate-900 font-bold">60 €</strong>.</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono font-bold">
                          Point Fort #2
                        </span>
                      </div>

                      {/* 1-Click Resolution Button */}
                      <button
                        onClick={() => setIsResolved(true)}
                        className="w-full py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-bold text-xs transition-all duration-200 flex items-center justify-center gap-2.5 shadow-md shadow-emerald-600/25 cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4 text-white" />
                        <span>Sécuriser en 1 Clic (Éviter 45 € de frais)</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-3xl bg-gradient-to-b from-emerald-50/70 to-white border border-emerald-200/90 p-6 flex items-start gap-4 shadow-sm">
                <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-700 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h2 className="font-extrabold text-sm text-emerald-950">Budget Sécurisé avec Succès</h2>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold">
                        Point Fort #2 Validé
                      </span>
                    </div>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-black shadow-xs">
                      Protégé
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Virement de <strong>60 €</strong> exécuté depuis l&apos;épargne. Votre reste à vivre prévisionnel repasse à <strong className="text-emerald-700 font-bold">+15,00 €</strong>.
                  </p>
                  <p className="text-xs text-emerald-800 font-semibold pt-1 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>45 € d&apos;agios et commissions d&apos;intervention bancaires économisés.</span>
                  </p>
                </div>
              </div>
            )}

            {/* POINT FORT #3: Mode Freelance / Tirelire Fiscale */}
            {mode === "freelance" && (
              <div className={`rounded-3xl bg-white border p-6 flex flex-col gap-4 transition-all duration-300 shadow-sm ${
                activeStrengthId === 3
                  ? "border-indigo-400 ring-4 ring-indigo-500/10 shadow-md"
                  : "border-slate-200"
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        Module Freelance • Tirelire Fiscale Automatique
                      </span>
                      <span className="text-[10px] text-slate-400">Sanctuarisation fiscale temps réel</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full font-bold border border-indigo-100">
                      Point Fort #3
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
                  <div className="bg-slate-50 border border-slate-200/60 p-3.5 rounded-2xl">
                    <span className="text-[11px] text-slate-500 block font-medium">Facturé HT</span>
                    <span className="font-extrabold text-slate-900 text-sm mt-1 block tabular-nums">{freelanceBilled} €</span>
                  </div>
                  <div className="bg-violet-50/80 border border-violet-100 p-3.5 rounded-2xl">
                    <span className="text-[11px] text-violet-700 block font-medium">URSSAF (22%)</span>
                    <span className="font-extrabold text-violet-800 text-sm mt-1 block tabular-nums">-{urssafReserve} €</span>
                  </div>
                  <div className="bg-sky-50/80 border border-sky-100 p-3.5 rounded-2xl">
                    <span className="text-[11px] text-sky-700 block font-medium">TVA (20%)</span>
                    <span className="font-extrabold text-sky-800 text-sm mt-1 block tabular-nums">-{tvaReserve} €</span>
                  </div>
                  <div className="bg-emerald-50/80 border border-emerald-200 p-3.5 rounded-2xl">
                    <span className="text-[11px] text-emerald-700 block font-medium">Net Réel</span>
                    <span className="font-black text-emerald-800 text-sm mt-1 block tabular-nums">+{netAvailableFreelance} €</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 text-center italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  💡 935 € (URSSAF) et 850 € (TVA) isolés automatiquement sur sous-comptes séquestres.
                </p>
              </div>
            )}

            {/* 30-Day Predictive Cash Flow Curve (SVG Aéré & Lisible sur Blanc) */}
            <div className={`rounded-3xl bg-white border p-6 flex flex-col gap-3 transition-all duration-300 shadow-sm ${
              activeStrengthId === 1
                ? "border-emerald-400 ring-2 ring-emerald-500/20"
                : "border-slate-200"
            }`}>
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 flex items-center gap-2">
                  <span>Courbe de Trésorerie à 30 Jours</span>
                  {activeStrengthId === 1 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-mono font-semibold border border-emerald-200">
                      Prédiction ML
                    </span>
                  )}
                </span>
                <span className="text-xs text-slate-400 font-medium">Seuil 0 € Découvert</span>
              </div>

              {/* Vectorial Chart sur Fond Blanc */}
              <div className="h-20 w-full relative pt-2">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 300 65">
                  <defs>
                    <linearGradient id="roseLightGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#F43F5E" stopOpacity="0.01" />
                    </linearGradient>
                    <linearGradient id="emeraldLightGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0.01" />
                    </linearGradient>
                  </defs>

                  {/* 0 € Threshold Line */}
                  <line x1="0" y1="45" x2="300" y2="45" stroke="#CBD5E1" strokeDasharray="4,4" strokeWidth="1.2" />

                  {!isResolved ? (
                    <>
                      <path
                        d="M 0,20 Q 80,24 160,32 T 240,56 T 300,50 L 300,65 L 0,65 Z"
                        fill="url(#roseLightGrad)"
                      />
                      <path
                        d="M 0,20 Q 80,24 160,32 T 240,56 T 300,50"
                        fill="none"
                        stroke="#E11D48"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      <circle cx="240" cy="56" r="6" fill="#F43F5E" opacity="0.3" className="animate-ping" />
                      <circle cx="240" cy="56" r="4" fill="#E11D48" />
                    </>
                  ) : (
                    <>
                      <path
                        d="M 0,20 Q 80,22 160,26 T 240,32 T 300,30 L 300,65 L 0,65 Z"
                        fill="url(#emeraldLightGrad)"
                      />
                      <path
                        d="M 0,20 Q 80,22 160,26 T 240,32 T 300,30"
                        fill="none"
                        stroke="#059669"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      <circle cx="240" cy="32" r="4" fill="#059669" />
                    </>
                  )}
                </svg>
              </div>

              <div className="flex justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                <span>Aujourd&apos;hui (J+1)</span>
                <span className={!isResolved ? "text-rose-600 font-bold" : "text-emerald-700 font-bold"}>
                  24/09 : Prélèvement EDF (110 €)
                </span>
                <span>30 Septembre</span>
              </div>
            </div>

            {/* Transactions Feed (Apple Pay / Revolut Clean List) */}
            <div className={`flex flex-col gap-3 transition-all duration-300 ${
              activeStrengthId === 4 ? "p-3 rounded-3xl bg-teal-50/40 border border-teal-200" : ""
            }`}>
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center gap-2">
                  <span>Transactions Récentes</span>
                  {activeStrengthId === 4 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 font-mono font-semibold">
                      Flux Bridge API DSP2
                    </span>
                  )}
                </span>
                <span className="text-xs text-slate-400 font-normal">Synchronisé en temps réel</span>
              </div>

              <div className="flex flex-col gap-2">
                {INITIAL_TRANSACTIONS.slice(0, 4).map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-white hover:bg-slate-50/80 border border-slate-200/70 transition text-xs shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold ${
                        tx.type === "income" ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-600"
                      }`}>
                        {tx.type === "income" ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block text-xs">{tx.name}</span>
                        <span className="text-[11px] text-slate-500 font-medium">{tx.date} • {tx.category}</span>
                      </div>
                    </div>
                    <span className={`font-black text-xs tabular-nums ${tx.type === "income" ? "text-emerald-600" : "text-slate-900"}`}>
                      {tx.type === "income" ? "+" : "-"}{tx.amount.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Security Console Drawer (Edy Wise DJIHOUA - Style Apple / Stripe Dashboard) */}
      {showSecurityConsole && (
        <div className="fixed inset-x-0 bottom-0 z-50 bg-white/95 border-t border-slate-200/90 p-5 sm:p-6 backdrop-blur-2xl shadow-[0_-20px_50px_rgba(15,23,42,0.1)] animate-in slide-in-from-bottom duration-200">
          <div className="max-w-4xl mx-auto flex flex-col gap-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-xs text-slate-900 tracking-wide block">
                    Console Cybersécurité & RGPD — Edy Wise DJIHOUA (DPO)
                  </span>
                  <span className="text-[10px] text-slate-500">Architecture souveraine & Privacy by Design</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-mono font-bold border border-emerald-200 ml-2">
                  Point Fort #5
                </span>
              </div>
              <button
                onClick={() => setShowSecurityConsole(false)}
                className="text-xs text-slate-500 hover:text-slate-900 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition font-medium cursor-pointer"
              >
                Fermer [✕]
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-700 flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✔</span>
                <span><strong>[AES-256-GCM]</strong> Clés DEK sous HSM (SecNumCloud OVHcloud France)</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-700 flex items-start gap-2">
                <span className="text-teal-600 font-bold">✔</span>
                <span><strong>[DSP2 OAUTH2]</strong> Bridge BPCE • Zéro mot de passe bancaire stocké</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-700 flex items-start gap-2">
                <span className="text-sky-600 font-bold">✔</span>
                <span><strong>[ZERO-KNOWLEDGE]</strong> Tables identités ≠ Tables transactions financières</span>
              </div>
              <div className={`p-3 rounded-2xl border flex items-start gap-2 transition-all ${
                isKeyDestroyed
                  ? "bg-rose-50 border-rose-200 text-rose-800 font-bold"
                  : "bg-slate-50 border-slate-200/80 text-slate-700"
              }`}>
                <span className={isKeyDestroyed ? "text-rose-600" : "text-amber-600 font-bold"}>
                  {isKeyDestroyed ? "✖" : "⚡"}
                </span>
                <span>
                  {isKeyDestroyed
                    ? "CRYPTO-SHREDDING RÉUSSI : Clé détruite ➔ Données effacées (RGPD Art. 17)"
                    : "RGPD ART. 17 : Droit à l'oubli instantané par destruction cryptographique"}
                </span>
              </div>
            </div>

            {!isKeyDestroyed && (
              <button
                onClick={() => setIsKeyDestroyed(true)}
                className="self-start mt-1 px-4 py-2.5 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2 transition cursor-pointer shadow-2xs"
              >
                <Trash2 className="w-4 h-4" />
                <span>Tester le Crypto-Shredding en direct (Droit à l&apos;oubli)</span>
              </button>
            )}

          </div>
        </div>
      )}

      {/* Minimal Sleek Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-4 text-center text-xs text-slate-500">
        FinTrack © 2026 • ÉSTIAM Paris StartUp&apos;IT • Hassâne, Duval, Super Abel, Edy, Rayan, Randy
      </footer>

    </main>
  );
}
