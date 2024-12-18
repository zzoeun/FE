import styled from 'styled-components';

const Navbar = () => {
  return (
    <Nav>
      <LocationList>
        <LocationButton>로그인</LocationButton>
        <LocationButton>회원가입</LocationButton>
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
  width: 130px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: auto;
`;

const LocationButton = styled.li`
  cursor: pointer;
`;

export default Navbar;
