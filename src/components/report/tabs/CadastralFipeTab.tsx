import React from 'react';
import { CadastralDetails, VehicleBasicInfo } from '../../../types/vehicle';
import {
  FileText,
  TrendingDown,
  TrendingUp,
  Cpu,
  Shield,
  Layers,
  Users,
  Car
} from 'lucide-react';

interface CadastralFipeTabProps {
  cadastral: CadastralDetails;
  basicInfo: VehicleBasicInfo;
}

export const CadastralFipeTab: React.FC<CadastralFipeTabProps> = ({
  cadastral,
  basicInfo,
}) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(val);
  };

  // Calcula variação do preço FIPE
  const firstFipe = cadastral.fipeHistory[0]?.value || cadastral.fipeValue;
  const currentFipe = cadastral.fipeValue;
  const variation = ((currentFipe - firstFipe) / firstFipe) * 100;

  return (
    <div className="space-y-6">
      
      {/* Grid Superior: Dados Técnicos & FIPE Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Card FIPE */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Tabela FIPE Oficial
            </span>
            <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
              Cód: {cadastral.fipeCode}
            </span>
          </div>

          <div>
            <span className="text-xs text-slate-400">Preço Médio de Mercado</span>
            <div className="text-3xl font-black text-emerald-400">
              {formatCurrency(cadastral.fipeValue)}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs">
              {variation >= 0 ? (
                <span className="text-emerald-400 font-semibold flex items-center gap-0.5">
                  <TrendingUp className="w-3.5 h-3.5" /> +{variation.toFixed(1)}%
                </span>
              ) : (
                <span className="text-rose-400 font-semibold flex items-center gap-0.5">
                  <TrendingDown className="w-3.5 h-3.5" /> {variation.toFixed(1)}%
                </span>
              )}
              <span className="text-slate-500">nos últimos 12 meses</span>
            </div>
          </div>

          {/* Histórico Recente FIPE */}
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <p className="text-[11px] font-semibold text-slate-300">Evolução de Preço:</p>
            <div className="space-y-1.5">
              {cadastral.fipeHistory.map((item, idx) => (
                <div key={idx} className="flex justify-between text-xs py-1 border-b border-slate-900 last:border-0">
                  <span className="text-slate-400">{item.month}</span>
                  <span className="font-semibold text-slate-200 font-mono">{formatCurrency(item.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dados Cadastrais Completos */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-400" />
            <span>Dados Estruturais & Cadastrais Completos</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <span className="text-slate-500 text-[10px] uppercase font-bold">Número do Chassi</span>
              <p className="font-mono font-bold text-slate-200 text-sm mt-0.5">{cadastral.chassis}</p>
            </div>

            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <span className="text-slate-500 text-[10px] uppercase font-bold">Código Renavam</span>
              <p className="font-mono font-bold text-slate-200 text-sm mt-0.5">{cadastral.renavam}</p>
            </div>

            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <span className="text-slate-500 text-[10px] uppercase font-bold">Número do Motor</span>
              <p className="font-mono font-bold text-slate-200 text-sm mt-0.5">{cadastral.engine}</p>
            </div>

            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <span className="text-slate-500 text-[10px] uppercase font-bold">Procedência / Fabricação</span>
              <p className="font-bold text-slate-200 text-sm mt-0.5">{cadastral.origin}</p>
            </div>

            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <span className="text-slate-500 text-[10px] uppercase font-bold">Potência / Cilindradas</span>
              <p className="font-bold text-slate-200 text-sm mt-0.5">{cadastral.powerHp} • {cadastral.cylinderCapacity}</p>
            </div>

            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <span className="text-slate-500 text-[10px] uppercase font-bold">Segmento / Tipo</span>
              <p className="font-bold text-slate-200 text-sm mt-0.5">{cadastral.segment} ({cadastral.vehicleType})</p>
            </div>
          </div>


        </div>

      </div>

    </div>
  );
};
