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

const DefaultAddressContainer = styled.div``;

const UserName = styled.p``;

const UserAddress = styled.div`
  display: felx;
`;

const UserPhone = styled.p``;

export default DefaultAddress;
