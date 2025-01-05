import React from 'react';
import styled from 'styled-components';

const CartItemAmount = ({ totalPrice = 0, deliveryFee = 0 }) => {
  const finalTotal = totalPrice + deliveryFee;

  return (
    <Amount>
      <AmountList>
        <AmountRow>
          <AmountText>상품 금액</AmountText>
          <AmountPrice>
            <Price>{totalPrice.toLocaleString()}</Price>
            <Won>원</Won>
          </AmountPrice>
        </AmountRow>
        <AmountPlusButton>+</AmountPlusButton>
        <AmountRow>
          <AmountDeliveryText>배송비</AmountDeliveryText>
          <AmountPrice>
            <Price>{deliveryFee.toLocaleString()}</Price>
            <Won>원</Won>
          </AmountPrice>
        </AmountRow>
        <AmountTotalButton>=</AmountTotalButton>
      </AmountList>
      <AmountToTalList>
        <AmountTotal>주문합계</AmountTotal>
        <AmountPrice>
          <Price>{finalTotal.toLocaleString()}</Price>
          <Won>원</Won>
        </AmountPrice>
      </AmountToTalList>
    </Amount>
  );
};

export default CartItemAmount;

const Amount = styled.div`
  padding: 30px 20px 20px 10px;
  width: 830px;
  display: flex;
  font-size: 1rem;
  border-bottom: 1px solid #BCCCDC;
  background-color: #F5F5F5;
`;

const AmountList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-left: 10px;
  min-width: 300px;
`;

const AmountRow = styled.div`
  display: flex;
  align-items: center;
  min-width: 200px;
`;

const AmountText = styled.div`
  min-width: 70px;
`;

const AmountPrice = styled.div`
  display: flex;
  align-items: center;
  min-width: 100px;
  justify-content: flex-end;
`;

const AmountPlusButton = styled.div`
  margin-right: 15px;
  font-size: 1.5rem;
`;

const AmountDeliveryText = styled.div`
  min-width: 35px;
  margin-left: 20px;
`;

const AmountTotalButton = styled.div`
  font-size: 1.5rem;
`;

const AmountToTalList = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-left: 220px;
  min-width: 180px;
`;

const AmountTotal = styled.div`
  min-width: 70px;
`;

const Price = styled.span`
  font-size: 1.4rem;
  font-weight: bold;
  text-align: right;
`;

const Won = styled.span`
  font-size: 1rem;
  margin-left: 4px;
`;
