import React, { createContext, useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

// AuthContext 생성
const AuthContext = createContext();

// AuthProvider 컴포넌트
const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [bearerToken, setBearerToken] = useState(null);

  // 앱 로드 시 로그인 상태 확인
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedBearerToken = localStorage.getItem('bearerToken');

    if (savedToken && savedBearerToken) {
      setToken(savedToken);
      setBearerToken(savedBearerToken);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (newToken, newBearerToken) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('bearerToken', newBearerToken);
    setToken(newToken);
    setBearerToken(newBearerToken);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('bearerToken');
    setToken(null);
    setBearerToken(null);
    setIsLoggedIn(false);
  };

  const checkLoginStatus = () => {
    return isLoggedIn;
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, bearerToken, login, logout, checkLoginStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// Login 컴포넌트
const Login = () => {
  const { isLoggedIn, login, logout, bearerToken, checkLoginStatus } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userData, setUserData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    try {
      const response = await fetch('https://project-be.site/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('로그인 실패! 이메일 또는 비밀번호를 확인하세요.');

      const { token: newToken, bearer_token: newBearerToken } = await response.json();

      if (!newToken || !newBearerToken) throw new Error('토큰을 받지 못했습니다.');

      login(newToken, newBearerToken);
      alert('로그인 성공!');
    } catch (err) {
      setError(err.message || '로그인 중 오류가 발생했습니다.');
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch('https://project-be.site/user/info', {
        method: 'GET',
        headers: { Authorization: `Bearer ${bearerToken}` },
      });

      if (!response.ok) throw new Error('사용자 정보를 가져오는 데 실패했습니다.');

      const userInfo = await response.json();
      setUserData(userInfo);
    } catch (err) {
      setError(err.message || '사용자 데이터를 가져오는 중 오류가 발생했습니다.');
    }
  };

  const handleLogout = () => {
    logout();
    setUserData(null);
    alert('로그아웃 되었습니다.');
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn]);

  return (
    <LoginContainer>
      <LoginTitle>LOGIN</LoginTitle>
      <LoginForm onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        {checkLoginStatus() ? ( // 로그인 상태 확인
          <>
            <p>현재 로그인 상태입니다.</p>
            {userData && <p>사용자 이름: {userData.username}</p>}
            <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
          </>
        ) : (
          <>
            <InputGroup>
              <Label htmlFor="email">이메일</Label>
              <Input
                type="text"
                id="email"
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

// App 컴포넌트
const App = () => (
  <AuthProvider>
    <Login />
  </AuthProvider>
);

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
