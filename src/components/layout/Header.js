import styled from 'styled-components';
import Navbar from './Navbar';

function Header() {
  return (
    <HeaderArea>
      <div></div>
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

export default Header;
