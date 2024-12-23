import styled from 'styled-components';
import BookList from '../components/home/BookList';
import Modal from '../components/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { addBooks } from '../features/bookSlice';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const modal = useSelector((state) => state.modal);

  useEffect(() => {
    const controller = new AbortController();

    // 서버로부터 데이터 가져오기
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('data.json', { signal: controller.signal });
        // 가져온 데이터 전역 state에 저장
        dispatch(addBooks(response.data));
      } catch (error) {
        if (!axios.isCancel(error)) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // 페이지 unmount 시 axios get 요청 취소
    return () => {
      controller.abort();
    };
  }, [dispatch]);

  if (loading) return <LoadingMessage>로딩 중...</LoadingMessage>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

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

const LoadingMessage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorMessage = styled(LoadingMessage)``;

export default Home;
