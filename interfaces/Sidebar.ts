export interface SelectedTab {
    selectedTab: "auto-apply" | "portal" | "status"
}
interface PersonalDetails {
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

interface BoidDetails {
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

interface BankAccountBranch {
    code: string;
    id: number;
    name: string;
}

interface Bank {
    code: string;
    id: number;
    name: string;
}

interface BankDetails {
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