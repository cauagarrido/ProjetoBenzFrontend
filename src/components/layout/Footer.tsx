import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 py-8 text-slate-400 text-sm mt-24 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Branding */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-black text-white">
              BENZ<span className="text-blue-500">CHECK</span>
            </span>
          </div>

          {/* Copyright */}
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} BenzCheck. Todos os direitos reservados.
          </p>

        </div>
      </div>
    </footer>
  );
};
