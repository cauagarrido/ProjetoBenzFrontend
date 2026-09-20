import axios, { AxiosInstance } from 'axios';
import {
  FullVehicleReport,
  VehicleBasicInfo,
  PixPaymentResponse,
  InspectionBookingRequest,
  InsuranceQuoteRequest
} from '../types/vehicle';

// Configuração da URL do Backend (Vite env ou fallback padrão)
export const API_BASE_URL = ((import.meta as any).env?.VITE_API_URL) || 'http://localhost:3000/api';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const vehicleApi = {
  /**
   * Busca os dados básicos do veículo para a tela de prévia direto na API
   */
  async getVehiclePreview(plate: string): Promise<VehicleBasicInfo> {
    const cleanPlate = plate.toUpperCase().replace(/[^A-Z0-9]/g, '');
    const response = await apiClient.get<VehicleBasicInfo>(`/vehicle/preview/${cleanPlate}`);
    return response.data;
  },

  /**
   * Gera o PIX para pagamento e desbloqueio do relatório direto na API
   */
  async createPixPayment(plate: string, amount: number = 34.90): Promise<PixPaymentResponse> {
    const cleanPlate = plate.toUpperCase().replace(/[^A-Z0-9]/g, '');
    const response = await apiClient.post<PixPaymentResponse>('/checkout/pix', {
      plate: cleanPlate,
      amount,
    });
    return response.data;
  },

  /**
   * Verifica se o pagamento do PIX foi confirmado direto na API
   */
  async checkPaymentStatus(paymentId: string): Promise<{ isPaid: boolean; status: string }> {
    const response = await apiClient.get<{ isPaid: boolean; status: string }>(`/checkout/status/${paymentId}`);
    return response.data;
  },

  /**
   * Obtém o relatório completo do veículo por placa direto na API
   */
  async getFullReport(plate: string, paymentToken?: string): Promise<FullVehicleReport> {
    const cleanPlate = plate.toUpperCase().replace(/[^A-Z0-9]/g, '');
    const response = await apiClient.get<FullVehicleReport>(`/vehicle/report/${cleanPlate}`, {
      headers: paymentToken ? { Authorization: `Bearer ${paymentToken}` } : {},
    });
    
    // Salva no histórico local do navegador ao receber resposta válida
    vehicleApi.saveToLocalHistory(response.data);
    return response.data;
  },

  /**
   * Envia formulário de agendamento de Vistoria Cautelar Presencial direto na API
   */
  async requestInspectionBooking(data: InspectionBookingRequest): Promise<{ success: boolean; protocol: string }> {
    const response = await apiClient.post('/inspection/schedule', data);
    return response.data;
  },

  /**
   * Envia solicitação de cotação de seguro/proteção veicular direto na API
   */
  async requestInsuranceQuote(data: InsuranceQuoteRequest): Promise<{ success: boolean; protocol: string }> {
    const response = await apiClient.post('/insurance/quote', data);
    return response.data;
  },

  /**
   * Gerenciamento de Histórico Local (Minhas Consultas)
   */
  getLocalHistory(): FullVehicleReport[] {
    try {
      const stored = localStorage.getItem('benzcheck_history');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Erro ao ler histórico local', e);
    }
    return [];
  },

  saveToLocalHistory(report: FullVehicleReport): void {
    try {
      const current = this.getLocalHistory();
      const filtered = current.filter(r => r.basicInfo.plate !== report.basicInfo.plate);
      const updated = [report, ...filtered].slice(0, 10);
      localStorage.setItem('benzcheck_history', JSON.stringify(updated));
    } catch (e) {
      console.error('Erro ao salvar no histórico local', e);
    }
  }
};
