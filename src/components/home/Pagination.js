import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Pagination = ({ booksPerPage, setCurrentPage }) => {
  const [currentActive, setCurrentActive] = useState(0);

  const books = useSelector((state) => state.books);

  const buttonCount = Math.ceil(books.length / booksPerPage);

  const buttons = [];

  for (let i = 0; i < buttonCount; i++) {
    buttons.push(
      <Button
        key={i}
        onClick={() => {
          setCurrentActive(i);
          setCurrentPage(i + 1);
          window.scrollTo(0, 0);
        }}
        style={{ background: `${currentActive === i ? '#656e7f' : '#e0e0e0'}` }}
      ></Button>
    );
  }

  return <ButtonBox>{buttons}</ButtonBox>;
};

const ButtonBox = styled.div`
  margin: 0px auto 30px;
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
