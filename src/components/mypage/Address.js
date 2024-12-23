import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import DaumPostCode from "react-daum-postcode";

const Address = () => {
  const [form, setForm] = useState({
    zip_code: "",
    main_address: "",
    details_address: "",
  });

  const [isPostCodeOpen, setIsPostCodeOpen] = useState(false);

  // 우편번호 API 완료 핸들러
  const handleAddressComplete = (data) => {
    setForm({
      ...form,
      zip_code: data.zonecode,
      main_address: data.address,
    });
    setIsPostCodeOpen(false); // 입력 후 창 닫기
  };

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // 우편번호 검색 토글
  const togglePostCode = () => {
    setIsPostCodeOpen((prev) => !prev);
  };

  return (
    <SignupForm>
      <SignupFormLabel>우편번호</SignupFormLabel>
      <SignupFlexContainer>
        <SignupFormInput
          type="text"
          name="zip_code"
          onChange={handleChange}
          value={form.zip_code}
          readOnly
        />
        <SignupConfirmButton type="button" onClick={togglePostCode}>
          우편번호 찾기
        </SignupConfirmButton>
      </SignupFlexContainer>
      {isPostCodeOpen && (
        <DaumPostCode onComplete={handleAddressComplete} autoClose={false} />
      )}

      <SignupFormLabel>기본 주소</SignupFormLabel>
      <SignupFormInput
        type="text"
        name="main_address"
        onChange={handleChange}
        value={form.main_address}
        readOnly
      />

      <SignupFormLabel>상세 주소</SignupFormLabel>
      <SignupFormInput
        type="text"
        name="details_address"
        onChange={handleChange}
        value={form.details_address}
      />

      <SignupFormButton type="submit">저장</SignupFormButton>
    </SignupForm>
  );
};

export default Address;

const SignupForm = styled.form`
  max-width: 700px;
  margin: 20px auto;
  padding: 30px;
  border: none;
  background-color: #fff;
  color: #333;
`;

const SignupFormLabel = styled.label`
  font-weight: bold;
  margin-bottom: 10px;
  display: block;
`;

const SignupFormButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #505c6d;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 20px;

  &:hover {
    background-color: rgb(0, 121, 70);
  }
`;

const SignupConfirmButton = styled.button`
  padding: 10px 20px;
  height: 42px;
  background-color: #505c6d;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: rgb(0, 121, 70);
  }
`;

const SignupFlexContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
`;

const SignupFormInput = styled.input`
  flex: 1;
  width: 100%;
  height: 42px;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 14px;
  color: #333;
  margin-bottom: 15px;

  &::placeholder {
    color: #aaa;
    font-size: 13px;
  }
`;
