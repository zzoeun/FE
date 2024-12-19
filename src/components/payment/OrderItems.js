// 주문 상품품
import React from "react";
// import styles from "./OrderItems.module.css";
import styled from "styled-components";

const OrderItemsComponent = styled.div`
  margin: 20px;
  padding: 15px;
  font-size: 15px;
`;

const OrderItemHead = styled.div`
  height: 20px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;

  h3 {
    margin-right: 15px;
    // margin-bottom: 30px;
    font-size: 20px;
    font-weight: bold;
  }
  p {
    color: #808080;
    height: 15px;
  }
`;

const OrderItemInfo = styled.div``;

const ItemSort = styled.div`
  padding: 10px 0 25px 10px;
  border-top: 2px solid #e0e0e0;
  background-color: #fbfbfb;
  border-bottom: 2px solid #f4f4f4;

  p {
    font-weight: bolder;
    font-size: 17px;
  }
`;

const ItemContents = styled.div`
  display: flex;
`;

const Items = styled.div``;

const Item = styled.div`
  height: 150px;
  padding: 10px;
  padding-right: 0;
  display: flex;
  align-items: center;

  img {
    width: 120px;
    height: 120px;
    margin-right: 10px;
    background-color: pink;
  }
`;

const ItemAmount = styled.div`
  height: 150px;
  width: 330px;
  padding-top: 10px;
  border-right: 2px solid #f4f4f4;

  p {
    margin: 15px;
    font-size: 14px;
  }
`;

const ItemPrice = styled.div`
  height: 150px;
  width: 155px;
  padding-top: 20px;
  border-right: 2px solid #f4f4f4;

  text-align: center;

  // background-color: beige;

  p {
    font-weight: bold;
  }
`;

const ItemDelivery = styled.div`
  height: 150px;
  width: 155px;
  padding-top: 20px;

  text-align: center;
  // background-color: pink;

  p {
    font-weight: bold;
    margin-bottom: 10px;
  }

  p2 {
    color: #9b9b9b;
  }
`;

// items 금액 계산
const itemsAmountCalc = (items) => {
  var deliveryFee = 3000;
  var total = 0;

  items.map((item) => {
    total += item.price;
  });

  if (total >= 30000) deliveryFee = 0;

  return { total, deliveryFee };
};

// 금액 ,(콤마) 추가하기
const addComma = (price) => {
  const commaPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return commaPrice;
};

const OrderItems = () => {
  const items = [
    {
      imageUrl: "abcdefg",
      name: "Mike",
      amount: 1,
      price: 2500,
    },
    {
      imageUrl: "hey",
      name: "Jake",
      amount: 2,
      price: 10000,
    },
  ];

  const { deliveryFee, total } = itemsAmountCalc(items);

  return (
    <OrderItemsComponent>
      <OrderItemHead>
        <h3>주문상품</h3>
        <p>옵션 및 수량 변경은 장바구니에서만 가능합니다.</p>
      </OrderItemHead>
      <OrderItemInfo>
        <ItemSort>
          <p>FRENCHBOOK</p> {/*종류 생기면 반복하기*/}
        </ItemSort>
        <ItemContents>
          <Items>
            {items.map((item, index) => (
              <Item key={index}>
                <img src={item.imageUrl} alt={item.name} width="50" />
                <ItemAmount>
                  <p>{item.name}</p>
                  <p>{item.amount}개</p>
                </ItemAmount>
                <ItemPrice>
                  <p>{addComma(item.price * item.amount)}원</p>
                </ItemPrice>
              </Item>
            ))}
          </Items>
          <ItemDelivery>
            <p>{addComma(deliveryFee)}원</p>
            <p2>택배 배송안내</p2>
          </ItemDelivery>
        </ItemContents>
      </OrderItemInfo>
    </OrderItemsComponent>
  );
};

export default OrderItems;
