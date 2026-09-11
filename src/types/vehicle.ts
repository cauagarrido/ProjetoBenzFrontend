export type RiskLevel = 'safe' | 'warning' | 'danger';

export interface VehicleBasicInfo {
  plate: string;
  brand: string;
  model: string;
  version: string;
  yearFabrication: number;
  yearModel: number;
  color: string;
  fuel: string;
  city: string;
  state: string;
  chassisMasked: string;
  renavamMasked: string;
  engineMasked: string;
  fipeValue: number;
  fipeCode: string;
}

export interface FipeHistoryItem {
  month: string;
  value: number;
}

export interface CadastralDetails {
  chassis: string;
  engine: string;
  renavam: string;
  origin: string; // Nacional / Importado
  powerHp: string;
  cylinderCapacity: string;
  vehicleType: string;
  segment: string;
  passengers: number;
  fipeValue: number;
  fipeCode: string;
  fipeHistory: FipeHistoryItem[];
}

export interface DebtItem {
  id: string;
  type: 'IPVA' | 'Licenciamento' | 'Multa' | 'DPVAT' | 'Taxa';
  year?: number;
  description: string;
  organ?: string;
  dueDate: string;
  amount: number;
  status: 'Pendente' | 'Pago' | 'Em Aberto' | 'Atrasado' | 'Inscrito em Dívida Ativa';
}

export interface FinancialDetails {
  hasDebts: boolean;
  totalDebtsAmount: number;
  ipvaStatus: 'OK' | 'Pendente' | 'Atrasado';
  licensingStatus: 'OK' | 'Pendente' | 'Atrasado';
  debtsList: DebtItem[];
  gravame: {
    hasFinancialRestriction: boolean;
    financialInstitution?: string;
    inclusionDate?: string;
    contractType?: string;
    status: 'Quitado' | 'Alienado Fiduciariamente' | 'Reserva de Domínio' | 'Livre';
  };
}

export interface AuctionRecord {
  hasAuction: boolean;
  auctioneer?: string;
  comitente?: string; // Seguradora, Banco, Detran
  lotNumber?: string;
  auctionDate?: string;
  category?: 'Recuperado de Financiamento' | 'Sinistro / Colisão' | 'Frota' | 'Leilão Judicial';
  damageLevel?: 'Sem Danos' | 'Pequena Monta' | 'Média Monta' | 'Grande Monta';
  auctionScoreRisk: number; // 0-100
  images?: string[];
  notes?: string;
}

export interface AccidentRecord {
  hasAccident: boolean;
  severity?: 'Leve' | 'Média Monta' | 'Grande Monta / PT' | 'Sem Registros';
  incidentDate?: string;
  repairedByInsurance?: boolean;
  description?: string;
}

export interface RiskDetails {
  overallRiskLevel: RiskLevel;
  riskScore: number; // 0 - 100 (100 = 100% seguro)
  riskSummary: string;
  theftRecord: {
    isStolenOrTheftAlert: boolean;
    status: 'Sem Alerta de Furto/Roubo' | 'Alerta Ativo no SINESP' | 'Recuperado';
  };
  judicialRestrictions: {
    hasRestriction: boolean;
    type?: 'Renajud - Penhora' | 'Renajud - Transferência' | 'Sem Restrição Judicial';
    courtName?: string;
  };
  auction: AuctionRecord;
  accident: AccidentRecord;
  recall: {
    hasPendingRecall: boolean;
    campaignName?: string;
    urgency?: 'Baixa' | 'Alta';
  };
  tamperingAlert: {
    hasMileageTamperingSuspicion: boolean;
    notes?: string;
  };
}

export interface OwnerHistoryItem {
  ownerNumber: number;
  ownerType: 'Pessoa Física' | 'Pessoa Jurídica (Locadora)' | 'Pessoa Jurídica (Empresa/Frota)' | 'Concessionária';
  state: string;
  periodStart: string;
  periodEnd: string | 'Atual';
  durationMonths: number;
}

export interface MileageHistoryItem {
  date: string;
  mileage: number;
  source: 'Revisão Concessionária' | 'Laudo Cautelar' | 'Detran' | 'Anúncio Web';
  isSuspect?: boolean;
}

export interface OwnersAndMileageDetails {
  totalOwnersCount: number;
  currentOwnerType: string;
  ownerHistory: OwnerHistoryItem[];
  mileageHistory: MileageHistoryItem[];
  estimatedCurrentMileage: number;
  usageProfile: 'Uso Particular Severo' | 'Uso Particular Moderado' | 'Frota / Locadora' | 'Uso Misto';
}

export interface FullVehicleReport {
  id: string;
  consultedAt: string;
  basicInfo: VehicleBasicInfo;
  cadastral: CadastralDetails;
  financial: FinancialDetails;
  risks: RiskDetails;
  ownersMileage: OwnersAndMileageDetails;
}

export interface PixPaymentResponse {
  paymentId: string;
  plate: string;
  amount: number;
  pixCode: string;
  qrCodeUrl: string;
  expiresAt: string;
}

export interface InspectionBookingRequest {
  plate: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  preferredDate: string;
  inspectionType: 'Cautelar Completa' | 'Transferência Detran' | 'Pré-Compra Premium';
}

export interface InsuranceQuoteRequest {
  plate: string;
  name: string;
  phone: string;
  email: string;
  zipCode: string;
  usageType: 'Lazer' | 'Trabalho / Dia a Dia' | 'Aplicativo / Comercial';
}
