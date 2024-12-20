import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import styled from 'styled-components';
import Order from '../components/Cart/Order';
import CartItemList from '../components/Cart/CartItemList';
import CartItemAmount from '../components/Cart/CartItemAmount';
import ShoppingCartIcon from '../icons/shopping-cart.svg'

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Un conte peut en",
      price: 18400,
      quantity: 1
    },
    {
      id: 2,
      title: "Un",
      price: 17900,
      quantity: 1
    },
    {
      id: 3,
      title: "Un en",
      price: 17900,
      quantity: 1
    }
  ]);
  const [selectedItems, setSelectedItems] = useState([]);

  const updateItemQuantity = (itemId, newQuantity) => {
    setCartItems(cartItems.map(item => 
      item.id === itemId 
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };
  
  const calculateTotalPrice = () => {
    return cartItems
      .filter(item => selectedItems.includes(item.id))
      .reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const calculateTotalDelivery = () => {
    return selectedItems.length > 0 ? 3000 : 0;
  };

  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map(item => item.id));
    }
  };

  const handleSelectedDelete = () => {
    if (selectedItems.length === 0) {
      alert('선택된 상품이 없습니다.');
      return;
    }
    setCartItems(cartItems.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  return (
    <Wrapper>
    <CartContainer>
      <CartTitle>장바구니</CartTitle>
      <CartContents>
        <CartContent>
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
            <CategoryButton>선택주문</CategoryButton>
            <CategoryButton onClick={handleSelectedDelete}>
                선택삭제
            </CategoryButton>
          </CartCategory>
          <CartComment>
          <CartItemList 
            items={cartItems}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            updateItemQuantity={updateItemQuantity}
          />
          <CartItemAmount 
            totalPrice={calculateTotalPrice()}
            deliveryFee={calculateTotalDelivery()}
          />
            <CartIcon>
              <img src={ShoppingCartIcon} alt="icon" width="150px" height="150px"/>  
            </CartIcon>
            <IconComment>장바구니에 담긴 상품이 없습니다</IconComment>
          </CartComment>
        </CartContent>
        <Order 
          selectedItems={selectedItems}
          totalPrice={calculateTotalPrice()}
          deliveryFee={calculateTotalDelivery()}
        />
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
  
  @media (max-width: 1200px) {
    padding: 0 50px;
  }
  
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const CartContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  min-height: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
`;

const CartContents = styled.div`
  display: flex;
  flex: 1;
  position: relative;
  
  @media (max-width: 968px) {
    flex-direction: column;
  }
`;

const CartContent = styled.div`
  width: 830px;;
  max-width: 900px;
  min-height: 660px;
  align-items: center;
  
  @media (max-width: 968px) {
    max-width: 100%;
  }
`;

const CartTitle = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  font-size: 2rem;
  text-align: left;
  border-bottom: 1px solid #BCCCDC;
  margin-top: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    height: 80px;
  }
`;

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