import React from "react";
import styled from "styled-components";
import ModalContent from "./ModalContent";
import ModalButton from "./ModalButton";

const SignupConfirmModal = ({ isOpen, content, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <ModalBackground>
      <ModalMain>
        <ModalContent>{content}</ModalContent>
        <ModalButtons>
          <ModalButton onClick={onClose}>확인</ModalButton>{" "}
          {/* onClose 함수 연결 */}
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
    modalWidth !== null ? `${modalWidth}px` : "none"};
  height: ${({ modalHeight }) =>
    modalHeight !== null ? `${modalHeight}px` : "none"};
  text-align: center;
  background: #fff;
  border-radius: 5px;
  padding: 30px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
`;

export default SignupConfirmModal;
