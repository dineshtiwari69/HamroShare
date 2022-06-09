import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { fetchUserDetails } from "../helpers/storage";
import { Link } from "react-router-dom";

import { getApplicableIssue, getApplicationReport } from "../TeroShare";

export default function Status() {
  const [userAccounts] = useState(fetchUserDetails());

  const [availbleIssue, setAvailbleIssue] = useState({});
  const [readyToApply, setReadyToApply] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusRequested, setStatusRequested] = useState(false);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    getApplicableIssue().then(function (data) {
      setReadyToApply(true);
      setAvailbleIssue(data);
    });
  }, []);

  useEffect(() => {
    function getData() {
      setIsLoading(true);
      
      for (let index in userAccounts) {
        let userData = userAccounts[parseInt(index)];
        getApplicationReport(userData).then((resp) => {
          
          for (let count in resp.object) {
            let data = resp.object[parseInt(count)];
            if (data.companyShareId === statusRequested) {
              console.log(data);

              data["userDetail"] = userData;

              setRecords([...records, data]);

              
            }
            console.log(index)
            if (parseInt(index) === userAccounts.length - 1) {
              
              setIsLoading(false);
            }
          }
        });
      }
    }
    if (statusRequested) {
      getData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusRequested]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-4 overflow-auto">
        <h1 className="font-ms-font text-msweight font-bold ">Status</h1>
        <h1 className="font-ms-font text-msx mb-4 font-regular ">
          One Click Applier
        </h1>
        {!userAccounts ? (
          <Link
            to="/add-account"
            className="bg-ms-button text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
          >
            Add Atleast One Account to Use AutoApplier
          </Link>
        ) : (
          <>
            <label>Select IPO</label>
            <select
              className="block appearance-none text-xs w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              name="capital"
              id="applicableIssues"
              required
            >
              {availbleIssue.object &&
                availbleIssue.object.map((element) => {
                  return (
                    <option
                      key={element.companyShareId}
                      value={element.companyShareId}
                    >
                      {element.companyName} ({element.shareTypeName}:{" "}
                      {element.shareGroupName})
                    </option>
                  );
                })}
            </select>

            <button
              className="bg-ms-bg px-y py-2 p-6 rounded text-white mt-2 flex"
              disabled={!readyToApply}
              onClick={() => {
                const selectedIPO =
                  document.getElementById("applicableIssues").value;

                setStatusRequested(parseInt(selectedIPO));
              }}
            >
              {isLoading ? (
                <>
                  <svg
                    role="status"
                    class="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  Checking...
                </>
              ) : (
                <>⚙️ Check Status</>
              )}
            </button>
            <div className="flex flex-col">
              <div className="py-2 align-middle inline-block min-w-full ">
                <div className="shadow overflow-hidden border-b border-gray-200 ">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Title
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Role
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {records.length > 0 &&
                        records.map((record) => (
                          <tr key={record.userDetail.username}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {record.userDetail.username}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {record.companyName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {record.shareGroupName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {record.statusName}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
