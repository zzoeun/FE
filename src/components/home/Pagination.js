import { useState } from 'react';
import styled from 'styled-components';

const Pagination = ({ books, dropdownOption, longNovel, middleNovel, shortNovel, booksPerPage, setCurrentPage }) => {
  const [currentActive, setCurrentActive] = useState(0);

  let buttonCount = 0;
  if (dropdownOption === '전체') {
    buttonCount = Math.ceil(books.length / booksPerPage);
  } else if (dropdownOption === '장편소설') {
    buttonCount = Math.ceil(longNovel.length / booksPerPage);
  } else if (dropdownOption === '중편소설') {
    buttonCount = Math.ceil(middleNovel.length / booksPerPage);
  } else {
    buttonCount = Math.ceil(shortNovel.length / booksPerPage);
  }

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
