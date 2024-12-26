import React, { useState } from "react";
import styled from "styled-components";
import DaumPostCode from "react-daum-postcode";

const EnterDirectlyAddress = ({ receiverInfo, onInfoChange }) => {
  // ShippingInfo 쓰기 모드(1)
  const [editedInfo, setEditedInfo] = useState(receiverInfo);
  const [isPostCodeOpen, setIsPostCodeOpen] = useState(false);

  // input에 쓴 내용 저장장
  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    const updatedInfo = { ...editedInfo, [key]: value };
    setEditedInfo(updatedInfo);
    onInfoChange(updatedInfo); // 부모로 변경된 정보 전달
  };

  // 우편번호 api
  const handleAddressComplete = (data) => {
    setEditedInfo({
      ...editedInfo,
      zipCode: data.zonecode,
      mainAddress: data.address,
    });
    setIsPostCodeOpen(false); // 입력 후 창 닫기
  };

  const togglePostCode = () => {
    setIsPostCodeOpen((prev) => !prev);
  };

  console.log("Input data: ", editedInfo);

  return (
    <>
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
              readOnly
            />
            <button className="address-btn" onClick={togglePostCode}>
              주소찾기
            </button>
          </InputPost>
          <InputAddress>
            <input
              type="text"
              id="mainAddress"
              placeholder="기본주소"
              value={editedInfo.mainAddress}
              onChange={handleChange}
              readOnly
            />
            <input
              type="text"
              id="detailsAddress"
              placeholder="상세주소"
              value={editedInfo.detailsAddress}
              onChange={handleChange}
            />
          </InputAddress>
        </div>
      </InputContents>

      {isPostCodeOpen && (
        <ModalOverlay>
          <ModalContainer>
            <button className="close-btn" onClick={togglePostCode}>
              X
            </button>
            <DaumPostCode
              onComplete={handleAddressComplete}
              autoClose={false}
            />
          </ModalContainer>
        </ModalOverlay>
      )}
    </>
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

    background: #cccccc;
    color: #fff;

    border: none;
    border-radius: 4px;

    cursor: pointer;

    &:hover {
      background: #999999;
    }
  }
`;

const InputAddress = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  input {
    width: 100%;
    max-width: 450px;
    min-width: 400px;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 500px;
  max-height: 80%;
  overflow-y: auto;

  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
`;
export default EnterDirectlyAddress;
