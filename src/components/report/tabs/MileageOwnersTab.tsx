import React from 'react';
import { OwnersAndMileageDetails } from '../../../types/vehicle';
import {
  Users,
  Gauge,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  Building,
  User,
  Activity
} from 'lucide-react';
import { Badge } from '../../ui/Badge';

interface MileageOwnersTabProps {
  ownersMileage: OwnersAndMileageDetails;
}

export const MileageOwnersTab: React.FC<MileageOwnersTabProps> = ({ ownersMileage }) => {
  const {
    totalOwnersCount,
    usageProfile,
    estimatedCurrentMileage,
    ownerHistory,
    mileageHistory,
  } = ownersMileage;

  // Verifica se há medições suspeitas (adulteração)
  const hasTamperedMileage = mileageHistory.some(m => m.isSuspect);

  return (
    <div className="space-y-6">
      
      {/* Resumo Proprietários & KM */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Total de Proprietários */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium uppercase">Quantidade de Donos</span>
            <Users className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white mt-2 font-mono">
            {totalOwnersCount} {totalOwnersCount === 1 ? 'Proprietário' : 'Proprietários'}
          </div>
        </div>

        {/* Perfil de Uso */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium uppercase">Perfil de Utilização</span>
            <Building className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="text-lg font-bold text-white mt-2">
            {usageProfile}
          </div>
        </div>

        {/* Odômetro Estimado */}
        <div className={`p-5 rounded-2xl border ${
          hasTamperedMileage ? 'bg-rose-950/20 border-rose-500/30' : 'glass-panel border-slate-800'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium uppercase">Quilometragem Registrada</span>
            <Gauge className={`w-5 h-5 ${hasTamperedMileage ? 'text-rose-400' : 'text-emerald-400'}`} />
          </div>
          <div className={`text-2xl sm:text-3xl font-black mt-2 font-mono ${
            hasTamperedMileage ? 'text-rose-400' : 'text-emerald-400'
          }`}>
            {estimatedCurrentMileage.toLocaleString('pt-BR')} km
          </div>
          <div className="mt-1">
            {hasTamperedMileage ? (
              <Badge variant="danger" size="sm" icon={<AlertTriangle className="w-3.5 h-3.5" />}>
                Indício de Adulteração de KM
              </Badge>
            ) : (
              <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                ✓ Evolução regular de quilometragem
              </span>
            )}
          </div>
        </div>

      </div>

      {/* Alerta de Odômetro Adulterado se houver */}
      {hasTamperedMileage && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0" />
          <h4 className="font-bold text-rose-200">ALERTA: Inconsistência de Odômetro Detectada</h4>
        </div>
      )}

      {/* Grid: Linha do Tempo de Donos + Histórico de KM */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Histórico de Proprietários */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-400" />
            <span>Linha do Tempo de Proprietários</span>
          </h4>

          <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-800">
            {ownerHistory.map((owner, idx) => (
              <div key={idx} className="relative flex items-start gap-4 text-xs">
                <div className="w-7 h-7 rounded-full bg-slate-900 border-2 border-blue-500 flex items-center justify-center text-blue-400 font-bold z-10 flex-shrink-0">
                  {owner.ownerNumber}
                </div>
                <div className="flex-1 p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{owner.ownerType}</span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                      Estado: {owner.state}
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px] mt-1">
                    Período: {owner.periodStart} até {owner.periodEnd} ({owner.durationMonths} meses de posse)
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Histórico de Odômetro Registrado */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Registros de Odômetro (KM)</span>
          </h4>

          <div className="space-y-2.5">
            {mileageHistory.map((item, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                  item.isSuspect
                    ? 'bg-rose-950/30 border-rose-500/40 text-rose-300'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-slate-400 text-[11px] w-16">{item.date}</span>
                  <div>
                    <p className="font-bold text-white">{item.source}</p>
                    {item.isSuspect && (
                      <span className="text-[10px] text-rose-400 font-semibold">
                        ⚠️ Queda anormal em relação ao registro anterior
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <span className={`font-mono font-bold text-sm ${
                    item.isSuspect ? 'text-rose-400' : 'text-slate-100'
                  }`}>
                    {item.mileage.toLocaleString('pt-BR')} km
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
