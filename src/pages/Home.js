import styled from 'styled-components';
import BookList from '../components/home/BookList';

const Home = () => {
  return (
    <Main>
      <BookList />
    </Main>
  );
};

const Main = styled.main`
  padding-bottom: 50px;
`;

export default Home;
