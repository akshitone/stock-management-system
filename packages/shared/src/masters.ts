import { BaseEntity } from "./common";

// Yarn Component (embedded in Quality)
export interface YarnComponent {
  denier: number;
  twistPerMeter: number;
  weight: number;
}

// Quality
export interface Quality extends BaseEntity {
  name: string;
  reed: number;
  picks: number;
  ends: number;
  width: number;
  totalDenier: number;
  standardWeight: number;
  shrinkage: number;
  weavingRate: number;
  warpingRate: number;
  pasaraiRate: number;
  foldingRate: number;
  hsnCode: string;
  gstRate: number;
  description?: string;
  warpDetails: YarnComponent[];
  weftDetails: YarnComponent[];
}

// Machine
export type MachineType = "sizing" | "warping" | "crimping" | "twisting";

export interface Machine extends BaseEntity {
  number: number;
  code: string;
  type: MachineType;
  description?: string;
  locationID: string;
  locationName: string;
  khataID: string;
  khataName: string;
}

// Khata
export type KhataType = "internal" | "external";

export interface Khata extends BaseEntity {
  name: string;
  code: string;
  description?: string;
  type: KhataType;
  locationID: string;
  locationName: string;
}

// Location
export interface Location extends BaseEntity {
  name: string;
  address: string;
  city: string;
  state: string;
  stateCode: string;
  pinCode: string;
}

// Customer
export interface Customer extends BaseEntity {
  name: string;
  code: string;
  contact: string;
  mobile?: string;
  officePhone?: string;
  residencePhone?: string;
  factoryPhone?: string;
  email?: string;
  website?: string;
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  state: string;
  stateCode: string;
  country: string;
  pincode: string;
  gstin?: string;
  pan?: string;
  msmeNo?: string;
  taxAccountNumber?: string;
  creditLimit: number;
  creditDays: number;
  brokerID?: string;
  brokerName?: string;
}

// Supplier (same as Customer)
export type Supplier = Customer;

// Broker
export interface Broker extends BaseEntity {
  name: string;
  code: string;
  phone?: string;
}

// JobWorker (same as Khata)
export type JobWorker = Khata;

// Worker
export type WorkerType = "warper" | "pasariwala" | "weaver";
export type RateType = "weekly" | "monthly" | "production" | "total_production";

export interface MachineRef {
  machineID: string;
  machineName: string;
}

export interface Worker extends BaseEntity {
  name: string;
  code: string;
  phone?: string;
  type: WorkerType;
  rate: number;
  rateType: RateType;
  machines: MachineRef[];
  khataID: string;
  khataName: string;
  locationID: string;
  locationName: string;
  joiningDate: number;
  leavingDate?: number;
}
