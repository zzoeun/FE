import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Sidebar from "../components/mypage/Sidebar";
import MyInfo from "../components/mypage/MyInfo";
import DeleteAccount from "../components/mypage/DeleteAccount";
//import MyInfoModify from "../components/mypage/MyInfoModify";
import PaymentsList from "../components/mypage/PaymentsList";
import ShoppingCartList from "../components/mypage/ShoppingCartList";

const MyPage = () => {
  const [selectedMenu, setSelectedMenu] = useState("myinfo");
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);

  // 백엔드에서 사용자 정보 불러오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/mypage/getUserInfo", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data); // 받아온 데이터 저장
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
        alert("로그인한 회원이 아닙니다.");
      }
    };

    fetchUserData(); // 사용자 정보 가져오기
  }, [token]); // 토큰이 변경될 때마다 실행

  // 현재 메뉴에 따라 다른 화면 렌더링
  const renderContent = () => {
    switch (selectedMenu) {
      case "myinfo":
        return <MyInfo userData={userData} />;
      case "deleteaccount":
        return <DeleteAccount />;
      case "shoppingcartlist":
        return <ShoppingCartList />;
      case "paymentslist":
        return <PaymentsList />;
      default:
        return <MyInfo userData={userData} />;
    }
  };

  const getPageTitle = () => {
    switch (selectedMenu) {
      case "paymentslist":
        return "주문결제조회";
      case "shoppingcartlist":
        return "내 장바구니";
      default:
        return "마이페이지";
    }
  };

  return (
    <Container>
      <Sidebar setSelectedMenu={setSelectedMenu} />
      <Content>
        <PageTitle>{getPageTitle()}</PageTitle>
        {renderContent()}
      </Content>
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  display: flex;
  background-color: #f8f9fa;
  min-height: 100vh;
  margin: 302px auto;
  min-width: 1200px; // 추가: 전체 최소 너비 설정
`;

const Content = styled.div`
  flex: 1;
  padding: 30px;
  background-color: #fff;
  color: #333;
  min-width: 800px; // 추가: 컨텐츠 영역 최소 너비 설정
  overflow-x: auto; // 추가: 필요한 경우에만 가로 스크롤
`;

const PageTitle = styled.h1`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  font-size: 2rem;
  text-align: left;
  border-bottom: 1px solid gray;
  margin-top: 0 auto;
`;
