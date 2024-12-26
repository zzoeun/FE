import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Login = () => {
  const [email, setEmail] = useState("");      // 이메일 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태
  const [error, setError] = useState("");       // 에러 메시지 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 추가

  // 페이지 로드 시 로그인 상태 확인
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // 토큰이 있으면 로그인 상태로 설정
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // 에러 초기화

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
      localStorage.setItem("token", data.token); // 토큰 저장
      localStorage.setItem("email", email); // 이메일 저장
      setIsLoggedIn(true); // 로그인 후 상태 변경
      alert(`로그인 성공! 환영합니다, ${data.username}님.`);

    } catch (err) {
      setError(err.message || "로그인 중 오류가 발생했습니다.");
    }
  };

  const handleLogout = () => {
    // 로그아웃 로직
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setIsLoggedIn(false); // 로그아웃 시 상태 변경
    alert("로그아웃 되었습니다.");
  };

  return (
    <LoginContainer>
      <LoginTitle>LOGIN</LoginTitle>
      <LoginForm onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        {/* 이메일 입력 공간 */}
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

        {/* 비밀번호 입력 공간 */}
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

        {/* 로그인 버튼 */}
        <SubmitButton type="submit">로그인</SubmitButton>

        {/* 하단 링크들 */}
        <HelpLinks>
          <a href="/find-id">이메일찾기</a>
          <a href="/find-password">비밀번호찾기</a>
          <a href="/signup">회원가입</a>
        </HelpLinks>

        {/* 로그인이 되어 있을 때만 로그아웃 버튼 표시 */}
        {isLoggedIn && (
          <LogoutButton type="button" onClick={handleLogout}>
            로그아웃
          </LogoutButton>
        )}
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
