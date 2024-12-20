import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { closeModal } from '../../features/book/modalSlice';
import ModalContent from './ModalContent';
import Button from './Button';

const Modal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkButtonHandler = () => {
    dispatch(closeModal());
    navigate('/cart');
  };

  const cancelButtonHandler = () => {
    dispatch(closeModal());
  };

  return (
    <ModalBackground>
      <ModalMain>
        <ModalContent>
          <p>장바구니에 상품을 담았습니다.</p>
          <p>장바구니로 바로 이동하시겠습니까?</p>
        </ModalContent>
        <ModalButtons>
          <Button onClick={checkButtonHandler}>확인</Button>
          <Button onClick={cancelButtonHandler}>취소</Button>
        </ModalButtons>
      </ModalMain>
    </ModalBackground>
  );
};

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #00000050;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const ModalMain = styled.div`
  text-align: center;
  background: #fff;
  border-radius: 5px;
  padding: 30px 80px;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 20px;
`;

export default Modal;
