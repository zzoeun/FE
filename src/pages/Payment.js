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
  zipCode: "61245",
  mainAddress: "서울시 강남구 역삼동 123-45",
  detailsAddress: "201동 1503호",
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
  const [receiverInfo, setReceiverInfo] = useState({
    name: "",
    phone: "",
    zipCode: "",
    mainAddress: "",
    detailsAddress: "",
  }); // 직접 입력
  const [orderItems, setOrderItems] = useState([]); // 상품 정보
  const [cardNumbers, setCardNumbers] = useState(""); // 카드 번호
  const [totalAmount, setTotalAmount] = useState(0); // 총 금액
  const [shippingFee, setShippingFee] = useState(0); // 배송비

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [shippingMode, setShippingMode] = useState(0); // Shipping radio - 읽기모드(0), 쓰기 모드(1)

  // 더미 데이터를 사용하여 컴포넌트 상태 업데이트
  useEffect(() => {
    setTimeout(() => {
      setUserInfo(dummyUserInfo);
      const newDummy = { ...dummyUserInfo };
      setReceiverInfo(newDummy);

      // 더미 상품 정보
      const dummyOrderItems = [
        { id: "1", name: "책 A", price: 10000, quantity: 2 },
        { id: "2", name: "책 B", price: 15000, quantity: 1 },
      ];
      setOrderItems(dummyOrderItems);

      // 총 결제 금액 계산 (상품 총합 + 배송비)
      const dummyTotalAmount = dummyOrderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const dummyShippingFee = 3000; // 임의 배송비
      setTotalAmount(dummyTotalAmount + dummyShippingFee);
      setShippingFee(dummyShippingFee);

      setLoading(false); // 로딩 상태 해제
    }, 1000); // 1초 후 더미 데이터 설정
  }, []);

  console.log("Payment-userInfo: ", userInfo);
  console.log("Payment-receiverInfo: ", receiverInfo);

  // Shipping 회원정보(0), 쓰기모드(1)
  const onShippingModeChange = (e) => {
    setShippingMode(e.target.value);
  };

  // ShippingInfo 쓰기 모드(1) 상태
  const handleInfoChange = (updatedInfo) => {
    setReceiverInfo(updatedInfo);
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
          receiverInfo={receiverInfo}
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
