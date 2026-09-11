import React from 'react';
import { Search, Sparkles, AlertCircle, CheckCircle, ShieldAlert } from 'lucide-react';
import { PlateInput } from './PlateInput';
import { Button } from '../ui/Button';

interface HeroSearchProps {
  plate: string;
  setPlate: (plate: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  plate,
  setPlate,
  onSearch,
  isLoading,
}) => {
  const isPlateValid = (val: string) => {
    const clean = val.replace(/[^A-Z0-9]/g, '');
    return clean.length === 7;
  };

  const handleSelectPreset = (presetPlate: string) => {
    setPlate(presetPlate);
  };

  return (
    <section className="relative pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col items-center text-center">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />



      {/* Main Title */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl leading-[1.15] sm:leading-[1.15]">
        Não compre no escuro. <br />
        <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
          Descubra o histórico completo
        </span>{' '}
        antes de fechar negócio.
      </h1>

      {/* Subtitle */}
      <p className="mt-5 text-slate-300 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
        Leilão · Sinistros · Multas · IPVA · Gravame · Bloqueios · Odômetro
      </p>

      {/* Plate Search Box */}
      <div className="w-full max-w-md mt-8 p-6 sm:p-8 rounded-2xl glass-panel border border-slate-700/80 shadow-2xl relative">
        <div className="mb-2 text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-center gap-1.5">
          <span>Digite a Placa do Veículo</span>
        </div>

        <PlateInput
          value={plate}
          onChange={setPlate}
          onSubmit={onSearch}
          disabled={isLoading}
        />

        <div className="mt-5">
          <Button
            variant="glow"
            size="lg"
            className="w-full text-base py-4"
            onClick={onSearch}
            isLoading={isLoading}
            disabled={!isPlateValid(plate)}
            rightIcon={<Search className="w-5 h-5 ml-1" />}
          >
            Consultar Veículo Agora
          </Button>
        </div>


      </div>

      {/* Quick Test Preset Buttons */}
      <div className="mt-8 flex flex-col items-center">
        <p className="text-xs font-semibold text-slate-400 mb-3 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
          Ou teste com placas demonstrativas reais:
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <button
            onClick={() => handleSelectPreset('BRA2E19')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 ${
              plate === 'BRA2E19'
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 ring-2 ring-emerald-500/30'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-emerald-500/50 hover:text-white'
            }`}
          >
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Civic Touring</span>
            <span className="text-[10px] font-mono bg-slate-800 px-1 py-0.5 rounded text-emerald-400">BRA2E19</span>
          </button>

          <button
            onClick={() => handleSelectPreset('ABC1D23')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 ${
              plate === 'ABC1D23'
                ? 'bg-amber-500/20 border-amber-500 text-amber-300 ring-2 ring-amber-500/30'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-amber-500/50 hover:text-white'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Compass</span>
            <span className="text-[10px] font-mono bg-slate-800 px-1 py-0.5 rounded text-amber-400">ABC1D23</span>
          </button>

          <button
            onClick={() => handleSelectPreset('XYZ9876')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 ${
              plate === 'XYZ9876'
                ? 'bg-rose-500/20 border-rose-500 text-rose-300 ring-2 ring-rose-500/30'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-rose-500/50 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span>Gol MSI</span>
            <span className="text-[10px] font-mono bg-slate-800 px-1 py-0.5 rounded text-rose-400">XYZ9876</span>
          </button>
        </div>
      </div>
    </section>
  );
};
