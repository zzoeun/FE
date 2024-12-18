// 결제 방법법
import React, { useState } from "react";
// import styles from "./PaymentMethod.module.css";
import styled from "styled-components";

const PaymentMethodComponent = styled.div`
  margin: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  background: white;
`;

const MethodRadio = styled.div`
  margin-bottom: 10px;
`;

const MethodButton = styled.div``;

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState(0);

  const onChangePaymentRadio = (e) => {
    console.log(e.target.value);
    setPaymentMethod(e.target.value);
  };

  return (
    <PaymentMethodComponent>
      <h3>결제 방식</h3>
      <MethodRadio>
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
      </MethodRadio>
      <MethodButton>
        <button>결제 방법 선택 버튼...</button>
      </MethodButton>
    </PaymentMethodComponent>
  );
};

export default PaymentMethod;
