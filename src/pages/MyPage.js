import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Sidebar from "../components/mypage/Sidebar";
import MyInfo from "../components/mypage/MyInfo";
import DeleteAccount from "../components/mypage/DeleteAccount";
import PaymentsList from "../components/mypage/PaymentsList";
import Cart from "../components/mypage/Cart";
import SignupConfirmModal from "../components/modal/SignupConfirmModal";
import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../features/modalSlice";
import { useNavigate } from "react-router-dom"; // useNavigate 임포트

const MyPage = () => {
  const [selectedMenu, setSelectedMenu] = useState("myinfo");
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("bearer_token"));
  const navigate = useNavigate(); // 페이지 이동

  const dispatch = useDispatch();
  const modalOpen = useSelector((state) => state.modal); // 모달 상태 가져오기
  const [modalContent, setModalContent] = useState(""); // 모달 내용 관리

  // 현재 메뉴에 따라 다른 화면 렌더링
  const renderContent = () => {
    switch (selectedMenu) {
      case "myinfo":
        return (
          <MyInfo userData={userData} setUserData={setUserData} token={token} />
        );
      case "deleteaccount":
        return <DeleteAccount token={token} />;
      case "cart":
        return <Cart />;
      case "paymentslist":
        return <PaymentsList />;
      default:
        return <MyInfo userData={userData} token={token} />;
    }
  };

  const getPageTitle = () => {
    switch (selectedMenu) {
      case "paymentslist":
        return "주문결제조회";
      case "cart":
        return "내 장바구니";
      case "modifyInfo":
        return "내 정보 수정";
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
      {/* 모달 컴포넌트 */}
      {modalOpen && (
        <SignupConfirmModal
          isOpen={modalOpen}
          content={modalContent}
          onClose={() => {
            dispatch(closeModal());
            // navigate("/Login");
          }}
        />
      )}
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  display: flex;
  background-color: #f8f9fa;
  min-height: 100vh;
  margin-top: 302px;
  min-width: 1200px;
  max-width: 1500px;
  position: relative;
`;

const Content = styled.div`
  flex: 1;
  padding: 30px;
  padding-left: 280px;
  background-color: #fff;
  color: #333;
  min-width: 800px;
  overflow-x: auto;
`;

const PageTitle = styled.h1`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  font-size: 2rem;
  text-align: left;
  border-bottom: 1px solid gray;
  margin: 0 0 20px 0;
`;
