import React from 'react';
import styled from 'styled-components';
import Payments from './Payments';
import CartItemList from './CartItemList';
import ShoppingCartIcon from '../../icons/shopping-cart.svg';

const Cart = () => {
  return (
    <CartContainer>
      <CartTitle>장바구니</CartTitle>
      <CartContents>
        <CartContent>
          <CartCategory>
            <CategoryButton>
              <SelectButton>
                <input
                  type="checkbox"
                />
                전체선택
              </SelectButton>
            </CategoryButton>
            <CategoryButton>선택주문</CategoryButton>
            <CategoryButton>선택삭제</CategoryButton>
          </CartCategory>
          <CartItemList></CartItemList>
          <CartComment>
            <CartIcon>
              <img src={ShoppingCartIcon} alt="icon" width="150px" height="150px"/>  
            </CartIcon>
            <IconComment>장바구니에 담긴 상품이 없습니다</IconComment>
          </CartComment>
        </CartContent>
        <Payments/>
      </CartContents>
    </CartContainer>
  );
};

export default Cart;

const CartContainer = styled.div`
  width: 1550px;
  height: 760px;
  margin: 0 auto;
  display: flex; 
  flex-direction: column;
  justify-content: center;
`;

const CartTitle = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  font-size: 2.5rem;
  text-align: left;
  border-bottom: 1px solid gray;
`;

const CartContents = styled.div`
  display: flex;
`;
const CartContent = styled.div`
  width: 830px;
  heigth: 660px;
  align-items: center;
  padding-top: 30px;
`; 

const CartCategory = styled.div`
  display: flex;
`;

const CategoryButton = styled.div`
  cursor: pointer;
  font-size: 1.2rem;
  margin-left: 30px;
`;

const SelectButton = styled.div`

`;

const CartComment = styled.div`
  margin-top: 100px;
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