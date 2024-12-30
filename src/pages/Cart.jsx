import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Order from "../components/Cart/Order";
import CartItemList from "../components/Cart/CartItemList";
import CartItemAmount from "../components/Cart/CartItemAmount";
import ShoppingCartIcon from "../icons/shopping-cart.svg";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkToken = () => {
    const token = localStorage.getItem("bearer_token");
    if (!token) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
      return false;
    }
    return token;
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = checkToken();
      if (!token) return;
      try {
        const response = await axios.get(
          "https://project-be.site/api/mypage/getCartItems",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.data.success) {
          throw new Error("장바구니 데이터를 불러올 수 없습니다.");
        }
        const formattedItems = response.data.data.content.map((item) => ({
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
        console.error("장바구니 정보 조회 실패:", err);
        if (err.response?.status === 401) {
          alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
          localStorage.removeItem("bearer_token");
          navigate("/login");
          return;
        }
        setError("장바구니 정보를 불러오는데 실패했습니다.");
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
      await axios.put(
        "https://project-be.site/api/mypage/putCartOption",
        { cartId: itemId, quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems(
        cartItems.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (err) {
      if (err.response?.status === 401) {
        alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
        localStorage.removeItem("bearer_token");
        navigate("/login");
        return;
      }
      console.error("수량 변경 실패:", err);
      alert("수량 변경에 실패했습니다.");
    }
  };

  const handleItemDelete = async (itemId) => {
    const token = checkToken();
    if (!token) return;
    try {
      await axios.delete("https://project-be.site/api/mypage/deleteCartItems", {
        headers: { Authorization: `Bearer ${token}` },
        data: [{ cartId: itemId }], // 리스트 형태로 변경
        // data: { cartId: itemId },
      });
      setCartItems(cartItems.filter((item) => item.id !== itemId));
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } catch (err) {
      if (err.response?.status === 401) {
        alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
        localStorage.removeItem("bearer_token");
        navigate("/login");
        return;
      }
      console.error("상품 삭제 실패:", err);
      alert("상품 삭제에 실패했습니다.");
    }
  };

  const handlePayment = () => {
    if (selectedItems.length === 0) {
      alert("선택된 상품이 없습니다.");
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
    navigate("/payment", { state: paymentData });
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
    const token = checkToken();
    if (!token) return;
    if (selectedItems.length === 0) {
      alert("선택된 상품이 없습니다.");
      return;
    }
    try {
      for (const itemId of selectedItems) {
        await axios.delete(
          "https://project-be.site/api/mypage/deleteCartItems",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: [{ cartId: itemId }], // 리스트 형태로 변경
            // data: { cartId: itemId },
          }
        );
      }
      setCartItems(
        cartItems.filter((item) => !selectedItems.includes(item.id))
      );
      setSelectedItems([]);
    } catch (err) {
      if (err.response?.status === 401) {
        alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
        localStorage.removeItem("bearer_token");
        navigate("/login");
        return;
      }
      console.error("선택 삭제 실패:", err);
      alert("선택한 상품 삭제에 실패했습니다.");
    }
  };

  const handleSelectedOrder = () => {
    if (selectedItems.length === 0) {
      alert("선택된 상품이 없습니다.");
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
            {cartItems.length > 0 ? (
              <>
                <CartCategory>
                  <SelectButton>
                    <input
                      type="checkbox"
                      checked={
                        cartItems.length > 0 &&
                        selectedItems.length === cartItems.length
                      }
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
                  <img
                    src={ShoppingCartIcon}
                    alt="icon"
                    width="150px"
                    height="150px"
                  />
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
