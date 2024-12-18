import React from 'react';
import styled from 'styled-components';

const Payments = () => {
  return (
    <PaymentsConatiner>
      <PaymentsTitle>장바구니 합계</PaymentsTitle>
      <PaymentsPrice>
        <div>상품금액</div>
        <div>0 원</div>
      </PaymentsPrice>
      <PaymentsDelivery>
        <div>배송비</div>
        <div>0 원</div>
      </PaymentsDelivery>
      <PaymentsTotal>
        <div>선택 합계</div>
        <TotalPrice>
          <Price>0</Price>
          <Won>원</Won>
        </TotalPrice>
      </PaymentsTotal>
      <PaymentsOrderButton>주문하기</PaymentsOrderButton>
    </PaymentsConatiner>

  );
};

export default Payments;

const PaymentsConatiner = styled.div`
  width: 350px;
  heigth: 660px;
  margin-left: 100px;
  border-left: 1px solid gray;
`;

const PaymentsTitle = styled.h2`
  font-size: 1.5rem;
  margin-top: 50px;
  margin-left: 50px;
`;

const PaymentsPrice = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
  font-size: 1rem;
  margin-left: 50px;
`;

const PaymentsDelivery = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  font-size: 1rem;
  margin-left: 50px;
`;

const PaymentsTotal = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  font-size: 1rem;
  margin-left: 50px;
`;

const TotalPrice = styled.div`
  display: flex;
  align-items: center;
`;

const Price = styled.span`
  font-size: 2rem;
  font-weight: bold;
`;

const Won = styled.span`
  font-size: 1rem;
  margin-left: 4px;
`;


const PaymentsOrderButton = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  margin-top: 80px;
  margin-left: 50px;
  border: 1px solid black;
  background-color: lightgray;
  padding: 20px;
`;