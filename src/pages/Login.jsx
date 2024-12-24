import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState(null);

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
      setToken(data.token);

      // 서버에서 반환된 토큰 처리
      const token = data.token; // 서버가 반환하는 토큰
      if (!token) {
        throw new Error(
          "로그인 중 문제가 발생했습니다. 토큰을 찾을 수 없습니다."
        );
      }

      alert(`로그인 성공! 환영합니다, ${data.username}님.`);
      // 로그인 성공 시 로컬스토리지나 세션 저장 등 추가 처리 가능
    } catch (err) {
      setError(err.message || "로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">LOGIN</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        <div className="input-group">
          <label htmlFor="username">이메일</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <label htmlFor="auto-login">자동로그인</label>
        </div>
        <button type="submit" className="login-button">
          로그인
        </button>
        <div className="help-links">
          <a href="/find-id">이메일찾기</a>
          <a href="/find-password">비밀번호찾기</a>
          <a href="/signup">회원가입</a>
        </div>
        <button type="button" className="guest-order-button">
          비회원 주문조회
        </button>
      </form>
    </div>
  );
};

export default Login;
