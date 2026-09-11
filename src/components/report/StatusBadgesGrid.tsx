import React from 'react';
import { FullVehicleReport } from '../../types/vehicle';
import {
  Gavel,
  ShieldAlert,
  DollarSign,
  AlertOctagon,
  KeyRound,
  Scale,
  Wrench,
  Gauge,
  CheckCircle2,
  XCircle,
  AlertTriangle
} from 'lucide-react';

interface StatusBadgesGridProps {
  report: FullVehicleReport;
  onTabSelect?: (tabId: string) => void;
}

interface IndicatorItem {
  id: string;
  title: string;
  tab: string;
  status: 'safe' | 'warning' | 'danger';
  label: string;
  subtext: string;
  icon: React.ReactNode;
}

export const StatusBadgesGrid: React.FC<StatusBadgesGridProps> = ({
  report,
  onTabSelect,
}) => {
  const { financial, risks, cadastral } = report;

  // Lista dos 8 Indicadores Críticos
  const indicators: IndicatorItem[] = [
    {
      id: 'auction',
      title: 'Passagem por Leilão',
      tab: 'risk',
      status: risks.auction.hasAuction ? 'danger' : 'safe',
      label: risks.auction.hasAuction ? 'REGISTRO DE LEILÃO' : 'NÃO CONSTA',
      subtext: risks.auction.hasAuction ? `${risks.auction.category || 'Salvado'}` : 'Sem apontamentos',
      icon: <Gavel className="w-5 h-5" />,
    },
    {
      id: 'accident',
      title: 'Histórico de Sinistro',
      tab: 'risk',
      status: risks.accident.hasAccident ? 'danger' : 'safe',
      label: risks.accident.hasAccident ? (risks.accident.severity || 'COM SINISTRO') : 'SEM SINISTRO',
      subtext: risks.accident.hasAccident ? 'Colisão registrada' : 'Sem colisão grave',
      icon: <ShieldAlert className="w-5 h-5" />,
    },
    {
      id: 'debts',
      title: 'IPVA & Débitos Ativos',
      tab: 'financial',
      status: financial.hasDebts ? 'warning' : 'safe',
      label: financial.hasDebts ? `R$ ${financial.totalDebtsAmount.toFixed(2).replace('.', ',')}` : 'TUDO QUITADO',
      subtext: financial.hasDebts ? 'Débitos pendentes' : 'IPVA e taxas em dia',
      icon: <DollarSign className="w-5 h-5" />,
    },
    {
      id: 'theft',
      title: 'Roubo e Furto (SINESP)',
      tab: 'risk',
      status: risks.theftRecord.isStolenOrTheftAlert ? 'danger' : 'safe',
      label: risks.theftRecord.isStolenOrTheftAlert ? 'ALERTA ATIVO' : 'SEM QUEIXA',
      subtext: risks.theftRecord.isStolenOrTheftAlert ? 'Alerta policial' : 'Veículo liberado',
      icon: <AlertOctagon className="w-5 h-5" />,
    },
    {
      id: 'gravame',
      title: 'Gravame & Alienação',
      tab: 'financial',
      status: financial.gravame.hasFinancialRestriction ? 'warning' : 'safe',
      label: financial.gravame.hasFinancialRestriction ? 'ALIENADO' : 'QUITADO / LIVRE',
      subtext: financial.gravame.hasFinancialRestriction ? financial.gravame.financialInstitution?.slice(0, 18) || 'Banco Ativo' : 'Sem alienação',
      icon: <KeyRound className="w-5 h-5" />,
    },
    {
      id: 'judicial',
      title: 'Bloqueio Judicial RENAJUD',
      tab: 'risk',
      status: risks.judicialRestrictions.hasRestriction ? 'danger' : 'safe',
      label: risks.judicialRestrictions.hasRestriction ? 'RESTRINGIDO' : 'SEM RESTRIÇÃO',
      subtext: risks.judicialRestrictions.hasRestriction ? 'Impedimento legal' : 'Pronto p/ transferir',
      icon: <Scale className="w-5 h-5" />,
    },
    {
      id: 'recall',
      title: 'Chamado de Recall',
      tab: 'risk',
      status: risks.recall.hasPendingRecall ? 'warning' : 'safe',
      label: risks.recall.hasPendingRecall ? 'RECALL PENDENTE' : 'EM DIA',
      subtext: risks.recall.hasPendingRecall ? 'Concessionária' : 'Sem pendências',
      icon: <Wrench className="w-5 h-5" />,
    },
    {
      id: 'mileage',
      title: 'Integridade de KM',
      tab: 'mileage',
      status: risks.tamperingAlert.hasMileageTamperingSuspicion ? 'danger' : 'safe',
      label: risks.tamperingAlert.hasMileageTamperingSuspicion ? 'SUSPEITA DE FRAUDE' : 'KM CONSISTENTE',
      subtext: risks.tamperingAlert.hasMileageTamperingSuspicion ? 'Queda no odômetro' : 'Curva regular',
      icon: <Gauge className="w-5 h-5" />,
    },
  ];

  const getStatusStyles = (status: 'safe' | 'warning' | 'danger') => {
    if (status === 'safe') {
      return {
        cardBg: 'bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-400',
        badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        iconBg: 'bg-emerald-500/20 text-emerald-400',
        statusIcon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
      };
    }
    if (status === 'warning') {
      return {
        cardBg: 'bg-amber-950/20 border-amber-500/30 hover:border-amber-400',
        badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        iconBg: 'bg-amber-500/20 text-amber-400',
        statusIcon: <AlertTriangle className="w-4 h-4 text-amber-400" />,
      };
    }
    return {
      cardBg: 'bg-rose-950/20 border-rose-500/40 hover:border-rose-400',
      badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      iconBg: 'bg-rose-500/20 text-rose-400',
      statusIcon: <XCircle className="w-4 h-4 text-rose-400" />,
    };
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
          Resumo dos Indicadores Críticos
        </h3>
        <span className="text-xs text-slate-500">
          Clique no card para ver os detalhes
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {indicators.map((item) => {
          const styles = getStatusStyles(item.status);

          return (
            <button
              key={item.id}
              onClick={() => onTabSelect && onTabSelect(item.tab)}
              className={`p-4 rounded-xl border transition-all duration-200 text-left flex flex-col justify-between group cursor-pointer ${styles.cardBg}`}
            >
              <div className="flex items-start justify-between w-full mb-3">
                <div className={`p-2 rounded-lg ${styles.iconBg} group-hover:scale-105 transition-transform`}>
                  {item.icon}
                </div>
                {styles.statusIcon}
              </div>

              <div>
                <p className="text-[11px] text-slate-400 font-medium">
                  {item.title}
                </p>
                <div className="text-xs sm:text-sm font-black text-white mt-0.5 tracking-tight">
                  {item.label}
                </div>
                <p className="text-[10px] text-slate-500 mt-1 truncate">
                  {item.subtext}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
