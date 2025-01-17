import React from "react";
import styled from "styled-components";

const CartActions = ({ 
  handleSelectAll, 
  handleSelectedOrder, 
  handleSelectedDelete, 
  selectedItems, 
  cartItems 
}) => {

  return (
    <CartCategory>
      <SelectButton>
        <input
          type="checkbox"
          checked={cartItems.length > 0 && selectedItems.length === cartItems.length}
          onChange={handleSelectAll}
        />
      </SelectButton>
      <SelectButton onClick={handleSelectAll}>
        전체선택
      </SelectButton>
      <CategoryButton onClick={handleSelectedOrder}>
        선택주문
      </CategoryButton>
      <CategoryButton onClick={handleSelectedDelete}>
        선택삭제
      </CategoryButton>
    </CartCategory>
  );
};

export default CartActions;

const CartCategory = styled.div`
  width: 830px;
  height: 60px;
  display: flex;
  padding-top: 20px;
  background-color: #F5F5F5;
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
