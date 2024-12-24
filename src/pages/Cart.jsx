import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Order from '../components/Cart/Order';
import CartItemList from '../components/Cart/CartItemList';
import CartItemAmount from '../components/Cart/CartItemAmount';
import ShoppingCartIcon from '../icons/shopping-cart.svg'

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setIsLoading(false);
          return;
        }

        const response = await axios.get('/api/cart', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const formattedItems = response.data.map(item => ({
          id: item.cart_id,
          bookId: item.book_id,
          title: item.book_title,
          price: item.book_price,
          quantity: item.quantity
        }));

        setCartItems(formattedItems);
      } catch (err) {
        setError('장바구니 정보를 불러오는데 실패했습니다.');
        console.error('Error fetching cart items:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const updateItemQuantity = async (itemId, newQuantity) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/cart/${itemId}`, 
        { quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setCartItems(cartItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    } catch (err) {
      console.error('Error updating quantity:', err);
      alert('수량 변경에 실패했습니다.');
    }
  };

  const handleSelectedDelete = async () => {
    if (selectedItems.length === 0) {
      alert('선택된 상품이 없습니다.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await Promise.all(
        selectedItems.map(itemId =>
          axios.delete(`/api/cart/${itemId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        )
      );

      setCartItems(cartItems.filter(item => !selectedItems.includes(item.id)));
      setSelectedItems([]);
    } catch (err) {
      console.error('Error deleting items:', err);
      alert('상품 삭제에 실패했습니다.');
    }
  };

  const handleItemDelete = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/cart/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setCartItems(cartItems.filter(item => item.id !== itemId));
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } catch (err) {
      console.error('Error deleting item:', err);
      alert('상품 삭제에 실패했습니다.');
    }
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  const handlePayment = () => {
    if (selectedItems.length === 0) {
      alert('선택된 상품이 없습니다.');
      return;
    }

    const paymentData = {
      items: cartItems.filter(item => selectedItems.includes(item.id)),
      totalPrice: calculateTotalPrice(),
      deliveryFee: calculateTotalDelivery(),
      totalAmount: calculateTotalPrice() + calculateTotalDelivery()
    };

    navigate('/payment', { state: paymentData });
  };


  // const updateItemQuantity = (itemId, newQuantity) => {
  //   setCartItems(cartItems.map(item => 
  //     item.id === itemId 
  //       ? { ...item, quantity: newQuantity }
  //       : item
  //   ));
  // };
  
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

  // const handleSelectedDelete = () => {
  //   if (selectedItems.length === 0) {
  //     alert('선택된 상품이 없습니다.');
  //     return;
  //   }
  //   setCartItems(cartItems.filter(item => !selectedItems.includes(item.id)));
  //   setSelectedItems([]);
  // };

  // const handleItemDelete = (itemId) => {
  //   setCartItems(cartItems.filter(item => item.id !== itemId));
  //   setSelectedItems(selectedItems.filter(id => id !== itemId));
  // };

  return (
    <Wrapper>
    <CartContainer>
      <CartTitle>장바구니</CartTitle>
      <CartContents>
      <CartContent>
            {cartItems.length > 0 ? (
              <>
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
                <CartItemList 
                  items={cartItems}
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                  updateItemQuantity={updateItemQuantity}
                  onItemDelete={handleItemDelete}
                />
                <CartItemAmount 
                  totalPrice={calculateTotalPrice()}
                  deliveryFee={calculateTotalDelivery()}
                />
              </>
            ) : (
              <CartComment>
                <CartIcon>
                  <img src={ShoppingCartIcon} alt="icon" width="150px" height="150px"/>  
                </CartIcon>
                <IconComment>장바구니에 담긴 상품이 없습니다</IconComment>
              </CartComment>
            )}
          </CartContent>
        <Order 
          selectedItems={selectedItems}
          totalPrice={calculateTotalPrice()}
          deliveryFee={calculateTotalDelivery()}
          onPaymentClick={handlePayment}
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