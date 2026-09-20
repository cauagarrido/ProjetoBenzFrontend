import axios from 'axios';

const FIPE_BASE_URL = (import.meta as any).env?.VITE_FIPE_API_URL || 'https://fipe.api.br/api/v2';
const FIPE_TOKEN = (import.meta as any).env?.VITE_FIPE_API_KEY || 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIyMWI2YzA2OC0xZDU0LTQxZDAtODU5ZC1iMWNhZjZiNGMzYTgiLCJlbWFpbCI6ImNhdWFnYXJyaWRvQGdtYWlsLmNvbSIsImp0aSI6ImE5ZDhiZDYwLTI2NzAtNDJlNC1hMDAyLTEwMTNjZWY2MDg3YSIsImlhdCI6MTc4OTkyMDIyMX0._mm0Bknv8Oabpmw7FCNm__LbEMYz-ni2C7Ue9Fymhvs';

export type VehicleKind = 'carros' | 'motos' | 'caminhoes';

const KIND_PATH_MAP: Record<VehicleKind, string> = {
  carros: 'cars',
  motos: 'motorcycles',
  caminhoes: 'trucks',
};

export interface FipeBrand {
  codigo: string;
  nome: string;
}

export interface FipeModelItem {
  codigo: number | string;
  nome: string;
}

export interface FipeModelsResponse {
  modelos: FipeModelItem[];
  anos: FipeYearItem[];
}

export interface FipeYearItem {
  codigo: string;
  nome: string;
}

export interface FipeVehicleData {
  Valor: string;
  Marca: string;
  Modelo: string;
  AnoModelo: number;
  Combustivel: string;
  CodigoFipe: string;
  MesReferencia: string;
  TipoVeiculo: number;
  SiglaCombustivel: string;
}

// Resposta bruta da API fipe.api.br
interface ApiBrBrand {
  code: string;
  name: string;
}

interface ApiBrModel {
  code: string | number;
  name: string;
}

interface ApiBrYear {
  code: string;
  name: string;
}

interface ApiBrVehicleDetail {
  price: string;
  brand: string;
  model: string;
  modelYear: number;
  fuel: string;
  codeFipe: string;
  referenceMonth: string;
  vehicleType: number;
  fuelAcronym: string;
}

const fipeClient = axios.create({
  baseURL: FIPE_BASE_URL,
  timeout: 12000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${FIPE_TOKEN}`,
  },
});

export const fipeService = {
  /**
   * Passo 1 — Lista todas as marcas para um tipo de veículo
   * GET /api/v2/{kind}/brands
   */
  async getBrands(tipo: VehicleKind): Promise<FipeBrand[]> {
    const kindPath = KIND_PATH_MAP[tipo] || 'cars';
    const res = await fipeClient.get<ApiBrBrand[]>(`/${kindPath}/brands`);
    return res.data.map((item) => ({
      codigo: String(item.code),
      nome: item.name,
    }));
  },

  /**
   * Passo 2 — Lista modelos para uma marca
   * GET /api/v2/{kind}/brands/{brandCode}/models
   */
  async getModels(tipo: VehicleKind, brandCode: string): Promise<FipeModelsResponse> {
    const kindPath = KIND_PATH_MAP[tipo] || 'cars';
    const res = await fipeClient.get<ApiBrModel[]>(`/${kindPath}/brands/${brandCode}/models`);
    const modelosMapped: FipeModelItem[] = res.data.map((m) => ({
      codigo: m.code,
      nome: m.name,
    }));
    return {
      modelos: modelosMapped,
      anos: [],
    };
  },

  /**
   * Passo 3 — Lista os anos disponíveis para um modelo
   * GET /api/v2/{kind}/brands/{brandCode}/models/{modelCode}/years
   */
  async getYears(
    tipo: VehicleKind,
    brandCode: string,
    modelCode: number | string
  ): Promise<FipeYearItem[]> {
    const kindPath = KIND_PATH_MAP[tipo] || 'cars';
    const res = await fipeClient.get<ApiBrYear[]>(
      `/${kindPath}/brands/${brandCode}/models/${modelCode}/years`
    );
    return res.data.map((y) => ({
      codigo: String(y.code),
      nome: y.name,
    }));
  },

  /**
   * Passo 4 — Retorna o valor FIPE e dados completos do veículo
   * GET /api/v2/{kind}/brands/{brandCode}/models/{modelCode}/years/{yearCode}
   */
  async getVehicleData(
    tipo: VehicleKind,
    brandCode: string,
    modelCode: number | string,
    yearCode: string
  ): Promise<FipeVehicleData> {
    const kindPath = KIND_PATH_MAP[tipo] || 'cars';
    const res = await fipeClient.get<ApiBrVehicleDetail>(
      `/${kindPath}/brands/${brandCode}/models/${modelCode}/years/${yearCode}`
    );
    const d = res.data;
    return {
      Valor: d.price,
      Marca: d.brand,
      Modelo: d.model,
      AnoModelo: d.modelYear,
      Combustivel: d.fuel,
      CodigoFipe: d.codeFipe,
      MesReferencia: d.referenceMonth,
      TipoVeiculo: d.vehicleType,
      SiglaCombustivel: d.fuelAcronym,
    };
  },
};
