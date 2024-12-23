import axios from "axios"; // axios를 불러옵니다. (서버와 통신할 때 사용)

export const fetchUserInfo = async (email) => {
  // 회원 정보를 가져오는 API 함수
  const response = await axios.get(`/api/user?email=${email}`);
  return response.data; // 서버에서 가져온 데이터를 반환
};

export const fetchOrderItems = async (items) => {
  // 상품 정보를 가져오는 API 함수
  const response = await axios.post("/api/order/items", { items });
  return response.data; // 서버에서 가져온 데이터를 반환
};

export const sendPayment = async (payload) => {
  // 결제를 처리하는 API 함수
  const response = await axios.post("/api/payment", payload);
  return response.data; // 서버에서 처리된 결과를 반환
};
