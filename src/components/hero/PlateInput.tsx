import React, { useState, useEffect } from 'react';

interface PlateInputProps {
  value: string;
  onChange: (plate: string) => void;
  onSubmit?: () => void;
  disabled?: boolean;
}

export const PlateInput: React.FC<PlateInputProps> = ({
  value,
  onChange,
  onSubmit,
  disabled = false,
}) => {
  const [plateStyle, setPlateStyle] = useState<'mercosul' | 'traditional'>('mercosul');

  // Formata a placa enquanto o usuário digita
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 7);
    
    // Auto-detecta o estilo
    // Se o 5º caractere for número (ex: ABC1234), é tradicional. Se for letra (ex: ABC1D23), é Mercosul.
    if (raw.length >= 5) {
      const fifthChar = raw[4];
      if (/[0-9]/.test(fifthChar)) {
        setPlateStyle('traditional');
      } else {
        setPlateStyle('mercosul');
      }
    }

    onChange(raw);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSubmit) {
      onSubmit();
    }
  };

  // Placa formatada para exibição
  const getDisplayValue = () => {
    if (!value) return '';
    if (plateStyle === 'traditional' && value.length > 3) {
      return `${value.slice(0, 3)}-${value.slice(3)}`;
    }
    return value;
  };

  const isValidPlate = (val: string) => {
    const clean = val.replace(/[^A-Z0-9]/g, '');
    const mercosulRegex = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;
    const oldRegex = /^[A-Z]{3}[0-9]{4}$/;
    return mercosulRegex.test(clean) || oldRegex.test(clean);
  };

  const isComplete = value.length === 7;
  const valid = isValidPlate(value);

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      {/* Container da Placa Estilizada */}
      <div
        className={`w-full transition-all duration-300 transform ${
          plateStyle === 'mercosul'
            ? 'bg-white border-4 border-black rounded-xl shadow-2xl shadow-blue-900/40'
            : 'bg-slate-300 border-4 border-slate-700 rounded-xl shadow-2xl shadow-slate-900/40'
        } ${isComplete && !valid ? 'ring-4 ring-rose-500' : ''} ${
          valid ? 'ring-4 ring-emerald-500/50' : ''
        }`}
      >
        {/* Topo da Placa Mercosul */}
        {plateStyle === 'mercosul' ? (
          <div className="bg-[#003399] px-4 py-1.5 flex items-center justify-between text-white border-b-2 border-black">
            <div className="flex items-center gap-1.5">
              {/* Emblema Mercosul Estilizado */}
              <div className="w-5 h-5 rounded-full border border-yellow-300 flex items-center justify-center bg-blue-900">
                <span className="text-[9px] text-yellow-300 font-bold">★</span>
              </div>
              <span className="text-[11px] font-black tracking-widest text-slate-100 uppercase">
                BRASIL
              </span>
            </div>

            {/* Bandeira do Brasil */}
            <div className="w-6 h-4 bg-[#009739] rounded-[2px] flex items-center justify-center relative overflow-hidden shadow-inner">
              <div className="w-4 h-2.5 bg-[#FED100] transform rotate-45 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#003399] rounded-full"></div>
              </div>
            </div>
          </div>
        ) : (
          /* Topo da Placa Antiga */
          <div className="bg-slate-400 px-3 py-1 flex items-center justify-center text-slate-800 text-[10px] font-bold tracking-widest uppercase border-b border-slate-600">
            <span>SP - SÃO PAULO</span>
          </div>
        )}

        {/* Corpo com Input da Placa */}
        <div className="p-3 bg-white flex items-center justify-center relative">
          <input
            type="text"
            value={getDisplayValue()}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder="ABC1D23"
            maxLength={plateStyle === 'traditional' ? 8 : 7}
            className={`w-full text-center bg-transparent text-slate-950 font-black tracking-[0.25em] text-3xl sm:text-4xl uppercase focus:outline-none placeholder:text-slate-300 ${
              plateStyle === 'mercosul' ? 'font-mono' : 'font-mono'
            }`}
            autoComplete="off"
            autoFocus
          />
        </div>
      </div>

      {/* Seletor manual e Dicas de validação */}
      <div className="flex items-center justify-between w-full mt-2.5 px-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Padrão:</span>
          <button
            type="button"
            onClick={() => setPlateStyle('mercosul')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
              plateStyle === 'mercosul'
                ? 'bg-blue-600 text-white font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Mercosul
          </button>
          <button
            type="button"
            onClick={() => setPlateStyle('traditional')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
              plateStyle === 'traditional'
                ? 'bg-slate-700 text-white font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Cinza (Antiga)
          </button>
        </div>

        <div>
          {value.length === 0 && (
            <span className="text-slate-500">Ex: BRA2E19 ou ABC1234</span>
          )}
          {value.length > 0 && !valid && isComplete && (
            <span className="text-rose-400 font-semibold">Formato inválido</span>
          )}
          {valid && (
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              ✓ Placa válida
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
