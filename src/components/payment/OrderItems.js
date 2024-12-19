// 주문 상품품
import React from "react";
// import styles from "./OrderItems.module.css";
import styled from "styled-components";

const OrderItemsComponent = styled.div`
  margin: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  background: #fff;
`;

const Item = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 80px;
    height: 80px;
    margin-right: 10px;
    background-color: red;
  }
`;

const ItemInfo = styled.div`
  p {
    margin: 5px 0;
  }
`;

const OrderItems = () => {
  const items = [
    {
      imageUrl: "abcdefg",
      name: "mike",
      price: 2500,
    },
    {
      imageUrl: "hey",
      name: "jake",
      price: 10000,
    },
  ];

  return (
    <OrderItemsComponent>
      <h3>주문 상품</h3>
      {items.map((item, index) => (
        <Item key={index}>
          <img src={item.imageUrl} alt={item.name} width="50" />
          <ItemInfo>
            <p>{item.name}</p>
            <p>{item.price}원</p>
          </ItemInfo>
        </Item>
      ))}
    </OrderItemsComponent>
  );
};

export default OrderItems;
