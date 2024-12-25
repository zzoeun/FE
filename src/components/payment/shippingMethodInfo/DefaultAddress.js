import React from "react";
import styled from "styled-components";

// 전화번호 - 넣기 (hook으로 빼야지...)
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
  margin: 20px 0 15px 12px;
`;

const UserName = styled.p`
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 20px;
`;

const UserAddress = styled.div`
  display: flex;
  margin-bottom: 5px;

  p {
    margin-right: 7px;1
  }
`;

const UserPhone = styled.p`
  color: #cccccc;
`;

export default DefaultAddress;
