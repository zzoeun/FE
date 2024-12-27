import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CartItemList from '../Cart/CartItemList';
import styled from 'styled-components';

const ShoppingCartList = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkToken = () => {
    const token = localStorage.getItem('Bearer token');
    if (!token) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
      return false;
    }
    return token;
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = checkToken();
      if (!token) return;

      try {
        const response = await axios.get('https://project-be.site/api/mypage/getCartItems', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.data || !response.data.cartItems) {
          throw new Error('장바구니 데이터를 불러올 수 없습니다.');
        }

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
        console.error('장바구니 정보 조회 실패:', err);
        if (err.response?.status === 401) {
          alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
          localStorage.removeItem('Bearer token');
          navigate('/login');
          return;
        }
        setError('장바구니 정보를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, [navigate]);

  const updateItemQuantity = async (itemId, newQuantity) => {
    const token = checkToken();
    if (!token) return;

    try {
      await axios.put('https://project-be.site/api/mypage/putCartOption', 
        { cartId: itemId, quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` }}
      );

      setCartItems(cartItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    } catch (err) {
      if (err.response?.status === 401) {
        alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
        localStorage.removeItem('Bearer token');
        navigate('/login');
        return;
      }
      console.error('수량 변경 실패:', err);
      alert('수량 변경에 실패했습니다.');
    }
  };

  const handleItemDelete = async (itemId) => {
    const token = checkToken();
    if (!token) return;

    try {
      await axios.delete('https://project-be.site/api/mypage/deleteCartItems', {
        headers: { Authorization: `Bearer ${token}` },
        data: { cartId: itemId }
      });

      setCartItems(cartItems.filter(item => item.id !== itemId));
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } catch (err) {
      if (err.response?.status === 401) {
        alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
        localStorage.removeItem('Bearer token');
        navigate('/login');
        return;
      }
      console.error('상품 삭제 실패:', err);
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