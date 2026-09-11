import React from 'react';
import {
  VehicleBasicInfo
} from '../../types/vehicle';
import {
  CheckCircle,
  Lock,
  Car,
  ArrowRight,
  Sparkles,
  MapPin,
  Calendar,
  Fuel,
  Palette
} from 'lucide-react';
import { Button } from '../ui/Button';

interface VehiclePreviewCardProps {
  basicInfo: VehicleBasicInfo;
  onProceedToCheckout: () => void;
  onBackToSearch: () => void;
}

export const VehiclePreviewCard: React.FC<VehiclePreviewCardProps> = ({
  basicInfo,
  onProceedToCheckout,
  onBackToSearch,
}) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(val);
  };

  const unlockedFeatures = [
    { title: 'Histórico de Leilão com Fotos' },
    { title: 'Registro de Sinistro & Colisão' },
    { title: 'Multas e Débitos Estaduais' },
    { title: 'Gravame & Financiamento Ativo' },
    { title: 'Bloqueios Judiciais (RENAJUD)' },
    { title: 'Histórico de Proprietários & KM' },
    { title: 'Histórico de Desvalorização FIPE' },
    { title: 'Chamados de Recall Pendentes' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-in fade-in zoom-in-95 duration-300">
      
      {/* Header com indicador de progresso */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBackToSearch}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          ← Fazer outra busca
        </button>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-semibold text-emerald-400">Veículo Localizado com Sucesso</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Coluna Esquerda: Dados Básicos Encontrados */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel rounded-2xl p-6 border border-slate-700/80 shadow-xl relative overflow-hidden">
            
            {/* Tag de Placa Mercosul Estilizada */}
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-[#003399] text-white text-xs font-black tracking-widest rounded uppercase border border-blue-400/30">
                {basicInfo.plate}
              </span>
              <span className="text-xs text-slate-400 font-mono">Base Nacional</span>
            </div>

            {/* Nome do Carro */}
            <h2 className="text-xl font-black text-white leading-tight">
              {basicInfo.brand} {basicInfo.model}
            </h2>
            <p className="text-xs text-slate-400 mt-1">{basicInfo.version}</p>

            {/* Grid de Especificações */}
            <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-slate-800">
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <Calendar className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Ano Fab / Mod</p>
                  <p className="font-semibold text-slate-200">{basicInfo.yearFabrication} / {basicInfo.yearModel}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <Palette className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Cor Oficial</p>
                  <p className="font-semibold text-slate-200">{basicInfo.color}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <Fuel className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Combustível</p>
                  <p className="font-semibold text-slate-200">{basicInfo.fuel}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Município</p>
                  <p className="font-semibold text-slate-200">{basicInfo.city} - {basicInfo.state}</p>
                </div>
              </div>
            </div>

            {/* Valor Tabela FIPE */}
            <div className="mt-6 p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-[11px] text-slate-400 font-medium">Preço Médio na Tabela FIPE</p>
                <p className="text-lg font-black text-emerald-400">{formatCurrency(basicInfo.fipeValue)}</p>
              </div>
              <span className="text-[10px] font-mono text-slate-500 bg-slate-800 px-2 py-1 rounded">
                FIPE: {basicInfo.fipeCode}
              </span>
            </div>

            {/* Dados Mascarados */}
            <div className="mt-4 space-y-1.5 text-[11px] text-slate-400 bg-slate-950/40 p-3 rounded-lg border border-slate-800/60 font-mono">
              <div className="flex justify-between">
                <span>Chassi:</span>
                <span className="text-slate-300">{basicInfo.chassisMasked}</span>
              </div>
              <div className="flex justify-between">
                <span>Renavam:</span>
                <span className="text-slate-300">{basicInfo.renavamMasked}</span>
              </div>
              <div className="flex justify-between">
                <span>Motor:</span>
                <span className="text-slate-300">{basicInfo.engineMasked}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Coluna Direita: O que você vai desbloquear & Checkout CTA */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-blue-500/30 shadow-2xl relative">
            
            <h3 className="text-2xl font-black text-white">
              Desbloqueie o Relatório Completo
            </h3>

            {/* Checklist de Itens Desbloqueados */}
            <div className="mt-6 space-y-3">
              {unfeatures(unlockedFeatures)}
            </div>

            {/* Caixa de Preço e Ação */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-white">R$ 49,99</span>
                  <span className="text-xs text-slate-400">no PIX Instantâneo</span>
                </div>
              </div>

              <Button
                variant="glow"
                size="lg"
                onClick={onProceedToCheckout}
                className="w-full sm:w-auto text-base py-3.5 px-8"
                rightIcon={<ArrowRight className="w-5 h-5 ml-1" />}
              >
                Liberar Relatório com PIX
              </Button>
            </div>



          </div>
        </div>

      </div>

    </div>
  );
};

function unfeatures(items: { title: string }[]) {
  return items.map((item, index) => (
    <div key={index} className="flex items-center gap-2.5">
      <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 flex-shrink-0">
        <CheckCircle className="w-3.5 h-3.5" />
      </div>
      <h4 className="text-xs font-bold text-slate-200">{item.title}</h4>
    </div>
  ));
}
