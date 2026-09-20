import React, { useState } from 'react';
import { ShieldCheck, ChevronDown, History, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

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
  const { isAuthenticated, user, logout } = useAuth();

  const isDark = theme === 'dark';

  const userInitial = user?.name?.charAt(0).toUpperCase() ?? 'U';
  const firstName = user?.name?.split(' ')[0] ?? 'Usuário';

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    logout();
    onResetToHome();
  };

  return (
    <header
      className={`w-full transition-colors duration-200 sticky top-0 z-40 ${
        isDark
          ? 'bg-[#090e17]/95 border-b border-slate-800/80 backdrop-blur-md text-white'
          : 'bg-white border-b border-slate-200 shadow-sm text-slate-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logotipo Benz Check */}
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
            <div className="flex items-center gap-1.5">
              <span className={`text-lg sm:text-xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                BENZ<span className="text-emerald-500">CHECK</span>
              </span>
            </div>
            <p className="text-[10px] tracking-[0.18em] font-bold text-slate-400 uppercase -mt-0.5">
              CONSULTA VEICULAR
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
              {isAuthenticated && user ? (
                /* Usuário logado na home escura */
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-700 hover:border-slate-600 bg-slate-800/50 transition-colors cursor-pointer text-xs font-semibold text-slate-200"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-xs">
                      {userInitial}
                    </div>
                    <span>Olá, {firstName}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#0d1624] rounded-xl shadow-xl border border-slate-700 py-1.5 z-50 text-xs text-slate-300">
                      <button
                        onClick={() => { setIsUserMenuOpen(false); onOpenHistory?.(); }}
                        className="w-full text-left px-4 py-2 hover:bg-slate-700/50 flex items-center gap-2 font-medium"
                      >
                        <History className="w-4 h-4 text-slate-400" />
                        <span>Minhas Consultas ({historyCount})</span>
                      </button>
                      <div className="border-t border-slate-700 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-slate-700/50 text-rose-400 flex items-center gap-2 font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sair</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline-block text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    Modo Livre / Sem Cadastro
                  </span>

                  <button
                    onClick={onOpenHistory}
                    className="text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer px-3 py-2 flex items-center gap-2 rounded-xl bg-slate-800/40 border border-slate-700/60"
                  >
                    <History className="w-4 h-4 text-emerald-400" />
                    <span>Minhas Consultas</span>
                    {historyCount > 0 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold bg-emerald-500 text-slate-950 rounded-full">
                        {historyCount}
                      </span>
                    )}
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Perfil do Usuário no Dashboard Claro */
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-colors cursor-pointer text-xs sm:text-sm font-semibold text-slate-700"
              >
                <div className="w-7 h-7 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 font-bold text-xs">
                  {userInitial}
                </div>
                <span>Olá, {firstName}</span>
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
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 text-rose-600 flex items-center gap-2 font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sair</span>
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
