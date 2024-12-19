import styled from 'styled-components';
import BookList from '../components/home/BookList';
// import CartModal from '../components/home/CartModal';

const Home = () => {
  return (
    <Main>
      {/* <CartModal /> */}
      <BookList />
    </Main>
  );
};

const Main = styled.main`
  padding-bottom: 50px;
`;

export default Home;
