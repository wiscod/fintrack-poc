"use client";

import React, { useState, useMemo } from "react";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  Smartphone,
  Monitor,
  Zap,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  PiggyBank,
  RefreshCw,
  Lock,
  Cpu,
  Building2,
  Sparkles,
  ChevronRight,
  Briefcase,
  User,
  Sliders,
  DollarSign,
  Layers,
  Terminal,
} from "lucide-react";

interface Transaction {
  id: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  type: "expense" | "income";
  isRecurring?: boolean;
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: "1", name: "Virement Salaire / Client", category: "Revenus", date: "01 Sept", amount: 2350, type: "income" },
  { id: "2", name: "Loyer & Charges", category: "Logement", date: "03 Sept", amount: 820, type: "expense", isRecurring: true },
  { id: "3", name: "Courses Carrefour Market", category: "Alimentation", date: "08 Sept", amount: 84.5, type: "expense" },
  { id: "4", name: "Netflix & Spotify Premium", category: "Abonnements", date: "12 Sept", amount: 28.98, type: "expense", isRecurring: true },
  { id: "5", name: "Navigo / Pass Transport", category: "Transports", date: "14 Sept", amount: 86.4, type: "expense", isRecurring: true },
  { id: "6", name: "Restaurant & Sorties", category: "Loisirs", date: "17 Sept", amount: 64.0, type: "expense" },
];

export default function FinTrackPOC() {
  // State
  const [mode, setMode] = useState<"b2c" | "freelance">("b2c");
  const [viewMode, setViewMode] = useState<"phone" | "fullscreen">("phone");
  const [isResolved, setIsResolved] = useState<boolean>(false);
  const [simulatedExpense, setSimulatedExpense] = useState<number>(0);
  const [showSecurityConsole, setShowSecurityConsole] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"overview" | "predict" | "freelance">("overview");

  // Dynamic calculations
  const baseBalance = 1240.12;
  const initialSavings = 2850.0;
  
  // Current account balance calculation
  const currentBalance = useMemo(() => {
    let bal = baseBalance - simulatedExpense;
    if (isResolved) bal += 60; // 60€ transferred from emergency savings
    return Math.round(bal * 100) / 100;
  }, [baseBalance, simulatedExpense, isResolved]);

  const currentSavings = useMemo(() => {
    return isResolved ? initialSavings - 60 : initialSavings;
  }, [isResolved, initialSavings]);

  // Projected 30-day forecast
  // Scheduled expenses before end of month: EDF (110€) + Internet (40€) + Assurances (65€) + Food estimated (240€) = ~455€
  // If simulated expense is added or without transfer, account could dip negative around day 24
  const projectedEndOfMonth = useMemo(() => {
    const fixedPending = 455;
    return Math.round((currentBalance - fixedPending) * 100) / 100;
  }, [currentBalance]);

  // Health Status
  const isDanger = projectedEndOfMonth < 0;

  // Freelance calculations (for mode === 'freelance')
  const freelanceBilledThisMonth = 4250;
  const urssafReserve = Math.round(freelanceBilledThisMonth * 0.22); // 22%
  const tvaReserve = Math.round(freelanceBilledThisMonth * 0.20); // 20%
  const netAvailableFreelance = freelanceBilledThisMonth - urssafReserve - tvaReserve;

  // Action to resolve overdraft
  const handleResolveAlert = () => {
    setIsResolved(true);
  };

  const handleAddExpense = (amt: number) => {
    setSimulatedExpense((prev) => prev + amt);
    setIsResolved(false);
  };

  const handleResetSimulation = () => {
    setSimulatedExpense(0);
    setIsResolved(false);
  };

  return (
    <main className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Global Demo Bar */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-50 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center font-black text-slate-950 text-lg shadow-lg shadow-emerald-500/20">
              FT
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white">FINTRACK</span>
                <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-medium">
                  POC LIVE
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                  ÉSTIAM StartUp&apos;IT (4STUPIT)
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden md:block">
                Copilote Financier Prédictif & Sécurisé par IA • Démonstration Soutenance
              </p>
            </div>
          </div>

          {/* Interactive Controls Bar */}
          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="hidden sm:flex bg-slate-800/80 p-1 rounded-lg border border-slate-700 text-xs">
              <button
                onClick={() => setViewMode("phone")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition font-medium ${
                  viewMode === "phone" ? "bg-emerald-500 text-slate-950 shadow-sm" : "text-slate-400 hover:text-white"
                }`}
                title="Cadre iPhone pour la démo"
              >
                <Smartphone className="w-3.5 h-3.5" />
                Mobile
              </button>
              <button
                onClick={() => setViewMode("fullscreen")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition font-medium ${
                  viewMode === "fullscreen" ? "bg-emerald-500 text-slate-950 shadow-sm" : "text-slate-400 hover:text-white"
                }`}
                title="Vue Web plein écran"
              >
                <Monitor className="w-3.5 h-3.5" />
                Plein Écran
              </button>
            </div>

            {/* Mode Switcher B2C / Freelance */}
            <div className="flex bg-slate-800/80 p-1 rounded-lg border border-slate-700 text-xs">
              <button
                onClick={() => {
                  setMode("b2c");
                  setActiveTab("overview");
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition font-medium ${
                  mode === "b2c" ? "bg-blue-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
                }`}
              >
                <User className="w-3.5 h-3.5" />
                B2C Particulier
              </button>
              <button
                onClick={() => {
                  setMode("freelance");
                  setActiveTab("freelance");
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition font-medium ${
                  mode === "freelance" ? "bg-purple-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                Pro & Freelance
              </button>
            </div>

            {/* Security Console Button (Edy Wise DJIHOUA) */}
            <button
              onClick={() => setShowSecurityConsole(!showSecurityConsole)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition ${
                showSecurityConsole
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                  : "bg-slate-800 hover:bg-slate-750 text-slate-300 border-slate-700"
              }`}
              title="Console Sécurité & RGPD (Edy Wise DJIHOUA)"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="hidden lg:inline">Console Sécurité</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Interactive Control Panel for Jury Demo (4 cols in desktop) */}
        <aside className="lg:col-span-4 flex flex-col gap-5 order-2 lg:order-1">
          {/* Sandbox Controls Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <Sliders className="w-5 h-5 text-emerald-400" />
              <h2 className="font-bold text-base text-white">Bac à Sable — Jury Live Demo</h2>
            </div>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Testez en direct la réaction du moteur d&apos;intelligence artificielle de FinTrack en simulant des événements financiers imprévus :
            </p>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => handleAddExpense(120)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-medium transition text-left"
              >
                <div className="flex items-center gap-2 text-rose-400">
                  <ArrowDownLeft className="w-4 h-4" />
                  <span>Simuler Dépense Imprévue (+120 €)</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-rose-500/10 text-rose-300 rounded border border-rose-500/20">
                  Panne auto / Soin
                </span>
              </button>

              <button
                onClick={() => handleAddExpense(250)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-medium transition text-left"
              >
                <div className="flex items-center gap-2 text-rose-400">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Déclencher Alerte Découvert (+250 €)</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-rose-500/10 text-rose-300 rounded border border-rose-500/20">
                  Choc critique
                </span>
              </button>

              {simulatedExpense > 0 && (
                <button
                  onClick={handleResetSimulation}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs text-slate-300 font-medium transition mt-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Réinitialiser le solde d&apos;origine
                </button>
              )}
            </div>

            {/* Quick Metrics of the active simulation */}
            <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                <span className="text-slate-400 block text-[11px]">Impact simulé</span>
                <span className={`font-bold text-sm ${simulatedExpense > 0 ? "text-rose-400" : "text-slate-300"}`}>
                  -{simulatedExpense} €
                </span>
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                <span className="text-slate-400 block text-[11px]">État de l&apos;IA</span>
                <span className={`font-bold text-sm ${isDanger ? "text-rose-400 animate-pulse" : "text-emerald-400"}`}>
                  {isDanger ? "⚠️ Alerte Active" : "✅ Sécurisé"}
                </span>
              </div>
            </div>
          </div>

          {/* Value Proposition Highlights for Jury */}
          <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 text-xs flex flex-col gap-3">
            <h3 className="font-bold text-slate-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Pourquoi FinTrack bat la concurrence :
            </h3>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Anticipation à 30 jours</strong> : Contrairement à Bankin&apos;, FinTrack calcule le solde résiduel futur probabiliste.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Résolution en 1 clic</strong> : Proposition immédiate de micro-transfert pour épargner 60 € d&apos;agios bancaires.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Passerelle Freelance</strong> : Sanctuarisation automatique de l&apos;URSSAF (22%) et de la TVA dès la facturation.</span>
              </li>
            </ul>
          </div>

          {/* Team Tag ÉSTIAM */}
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-3.5 text-[11px] text-slate-400 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-cyan-400" />
              <span>Projet développé par les 6 associés ÉSTIAM</span>
            </div>
            <span className="font-semibold text-slate-300">Promo 2026</span>
          </div>
        </aside>

        {/* Center/Right Main App Display (8 cols) */}
        <section className={`lg:col-span-8 flex justify-center order-1 lg:order-2 ${viewMode === "fullscreen" ? "w-full" : ""}`}>
          
          {/* Smartphone Frame Wrapper (Active in Phone Mode) */}
          <div
            className={`w-full transition-all duration-300 ${
              viewMode === "phone"
                ? "max-w-[420px] rounded-[48px] border-[10px] border-slate-800 bg-slate-950 p-2 shadow-2xl shadow-emerald-500/10 ring-1 ring-slate-700"
                : "w-full rounded-2xl border border-slate-800 bg-slate-950 p-4 md:p-6"
            }`}
          >
            {/* Phone Top Notch & Status Bar (Only in Phone Mode) */}
            {viewMode === "phone" && (
              <div className="pt-2 px-6 pb-2 flex items-center justify-between text-[11px] font-semibold text-slate-400 border-b border-slate-900">
                <span>09:41</span>
                <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto" />
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px]">5G</span>
                  <div className="w-4 h-2 border border-slate-400 rounded-sm p-0.5">
                    <div className="w-full h-full bg-emerald-400 rounded-2xs" />
                  </div>
                </div>
              </div>
            )}

            {/* Inner App Content */}
            <div className="p-4 flex flex-col gap-4">
              
              {/* App Internal Header */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Bonjour, Maxime 👋</span>
                  <span className="text-base font-extrabold text-white tracking-tight">
                    {mode === "b2c" ? "Mon Espace Personnel" : "Espace Freelance & Pro"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    DSP2 Actif
                  </span>
                </div>
              </div>

              {/* Main Balance Card */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-850 border border-slate-800 rounded-3xl p-5 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                    <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                    Solde Courant Consolidé
                  </span>
                  <span className="text-xs text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                    2 Comptes Liés
                  </span>
                </div>

                <div className="text-3xl font-black text-white tracking-tight mb-3">
                  {currentBalance.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
                </div>

                {/* Sub balances info */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800/80 text-xs">
                  <div className="flex flex-col">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <PiggyBank className="w-3 h-3 text-cyan-400" />
                      Réserve Épargne
                    </span>
                    <span className="font-bold text-slate-200 mt-0.5">
                      {currentSavings.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-amber-400" />
                      Reste à Vivre (30j)
                    </span>
                    <span className={`font-bold mt-0.5 ${projectedEndOfMonth < 0 ? "text-rose-400 font-black" : "text-emerald-400"}`}>
                      {projectedEndOfMonth.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
                    </span>
                  </div>
                </div>
              </div>

              {/* 🔮 CRITICAL DIFFERENTIATOR: Proactive AI Copilot Card */}
              {isDanger && !isResolved ? (
                <div className="bg-gradient-to-br from-rose-950/50 via-slate-900 to-slate-900 border-2 border-rose-500/50 rounded-2xl p-4 shadow-lg shadow-rose-500/10 animate-pulse">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 shrink-0 mt-0.5">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm text-rose-300">Alerte IA : Risque Découvert</h4>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-semibold">
                          Dans 6 jours
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        Prévision au 24/09 : solde estimé à <strong className="text-rose-400">{projectedEndOfMonth} €</strong> après le prélèvement EDF (110 €) et assurances.
                      </p>

                      <div className="mt-3 p-2.5 rounded-xl bg-slate-950/70 border border-rose-500/30 flex flex-col gap-2">
                        <div className="text-[11px] text-slate-300 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                          <span><strong>Solution IA</strong> : Virement de 60 € depuis la réserve d&apos;épargne.</span>
                        </div>
                        <button
                          onClick={handleResolveAlert}
                          className="w-full py-2 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Sécuriser en 1 clic (Éviter 45€ d&apos;agios)
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : isResolved ? (
                <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-3.5 flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-emerald-300">Budget Sécurisé par l&apos;IA</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Virement de 60 € exécuté avec succès. Zéro agios prévus ce mois-ci !
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-xs text-slate-200">Trajectoire Financière Optimale</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Aucune tension de trésorerie détectée pour les 30 prochains jours.
                    </p>
                  </div>
                </div>
              )}

              {/* Freelance Specific Section */}
              {mode === "freelance" && (
                <div className="bg-gradient-to-br from-purple-950/40 to-slate-900 border border-purple-500/30 rounded-2xl p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                      Module Freelance & Fiscalité Auto
                    </span>
                    <span className="text-[10px] px-2 py-0.5 bg-purple-500/20 text-purple-200 rounded-full font-semibold">
                      FinTrack Pro
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Facturé</span>
                      <span className="font-bold text-white mt-1 block">{freelanceBilledThisMonth} €</span>
                    </div>
                    <div className="bg-slate-950/60 p-2 rounded-xl border border-purple-500/20">
                      <span className="text-[10px] text-purple-300 block">URSSAF (22%)</span>
                      <span className="font-bold text-purple-400 mt-1 block">-{urssafReserve} €</span>
                    </div>
                    <div className="bg-slate-950/60 p-2 rounded-xl border border-emerald-500/20">
                      <span className="text-[10px] text-emerald-300 block">Net Réel</span>
                      <span className="font-bold text-emerald-400 mt-1 block">+{netAvailableFreelance} €</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 italic text-center">
                    💡 924 € sanctuarisés automatiquement sur sous-compte séquestre URSSAF.
                  </p>
                </div>
              )}

              {/* 30-Day Predictive Timeline Graph (SVG Mock) */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-300 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                    Trajectoire Prévisionnelle à 30 Jours
                  </span>
                  <span className="text-[11px] text-slate-400">J+1 à J+30</span>
                </div>

                {/* Interactive SVG Curve */}
                <div className="h-28 w-full relative pt-3">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 300 80">
                    <defs>
                      <linearGradient id="gradEmerald" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                      </linearGradient>
                      <linearGradient id="gradRose" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#F43F5E" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Zero Line */}
                    <line x1="0" y1="65" x2="300" y2="65" stroke="#334155" strokeDasharray="3,3" strokeWidth="1" />
                    <text x="5" y="62" fill="#64748B" fontSize="8">
                      Seuil 0 € (Découvert)
                    </text>

                    {/* Curve Path */}
                    {isDanger && !isResolved ? (
                      // Dip below 0 around day 24
                      <>
                        <path
                          d="M 0,25 Q 75,30 150,45 T 240,75 T 300,50"
                          fill="url(#gradRose)"
                          stroke="#F43F5E"
                          strokeWidth="2.5"
                        />
                        {/* Event Markers */}
                        <circle cx="240" cy="75" r="4" fill="#F43F5E" className="animate-ping" />
                        <circle cx="240" cy="75" r="3" fill="#F43F5E" />
                        <text x="210" y="68" fill="#F43F5E" fontSize="9" fontWeight="bold">
                          -45 € (EDF)
                        </text>
                      </>
                    ) : (
                      // Healthy curve
                      <>
                        <path
                          d="M 0,25 Q 75,30 150,38 T 240,48 T 300,35"
                          fill="url(#gradEmerald)"
                          stroke="#10B981"
                          strokeWidth="2.5"
                        />
                        <circle cx="240" cy="48" r="3" fill="#10B981" />
                        <text x="220" y="42" fill="#10B981" fontSize="9" fontWeight="bold">
                          Solde sain
                        </text>
                      </>
                    )}
                  </svg>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-800/80 pt-2">
                  <span>J+1 (Aujourd&apos;hui)</span>
                  <span>J+15 (Courses)</span>
                  <span>J+24 (EDF & Loyer)</span>
                  <span>J+30 (Fin du mois)</span>
                </div>
              </div>

              {/* Transactions List */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span>Transactions Récentes (DSP2)</span>
                  <span className="text-[11px] text-emerald-400 font-normal">Classées par IA (97.4%)</span>
                </div>

                <div className="flex flex-col gap-2">
                  {INITIAL_TRANSACTIONS.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                            tx.type === "income"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-slate-800 text-slate-300"
                          }`}
                        >
                          {tx.type === "income" ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-white block">{tx.name}</span>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[10px] text-slate-400">{tx.date}</span>
                            <span className="text-[10px] px-1.5 py-0.2 bg-slate-800 text-slate-300 rounded">
                              {tx.category}
                            </span>
                            {tx.isRecurring && (
                              <span className="text-[9px] px-1 bg-blue-500/10 text-blue-300 rounded">
                                Récurrent
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <span
                        className={`text-xs font-bold ${
                          tx.type === "income" ? "text-emerald-400" : "text-slate-200"
                        }`}
                      >
                        {tx.type === "income" ? "+" : "-"}
                        {tx.amount.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>

      {/* Security & RGPD Live Console Drawer (Edy Wise DJIHOUA Special) */}
      {showSecurityConsole && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950 border-t-2 border-emerald-500/60 p-4 shadow-2xl shadow-emerald-500/20 backdrop-blur max-h-72 overflow-y-auto">
          <div className="max-w-7xl mx-auto flex flex-col gap-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="font-mono text-xs font-bold text-white">
                  Console de Supervision Sécurité & RGPD — Dirigée par Edy Wise DJIHOUA (DPO)
                </span>
              </div>
              <button
                onClick={() => setShowSecurityConsole(false)}
                className="text-xs text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800"
              >
                Fermer [✕]
              </button>
            </div>

            <div className="font-mono text-[11px] space-y-1.5 text-slate-300">
              <p className="text-emerald-400">
                [SEC-01] Chiffrement au repos actif : AES-256-GCM • Clé maître gérée via HSM SecNumCloud
              </p>
              <p className="text-cyan-400">
                [DSP2-SYNC] Webhook certifié reçu de l&apos;agrégateur ACPR (Bridge) : TLS 1.3 / Perfect Forward Secrecy
              </p>
              <p className="text-blue-400">
                [RGPD-ZERO-KNOWLEDGE] Pseudonymisation active : ID bancaire haché SHA-256 découplé du profil utilisateur
              </p>
              <p className="text-slate-400">
                [SOUVERAINETÉ] Serveurs localisés à Gravelines, France (Hébergement OVHcloud / ISO 27001)
              </p>
              <p className="text-amber-300">
                [AUDIT] Zéro donnée bancaire revendue • Droit à l&apos;oubli garanti en 1 clic
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer Attribution */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/80 px-4 py-3 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <span>FinTrack © 2026 — SARL en cours de constitution (Vers SAS)</span>
          <span>ÉSTIAM Paris • Soutenance StartUp&apos;IT 4STUPIT</span>
          <span>Hassâne • Duval • Super Abel • Edy • Rayan • Randy</span>
        </div>
      </footer>
    </main>
  );
}
