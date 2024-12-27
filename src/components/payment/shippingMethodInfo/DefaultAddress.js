import React from "react";
import styled from "styled-components";

const addHyphenPhone = (phoneNum) => {
  var num = phoneNum;
  return num.replace(/^\d[3]-\d[3,4]-\d[4]$/);
};

const DefaultAddress = ({ userInfo }) => {
  console.log("userInfo: ", userInfo);

  return (
    <DefaultAddressContainer>
      <UserName>{userInfo.name}</UserName>
      <UserAddress>
        <p>({userInfo.zipCode})</p>
        <p>{userInfo.mainAddress}</p>
        <p>{userInfo.detailsAddress}</p>
      </UserAddress>
      <UserPhone>{addHyphenPhone(userInfo.phone)}</UserPhone>
    </DefaultAddressContainer>
  );
};

const DefaultAddressContainer = styled.div`
  margin-top: 20px;
  padding: 5px 0 20px 20px;

  border-bottom: 2px solid #f4f4f4;

  p {
    margin-bottom: 8px;
  }
`;

const UserName = styled.p`
  font-weight: bold;
  font-size: 20px;
`;

const UserAddress = styled.div`
  display: flex;

  p {
    margin-right: 7px;
  }
`;

const UserPhone = styled.p`
  color: #999999;
`;

export default DefaultAddress;
