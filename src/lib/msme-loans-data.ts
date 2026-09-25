/**
 * MSME application data — in-memory fallback store + application number
 * generator.
 *
 * The Prisma model (Msme) is the source of truth when the database is
 * connected. In environments where the DB is not reachable, this module
 * provides an in-memory fallback so MSME applications can still be submitted
 * and a unique application number is still generated.
 */

export type MsmeApplicationRecord = {
  id: string;
  applicationNumber: string;
  createdAt: string;
  updatedAt: string;
  status: string;

  fullName: string;
  fatherHusbandName: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  panNumber: string | null;
  aadhaarId: string | null;
  mobileNumber: string;
  email: string;
  residentialAddress: string | null;
  city: string | null;
  state: string | null;
  pinCode: string | null;

  businessName: string;
  businessType: string | null;
  businessRegistrationNumber: string | null;
  natureOfBusiness: string | null;
  businessAddress: string | null;
  businessCity: string | null;
  businessState: string | null;
  businessPinCode: string | null;
  yearsInBusiness: string | null;
  annualTurnover: string | null;

  loanType: string | null;
  requiredLoanAmount: string;
  preferredLoanTenure: string | null;
  loanPurpose: string | null;
  existingLoan: string | null;
  existingMonthlyEmi: string | null;
  preferredContactTime: string | null;
  additionalRemarks: string | null;

  consent: boolean;
};

const globalForMsme = globalThis as unknown as {
  __msmeLoansApplications?: MsmeApplicationRecord[];
  __msmeLoansCounter?: number;
};

export const memoryMsmeApplications: MsmeApplicationRecord[] =
  globalForMsme.__msmeLoansApplications ?? [];
globalForMsme.__msmeLoansApplications = memoryMsmeApplications;

globalForMsme.__msmeLoansCounter = globalForMsme.__msmeLoansCounter ?? 0;

/**
 * Generate a unique application reference: MSME-YYYY-XXXXXX
 */
export function generateApplicationNumber(): string {
  const year = new Date().getFullYear();
  globalForMsme.__msmeLoansCounter = (globalForMsme.__msmeLoansCounter ?? 0) + 1;
  const n = globalForMsme.__msmeLoansCounter;
  const rand = Math.floor(Math.random() * 1000)
    .toString(36)
    .toUpperCase()
    .padStart(3, "0");
  const seq = n.toString().padStart(3, "0");
  return `MSME-${year}-${seq}${rand}`.slice(0, 16);
}
