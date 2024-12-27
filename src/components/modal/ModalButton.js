import styled from 'styled-components';

const ModalButton = ({ type = 'button', onClick, children }) => {
  return (
    <ButtonStyle type={type} onClick={onClick}>
      {children}
    </ButtonStyle>
  );
};

const ButtonStyle = styled.button`
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

export default ModalButton;
