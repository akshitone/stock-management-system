import { BaseEntity } from "./common";

// Yarn Item (for Cartoon)
export interface YarnItem {
  cartoonNumber: string;
  cops: number;
  rolls: number;
  grossWeight: number;
  tareWeight: number;
  netWeight: number;
}

// Yarn (Purchase Voucher - Header only)
export interface Yarn extends BaseEntity {
  voucherNumber: string;
  date: number;
  qualityID: string;
  qualityName: string;
  qualityCode: string;
  supplierID: string;
  supplierName: string;
  khataID: string;
  khataName: string;
  locationID: string;
  locationName: string;
  challanNumber: string;
  lotNumber: string;
  totalCartoons: number;
  totalNetWeight: number;
  description?: string;
  isOrderedClosed: boolean;
}

// Transfer History
export interface TransferHistory {
  previousKhataID: string;
  previousKhataName: string;
  previousKhataCode: string;
  previousLocationID: string;
  previousLocationName: string;
  previousLocationCode: string;
}

// Cartoon (Individual tracking)
export interface Cartoon extends BaseEntity {
  voucherNumber: string;
  qualityID: string;
  qualityName: string;
  qualityCode: string;
  supplierID: string;
  supplierName: string;
  khataID: string;
  khataName: string;
  locationID: string;
  locationName: string;
  cartoonNumber: string;
  cops: number;
  rolls: number;
  grossWeight: number;
  tareWeight: number;
  netWeight: number;
  isUsed: boolean;
  isTransfered: boolean;
  previous: TransferHistory[];
}

// Beam
export interface Beam extends BaseEntity {
  beamNumber: string;
  loadingDate?: number;
  unloadingDate?: number;
  isLoaded: boolean;
  yarnQualityID: string;
  yarnQualityName: string;
  yarnQualityCode: string;
  grayQualityID: string;
  grayQualityName: string;
  grayQualityCode: string;
  expectedTaka: number;
  expectedMeters: number;
  warpingDate: number;
  designNumber: string;
  yarnDenier: number;
  reed: number;
  shortage: number;
  ends: number;
  weight: number;
  warperID: string;
  warperName: string;
  warperCode: string;
  warperRate: number;
  pasariwalaID: string;
  pasariwalaName: string;
  pasariwalaCode: string;
  pasariwalaRate: number;
  description?: string;
  machineID: string;
  machineName: string;
  machineCode: string;
  khataID: string;
  khataName: string;
  khataCode: string;
  locationID: string;
  locationName: string;
  locationCode: string;
}

// Worker Entry in GreyProduction
export interface WorkerEntry {
  workerID: string;
  workerName: string;
  workingDate: number;
  meters: number;
  rate: number;
  amount: number;
}

// Grey Production
export interface GreyProduction extends BaseEntity {
  productionDate: number;
  expectedMeters: number;
  receivedMeters: number;
  balanceMeters: number;
  expectedTaka: number;
  receivedTaka: number;
  balanceTaka: number;
  isLoaded: boolean;
  takaNumber: string;
  designNumber: string;
  beamID: string;
  beamNumber: string;
  beamLoadedDate: number;
  qualityID: string;
  qualityName: string;
  qualityCode: string;
  machineID: string;
  machineName: string;
  machineCode: string;
  khataID: string;
  khataName: string;
  khataCode: string;
  locationID: string;
  locationName: string;
  locationCode: string;
  workers: WorkerEntry[];
  extraMeter: number;
  cutMeter: number;
  totalMeter: number;
  weight: number;
  description?: string;
}
