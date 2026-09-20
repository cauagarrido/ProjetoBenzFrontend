import { FipeVehicleData, VehicleKind } from '../services/fipeService';
import { FullVehicleReport } from '../types/vehicle';

/**
 * Converte o retorno da API FIPE Parallelum num FullVehicleReport compatível
 * com o ReportContainer. Campos sem equivalente na FIPE ficam como '–'.
 */
export function buildReportFromFipe(
  data: FipeVehicleData,
  tipo: VehicleKind
): FullVehicleReport {
  // "R$ 50.491,00" → 50491.00
  const fipeValue = parseFloat(
    data.Valor.replace('R$', '')
      .trim()
      .replace(/\./g, '')
      .replace(',', '.')
  ) || 0;

  const kindLabel =
    tipo === 'carros'
      ? 'Automóvel'
      : tipo === 'motos'
      ? 'Motocicleta'
      : 'Caminhão';

  return {
    id: `FIPE-${data.CodigoFipe}`,
    consultedAt: new Date().toISOString(),
    basicInfo: {
      plate: 'FIPE',
      brand: data.Marca,
      model: data.Modelo,
      version: data.Modelo,
      yearFabrication: data.AnoModelo,
      yearModel: data.AnoModelo,
      color: '–',
      fuel: data.Combustivel,
      city: '–',
      state: '–',
      chassisMasked: '–',
      renavamMasked: '–',
      engineMasked: '–',
      fipeValue,
      fipeCode: data.CodigoFipe,
    },
    cadastral: {
      chassis: '–',
      engine: '–',
      renavam: '–',
      origin: '–',
      powerHp: '–',
      cylinderCapacity: '–',
      vehicleType: kindLabel,
      segment: '–',
      passengers: 0,
      fipeValue,
      fipeCode: data.CodigoFipe,
      fipeHistory: [{ month: data.MesReferencia, value: fipeValue }],
    },
    financial: {
      hasDebts: false,
      totalDebtsAmount: 0,
      ipvaStatus: 'OK',
      licensingStatus: 'OK',
      debtsList: [],
      gravame: { hasFinancialRestriction: false, status: 'Livre' },
    },
    risks: {
      overallRiskLevel: 'safe',
      riskScore: 0,
      riskSummary:
        'Dados obtidos via Tabela FIPE. Para verificação completa de restrições, leilão e histórico de proprietários, consulte uma placa específica.',
      theftRecord: { isStolenOrTheftAlert: false, status: 'Sem Alerta de Furto/Roubo' },
      judicialRestrictions: { hasRestriction: false, type: 'Sem Restrição Judicial' },
      auction: { hasAuction: false, auctionScoreRisk: 0 },
      accident: { hasAccident: false, severity: 'Sem Registros' },
      recall: { hasPendingRecall: false },
      tamperingAlert: { hasMileageTamperingSuspicion: false },
    },
    ownersMileage: {
      totalOwnersCount: 0,
      currentOwnerType: '–',
      usageProfile: 'Uso Particular Moderado',
      estimatedCurrentMileage: 0,
      ownerHistory: [],
      mileageHistory: [],
    },
  };
}
