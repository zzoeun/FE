import styled from 'styled-components';
import BookList from '../components/home/BookList';
import CartModal from '../components/home/CartModal';
import { useSelector } from 'react-redux';

const Home = () => {
  const modal = useSelector((state) => state.modal);

  return (
    <Main>
      {modal && <CartModal />}
      <BookList />
    </Main>
  );
};

const Main = styled.main`
  padding-bottom: 50px;
`;

export default Home;
