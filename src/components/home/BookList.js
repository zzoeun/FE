import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import BookItem from './BookItem';
import Pagination from './Pagination';
import axios from 'axios';

const BookList = ({ setModal }) => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dropdownOption = useSelector((state) => state.dropdown);

  const fetchData = async (controller) => {
    let booksUrl = 'https://project-be.site/books';

    if (dropdownOption === '전체') {
      booksUrl = 'https://project-be.site/books';
    } else {
      booksUrl = `https://project-be.site/books/category/${dropdownOption}`;
    }

    setLoading(true);

    try {
      const response = await axios.get(`${booksUrl}?page=${currentPage}`, {
        signal: controller.signal,
      });
      const data = response.data;
      setBooks(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller);

    return () => {
      controller.abort();
    };
  }, [currentPage, dropdownOption]);

  useEffect(() => {
    setCurrentPage(0);
  }, [dropdownOption]);

  if (loading) return <LoadingMessage>로딩 중...</LoadingMessage>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <section>
      <BookListTitle>오늘의 책 [Today's Book]</BookListTitle>
      <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <CardList>
        {books.map((book) => (
          <BookItem key={book.id} book={book} setModal={setModal} />
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

const LoadingMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ErrorMessage = styled(LoadingMessage)``;

export default BookList;
