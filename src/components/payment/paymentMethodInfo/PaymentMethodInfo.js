import React, { useState } from "react";
import styled from "styled-components";
import CardPaymentInfo from "./CardPaymentInfo";
import PhoneNumPaymentInfo from "./PhoneNumPaymentInfo";

const PaymentMethodInfo = ({ info, onCardNumbersChange }) => {
  const paymentInfo = () => {
    switch (info) {
      case "카드결제":
        console.log("카드결제");
        return (
          <CardPayment>
            <CardPaymentInfo onCardNumbersChange={onCardNumbersChange} />
          </CardPayment>
        );
      case "전화번호":
        return (
          <PhoneNumPayment>
            <PhoneNumPaymentInfo />
          </PhoneNumPayment>
        );

      case "계좌결제":
        return <AccountPayment></AccountPayment>;
    }
  };

  return <>{paymentInfo()}</>;
};

const CardPayment = styled.div``;

const PhoneNumPayment = styled.div`
  display: flex;
`;

const AccountPayment = styled.div``;

export default PaymentMethodInfo;
