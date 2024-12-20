import styled from 'styled-components';

const ModalContent = ({ children }) => {
  return <ModalContentStyle>{children}</ModalContentStyle>;
};

const ModalContentStyle = styled.div`
  font-size: 24px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default ModalContent;
