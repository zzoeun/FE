// 결제 금액액
import React from "react";
import styled from "styled-components";

const PaymentAmount = ({ totalAmount, shippingFee, onPayment }) => {
  const handlePayment = () => {};

  return (
    <TotalPaymentWrapper>
      <h3>최종 결제 금액</h3>
      <TotalDetails>
        <div>
          <p>상품금액</p>
          <p>{totalAmount}원</p>
        </div>
        <div>
          <p>배송비</p>
          <p>{shippingFee}원</p>
        </div>
        <Total>
          <TotalContent>합계</TotalContent>
          <div>
            <TotalAmount>{totalAmount + shippingFee}</TotalAmount>
            <TotalContent>원</TotalContent>
          </div>
        </Total>
      </TotalDetails>

      <PayButton onClick={handlePayment}>결제하기</PayButton>
      <AgreeButton onClick={onPayment}>
        <img></img>
        <div>
          <p>주문/결제 진행 필수 동의</p>
          <p>·개인정보수집 및 이용 동의</p>
          <p>·개인정보 판매자 제공 동의</p>
        </div>
      </AgreeButton>
    </TotalPaymentWrapper>
  );
};

const TotalPaymentWrapper = styled.div`
  width: 280px;
  margin: 20px;
  margin-top: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  background: #fff;

  h3 {
    font-weight: bolder;
  }
`;

const TotalDetails = styled.div`
  margin-top: 25px;
  color: #8c8092;

  div {
    display: flex;
    justify-content: space-between;
  }
  p {
    margin: 5px 0;
  }
`;

const Total = styled.div`
  margin-top: 10px;
  padding-top: 10px;

  border-top: 2px solid #f4f4f4;
  color: black;
`;

const TotalContent = styled.p`
  padding-top: 11px;
`;

const TotalAmount = styled.p`
  font-size: 30px;
  font-weight: bold;
`;

const PayButton = styled.button`
  margin-top: 40px;
  padding: 15px 20px;
  width: 235px;
  background: #495a70;
  box-shadow: 0 3px 5px lightgray;

  color: white;
  font-weight: bold;
  border: none;

  cursor: pointer;
  font-size: 16px;
`;

const AgreeButton = styled.button`
  display: flex;
  margin-top: 20px;
  background-color: #fff;
  border: none;
  cursor: pointer;

  img {
    height: 20px;
    width: 20px;
    background-color: pink;
  }

  p {
  }
`;

export default PaymentAmount;
