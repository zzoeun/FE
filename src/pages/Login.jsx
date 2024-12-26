import React, { useState } from "react";
import styled from "styled-components";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      console.log("로그인 시도 중...");
      const response = await fetch("https://project-be.site/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("로그인 실패! 이메일 또는 비밀번호를 확인하세요.");
      }

      const data = await response.json();

      // 1. 토큰 저장
      localStorage.setItem("token", data.token);

      // 2. 이메일 및 비밀번호 저장 (이메일만 저장하는 것을 권장)
      localStorage.setItem("email", email);
      // localStorage.setItem("password", password);  // 비밀번호 저장은 권장하지 않음 (보안 위험)

      alert(`로그인 성공! 환영합니다, ${data.username}님.`);

      // 로그인 후 추가 작업
      // 예: window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message || "로그인 중 오류가 발생했습니다.");
    }
  };

  const handleLogout = () => {
    // 로그아웃 로직
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    alert("로그아웃 되었습니다.");
    setEmail("");
    setPassword("");
  };

  return (
    <LoginContainer>
      <LoginTitle>LOGIN</LoginTitle>
      <LoginForm onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <InputGroup>
          <Label htmlFor="email">이메일</Label>
          <Input
            type="text"
            id="email"
            name="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>
        
        <InputGroup>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>

        <CheckboxGroup>
          <Checkbox type="checkbox" id="auto-login" name="auto-login" />
          <Label htmlFor="auto-login">자동 로그인</Label>
        </CheckboxGroup>
        
        <SubmitButton type="submit">로그인</SubmitButton>
        
        <HelpLinks>
          <a href="/find-id">이메일찾기</a>
          <a href="/find-password">비밀번호찾기</a>
          <a href="/signup">회원가입</a>
        </HelpLinks>
        
        <LogoutButton type="button" onClick={handleLogout}>
          로그아웃
        </LogoutButton>
      </LoginForm>
    </LoginContainer>
  );
};

// Styled-components 정의
const LoginContainer = styled.div`
  width: 400px;
  margin: 400px auto;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const LoginTitle = styled.h2`
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  text-align: center;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Checkbox = styled.input`
  margin: 0;
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #555555;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #000;
  }
`;

const HelpLinks = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;

  a {
    text-decoration: none;
    font-size: 14px;
    color: #007bff;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const LogoutButton = styled.button`
  width: 100%;
  background-color: #ff4d4d;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #cc0000;
  }
`;

export default Login;
