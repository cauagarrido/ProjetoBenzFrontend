import React, { useState } from 'react';
import {
  FileText,
  ShieldCheck,
  Crosshair,
  Shield,
  ArrowRight,
  Lock,
  AlertCircle,
  ScanLine,
  ListFilter,
} from 'lucide-react';
import { FipeSearchForm } from './FipeSearchForm';
import { FipeVehicleData, VehicleKind } from '../../services/fipeService';

type SearchTab = 'placa' | 'fipe';

interface HeroSearchProps {
  plate: string;
  setPlate: (plate: string) => void;
  onSearch: (customPlate?: string) => void;
  onFipeResult: (data: FipeVehicleData, tipo: VehicleKind) => void;
  isLoading: boolean;
  error?: string | null;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  plate,
  setPlate,
  onSearch,
  onFipeResult,
  isLoading,
  error,
}) => {
  const [tab, setTab] = useState<SearchTab>('fipe');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 7);
    setPlate(raw);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSearch();
  };

  return (
    <div className="w-full relative overflow-hidden bg-[#090e17] text-white">
      {/* Luz ambiente de fundo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-[500px] h-[350px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 lg:pt-14 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">

          {/* Coluna Esquerda: Textos & Pílulas */}
          <div className="lg:col-span-6 space-y-6 text-left lg:pt-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              CONSULTA PROVISÓRIA LIBERADA — SEM CADASTRO
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.12] text-white">
              é a sua <span className="text-[#00e676]">segurança</span><br />
              na compra do seu<br />
              próximo veículo.
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              Consulte o valor FIPE real, verifique o histórico veicular, faça a vistoria cautelar e proteja seu veículo com as melhores opções de seguro.
            </p>

            {/* Pílulas de recursos */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              {[
                { icon: <FileText className="w-4 h-4" />, label: 'Histórico\nveicular' },
                { icon: <ShieldCheck className="w-4 h-4" />, label: 'Vistoria\ncautelar' },
                { icon: <Crosshair className="w-4 h-4" />, label: 'Tabela\nFIPE real' },
                { icon: <Shield className="w-4 h-4" />, label: 'Proteção\n(seguro)' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#0f1726]/80 border border-slate-800/80 hover:border-emerald-500/30 transition-colors text-center group"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-1.5 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-300 leading-tight whitespace-pre-line">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Coluna Direita: Card de Consulta com Abas */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-end justify-start">
            <div className="w-full max-w-md rounded-2xl bg-[#0d1624]/90 backdrop-blur-xl border border-slate-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden">

              {/* Abas */}
              <div className="flex border-b border-slate-700/80">
                <button
                  type="button"
                  onClick={() => setTab('fipe')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-xs font-bold transition-all cursor-pointer ${
                    tab === 'fipe'
                      ? 'text-emerald-400 border-b-2 border-emerald-400 bg-emerald-500/5'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <ListFilter className="w-3.5 h-3.5" />
                  Tabela FIPE
                </button>
                <button
                  type="button"
                  onClick={() => setTab('placa')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-xs font-bold transition-all cursor-pointer ${
                    tab === 'placa'
                      ? 'text-emerald-400 border-b-2 border-emerald-400 bg-emerald-500/5'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <ScanLine className="w-3.5 h-3.5" />
                  Por Placa
                </button>
              </div>

              {/* Conteúdo da aba */}
              <div className="p-6">

                {/* ABA FIPE */}
                {tab === 'fipe' && (
                  <div>
                    <div className="mb-5">
                      <h3 className="text-base font-bold text-white tracking-tight">
                        Consultar Tabela FIPE
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Dados oficiais via API Parallelum (gratuita).
                      </p>
                    </div>
                    <FipeSearchForm onResult={onFipeResult} isLoading={isLoading} />
                  </div>
                )}

                {/* ABA PLACA */}
                {tab === 'placa' && (
                  <div>
                    <div className="mb-4">
                      <h3 className="text-base font-bold text-white tracking-tight">
                        Consultar por Placa
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Informe a placa do veículo (Mercosul ou tradicional).
                      </p>
                    </div>

                    {/* Input placa Mercosul */}
                    <div className="relative flex items-center bg-white rounded-xl p-1 shadow-inner border-2 border-slate-200">
                      <div className="bg-[#003399] text-white px-2.5 py-2.5 rounded-l-lg flex flex-col items-center justify-center select-none">
                        <span className="text-[7px] text-yellow-300 font-bold leading-none">★</span>
                        <span className="text-[10px] font-black tracking-wider leading-none mt-0.5">BR</span>
                      </div>
                      <input
                        type="text"
                        value={plate}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="ABC1D23"
                        maxLength={7}
                        id="plate-input"
                        aria-label="Digite a placa do veículo"
                        className="w-full bg-transparent text-slate-900 font-black tracking-[0.2em] font-mono text-2xl sm:text-3xl text-center uppercase focus:outline-none placeholder:text-slate-300 px-2"
                      />
                    </div>

                    {/* Botão Principal Consultar Placa */}
                    <button
                      type="button"
                      onClick={() => onSearch()}
                      disabled={isLoading || plate.length < 7}
                      id="search-plate-btn"
                      className="w-full mt-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-black text-sm tracking-wide transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-emerald-500/25 cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                          Consultar Placa {plate ? `(${plate})` : ''}
                        </>
                      )}
                    </button>

                    {/* Erro da API */}
                    {error && (
                      <div className="flex items-start gap-2 mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-xs font-medium">
                        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-400" />
                        <span>{error}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-center gap-1.5 mt-4 text-[11px] text-slate-400 font-medium">
                      <Lock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Consulta 100% segura e criptografada</span>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
