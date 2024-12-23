import styled from 'styled-components';
import Navbar from './Navbar';
import logoImg from '../../assets/images/logo.png';
import { useNavigate } from 'react-router';

function Header() {
  const navigate = useNavigate();

  return (
    <HeaderArea>
      <Logo>
        <LogoImageBox onClick={() => navigate('/')}>
          <img src={logoImg} alt='logo' />
        </LogoImageBox>
      </Logo>
      <Navbar />
    </HeaderArea>
  );
}

const HeaderArea = styled.header`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  top: 0;
  background: #fff;
  z-index: 5;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoImageBox = styled.div`
  width: 500px;
  cursor: pointer;

  & img {
    width: 100%;
    height: 250px;
    display: block;
  }
`;

export default Header;
