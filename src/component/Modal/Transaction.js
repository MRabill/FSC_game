import React, { useState, useRef, useEffect } from "react";
import "../../style/SavingModal.css";
import successSound from "../../music/treasure.mp3";

const Transaction = ({
  visible,
  setVisible,
  isTransactionNew,
  setIsTransaction,
  setBalanceNew,
}) => {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const audio = new Audio(successSound);
  audio.loop = false;

  function saveDataToLocalStorage(sign) {
    const existingData = JSON.parse(localStorage.getItem("Transaction"));
    const balance = JSON.parse(localStorage.getItem("Balance"));

    const newBalance = {
      balance: balance.balance,
      income: balance.income,
      expense: balance.expense,
    };

    console.log(Array.isArray(existingData));

    const data = {
      name: name,
      amount: amount,
      sign: sign,
    };
    console.log(Array.isArray(existingData));
    if (Array.isArray(existingData)) {
      existingData.push(data);

      localStorage.setItem("Transaction", JSON.stringify(existingData));
    } else {
      localStorage.setItem("Transaction", JSON.stringify([data]));
    }

    if (sign) {
      newBalance.balance = parseInt(balance.balance) + parseInt(amount);
    } else {
      newBalance.balance = parseInt(balance.balance) - parseInt(amount);
    }

    setIsTransaction(isTransactionNew + 1);
    setBalanceNew(isTransactionNew + 1);

    localStorage.setItem("Balance", JSON.stringify(newBalance));

    setOpenSuccess(false);
    setVisible(false);
  }

  return (
    <div>
      <div
        id="popup-containerM"
        class="popup-containerM"
        style={{ display: visible ? "flex" : "none" }}
      >
        <div class="popup-content">
          <div class="close-button" onClick={() => setVisible(false)}>
            &#x2716;
          </div>

          <h3 class="popup-title" style={{ color: "#484848" }}>
            Add Transactions
          </h3>
          <h3 class="popup-title2" style={{ color: "#484848" }}>
            Name:
          </h3>
          <input
            class="expense-textfield"
            type="text"
            id="Quantity"
            placeholder="Name of Transactions"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <h3 class="popup-title2" style={{ color: "#484848" }}>
            Amount:
          </h3>
          <input
            class="expense-textfield"
            type="text"
            id="Quantity"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <h3 class="popup-title1" style={{ color: "#797979" }}>
            A transaction can be an addition to the balance or an expenses.
            Please click the correct button below
          </h3>

          <div class="button-containerr">
            <button
              class="buttonContinue"
              style={{ backgroundColor: "green" }}
              onClick={() => {
                saveDataToLocalStorage(true);
                audio.loop = false;
                audio.play();
              }}
            >
              <h1>+</h1>
            </button>
            <button
              class="buttonContinue2"
              style={{ backgroundColor: "red", width: "200px" }}
              onClick={() => {
                saveDataToLocalStorage(false);
                audio.loop = false;
                audio.play();
              }}
            >
              <h1>-</h1>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
