// 결제 방법법
import React, { useState } from "react";
// import styles from "./PaymentMethod.module.css";
import styled from "styled-components";

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState(0);

  const onChangePaymentRadio = (e) => {
    console.log(e.target.value);
    setPaymentMethod(e.target.value);
  };

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
          />{" "}
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
            // onChange={() => handleSelect("NPay")}
          />{" "}
          일반결제
        </label>
      </RadioContainer>
      {}
      <ButtonContainer>
        <button>SmilePay</button>
        <button>Npay</button>
        <button>🗨️페이</button>
        <button>PAYCO</button>
      </ButtonContainer>
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

  p {
    margin: 0 10px 0 13px;
    color: lightgray;
  }
`;

const ButtonContainer = styled.div`
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
