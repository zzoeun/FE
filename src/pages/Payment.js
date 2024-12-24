import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ShippingInfo from "../components/payment/ShippingInfo";
import OrderItems from "../components/payment/OrderItems";
import PaymentMethod from "../components/payment/PaymentMethod";
import TotalPayment from "../components/payment/TotalPayment";

// 임시 데이터
const email = "use@example.com"; // email 임시 데이터

const cartItems = [
  { id: "1", quantity: 2 },
  { id: "2", quantity: 1 },
]; // 카트에서 가져온 상품 정보 임시 데이터

// 더미 회원 정보
const dummyUserInfo = {
  name: "홍길동",
  phone: "01012345678",
  zip_code: "61245",
  main_address: "서울시 강남구 역삼동 123-45",
  details_address: "201동 1503호",
};

const Payment = ({ cartItems }) => {
  const [userInfo, setUserInfo] = useState(dummyUserInfo); // 회원 정보
  const [orderItems, setOrderItems] = useState([]); // 상품 정보
  const [cardNumbers, setCardNumbers] = useState(""); // 카드 번호
  const [totalAmount, setTotalAmount] = useState(0); // 총 금액
  const [shippingFee, setShippingFee] = useState(0); // 배송비

  const [shippingMode, setShippingMode] = useState(0); // Shipping radio - 읽기모드(0), 쓰기 모드(1)

  console.log("Payment-userInfo: ", userInfo);

  const onShippingModeChange = (e) => {
    setShippingMode(e.target.value);
  };

  // ShippingInfo 쓰기 모드(1)
  const handleInfoChange = (updatedInfo) => {
    setUserInfo(updatedInfo);
  };

  // 카드 번호
  const handleCardNumbersChange = (numbers) => {
    setCardNumbers(numbers);
  };

  const handlePayment = () => {};

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
          // onPayment={handlePayment}
        />
      </PaymentAmount>
    </PaymentPage>
  );
};

const PaymentPage = styled.div`
  display: flex;
  margin: 0 auto;
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
