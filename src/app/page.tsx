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
  Zap,
  Info,
  Layers
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

export default function FinTrackPOC() {
  // Mode controls
  const [mode, setMode] = useState<"b2c" | "freelance">("b2c");
  const [viewMode, setViewMode] = useState<"phone" | "fullscreen">("phone");
  const [isResolved, setIsResolved] = useState<boolean>(false);
  const [showSecurityConsole, setShowSecurityConsole] = useState<boolean>(false);
  const [isKeyDestroyed, setIsKeyDestroyed] = useState<boolean>(false);

  // Exact math calibrated for the live demo scenario:
  // Base current account balance: 410.00 €
  // Total pending fixed bills before month end: 455.00 € (EDF 110€ + Box 40€ + Assurances 65€ + Courses 240€)
  // Projected balance at Day 24: 410 - 455 = -45.00 € (Overdraft imminent!)
  // Transfer 60.00 € from emergency savings -> new balance: 470.00 € -> new projected balance: +15.00 € (Safe!)
  const baseBalance = 410.0;
  const initialSavings = 2850.0;
  const transferAmount = 60.0;
  const fixedPending = 455.0;

  const currentBalance = isResolved ? baseBalance + transferAmount : baseBalance;
  const currentSavings = isResolved ? initialSavings - transferAmount : initialSavings;
  const projectedEndOfMonth = currentBalance - fixedPending; // -45 € initially, +15 € once resolved

  // Freelance exact numbers
  const freelanceBilled = 4250;
  const urssafReserve = 935; // 22% of 4250
  const tvaReserve = 850; // 20% of 4250
  const netAvailableFreelance = freelanceBilled - urssafReserve - tvaReserve; // 2465 €

  const handleReset = () => {
    setIsResolved(false);
    setIsKeyDestroyed(false);
  };

  return (
    <main className="min-h-screen bg-[#070A12] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950 relative overflow-x-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-emerald-500/10 via-teal-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-white/[0.06] bg-[#070A12]/85 backdrop-blur-xl px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          
          {/* Brand Logo & Presentation Tag */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-500 flex items-center justify-center font-black text-slate-950 text-sm shadow-[0_0_20px_rgba(52,211,153,0.3)]">
              FT
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm tracking-wider text-white">FINTRACK</span>
                <span className="px-2 py-0.5 text-[10px] rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold tracking-wide">
                  LIVE DEMO
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Copilote Financier Prédictif • ÉSTIAM StartUp&apos;IT 2026
              </p>
            </div>
          </div>

          {/* Quick Action Controls */}
          <div className="flex items-center gap-2">
            
            {/* Mode Switcher: Particulier vs Freelance */}
            <div className="flex bg-white/[0.04] p-1 rounded-xl border border-white/[0.08]">
              <button
                onClick={() => setMode("b2c")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  mode === "b2c"
                    ? "bg-white/[0.12] text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <User className="w-3.5 h-3.5 text-emerald-400" />
                <span>Particulier</span>
              </button>
              <button
                onClick={() => setMode("freelance")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  mode === "freelance"
                    ? "bg-purple-500/20 text-purple-200 border border-purple-500/30 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                <span>Freelance</span>
              </button>
            </div>

            {/* Device View: Phone vs Fullscreen */}
            <div className="hidden md:flex bg-white/[0.04] p-1 rounded-xl border border-white/[0.08]">
              <button
                onClick={() => setViewMode("phone")}
                className={`p-1.5 rounded-lg transition-all duration-200 cursor-pointer ${
                  viewMode === "phone" ? "bg-white/[0.12] text-emerald-400" : "text-slate-400 hover:text-white"
                }`}
                title="Format Smartphone"
              >
                <Smartphone className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("fullscreen")}
                className={`p-1.5 rounded-lg transition-all duration-200 cursor-pointer ${
                  viewMode === "fullscreen" ? "bg-white/[0.12] text-emerald-400" : "text-slate-400 hover:text-white"
                }`}
                title="Format Plein Écran"
              >
                <Monitor className="w-4 h-4" />
              </button>
            </div>

            {/* Security Console Drawer Trigger (Edy Wise DJIHOUA) */}
            <button
              onClick={() => setShowSecurityConsole(!showSecurityConsole)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white text-xs font-medium transition cursor-pointer"
              title="Console Cybersécurité & RGPD"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Sécurité DPO</span>
            </button>

          </div>

        </div>
      </header>

      {/* Main Container Area */}
      <div className="flex-1 w-full max-w-5xl mx-auto p-4 md:py-6 flex flex-col items-center justify-start">
        
        {/* Scenario Status Pill */}
        <div className="w-full max-w-md mb-4 flex items-center justify-between px-3.5 py-2 bg-white/[0.03] border border-white/[0.07] rounded-2xl text-xs backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isResolved ? "bg-emerald-400" : "bg-rose-500 animate-pulse"}`} />
            <span className="text-slate-300 font-medium">
              {isResolved ? "Scénario sécurisé (+15 € en fin de mois)" : "Alerte proactive J-6 : Risque découvert (-45 €)"}
            </span>
          </div>
          {isResolved && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Rejouer</span>
            </button>
          )}
        </div>

        {/* Device Frame */}
        <div
          className={`w-full transition-all duration-300 ${
            viewMode === "phone"
              ? "max-w-md rounded-[52px] border-[6px] border-[#1C2333] bg-[#0B0F1A] shadow-[0_20px_80px_rgba(0,0,0,0.8)] overflow-hidden"
              : "max-w-2xl rounded-3xl border border-white/[0.08] bg-[#0B0F1A] p-6 shadow-2xl"
          }`}
        >
          {/* Modern Dynamic Island Notch (Phone Mode) */}
          {viewMode === "phone" && (
            <div className="pt-3 px-7 pb-2 flex items-center justify-between text-[11px] font-medium text-slate-400 select-none">
              <span>09:41</span>
              <div className="w-24 h-5 bg-black rounded-full flex items-center justify-end px-2 gap-1.5">
                <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-700" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px]">5G</span>
                <div className="w-4 h-2.5 border border-slate-400 rounded-xs p-0.5 flex items-center">
                  <div className="w-full h-full bg-emerald-400 rounded-3xs" />
                </div>
              </div>
            </div>
          )}

          {/* App Body Content */}
          <div className="p-4 sm:p-5 flex flex-col gap-4">
            
            {/* User Greeting & Open Banking Badge */}
            <div className="flex items-center justify-between pt-1">
              <div>
                <p className="text-xs text-slate-400 font-medium">Bonjour Maxime 👋</p>
                <h1 className="text-base font-extrabold text-white tracking-tight">
                  {mode === "b2c" ? "Vue Budgétaire Proactive" : "Espace Trésorerie Freelance"}
                </h1>
              </div>
              <div className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-semibold text-emerald-300">DSP2 Connecté</span>
              </div>
            </div>

            {/* Hero Card: Solde & Reste à Vivre Prédictif */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/[0.08] p-5 shadow-xl backdrop-blur-xl">
              
              {/* Subtle top decoration */}
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                <span className="flex items-center gap-1.5 font-medium">
                  <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                  Solde Courant
                </span>
                <span className="text-[10px] bg-white/[0.05] text-slate-300 px-2 py-0.5 rounded-md border border-white/[0.05]">
                  Banque Principale
                </span>
              </div>

              {/* Big Clean Balance */}
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight my-1">
                {currentBalance.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
              </div>

              {/* Split Sub-Cards: Epargne & Reste a Vivre */}
              <div className="grid grid-cols-2 gap-2.5 pt-4 mt-3 border-t border-white/[0.06]">
                
                {/* Epargne Reserve */}
                <div className="bg-white/[0.03] border border-white/[0.05] rounded-2xl p-3 flex flex-col">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <PiggyBank className="w-3.5 h-3.5 text-teal-400" />
                    Réserve Épargne
                  </span>
                  <span className="text-base font-extrabold text-white mt-1">
                    {currentSavings.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
                  </span>
                  <span className="text-[9px] text-slate-500 mt-0.5">Disponible sans préavis</span>
                </div>

                {/* Projected Safe-to-Spend Balance */}
                <div className={`rounded-2xl p-3 flex flex-col border transition-all duration-300 ${
                  projectedEndOfMonth < 0
                    ? "bg-rose-500/[0.08] border-rose-500/25"
                    : "bg-emerald-500/[0.08] border-emerald-500/25"
                }`}>
                  <span className="text-[11px] text-slate-300 flex items-center gap-1">
                    <Sparkles className={`w-3.5 h-3.5 ${projectedEndOfMonth < 0 ? "text-rose-400" : "text-emerald-400"}`} />
                    Reste à Vivre au 30
                  </span>
                  <span className={`text-base font-black mt-1 ${
                    projectedEndOfMonth < 0 ? "text-rose-400" : "text-emerald-400"
                  }`}>
                    {projectedEndOfMonth < 0
                      ? `${projectedEndOfMonth.toFixed(2)} €`
                      : `+${projectedEndOfMonth.toFixed(2)} €`}
                  </span>
                  <span className={`text-[9px] font-semibold mt-0.5 ${
                    projectedEndOfMonth < 0 ? "text-rose-300" : "text-emerald-300"
                  }`}>
                    {projectedEndOfMonth < 0 ? "⚠ Risque d'agios" : "✓ Budget sécurisé"}
                  </span>
                </div>

              </div>

            </div>

            {/* ⭐ THE CORE LIVE DEMO: Proactive AI Copilot Card */}
            {!isResolved ? (
              <div className="rounded-3xl bg-gradient-to-br from-rose-950/30 via-[#0B0F1A] to-[#0B0F1A] border border-rose-500/30 p-4 sm:p-5 shadow-lg relative overflow-hidden">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-2xl bg-rose-500/15 text-rose-400 shrink-0 mt-0.5">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="font-bold text-sm text-rose-200">Alerte IA : Découvert au 24/09</h2>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                        J-6
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                      Prélèvement <strong className="text-white">EDF (110 €)</strong> et charges récurrentes feront chuter votre solde à <strong className="text-rose-400 font-bold">-45,00 €</strong>.
                    </p>

                    <div className="mt-3.5 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex flex-col gap-2.5">
                      <div className="text-xs text-slate-300 flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Action conseillée : Micro-virement de <strong>60 €</strong> depuis votre épargne.</span>
                      </div>

                      {/* 1-Click Resolution Button */}
                      <button
                        onClick={() => setIsResolved(true)}
                        className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Sécuriser en 1 Clic (Éviter 45 € de frais)</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-3xl bg-gradient-to-br from-emerald-950/30 via-[#0B0F1A] to-[#0B0F1A] border border-emerald-500/30 p-4 sm:p-5 flex items-start gap-3 shadow-lg">
                <div className="p-2.5 rounded-2xl bg-emerald-500/15 text-emerald-400 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h2 className="font-bold text-sm text-emerald-200">Budget Sécurisé avec Succès</h2>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                      Protégé
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Virement de <strong>60 €</strong> exécuté. Votre reste à vivre prévisionnel repasse à <strong className="text-emerald-400 font-bold">+15,00 €</strong>.
                  </p>
                  <p className="text-[11px] text-emerald-400 font-semibold mt-1.5 flex items-center gap-1">
                    <span>✓</span>
                    <span>45 € d&apos;agios bancaires et commissions d&apos;intervention économisés.</span>
                  </p>
                </div>
              </div>
            )}

            {/* Mode Freelance: Sanctuarisation Fiscale (4 Colonnes Epurées) */}
            {mode === "freelance" && (
              <div className="rounded-3xl bg-purple-950/20 border border-purple-500/30 p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-bold text-purple-200">
                      Module Freelance • Tirelire Fiscale Automatique
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded-full font-semibold border border-purple-500/30">
                    Auto-Entreprise
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-white/[0.03] border border-white/[0.05] p-2.5 rounded-2xl">
                    <span className="text-[10px] text-slate-400 block font-medium">Facturé HT</span>
                    <span className="font-extrabold text-white text-xs mt-1 block">{freelanceBilled} €</span>
                  </div>
                  <div className="bg-purple-500/[0.08] border border-purple-500/20 p-2.5 rounded-2xl">
                    <span className="text-[10px] text-purple-300 block font-medium">URSSAF (22%)</span>
                    <span className="font-extrabold text-purple-300 text-xs mt-1 block">-{urssafReserve} €</span>
                  </div>
                  <div className="bg-blue-500/[0.08] border border-blue-500/20 p-2.5 rounded-2xl">
                    <span className="text-[10px] text-blue-300 block font-medium">TVA (20%)</span>
                    <span className="font-extrabold text-blue-300 text-xs mt-1 block">-{tvaReserve} €</span>
                  </div>
                  <div className="bg-emerald-500/[0.08] border border-emerald-500/20 p-2.5 rounded-2xl">
                    <span className="text-[10px] text-emerald-300 block font-medium">Net Réel</span>
                    <span className="font-black text-emerald-400 text-xs mt-1 block">+{netAvailableFreelance} €</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 text-center italic">
                  💡 935 € (URSSAF) et 850 € (TVA) isolés automatiquement sur sous-comptes séquestres.
                </p>
              </div>
            )}

            {/* 30-Day Predictive Cash Flow Curve (SVG Lissé & Épuré) */}
            <div className="rounded-3xl bg-white/[0.03] border border-white/[0.06] p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200">Courbe de Trésorerie à 30 Jours</span>
                <span className="text-[10px] text-slate-400">Seuil 0 € Découvert</span>
              </div>

              {/* Vectorial Chart */}
              <div className="h-16 w-full relative pt-1">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 300 60">
                  <defs>
                    <linearGradient id="roseGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#F43F5E" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* 0 € Threshold Line */}
                  <line x1="0" y1="42" x2="300" y2="42" stroke="#334155" strokeDasharray="3,3" strokeWidth="1" />

                  {!isResolved ? (
                    <>
                      <path
                        d="M 0,18 Q 80,22 160,30 T 240,54 T 300,48 L 300,60 L 0,60 Z"
                        fill="url(#roseGrad)"
                      />
                      <path
                        d="M 0,18 Q 80,22 160,30 T 240,54 T 300,48"
                        fill="none"
                        stroke="#F43F5E"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <circle cx="240" cy="54" r="5" fill="#F43F5E" className="animate-ping" />
                      <circle cx="240" cy="54" r="3.5" fill="#F43F5E" />
                    </>
                  ) : (
                    <>
                      <path
                        d="M 0,18 Q 80,20 160,24 T 240,30 T 300,28 L 300,60 L 0,60 Z"
                        fill="url(#emeraldGrad)"
                      />
                      <path
                        d="M 0,18 Q 80,20 160,24 T 240,30 T 300,28"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <circle cx="240" cy="30" r="3.5" fill="#10B981" />
                    </>
                  )}
                </svg>
              </div>

              <div className="flex justify-between text-[10px] text-slate-500 pt-1 border-t border-white/[0.04]">
                <span>Aujourd&apos;hui (J+1)</span>
                <span className={!isResolved ? "text-rose-400 font-bold" : "text-emerald-400 font-semibold"}>
                  24/09 : Prélèvement EDF (110 €)
                </span>
                <span>30 Septembre</span>
              </div>
            </div>

            {/* Transactions Feed (Clean List) */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span>Transactions Récentes</span>
                <span className="text-[10px] text-slate-500 font-normal">Synchronisé en temps réel</span>
              </div>

              <div className="flex flex-col gap-1.5">
                {INITIAL_TRANSACTIONS.slice(0, 4).map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-2.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] transition text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${
                        tx.type === "income" ? "bg-emerald-500/15 text-emerald-400" : "bg-white/[0.05] text-slate-300"
                      }`}>
                        {tx.type === "income" ? <ArrowDownLeft className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <span className="font-semibold text-white block text-xs">{tx.name}</span>
                        <span className="text-[10px] text-slate-400">{tx.date} • {tx.category}</span>
                      </div>
                    </div>
                    <span className={`font-bold ${tx.type === "income" ? "text-emerald-400" : "text-slate-200"}`}>
                      {tx.type === "income" ? "+" : "-"}{tx.amount} €
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Security Console Drawer (Edy Wise DJIHOUA) */}
      {showSecurityConsole && (
        <div className="fixed inset-x-0 bottom-0 z-50 bg-[#070A12]/95 border-t border-emerald-500/40 p-4 sm:p-5 backdrop-blur-2xl shadow-2xl animate-in slide-in-from-bottom duration-200">
          <div className="max-w-4xl mx-auto flex flex-col gap-3">
            
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="font-mono text-xs font-bold text-white tracking-wide">
                  Console Cybersécurité & RGPD — Edy Wise DJIHOUA (DPO)
                </span>
              </div>
              <button
                onClick={() => setShowSecurityConsole(false)}
                className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/[0.08] cursor-pointer"
              >
                Fermer [✕]
              </button>
            </div>

            <div className="font-mono text-[11px] space-y-1.5 text-slate-300">
              <p className="text-emerald-400">
                ✔ [AES-256-GCM] Chiffrement au repos • Clés DEK protégées sous HSM (SecNumCloud OVHcloud France)
              </p>
              <p className="text-teal-300">
                ✔ [DSP2 OAUTH2] Bridge Groupe BPCE • Zéro stockage d&apos;identifiants ni mots de passe bancaires
              </p>
              <p className="text-cyan-300">
                ✔ [ZERO-KNOWLEDGE] Isolation physique étanche : Table identités ≠ Table transactions financières
              </p>
              <p className={isKeyDestroyed ? "text-rose-400 font-bold" : "text-amber-300"}>
                {isKeyDestroyed
                  ? "✖ [CRYPTO-SHREDDING EXÉCUTÉ] Clé détruite avec succès ➔ Données financières mathématiquement effacées (RGPD Art. 17)"
                  : "⚡ [RGPD ART. 17] Droit à l'oubli instantané par destruction cryptographique"}
              </p>
            </div>

            {!isKeyDestroyed && (
              <button
                onClick={() => setIsKeyDestroyed(true)}
                className="self-start mt-1 px-3.5 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-2 transition cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Tester le Crypto-Shredding (Droit à l&apos;oubli)</span>
              </button>
            )}

          </div>
        </div>
      )}

      {/* Minimal Sleek Footer */}
      <footer className="border-t border-white/[0.04] bg-[#070A12] py-3 text-center text-xs text-slate-500">
        FinTrack © 2026 • ÉSTIAM Paris StartUp&apos;IT • Hassâne, Duval, Super Abel, Edy, Rayan, Randy
      </footer>

    </main>
  );
}
