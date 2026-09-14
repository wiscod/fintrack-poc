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
  { id: "1", name: "Virement Salaire / Client", category: "Revenus", date: "01 Sept", amount: 2100, type: "income" },
  { id: "2", name: "Virement Réserve Épargne", category: "Épargne", date: "02 Sept", amount: 500, type: "expense" },
  { id: "3", name: "Loyer & Charges", category: "Logement", date: "03 Sept", amount: 820, type: "expense" },
  { id: "4", name: "Courses Carrefour Market", category: "Alimentation", date: "08 Sept", amount: 180, type: "expense" },
  { id: "5", name: "Pass Navigo & Transports", category: "Transports", date: "12 Sept", amount: 86.4, type: "expense" },
  { id: "6", name: "Abonnements (Netflix & Spotify)", category: "Loisirs", date: "15 Sept", amount: 28.6, type: "expense" },
  { id: "7", name: "Sorties & Restaurants", category: "Loisirs", date: "18 Sept", amount: 75, type: "expense" },
];

export default function FinTrackSimplePOC() {
  // Simple clean states
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

  // Reset demo
  const handleReset = () => {
    setIsResolved(false);
    setIsKeyDestroyed(false);
  };

  return (
    <main className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950 font-sans">
      
      {/* Clean Top Navigation Bar */}
      <header className="border-b border-slate-850 bg-slate-900/90 backdrop-blur sticky top-0 z-40 px-4 py-2.5">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          
          {/* Logo & App identity */}
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center font-black text-slate-950 text-sm shadow-md shadow-emerald-500/20">
              FT
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm tracking-tight text-white">FINTRACK</span>
                <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                  LIVE POC
                </span>
              </div>
              <span className="text-[11px] text-slate-400 hidden sm:block">
                Copilote Financier Prédictif • ÉSTIAM StartUp&apos;IT
              </span>
            </div>
          </div>

          {/* Core Controls */}
          <div className="flex items-center gap-2">
            
            {/* Mode Toggle: Particulier vs Freelance */}
            <div className="flex bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-xs">
              <button
                onClick={() => setMode("b2c")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition font-semibold text-xs ${
                  mode === "b2c" ? "bg-blue-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
                }`}
              >
                <User className="w-3.5 h-3.5" />
                Particulier
              </button>
              <button
                onClick={() => setMode("freelance")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition font-semibold text-xs ${
                  mode === "freelance" ? "bg-purple-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                Freelance Pro
              </button>
            </div>

            {/* Desktop Device View Switcher */}
            <div className="hidden md:flex bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-xs">
              <button
                onClick={() => setViewMode("phone")}
                className={`px-2 py-1.5 rounded-md transition ${
                  viewMode === "phone" ? "bg-slate-700 text-emerald-400" : "text-slate-400 hover:text-white"
                }`}
                title="Cadre Smartphone"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode("fullscreen")}
                className={`px-2 py-1.5 rounded-md transition ${
                  viewMode === "fullscreen" ? "bg-slate-700 text-emerald-400" : "text-slate-400 hover:text-white"
                }`}
                title="Plein Écran Web"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Security Drawer Button */}
            <button
              onClick={() => setShowSecurityConsole(!showSecurityConsole)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-300 text-xs font-semibold transition"
              title="Console Sécurité & RGPD (Edy Wise DJIHOUA)"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Sécurité</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 w-full max-w-5xl mx-auto p-4 flex flex-col items-center justify-start">
        
        {/* Helper Top Banner for the Presenter & Jury */}
        <div className="w-full max-w-md mb-3 flex items-center justify-between text-xs px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Cas Live : {isResolved ? "Découvert résolu avec succès" : "Risque détecté au 24/09 (-45 €)"}</span>
          </div>
          {isResolved && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-medium transition cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              Rejouer le test
            </button>
          )}
        </div>

        {/* Central App Wrapper (iPhone frame on desktop, clean full on mobile) */}
        <div
          className={`w-full transition-all duration-300 ${
            viewMode === "phone"
              ? "max-w-md rounded-[42px] border-[8px] border-slate-800 bg-slate-950 p-2 shadow-2xl shadow-emerald-500/10"
              : "max-w-2xl rounded-2xl border border-slate-800 bg-slate-950 p-4 md:p-6"
          }`}
        >
          {/* Phone Top Notch (only on phone mode) */}
          {viewMode === "phone" && (
            <div className="pt-2 px-6 pb-2 flex items-center justify-between text-[11px] font-semibold text-slate-400 border-b border-slate-900">
              <span>09:41</span>
              <div className="w-20 h-3.5 bg-slate-850 rounded-full" />
              <div className="flex items-center gap-1">
                <span>5G</span>
                <div className="w-4 h-2 border border-slate-400 rounded-2xs p-0.5">
                  <div className="w-full h-full bg-emerald-400 rounded-3xs" />
                </div>
              </div>
            </div>
          )}

          {/* Inside App Content */}
          <div className="p-3 sm:p-4 flex flex-col gap-3.5">
            
            {/* User Greeting & Status */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block font-medium">Bonjour Maxime 👋</span>
                <h1 className="text-base font-extrabold text-white tracking-tight">
                  {mode === "b2c" ? "Mon Compte Courant" : "Espace Freelance & Pro"}
                </h1>
              </div>
              <span className="px-2 py-0.5 text-[11px] font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                DSP2 Connecté
              </span>
            </div>

            {/* Main Balance Box */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-850 border border-slate-800 rounded-2xl p-4 shadow-lg">
              <div className="flex items-center justify-between mb-1 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                  Solde Actuel
                </span>
                <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                  Banque Principale
                </span>
              </div>

              <div className="text-3xl font-black text-white tracking-tight my-1">
                {currentBalance.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
              </div>

              {/* Sub Metrics: Savings & Projected Month-End Balance */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800 mt-2 text-xs">
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
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    Reste à Vivre Prévisionnel
                  </span>
                  <span className={`font-black mt-0.5 text-sm ${projectedEndOfMonth < 0 ? "text-rose-400" : "text-emerald-400"}`}>
                    {projectedEndOfMonth < 0 ? `${projectedEndOfMonth.toFixed(2)} € (Découvert)` : `+${projectedEndOfMonth.toFixed(2)} € (Sécurisé)`}
                  </span>
                </div>
              </div>
            </div>

            {/* ⭐ THE CORE LIVE DEMO: Proactive AI Copilot Card */}
            {!isResolved ? (
              <div className="bg-gradient-to-br from-rose-950/60 via-slate-900 to-slate-900 border-2 border-rose-500/70 rounded-2xl p-4 shadow-xl shadow-rose-500/10 animate-pulse">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 shrink-0 mt-0.5">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h2 className="font-bold text-sm text-rose-300">Alerte IA : Découvert Prévu le 24/09</h2>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold">
                        J-6
                      </span>
                    </div>
                    
                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                      Le prélèvement <strong className="text-white">EDF (110 €)</strong> et vos charges récurrentes vont faire chuter votre solde à <strong className="text-rose-400">-45,00 €</strong>.
                    </p>

                    <div className="mt-3 p-3 rounded-xl bg-slate-950/80 border border-rose-500/30 flex flex-col gap-2">
                      <div className="text-xs text-slate-200 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                        <span><strong>Action Recommandée</strong> : Virement de 60 € depuis la réserve d&apos;épargne.</span>
                      </div>

                      {/* The Big 1-Click Action Button */}
                      <button
                        onClick={() => setIsResolved(true)}
                        className="w-full py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Sécuriser en 1 Clic (Éviter 45 € de frais)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-emerald-950/40 border-2 border-emerald-500/60 rounded-2xl p-4 flex items-start gap-3 shadow-lg">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h2 className="font-bold text-sm text-emerald-300">Budget Sécurisé avec Succès !</h2>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                      Protégé
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Virement de <strong>60 €</strong> effectué. Votre solde prévisionnel repasse à <strong className="text-emerald-400">+15,00 €</strong>.
                  </p>
                  <p className="text-[11px] text-emerald-400 font-semibold mt-1">
                    ✅ 45 € de frais d&apos;incident et commissions d&apos;intervention économisés.
                  </p>
                </div>
              </div>
            )}

            {/* Mode Freelance Section (Clean 4-Column Grid) */}
            {mode === "freelance" && (
              <div className="bg-gradient-to-br from-purple-950/40 to-slate-900 border border-purple-500/40 rounded-2xl p-3.5 flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                    FinTrack Pro — Sanctuarisation Fiscale Automatique
                  </span>
                  <span className="text-[10px] px-2 py-0.5 bg-purple-500/20 text-purple-200 rounded-full font-bold">
                    Micro-Entreprise
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-1.5 text-center text-xs">
                  <div className="bg-slate-950/70 p-2 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Facturé HT</span>
                    <span className="font-bold text-white mt-0.5 block">{freelanceBilled} €</span>
                  </div>
                  <div className="bg-slate-950/70 p-2 rounded-xl border border-purple-500/30">
                    <span className="text-[10px] text-purple-300 block">URSSAF (22%)</span>
                    <span className="font-bold text-purple-400 mt-0.5 block">-{urssafReserve} €</span>
                  </div>
                  <div className="bg-slate-950/70 p-2 rounded-xl border border-blue-500/30">
                    <span className="text-[10px] text-blue-300 block">TVA (20%)</span>
                    <span className="font-bold text-blue-400 mt-0.5 block">-{tvaReserve} €</span>
                  </div>
                  <div className="bg-slate-950/70 p-2 rounded-xl border border-emerald-500/30">
                    <span className="text-[10px] text-emerald-300 block">Net Réel</span>
                    <span className="font-black text-emerald-400 mt-0.5 block">+{netAvailableFreelance} €</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 italic text-center">
                  💡 935 € (URSSAF) et 850 € (TVA) isolés automatiquement sur sous-comptes séquestres.
                </p>
              </div>
            )}

            {/* Simple Timeline Graph */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-3 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold text-slate-300">Courbe Prévisionnelle à J+30</span>
                <span>Seuil 0 € Découvert</span>
              </div>

              {/* Simple Visual SVG */}
              <div className="h-16 w-full relative">
                <svg className="w-full h-full" viewBox="0 0 300 60">
                  <line x1="0" y1="45" x2="300" y2="45" stroke="#334155" strokeDasharray="3,3" strokeWidth="1" />
                  {!isResolved ? (
                    <>
                      <path d="M 0,20 Q 100,25 180,35 T 240,55 T 300,48" fill="none" stroke="#F43F5E" strokeWidth="2.5" />
                      <circle cx="240" cy="55" r="4" fill="#F43F5E" className="animate-ping" />
                      <circle cx="240" cy="55" r="3" fill="#F43F5E" />
                    </>
                  ) : (
                    <>
                      <path d="M 0,20 Q 100,25 180,30 T 240,35 T 300,30" fill="none" stroke="#10B981" strokeWidth="2.5" />
                      <circle cx="240" cy="35" r="3" fill="#10B981" />
                    </>
                  )}
                </svg>
              </div>
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>Aujourd&apos;hui (J+1)</span>
                <span className={!isResolved ? "text-rose-400 font-bold" : "text-slate-400"}>J+24 (EDF 110€)</span>
                <span>Fin de mois (J+30)</span>
              </div>
            </div>

            {/* Transactions List */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span>Dernières Transactions</span>
                <span className="text-[10px] text-emerald-400 font-normal">API DSP2</span>
              </div>

              <div className="flex flex-col gap-1.5">
                {INITIAL_TRANSACTIONS.slice(0, 4).map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-2 rounded-xl bg-slate-900/50 border border-slate-850 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold ${
                        tx.type === "income" ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-800 text-slate-300"
                      }`}>
                        {tx.type === "income" ? <ArrowDownLeft className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
                      </div>
                      <div>
                        <span className="font-semibold text-white block text-[11px]">{tx.name}</span>
                        <span className="text-[10px] text-slate-500">{tx.date} • {tx.category}</span>
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
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950 border-t-2 border-emerald-500/60 p-4 shadow-2xl">
          <div className="max-w-4xl mx-auto flex flex-col gap-2.5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="font-mono text-xs font-bold text-white">
                  Console Sécurité & RGPD — Edy Wise DJIHOUA (DPO)
                </span>
              </div>
              <button
                onClick={() => setShowSecurityConsole(false)}
                className="text-xs text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800"
              >
                Fermer [✕]
              </button>
            </div>

            <div className="font-mono text-[11px] space-y-1 text-slate-300">
              <p className="text-emerald-400">
                [AES-256-GCM] Base chiffrée au repos • Clé DEK gérée sous HSM SecNumCloud
              </p>
              <p className="text-cyan-400">
                [DSP2-BRIDGE] Flux bancaire vérifié • Zéro mot de passe stocké en clair
              </p>
              <p className="text-blue-400">
                [ZERO-KNOWLEDGE] Table d&apos;identité étanche de la table de transactions financières
              </p>
              <p className={isKeyDestroyed ? "text-rose-400 font-bold" : "text-amber-300"}>
                {isKeyDestroyed
                  ? "[CRYPTO-SHREDDING EXÉCUTÉ] Clé DEK détruite définitivement ➔ Données irrécupérables (RGPD Art. 17)"
                  : "[RGPD ART. 17] Droit à l'oubli disponible en 1 clic"}
              </p>
            </div>

            {!isKeyDestroyed && (
              <button
                onClick={() => setIsKeyDestroyed(true)}
                className="self-start mt-1 px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs font-mono flex items-center gap-1.5 transition cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Tester la destruction de clé (Crypto-Shredding)
              </button>
            )}
          </div>
        </div>
      )}

      {/* Minimal Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-2.5 text-center text-xs text-slate-500">
        FinTrack © 2026 • ÉSTIAM Paris (4STUPIT) • Hassâne, Duval, Super Abel, Edy, Rayan, Randy
      </footer>

    </main>
  );
}
