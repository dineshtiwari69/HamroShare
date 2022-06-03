import React, { useEffect } from "react";
import Navbar from "../Navbar";
import { fetchUserDetails } from "../../helpers/storage";
import { Link } from "react-router-dom";
import { getApplicableIssue,applyIPO} from "../../TeroShare";
export default function AutoApplier() {
  const [userAccounts] = React.useState(fetchUserDetails());
  const [availbleIssue, setAvailbleIssue] = React.useState({});
  const [readyToApply,setReadyToApply] = React.useState(false);
  const [terminalLogs] = React.useState([
    { time: getCurrentTime(), message: "Fetching IPO Lists..." },
  ]);

  function getCurrentTime() {
    var currentdate = new Date();
    var datetime =
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " : " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    return datetime;
  }
  

  useEffect(() => {
    
    
    getApplicableIssue().then(function(data) {
      addTerminalLogs("Fetched IPO Lists",true);
      setReadyToApply(true)
      setAvailbleIssue(data);
    });
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addTerminalLogs(text,success) {
    let parentText = document.createElement("p");
    console.log("SUCCESS",success)
    let classToAdd = "text-green-400";
    if(success === false){
      classToAdd = "text-red-400";
    }
  
    parentText.setAttribute("class",classToAdd);
    parentText.innerText = `[${getCurrentTime()}] : ${text}`
    document.getElementById("terminalLogs").appendChild(parentText)
  }

  useEffect(() => {
    console.log(terminalLogs);
  }, [terminalLogs]);

  return (
    <>
      <Navbar />
      <div class="container mx-auto px-4 py-4 overflow-auto">
        <h1 className="font-ms-font text-msweight font-bold ">Auto Apply</h1>
        <h1 className="font-ms-font text-msx mb-4 font-regular ">
          One Click Applier
        </h1>
        {userAccounts && userAccounts.length === 0 && (
          <Link
            to="/add-account"
            className="bg-ms-button text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
          >
            Add Accounts
          </Link>
        )}
        <label>Select IPO</label>
        <select
          class="block appearance-none text-xs w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          name="capital"
          id="applicableIssues"
          required
        >
          {availbleIssue.object &&
            availbleIssue.object.map((element) => {
              return (
                <option key={element.companyShareId} value={element.companyShareId}>
                  {element.companyName} ({element.shareTypeName}:{" "}
                  {element.shareGroupName})
                </option>
              );
            })}
        </select>
        <button className="bg-ms-bg px-y py-2 p-6 rounded text-white mt-2" disabled={!readyToApply} onClick={()=>{
          applyIPO(document.getElementById("applicableIssues").value,addTerminalLogs)
        }}>
          ⚙️ Start Applying
        </button>
        <div class="w-full flex justify-center items-center mt-10">
          <div class="w-full bg-ms-bg ">
            <div class="w-full border-t-8 border-red-800 flex">
              <h1 className="font-ms-font text-msweight font-bold text-white px-5 py-5">
                Terminal
              </h1>
            </div>
            <div class="w-full border-t-4 border-black bg-black flex h-120 ">
              <div className="p-4" id="terminalLogs">
                {terminalLogs.map((elem,index) => {
                  return (
                    <p className="text-green-400" key={elem.index}>
                      [{elem.time}] : {elem.message}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
