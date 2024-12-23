import { useLocation, useNavigate } from 'react-router';
import styled from 'styled-components';
import Dropdown from '../home/Dropdown';
import { useState } from 'react';
import user from '../../icons/user.svg';

const Navbar = () => {
  const [userInfo, setUserInfo] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Nav>
      <Wrapper>
        {location.pathname === '/' && <Dropdown />}

        {location.pathname !== '/login' && (
          <LocationList>
            {!userInfo ? (
              <>
                <LocationItem>
                  <LocationButton onClick={() => navigate('/login')}>로그인</LocationButton>
                </LocationItem>
                {location.pathname !== '/signup' && (
                  <LocationItem>
                    <LocationButton onClick={() => navigate('/signup')}>회원가입</LocationButton>
                  </LocationItem>
                )}
              </>
            ) : (
              <LocationItem>
                <User onClick={() => navigate('/mypage')}>
                  <img src={user} alt='profile' />
                  <p>USER NAME</p>
                </User>
              </LocationItem>
            )}
          </LocationList>
        )}
      </Wrapper>
    </Nav>
  );
};

const Nav = styled.nav`
  width: 100%;
  min-width: 1200px;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1200px;
  height: 50px;
  background: #fff;
  padding: 0 30px 0 20px;
  margin: 0 auto;
`;

const LocationList = styled.ul`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 30px;
  margin-left: auto;
`;

const LocationItem = styled.li`
  cursor: pointer;
`;

const LocationButton = styled.button`
  border: none;
  background: transparent;
  font-size: 16px;
  color: #999999;
  cursor: pointer;
`;

const User = styled(LocationButton)`
  display: flex;
  align-items: center;
  gap: 5px;

  & img {
    display: block;
    width: 35px;
    height: 35px;
  }
`;

export default Navbar;
