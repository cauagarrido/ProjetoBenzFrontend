import React from 'react';
import { ShieldCheck, Zap, Database, CheckCircle, Award } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const stats = [
    {
      icon: <Database className="w-5 h-5 text-blue-400" />,
      value: '+500.000',
      label: 'Veículos Consultados',
    },
    {
      icon: <Award className="w-5 h-5 text-emerald-400" />,
      value: '45+ Bases',
      label: 'Leilões & Seguradoras',
    },
    {
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      value: '3 Segundos',
      label: 'Liberação Instantânea',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-cyan-400" />,
      value: '100% Oficial',
      label: 'Dados Oficiais Denatran',
    },
  ];

  return (
    <div id="garantias" className="w-full max-w-6xl mx-auto mt-20 px-4">
      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 glass-panel rounded-2xl border border-slate-800">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center text-center p-3">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 mb-2 shadow-inner">
              {stat.icon}
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">{stat.value}</div>
            <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Trust guarantees features */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-blue-500/40 transition-all duration-300">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Proteção Antigolpe</h3>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition-all duration-300">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
            <CheckCircle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Histórico de Leilão com Fotos</h3>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all duration-300">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Relatório Completo na Tela</h3>
        </div>
      </div>
    </div>
  );
};
