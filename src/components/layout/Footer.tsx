import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface FooterProps {
  theme?: 'dark' | 'light';
}

export const Footer: React.FC<FooterProps> = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';

  return (
    <footer
      className={`w-full py-8 text-xs sm:text-sm no-print transition-colors ${
        isDark
          ? 'bg-[#060a12] border-t border-slate-800/80 text-slate-400'
          : 'bg-white border-t border-slate-200 text-slate-500'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Branding */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-sm">
              <div className="w-full h-full bg-[#090e17] rounded-[6px] flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <div>
              <span className={`text-sm font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                BENZ<span className="text-emerald-500">CHECK</span> <span className="text-[10px] tracking-widest uppercase font-bold text-slate-400 ml-1">VEICULAR</span>
              </span>
            </div>
          </div>

          {/* Links e Copyright */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs">
            <span>Privacidade & Termos</span>
            <span>Consulta 100% Criptografada</span>
            <p className="text-slate-500">
              © {new Date().getFullYear()} Benz Check. Todos os direitos reservados.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

