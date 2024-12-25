import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ShippingInfo from "../components/payment/ShippingInfo";
import OrderItems from "../components/payment/OrderItems";
import PaymentMethod from "../components/payment/PaymentMethod";
import TotalPayment from "../components/payment/TotalPayment";
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
  { bookId: 1, quantity: 2 },
  { bookId: 12, quantity: 1 },
  { bookId: 19, quantity: 3 },
]; // 카트에서 가져온 상품 정보 임시 데이터

// 임시 데이터
const email = "use@example.com"; // email 임시 데이터

const Payment = ({ cartItems = null }) => {
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
  const [paymentInfo, setPaymentInfo] = useState({
    totalAmount: 0, // 총 금액
    shippingFee: 0, // 배송비
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [shippingMode, setShippingMode] = useState(0); // Shipping radio - 읽기모드(0), 쓰기 모드(1)

  // 더미 데이터를 사용하여 컴포넌트 상태 업데이트
  useEffect(() => {
    // 회원 정보 - 더미로 가지고 옴.
    setTimeout(() => {
      setUserInfo(dummyUserInfo);
      const newDummy = { ...dummyUserInfo };
      setReceiverInfo(newDummy);
    }, 1000); // 1초 후 더미 데이터 설정

    const fetchItemData = async () => {
      try {
        const response = await axios.get("/data.json");
        const allBooks = response.data;

        // cartItems가 없으면 dummyCartItems 사용
        const selectCartItems = cartItems || dummyCartItems;

        // 특정 id 필터링
        const paymentItemInfo = selectCartItems
          .map((cartItem) => {
            const bookData = allBooks.find(
              (book) => book.book_id === cartItem.bookId
            );
            if (bookData) {
              return { ...bookData, quantity: cartItem.quantity };
            } else {
              return null;
            }
          })
          .filter(Boolean); // null 제거

        //
        if (paymentItemInfo.length > 0) {
          setOrderItems(paymentItemInfo);

          // 총 결제 금액 계산 (상품 총합 + 배송비)
          const totalAmount = paymentItemInfo.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );
          const shippingFee = totalAmount > MIN_ORDER_AMOUNT ? 0 : SHIPPING_FEE; // 배송비
          setPaymentInfo((prevInfo) => ({
            ...prevInfo,
            totalAmount,
            shippingFee,
          }));
        } else {
          setError("해당 책을 찾을 수 없습니다.");
        }
      } catch (err) {
        setError("데이터를 가져오는 데 실패하였습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchItemData();
  }, [cartItems]);

  console.log("Payment-userInfo: ", userInfo);
  console.log("Payment-receiverInfo: ", receiverInfo);
  console.log("Payment-ItemsInfo:", orderItems);

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
      // shippingMode에 따라 수령인 정보 선택
      const recipientInfo =
        shippingMode === "0"
          ? { ...userInfo } // 회원 정보
          : { ...receiverInfo }; // 직접 입력
      const paymentData = {
        email,
        receiverName: recipientInfo.name,
        receiverPhone: recipientInfo.phone,
        zipCode: recipientInfo.zipCode,
        mainAddress: receiverInfo.mainAddress,
        detailsAddress: receiverInfo.detailsAddress,
        paymentCard: cardNumbers,
        paymentDate: new Date().toISOString().split("T")[0], // 날짜 형식: YYYY-MM-DD
        paymentTime: new Date().toLocaleTimeString(), // 시간 형식: HH:MM:SS
        items: orderItems.map(({ book_id, quantity }) => ({
          book_id,
          quantity,
        })),
      };

      console.log("post: ", paymentData);

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
        <OrderItems items={orderItems} shippingFee={paymentInfo.shippingFee} />
        <PaymentMethod onCardNumbersChange={handleCardNumbersChange} />
      </PaymentContents>
      <PaymentAmount>
        <TotalPayment paymentInfo={paymentInfo} onPayment={handlePayment} />
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
