import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Order from '../components/Cart/Order';
import CartItemList from '../components/Cart/CartItemList';
import CartItemAmount from '../components/Cart/CartItemAmount';
import ShoppingCartIcon from '../icons/shopping-cart.svg';

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

        const response = await axios.get('http://13.209.143.163:8080/api/mypage/getCartItems', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const formattedItems = response.data.cartItems.map((item) => ({
          id: item.cartId,
          bookId: item.bookId,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          image: item.bookImage,
          publisher: item.publisher,
          author: item.author,
        }));

        setCartItems(formattedItems);
      } catch (err) {
        console.error('장바구니 정보 조회 실패:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const updateItemQuantity = async (itemId, newQuantity) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'http://13.209.143.163:8080/api/mypage/putCartOption',
        {
          cartId: itemId,
          quantity: newQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCartItems(cartItems.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)));
    } catch (err) {
      console.error('수량 변경 실패:', err);
      alert('수량 변경에 실패했습니다.');
    }
  };

  const handleItemDelete = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete('http://13.209.143.163:8080/api/mypage/deleteCartItems', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { cartId: itemId },
      });

      setCartItems(cartItems.filter((item) => item.id !== itemId));
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } catch (err) {
      console.error('상품 삭제 실패:', err);
      alert('상품 삭제에 실패했습니다.');
    }
  };

  const handlePayment = () => {
    if (selectedItems.length === 0) {
      alert('선택된 상품이 없습니다.');
      return;
    }

    const selectedProducts = cartItems
      .filter((item) => selectedItems.includes(item.id))
      .map((item) => ({
        cartId: item.id,
        bookId: item.bookId,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        totalPrice: item.price * item.quantity,
        image: item.image,
        publisher: item.publisher,
        author: item.author,
      }));

    const paymentData = {
      orderItems: selectedProducts,
      totalPrice: calculateTotalPrice(),
      deliveryFee: calculateTotalDelivery(),
      totalAmount: calculateTotalPrice() + calculateTotalDelivery(),
    };

    navigate('/payment', { state: paymentData });
  };

  const calculateTotalPrice = () => {
    return cartItems
      .filter((item) => selectedItems.includes(item.id))
      .reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTotalDelivery = () => {
    return selectedItems.length > 0 ? 3000 : 0;
  };

  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.id));
    }
  };

  const handleSelectedDelete = async () => {
    if (selectedItems.length === 0) {
      alert('선택된 상품이 없습니다.');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      for (const itemId of selectedItems) {
        await axios.delete('http://13.209.143.163:8080/api/mypage/deleteCartItems', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { cartId: itemId },
        });
      }

      setCartItems(cartItems.filter((item) => !selectedItems.includes(item.id)));
      setSelectedItems([]);
    } catch (err) {
      console.error('선택 삭제 실패:', err);
      alert('선택한 상품 삭제에 실패했습니다.');
    }
  };

  const handleSelectedOrder = () => {
    if (selectedItems.length === 0) {
      alert('선택된 상품이 없습니다.');
      return;
    }
    handlePayment();
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
                  type='checkbox'
                  checked={cartItems.length > 0 && selectedItems.length === cartItems.length}
                  onChange={handleSelectAll}
                />
              </SelectButton>
              <SelectButton onClick={handleSelectAll}>전체선택</SelectButton>
              <CategoryButton>선택주문</CategoryButton>
              <CategoryButton onClick={handleSelectedDelete}>선택삭제</CategoryButton>
            </CartCategory>
            <CartComment>
              <CartItemList
                items={cartItems}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                updateItemQuantity={updateItemQuantity}
                onItemDelete={handleItemDelete}
              />
              <CartItemAmount totalPrice={calculateTotalPrice()} deliveryFee={calculateTotalDelivery()} />
              <CartIcon>
                <img src={ShoppingCartIcon} alt='icon' width='150px' height='150px' />
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
  margin-top: 302px;
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
  width: 830px;
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
  border-bottom: 1px solid #bcccdc;
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
  background-color: #f5f5f5;
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
