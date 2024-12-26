import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// 스타일 정의
const PageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  margin: 400px auto 0 auto; /* 헤더 높이 400px 고려 */
  max-width: 1200px;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const LeftContainer = styled.div`
  width: 300px;
  height: 300px;
  background-color: #eaeaea;
  border-radius: 8px;
`;

const RightContainer = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Author = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 5px;
`;

const Publisher = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 10px;
`;

const Price = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin: 10px 0;
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #666;
  margin-bottom: 20px;
`;

const PurchaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  background-color: #ddd;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
`;

const QuantityDisplay = styled.p`
  font-size: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  color: #fff;

  ${({ variant }) =>
    variant === "buy"
      ? `
      background-color: #007bff;
    `
      : `
      background-color: #6c757d;
    `}
`;

// 메인 컴포넌트
const BookDetailPage = () => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  // 샘플 데이터
  const book = {
    title: "",
    author: "",
    publisher: "",
    price: "",
    description: "",
  };

  const handleBuyNow = () => {
    alert(`"${book.title}"을(를) ${quantity}개 즉시 구매합니다.`);
    navigate("/buy"); // 즉시 구매 페이지로 이동
  };

  const handleAddToCart = () => {
    alert(`"${book.title}" ${quantity}개가 장바구니에 추가되었습니다.`);
    navigate("/cart"); // 장바구니 페이지로 이동
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <PageContainer>
      {/* 왼쪽: 이미지 공간 */}
      <LeftContainer></LeftContainer>

      {/* 오른쪽: 도서 정보 및 기능 로직 */}
      <RightContainer>
        <Title>{book.title}</Title>
        <Author>저자: {book.author}</Author>
        <Publisher>출판사: {book.publisher}</Publisher>
        <Price>가격: {book.price.toLocaleString()}원</Price>
        <Description>{book.description}</Description>

        {/* 구매 섹션 */}
        <PurchaseContainer>
          {/* 수량 버튼 */}
          <QuantityContainer>
            <QuantityButton onClick={decreaseQuantity}>-</QuantityButton>
            <QuantityDisplay>{quantity}</QuantityDisplay>
            <QuantityButton onClick={increaseQuantity}>+</QuantityButton>
          </QuantityContainer>

          {/* 즉시 구매 및 장바구니 */}
          <ButtonContainer>
            <Button variant="buy" onClick={handleBuyNow}>
              즉시 구매
            </Button>
            <Button onClick={handleAddToCart}>장바구니</Button>
          </ButtonContainer>
        </PurchaseContainer>
      </RightContainer>
    </PageContainer>
  );
};

export default BookDetailPage;
