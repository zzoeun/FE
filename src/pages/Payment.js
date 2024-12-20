import React from "react";
import ShippingInfo from "../components/payment/ShippingInfo";
import OrderItems from "../components/payment/OrderItems";
import PaymentMethod from "../components/payment/PaymentMethod";
import TotalPayment from "../components/payment/TotalPayment";

// import styles from "./Payment.module.css";
import styled from "styled-components";

const PaymentPage = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
  width: 1200px;

  h2 {
    // margin-bottom: 15px;
    margin: 20px 30px 40px 30px;
    font-size: 30px;
    font-weight: bold;
  }
`;

const PaymentContents = styled.div`
  margin: 30px 10px 30px 0;
  width: 1500px;
  border: 1.5px solid #e0e0e0;
`;

const PaymentAmount = styled.div`
  float: right;
`;

const Payment = () => {
  return (
    <PaymentPage>
      <PaymentContents>
        <h2>주문 및 결제</h2>
        <ShippingInfo />
        <OrderItems />
        <PaymentMethod />
      </PaymentContents>
      <PaymentAmount>
        <TotalPayment />
      </PaymentAmount>
    </PaymentPage>
  );
};

export default Payment;
