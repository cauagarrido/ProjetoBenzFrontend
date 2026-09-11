import React, { useState } from 'react';
import { InspectionModal } from './InspectionModal';
import { Button } from '../ui/Button';
import {
  Wrench,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  MapPin
} from 'lucide-react';

interface InspectionCtaCardProps {
  plate: string;
}

export const InspectionCtaCard: React.FC<InspectionCtaCardProps> = ({ plate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-blue-500/40 shadow-2xl relative overflow-hidden">
        
        {/* Glow ambient */}
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-blue-600/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Etapa Recomendada Pré-Compra</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white">
              Deseja uma Vistoria Cautelar Presencial com Laudo Físico?
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Agende com nossa rede parceira com mais de <strong>1.200 postos credenciados</strong>. Avaliação minuciosa da integridade estrutural, espessura de pintura, soldas de fábrica, longarinas e alinhamento de chassi.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Laudo pronto em 40 min</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Medição de micropintura</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Certificado digital com fotos</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-auto flex-shrink-0">
            <Button
              variant="glow"
              size="lg"
              onClick={() => setIsModalOpen(true)}
              className="w-full lg:w-auto py-3.5 px-6 text-sm"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Agendar Vistoria Física
            </Button>
          </div>

        </div>

      </div>

      <InspectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plate={plate}
      />
    </>
  );
};
