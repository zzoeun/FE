import { Link, useLocation } from 'react-router';
import styled from 'styled-components';
import Dropdown from '../home/Dropdown';
import { useEffect, useState } from 'react';
import dummyUserImg from '../../icons/user.svg';
import axios from 'axios';

const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('bearer_token'));

  const location = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://project-be.site/api/mypage/getUserInfo', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [token]);

  let userOrLink = (
    <>
      <LocationItem>
        <LocationLink to={'/login'}>로그인</LocationLink>
      </LocationItem>
      {location.pathname !== '/signup' && (
        <LocationItem>
          <LocationLink to={'/signup'}>회원가입</LocationLink>
        </LocationItem>
      )}
    </>
  );

  if (userData) {
    userOrLink = (
      <LocationItem>
        <User to={'/mypage'}>
          <img src={userData.profileImage ? userData.profileImage : dummyUserImg} alt='profile' />
          <p>{userData.userName}</p>
        </User>
      </LocationItem>
    );
  }

  return (
    <Nav>
      <Wrapper>
        {location.pathname === '/' && <Dropdown />}

        {location.pathname !== '/login' && <LocationList>{userOrLink}</LocationList>}
      </Wrapper>
    </Nav>
  );
};

const Nav = styled.nav`
  width: 100%;
  min-width: 1200px;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  background: #fff;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1200px;
  height: 50px;
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

const LocationLink = styled(Link)`
  font-size: 16px;
  color: #999999;
  text-decoration: none;

  &:visited {
    color: #999999;
  }
`;

const User = styled(LocationLink)`
  display: flex;
  align-items: center;
  gap: 5px;

  & img {
    display: block;
    width: 35px;
    height: 35px;
  }

  & p {
    margin-top: 3px;
  }
`;

export default Navbar;
