// api.js (더미 데이터 포함)
import axios from "axios";

// 더미 회원 정보
const dummyUserInfo = {
  name: "홍길동",
  address: "서울시 강남구 역삼동 123-45",
  phone: "010-1234-5678",
};

// 더미 상품 정보
const dummyOrderItems = [
  {
    id: 1,
    image: "https://via.placeholder.com/150",
    name: "React 입문서",
    price: 20000,
    quantity: 2,
  },
  {
    id: 2,
    image: "https://via.placeholder.com/150",
    name: "JavaScript 고급서",
    price: 30000,
    quantity: 1,
  },
];

// 더미 결제 정보
const dummyPaymentResponse = {
  success: true,
  message: "결제가 성공적으로 처리되었습니다.",
};

// 서버와의 실제 통신 없이 더미 데이터를 반환하도록 설정
export const fetchUserInfo = async (email) => {
  // 이메일을 사용하여 더미 회원 정보 반환 (여기서는 이메일로 구별하지 않음)
  return new Promise((resolve) => {
    setTimeout(() => resolve(dummyUserInfo), 500); // 500ms 후 더미 데이터 반환
  });
};

export const fetchOrderItems = async (items) => {
  // 상품 id를 기반으로 더미 상품 정보 반환
  const itemIds = items.map((item) => item.id);
  const filteredItems = dummyOrderItems.filter((item) =>
    itemIds.includes(item.id)
  );
  return new Promise((resolve) => {
    setTimeout(() => resolve(filteredItems), 500); // 500ms 후 더미 상품 정보 반환
  });
};

export const sendPayment = async (payload) => {
  // 결제 요청 후 더미 결제 응답 반환
  return new Promise((resolve) => {
    setTimeout(() => resolve(dummyPaymentResponse), 500); // 500ms 후 결제 성공 응답 반환
  });
};
