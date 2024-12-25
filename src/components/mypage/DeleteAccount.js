import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import SignupModal from "../modal/SignupModal";
import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../../features/modalSlice";

const DeleteAccount = ({ token }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modalOpen = useSelector((state) => state.modal);
  const [modalContent, setModalContent] = useState("");

  const handleDeleteProfile = () => {
    setModalContent("정말 회원 탈퇴를 진행하시겠습니까?");
    dispatch(openModal());
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(
        `http://13.209.143.163:8080/auth/login`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("삭제 성공:", response.data);
      setModalContent("회원 탈퇴가 완료되었습니다.");
      dispatch(openModal());
      navigate("/");
    } catch (error) {
      console.error("회원 탈퇴 실패:", error);
      setModalContent("회원 탈퇴에 실패했습니다.");
      dispatch(openModal());
    }
  };

  return (
    <Container>
      <Title>회원 탈퇴</Title>
      <Description>
        회원 탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.
      </Description>
      <DeleteButton onClick={handleDeleteProfile}>회원 탈퇴</DeleteButton>
      {/* 모달 컴포넌트 */}
      {modalOpen && (
        <SignupModal
          isOpen={modalOpen}
          content={modalContent}
          onConfirm={confirmDelete} // 확인 버튼 동작
          onCancel={() => dispatch(closeModal())} // 취소 버튼 동작
        />
      )}
    </Container>
  );
};

export default DeleteAccount;

// 스타일 정의
const Container = styled.div`
  margin: 302px auto;

  text-align: center;
  padding: 30px;
`;

const Title = styled.h1`
  font-size: 30px;
  color: rgb(0, 0, 0);
  margin-bottom: 20px;
  font-weignt: bold;
`;

const Description = styled.p`
  font-size: 20px;
  color: #555555;
  margin-bottom: 30px;
`;

const DeleteButton = styled.button`
  padding: 10px 20px;
  height: 42px;
  background-color: #555555;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: rgb(0, 0, 0);
  }
`;
