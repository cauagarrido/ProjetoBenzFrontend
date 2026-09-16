import React, { useState } from 'react';
import { ShieldCheck, ChevronDown, User, History, LogOut } from 'lucide-react';

interface NavbarProps {
  theme?: 'dark' | 'light';
  onOpenHistory?: () => void;
  historyCount?: number;
  onResetToHome: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme = 'dark',
  onOpenHistory,
  historyCount = 0,
  onResetToHome,
  onNavigateSection,
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const isDark = theme === 'dark';

  return (
    <header
      className={`w-full transition-colors duration-200 sticky top-0 z-40 ${
        isDark
          ? 'bg-[#090e17]/95 border-b border-slate-800/80 backdrop-blur-md text-white'
          : 'bg-white border-b border-slate-200 shadow-sm text-slate-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logotipo Compra Segura VEÍCULOS */}
        <button
          onClick={onResetToHome}
          className="flex items-center gap-3 group text-left focus:outline-none cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full bg-[#090e17] rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center">
              <span className={`text-lg sm:text-xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Compra Segura
              </span>
            </div>
            <p className="text-[10px] tracking-[0.2em] font-bold text-slate-400 uppercase -mt-0.5">
              VEÍCULOS
            </p>
          </div>
        </button>

        {/* Central Nav Links (Aparece na Home escura) */}
        {isDark ? (
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <button
              onClick={onResetToHome}
              className="text-white hover:text-emerald-400 transition-colors cursor-pointer font-semibold relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-emerald-400 after:rounded-full"
            >
              Home
            </button>
            <button
              onClick={() => onNavigateSection?.('como-funciona')}
              className="hover:text-emerald-400 transition-colors cursor-pointer text-slate-300"
            >
              Como funciona
            </button>
            <button
              onClick={() => onNavigateSection?.('servicos')}
              className="hover:text-emerald-400 transition-colors cursor-pointer text-slate-300"
            >
              Nossos serviços
            </button>
            <button
              onClick={() => onNavigateSection?.('duvidas')}
              className="hover:text-emerald-400 transition-colors cursor-pointer text-slate-300"
            >
              Dúvidas
            </button>
          </nav>
        ) : null}

        {/* Lado Direito */}
        <div className="flex items-center gap-3">
          {isDark ? (
            <div className="flex items-center gap-4">
              <button
                onClick={onOpenHistory}
                className="text-sm font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer px-3 py-2 flex items-center gap-1.5"
              >
                <span>Entrar</span>
                {historyCount > 0 && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                )}
              </button>

              <button
                onClick={onOpenHistory}
                className="bg-[#00e676] hover:bg-[#00c853] text-slate-950 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                Criar conta
              </button>
            </div>
          ) : (
            /* Perfil do Usuário no Dashboard Claro (Olá, Ana ⌄) */
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-colors cursor-pointer text-xs sm:text-sm font-semibold text-slate-700"
              >
                <div className="w-7 h-7 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 font-bold text-xs">
                  A
                </div>
                <span>Olá, Ana</span>
                <ChevronDown className="w-4 h-4 text-slate-400 ml-0.5" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 text-xs text-slate-700">
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      onOpenHistory?.();
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2 font-medium"
                  >
                    <History className="w-4 h-4 text-slate-400" />
                    <span>Minhas Consultas ({historyCount})</span>
                  </button>
                  <div className="border-t border-slate-100 my-1"></div>
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      onResetToHome();
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 text-rose-600 flex items-center gap-2 font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sair / Nova Consulta</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

