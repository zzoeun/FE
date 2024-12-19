import { useNavigate } from 'react-router';
import styled from 'styled-components';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Nav>
      <LocationList>
        <LocationItem>
          <LocationButton onClick={() => navigate('/login')}>로그인</LocationButton>
        </LocationItem>
        <LocationItem>
          <LocationButton onClick={() => navigate('/signup')}>회원가입</LocationButton>
        </LocationItem>
      </LocationList>
    </Nav>
  );
};

const Nav = styled.nav`
  width: 100%;
  min-width: 1200px;
  height: 50px;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  padding: 0 30px;
`;

const LocationList = styled.ul`
  width: 150px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  &:hover {
    color: #99999980;
  }
`;

export default Navbar;
