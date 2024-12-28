import React from "react";
import styled from "styled-components";
import ModalContent from "./ModalContent";
import ModalButton from "./ModalButton";
import { useDispatch } from "react-redux";
import { openModal, closeModal } from "../../features/modalSlice";

const SignupModal = ({ isOpen, content, onConfirm, onCancel }) => {
  const dispatch = useDispatch(); // 항상 호출되도록 위치 변경

  // 모달이 열려 있지 않으면 null 반환
  if (!isOpen) {
    return null;
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel(); // 외부에서 전달받은 취소 동작 실행
    }
    dispatch(closeModal());
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(); // 외부에서 전달받은 확인 동작 실행
    }
    dispatch(closeModal());
  };

  return (
    <ModalBackground>
      <ModalMain>
        <ModalContent>{content}</ModalContent>
        <ModalButtons>
          <ModalButton onClick={handleConfirm}>확인</ModalButton>
          <ModalButton onClick={handleCancel}>취소</ModalButton>
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
  width: ${({ modalWidth }) =>
    modalWidth !== null ? `${modalWidth}px` : "400px"};
  padding: 30px 80px;
  text-align: center;
  background: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export default SignupModal;
