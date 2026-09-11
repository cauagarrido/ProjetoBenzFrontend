import React from 'react';
import { ShieldCheck, History, Car, Lock, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

interface NavbarProps {
  onOpenHistory: () => void;
  historyCount: number;
  onResetToHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenHistory,
  historyCount,
  onResetToHome,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={onResetToHome}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-white">
                BENZ<span className="text-blue-500">CHECK</span>
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded uppercase tracking-wider">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              Inteligência & Histórico Veicular
            </p>
          </div>
        </button>

        {/* Navigation items for large screens */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <button
            onClick={onResetToHome}
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Car className="w-4 h-4 text-blue-400" />
            Nova Consulta
          </button>
          <a
            href="#como-funciona"
            className="hover:text-white transition-colors"
          >
            Como Funciona
          </a>
          <a
            href="#garantias"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Vantagens
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={onOpenHistory}
            className="relative border-slate-700 bg-slate-900 hover:bg-slate-800"
            leftIcon={<History className="w-4 h-4 text-blue-400" />}
          >
            <span className="hidden xs:inline">Minhas</span> Consultas
            {historyCount > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-bold bg-blue-600 text-white rounded-full">
                {historyCount}
              </span>
            )}
          </Button>

          <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-slate-800 text-xs text-slate-400">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Dados 100% Criptografados</span>
          </div>
        </div>
      </div>
    </header>
  );
};
