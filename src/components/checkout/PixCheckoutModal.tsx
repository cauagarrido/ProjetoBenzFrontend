import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { PixPaymentResponse } from '../../types/vehicle';
import {
  QrCode,
  Copy,
  Check,
  Clock,
  ShieldCheck,
  Zap,
  Sparkles,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PixCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  pixData: PixPaymentResponse | null;
  onPaymentConfirmed: () => void;
}

export const PixCheckoutModal: React.FC<PixCheckoutModalProps> = ({
  isOpen,
  onClose,
  pixData,
  onPaymentConfirmed,
}) => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutos em segundos
  const [isVerifying, setIsVerifying] = useState(false);

  // Contador regressivo do PIX
  useEffect(() => {
    if (!isOpen) {
      setTimeLeft(15 * 60);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopyCode = () => {
    if (pixData?.pixCode) {
      navigator.clipboard.writeText(pixData.pixCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleSimulatePayment = () => {
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      
      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#3b82f6', '#10b981', '#6366f1', '#f59e0b'],
        });
      } catch (e) {
        console.log('Confetti effect');
      }

      onPaymentConfirmed();
    }, 1200);
  };

  if (!pixData) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="lg"
      title={
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
            <QrCode className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Pagamento via PIX</h3>
            <p className="text-xs text-slate-400 font-normal">Liberação instantânea do relatório completo</p>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        
        {/* Banner de Valor e Timer */}
        <div className="flex items-center justify-between p-4 bg-slate-950/60 rounded-xl border border-slate-800">
          <div>
            <span className="text-[11px] text-slate-400 font-medium">Total a pagar:</span>
            <div className="text-2xl font-black text-white">
              R$ {pixData.amount.toFixed(2).replace('.', ',')}
            </div>
            <span className="text-[10px] text-slate-400">Placa: <strong className="text-blue-400 font-mono">{pixData.plate}</strong></span>
          </div>

          <div className="text-right">
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20">
              <Clock className="w-4 h-4" />
              <span>Expira em {formatTime(timeLeft)}</span>
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">Ambiente Seguro</span>
          </div>
        </div>

        {/* QR Code Container */}
        <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-inner max-w-[240px] mx-auto border-4 border-slate-800">
          <img
            src={pixData.qrCodeUrl}
            alt="QR Code PIX"
            className="w-48 h-48 rounded-lg"
          />
          <p className="text-[11px] text-slate-700 font-medium mt-2 text-center">
            Abra o app do seu banco e escaneie o código
          </p>
        </div>

        {/* Chave PIX Copia e Cola */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span>Ou copie o código PIX Copia e Cola:</span>
            {copied && (
              <span className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                <Check className="w-3.5 h-3.5" /> Código Copiado!
              </span>
            )}
          </label>

          <div className="relative flex items-center">
            <input
              type="text"
              readOnly
              value={pixData.pixCode}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-400 font-mono pr-28 focus:outline-none"
            />
            <Button
              variant={copied ? 'success' : 'primary'}
              size="sm"
              onClick={handleCopyCode}
              className="absolute right-1.5 text-xs"
              leftIcon={copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            >
              {copied ? 'Copiado' : 'Copiar'}
            </Button>
          </div>
        </div>



        {/* Botão de Confirmação Instantânea (Simulação / Polling) */}
        <div className="pt-2">
          <Button
            variant="glow"
            size="lg"
            className="w-full py-4 text-sm"
            onClick={handleSimulatePayment}
            isLoading={isVerifying}
            leftIcon={<Sparkles className="w-4 h-4" />}
          >
            Confirmar Pagamento e Ver Relatório
          </Button>
        </div>

        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 text-center">
          <Lock className="w-3.5 h-3.5 text-emerald-500" />
          <span>Pagamento processado com segurança de ponta a ponta</span>
        </div>

      </div>
    </Modal>
  );
};
