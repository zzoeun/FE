import React from "react";
import styled from "styled-components";
import ShoppingCartIcon from "../../icons/shopping-cart.svg";

const EmptyCart = () => {
  return (
    <CartComment>
      <CartIcon>
        <img
          src={ShoppingCartIcon}
          alt="icon"
          width="150px"
          height="150px"
        />
      </CartIcon>
      <IconComment>장바구니에 담긴 상품이 없습니다</IconComment>
    </CartComment>
  );
};

export default EmptyCart;

const CartComment = styled.div`
  margin-top: 30px;
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
