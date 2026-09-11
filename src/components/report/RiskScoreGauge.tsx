import React from 'react';
import { RiskDetails } from '../../types/vehicle';
import { ShieldCheck, AlertTriangle, ShieldAlert, Sparkles, CheckCircle, Info } from 'lucide-react';

interface RiskScoreGaugeProps {
  risks: RiskDetails;
}

export const RiskScoreGauge: React.FC<RiskScoreGaugeProps> = ({ risks }) => {
  const { riskScore, overallRiskLevel, riskSummary } = risks;

  // Determina cores e textos baseados no score
  const getScoreData = () => {
    if (overallRiskLevel === 'safe' || riskScore >= 80) {
      return {
        label: 'LIVRE DE RISCOS',
        sublabel: 'Excelente Procedência • Compra Segura',
        textColor: 'text-emerald-400',
        borderColor: 'border-emerald-500/30',
        bgColor: 'bg-emerald-500/10',
        glowColor: 'shadow-glow-green',
        strokeColor: '#10b981',
        icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />,
        tip: 'Veículo aprovado em todas as checagens críticas de segurança e integridade.'
      };
    }
    if (overallRiskLevel === 'warning' || riskScore >= 40) {
      return {
        label: 'ATENÇÃO - ALERTA MODERADO',
        sublabel: 'Apontamentos Relevantes Identificados',
        textColor: 'text-amber-400',
        borderColor: 'border-amber-500/30',
        bgColor: 'bg-amber-500/10',
        glowColor: 'shadow-glow-amber',
        strokeColor: '#f59e0b',
        icon: <AlertTriangle className="w-8 h-8 text-amber-400" />,
        tip: 'Recomenda-se cautela. Avalie débitos, histórico de leilão ou pendências antes do pagamento.'
      };
    }
    return {
      label: 'ALTO RISCO CRÍTICO',
      sublabel: 'Gravíssimos Apontamentos • Não Recomendado',
      textColor: 'text-rose-400',
      borderColor: 'border-rose-500/30',
      bgColor: 'bg-rose-500/10',
      glowColor: 'shadow-glow-red',
      strokeColor: '#f43f5e',
      icon: <ShieldAlert className="w-8 h-8 text-rose-400" />,
      tip: 'Veículo com histórico gravíssimo (bloqueio judicial, odômetro adulterado ou dívidas pesadas).'
    };
  };

  const data = getScoreData();

  // SVG Gauge calculations
  const radius = 62;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (riskScore / 100) * circumference;

  return (
    <div className={`p-6 sm:p-8 rounded-2xl glass-panel border ${data.borderColor} shadow-2xl relative overflow-hidden transition-all duration-300`}>
      
      {/* Background ambient light */}
      <div className={`absolute -right-10 -top-10 w-48 h-48 rounded-full ${data.bgColor} blur-3xl pointer-events-none`} />

      <div className="flex flex-col lg:flex-row items-center gap-8 justify-between">
        
        {/* Lado Esquerdo: Gauge Circular */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative w-36 h-36 flex items-center justify-center flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
              {/* Background Track */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="text-slate-800"
                strokeWidth="12"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Progress Arc */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke={data.strokeColor}
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Score Text in Center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className={`text-4xl font-black ${data.textColor} tracking-tight font-mono`}>
                {riskScore}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400 -mt-1">
                Score 100
              </span>
            </div>
          </div>

          {/* Status Text */}
          <div className="text-center sm:text-left space-y-1.5">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg ${data.bgColor} ${data.textColor} border ${data.borderColor} text-xs font-black tracking-wider uppercase`}>
              {data.label}
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              {data.sublabel}
            </h2>
            <p className="text-xs text-slate-400 max-w-md">
              {data.tip}
            </p>
          </div>
        </div>

        {/* Lado Direito: Resumo Estruturado */}
        <div className="w-full lg:w-96 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs space-y-2">
          <div className="flex items-center gap-1.5 text-slate-300 font-bold">
            <Info className="w-4 h-4 text-blue-400" />
            <span>Diagnóstico do Sistema BenzCheck:</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            {riskSummary}
          </p>
        </div>

      </div>

    </div>
  );
};
