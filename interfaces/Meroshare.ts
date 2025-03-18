export interface Capital {
  code: string;
  id: number;
  name: string;
}
export interface PersonalDetails {
  address: string;
  boid: string;
  clientCode: string;
  contact: string;
  createdApproveDate: string;
  createdApproveDateStr: string;
  customerTypeCode: string;
  demat: string;
  dematExpiryDate: string;
  email: string;
  expiredDate: string;
  expiredDateStr: string;
  gender: string;
  id: number;
  imagePath: string;
  meroShareEmail: string;
  name: string;
  passwordChangeDate: string;
  passwordChangedDateStr: string;
  passwordExpiryDate: string;
  passwordExpiryDateStr: string;
  profileName: string;
  renderDashboard: boolean;
  renewedDate: string;
  renewedDateStr: string;
  username: string;
}

export interface BoidDetails {
  accountNumber: string;
  accountOpenDate: string;
  accountStatus: number;
  accountStatusFlag: string;
  accountStatusName: string;
  accountType: string;
  address: string;
  aod: string;
  bankCode: string;
  bankName: string;
  boid: string;
  branchCode: string;
  capital: string;
  citizenCode: string;
  citizenshipNumber: string;
  confirmationWaived: string;
  contact: string;
  dob: string;
  dpName: string;
  email: string;
  fatherMotherName: string;
  gender: string;
  grandfatherSpouseName: string;
  issuedDate: string;
  issuedFrom: string;
  name: string;
  regexCitizenNumber: string;
  subStatus: string;
  subStatusCode: string;
  suspensionFlag: number;
}

export interface BankAccountBranch {
  code: string;
  id: number;
  name: string;
}

export interface Bank {
  code: string;
  id: number;
  name: string;
}

export interface BankDetails {
  accountTypeId: number;
  accountBranch: BankAccountBranch;
  accountNumber: string;
  bank: Bank;
  branch: BankAccountBranch;
}

export interface ClientData {
  clientId: string;
  username: string;
  password: string;
  pin: string;
  crn: string;
  personalDetails: PersonalDetails;
  boidDetails: BoidDetails;
  bankDetails: BankDetails;
}

export interface CompanyShare {
  companyShareId: number;
  subGroup: string;
  scrip: string;
  companyName: string;
  shareTypeName: string;
  shareGroupName: string;
  statusName: string;
  issueOpenDate: string;
  issueCloseDate: string;
}
