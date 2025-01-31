import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Order from "../Cart/Order";
import CartItemList from "../Cart/CartItemList";
import CartItemAmount from "../Cart/CartItemAmount";
import CartActions from "../Cart/CartActions";
import EmptyCart from "../Cart/EmptyCart";
import Sidebar from "./Sidebar"

const CartPage = () => {
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
      // API 문서와 동일한 형식으로 요청
      const response = await axios.put(
        "https://project-be.site/api/mypage/putCartOption",
        {
          cartId: Number(itemId),    // 숫자로 변환
          quantity: Number(newQuantity)  // 숫자로 변환
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
  
      // 응답 로깅
      console.log("Update quantity response:", {
        status: response.status,
        data: response.data
      });
  
      if (response.data.success) {
        setCartItems(
          cartItems.map((item) =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          )
        );
      } else {
        throw new Error(response.data.message || "수량 변경에 실패했습니다.");
      }
    } catch (err) {
      console.error("Update quantity error:", {
        request: {
          cartId: itemId,
          quantity: newQuantity
        },
        response: err.response?.data,
        status: err.response?.status
      });
  
      if (err.response?.status === 400) {
        alert(err.response.data.message || "잘못된 요청입니다. 수량을 확인해주세요.");
      } else if (err.response?.status === 401) {
        alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
        localStorage.removeItem("bearer_token");
        navigate("/login");
      } else {
        alert("수량 변경에 실패했습니다.");
      }
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
      orderItemsData: selectedProducts,
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
      <Sidebar />
      <CartContainer>
        <PageTitle>내 장바구니</PageTitle>
        <CartContents>
          <CartContent>
            {cartItems.length > 0 ? (
              <>
                <CartActions
                  handleSelectAll={handleSelectAll}
                  handleSelectedOrder={handleSelectedOrder}
                  handleSelectedDelete={handleSelectedDelete}
                  selectedItems={selectedItems}
                  cartItems={cartItems}
                />
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
              <EmptyCart/>
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
export default CartPage;

const Wrapper = styled.div`
  margin-top: 302px;
  display: flex;
`;

const CartContainer = styled.div`
  width: 100%;
  max-width: 1300px;
  min-height: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 25px 0;
  padding-left: 30px;
  flex: 1;
  position: relative;
`;

const CartContents = styled.div`
  display: flex;
  flex: 1;
  position: relative;
`;

const CartContent = styled.div`
  width: 830px;
  max-width: 900px;
  min-height: 660px;
  align-items: center;
`;

const PageTitle = styled.h1`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  font-size: 2rem;
  text-align: left;
  border-bottom: 1px solid gray;
  margin-top: 0 auto;
`;