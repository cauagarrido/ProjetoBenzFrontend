import axios, { AxiosInstance } from 'axios';
import {
  FullVehicleReport,
  VehicleBasicInfo,
  PixPaymentResponse,
  InspectionBookingRequest,
  InsuranceQuoteRequest
} from '../types/vehicle';
import { generateDynamicReportForPlate } from './mockData';

// Configuração da URL do Backend (Vite env ou fallback padrão)
const API_BASE_URL = ((import.meta as any).env?.VITE_API_URL) || 'http://localhost:3000/api';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const vehicleApi = {
  /**
   * Busca os dados básicos do veículo para a tela de prévia
   */
  async getVehiclePreview(plate: string): Promise<VehicleBasicInfo> {
    const cleanPlate = plate.toUpperCase().replace(/[^A-Z0-9]/g, '');

    try {
      const response = await apiClient.get<VehicleBasicInfo>(`/vehicle/preview/${cleanPlate}`);
      return response.data;
    } catch (error) {
      console.warn('[API] Backend indisponível ou erro na busca. Utilizando modo Mock simulado:', error);
      // Fallback para Mock dinâmico de alta fidelidade
      const dynamicReport = generateDynamicReportForPlate(cleanPlate);
      return dynamicReport.basicInfo;
    }
  },

  /**
   * Gera o PIX para pagamento e desbloqueio do relatório
   */
  async createPixPayment(plate: string, amount: number = 34.90): Promise<PixPaymentResponse> {
    const cleanPlate = plate.toUpperCase().replace(/[^A-Z0-9]/g, '');
    const txId = `BENZ-PIX-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    try {
      const response = await apiClient.post<PixPaymentResponse>('/checkout/pix', {
        plate: cleanPlate,
        amount,
      });
      return response.data;
    } catch (error) {
      console.warn('[API] Backend indisponível. Gerando PIX simulado:', error);
      
      // QR Code PIX e Chave Copia-e-Cola simulada
      const pixCopyPaste = `00020126580014br.gov.bcb.pix0136${txId}5204000053039865405${amount.toFixed(2)}5802BR5915BENZCHECK PAG6009SAO PAULO62070503***6304E8A2`;
      
      return {
        paymentId: txId,
        plate: cleanPlate,
        amount,
        pixCode: pixCopyPaste,
        qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(pixCopyPaste)}`,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 minutos
      };
    }
  },

  /**
   * Verifica se o pagamento do PIX foi confirmado
   */
  async checkPaymentStatus(paymentId: string): Promise<{ isPaid: boolean; status: string }> {
    try {
      const response = await apiClient.get<{ isPaid: boolean; status: string }>(`/checkout/status/${paymentId}`);
      return response.data;
    } catch (error) {
      // No modo fallback, retorna pendente (o usuário pode clicar em "Confirmar Pagamento Simulado")
      return { isPaid: false, status: 'PENDING' };
    }
  },

  /**
   * Obtém o relatório completo do veículo após pagamento
   */
  async getFullReport(plate: string, paymentToken?: string): Promise<FullVehicleReport> {
    const cleanPlate = plate.toUpperCase().replace(/[^A-Z0-9]/g, '');

    try {
      const response = await apiClient.get<FullVehicleReport>(`/vehicle/report/${cleanPlate}`, {
        headers: paymentToken ? { Authorization: `Bearer ${paymentToken}` } : {},
      });
      return response.data;
    } catch (error) {
      console.warn('[API] Backend indisponível. Carregando relatório completo mockado:', error);
      const report = generateDynamicReportForPlate(cleanPlate);
      
      // Salva no histórico local do navegador
      vehicleApi.saveToLocalHistory(report);
      return report;
    }
  },

  /**
   * Envia formulário de agendamento de Vistoria Cautelar Presencial
   */
  async requestInspectionBooking(data: InspectionBookingRequest): Promise<{ success: boolean; protocol: string }> {
    try {
      const response = await apiClient.post('/inspection/schedule', data);
      return response.data;
    } catch (error) {
      console.warn('[API] Simulando agendamento de vistoria:', data);
      return {
        success: true,
        protocol: `VC-${Math.floor(100000 + Math.random() * 900000)}`,
      };
    }
  },

  /**
   * Envia solicitação de cotação de seguro/proteção veicular
   */
  async requestInsuranceQuote(data: InsuranceQuoteRequest): Promise<{ success: boolean; protocol: string }> {
    try {
      const response = await apiClient.post('/insurance/quote', data);
      return response.data;
    } catch (error) {
      console.warn('[API] Simulando envio de cotação de seguro:', data);
      return {
        success: true,
        protocol: `SEG-${Math.floor(100000 + Math.random() * 900000)}`,
      };
    }
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
      const updated = [report, ...filtered].slice(0, 10); // Mantém as 10 últimas
      localStorage.setItem('benzcheck_history', JSON.stringify(updated));
    } catch (e) {
      console.error('Erro ao salvar no histórico local', e);
    }
  }
};
