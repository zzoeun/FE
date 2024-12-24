import React from 'react';
import styled from 'styled-components';

const Order = ({ selectedItems, totalPrice, deliveryFee, onPaymentClick  }) => {
  const finalTotal = totalPrice + deliveryFee;

  // const handleOrder = () => {
  //   if (selectedItems.length === 0) return;
  //   navigate('/payment', { 
  //     state: { 
  //       // selectedItems,
  //       // totalPrice,
  //       // deliveryFee,
  //       // finalTotal
  //     } 
  //   });
  // };


  return (
    <div>
      <OrderContainer>
        <OrderTitle>장바구니 합계</OrderTitle>
        <OrderPrice>
          <div>상품금액</div>
          <div>{totalPrice.toLocaleString()} 원</div>
        </OrderPrice>
        <OrderDeliveryPrice>
          <div>배송비</div>
          <div>{deliveryFee.toLocaleString()} 원</div>
        </OrderDeliveryPrice>
        <OrderTotal>
          <div>선택 합계</div>
          <TotalPrice>
            <Price>{finalTotal.toLocaleString()}</Price>
            <Won>원</Won>
          </TotalPrice>
        </OrderTotal>
        <OrderButton 
          disabled={selectedItems.length === 0}
          isEmpty={selectedItems.length === 0}
          onClick={onPaymentClick}
        >
          주문하기
        </OrderButton>
      </OrderContainer>
    </div>
  );
};

export default Order;


const OrderContainer = styled.div`
  width: 300px;
  heigth: 660px;
  border-left: 1px solid #BCCCDC;
  margin-left: 30px;
  position: sticky;
  top: 20px; 
  align-self: flex-start;
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
  cursor: ${props => props.isEmpty ? 'not-allowed' : 'pointer'};
  margin-top: 75px;
  margin-left: 30px;
  background-color: ${props => props.isEmpty ? 'lightgray' : '#F5F5F5'};
  padding: 20px;
  opacity: ${props => props.isEmpty ? 0.7 : 1};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.isEmpty ? 'lightgray' : '#EBEBEB'};
  }
`;