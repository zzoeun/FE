import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { closeModal } from '../../features/book/modalSlice';

const CartModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <ModalBackground>
      <Modal>
        <ModalContent>장바구니에 상품을 담았습니다.</ModalContent>
        <ModalContent>장바구니로 바로 이동하시겠습니까?</ModalContent>
        <ModalButtons>
          <Button
            onClick={() => {
              navigate('/cart');
              dispatch(closeModal());
            }}
          >
            확인
          </Button>
          <Button onClick={() => dispatch(closeModal())}>취소</Button>
        </ModalButtons>
      </Modal>
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

const Modal = styled.div`
  width: 500px;
  text-align: center;
  background: #fff;
  border-radius: 5px;
  padding: 30px;
`;

const ModalContent = styled.p`
  font-size: 24px;
  font-weight: bold;
  line-height: 32px;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 20px;
`;

const Button = styled.button`
  background: #555555;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 40px;
  cursor: pointer;

  &:first-child:hover {
    background: #000;
  }

  &:last-child {
    background: #cccccc;

    &:hover {
      background: #999999;
    }
  }
`;

export default CartModal;
