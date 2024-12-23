import React, { useState } from "react";
import styled from "styled-components";
import CardPaymentInfo from "./paymentMethodInfo/CardPaymentInfo";
import PhoneNumPaymentInfo from "./paymentMethodInfo/PhoneNumPaymentInfo";

const PaymentMethodInfo = ({ info }) => {
  const [cardNumbers, setCardNumbers] = useState(""); // 카드 번호

  // 카드 번호 업데이트 함수
  const handleCardNumbersChange = (numbers) => {
    setCardNumbers(numbers);
  };

  console.log(cardNumbers);

  const paymentInfo = () => {
    switch (info) {
      case "카드결제":
        console.log("카드결제");
        return (
          <CardPayment>
            <CardPaymentInfo onCardNumbersChange={handleCardNumbersChange} />
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
