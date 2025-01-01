import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookDetail = ({ bookId }) => {
  const [bookData, setBookData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("bearer_token");

  //도서 데이터 가져오기
  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(
          `https://project-be.site/books/${bookId}`
        );
        setBookData(response.data);
      } catch (err) {
        console.error("도서 데이터 로드 실패:", err.message);
        setError("도서 데이터를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();
  }, [bookId]);

  // 상품 수량 조절
  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleQuantityChange = (e) => {
    const value = Math.max(1, Number(e.target.value)); // 최소값 1
    setQuantity(value);
  };

  //userid 가져오기
  const fetchUserId = async () => {
    if (!token) {
      alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
      navigate("/login");
      return null;
    }

    try {
      const response = await axios.get(
        "https://project-be.site/api/mypage/getUserInfo",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const userId = response.data.data.userId; // userId 가져오기
      return userId; // userId 반환
    } catch (err) {
      if (err.response?.status === 401) {
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        navigate("/login"); // 로그인 페이지로 이동
      } else {
        console.error(
          "유저 정보 가져오기 실패:",
          err.response?.data || err.message
        );
      }
      throw err;
    }
  };

  // 장바구니 추가 apia
  const handleAddToCart = async () => {
    if (quantity > bookData.stock) {
      alert("선택한 수량이 재고를 초과합니다. 수량을 조정해주세요.");
      return;
    }

    const userId = await fetchUserId(); // userId 가져오기
    if (!userId) return;

    axios
      .post(
        "https://project-be.site/cart/add",
        {
          userId: userId,
          bookId: bookData.bookId,
          quantity,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        alert(
          `"${bookData.bookTitle}" ${quantity}개가 장바구니에 추가되었습니다.`
        );
        navigate("/cart"); // 장바구니 페이지로 이동
      })
      .catch((err) => {
        console.error("장바구니 추가 실패:", err.message);
        alert("장바구니에 추가할 수 없습니다. 다시 시도해주세요.");
      });
  };

  // 결제 추가 api
  const handlePayment = () => {
    if (quantity > bookData.stock) {
      alert("선택한 수량이 재고를 초과합니다. 수량을 조정해주세요.");
      return;
    }

    if (!token) {
      alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
      navigate("/login");
      return;
    }

    // 결제 데이터 준비
    const paymentData = {
      orderItemsData: [
        {
          bookId: bookData.bookId,
          title: bookData.bookTitle,
          price: bookData.bookPrice,
          quantity,
          totalPrice: bookData.bookPrice * quantity,
          image: bookData.bookImageUrl,
          publisher: bookData.publisher,
          author: bookData.author,
        },
      ],
      totalPrice: bookData.bookPrice * quantity,
      deliveryFee: 0,
      totalAmount: bookData.bookPrice * quantity,
    };

    console.log("Navigate 호출 준비 완료");
    navigate("/payment", { state: paymentData });
    console.log("Navigate 호출 완료");
  };

  if (loading) return <Loading>로딩 중...</Loading>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <Container>
      <ContentWrapper>
        <ImageWrapper>
          <BookImage src={bookData.bookImageUrl} alt={bookData.bookTitle} />
        </ImageWrapper>
        <InfoWrapper>
          <Title>{bookData.bookTitle}</Title>
          <Author>저자: {bookData.author}</Author>
          <Publisher>출판사: {bookData.publisher}</Publisher>
          <Price>가격: {bookData.bookPrice.toLocaleString()}원</Price>
          <Amount>재고 수량: {bookData.stock}</Amount>
          <QuantityWrapper>
            <button onClick={handleDecrease}>-</button>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              style={{
                width: "50px",
                textAlign: "center",
                margin: "0 10px",
              }}
            />
            <button onClick={handleIncrease}>+</button>
          </QuantityWrapper>
          <TotalPrice>
            총 가격: {(bookData.bookPrice * quantity).toLocaleString()}원
          </TotalPrice>
          <ButtonWrapper>
            <Button onClick={handleAddToCart}>장바구니에 담기</Button>
            <Button primary onClick={handlePayment}>
              구매하기
            </Button>
          </ButtonWrapper>
        </InfoWrapper>
      </ContentWrapper>
      <SummaryWrapper>
        <SummaryTitle>도서 소개</SummaryTitle>
        <Summary>{bookData.bookSummary}</Summary>
      </SummaryWrapper>
    </Container>
  );
};

export default BookDetail;

const Container = styled.div`
  padding-top: 300px;
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  gap: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BookImage = styled.img`
  width: 100%;
  max-width: 300px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const InfoWrapper = styled.div`
  padding-top: 15px;
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #333;
`;

const Author = styled.p`
  font-size: 18px;
  color: #555;
`;

const Publisher = styled.p`
  font-size: 18px;
  color: #555;
`;

const Price = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: rgb(0, 0, 0);
`;

const Amount = styled.p`
  font-size: 17px;
  font-weight: bold;
  color: rgb(0, 0, 0);
`;

const TotalPrice = styled.p`
  font-size: 25px;
  font-weight: bold;
  color: rgb(0, 47, 255);
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 15px;
  padding-top: 180px;
`;

const Button = styled.button`
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: ${(props) => (props.primary ? "#555555" : "#cccccc")};
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.primary ? "#333" : "#999999")};
  }
  &:first-child {
    margin-left: 430px;
  }
`;

const SummaryWrapper = styled.div`
  white-space: pre-line; // 줄바꿈
  padding-top: 20px;
  margin-top: 30px;
  max-width: 1100px;
  width: 100%;
  align-items: center;
  margin: 0 auto;
`;

const SummaryTitle = styled.h2`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
`;

const Summary = styled.p`
  font-size: 25px;
  line-height: 1.8;
  color: #666;
`;

const Loading = styled.div`
  text-align: center;
  font-size: 20px;
  color: #007bff;
  margin-top: 50px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  font-size: 18px;
  color: red;
  margin-top: 50px;
`;

const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  width: 120px;
  height: 40px;

  button {
    flex: 1;
    border: none;
    background-color: #f5f5f5;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    padding: 0;

    &:hover {
      background-color: #e0e0e0;
    }

    &:disabled {
      cursor: not-allowed;
      background-color: #f9f9f9;
      color: #ccc;
    }
  }

  input {
    flex: 2;
    border: none;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    color: #333;
    background-color: #fff;
    outline: none;

    /* 숫자만 입력 가능 */
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;
