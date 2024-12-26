import styled from 'styled-components';
import BookList from '../components/home/BookList';
import Modal from '../components/modal/Modal';
import ModalContent from '../components/modal/ModalContent';
import { useState } from 'react';
import Button from '../components/modal/ModalButton';
import ModalButtons from '../components/modal/ModalButtons';
import { useNavigate } from 'react-router';

const Home = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const handleCloseModal = () => {
    setModal(false);
  };

  const handleMoveCartPage = () => {
    navigate('/cart');
    setModal(false);
  };

  return (
    <Main>
      {modal && (
        <Modal>
          <ModalContent>
            <p>장바구니에 상품을 담았습니다.</p>
            <p>장바구니로 바로 이동하시겠습니까?</p>
          </ModalContent>
          <ModalButtons>
            <Button onClick={handleMoveCartPage}>확인</Button>
            <Button onClick={handleCloseModal}>취소</Button>
          </ModalButtons>
        </Modal>
      )}
      <BookList setModal={setModal} />
    </Main>
  );
};

const Main = styled.main`
  padding-bottom: 50px;
`;

export default Home;
