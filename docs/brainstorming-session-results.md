# Brainstorming Session Results

**Session Date:** 07-Jan-2026  
**Facilitator:** 📊 Mary (Business Analyst)  
**Topic:** Stock Management System for Textile Manufacturing & Trading

---

## Executive Summary

**Goal:** Broad exploration of a Stock Management System covering textile manufacturing (Yarn → Beam → Taka), inventory management, trading, and financial settlements.

**Tech Stack:** Node.js, NestJS, NextJS, TypeScript, MongoDB (Mongoose)

**Key Constraint:** Beams are treated as logical entities (no Yarn→Beam tracking)

**Techniques Used:** Mind Mapping, Role Playing (3 stakeholders)

**Total Ideas Generated:** 50+ features/requirements

### Key Themes Identified

- **Dual UOM Enforcement** — All fabric transactions require Meters + Takas
- **Bill-by-Bill Settlement** — Every payment must link to specific invoices
- **Bulk Data Entry** — Production requires Excel-style grid entry for efficiency
- **Factory→Quality Hierarchy** — Stock tracked by location then by product type
- **Auto-calculations** — Shrinkage, worker pay, wastage should be system-computed

---

## Domain Architecture

### Production Domain

| Category      | Elements                                                                                      |
| ------------- | --------------------------------------------------------------------------------------------- |
| **Entities**  | Yarn, Beam (logical), Machine, Quality, Taka (Grey), Taka (Folded), Factory (Khata), Location |
| **People**    | Warper, Pasariwala, Weaver, Job Worker                                                        |
| **Processes** | Yarn Inward, Beam Loading/Unloading, Grey Production, Job Work Issue/Receipt, Taka Folding    |
| **Metrics**   | Meters (Expected/Received/Balance/Cut), Weight (Gross/Tare/Net), Beam Specs, Worker Rates     |

#### Key Decisions

- **Beam = Logical Entity** — No physical asset tracking; lifecycle: Created → Loaded → Finished
- **Auto-Unload** — Loading new beam auto-completes previous beam on same machine
- **Grey → Folded = Bulk Batch** — Traceability intentionally breaks; shrinkage auto-calculated

---

### Inventory/Stock Domain

| Stock Type      | Tracking          | Units                     |
| --------------- | ----------------- | ------------------------- |
| **Yarn**        | Strict Lot No     | Kgs, Cartoons, Cops       |
| **Grey (WIP)**  | Transient         | Meters, Weight            |
| **Folded (FG)** | Factory → Quality | Meters + Takas (Dual UOM) |
| **RFD**         | Converted         | Meters + Takas            |

#### Key Decisions

- **Dual UOM Enforced** — Cannot enter fabric transaction without both units
- **No Stock Reservation** — Orders don't block stock; deduction only on Sale entry
- **Conversion with Shrinkage** — RFD output = Input - calculated loss

---

### Trading & Financial Domain

| Document            | Purpose                        | Key Fields                           |
| ------------------- | ------------------------------ | ------------------------------------ |
| **Sales Order**     | Commitment to sell             | Customer, Quality, Qty, Rate, Status |
| **Sales Invoice**   | Legal demand + Stock reduction | GST, HSN, Transport, Due Date        |
| **Sales Return**    | Credit Note                    | Returns stock, credits ledger        |
| **Purchase Bill**   | Trading inward                 | Supplier, Stock addition             |
| **Payment Voucher** | Settlement                     | Linked to specific Bill #            |

#### Key Decisions

- **Dual Invoicing** — Support Direct Sale AND Order-based Sale
- **Partial Fulfillment** — Track pending quantity on orders
- **Bill-by-Bill Settlement** — Every payment MUST link to specific invoices
- **GST Auto-select** — IGST vs CGST/SGST based on Party's State
- **Broker = Tag Only** — No commission calculation

---

## Stakeholder Requirements

### 👷 Factory Floor Supervisor

| Need                     | Feature                                                                        | Priority  |
| ------------------------ | ------------------------------------------------------------------------------ | --------- |
| End-of-shift data crunch | **Bulk Production Grid** — Excel-style, select date once, tab through machines | 🔴 HIGH   |
| Worker disputes          | **Worker Production Report** — Printable breakdown by date/shift/beam          | 🔴 HIGH   |
| Manual beam unloading    | **Auto-Unload** — Loading new beam completes previous                          | 🟡 MEDIUM |

### 💼 Accountant/Finance

| Need                | Feature                                                                         | Priority |
| ------------------- | ------------------------------------------------------------------------------- | -------- |
| Lump sum allocation | **Payment Settlement UI** — Show unpaid invoices, allocate amounts, auto-update | 🔴 HIGH  |
| Payroll calculation | **Automated Salary Sheet** — Date range → Production logs → Rates → Payable     | 🔴 HIGH  |

### 👔 Owner/Management

| Need                 | Feature                                                             | Priority  |
| -------------------- | ------------------------------------------------------------------- | --------- |
| Cash flow visibility | **Receivables Dashboard** — Top debtors, aging alerts, net position | 🔴 HIGH   |
| Wastage tracking     | **Wastage Heatmap** — Drill-down: Factory → Machine → Worker        | 🟡 MEDIUM |
| Margin visibility    | **Product Profitability Report** — Selling price vs cost breakdown  | 🟡 MEDIUM |

---

## Idea Categorization

### 🚀 Immediate Opportunities

_Ready to implement in MVP_

1. **Bulk Production Grid** — Critical for adoption; replaces 20+ clicks with tabular entry
2. **Bill-by-Bill Payment Settlement** — Core accounting requirement
3. **Automated Salary Sheet** — Eliminates bi-monthly manual calculation
4. **Worker Production Report** — Reduces disputes, builds trust
5. **Dual UOM Validation** — Foundational data integrity rule

### 🔮 Future Innovations

_Phase 2 features_

1. **Receivables Dashboard** — Mobile-friendly for owner
2. **Auto-Unload on Beam Load** — Quality of life improvement
3. **Wastage Heatmap** — Requires sufficient historical data
4. **GST Auto-calculation** — Based on party state code
5. **Overdue Job Work Alerts** — Dashboard for external factory tracking

### 🌙 Moonshots

_Long-term vision_

1. **Product Profitability Report** — Requires full cost attribution
2. **Predictive Stock Alerts** — ML-based reorder suggestions
3. **WhatsApp Integration** — Worker reports via WhatsApp
4. **Real-time Machine Dashboard** — IoT integration for live production

---

## Action Planning

### #1 Priority: Core Data Entry & Tracking

- **Rationale:** Without efficient data entry, the system won't be used
- **Next Steps:** Build Bulk Production Grid, Yarn Inward, Beam Loading screens
- **Timeline:** Sprint 1-2

### #2 Priority: Financial Settlement

- **Rationale:** Cash flow management is business-critical
- **Next Steps:** Build Invoice, Payment Settlement, Bill-by-Bill allocation
- **Timeline:** Sprint 3-4

### #3 Priority: Reports & Dashboards

- **Rationale:** ROI visibility for owner adoption
- **Next Steps:** Worker reports, Salary sheets, Receivables dashboard
- **Timeline:** Sprint 5-6

---

## Finalized Decisions

| Question          | Decision                | Details                             |
| ----------------- | ----------------------- | ----------------------------------- |
| **Sales Returns** | User decides per return | Dropdown selection: Fresh / Seconds |
| **Currency**      | INR only                | Domestic market, no multi-currency  |
| **User Roles**    | Simple: Admin + User    | No complex RBAC needed              |
| **Mobile**        | Fully responsive        | All screens must work on mobile     |
| **Integrations**  | Standalone              | No Tally/GST portal integration     |

---

_Session facilitated using the BMAD-METHOD™ brainstorming framework_
