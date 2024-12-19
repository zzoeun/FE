import React from 'react';
import styled from 'styled-components';

const CartItemList = () => {
  return (
    <ItemListContainer>
      <Items>
        <ItemList>
          <ListCheckBox>
            <input type="checkbox" />
          </ListCheckBox>
          <ListImage></ListImage>
          <ListProduct>
            <ProductTitle>Un conte peut en</ProductTitle>
            <ProductCount>
              <QuantityList>
                <MinusBotton> - </MinusBotton>
                <Quantity> 1 </Quantity>
                <PlusButton> + </PlusButton>
              </QuantityList>
            </ProductCount>
          </ListProduct>
          <ListPrice>
            <Price>18400</Price>
            <Won>원</Won>
          </ListPrice>
          <DeliveryPrice>
            <DeliveryPriceNumber>
              <Price>3000</Price>
              <Won>원</Won>
            </DeliveryPriceNumber>
            <DeliveryPriceText>배송비</DeliveryPriceText>
          </DeliveryPrice>
          <DeleteButton> x </DeleteButton>
        </ItemList>
      </Items>
      <Amount>
        <AmountList>
          <AmountText>상품 금액</AmountText>
          <AmountPrice>
            <Price>18400</Price>
            <Won>원</Won>
          </AmountPrice>
          <AmountPlusButton>+</AmountPlusButton>
          <AmountDeliveryPrice>배송비</AmountDeliveryPrice>
          <AmountPrice>
            <Price>3000</Price>
            <Won>원</Won>
          </AmountPrice>
          <AmountTotalButton>=</AmountTotalButton>
        </AmountList>
        <AmountToTalList>
          <AmountTotal>주문합계</AmountTotal>
          <AmountPrice>
            <Price>21400</Price>
            <Won>원</Won>
          </AmountPrice>
        </AmountToTalList>
      </Amount>
    </ItemListContainer>
  );
};

export default CartItemList;

const ItemListContainer = styled.div`
  padding-top: 30px;
`;

const Items = styled.div`
  width: 100%;
  min-height: 120px;
`;

const Price = styled.span`
  font-size: 1.4rem;
  font-weight: bold;
`;

const Won = styled.span`
  font-size: 1rem;
  margin-left: 4px;
`;

const ItemList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  padding-bottom: 30px;
  border-bottom: 1px solid gray;
`;

const ListCheckBox = styled.div`
  width: 20px;
  height: 20px;
  padding-left: 10px;
`;

const ListImage = styled.div`
  width: 120px;
  height: 120px;
  background-color: pink;
  margin-left: 30px;
`;

const ListProduct = styled.div`
  width: 250px;
  heigth: 160px;
  margin-left: 30px;
`;

const ProductTitle = styled.div`

`;

const ProductCount = styled.div`
  margin-top: 60px;
`;

const ListPrice = styled.div`
  width: 160px;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const DeliveryPrice = styled.div`
  width: 160px;
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-left: 10px;
  padding-top: 15px;
`;

const DeliveryPriceNumber = styled.div`
`;

const DeliveryPriceText = styled.div`
  font-size: 0.7rem;
  margin-top: 5px;
`;

const DeleteButton = styled.div`
  cursor: pointer;
  margin-left: 20px;
  font-size: 1.5rem;
`;

const QuantityList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
`;

const PlusButton = styled.div`
  margin-left: 20px; 
`;

const Quantity = styled.div`
  margin-left: 20px
`;

const MinusBotton = styled.div``;

const Amount = styled.div`
  padding-top: 30px;
  padding-bottom: 20px;
  padding-left: 20px;
  width: 100%;
  display: flex;
  font-size: 1rem;
  border-bottom: 1px solid gray;
  background-color: lightgray;
`;

const AmountList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-left: 10px;
`;

const AmountToTalList = styled.div`
  list-style: none;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-left: 220px;
`;


const AmountText = styled.li`
`;

const AmountPrice = styled.li`
  margin-left: 20px;
  text-align: right;
`;

const AmountPlusButton = styled.li`
  margin-left: 20px;
  font-size: 1.5rem;
`;

const AmountTotalButton = styled.li`
  margin-left: 20px;
  font-size: 1.5rem;
`;

const AmountDeliveryPrice = styled.li`
  margin-left: 20px;
`;
const AmountTotal = styled.li`
`;