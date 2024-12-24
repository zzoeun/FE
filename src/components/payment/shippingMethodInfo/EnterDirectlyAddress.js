import React, { useState } from "react";
import styled from "styled-components";

const EnterDirectlyAddress = ({ receiverInfo, onInfoChange }) => {
  // ShippingInfo 쓰기 모드(1)
  const [editedInfo, setEditedInfo] = useState(receiverInfo);

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    const updatedInfo = { ...receiverInfo, [key]: value };
    setEditedInfo(updatedInfo);
    onInfoChange(updatedInfo); // 부모로 변경된 정보 전달
  };

  console.log("Input data: ", editedInfo);

  return (
    <div>
      <InputContents>
        <label>받으시는 분</label>
        <p>*</p>
        <input
          type="text"
          id="name"
          value={editedInfo.name}
          onChange={handleChange}
        />
      </InputContents>

      <InputContents>
        <label>휴대폰 번호</label>
        <p>*</p>
        <input
          type="text"
          id="phone"
          value={editedInfo.phone}
          onChange={handleChange}
        />
      </InputContents>

      <InputContents>
        <label>배송지</label>
        <p>*</p>
        <div>
          <InputPost>
            <input
              type="text"
              id="zipCode"
              placeholder="우편번호"
              value={editedInfo.zipCode}
              onChange={handleChange}
            />
            <button className="address-btn">주소찾기</button>
          </InputPost>

          <InputAddress>
            <input
              type="text"
              id="mainAddress"
              placeholder="기본주소"
              value={editedInfo.mainAddress}
              onChange={handleChange}
            />
            <input
              type="text"
              id="detailAddress"
              placeholder="상세주소"
              value={editedInfo.detailsAddress}
              onChange={handleChange}
            />
          </InputAddress>
        </div>
      </InputContents>
    </div>
  );
};

const InputContents = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0 8px 0;

  border-bottom: 2px solid #f4f4f4;

  p {
    color: red;
    margin-right: 45px;
  }

  select {
    margin: 8px 0 8px 10px;
    padding-left: 10px;
    height: 45px;
    width: 530px;

    color: #898989;

    border: 2px solid #cccccc;
  }

  div {
  }
`;

const InputPost = styled.div`
  display: flex;

  input {
    margin-bottom: 0;
  }

  button {
    margin-top: 8px;
    padding: 5px 10px;
    height: 45px;
    width: 85px;

    background: #8c8d92;
    color: #fff;

    border: none;
    border-radius: 4px;

    cursor: pointer;
  }
`;

const InputAddress = styled.div`
  input {
    width: 450px;
  }
`;

export default EnterDirectlyAddress;
