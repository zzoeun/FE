import React, { useState } from "react";
import styled from "styled-components";

// Styled-components
const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 20px;
  margin-top: 302px; /* 헤더 높이 */
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const ImageContainer = styled.div`
  flex: 1;
  background-color: #f2f2f2;
  height: 600px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 20px; /* 스크롤 시 상단 고정 */
`;

const ContentContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// Book Information
const BookTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const BookAuthor = styled.p`
  font-size: 16px;
  color: #555;
`;

const BookPublisher = styled.p`
  font-size: 16px;
  color: #555;
`;

const BookPrice = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0;
`;

const BookDescription = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #666;
  border-top: 1px solid #ddd;
  padding-top: 10px;
`;

// Purchase Section
const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
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

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;
`;

const QuantityValue = styled.span`
  font-size: 16px;
`;

const BookDetailPage = () => {
  const [quantity, setQuantity] = useState(1);

  // 수량 증가
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // 수량 감소
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // 즉시 구매
  const handleBuyNow = () => {
    alert(`즉시 구매: ${quantity}권`);
  };

  // 장바구니 추가
  const handleAddToCart = () => {
    alert(`장바구니 추가: ${quantity}권`);
  };

  return (
    <PageContainer>
      {/* Left: Image Container */}
      <ImageContainer>
        <p>이미지 영역</p>
      </ImageContainer>

      {/* Right: Content */}
      <ContentContainer>
        {/* Book Info */}
        <div>
          <BookTitle>도서 제목: Le Grand Atlas des rois de France</BookTitle>
          <BookAuthor>저자: Jean Dupont</BookAuthor>
          <BookPublisher>출판사: Glénat</BookPublisher>
          <BookPrice>가격: 64,000원</BookPrice>
          <BookDescription>
            줄거리: This book offers a comprehensive guide to the kings of
            France, including their reigns, achievements, and the historical
            context of their time.
          </BookDescription>
        </div>

        {/* Purchase Section */}
        <div>
          <QuantityContainer>
            <QuantityButton onClick={decreaseQuantity}>-</QuantityButton>
            <QuantityValue>{quantity}</QuantityValue>
            <QuantityButton onClick={increaseQuantity}>+</QuantityButton>
          </QuantityContainer>

          <ButtonContainer>
            <Button variant="buy" onClick={handleBuyNow}>
              즉시 구매
            </Button>
            <Button onClick={handleAddToCart}>장바구니</Button>
          </ButtonContainer>
        </div>
      </ContentContainer>
    </PageContainer>
  );
};

export default BookDetailPage;
