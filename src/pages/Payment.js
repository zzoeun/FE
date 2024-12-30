import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ShippingInfo from "../components/payment/ShippingInfo";
import OrderItems from "../components/payment/OrderItems";
import PaymentMethod from "../components/payment/PaymentMethod";
import TotalPayment from "../components/payment/TotalPayment";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const SHIPPING_FEE = 3000;
const MIN_ORDER_AMOUNT = 30000;

// 더미 회원 정보
const dummyUserInfo = {
  name: "홍길동",
  phone: "01012345678",
  zipCode: "61245",
  mainAddress: "서울시 강남구 역삼동 123-45",
  detailsAddress: "201동 1503호",
};

const dummyCartItems = [
  {
    bookId: 9,
    title: "The Brothers Karamazov",
    price: 10,
    bookImage: "https://placehold.co/200",
    quantity: 2,
  },
  {
    bookId: 10,
    title: "Crime and Punishment",
    price: 1,
    bookImage: "https://placehold.co/200",
    quantity: 1,
  },
]; // 카트에서 가져온 상품 정보 임시 데이터

// 임시 데이터
const email = "use@example.com"; // email 임시 데이터

const Payment = () => {
  const [userInfo, setUserInfo] = useState({
    userId: "",
    email: "",
    name: "",
    phone: "",
    zipCode: "",
    mainAddress: "",
    detailsAddress: "",
  }); // 회원 정보
  const [receiverInfo, setReceiverInfo] = useState({
    userId: "",
    email: "",
    name: "",
    phone: "",
    zipCode: "",
    mainAddress: "",
    detailsAddress: "",
  }); // 직접 입력
  const [orderItems, setOrderItems] = useState([]); // 상품 정보
  const [cardNumbers, setCardNumbers] = useState(""); // 카드 번호
  const [paymentInfo, setPaymentInfo] = useState({
    totalPrice: 0, // 총 금액
    shippingFee: 0, // 배송비
  });

  const [shippingMode, setShippingMode] = useState(0); // Shipping radio - 읽기모드(0), 쓰기 모드(1)

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();

  const paymentData = location.state || {
    orderItemsData: [],
    totalPrice: 0,
    deliveryFee: 0,
    totalAmount: 0
  };
  const { orderItemsData, totalPrice, deliveryFee, totalAmount } = paymentData;

  // cart or dummyItems
  const selectCartItems = orderItemsData || [];

  // 더미 데이터를 사용하여 컴포넌트 상태 업데이트
  useEffect(() => {
    // 회원 정보 - 더미로 가지고 옴. - 삭제 후 GET API 추가하기기
    // GET 회원정보 API
    // 여기서부터
    setTimeout(() => {
      setUserInfo(dummyUserInfo);
      const newDummy = { ...dummyUserInfo };
      setReceiverInfo(newDummy);
    }, 1000); // 1초 후 더미 데이터 설정
    // 여기까지 삭제 후 복붙!

    if (selectCartItems.length > 0) {
      const filteredItems = selectCartItems.map((item) => ({
        bookId: item.bookId,
        title: item.title,
        price: item.price,
        imageUrl: item.bookImage,
        quantity: item.quantity,
      }));

      setOrderItems(filteredItems);

      // cart에서 못받아왔을 때... dummy data 총가격, 배송비
      const totalPrice = filteredItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const shippingFee = totalPrice > MIN_ORDER_AMOUNT ? 0 : SHIPPING_FEE;

      setPaymentInfo((prevInfo) => ({
        ...prevInfo,
        totalPrice,
        shippingFee,
      }));
    } else {
      setError("해당 책을 찾을 수 없습니다.");
    }

    setLoading(false);
  }, [orderItemsData]);

  // console.log("Payment-userInfo: ", userInfo);
  // console.log("Payment-receiverInfo: ", receiverInfo);
  // console.log("Payment-ItemsInfo:", orderItems);

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

  // 결제 버튼(TotalPayment.js) 쪽으로 넘기는 데이터
  const getPaymentData = () => {
    // shippingMode에 따라 수령인 정보 선택
    const recipientInfo =
      shippingMode === "0"
        ? { ...userInfo } // 회원 정보
        : { ...receiverInfo }; // 직접 입력

    const firstBookTitle =
      orderItemsData.length > 0 ? orderItemsData[0].title : "데이터 없음";
    const otherBookCount = orderItemsData.length > 1 ? orderItemsData.length - 1 : 0;

    const totalAmount = paymentInfo.totalPrice + paymentInfo.shippingFee;

    const paymentName =
      `${firstBookTitle}` +
      `${otherBookCount > 0 ? ` 외 ${otherBookCount}권` : ""}`;

    return {
      name: paymentName, // 상품 정보
      amount: totalAmount,
      userId: receiverInfo.userId,
      buyerEmail: recipientInfo.email,
      buyerName: recipientInfo.name,
      buyerPhone: recipientInfo.phone,
      cardNumbers,
      zipCode: recipientInfo.zipCode,
      mainAddress: recipientInfo.mainAddress,
      detailsAddress: receiverInfo.detailsAddress,
    };
  };

  // 결제 처리 POST
  // const handlePayment = async () => {
  //   try {
  //     // shippingMode에 따라 수령인 정보 선택
  //     const recipientInfo =
  //       shippingMode === "0"
  //         ? { ...userInfo } // 회원 정보
  //         : { ...receiverInfo }; // 직접 입력
  //     const paymentData = {
  //       email,
  //       receiverName: recipientInfo.name,
  //       receiverPhone: recipientInfo.phone,
  //       zipCode: recipientInfo.zipCode,
  //       mainAddress: receiverInfo.mainAddress,
  //       detailsAddress: receiverInfo.detailsAddress,
  //       paymentCard: cardNumbers,
  //       paymentDate: new Date().toISOString().split("T")[0], // 날짜 형식: YYYY-MM-DD
  //       paymentTime: new Date().toLocaleTimeString(), // 시간 형식: HH:MM:SS
  //       items: orderItems.map(({ book_id, quantity }) => ({
  //         book_id,
  //         quantity,
  //       })),
  //     };

  //     console.log("post: ", paymentData);

  //     const response = await axios.post("/api/payment", paymentData);
  //     alert("Payment Successful!");
  //     console.log("Payment Response: ", response.data);
  //   } catch (error) {
  //     alert("Payment Faild!");
  //     console.error("Payment Error: ", error);
  //   }
  // };

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
        <OrderItems items={orderItemsData} shippingFee={paymentInfo.shippingFee} />
        <PaymentMethod onCardNumbersChange={handleCardNumbersChange} />
      </PaymentContents>
      <PaymentAmount>
        <TotalPayment
          paymentInfo={paymentInfo}
          getPaymentData={getPaymentData}
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
    margin: 30px 30px 40px 30px;

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
