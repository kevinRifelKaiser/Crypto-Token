import React, { useState } from "react";
import {Principal} from "@dfinity/principal";
import {token} from "../../../declarations/token";

function Transfer() {

  const [inputID, setInputID] = useState("");
  const [inputAmount, setAmount] = useState("");
  const [isDisabled, setDisable] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isHidden, setHide] = useState(true);
  
  async function handleClick() {
    setDisable(true);
    const recipientID = Principal.fromText(inputID);
    const amount = Number(inputAmount);
    const result = await token.transfer(recipientID, amount);
    setInputID("");
    setAmount("");
    setFeedback(result);
    setDisable(false);
    setHide(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={inputID}
                onChange={(e)=>{setInputID(e.target.value)}}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={inputAmount}
                onChange={(e)=>{setAmount(e.target.value)}}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button 
          id="btn-transfer" 
          onClick={handleClick}
          disabled={isDisabled}
          >
            Transfer
          </button>
        </p>
        <p hidden={isHidden}>{feedback}</p>
      </div>
    </div>
  );
}

export default Transfer;
