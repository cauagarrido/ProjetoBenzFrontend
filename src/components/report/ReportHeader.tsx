import React, { useState } from 'react';
import { FullVehicleReport } from '../../types/vehicle';
import {
  Printer,
  Share2,
  Car,
  Check,
  Calendar,
  FileText,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { Button } from '../ui/Button';

interface ReportHeaderProps {
  report: FullVehicleReport;
  onNewSearch: () => void;
}

export const ReportHeader: React.FC<ReportHeaderProps> = ({
  report,
  onNewSearch,
}) => {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Relatório Veicular BenzCheck - ${report.basicInfo.plate}`,
        text: `Confira o histórico completo do veículo ${report.basicInfo.brand} ${report.basicInfo.model} (${report.basicInfo.plate})`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(d);
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="w-full bg-slate-900 border-b border-slate-800 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Identificação do Veículo */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            {/* Placa */}
            <span className="px-3.5 py-1 bg-[#003399] text-white text-sm font-black tracking-widest rounded-lg border border-blue-400/40 shadow-md">
              {report.basicInfo.plate}
            </span>

            <span className="px-2.5 py-0.5 text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Relatório Completo Desbloqueado
            </span>

            <span className="text-xs text-slate-400 font-mono">
              ID: {report.id}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {report.basicInfo.brand} {report.basicInfo.model}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <span>Versão: <strong className="text-slate-200">{report.basicInfo.version}</strong></span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              Consultado em: {formatDate(report.consultedAt)}
            </span>
          </div>
        </div>

        {/* Ações Rápidas (PDF, Compartilhar, Nova Consulta) */}
        <div className="flex flex-wrap items-center gap-2.5 no-print">
          <Button
            variant="secondary"
            size="sm"
            onClick={handlePrint}
            leftIcon={<Printer className="w-4 h-4 text-blue-400" />}
            title="Salvar ou Imprimir Relatório em PDF"
          >
            Imprimir / PDF
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleShare}
            leftIcon={copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-indigo-400" />}
          >
            {copied ? 'Link Copiado' : 'Compartilhar'}
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={onNewSearch}
            leftIcon={<Car className="w-4 h-4" />}
          >
            Nova Consulta
          </Button>
        </div>

      </div>
    </div>
  );
};
