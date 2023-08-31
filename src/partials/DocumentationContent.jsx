import React, { useState } from "react";
import {
  DocumentationOptions,
  DocumentationOptionsText,
  BrowserHistoryDefault
} from "../utils/constants";
import CookieManager from "./CookieManager/CookieManager";
import ParagraphSection from "./ParagraphSection";
import axios from "axios";
import {
  default as Neon
} from "@cityofzion/neon-js";
import {
  sc
} from '@cityofzion/neon-core';
const DocumentationContent = ({
  step,
  setStep,
  browsingTiers,
  setBrowsingTiers,
  neolineN3,
  neoline,
  account
}) => {
  let [loading, setLoading] = useState(false);
  let [intent, setIntent] = useState('');
  let [error, setError] = useState(false);
  let [amount, setPayAmount] = useState(1);
  let [domain, setDomain] = useState("");
  const uploadOrganisation = async () => {
    // const {scriptHash}  = await neolineN3.AddressToScriptHash({ address: 'NepW89XQ81URt4m3xhDfRcjoCVrkPezGVA' });
    // console.log(scriptHash);
    console.log(Neon.u.HexString.fromHex("5728a0e465b3db32bb4f75fabe97081e5c3e282f"));
    neolineN3.invoke({
      scriptHash: Neon.u.HexString.fromHex("5728a0e465b3db32bb4f75fabe97081e5c3e282f"),
      operation: 'createOrganisation',
      args: [
        {
          type: "Address",
          valye: account.address,
        },
        {
          type: "String",
          value: intent,
        },
        {
          type: "String",
          value: "something",
        },
        {
          type: "String",
          value: "something",
        },
        {
          type: "String",
          value: "something",
        }

      ],
      fee: '1',
      broadcastOverride: false,
      signers: [
        {
          account: account.address,
          scopes: 16,
          allowedContracts: ["0x9f028511b75bcb285e948f94b69a1a94db1dddd4", "0x5728a0e465b3db32bb4f75fabe97081e5c3e282f"],
          allowedGroups: []
        }
      ]
    })
      .then(result => {
        console.log('Invoke transaction success!');
        console.log('Transaction ID: ' + result.txid);
        console.log('RPC node URL: ' + result.nodeURL);
      })

    // const contractHash = "0x5728a0e465b3db32bb4f75fabe97081e5c3e282f" //GAS Contract
    // const networkMagic = Neon.CONST.MAGIC_NUMBER.TestNet
    // const rpcAddress = "http://seed2t5.neo.org:20332/"
    // //const WIF = "L4VqMgXehi1k97C3dH3xR5XWMWt1BxfYNj87QrYxVVBhjo7woAKa"
    // //const account = Neon.create.account(WIF)
    // const contract = new Neon.experimental.SmartContract(Neon.u.HexString.fromHex(contractHash),
    //   {
    //     networkMagic,
    //     rpcAddress,
    //     account
    //   }
    // )

    // const amountMain = amount * Math.pow(10, 8)
    // const operation = "createOrganisation"
    // const params = [
    //   sc.ContractParam.hash160(account.address),
    //   sc.ContractParam.fromString("hello"),
    //   sc.ContractParam.fromString("hello"),
    //   sc.ContractParam.fromString("hello"),
    //   sc.ContractParam.fromString("hello")
    // ]

    // let result;
    // try {
    //   const txHash = await contract.invoke(operation, params);
    //   console.log(txHash)
    // } catch (e) {
    //   console.log(e);
    // }


  }
  const clickerDocument = async () => {

    // console.log("where to get signer?", (await neoline.getPublicKey()));
    // const scriptHash = await neolineN3.AddressToScriptHash({ address: '0x5728a0e465b3db32bb4f75fabe97081e5c3e282f' });
    alert(amount);
    neolineN3.send({
      fromAddress: account.address,
      toAddress: 'NUe3ZeHZM2wqVUcNUsuVu5NHCBpNEe3GHa',
      asset: '0x9f028511b75bcb285e948f94b69a1a94db1dddd4',
      amount: amount,
      fee: '0.0001',
      broadcastOverride: false
    })
      .then(result => {
        console.log('Send transaction success!');
        console.log('Transaction ID: ' + result.txid);
        console.log('RPC node URL: ' + result.nodeURL);
      });

  }
  const removeTier = (index) => {
    const tempState = [...browsingTiers.filter((val, idx) => idx !== index)];
    setBrowsingTiers(tempState);
  };

  const formatTierData = () => {
    return browsingTiers.map(({ tierName, lookups }) => {
      return {
        header: tierName,
        default: true,
        subMenu: lookups.map(({ lookup, indexedTimes, lastDays }) => {
          return {
            index: lookup,
            times: indexedTimes,
            days: lastDays,
            default: true,
            state: "selected"
          }
        })
      }
    })
  }

  const uploadOrgData = async () => {
    try {
      setLoading(true);
      setError(false);
      let data = await axios.post(`http://0.0.0.0:8000/api/organizations/`, {
        intent: intent,
        intentGeneric: "",
        domainUrl: domain,
        formData: formatTierData()
      })
      setStep(DocumentationOptions.EMBED);
    } catch (error) {
      console.log("error in creating org:", error);
      setError(true)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="md:grow">
      <div className="text-lg text-gray-600">

        <ol className="flex items-center w-full space-x-2 text-medium font-medium text-center text-gray-500 bg-white rounded-lg">
          <li
            className={`flex items-center ${step === DocumentationOptions.BROWSING
              ? "text-blue-600"
              : "text-gray-600"
              }`}
            onClick={() => setStep(DocumentationOptions.BROWSING)}
          >
            <span
              className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border ${step === DocumentationOptions.BROWSING
                ? "border-blue-600"
                : "border-gray-600"
                } rounded-full shrink-0`}
            >
              1
            </span>
            {DocumentationOptionsText.BROWSING}
            <svg
              className="w-3 h-3 ml-2 sm:ml-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 12 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m7 9 4-4-4-4M1 9l4-4-4-4"
              />
            </svg>
          </li>
          <li
            className={`flex items-center ${step === DocumentationOptions.COOKIE_MANAGER
              ? "text-blue-600"
              : "text-gray-600"
              }`}
            onClick={() => setStep(DocumentationOptions.COOKIE_MANAGER)}
          >
            <span
              className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border ${step === DocumentationOptions.COOKIE_MANAGER
                ? "border-blue-500"
                : "border-gray-500"
                } rounded-full shrink-0`}
            >
              2
            </span>
            {DocumentationOptionsText.COOKIE_MANAGER}
            <svg
              className="w-3 h-3 ml-2 sm:ml-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 12 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m7 9 4-4-4-4M1 9l4-4-4-4"
              />
            </svg>
          </li>
          <li
            className={`flex items-center ${step === DocumentationOptions.PAYMENT
              ? "text-blue-600"
              : "text-gray-600"
              }`}
            onClick={() => setStep(DocumentationOptions.PAYMENT)}
          >
            <span
              className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border ${step === DocumentationOptions.PAYMENT
                ? "border-blue-500"
                : "border-gray-500"
                } rounded-full shrink-0`}
            >
              3
            </span>
            {DocumentationOptionsText.PAYMENT}
            <svg
              className="w-3 h-3 ml-2 sm:ml-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 12 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m7 9 4-4-4-4M1 9l4-4-4-4"
              />
            </svg>
          </li>
          <li
            className={`flex items-center ${step === DocumentationOptions.EMBED
              ? "text-blue-600"
              : "text-gray-600"
              }`}
          >
            <span
              className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border ${step === DocumentationOptions.EMBED
                ? "border-blue-500"
                : "border-gray-500"
                } rounded-full shrink-0`}
            >
              4
            </span>
            {DocumentationOptionsText.EMBED}
          </li>
        </ol>

        <hr className="my-3" />

        {step == DocumentationOptions.BROWSING && (
          <>
            <h3
              id="quick"
              className="mt-5 h3 text-gray-900 mb-8"
              style={{ scrollMarginTop: "100px" }}
            >
              Browsing History
            </h3>

            {browsingTiers.map((form, index) => (
              <div key={index} className="flex justify-center items-start pb-3">
                <ParagraphSection
                  tierIndex={index}
                  browsingTiers={browsingTiers}
                  setBrowsingTiers={setBrowsingTiers}
                />
                <button
                  className="pl-1 py-1 text-sm"
                  onClick={() => removeTier(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current text-gray-500 hover:text-blue-600"
                    height="1em"
                    viewBox="0 0 384 512"
                  >
                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                  </svg>
                </button>
              </div>
            ))}

            <div
              style={{ textAlign: "right" }}
              className="flex flex-wrap -mx-3 mt-6"
            >
              <div className="w-full px-3">
                <button
                  onClick={() => {
                    const nextState = [...browsingTiers];
                    nextState.push({
                      tierName: 'Developer related cookies',
                      lookups: [{ ...BrowserHistoryDefault }]
                    });
                    setBrowsingTiers(nextState);
                  }}
                  className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                >
                  {" "}
                  Add Indexer
                </button>
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mt-6">
              <div className="w-full px-3">
                <button
                  onClick={() => setStep(DocumentationOptions.COOKIE_MANAGER)}
                  className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                >
                  Next &#62;&#62; {DocumentationOptionsText.COOKIE_MANAGER}
                </button>
              </div>
            </div>
          </>
        )}

        {step == DocumentationOptions.COOKIE_MANAGER && (
          <>
            <CookieManager />
            <div className="flex flex-wrap -mx-3 mt-6">
              <div className="w-full px-3">
                <button
                  onClick={() => setStep(DocumentationOptions.PAYMENT)}
                  className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                >
                  Next &#62;&#62; {DocumentationOptionsText.PAYMENT}
                </button>
              </div>
            </div>
          </>
        )}

        {step == DocumentationOptions.PAYMENT && (
          <div>
            <div className="flex flex-wrap -mx-3 mt-6">
              <div className="w-full px-3">
                Please Stake Kleo
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  labelHidden
                  onChange={(e) => setPayAmount(e.target.value)}
                  hasIcon="right"
                  placeholder="Price in USD"
                ></input>
                <div
                  style={{ textAlign: "right" }}
                  className="flex flex-wrap -mx-3 mt-6"
                >
                  <div className="w-full px-3 mb-5">
                    <button onClick={() => clickerDocument()} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">

                      Pay
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full px-3">
                Website URL
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  labelHidden
                  hasIcon="right"
                  placeholder="Domain"
                  value={domain}
                  onChange={(e) => setDomain(e.currentTarget.value)}
                ></input>
                <br />
                Intent
                <textarea
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  labelHidden
                  hasIcon="right"
                  placeholder="Intent"
                  value={intent}
                  onChange={(e) => setIntent(e.currentTarget.value)}
                ></textarea>
                <div
                  style={{ textAlign: "right" }}
                  className="flex flex-wrap -mx-3 mt-6"
                >
                  <div className="w-full px-3 mb-5">
                    <button onClick={() => uploadOrganisation()} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                      {" "}
                      Submit{" "}
                    </button>
                  </div>
                </div>
                {error && <div class="text-sm bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-3 rounded relative" role="alert">
                  <span class="block sm:inline">Something went wrong, please try again.</span>
                  <span class="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setError(false)}>
                    <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                  </span>
                </div>}
                <button
                  disabled={loading}
                  onClick={() => uploadOrgData()}
                  className={`btn text-white bg-blue-600 hover:bg-blue-700 w-full ${loading ? "cursor-not-allowed opacity-25" : ""}`}
                >
                  Next &#62;&#62; {DocumentationOptionsText.EMBED}
                  {loading && (<>
                    <svg aria-hidden="true" class="inline w-8 h-8 ml-3 fill-gray-200 animate-spin text-blue-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                  </>)}
                </button>
              </div>
            </div>
          </div>
        )}

        {step == DocumentationOptions.EMBED && (
          <>
            <h3
              id="quick"
              className="mt-5 h3 text-gray-900 mb-8"
              style={{ scrollMarginTop: "100px" }}
            >
              Embed Code
            </h3>
            <code id="code">

              window.kleo.wallet.connect(&#123;orgId: 1&#125;).then((msg) =&gt; &#123;
              document.getElementById(&quot;
              terminal&quot;).value = JSON.stringify(msg);&#125;);


            </code>
            <h4 className="h4 text-gray-900 mb-4">How to catch data?</h4>
            <p>
              You can easily catch the data by the user, using $(div) options or
              by using postback message channels from the chrome extension.
            </p>
            <div className="pt-6">
              <div className="flex flex-col text-center sm:text-left sm:flex-row sm:justify-between sm:items-center">
                <div className="font-medium mb-4 md:mb-0">
                  Did you find this form easy to fill?
                </div>
                <ul className="inline-flex justify-center -m-2">
                  <li className="p-2">
                    <a href="#0" title="No, at all">
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12"
                          fill="#FFCC4D"
                        />
                        <path
                          d="M11.11 7.029a.334.334 0 00-.395.098c-.006.008-.653.802-2.224 1.23a5.696 5.696 0 01-1.496.212c-.662 0-1.04-.141-1.042-.142a.332.332 0 00-.38.521c.047.058 1.186 1.431 2.75 1.431.234 0 .468-.031.695-.093 1.903-.519 2.273-2.805 2.288-2.903a.333.333 0 00-.197-.354zm7.316 1.436a.335.335 0 00-.393-.106c-.004.002-.422.171-1.158.171-.441 0-.906-.06-1.382-.177-1.58-.388-2.246-1.166-2.252-1.172a.333.333 0 00-.586.27c.018.097.446 2.374 2.36 2.845.207.051.419.077.63.077 1.598 0 2.733-1.44 2.78-1.501a.336.336 0 00.001-.407zM6.666 6.667a.667.667 0 01-.164-1.313c.024-.006 2.395-.64 3.568-2.985a.666.666 0 111.193.596C9.809 5.873 6.949 6.617 6.828 6.647a.678.678 0 01-.163.02zm10.667 0a.672.672 0 01-.161-.02c-.121-.03-2.981-.775-4.435-3.682a.667.667 0 011.193-.597c1.172 2.345 3.543 2.98 3.568 2.985a.668.668 0 01-.165 1.314zM12 19.31c-2.415 0-4.018.281-6 .667-.453.087-1.333 0-1.333-1.334 0-2.666 3.063-6 7.333-6s7.333 3.334 7.333 6c0 1.334-.88 1.422-1.333 1.334-1.982-.386-3.585-.667-6-.667z"
                          fill="#664500"
                        />
                        <path
                          d="M6.667 16.667S8.667 16 12 16s5.333.667 5.333.667S16 14 12 14s-5.333 2.667-5.333 2.667z"
                          fill="#FFF"
                        />
                      </svg>
                    </a>
                  </li>
                  <li className="p-2">
                    <a href="#0" title="Not really">
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle fill="#FFCC4D" cx="12" cy="12" r="12" />
                        <circle fill="#F4F7F9" cx="16.333" cy="9" r="3.667" />
                        <circle fill="#F4F7F9" cx="7.667" cy="9" r="3.667" />
                        <path
                          d="M15.406 15.616c-1.842-.445-5.915-.04-7.441 2.937a.249.249 0 00.222.364c.057 0 .114-.02.161-.058 2.056-1.72 4.957-1.72 6.69-1.72 1.09 0 1.691 0 1.691-.472s-.47-.846-1.323-1.051zM7 8.666a1.662 1.662 0 00.25-3.308A3.627 3.627 0 005.8 5.85c-.287.3-.466.704-.466 1.151 0 .92.746 1.667 1.667 1.667zm8.667 0a1.662 1.662 0 00.25-3.308 3.624 3.624 0 00-1.451.491C14.179 6.15 14 6.553 14 7c0 .92.746 1.667 1.667 1.667z"
                          fill="#65471B"
                        />
                      </svg>
                    </a>
                  </li>
                  <li className="p-2">
                    <a href="#0" title="It was useful">
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle fill="#FFCC4D" cx="12" cy="12" r="12" />
                        <path
                          d="M10.667 11.305a.667.667 0 01-.633-.456c-.135-.399-.679-1.544-1.367-1.544-.708 0-1.259 1.218-1.368 1.544a.666.666 0 11-1.264-.422c.083-.251.869-2.456 2.632-2.456 1.764 0 2.549 2.205 2.633 2.456a.666.666 0 01-.633.878zm6.666 0a.666.666 0 01-.632-.456c-.135-.399-.679-1.544-1.368-1.544-.708 0-1.259 1.218-1.368 1.544a.667.667 0 01-1.265-.422c.084-.251.87-2.456 2.633-2.456 1.762 0 2.548 2.205 2.632 2.456a.666.666 0 01-.632.878zm.89 2.489a.334.334 0 00-.423-.02c-.026.02-2.615 1.934-5.8 1.934-3.177 0-5.775-1.914-5.8-1.933a.333.333 0 00-.486.438c.086.143 2.145 3.495 6.286 3.495s6.2-3.352 6.286-3.495a.333.333 0 00-.063-.419z"
                          fill="#664500"
                        />
                        <path
                          d="M14.153 2.631c0 .16.02.315.054.464.284 1.762 2.243 3.621 3.647 4.132 1.11-.404 2.564-1.651 3.265-3.026A12.018 12.018 0 0015.833.626a2.04 2.04 0 00-1.68 2.005zM9.162 19.385a2.213 2.213 0 00-3.95-1.79 2.21 2.21 0 00-1.799-.925c-.827 0-1.54.46-1.92 1.132a12.047 12.047 0 005.379 5.05c1.091-.901 2.087-2.205 2.29-3.467zm13.705-2.29a1.527 1.527 0 00-2.708-.457 1.532 1.532 0 00-2.737 1.24c.205 1.27 1.566 2.597 2.607 3.04a12.03 12.03 0 002.838-3.823z"
                          fill="#FFAC33"
                        />
                        <path
                          d="M22.417 2.18A2.042 2.042 0 0018.715.991a2.042 2.042 0 00-3.647 1.651c.285 1.762 2.243 3.621 3.647 4.132 1.404-.511 3.363-2.37 3.646-4.131a2.02 2.02 0 00.056-.465zM8.139 18.938a2.213 2.213 0 00-4.011-1.287 2.213 2.213 0 00-3.951 1.79c.307 1.908 2.429 3.922 3.95 4.475 1.522-.552 3.644-2.566 3.951-4.475.039-.163.06-.33.06-.503zm15.826-1.521a1.532 1.532 0 00-2.778-.891 1.532 1.532 0 00-2.737 1.24c.213 1.321 1.683 2.716 2.737 3.099 1.054-.383 2.524-1.778 2.736-3.1.027-.112.042-.228.042-.348z"
                          fill="#DD2E44"
                        />
                      </svg>
                    </a>
                  </li>
                  <li className="p-2">
                    <a href="#0" title="Excellent">
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12"
                          fill="#FFCC4D"
                        />
                        <path
                          d="M12 14c-2.415 0-4.018-.281-6-.667-.453-.087-1.333 0-1.333 1.334 0 2.666 3.063 6 7.333 6s7.333-3.334 7.333-6c0-1.334-.88-1.422-1.333-1.334-1.982.386-3.585.667-6 .667z"
                          fill="#664500"
                        />
                        <path
                          d="M6 14.667s2 .666 6 .666 6-.666 6-.666-1.333 2.666-6 2.666-6-2.666-6-2.666z"
                          fill="#FFF"
                        />
                        <path
                          d="M10.455 2.942l-3.028.534L5.867.641a.835.835 0 00-1.554.274l-.497 3.198-3.028.534A.834.834 0 00.576 6.22l2.713 1.288-.498 3.208a.835.835 0 001.417.713l2.341-2.374 3.012 1.43a.834.834 0 001.088-1.154L9.083 6.487l2.11-2.139a.834.834 0 00-.738-1.406zm3.09 0l3.028.534 1.56-2.835a.835.835 0 011.554.274l.496 3.198 3.028.534a.834.834 0 01.212 1.573L20.71 7.508l.499 3.208a.835.835 0 01-1.418.713L17.45 9.055l-3.012 1.43a.834.834 0 01-1.087-1.154l1.565-2.844-2.11-2.139a.834.834 0 01.74-1.406z"
                          fill="#E95F28"
                        />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Related content */}

      {/* Feedback */}
    </div>
  );
};

export default DocumentationContent;
