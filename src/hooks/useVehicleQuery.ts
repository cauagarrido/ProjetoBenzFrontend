import { useState, useEffect } from 'react';
import { vehicleApi } from '../services/api';
import {
  VehicleBasicInfo,
  FullVehicleReport,
  PixPaymentResponse
} from '../types/vehicle';

export type QueryStep = 'SEARCH' | 'PREVIEW' | 'REPORT';

export function useVehicleQuery() {
  const [step, setStep] = useState<QueryStep>('SEARCH');
  const [plate, setPlate] = useState<string>('');
  const [basicInfo, setBasicInfo] = useState<VehicleBasicInfo | null>(null);
  const [fullReport, setFullReport] = useState<FullVehicleReport | null>(null);
  const [pixData, setPixData] = useState<PixPaymentResponse | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<FullVehicleReport[]>([]);

  // Carrega histórico local ao inicializar
  useEffect(() => {
    const loaded = vehicleApi.getLocalHistory();
    setHistory(loaded);
  }, []);

  /**
   * Executa a busca inicial da placa para gerar a prévia
   */
  const handleSearch = async (targetPlate?: string) => {
    const searchTarget = targetPlate || plate;
    const clean = searchTarget.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (clean.length !== 7) return;

    setIsLoading(true);

    try {
      // 1. Busca dados básicos
      const info = await vehicleApi.getVehiclePreview(clean);
      setBasicInfo(info);
      setStep('PREVIEW');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Erro na consulta básica:', err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Inicia o fluxo de checkout PIX
   */
  const handleStartCheckout = async () => {
    if (!basicInfo) return;

    setIsLoading(true);
    try {
      const pix = await vehicleApi.createPixPayment(basicInfo.plate, 34.90);
      setPixData(pix);
      setIsCheckoutOpen(true);
    } catch (err) {
      console.error('Erro ao gerar PIX:', err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Confirmação do pagamento (simulada ou via webhook)
   */
  const handlePaymentConfirmed = async () => {
    if (!basicInfo) return;

    setIsLoading(true);
    try {
      const report = await vehicleApi.getFullReport(basicInfo.plate, pixData?.paymentId);
      setFullReport(report);
      setIsCheckoutOpen(false);
      setStep('REPORT');
      
      // Atualiza lista de histórico
      setHistory(vehicleApi.getLocalHistory());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Erro ao buscar relatório completo:', err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Abre um relatório salvo diretamente do histórico
   */
  const handleSelectReportFromHistory = (report: FullVehicleReport) => {
    setPlate(report.basicInfo.plate);
    setBasicInfo(report.basicInfo);
    setFullReport(report);
    setStep('REPORT');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Limpa histórico
   */
  const handleClearHistory = () => {
    localStorage.removeItem('benzcheck_history');
    setHistory([]);
  };

  /**
   * Reseta o fluxo para uma nova busca
   */
  const handleResetToSearch = () => {
    setStep('SEARCH');
    setBasicInfo(null);
    setFullReport(null);
    setPixData(null);
    setIsCheckoutOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    step,
    plate,
    setPlate,
    basicInfo,
    fullReport,
    pixData,
    isCheckoutOpen,
    setIsCheckoutOpen,
    isHistoryDrawerOpen,
    setIsHistoryDrawerOpen,
    isLoading,
    history,
    handleSearch,
    handleStartCheckout,
    handlePaymentConfirmed,
    handleSelectReportFromHistory,
    handleClearHistory,
    handleResetToSearch,
  };
}
