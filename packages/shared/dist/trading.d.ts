import { BaseEntity } from "./common";
export interface SalesOrderItem {
    qualityID: string;
    qualityName: string;
    qualityCode: string;
    orderedTakas: number;
    orderedMeters: number;
    deliveredTakas: number;
    deliveredMeters: number;
    pendingTakas: number;
    pendingMeters: number;
    rate: number;
    rateType: "per_meter" | "per_taka";
    amount: number;
}
export type OrderStatus = "pending" | "partial" | "completed" | "cancelled";
export interface SalesOrder extends BaseEntity {
    orderNo: string;
    date: number;
    customerID: string;
    customerName: string;
    customerCode: string;
    brokerID?: string;
    brokerName?: string;
    items: SalesOrderItem[];
    totalAmount: number;
    status: OrderStatus;
    remarks?: string;
}
export interface AddressBlock {
    name: string;
    address: string;
    city: string;
    state: string;
    stateCode: string;
    pincode: string;
    gstin?: string;
}
export interface InvoiceItem {
    qualityID: string;
    qualityName: string;
    qualityCode: string;
    hsnCode: string;
    khataID: string;
    khataName: string;
    stockType: "folded" | "rfd";
    takas: number;
    meters: number;
    rate: number;
    rateType: "per_meter" | "per_taka";
    taxableAmount: number;
    cgstRate: number;
    cgstAmount: number;
    sgstRate: number;
    sgstAmount: number;
    igstRate: number;
    igstAmount: number;
    totalAmount: number;
}
export type InvoiceType = "sales" | "purchase";
export type PartyType = "customer" | "supplier";
export type GstType = "igst" | "cgst_sgst";
export type PaymentStatus = "unpaid" | "partial" | "paid";
export interface Invoice extends BaseEntity {
    invoiceNo: string;
    date: number;
    type: InvoiceType;
    partyType: PartyType;
    partyID: string;
    partyName: string;
    partyCode: string;
    partyGstin?: string;
    salesOrderID?: string;
    salesOrderNo?: string;
    brokerID?: string;
    brokerName?: string;
    placeOfSupply: string;
    placeOfSupplyCode: string;
    reverseCharge: boolean;
    gstType: GstType;
    billingAddress: AddressBlock;
    shippingAddress?: AddressBlock;
    items: InvoiceItem[];
    totalTaxableAmount: number;
    totalCgst: number;
    totalSgst: number;
    totalIgst: number;
    totalTax: number;
    roundOff: number;
    grandTotal: number;
    amountInWords: string;
    transportMode?: "road" | "rail" | "air" | "ship";
    vehicleNo?: string;
    transporter?: string;
    transporterId?: string;
    lrNo?: string;
    lrDate?: number;
    ewayBillNo?: string;
    ewayBillDate?: number;
    dueDate: number;
    paidAmount: number;
    dueAmount: number;
    status: PaymentStatus;
    remarks?: string;
}
export interface SalesReturnItem {
    qualityID: string;
    qualityName: string;
    qualityCode: string;
    hsnCode: string;
    takas: number;
    meters: number;
    rate: number;
    taxableAmount: number;
    cgstAmount: number;
    sgstAmount: number;
    igstAmount: number;
    totalAmount: number;
    stockGrade: "fresh" | "seconds";
}
export interface SalesReturn extends BaseEntity {
    returnNo: string;
    date: number;
    invoiceID: string;
    invoiceNo: string;
    customerID: string;
    customerName: string;
    customerCode: string;
    customerGstin?: string;
    gstType: GstType;
    khataID: string;
    khataName: string;
    khataCode: string;
    locationID: string;
    locationName: string;
    locationCode: string;
    items: SalesReturnItem[];
    totalTaxableAmount: number;
    totalTax: number;
    grandTotal: number;
    reason?: string;
}
export interface PaymentAllocation {
    invoiceID: string;
    invoiceNo: string;
    invoiceDate: number;
    invoiceAmount: number;
    allocatedAmount: number;
}
export type PaymentType = "receipt" | "payment";
export type PaymentMode = "cash" | "cheque" | "rtgs" | "neft" | "upi";
export interface Payment extends BaseEntity {
    voucherNo: string;
    date: number;
    type: PaymentType;
    partyType: "customer" | "supplier" | "job_worker";
    partyID: string;
    partyName: string;
    partyCode: string;
    amount: number;
    mode: PaymentMode;
    bankName?: string;
    chequeNo?: string;
    chequeDate?: number;
    referenceNo?: string;
    allocations: PaymentAllocation[];
    unallocatedAmount: number;
    remarks?: string;
}
//# sourceMappingURL=trading.d.ts.map