import React, { useState } from "react";
import styled from "styled-components";
import DaumPostCode from "react-daum-postcode";

const EnterDirectlyAddress = ({ userInfo, onInfoChange }) => {
  const [editedInfo, setEditedInfo] = useState(userInfo);
  const [isPostCodeOpen, setIsPostCodeOpen] = useState(false);

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    const updatedInfo = { ...userInfo, [key]: value };
    setEditedInfo(updatedInfo);
    onInfoChange(updatedInfo); // 부모로 변경된 정보 전달
  };

  const handleAddressComplete = (data) => {
    const updatedInfo = {
      ...editedInfo,
      zip_code: data.zonecode,
      main_address: data.address,
    };
    setEditedInfo(updatedInfo);
    onInfoChange(updatedInfo); // 부모로 변경된 정보 전달
    setIsPostCodeOpen(false); // 모달 닫기
  };

  const togglePostCode = () => {
    setIsPostCodeOpen((prev) => !prev);
  };

  return (
    <>
      <InputContents>
        <label>받으시는 분</label>
        <p>*</p>
        <input type="text" id="name" onChange={handleChange} />
      </InputContents>

      <InputContents>
        <label>휴대폰 번호</label>
        <p>*</p>
        <input type="text" id="phone" onChange={handleChange} />
      </InputContents>

      <InputContents>
        <label>배송지</label>
        <p>*</p>
        <div>
          <InputPost>
            <input
              type="text"
              id="zip_code"
              placeholder="우편번호"
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
              id="main_address"
              placeholder="기본주소"
              onChange={handleChange}
              readOnly
            />
            <input
              type="text"
              id="detail_address"
              placeholder="상세주소"
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
  padding: 8px 0;

  border-bottom: 2px solid #f4f4f4;

  p {
    color: red;
    margin-right: 45px;
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
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
`;

export default EnterDirectlyAddress;
