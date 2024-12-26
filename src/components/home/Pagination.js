import { useState } from 'react';
import styled from 'styled-components';

const Pagination = ({ totalPages, setCurrentPage }) => {
  const [currentActive, setCurrentActive] = useState(0);

  const buttons = [];

  for (let i = 0; i < totalPages; i++) {
    buttons.push(
      <Button
        key={i}
        onClick={() => {
          setCurrentActive(i);
          setCurrentPage(i);
          window.scrollTo(0, 0);
        }}
        style={{ background: `${currentActive === i ? '#656e7f' : '#e0e0e0'}` }}
      ></Button>
    );
  }

  return <ButtonBox>{buttons.length !== 1 && buttons}</ButtonBox>;
};

const ButtonBox = styled.div`
  min-height: 45px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Button = styled.button`
  width: 15px;
  height: 15px;
  border: none;
  border-radius: 50%;
  background: #e0e0e0;
  cursor: pointer;
`;

export default Pagination;
