// 결제 금액액
import React from "react";
import styled from "styled-components";

const TotalPayment = styled.div`
  width: 300px;
  margin: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  background: #fff;
  text-align: center;
`;

const TotalDetails = styled.div`
  p {
    margin: 5px 0;
  }
`;

const PayButton = styled.button`
  margin-top: 10px;
  background: #4350f0;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
`;

const PaymentAmount = () => {
  const pay = {
    itemAmount: 25000,
    deliberyFee: 3000,
  };
  const total = 50000;

  const handlePayment = () => {};

  return (
    <TotalPayment>
      <h3>최종 결제 금액</h3>
      <TotalDetails>
        <div>
          <p>상품금액 :</p>
          <p>{pay.itemAmount}원</p>
        </div>
        <div>
          <p>배송비 :</p>
          <p>{pay.deliberyFee}원</p>
        </div>
        <div>
          <p>합계 :</p>
          <p>{pay.itemAmount + pay.deliberyFee}원</p>
        </div>
      </TotalDetails>

      <PayButton onClick={handlePayment}>결제하기</PayButton>
    </TotalPayment>
  );
};

export default PaymentAmount;
