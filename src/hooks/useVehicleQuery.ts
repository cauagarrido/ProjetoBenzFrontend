import { useState, useEffect } from 'react';
import { vehicleApi } from '../services/api';
import {
  VehicleBasicInfo,
  FullVehicleReport,
} from '../types/vehicle';

export type QueryStep = 'SEARCH' | 'REPORT';

export function useVehicleQuery() {
  const [step, setStep] = useState<QueryStep>('SEARCH');
  const [plate, setPlate] = useState<string>('ABC1D23');
  const [basicInfo, setBasicInfo] = useState<VehicleBasicInfo | null>(null);
  const [fullReport, setFullReport] = useState<FullVehicleReport | null>(null);
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<FullVehicleReport[]>([]);

  // Carrega histórico local ao inicializar
  useEffect(() => {
    const loaded = vehicleApi.getLocalHistory();
    setHistory(loaded);
  }, []);

  /**
   * Executa a busca da placa e abre diretamente o relatório
   */
  const handleSearch = async (targetPlate?: string) => {
    const searchTarget = targetPlate || plate;
    const clean = searchTarget.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (clean.length !== 7) return;

    setIsLoading(true);

    try {
      const report = await vehicleApi.getFullReport(clean);
      setPlate(clean);
      setBasicInfo(report.basicInfo);
      setFullReport(report);
      setStep('REPORT');
      setHistory(vehicleApi.getLocalHistory());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Erro na consulta do veículo:', err);
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
    setIsHistoryDrawerOpen(false);
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
   * Reseta o fluxo para uma nova busca na Home
   */
  const handleResetToSearch = () => {
    setStep('SEARCH');
    setBasicInfo(null);
    setFullReport(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    step,
    plate,
    setPlate,
    basicInfo,
    fullReport,
    isHistoryDrawerOpen,
    setIsHistoryDrawerOpen,
    isLoading,
    history,
    handleSearch,
    handleSelectReportFromHistory,
    handleClearHistory,
    handleResetToSearch,
  };
}

