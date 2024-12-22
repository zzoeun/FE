import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const DeleteAccount = () => {
  const navigate = useNavigate();

  // 회원탈퇴 로직. 로그인 시 sotorage 활용 여부 확인 후 수정 필요
  const handleDeleteProfile = async () => {
    if (window.confirm("정말 회원 탈퇴를 진행하시겠습니까?")) {
      try {
        const response = await axios.delete(`/auth/delete`, {
          headers: {
            Authorization: `JWT_TOKEN`,
          },
        });
        console.log("삭제 성공:", response.data);
        window.confirm("회원 탈퇴가 완료되었습니다.");
        navigate("/");
      } catch (error) {
        console.error("회원 탈퇴 실패:", error);
        alert("회원 탈퇴에 실패했습니다.");
      }
    }
  };

  return (
    <Container>
      <Title>회원 탈퇴</Title>
      <Description>
        회원 탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.
      </Description>
      <DeleteButton onClick={handleDeleteProfile}>회원 탈퇴</DeleteButton>
    </Container>
  );
};

export default DeleteAccount;

// 스타일 정의
const Container = styled.div`
  text-align: center;
  padding: 30px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #f06569;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 30px;
`;

const DeleteButton = styled.button`
  padding: 10px 20px;
  height: 42px;
  background-color: #505c6d;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: rgb(0, 121, 70);
  }
`;
