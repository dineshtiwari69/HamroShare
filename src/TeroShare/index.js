import retry from "async-retry";
import { fetchUserDetails } from "../helpers/storage";

const BASEURI = "https://backend.cdsc.com.np"

const login = async (clientId, username, password) =>
  retry(async () => {
    let json_data = {
      clientId: clientId,
      username: username,
      password: password,
    };
    const res = await fetch(`${BASEURI}/api/meroShare/auth/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json_data),
    });

    const resp = await res.json();
    const statusCode = res.status;
    //get authorization token
    const token = res.headers.get("authorization");
    resp.token = token;
    if (statusCode !== 200 && statusCode !== 401) {
      console.log("error");
      throw new Error(`Status Code ${statusCode}`);
    } else {
      if (statusCode !== 200) {
        //TRIGGER RETRY if SERVER ERROR BUT NOT INVALID PASSWORD
        if (!resp.message.includes("Attempts left")) {
          throw new Error(`Status Code ${statusCode}`);
        }
      }
    }

    console.log("Reached");

    return resp;
  });

const personalDetails = async (token) =>
  retry(async () => {
    let URL = `${BASEURI}/api/meroShare/ownDetail/`;
    const res = await fetch(URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const resp = await res.json();
    const statusCode = res.status;
    if (statusCode !== 200) {
      console.log("error");
      throw new Error(`Status Code ${statusCode}`);
    }

    return resp;
  });

const boidDetails = async (token, boid) =>
  retry(async () => {
    let URL = `${BASEURI}/api/meroShareView/myDetail/${boid}`;
    const res = await fetch(URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const resp = await res.json();
    const statusCode = res.status;
    if (statusCode !== 200) {
      throw new Error(`Status Code ${statusCode}`);
    }

    return resp;
  });

const bankDetails = async (token, bankCode) =>
  retry(async () => {
    let URL = `${BASEURI}/api/bankRequest/${bankCode}`;
    const res = await fetch(URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const resp = await res.json();
    const statusCode = res.status;
    if (statusCode !== 200) {
      console.log("error");
      throw new Error(`Status Code ${statusCode}`);
    }

    return resp;
  });

const getApplicableShares = async (token) =>
  retry(async () => {
    let URL =
      `${BASEURI}/api/meroShare/companyShare/applicableIssue/`;
    const res = await fetch(URL, {
      headers: {
        accept: "application/json, text/plain, */*",
        authorization: token,
        "content-type": "application/json",
      },
      body: '{"filterFieldParams":[{"key":"companyIssue.companyISIN.script","alias":"Scrip"},{"key":"companyIssue.companyISIN.company.name","alias":"Company Name"},{"key":"companyIssue.assignedToClient.name","value":"","alias":"Issue Manager"}],"page":1,"size":10,"searchRoleViewConstants":"VIEW_APPLICABLE_SHARE","filterDateParams":[{"key":"minIssueOpenDate","condition":"","alias":"","value":""},{"key":"maxIssueCloseDate","condition":"","alias":"","value":""}]}',
      method: "POST",
    });
    const resp = await res.json();
    const statusCode = res.status;

    if (statusCode !== 200) {
      console.log("error");
      throw new Error(`Status Code ${statusCode}`);
    }

    return resp;
  });

const getCustomerCode = async (token, code) =>
  retry(
    async () => {
      const res = await fetch(
        `${BASEURI}/api/meroShare/bank/${code}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const resp = await res.json();
      const statusCode = res.status;

      if (statusCode !== 200) {
        console.log("error");
        throw new Error(`Status Code ${statusCode}`);
      }

      return resp;
    },
    { retries: 2 }
  );

const getCapitals = async () =>
  retry(async () => {
    let URL = `${BASEURI}/api/meroShare/capital/`;
    const res = await fetch(URL);
    const resp = await res.json();
    const statusCode = res.status;

    if (statusCode !== 200) {
      console.log("error");
      throw new Error(`Status Code ${statusCode}`);
    }

    return resp;
  });

const getApplicableIssue = async () => {
  let data = fetchUserDetails()[0];
  const res = await login(data.clientId, data.username, data.password);
  const applicableData = await getApplicableShares(res.token);
  console.log("reached", applicableData);
  return applicableData;
};

const sendApplication = async (token, data) =>
  retry(async () => {
    let URL = `${BASEURI}/api/meroShare/applicantForm/share/apply`;
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    });
    const resp = await res.json();
    return resp;
  });

const applyIPO = async (shareCode, kitta, addTerminalLogs) => {
  let accounts = fetchUserDetails();
  addTerminalLogs(
    "Applying " + kitta + " IPO From " + accounts.length + " Accounts"
  );
  for (let i = 0; i < accounts.length; i++) {
    let data = accounts[i];
    addTerminalLogs("Applying From " + data.username + " .....");

    const res = await login(data.clientId, data.username, data.password);
    await new Promise((r) => setTimeout(r, 2000));
    try {
      const applicableData = await getCustomerCode(
        res.token,
        data.bankDetails.bank.id
      );
      let customerCode = applicableData.id;
      const toSendData = {
        accountBranchId: data.bankDetails.accountBranch.id,
        accountNumber: data.bankDetails.accountNumber,
        appliedKitta: kitta.toString(),
        bankId: data.bankDetails.bank.id,
        boid: data.personalDetails.boid,
        companyShareId: shareCode,
        crnNumber: data.crn,
        customerId: customerCode,
        demat: data.boidDetails.boid,
        transactionPIN: data.pin,
      };
      const applyResponse = await sendApplication(res.token, toSendData);
      const error = applyResponse.status === "CONFLICT";
      addTerminalLogs(
        "Applied From " + data.username + " MESSAGE : " + applyResponse.message,
        !error
      );
    } catch (err) {
      addTerminalLogs("Failed From " + data.username, false);
    }
  }
};

const teroshareLogin = async (clientId, username, password, pin, crn) =>
  retry(async () => {
    const res = await login(clientId, username, password);

    if (res.message.includes("Attempts")) {
      return res;
    }
    const pDetails = await personalDetails(res.token);
    const bDetails = await boidDetails(res.token, pDetails.demat);
    const bankDetailsx = await bankDetails(res.token, bDetails.bankCode);
    let all_data = {
      clientId: clientId,
      username: username,
      password: password,
      pin: pin,
      crn: crn,
      personalDetails: pDetails,
      boidDetails: bDetails,
      bankDetails: bankDetailsx,
    };
    return all_data;
  });

const getApplicationReport = async (data) =>
  retry(async () => {
    const token = await login(data.clientId, data.username, data.password);
    let URL =
    `${BASEURI}/api/meroShare/applicantForm/active/search/`;
    const res = await fetch(URL, {
      headers: {
        accept: "application/json, text/plain, */*",
        authorization: token.token,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        filterFieldParams: [
          {
            key: "companyShare.companyIssue.companyISIN.script",
            alias: "Scrip",
          },
          {
            key: "companyShare.companyIssue.companyISIN.company.name",
            alias: "Company Name",
          },
        ],
        page: 1,
        size: 200,
        searchRoleViewConstants: "VIEW_APPLICANT_FORM_COMPLETE",
        filterDateParams: [
          {
            key: "appliedDate",
            condition: "",
            alias: "",
            value: "",
          },
          {
            key: "appliedDate",
            condition: "",
            alias: "",
            value: "",
          },
        ],
      }),
      method: "POST",
    });
    
    const statusCode = res.status;

    if (statusCode !== 200) {
      console.log("error");
      throw new Error(`Status Code ${statusCode}`);
    }
    const resp = await res.json();

    return resp;
  });

export {
  getApplicableIssue,
  teroshareLogin,
  getCapitals,
  applyIPO,
  getApplicationReport,
};
