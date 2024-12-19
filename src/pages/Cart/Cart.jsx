import React from 'react';
import styled from 'styled-components';
import Order from './Order';
import CartItemList from './CartItemList';
import ShoppingCartIcon from '../../icons/shopping-cart.svg';

const Cart = () => {
  return (
    <Wrapper>
    <CartContainer>
      <CartTitle>장바구니</CartTitle>
      <CartContents>
        <CartContent>
          <CartCategory>
            <SelectButton>
                <input type="checkbox"/>
            </SelectButton>
            <SelectButton>전체선택</SelectButton>
            <CategoryButton>선택주문</CategoryButton>
            <CategoryButton>선택삭제</CategoryButton>
          </CartCategory>
          <CartComment>
            <CartItemList></CartItemList>
            <CartIcon>
              <img src={ShoppingCartIcon} alt="icon" width="150px" height="150px"/>  
            </CartIcon>
            <IconComment>장바구니에 담긴 상품이 없습니다</IconComment>
          </CartComment>
        </CartContent>
        <Order/>
      </CartContents>
    </CartContainer>
    </Wrapper>
  );
};

export default Cart;

const Wrapper = styled.div`
  padding: 0 120px;
  width: 100%;
  display: flex;
  justify-content: center;
  
  @media (max-width: 1200px) { // 화면이 작아질 때 패딩 조정
    padding: 0 50px;
  }
  
  @media (max-width: 768px) { // 모바일 환경
    padding: 0 20px;
  }
`;

const CartContainer = styled.div`
  width: 100%;
  max-width: 1200px; // 최대 너비 설정
  min-height: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
`;

const CartContents = styled.div`
  display: flex;
  flex: 1;
  position: relative; // 자식 요소의 sticky 포지셔닝을 위해 필요
  
  @media (max-width: 968px) {
    flex-direction: column;
  }
`;

const CartContent = styled.div`
  width: 830px;;
  max-width: 900px; // 최대 너비 설정
  min-height: 660px;
  align-items: center;
  
  @media (max-width: 968px) {
    max-width: 100%; // 화면이 작아질 때 전체 너비 사용
  }
`;

const CartTitle = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  font-size: 2rem;
  text-align: left;
  border-bottom: 1px solid gray;
  margin-top: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 2rem; // 모바일에서 글자 크기 조정
    height: 80px;
  }
`;

const CartCategory = styled.div`
  width: 830px;
  height: 60px;
  display: flex;
  padding-top: 20px;
  background-color: lightgray;
`;

const SelectButton = styled.div`
  cursor: pointer;
  font-size: 1rem;
  padding-left: 10px;
`;

const CategoryButton = styled.div`
  cursor: pointer;
  font-size: 1rem;
  margin-left: 30px;
`;

const CartComment = styled.div`
  margin-top: 50px;
  border-top: 1px solid gray;
`;

const CartIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 200px;
`;

const IconComment = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  font-size: 1.8rem;
`;