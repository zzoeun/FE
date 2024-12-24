import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");  // 이메일 상태
  const [password, setPassword] = useState("");  // 비밀번호 상태
  const [error, setError] = useState("");  // 에러 메시지 상태

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // 에러 초기화

    // 입력값 검증
    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      // 예시 로그인 API 요청 (백엔드 URL 수정 필요)
      const response = await fetch("/auth/login", {
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
    setEmail("");  // 이메일 상태 초기화
    setPassword("");  // 비밀번호 상태 초기화
  };

  return (
    <div className="login-container">
      <h2 className="login-title">LOGIN</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        <div className="input-group">
          <label htmlFor="email">이메일</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}  // setEmail을 사용
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="checkbox-group">
          <input type="checkbox" id="auto-login" name="auto-login" />
          <label htmlFor="auto-login">자동 로그인</label>
        </div>
        <button type="submit" className="submit-button">
          제출하기
        </button>
        <button type="button" className="payment-button">
          결제하기
        </button>
        <div className="help-links">
          <a href="/find-id">이메일찾기</a>
          <a href="/find-password">비밀번호찾기</a>
          <a href="/signup">회원가입</a>
        </div>
        <button type="button" className="guest-order-button">
          비회원 주문조회
        </button>
        <button type="button" className="optional-button">
          중복확인
        </button>
        <button type="button" className="logout-button" onClick={handleLogout}>
          로그아웃
        </button>
      </form>
    </div>
  );
};

export default Login;
