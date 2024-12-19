// 배송 정보
import React, { useState } from "react";
// import styles from "./ShippingInfo.module.css";
import styled from "styled-components";

const ShippingInfo = () => {
  const [chagneRadio, setChangeRadio] = useState(0);

  const onChangeAddressRadio = (e) => {
    setChangeRadio(e.target.value);
  };

  return (
    <ShippingInfoComponent>
      <h3>배송정보</h3>
      <RadioGroup>
        <input
          type="radio"
          id="defaultAddress"
          value={0}
          name="addressRadio"
          onChange={onChangeAddressRadio}
          defaultChecked
        />
        <label>기본 배송지</label>
        <p>|</p>
        <input
          type="radio"
          id="enterDirectlyAddress"
          value={1}
          name="addressRadio"
          onChange={onChangeAddressRadio}
        />
        <label>직접 입력</label>
      </RadioGroup>
      <InputGroup>
        <InputContents>
          <label>받으시는 분</label>
          <p>*</p>
          <input type="text" />
        </InputContents>
        <InputContents>
          <label>휴대폰 번호</label>
          <p>*</p>
          <input type="text" />
        </InputContents>
        <InputContents>
          <label>배송지</label>
          <p>*</p>
          <div>
            <InputPost>
              <input type="text" placeholder="우편번호" />
              <button className="address-btn">주소찾기</button>
            </InputPost>
            <InputAddress>
              <input type="text" placeholder="기본주소" />
              <input type="text" placeholder="상세주소" />
            </InputAddress>
          </div>
        </InputContents>
        <InputContents>
          <select>
            <option>배송메세지를 입력해주세요.</option>
            <option>문 앞에 놓아주세요.</option>
            <option>부재 시 연락 부탁드립니다.</option>
          </select>
        </InputContents>
      </InputGroup>
    </ShippingInfoComponent>
  );
};

const ShippingInfoComponent = styled.div`
  margin: 20px;
  padding: 15px;
  font-size: 15px;

  h3 {
    padding-bottom: 20px;
    font-size: 20px;
    font-weight: bold;

    border-bottom: 2px solid #e0e0e0;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  padding: 20px 0 20px 5px;
  border-bottom: 2px solid #f4f4f4;

  p {
    margin: 0 10px 0 13px;
    color: lightgray;
  }
`;

const InputGroup = styled.div`
  label {
    display: inline-block;
    width: 85px;
  }

  input {
    display: block;
    margin: 8px;
    padding-left: 10px;
    width: 200px;
    height: 45px;

    border: 2px solid #cccccc;
    color: #898989;
  }

  button {
    margin-top: 8px;
    padding: 5px 10px;
    height: 45px;

    background: #8c8d92;
    color: #fff;

    border: none;
    border-radius: 4px;

    cursor: pointer;
  }
`;

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
`;

const InputAddress = styled.div`
  input {
    width: 400px;
  }
`;

export default ShippingInfo;
