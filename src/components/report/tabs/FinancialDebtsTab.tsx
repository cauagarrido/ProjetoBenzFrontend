import React from 'react';
import { FinancialDetails } from '../../../types/vehicle';
import {
  DollarSign,
  AlertCircle,
  CheckCircle2,
  Lock,
  Building,
  Calendar,
  CreditCard,
  FileCheck
} from 'lucide-react';
import { Badge } from '../../ui/Badge';

interface FinancialDebtsTabProps {
  financial: FinancialDetails;
}

export const FinancialDebtsTab: React.FC<FinancialDebtsTabProps> = ({ financial }) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(val);
  };

  const { hasDebts, totalDebtsAmount, debtsList, gravame } = financial;

  return (
    <div className="space-y-6">
      
      {/* Resumo Financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Total Débitos */}
        <div className={`p-5 rounded-2xl border ${
          hasDebts
            ? 'bg-rose-950/20 border-rose-500/30'
            : 'bg-emerald-950/20 border-emerald-500/30'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium uppercase">Total de Débitos Pendentes</span>
            <DollarSign className={`w-5 h-5 ${hasDebts ? 'text-rose-400' : 'text-emerald-400'}`} />
          </div>
          <div className={`text-2xl sm:text-3xl font-black mt-2 font-mono ${
            hasDebts ? 'text-rose-400' : 'text-emerald-400'
          }`}>
            {formatCurrency(totalDebtsAmount)}
          </div>
        </div>

        {/* Status IPVA & Licenciamento */}
        <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-3">
          <span className="text-xs text-slate-400 font-medium uppercase">IPVA & Licenciamento</span>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300">IPVA Anual:</span>
            <Badge variant={financial.ipvaStatus === 'OK' ? 'success' : 'danger'} size="sm">
              {financial.ipvaStatus === 'OK' ? 'Em Dia' : 'Pendente / Atrasado'}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
            <span className="text-slate-300">Licenciamento:</span>
            <Badge variant={financial.licensingStatus === 'OK' ? 'success' : 'danger'} size="sm">
              {financial.licensingStatus === 'OK' ? 'Licenciado' : 'Bloqueado'}
            </Badge>
          </div>
        </div>

        {/* Status Gravame */}
        <div className={`p-5 rounded-2xl border ${
          gravame.hasFinancialRestriction
            ? 'bg-amber-950/20 border-amber-500/30'
            : 'glass-panel border-slate-800'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium uppercase">Gravame / Alienação</span>
            <Lock className={`w-4 h-4 ${gravame.hasFinancialRestriction ? 'text-amber-400' : 'text-slate-500'}`} />
          </div>
          <div className="text-lg font-bold text-white mt-1">
            {gravame.status}
          </div>
          <p className="text-xs text-slate-400 mt-1 truncate">
            {gravame.financialInstitution || 'Veículo 100% quitado sem reserva de domínio'}
          </p>
        </div>

      </div>

      {/* Tabela Detalhada de Multas e Débitos */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-blue-400" />
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Detalhamento de Débitos e Multas de Trânsito
            </h4>
          </div>
          <span className="text-xs text-slate-400 font-mono font-medium">
            {debtsList.length} registro(s) encontrado(s)
          </span>
        </div>

        {debtsList.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <p className="font-bold text-slate-200">Veículo 100% Livre de Débitos</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 text-slate-400 font-bold border-b border-slate-800 uppercase text-[10px]">
                <tr>
                  <th className="p-4">Tipo</th>
                  <th className="p-4">Descrição da Ocorrência</th>
                  <th className="p-4">Órgão Emissor</th>
                  <th className="p-4">Vencimento</th>
                  <th className="p-4 text-right">Valor</th>
                  <th className="p-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {debtsList.map((debt) => (
                  <tr key={debt.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="p-4 font-bold text-white">{debt.type} {debt.year ? `(${debt.year})` : ''}</td>
                    <td className="p-4 text-slate-300">{debt.description}</td>
                    <td className="p-4 text-slate-400">{debt.organ || 'DETRAN'}</td>
                    <td className="p-4 text-slate-400 font-mono">{debt.dueDate}</td>
                    <td className="p-4 text-right font-bold text-rose-400 font-mono">
                      {formatCurrency(debt.amount)}
                    </td>
                    <td className="p-4 text-center">
                      <Badge
                        variant={debt.status === 'Pago' ? 'success' : (debt.status === 'Inscrito em Dívida Ativa' ? 'danger' : 'warning')}
                        size="sm"
                      >
                        {debt.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
