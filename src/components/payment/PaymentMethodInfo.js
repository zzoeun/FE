import React from "react";
import styled from "styled-components";

const PaymentInfo = ({ info }) => {
  console.log(typeof "카드결제");

  const paymentInfo = () => {
    switch (info) {
      case "카드결제":
        console.log("카드결제");
        return (
          <CardPayment>
            <RadioContainer>
              <label>
                <input type="radio" defaultChecked />
                개인
              </label>
              <label>
                <input type="radio" />
                법인
              </label>
            </RadioContainer>
            <InputTextContainer>
              <input type="text" />
              <input type="text" />
              <input type="text" />
              <input type="text" />
            </InputTextContainer>
          </CardPayment>
        );
      case "전화번호":
        return (
          <PhoneNumPayment>
            <input type="text" />
            <p>-</p>
            <input type="text" />
            <p>-</p>
            <input type="text" />
          </PhoneNumPayment>
        );

      case "계좌결제":
        return <AccountPayment></AccountPayment>;
    }
  };
  return <>{paymentInfo()}</>;
};

const CardPayment = styled.div``;

const RadioContainer = styled.div``;

const InputTextContainer = styled.div``;

const PhoneNumPayment = styled.div``;

const AccountPayment = styled.div``;

export default PaymentInfo;
