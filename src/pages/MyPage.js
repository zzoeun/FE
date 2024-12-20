import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Sidebar from "../components/mypage/Sidebar";
import MyInfo from "../components/mypage/MyInfo";
import DeleteAccount from "../components/mypage/DeleteAccount";
import MyInfoModify from "../components/mypage/MyInfoModify";

const MyPage = () => {
  const [selectedMenu, setSelectedMenu] = useState("myinfo");
  const [userData, setUserData] = useState({});

  // 백엔드에서 사용자 정보 불러오기, 필요없어도 되는지 확인 필요
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/userinfo", {
          headers: { Authorization: `JWT_TOKEN` },
        });
        setUserData(response.data); // 받아온 데이터 저장
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
    };

    fetchUserData();
  }, []);

  // 현재 메뉴에 따라 다른 화면 렌더링
  const renderContent = () => {
    switch (selectedMenu) {
      case "myinfo":
        return <MyInfo userData={userData} />;
      case "myinfomodify":
        return <MyInfoModify />;
      case "deleteaccount":
        return <DeleteAccount />;
      default:
        return <MyInfo userData={userData} />;
    }
  };

  return (
    <Container>
      <Sidebar setSelectedMenu={setSelectedMenu} />
      <Content>
        <PageTitle>마이페이지</PageTitle>
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
`;

const Content = styled.div`
  flex: 1;
  padding: 30px;
  background-color: #fff;
  color: #333;
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
