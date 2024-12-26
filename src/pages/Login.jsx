import React, { createContext, useState, useEffect, useContext } from "react";
import styled from "styled-components";

// AuthContext 생성
const AuthContext = createContext();

// AuthProvider 컴포넌트
const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 페이지 로드 시 로그인 상태 확인 (localStorage 사용)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // 로그인 처리
  const login = (token, email) => {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    setIsLoggedIn(true);
  };

  // 로그아웃 처리
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Login 컴포넌트
const Login = () => {
  const { isLoggedIn, login, logout } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null); // 추가된 상태

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

      // 로그인 실패 시 처리
      if (!response.ok) {
        throw new Error("로그인 실패! 이메일 또는 비밀번호를 확인하세요.");
      }

      // 응답 본문에서 bearer_token 추출
      const data = await response.json();
      const bearerToken = data.bearer_token;  // 응답 본문에서 bearer_token 추출

      if (!bearerToken) {
        throw new Error("토큰을 받지 못했습니다.");
      }

      console.log("받은 토큰:", bearerToken); // 받은 토큰을 콘솔에 출력

      // 로그인 후 로그인 상태 및 데이터 처리
      login(bearerToken, email); // 로그인 상태 업데이트
      alert(`로그인 성공! 환영합니다, ${data.username}님.`);

      // 로그인 후 사용자 데이터 가져오기 (예시로 /user/info API 사용)
      const userResponse = await fetch("https://project-be.site/user/info", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${bearerToken}`, // 헤더에 Bearer token 포함
        },
      });

      if (!userResponse.ok) {
        throw new Error("사용자 정보를 가져오는 데 실패했습니다.");
      }

      const userInfo = await userResponse.json();
      setUserData(userInfo); // 사용자 정보 저장

    } catch (err) {
      setError(err.message || "로그인 중 오류가 발생했습니다.");
    }
  };

  const handleLogout = () => {
    logout(); // 로그아웃 처리
    alert("로그아웃 되었습니다.");
  };

  return (
    <LoginContainer>
      <LoginTitle>LOGIN</LoginTitle>
      <LoginForm onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        {isLoggedIn ? (
          <>
            <p>현재 로그인 상태입니다.</p>
            {userData && <p>사용자 이름: {userData.username}</p>}
            <LogoutButton type="button" onClick={handleLogout}>
              로그아웃
            </LogoutButton>
          </>
        ) : (
          <>
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

            <SubmitButton type="submit">로그인</SubmitButton>

            <HelpLinks>
              <a href="/find-id">이메일 찾기</a>
              <a href="/find-password">비밀번호 찾기</a>
              <a href="/signup">회원가입</a>
            </HelpLinks>
          </>
        )}
      </LoginForm>
    </LoginContainer>
  );
};

// App 컴포넌트 (AuthProvider로 전체 앱 감싸기)
const App = () => {
  return (
    <AuthProvider>
      <Login />
    </AuthProvider>
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

export default App;
