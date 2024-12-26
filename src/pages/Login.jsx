import React, { useState } from "react";
import styled from "styled-components"; // styled-components import

const Login = () => {
  const [email, setEmail] = useState(""); // 이메일 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태
  const [error, setError] = useState(""); // 에러 메시지 상태

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // 에러 초기화

    // 입력값 검증
    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      console.log("로그인 시도 중..."); // 콘솔 로그 추가
      // 예시 로그인 API 요청 (백엔드 URL 수정 필요)
      const response = await fetch("https://project-be.site/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("로그인 실패! 이메일 또는 비밀번호를 확인하세요.");
      }

      const data = await response.json();

      // 로그인 성공 시 JWT 토큰을 로컬스토리지에 저장
      localStorage.setItem("authToken", data.token); // 여기서 'data.token'은 서버에서 반환된 토큰
      alert(`로그인 성공! 환영합니다, ${data.username}님.`);

      // 로그인 후 필요한 추가 작업 (예: 리디렉션 등)
      // 예: history.push('/dashboard') 또는 window.location.href = '/dashboard'
    } catch (err) {
      setError(err.message || "로그인 중 오류가 발생했습니다.");
    }
  };

  const handleLogout = () => {
    // 로그아웃 로직 (로컬스토리지에서 토큰 삭제)
    localStorage.removeItem("authToken"); // 로컬스토리지에서 토큰 삭제
    alert("로그아웃 되었습니다.");
    setEmail(""); // 이메일 상태 초기화
    setPassword(""); // 비밀번호 상태 초기화
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
            onChange={(e) => setEmail(e.target.value)} // setEmail을 사용
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

        {/* 체크박스 - 자동 로그인 */}
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

        {/* 비회원 주문조회, 중복확인, 로그아웃 버튼 */}
        <GuestOrderButton type="button">비회원 주문조회</GuestOrderButton>
        <OptionalButton type="button">중복확인</OptionalButton>
        <LogoutButton type="button" onClick={handleLogout}>
          로그아웃
        </LogoutButton>
      </LoginForm>
    </LoginContainer>
  );
};

// Styled-components 스타일 정의
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

const GuestOrderButton = styled.button`
  width: 100%;
  background-color: #6c757d;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #5a6268;
  }
`;

const OptionalButton = styled.button`
  width: 100%;
  background-color: #cccccc;
  color: black;
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #999999;
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
