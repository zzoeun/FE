import styled from 'styled-components';
import BookList from '../components/home/BookList';
import Modal from '../components/modal/Modal';
import { useSelector } from 'react-redux';

const Home = () => {
  const modal = useSelector((state) => state.modal);

  return (
    <Main>
      {modal && <Modal />}
      <BookList />
    </Main>
  );
};

const Main = styled.main`
  padding-bottom: 50px;
`;

export default Home;
