import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import React, { useState } from "react";

const DeleteAccount = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("bearer_token"));

  const handleDeleteProfile = async () => {
    if (window.confirm("정말 회원 탈퇴를 진행하시겠습니까?")) {
      try {
        const response = await axios.get(
          `https://project-be.site/auth/delete`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("삭제 성공:", response.data);
        localStorage.removeItem("bearer_token");
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
