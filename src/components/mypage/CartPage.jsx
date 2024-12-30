import React from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Cart from "../../pages/Cart";

const CartPage = () => {
  return (
    <Container>
      <Sidebar />
      <Content>
        <PageTitle>장바구니</PageTitle>
        <Cart />
      </Content>
    </Container>
  );
};

export default CartPage;

const Container = styled.div`
  display: flex;
  background-color: #f8f9fa;
  min-height: 100vh;
  margin-top: 302px;
  min-width: 1200px;
`;

const Content = styled.div`
  flex: 1;
  padding: 30px;
  background-color: #fff;
  color: #333;
  min-width: 800px;
  overflow-x: auto;
`;

const PageTitle = styled.h1`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  font-size: 2rem;
  text-align: left;
  border-bottom: 1px solid gray;
  margin-top: 0 auto;
`;