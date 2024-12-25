import React from 'react';
import styled from 'styled-components';

const PaymentsList = () => {
  return (
    <PaymentsWrapper>
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
    </PaymentsWrapper>
  );
};

export default PaymentsList;

const PaymentsWrapper = styled.div`
  width: 1200px;
  min-width: 1200px;
  position: relative;
`;

const PaymentsListCategory = styled.div`
  width: 1200px;
  min-width: 1200px;
  height: 100px;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 100px;
  border-bottom: 2px solid gray;
  position: relative;
`;

const CategoryContent = styled.div`
  margin-left: 200px;
  white-space: nowrap;
`;

const CategoryInfo = styled.div`
  margin-right: 160px;
  margin-left: 10px;
  white-space: nowrap;
`;

const PaymentsItem = styled.div`
  width: 1200px;
  min-width: 1200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid gray;
  font-size: 1.2rem;
  margin-top: 40px;
  position: relative;
`;

const ItemInfo = styled.div`
  margin-right: 30px;
  margin-bottom: 40px;
  display: flex;
  white-space: nowrap;
`;

const ItemImage = styled.div`
  width: 100px;
  min-width: 100px;
  height: 100px;
  background-color: pink;
  margin-right: 30px;
`;

const ItemTitle = styled.div`
  white-space: nowrap;
`;

const Title = styled.div`
  margin-bottom: 50px;
  margin-top: 10px;
  white-space: nowrap;
`;

const Quantity = styled.div`
  white-space: nowrap;
`;

const ItemDeliveryPrice = styled.div`
  margin-left: 200px;
  margin-bottom: 40px;
  white-space: nowrap;
`;

const PayComplete = styled.div`
  margin-left: 200px;
  margin-bottom: 40px;
  white-space: nowrap;
`;

const Review = styled.div`
  margin-left: 220px;
  margin-bottom: 40px;
  border: 1px solid gray;
`;

const ReviewButton = styled.div`
  width: 150px;
  min-width: 150px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: lightgray;
  white-space: nowrap;
`;