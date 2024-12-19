import React from 'react';
import styled from 'styled-components';

const Order = () => {
  return (
    <div>
      <OrderConatiner>
        <OrderTitle>장바구니 합계</OrderTitle>
        <OrderPrice>
          <div>상품금액</div>
          <div>0 원</div>
        </OrderPrice>
        <OrderDeliveryPrice>
          <div>배송비</div>
          <div>0 원</div>
        </OrderDeliveryPrice>
        <OrderTotal>
          <div>선택 합계</div>
          <TotalPrice>
            <Price>0</Price>
            <Won>원</Won>
          </TotalPrice>
        </OrderTotal>
        <OrderButton>주문하기</OrderButton>
      </OrderConatiner>
    </div>
  );
};

export default Order;


const OrderConatiner = styled.div`
  width: 300px;
  heigth: 660px;
  border-left: 1px solid gray;
  margin-left: 30px;
  position: sticky;  // 스크롤 시 고정
  top: 20px;        // 상단에서 20px 떨어진 위치에서 고정
  align-self: flex-start; // 부모 컨테이너 상단에 맞춤
`;

const OrderTitle = styled.h2`
  font-size: 1.5rem;
  padding-top: 30px;
  padding-left: 30px;
`;

const OrderPrice = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
  font-size: 1rem;
  padding-left: 30px;
`;

const OrderDeliveryPrice = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  font-size: 1rem;
  padding-left: 30px;
`;

const OrderTotal = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  font-size: 1rem;
  padding-left: 30px;
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


const OrderButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  cursor: pointer;
  margin-top: 75px;
  margin-left: 30px;
  border: 1px solid black;
  background-color: lightgray;
  padding: 20px;
`;