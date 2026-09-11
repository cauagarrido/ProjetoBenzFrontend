import React from 'react';
import { Search, QrCode, FileText, CheckCircle2, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Digite a Placa do Carro',
      desc: '',
      icon: <Search className="w-6 h-6 text-blue-400" />,
      tag: '100% Online',
    },
    {
      step: '02',
      title: 'Libere Instantâneo com PIX',
      desc: '',
      icon: <QrCode className="w-6 h-6 text-emerald-400" />,
      tag: 'Apenas R$ 34,90',
    },
    {
      step: '03',
      title: 'Receba o Relatório Completo',
      desc: '',
      icon: <FileText className="w-6 h-6 text-indigo-400" />,
      tag: 'Acesso Imediato',
    },
  ];

  const comparisons = [
    { item: 'Registro de Leilão com Fotos', free: '❌ Oculto', benz: '✅ Lote, Comitente e Fotos' },
    { item: 'Sinistros e Perda Total (PT)', free: '❌ Não informa', benz: '✅ Média e Grande Monta' },
    { item: 'Débitos de IPVA, Multas e DPVAT', free: '⚠️ Apenas valor total', benz: '✅ Detalhado com órgão e data' },
    { item: 'Gravame & Alienação Bancária', free: '❌ Não informa', benz: '✅ Banco e Tipo de Contrato' },
    { item: 'Bloqueios Judiciais (RENAJUD)', free: '❌ Oculto', benz: '✅ Comarca e Processo' },
    { item: 'Verificação de Odômetro Adulterado', free: '❌ Não possui', benz: '✅ Gráfico de KM Histórico' },
  ];

  return (
    <div id="como-funciona" className="w-full max-w-6xl mx-auto mt-24 px-4 space-y-20">
      
      {/* 3 Passos da Jornada */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Jornada Simplificada
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-3">
            Como Funciona a Consulta BenzCheck
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all duration-300 relative group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="text-3xl font-black text-slate-800 font-mono">
                  {item.step}
                </span>
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                {item.tag}
              </span>

              <h3 className="text-lg font-bold text-white mt-2 mb-1.5">
                {item.title}
              </h3>

              {item.desc && (
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tabela Comparativa de Valor */}
      <div className="glass-panel rounded-2xl border border-slate-800 p-6 sm:p-8 overflow-hidden">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Por que a Consulta BenzCheck é Superior?
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="pb-4 font-bold">Informação Analisada</th>
                <th className="pb-4 text-center text-slate-500">Consultas Gratuitas</th>
                <th className="pb-4 text-center text-blue-400 font-bold">BenzCheck PRO</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {comparisons.map((c, i) => (
                <tr key={i} className="hover:bg-slate-900/30 transition-colors">
                  <td className="py-3.5 font-medium text-slate-200">{c.item}</td>
                  <td className="py-3.5 text-center text-slate-500">{c.free}</td>
                  <td className="py-3.5 text-center font-bold text-emerald-400">{c.benz}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
