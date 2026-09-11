import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { vehicleApi } from '../../services/api';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  Phone,
  User,
  Mail,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface InsuranceQuoteCardProps {
  plate: string;
  brand: string;
  model: string;
}

export const InsuranceQuoteCard: React.FC<InsuranceQuoteCardProps> = ({
  plate,
  brand,
  model,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    zipCode: '',
    usageType: 'Trabalho / Dia a Dia' as const,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [protocol, setProtocol] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await vehicleApi.requestInsuranceQuote({
        plate,
        ...formData,
      });

      setProtocol(res.protocol);

      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch (e) {}
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setProtocol(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-emerald-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute left-0 top-0 w-80 h-80 bg-emerald-600/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Proteção & Seguro Inteligente</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white">
              Cote Seguro Auto para este {brand} {model} com 1 Clique
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Compare propostas de mais de 14 seguradoras parceiras (Porto Seguro, Tokio Marine, Allianz, Azul, Suhai). Cobertura completa contra roubo, colisão, terceiros e guincho 24h.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Planos a partir de R$ 99/mês
              </span>
              <span>•</span>
              <span>Sem fidelidade obrigatória</span>
              <span>•</span>
              <span>Instalação de rastreador inclusa</span>
            </div>
          </div>

          <div className="w-full lg:w-auto flex-shrink-0">
            <Button
              variant="success"
              size="lg"
              onClick={() => setIsModalOpen(true)}
              className="w-full lg:w-auto py-3.5 px-6 text-sm"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Simular Cotação Express
            </Button>
          </div>

        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        maxWidth="md"
        title={
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Cotação de Seguro Express</h3>
              <p className="text-xs text-slate-400 font-normal">Placa: {plate} • {brand} {model}</p>
            </div>
          </div>
        }
      >
        {protocol ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-white">Proposta Pré-Aprovada Enviada!</h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              Recebemos suas preferências. Você receberá uma tabela comparativa com os 3 melhores valores no seu WhatsApp em minutos.
            </p>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 inline-block font-mono text-sm">
              <span className="text-slate-400 text-xs block font-sans">Protocolo de Cotação:</span>
              <strong className="text-emerald-400 text-base">{protocol}</strong>
            </div>

            <div className="pt-4">
              <Button variant="primary" size="md" onClick={handleClose}>
                Fechar e Voltar ao Relatório
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Seu Nome</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Maria Pereira"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">WhatsApp para receber as propostas</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(11) 98888-7777"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">CEP de Pernoite</label>
                <input
                  type="text"
                  required
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  placeholder="01001-000"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Uso do Veículo</label>
                <select
                  value={formData.usageType}
                  onChange={(e: any) => setFormData({ ...formData, usageType: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Trabalho / Dia a Dia">Trabalho / Dia a Dia</option>
                  <option value="Lazer">Apenas Lazer</option>
                  <option value="Aplicativo / Comercial">App / Comercial</option>
                </select>
              </div>
            </div>

            <div className="pt-3">
              <Button
                type="submit"
                variant="success"
                size="lg"
                className="w-full text-sm"
                isLoading={isLoading}
              >
                Ver Melhores Cotações no WhatsApp
              </Button>
            </div>

          </form>
        )}
      </Modal>
    </>
  );
};
