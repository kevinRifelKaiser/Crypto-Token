import React, { useState } from "react";
//Import Principal module from dfinity library in JS
import {Principal} from "@dfinity/principal";
import {token} from "../../../declarations/token"

function Balance() {
  
  const [inputValue, setInput] = useState("");
  const [balanceResult, setBalance] = useState("");
  const [coinName, setCoinName] = useState("");
  const [isHidden, setHidden] = useState(true);

  async function handleClick() {
    const principal = Principal.fromText(inputValue);
    const balance = await token.balanceOf(principal);
    setBalance(balance.toLocaleString());
    setCoinName(await token.getSymbol());
    setHidden(false);
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={(e)=>{setInput(e.target.value)}}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden={isHidden}>This account has a balance of {balanceResult} {coinName}.</p>
    </div>
  );
}

export default Balance;
