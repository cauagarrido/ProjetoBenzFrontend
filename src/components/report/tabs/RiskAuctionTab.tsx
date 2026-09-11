import React from 'react';
import { RiskDetails } from '../../../types/vehicle';
import {
  Gavel,
  ShieldAlert,
  AlertOctagon,
  Scale,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Image as ImageIcon,
  AlertTriangle
} from 'lucide-react';
import { Badge } from '../../ui/Badge';

interface RiskAuctionTabProps {
  risks: RiskDetails;
}

export const RiskAuctionTab: React.FC<RiskAuctionTabProps> = ({ risks }) => {
  const { auction, accident, theftRecord, judicialRestrictions } = risks;

  return (
    <div className="space-y-6">
      
      {/* 1. Card de Leilão */}
      <div className={`p-6 rounded-2xl border ${
        auction.hasAuction
          ? 'bg-rose-950/15 border-rose-500/30'
          : 'glass-panel border-slate-800'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${
              auction.hasAuction ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'
            }`}>
              <Gavel className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">
                Histórico de Passagem em Leilão
              </h4>
              <p className="text-xs text-slate-400">
                Consulta em mais de 45 empresas de leilão homologadas
              </p>
            </div>
          </div>

          <Badge variant={auction.hasAuction ? 'danger' : 'success'} size="md">
            {auction.hasAuction ? 'REGISTRO DE LEILÃO LOCALIZADO' : 'NENHUM LEILÃO ENCONTRADO'}
          </Badge>
        </div>

        {auction.hasAuction ? (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <span className="text-slate-500 text-[10px] uppercase font-bold">Leiloeiro / Empresa</span>
                <p className="font-bold text-slate-200 mt-0.5">{auction.auctioneer || 'Copart do Brasil'}</p>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <span className="text-slate-500 text-[10px] uppercase font-bold">Comitente (Origem)</span>
                <p className="font-bold text-slate-200 mt-0.5">{auction.comitente || 'Seguradora / Financeira'}</p>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <span className="text-slate-500 text-[10px] uppercase font-bold">Categoria & Lote</span>
                <p className="font-bold text-slate-200 mt-0.5">{auction.category} ({auction.lotNumber})</p>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <span className="text-slate-500 text-[10px] uppercase font-bold">Classificação de Avaria</span>
                <p className="font-bold text-rose-400 mt-0.5">{auction.damageLevel}</p>
              </div>
            </div>

            {auction.notes && (
              <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs text-rose-300">
                <strong>Observações do Lote:</strong> {auction.notes}
              </div>
            )}

            {/* Fotos do Leilão */}
            {auction.images && auction.images.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
                  <ImageIcon className="w-4 h-4 text-blue-400" />
                  <span>Fotos do Veículo no Evento de Leilão:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {auction.images.map((imgUrl, i) => (
                    <div key={i} className="relative rounded-xl overflow-hidden border border-slate-700 group h-48">
                      <img
                        src={imgUrl}
                        alt={`Registro Leilão ${i + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/80 rounded text-[10px] text-white font-mono">
                        Foto Oficial do Lote #{i + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>

      {/* 2. Grid Sinistro, Roubo/Furto e Restrições Judiciais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Sinistro */}
        <div className={`p-5 rounded-2xl border ${
          accident.hasAccident ? 'bg-rose-950/20 border-rose-500/30' : 'glass-panel border-slate-800'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <ShieldAlert className={`w-5 h-5 ${accident.hasAccident ? 'text-rose-400' : 'text-emerald-400'}`} />
            <Badge variant={accident.hasAccident ? 'danger' : 'success'} size="sm">
              {accident.hasAccident ? 'COM SINISTRO' : 'SEM SINISTRO'}
            </Badge>
          </div>
          <h4 className="text-sm font-bold text-white">Histórico de Sinistro</h4>
          {accident.hasAccident && (
            <p className="text-xs text-slate-400 mt-1">
              Colisão com avaria de {accident.severity}. {accident.description || ''}
            </p>
          )}
        </div>

        {/* Roubo / Furto */}
        <div className={`p-5 rounded-2xl border ${
          theftRecord.isStolenOrTheftAlert ? 'bg-rose-950/20 border-rose-500/30' : 'glass-panel border-slate-800'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <AlertOctagon className={`w-5 h-5 ${theftRecord.isStolenOrTheftAlert ? 'text-rose-400' : 'text-emerald-400'}`} />
            <Badge variant={theftRecord.isStolenOrTheftAlert ? 'danger' : 'success'} size="sm">
              {theftRecord.isStolenOrTheftAlert ? 'ALERTA ATIVO' : 'SEM ALERTA'}
            </Badge>
          </div>
          <h4 className="text-sm font-bold text-white">Roubo e Furto (SINESP)</h4>
          <p className="text-xs text-slate-400 mt-1">{theftRecord.status}</p>
        </div>

        {/* Restrições Judiciais */}
        <div className={`p-5 rounded-2xl border ${
          judicialRestrictions.hasRestriction ? 'bg-rose-950/20 border-rose-500/30' : 'glass-panel border-slate-800'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <Scale className={`w-5 h-5 ${judicialRestrictions.hasRestriction ? 'text-rose-400' : 'text-emerald-400'}`} />
            <Badge variant={judicialRestrictions.hasRestriction ? 'danger' : 'success'} size="sm">
              {judicialRestrictions.hasRestriction ? 'BLOQUEIO JUDICIAL' : 'SEM RESTRIÇÃO'}
            </Badge>
          </div>
          <h4 className="text-sm font-bold text-white">Bloqueios RENAJUD</h4>
          {judicialRestrictions.hasRestriction && (
            <p className="text-xs text-slate-400 mt-1">
              {judicialRestrictions.courtName || 'Processo judicial impeditivo ativo.'}
            </p>
          )}
        </div>

      </div>

    </div>
  );
};
