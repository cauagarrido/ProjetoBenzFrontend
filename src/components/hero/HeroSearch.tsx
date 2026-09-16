import React from 'react';
import {
  FileText,
  ShieldCheck,
  Crosshair,
  Shield,
  ArrowRight,
  Lock
} from 'lucide-react';

interface HeroSearchProps {
  plate: string;
  setPlate: (plate: string) => void;
  onSearch: (customPlate?: string) => void;
  isLoading: boolean;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  plate,
  setPlate,
  onSearch,
  isLoading,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 7);
    setPlate(raw);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  const handlePresetSelect = (presetPlate: string) => {
    setPlate(presetPlate);
    onSearch(presetPlate);
  };

  return (
    <div className="w-full relative overflow-hidden bg-[#090e17] text-white">
      {/* Luz ambiente de fundo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-[500px] h-[350px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* Seção Principal do Hero (2 Colunas) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 lg:pt-14 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Coluna Esquerda: Textos & Pílulas de Benefício */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-block">
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.25em] text-slate-400 uppercase">
                MAIS QUE UMA CONSULTA,
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.12] text-white">
              é a sua <span className="text-[#00e676]">segurança</span><br />
              na compra do seu<br />
              próximo veículo.
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              Consulte o histórico, faça a vistoria cautelar, confira a documentação e ainda proteja seu veículo com as melhores opções de seguro.
            </p>

            {/* 4 Pílulas de Recursos abaixo do texto */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#0f1726]/80 border border-slate-800/80 hover:border-emerald-500/30 transition-colors text-center group">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-1.5 group-hover:scale-110 transition-transform">
                  <FileText className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-semibold text-slate-300 leading-tight">
                  Histórico<br />veicular
                </span>
              </div>

              <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#0f1726]/80 border border-slate-800/80 hover:border-emerald-500/30 transition-colors text-center group">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-1.5 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-semibold text-slate-300 leading-tight">
                  Vistoria<br />cautelar
                </span>
              </div>

              <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#0f1726]/80 border border-slate-800/80 hover:border-emerald-500/30 transition-colors text-center group">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-1.5 group-hover:scale-110 transition-transform">
                  <Crosshair className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-semibold text-slate-300 leading-tight">
                  Análise<br />completa
                </span>
              </div>

              <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#0f1726]/80 border border-slate-800/80 hover:border-emerald-500/30 transition-colors text-center group">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-1.5 group-hover:scale-110 transition-transform">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-semibold text-slate-300 leading-tight">
                  Proteção<br />(seguro)
                </span>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Imagem do Carro & Card Flutuante de Consulta */}
          <div className="lg:col-span-6 relative flex flex-col items-center lg:items-end justify-center mt-6 lg:mt-0">
            
            {/* Foto Ilustrativa de SUV Escuro com Efeito de Contorno */}
            <div className="relative w-full max-w-lg lg:max-w-xl">
              <div className="relative z-10 w-full overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=85"
                  alt="Veículo Moderno Benz Check"
                  className="w-full h-[320px] sm:h-[380px] object-cover object-center rounded-2xl shadow-2xl brightness-90 contrast-110 filter"
                  style={{
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)'
                  }}
                />
              </div>

              {/* Card Flutuante de Busca por Placa */}
              <div className="relative lg:absolute lg:bottom-4 lg:right-2 z-20 w-full max-w-md mt-6 lg:mt-0 p-6 rounded-2xl bg-[#0d1624]/90 backdrop-blur-xl border border-slate-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight text-left">
                  Consulte pela placa
                </h3>
                <p className="text-xs text-slate-400 font-normal mt-0.5 mb-4 text-left">
                  Em segundos, descubra o histórico do veículo.
                </p>

                {/* Input estilizado como Placa Mercosul com botão integrado */}
                <div className="relative flex items-center bg-white rounded-xl p-1 shadow-inner border-2 border-slate-200">
                  {/* Faixa Azul Mercosul */}
                  <div className="bg-[#003399] text-white px-2.5 py-2.5 rounded-l-lg flex flex-col items-center justify-center select-none">
                    <span className="text-[7px] text-yellow-300 font-bold leading-none">★</span>
                    <span className="text-[10px] font-black tracking-wider leading-none mt-0.5">BR</span>
                  </div>

                  {/* Campo de Digitação da Placa */}
                  <input
                    type="text"
                    value={plate}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="ABC1D23"
                    maxLength={7}
                    className="w-full bg-transparent text-slate-900 font-black tracking-[0.2em] font-mono text-2xl sm:text-3xl text-center uppercase focus:outline-none placeholder:text-slate-300 px-2"
                  />

                  {/* Botão de Envio Verde com Seta */}
                  <button
                    type="button"
                    onClick={() => onSearch()}
                    disabled={isLoading || plate.length < 7}
                    aria-label="Consultar placa"
                    className="bg-[#00e676] hover:bg-[#00c853] text-slate-950 p-3 rounded-lg flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 shadow-md cursor-pointer flex-shrink-0"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                    )}
                  </button>
                </div>

                {/* Microcopy de Segurança Criptografada */}
                <div className="flex items-center justify-center gap-1.5 mt-3 text-[11px] text-slate-400 font-medium">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Consulta 100% segura e criptografada</span>
                </div>

                {/* Teste Rápido com Placas Predefinidas */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-center gap-2 text-[11px]">
                  <span className="text-slate-400">Exemplo da referência:</span>
                  <button
                    type="button"
                    onClick={() => handlePresetSelect('ABC1D23')}
                    className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 font-mono font-bold transition-colors cursor-pointer"
                  >
                    ABC1D23 (Jeep Compass)
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

