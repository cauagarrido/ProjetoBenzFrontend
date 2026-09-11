import React, { useState } from 'react';
import { FullVehicleReport } from '../../types/vehicle';
import { ReportHeader } from './ReportHeader';
import { RiskScoreGauge } from './RiskScoreGauge';
import { StatusBadgesGrid } from './StatusBadgesGrid';
import { CadastralFipeTab } from './tabs/CadastralFipeTab';
import { FinancialDebtsTab } from './tabs/FinancialDebtsTab';
import { RiskAuctionTab } from './tabs/RiskAuctionTab';
import { MileageOwnersTab } from './tabs/MileageOwnersTab';
import { InspectionCtaCard } from '../cta/InspectionCtaCard';
import { InsuranceQuoteCard } from '../cta/InsuranceQuoteCard';
import {
  FileText,
  DollarSign,
  Gavel,
  Users,
  ShieldCheck,
  Award
} from 'lucide-react';

interface ReportContainerProps {
  report: FullVehicleReport;
  onNewSearch: () => void;
}

export const ReportContainer: React.FC<ReportContainerProps> = ({
  report,
  onNewSearch,
}) => {
  const [activeTab, setActiveTab] = useState<'cadastral' | 'financial' | 'risk' | 'mileage'>('cadastral');

  const tabs = [
    {
      id: 'cadastral',
      label: 'Dados Cadastrais & FIPE',
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: 'financial',
      label: 'Histórico Financeiro & Débitos',
      icon: <DollarSign className="w-4 h-4" />,
      badge: report.financial.hasDebts ? `R$ ${report.financial.totalDebtsAmount.toFixed(0)}` : undefined,
    },
    {
      id: 'risk',
      label: 'Leilão, Sinistro & Restrições',
      icon: <Gavel className="w-4 h-4" />,
      alert: report.risks.auction.hasAuction || report.risks.accident.hasAccident || report.risks.judicialRestrictions.hasRestriction,
    },
    {
      id: 'mileage',
      label: 'Proprietários & Quilometragem',
      icon: <Users className="w-4 h-4" />,
      alert: report.risks.tamperingAlert.hasMileageTamperingSuspicion,
    },
  ];

  return (
    <div className="w-full min-h-screen bg-slate-950 pb-24 animate-in fade-in duration-300">
      
      {/* 1. Header Fixo do Relatório */}
      <ReportHeader report={report} onNewSearch={onNewSearch} />

      {/* Conteúdo Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* 2. Score de Risco Visual */}
        <section>
          <RiskScoreGauge risks={report.risks} />
        </section>

        {/* 3. Grade dos 8 Indicadores Críticos */}
        <section>
          <StatusBadgesGrid
            report={report}
            onTabSelect={(tabKey: any) => setActiveTab(tabKey)}
          />
        </section>

        {/* 4. Navegação por Abas Organizadas */}
        <section className="pt-4">
          <div className="flex border-b border-slate-800 space-x-2 sm:space-x-4 overflow-x-auto no-scrollbar pb-1 no-print">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'border-blue-500 text-blue-400 bg-blue-500/10 rounded-t-lg'
                      : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded font-mono">
                      {tab.badge}
                    </span>
                  )}
                  {tab.alert && (
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Painel da Aba Ativa */}
          <div className="mt-6">
            {activeTab === 'cadastral' && (
              <CadastralFipeTab
                cadastral={report.cadastral}
                basicInfo={report.basicInfo}
              />
            )}
            {activeTab === 'financial' && (
              <FinancialDebtsTab financial={report.financial} />
            )}
            {activeTab === 'risk' && (
              <RiskAuctionTab risks={report.risks} />
            )}
            {activeTab === 'mileage' && (
              <MileageOwnersTab ownersMileage={report.ownersMileage} />
            )}
          </div>
        </section>

        {/* 5. CTA Vistoria Cautelar Presencial */}
        <section className="no-print pt-6">
          <InspectionCtaCard plate={report.basicInfo.plate} />
        </section>

        {/* 6. CTA Proteção e Seguro Veicular */}
        <section className="no-print">
          <InsuranceQuoteCard
            plate={report.basicInfo.plate}
            brand={report.basicInfo.brand}
            model={report.basicInfo.model}
          />
        </section>

      </div>

    </div>
  );
};
