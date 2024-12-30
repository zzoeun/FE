import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import BookItem from './BookItem';
import Pagination from './Pagination';
import axios from 'axios';

const BookList = ({ setModal, userData, token }) => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const dropdownOption = useSelector((state) => state.dropdown);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      let booksUrl = 'https://project-be.site/books';

      if (dropdownOption === '전체') {
        booksUrl = 'https://project-be.site/books';
      } else {
        booksUrl = `https://project-be.site/books/category/${dropdownOption}`;
      }

      try {
        const response = await axios.get(`${booksUrl}?page=${currentPage}`, {
          signal: controller.signal,
        });
        const data = response.data;
        setBooks(data.content);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [currentPage, dropdownOption]);

  return (
    <section>
      <BookListTitle>오늘의 책 [Today's Book]</BookListTitle>
      <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <CardList>
        {books?.map((book) => (
          <BookItem 
            key={book.bookId} 
            book={book} 
            setModal={setModal} 
            userData={userData} 
            token={token} 
          />
        ))}
      </CardList>
    </section>
  );
};

const BookListTitle = styled.h2`
  color: #656e7f;
  font-size: 32px;
  text-align: center;
  letter-spacing: 2px;
  margin: 390px auto 50px;
`;

const CardList = styled.ul`
  width: 1204px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
`;

export default BookList;
