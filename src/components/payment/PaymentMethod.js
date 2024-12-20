// 결제 방법법
import React, { useState } from "react";
// import styles from "./PaymentMethod.module.css";
import styled from "styled-components";

const PaymentMethod = () => {
  const [payMethod, setPayMethod] = useState(0);

  const payButtons = [];

  const onChangePaymentRadio = (e) => {
    console.log(e.target.value);
    setPayMethod(e.target.value);
  };

  const changePaymentMethod = () => {};

  return (
    <PaymentMethodComponent>
      <h3>결제 방식</h3>
      <RadioContainer>
        <label>
          <input
            type="radio"
            value="0"
            id="easyPayment"
            name="paymentRadio"
            onChange={onChangePaymentRadio}
            defaultChecked
            // onChange={() => handleSelect("SmilePay")}
          />
          간편결제
        </label>
        <p>|</p>
        <label>
          <input
            type="radio"
            value="1"
            id="regularPayment"
            name="paymentRadio"
            onChange={onChangePaymentRadio}
          />
          일반결제
        </label>
      </RadioContainer>
      <SimpleButtonContainer>
        <button>SmilePay</button>
        <button>Npay</button>
        <button>🗨️페이</button>
        <button>PAYCO</button>
      </SimpleButtonContainer>
    </PaymentMethodComponent>
  );
};

const PaymentMethodComponent = styled.div`
  margin: 20px;
  padding: 15px;
  font-size: 15px;

  h3 {
    padding-bottom: 20px;
    font-size: 20px;
    font-weight: bold;

    border-bottom: 2px solid #e0e0e0;
  }
`;

const RadioContainer = styled.div`
  display: flex;
  padding: 20px 0 20px 5px;
  border-bottom: 2px solid #f4f4f4;

  label {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  input {
    appearance: none; // 기본 모양 제거
    border-radius: 50%;
    box-sizing: border-box;
    width: 20px;
    height: 20px;
    border: 5px solid #cccccc;
    cursor: pointer;

    margin-right: 8px;
  }

  input: checked {
    border-color: #495a70;
  }

  p {
    margin: 0 10px 0 13px;
    color: lightgray;
  }
`;

const SimpleButtonContainer = styled.div`
  padding: 20px 0 20px 5px;

  button {
    height: 45px;
    width: 192px;

    background-color: #fff;
    border: 2px solid #f4f4f4;

    cursor: pointer;
  }
`;

export default PaymentMethod;
