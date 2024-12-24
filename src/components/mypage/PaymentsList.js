import React from 'react';
import styled from 'styled-components';

const PaymentsList = () => {
  return (
    <div>
      <PaymentsListCategory>
        <CategoryInfo>상품정보</CategoryInfo>
        <CategoryContent>배송비</CategoryContent>
        <CategoryContent>진행상태</CategoryContent>
        <CategoryContent>구매확정 및 리뷰</CategoryContent>
      </PaymentsListCategory>
      <PaymentsItem>
        <ItemInfo>
          <ItemImage></ItemImage>
          <ItemTitle>
            <Title>나는 책이다</Title>
            <Quantity>2</Quantity>
          </ItemTitle>
        </ItemInfo>
        <ItemDeliveryPrice>3000원</ItemDeliveryPrice>
        <PayComplete>결제완료</PayComplete>
        <Review>
          <ReviewButton>리뷰작성</ReviewButton>
        </Review>
      </PaymentsItem>
    </div>
  );
};

export default PaymentsList;

const PaymentsListCategory = styled.div`
  width: 100%;
  height: 100px;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 100px;
  border-bottom: 2px solid gray;
`;

const CategoryContent = styled.div`
  margin-left: 200px;
`;

const CategoryInfo = styled.div`
  margin-right: 160px;
  margin-left: 10px;
`;

const PaymentsItem = styled.div`
  width: 100%
  heigth: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid gray;
  font-size: 1.2rem;
  margin-top: 40px;
`;

const ItemInfo = styled.div`
  margin-right: 30px;
  margin-bottom: 40px;
  display: flex;
`;

const ItemImage = styled.div`
  width: 100px;
  height: 100px;
  background-color: pink;
  margin-right: 30px
`;

const ItemTitle = styled.div`
`;

const Title = styled.div`
  margin-bottom: 50px;
  margin-top: 10px;
`;

const Quantity = styled.div``;

const ItemDeliveryPrice = styled.div`
  margin-left: 200px;
  margin-bottom: 40px;
`;

const PayComplete = styled.div`
  margin-left: 200px;
  margin-bottom: 40px;
`;

const Review = styled.div`
  margin-left: 220px;
  margin-bottom: 40px;
  border: 1px solid gray;
`;

const ReviewButton = styled.div`
  width: 150px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: lightgray;
`;
