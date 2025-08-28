import { ClientData } from "@/interfaces/Meroshare";

const BASE_URL = "https://webbackend.cdsc.com.np";

export async function ClientLogin(
  clientId: number,
  username: string,
  password: string
): Promise<any> {
  return new Promise((resolve, reject) => {
    let json_data = {
      clientId: clientId,
      username: username,
      password: password,
    };
    fetch(`${BASE_URL}/api/meroShare/auth/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json_data),
    })
      .then((res) => {
        const statusCode = res.status;
        if (statusCode == 200) {
          return res.json().then((resp) => {
            const token = res.headers.get("authorization");
            resp.token = token;
            resolve(resp);
          });
        } else {
          reject("Invalid Credential");
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function GetClientDetails(token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    let URL = `${BASE_URL}/api/meroShare/ownDetail/`;

    fetch(URL, {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => {
        const statusCode = res.status;
        if (statusCode == 200) {
          return res.json().then((resp) => {
            resolve(resp);
          });
        } else {
          reject("Meroshare Server Failed.");
        }
      })
      .catch((error) => {
        console.error("Error in GetClientDetails:", error);
        reject(error);
      });
  });
}

export async function GetClientBOIDData(
  token: string,
  boid: string
): Promise<any> {
  return new Promise((resolve, reject) => {
    let URL = `${BASE_URL}/api/meroShareView/myDetail/${boid}`;
    fetch(URL, {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => {
        const statusCode = res.status;
        if (statusCode == 200) {
          return res.json().then((resp) => {
            resolve(resp);
          });
        } else {
          reject("Meroshare Server Failed.");
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function GetClientBankDetails(
  token: string,
  bankCode: string
): Promise<any> {
  return new Promise((resolve, reject) => {
    let URL = `${BASE_URL}/api/bankRequest/${bankCode}`;
    fetch(URL, {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => {
        const statusCode = res.status;
        if (statusCode == 200) {
          return res.json().then((resp) => {
            resolve(resp);
          });
        } else {
          reject("Meroshare Server Failed.");
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function GetApplicableShares(token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    let URL = `${BASE_URL}/api/meroShare/companyShare/applicableIssue/`;
    fetch(URL, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: '{"filterFieldParams":[{"key":"companyIssue.companyISIN.script","alias":"Scrip"},{"key":"companyIssue.companyISIN.company.name","alias":"Company Name"},{"key":"companyIssue.assignedToClient.name","value":"","alias":"Issue Manager"}],"page":1,"size":10,"searchRoleViewConstants":"VIEW_APPLICABLE_SHARE","filterDateParams":[{"key":"minIssueOpenDate","condition":"","alias":"","value":""},{"key":"maxIssueCloseDate","condition":"","alias":"","value":""}]}',
    })
      .then((res) => {
        const statusCode = res.status;
        if (statusCode == 200) {
          return res.json().then((resp) => {
            resolve(resp);
          });
        } else {
          reject("Meroshare Server Failed.");
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function GetCustomerCode(
  token: string,
  code: string
): Promise<any> {
  return new Promise((resolve, reject) => {
    let URL = `${BASE_URL}/api/meroShare/bank/${code}`;

    fetch(URL, {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => {
        const statusCode = res.status;
        if (statusCode == 200) {
          return res.json().then((resp) => {
            resolve(resp);
          });
        } else {
          reject("Meroshare Server Failed.");
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

interface ApplyIPO {
  accountBranchId: number;
  accountNumber: string;
  accountTypeId: number;
  appliedKitta: string;
  bankId: number;
  boid: string;
  companyShareId: number;
  crnNumber: string;
  /*it uses name as "CustomerId" but i found out that , actually its the id of the bank */
  customerId: number;
  customerCode: string;
  demat: string;
  transactionPIN: string;
  token?: string;
}

//209945365

export async function getApplicationReports(token: string) {
  const url = `${BASE_URL}/api/meroShare/applicantForm/active/search/`;

  const payload = {
    filterFieldParams: [
      { key: "companyShare.companyIssue.companyISIN.script", alias: "Scrip" },
      {
        key: "companyShare.companyIssue.companyISIN.company.name",
        alias: "Company Name",
      },
    ],
    page: 1,
    size: 200,
    searchRoleViewConstants: "VIEW_APPLICANT_FORM_COMPLETE",
    filterDateParams: [
      { key: "appliedDate", condition: "", alias: "", value: "" },
      { key: "appliedDate", condition: "", alias: "", value: "" },
    ],
  };

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(payload),
  });

  return resp.json();
}

export async function ApplyIPO(data: ApplyIPO, reapply: boolean = false) {
  return new Promise((resolve, reject) => {
    let URL = `${BASE_URL}/api/meroShare/applicantForm/share/apply`;
    //remove token from data
    const postData = { ...data };

    delete postData.token;

    fetch(URL, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: data.token ? data.token : "",
      },
      body: JSON.stringify(postData),
    })
      .then((res) => {
        const statusCode = res.status;
        if (statusCode == 200 || statusCode == 201) {
          return res.json().then((resp) => {
            resolve(resp);
          });
        } else if (statusCode === 409) {
          return res.json().then((resp) => {
           
            if (resp.message == "Cannot Edit Rejected Applicants.") {
              console.log("Cannot Edit Rejected Applicants.");
              getApplicationReports(data.token || "").then((reports) => {
                console.log("reports",reports)
                const getShareId = (reports.object as any[]).find(
                  (item) => item.companyShareId === data.companyShareId
                );

                if (getShareId) {
                  const url = `${BASE_URL}/api/meroShare/applicantForm/share/reapply/${getShareId.applicantFormId}`;
                  const payload = {
                    appliedKitta: postData.appliedKitta,
                    companyShareId: postData.companyShareId,
                    customerId: postData.customerId,
                    boid: postData.boid,
                    crnNumber: postData.crnNumber,
                    bankId: postData.bankId,
                    accountNumber: postData.accountNumber,
                    demat: postData.demat,
                    accountBranchId: postData.accountBranchId,
                    transactionPIN: postData.transactionPIN,
                    accountTypeId: postData.accountTypeId,
                  };

                  fetch(url, {
                    method: "POST",
                    headers: {
                      Accept: "application/json, text/plain, */*",
                      "Content-Type": "application/json",
                      Authorization: data.token ? data.token : "",
                    },
                    body: JSON.stringify(payload),
                  })
                    .then((res) => {
                      const statusCode = res.status;
                      if (statusCode == 200 || statusCode == 201) {
                        return res.json().then((resp) => {
                          resolve(resp);
                        });
                      } else {
                        return res.json().then((resp) => {
                          reject(resp);
                        });
                      }
                    })
                    .catch((error) => {
                      reject(error);
                    });
                }
              }).catch((error) => {
                reject(error);
              });
            }else{
reject(resp);
            }
            
          });
        } else {
          reject("Meroshare Server Failed.");
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function GetApplicableSharesMulti(
  accounts: ClientData[]
): Promise<any> {
  return new Promise((resolve, reject) => {
    accounts.forEach((account) => {
      ClientLogin(
        parseInt(account.clientId),
        account.username,
        account.password
      )
        .then((token) => {
          GetApplicableShares(token.token)
            .then((data) => {
              resolve(data);
            })
            .catch((error) => {
              //
            });
        })
        .catch((error) => {
          //reject(error);
          //
        });
    });
  });
}

export async function ApplyShare(
  account: ClientData,
  kitta: number,
  companyShareId: number
) {
  return new Promise((resolve, reject) => {
    ClientLogin(parseInt(account.clientId), account.username, account.password)
      .then((resp) => {
        const token = resp.token;
        const bankCode = account.bankDetails.bank.id;

        GetCustomerCode(token, bankCode.toString())
          .then((data) => {
            console.log("Get Customer Code:", data);

            let customerCode = data[0].id;
            let accountTypeId = data[0].accountTypeId;
            const prepareData = {
              accountBranchId: account.bankDetails.branch.id,
              accountNumber: account.bankDetails.accountNumber,
              accountTypeId: accountTypeId,
              appliedKitta: kitta.toString(),
              /*it usees name as "CustomerId" but i found out that , actually its the id of the bank */
              customerId: customerCode,
              bankId: account.bankDetails.bank.id,
              boid: account.personalDetails.boid,
              companyShareId: companyShareId,
              crnNumber: account.crn,
              customerCode: customerCode,
              demat: account.boidDetails.boid,
              transactionPIN: account.pin,
              token: token,
            };
            ApplyIPO(prepareData)
              .then((data) => {
                resolve(data);
              })
              .catch((error) => {
                reject(error);
              });
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
}
