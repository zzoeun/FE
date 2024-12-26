import React from "react";
import styled from "styled-components";

const PhoneNumPaymentInfo = () => {
  return (
    <PhoneNumContainer>
      <input type="text" />
      <p>-</p>
      <input type="text" />
      <p>-</p>
      <input type="text" />
    </PhoneNumContainer>
  );
};

const PhoneNumContainer = styled.div`
  display: flex;
  margin-left: 15px;
  margin-top: 10px;
  align-items: center;

  input {
    margin-right: 10px;
    width: 150px;
    height: 30px;
    border: 1px solid #cccccc;
  }

  p {
    margin-right: 10px;
  }
`;

export default PhoneNumPaymentInfo;
