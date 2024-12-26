import styled from 'styled-components';

const Modal = ({ customWidth, customHeight, children }) => {
  return (
    <ModalBackground>
      <ModalInfo style={{ width: `${customWidth}`, height: `${customHeight}` }}>{children}</ModalInfo>
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
  z-index: 5;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalInfo = styled.div`
  background: #fff;
  padding: 40px 100px;
  border-radius: 5px;
  text-align: center;
`;

export default Modal;
