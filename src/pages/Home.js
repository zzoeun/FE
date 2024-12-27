import styled from 'styled-components';
import BookList from '../components/home/BookList';
import Modal from '../components/modal/Modal';
import ModalContent from '../components/modal/ModalContent';
import { useEffect, useState } from 'react';
import Button from '../components/modal/ModalButton';
import ModalButtons from '../components/modal/ModalButtons';
import { useNavigate } from 'react-router';
import axios from 'axios';

const Home = () => {
  const [modal, setModal] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('bearer_token'));
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://project-be.site/api/mypage/getUserInfo', {
          signal: controller.signal,
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();

    return () => {
      controller.abort();
    };
  }, [token]);

  const handleMoveCartPage = () => {
    navigate('/cart');
    setModal(false);
  };

  const handleMoveLoginPage = () => {
    navigate('/login');
    setModal(false);
  };

  let modalBox = (
    <Modal>
      <ModalContent>
        <p>로그인이 필요합니다.</p>
        <p>로그인 페이지로 이동하시겠습니까?</p>
      </ModalContent>
      <ModalButtons>
        <Button onClick={handleMoveLoginPage}>확인</Button>
        <Button onClick={() => setModal(false)}>취소</Button>
      </ModalButtons>
    </Modal>
  );

  if (token) {
    modalBox = (
      <Modal>
        <ModalContent>
          <p>장바구니에 상품을 담았습니다.</p>
          <p>장바구니로 바로 이동하시겠습니까?</p>
        </ModalContent>
        <ModalButtons>
          <Button onClick={handleMoveCartPage}>확인</Button>
          <Button onClick={() => setModal(false)}>취소</Button>
        </ModalButtons>
      </Modal>
    );
  }

  return (
    <Main>
      {modal && modalBox}
      <BookList setModal={setModal} userData={userData} token={token} />
    </Main>
  );
};

const Main = styled.main`
  padding-bottom: 50px;
`;

export default Home;
