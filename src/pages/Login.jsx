import React, { createContext, useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

// AuthContext 생성
const AuthContext = createContext();

// AuthProvider 컴포넌트
const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [bearerToken, setBearerToken] = useState(null);

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

  const checkLoginStatus = () => isLoggedIn;

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

        {checkLoginStatus() ? (
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
  border: 1px solid #e0e0e0;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  background-color: #f9f9f9;
`;

const LoginTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 25px;
  color: #333;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  background-color: #fff;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const HelpLinks = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;

  a {
    text-decoration: none;
    font-size: 13px;
    color: #007bff;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`;

const LogoutButton = styled.button`
  width: 100%;
  background-color: #dc3545;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

export default App;
