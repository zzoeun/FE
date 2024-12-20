// 결제 방법
import React, { useState } from "react";
import styled from "styled-components";

const PaymentMethod = () => {
  // 결제 방법 Radio 상태 (간단, 일반)
  // 결제 방법 Button 상태 (SmilePay, NPay, 카드결제, 전화번호 등등등)
  const [payRadioMethod, setPayRadioMethod] = useState(0);
  const [payButtonMethod, setPayButtonMethod] = useState(0);

  // 결제 방법 버튼 (0: 간단, 1: 일반)
  const PayButtonsText = [
    ["SmilePay", "NPay", "🗨️Pay", "PAYCO"],
    ["카드결제", "전화번호", "계좌결제"],
  ];

  // 결제 방법 Radio change 핸들러
  const handleRadioChange = (e) => {
    // Radio index 값 불러오기 -> PayButtons 첫번째 인자
    console.log(e.target.value);
    setPayRadioMethod(e.target.value);
  };

  // 결제 방법 Button Click 핸들러
  const handleButtonClick = (index) => {
    // index 값 불러오기 -> PayButtons 두번째 인자
    console.log(index);
    setPayButtonMethod(index);
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
            onChange={handleRadioChange}
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
            onChange={handleRadioChange}
          />
          일반결제
        </label>
      </RadioContainer>
      <ButtonContainer>
        {PayButtonsText[payRadioMethod].map((text, index) => (
          <button key={index} onClick={() => handleButtonClick(index)}>
            {text}
          </button>
        ))}
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

const ButtonContainer = styled.div`
  padding: 20px 0 20px 15px;

  button {
    height: 45px;
    width: 192px;

    background-color: #fff;
    border: 2px solid #f4f4f4;

    cursor: pointer;
  }

  button: hover {
    background-color: #f4f4f4;
  }
`;

const CardPayment = styled.div``;

const InputTextContainer = styled.div``;

export default PaymentMethod;
