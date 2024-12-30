import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BookInfo from "../components/bookDetail/BookInfo"; // BookInfo 컴포넌트 불러오기

const BookDetail = () => {
  const { bookId } = useParams(); // URL에서 bookId 가져오기
  const token = localStorage.getItem("bearer_token"); // 토큰 가져오기

  return (
    <Container>
      <Header>도서 상세 정보</Header>
      <BookInfo bookId={bookId} />
    </Container>
  );
};

export default BookDetail;

// 스타일 정의
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.h1`
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;
