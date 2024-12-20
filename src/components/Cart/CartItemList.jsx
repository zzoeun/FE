import React from 'react';
import styled from 'styled-components';

const CartItemList = ({ items, selectedItems, setSelectedItems, updateItemQuantity }) => {
  const handleItemSelect = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleQuantityChange = (itemId, change) => {
    const item = items.find(item => item.id === itemId);
    const newQuantity = item.quantity + change;
    
    if (newQuantity < 1) return;
    updateItemQuantity(itemId, newQuantity);
  };
  
  return (
    <ItemListContainer>
      <Items>
        {items.map((item) => (
          <ItemList key={item.id}>
            <ListCheckBox>
              <input 
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={() => {
                  if (selectedItems.includes(item.id)) {
                    setSelectedItems(selectedItems.filter(id => id !== item.id));
                  } else {
                    setSelectedItems([...selectedItems, item.id]);
                  }
                }}
              />
            </ListCheckBox>
            <ListImage></ListImage>
            <ListProduct>
              <ProductTitle>{item.title}</ProductTitle>
              <ProductCount>
                <QuantityList>
                  <MinusBotton onClick={() => updateItemQuantity(item.id, Math.max(1, item.quantity - 1))}> - </MinusBotton>
                  <Quantity> {item.quantity} </Quantity>
                  <PlusButton onClick={() => updateItemQuantity(item.id, item.quantity + 1)}> + </PlusButton>
                </QuantityList>
              </ProductCount>
            </ListProduct>
            <ListPrice>
              <Price>{(item.price * item.quantity).toLocaleString()}</Price>
              <Won>원</Won>
            </ListPrice>
            <DeliveryPrice>
              <DeliveryPriceNumber>
                <Price>3000</Price>
                <Won>원</Won>
              </DeliveryPriceNumber>
              <DeliveryPriceText>배송비</DeliveryPriceText>
            </DeliveryPrice>
          </ItemList>
        ))}
      </Items>
    </ItemListContainer>
  );
};

export default CartItemList;

const ItemListContainer = styled.div`
  padding-top: 30px;
`;

const Items = styled.div`
  width: 100%;
`;

const ItemList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  padding: 30px 0;
  border-bottom: 1px solid #BCCCDC;
  margin: 0;

  &:first-child {
    border-top: 1px solid #BCCCDC;
  }
`;

const Price = styled.span`
  font-size: 1.4rem;
  font-weight: bold;
`;

const Won = styled.span`
  font-size: 1rem;
  margin-left: 4px;
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
  cursor: pointer;
  margin-left: 20px; 
  font-size: 1.5rem;
`;

const Quantity = styled.div`
  margin-left: 20px
`;

const MinusBotton = styled.div`
  cursor: pointer;
  font-size: 1.5rem;
`;
