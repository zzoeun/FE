import styled from 'styled-components';

function BookItem({ book }) {
  return (
    <Card key={book.book_id}>
      <div>
        <CardInfo>
          <CardImageBox>
            <img src='https://placehold.co/100' alt='placehold' width={'100%'} draggable={false} />
          </CardImageBox>
          <CardTitle>{book.title}</CardTitle>
          <CardPrice>{book.price}</CardPrice>
        </CardInfo>
        <CardButtons>
          <Button>상세보기</Button>
          <Button>장바구니</Button>
        </CardButtons>
      </div>
    </Card>
  );
}

const Card = styled.li`
  width: 240px;
  height: 320px;
  box-shadow: 0 0 0 1px #e0e0e0;
  overflow: hidden;
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  height: 320px;
  text-align: center;
`;

const CardImageBox = styled.div`
  width: 200px;
  height: 200px;
`;

const CardTitle = styled.h4`
  height: 32px;
`;

const CardPrice = styled.p`
  font-size: 20px;
`;

const CardButtons = styled.div`
  height: 40px;
  display: flex;
  justify-content: center;
  background: #e0e0e0;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  cursor: pointer;
`;

export default BookItem;
