import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("bearer_token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    if (email === "") {
      alert("이메일을 입력해주세요.");
    } else if (password === "") {
      alert("비밀번호를 입력해주세요.");
    } else {
      axios
        .post("https://project-be.site/auth/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          let bearer_token = response.headers.bearer_token;
          localStorage.setItem("bearer_token", bearer_token); // 토큰 저장
          setIsLoggedIn(true);
          alert(`${email}님 환영합니다.`);
          window.location.href = "/";
        })
        .catch((error) => {
          console.error("로그인 오류:", error);
          alert(
            "이메일 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요."
          );
        });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("bearer_token"); // 토큰 삭제
    setIsLoggedIn(false);
    alert("로그아웃 되었습니다.");
  };

  return (
    <Container>
      {isLoggedIn ? (
        <LoggedInContainer>
          <Message>이미 로그인된 회원입니다.</Message>
          <Button onClick={handleLogout} secondary>
            로그아웃
          </Button>
        </LoggedInContainer>
      ) : (
        <Form>
          <h2>로그인</h2>
          <Input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="패스워드"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="button" onClick={handleLogin}>
            로그인
          </Button>
        </Form>
      )}
    </Container>
  );
}

const Container = styled.div`
  margin-top: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgb(255, 255, 255);
`;

const Form = styled.form`
  background-color: #fff;
  color: #333;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
`;

const LoggedInContainer = styled.div`
  background-color: #fff;
  color: #333;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: bold;
  color: #333;
`;

const Message = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 12px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: ${(props) => (props.secondary ? "#e74c3c" : "#3498db")};
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  background-color: #555555;

  margin-top: ${(props) => (props.secondary ? "20px" : "0")};

  &:hover {
    background-color: #000;
  }
`;

export default Login;
