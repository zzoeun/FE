import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ShippingInfo from "../components/payment/ShippingInfo";
import OrderItems from "../components/payment/OrderItems";
import PaymentMethod from "../components/payment/PaymentMethod";
import TotalPayment from "../components/payment/TotalPayment";
import axios from "axios";

// 더미 회원 정보
const dummyUserInfo = {
  name: "홍길동",
  phone: "01012345678",
  zip_code: "61245",
  main_address: "서울시 강남구 역삼동 123-45",
  details_address: "201동 1503호",
};

// 임시 데이터
const email = "use@example.com"; // email 임시 데이터

const cartItems = [
  { id: "1", quantity: 2 },
  { id: "2", quantity: 1 },
]; // 카트에서 가져온 상품 정보 임시 데이터

// { cartItems }
const Payment = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
    zipCode: "",
    mainAddress: "",
    detailsAddress: "",
  }); // 회원 정보
  const [orderItems, setOrderItems] = useState([]); // 상품 정보
  const [cardNumbers, setCardNumbers] = useState(""); // 카드 번호
  const [totalAmount, setTotalAmount] = useState(0); // 총 금액
  const [shippingFee, setShippingFee] = useState(0); // 배송비

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [shippingMode, setShippingMode] = useState(0); // Shipping radio - 읽기모드(0), 쓰기 모드(1)

  // GET
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. 사용자 정보 가져오기
        const userResponse = await axios.get(`/api/user?email=${email}`);
        setUserInfo({
          name: userResponse.data.name,
          phone: userResponse.data.phone,
          zipCode: userResponse.data.zipCode,
          mainAddress: userResponse.data.mainAddress,
          detailsAddress: userResponse.data.detailsAddress,
        });

        // 2. 상품 정보 가져오기
        const itemIds = cartItems.map((bookId) => bookId.id).join(",");
        const ProductResponse = await axios.get(`/api/products?ids=${itemIds}`);
        const productsWithQuantity = ProductResponse.data.map((product) => {
          const quantity = cartItems.find(
            (item) => item.id === product.id
          ).quantity;
          return { ...product, quantity };
        });

        setOrderItems(productsWithQuantity);

        setLoading(false);
      } catch (error) {
        setError("데이터를 가지고 오는 것을 실패하셨습니다.");
        setLoading(false);
      }
    };

    fetchData();
  }, [cartItems, email]);

  console.log("Payment-userInfo: ", userInfo);

  // Shipping 회원정보(0), 쓰기모드(1)
  const onShippingModeChange = (e) => {
    setShippingMode(e.target.value);
  };

  // ShippingInfo 쓰기 모드(1) 상태
  const handleInfoChange = (updatedInfo) => {
    setUserInfo(updatedInfo);
  };

  // 카드 번호
  const handleCardNumbersChange = (numbers) => {
    setCardNumbers(numbers);
  };

  // 결제 처리 POST
  const handlePayment = async () => {
    try {
      const paymentData = {
        email,
        recipientName: userInfo.name,
        recipientPhone: userInfo.phone,
        recipientAddress: userInfo.address,
        paymentDate: new Date().toISOString().split("T")[0], // 날짜 형식: YYYY-MM-DD
        paymentTime: new Date().toLocaleTimeString(), // 시간 형식: HH:MM:SS
        items: orderItems.map(({ id, quantity }) => ({ id, quantity })),
      };

      const response = await axios.post("/api/payment", paymentData);
      alert("Payment Successful!");
      console.log("Payment Response: ", response.data);
    } catch (error) {
      alert("Payment Faild!");
      console.error("Payment Error: ", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <PaymentPage>
      <PaymentContents>
        <h2>주문 및 결제</h2>
        <ShippingInfo
          userInfo={userInfo}
          shippingMode={shippingMode}
          onShippingModeChange={onShippingModeChange}
          onInfoChange={handleInfoChange}
        />
        <OrderItems items={orderItems} />
        <PaymentMethod onCardNumbersChange={handleCardNumbersChange} />
      </PaymentContents>
      <PaymentAmount>
        <TotalPayment
          totalAmount={totalAmount}
          shippingFee={shippingFee}
          onPayment={handlePayment}
        />
      </PaymentAmount>
    </PaymentPage>
  );
};

const PaymentPage = styled.div`
  display: flex;
  margin: 0 auto;
  margin-top: 302px;
  justify-content: center;
  width: 1200px;

  h2 {
    // margin-bottom: 15px;
    margin: 20px 30px 40px 30px;
    font-size: 30px;
    font-weight: bold;
  }
`;

const PaymentContents = styled.div`
  margin: 30px 10px 30px 0;
  width: 1500px;
  border: 1.5px solid #e0e0e0;
`;

const PaymentAmount = styled.div`
  float: right;
`;

export default Payment;
