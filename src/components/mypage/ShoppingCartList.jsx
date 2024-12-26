import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CartItemList from '../Cart/CartItemList';
import styled from 'styled-components';

const ShoppingCartList = () => {
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

        const response = await axios.get('http://13.209.143.163:8080/api/mypage/getCartItems', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const formattedItems = response.data.cartItems.map(item => ({
          id: item.cartId,
          bookId: item.bookId,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          image: item.bookImage,
          publisher: item.publisher,
          author: item.author
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
      await axios.put('http://13.209.143.163:8080/api/mypage/putCartOption', 
        { 
          cartId: itemId, 
          quantity: newQuantity 
        },
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

  const handleItemDelete = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete('http://13.209.143.163:8080/api/mypage/deleteCartItems', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: { cartId: itemId }
      });

      setCartItems(cartItems.filter(item => item.id !== itemId));
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } catch (err) {
      console.error('Error deleting item:', err);
      alert('상품 삭제에 실패했습니다.');
    }
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container>
      {cartItems && cartItems.length > 0 ? (
        <CartItemList 
          items={cartItems}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          updateItemQuantity={updateItemQuantity}
          onItemDelete={handleItemDelete}
        />
      ) : (
        <EmptyMessage>장바구니가 비어있습니다.</EmptyMessage>
      )}
    </Container>
  );
};

export default ShoppingCartList;

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const EmptyMessage = styled.p`
  text-align: center;
  padding: 20px;
  color: #666;
`;