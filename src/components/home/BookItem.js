import axios from 'axios';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

function BookItem({ book, setModal }) {
  const navigate = useNavigate();

  const handleAddCartAndOpenModal = () => {
    setModal(true);

    // axios.post('https://project-be.site/cart/add', {
    //   body: {
    //     userId: ,
    //     quantity: 1,
    //     bookId: book.book_id,
    //   },
    // });
  };

  return (
    <Card>
      <Wrapper>
        <CardInfo>
          <CardImageBox>
            <img src={book.bookImageUrl} alt={book.bookTitle} width={'100%'} draggable={false} />
          </CardImageBox>
          <Title>{book.bookTitle}</Title>
          <Price>{book.bookPrice}</Price>
        </CardInfo>
        <CardButtons>
          <Button onClick={() => navigate(`/detail/${book.id}`)}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
              />
            </svg>
          </Button>
          <Button onClick={handleAddCartAndOpenModal}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
              />
            </svg>
          </Button>
          <Button>♥︎</Button>
        </CardButtons>
      </Wrapper>
    </Card>
  );
}

const Card = styled.li`
  width: 240px;
  height: 316px;
  box-shadow: 0 0 0 1px #e0e0e0;
  overflow: hidden;
`;

const Wrapper = styled.div`
  transition: all 0.5s;
  &:hover {
    transform: translateY(-50px);
  }
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  text-align: center;
  padding: 20px;
  color: #999999;
`;

const CardImageBox = styled.div`
  width: 200px;
  height: 200px;
`;

const Title = styled.h4`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Price = styled.p`
  font-size: 20px;
  color: #656e7f;
`;

const CardButtons = styled.div`
  height: 50px;
  display: flex;
  background: #f2f2f2;
`;

const Button = styled.button`
  width: 100%;
  height: 100%;
  background: transparent;
  color: #b8b8b8;
  border: none;
  cursor: pointer;

  & svg {
    width: 30px;
  }

  &:last-child {
    border-right: none;
    font-size: 40px;
    padding-bottom: 4px;
    &:hover {
      color: #f06569;
    }
  }

  &:hover {
    background: #d8d8d8;
    color: #fff;
  }
`;

export default BookItem;
