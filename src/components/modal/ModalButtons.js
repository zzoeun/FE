import styled from 'styled-components';

const ModalButtons = ({ children }) => {
  return <ModalButtonsArea>{children}</ModalButtonsArea>;
};

const ModalButtonsArea = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 30px;
`;

export default ModalButtons;
