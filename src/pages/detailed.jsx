import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router를 사용하기 위해 추가
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 20px;
  margin-top: 400px; /* 헤더 공간 확보 */
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  border-radius: 8px;
`;

const ImageContainer = styled.div`
  width: 300px;
  height: 300px;
  background-color: #f4f4f4; /* 이미지를 넣기 전 회색 배경 */
  border-radius: 8px;
  flex-shrink: 0;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Author = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
  color: #555;
`;

const Publisher = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
  color: #555;
`;

const Price = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #666;
  margin-bottom: 20px;
  max-height: 150px; /* 스크롤을 위한 고정 높이 */
  overflow-y: auto;
  padding-right: 10px;

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: #f9f9f9;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  color: #fff;

  ${({ variant }) =>
    variant === "buy"
      ? `background-color: #6c757d;`
      : `background-color: #555555;`}

  &:hover {
    opacity: 0.9;
  }
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  button {
    background-color: #ddd;
    border: none;
    border-radius: 8px;
    padding: 5px 10px;
    font-size: 18px;
    cursor: pointer;

    &:hover {
      background-color: #bbb;
    }
  }

  span {
    font-size: 18px;
  }
`;

const BookDetailPage = () => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate(); // React Router의 useNavigate 훅 사용

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // 즉시 구매 버튼 로직
  const handleBuyNow = () => {
    // 즉시 구매 페이지로 이동
    navigate("/checkout", {
      state: {
        item: "Le Grand Atlas des rois de France",
        quantity: quantity,
        price: 64000 * quantity,
      },
    });
  };

  // 장바구니 버튼 로직
  const handleAddToCart = () => {
    // 장바구니 페이지로 이동
    navigate("/cart", {
      state: {
        item: "Le Grand Atlas des rois de France",
        quantity: quantity,
        price: 64000 * quantity,
      },
    });
  };

  return (
    <PageContainer>
      {/* 왼쪽 이미지 영역 */}
      <ImageContainer>{/* 여기에 이미지 삽입 */}</ImageContainer>

      {/* 오른쪽 정보 및 기능 영역 */}
      <ContentContainer>
        <div>
          <Title>Le Grand Atlas des rois de France</Title>
          <Author>저자: Jean Dupont</Author>
          <Publisher>출판사: Glénat</Publisher>
          <Price>64,000원</Price>
          <Description>
            This book offers a comprehensive guide to the kings of France,
            including their reigns, achievements, and the historical context of
            their time. It's a must-have for history enthusiasts!
          </Description>
        </div>

        <ButtonContainer>
          <QuantityControl>
            <button onClick={handleDecrease}>-</button>
            <span>{quantity}</span>
            <button onClick={handleIncrease}>+</button>
          </QuantityControl>
          <Button variant="buy" onClick={handleBuyNow}>
            즉시 구매
          </Button>
          <Button onClick={handleAddToCart}>장바구니</Button>
        </ButtonContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default BookDetailPage;
