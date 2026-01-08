import { BaseEntity } from "./common";
export interface YarnComponent {
    denier: number;
    twistPerMeter: number;
    weight: number;
}
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
export type KhataType = "internal" | "external";
export interface Khata extends BaseEntity {
    name: string;
    code: string;
    description?: string;
    type: KhataType;
    locationID: string;
    locationName: string;
}
export interface Location extends BaseEntity {
    name: string;
    address: string;
    city: string;
    state: string;
    stateCode: string;
    pinCode: string;
}
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
export type Supplier = Customer;
export interface Broker extends BaseEntity {
    name: string;
    code: string;
    phone?: string;
}
export type JobWorker = Khata;
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
//# sourceMappingURL=masters.d.ts.map