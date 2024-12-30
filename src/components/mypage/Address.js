// Address.js
import React, { useState } from "react";
import styled from "styled-components";
import DaumPostCode from "react-daum-postcode";

const Address = ({ form, setForm }) => {
  const [isPostCodeOpen, setIsPostCodeOpen] = useState(false);

  console.log("Address component rendered with form:", form);

  // 우편번호 API 완료 핸들러
  const handleAddressComplete = (data) => {
    console.log("Address API completed with data:", data);
    setForm({
      ...form,
      zipCode: data.zonecode,
      mainAddress: data.address,
    });
    setIsPostCodeOpen(false); // 입력 후 창 닫기
  };

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input changed: ${name} = ${value}`);
    setForm({
      ...form,
      [name]: value,
    });
  };

  // 우편번호 검색 토글
  const togglePostCode = () => {
    console.log("Postcode toggle clicked");
    setIsPostCodeOpen((prev) => !prev);
  };

  return (
    <FormWrapper>
      <FormGroup>
        <Label>우편번호</Label>
        <InputWrapper>
          <Input
            type="text"
            name="zipCode"
            value={form?.zipCode || ""} // form이 undefined일 때 빈 문자열로 대체
            readOnly
            onChange={handleChange}
          />
          <ConfirmButton type="button" onClick={togglePostCode}>
            우편번호 찾기
          </ConfirmButton>
        </InputWrapper>
        {isPostCodeOpen && (
          <DaumPostCode onComplete={handleAddressComplete} autoClose={false} />
        )}
      </FormGroup>

      <FormGroup>
        <Label>기본 주소</Label>
        <Input
          type="text"
          name="mainAddress"
          value={form?.mainAddress || ""}
          readOnly
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup>
        <Label>상세 주소</Label>
        <Input
          type="text"
          name="detailsAddress"
          value={form?.detailsAddress || ""}
          onChange={handleChange}
        />
      </FormGroup>
    </FormWrapper>
  );
};

export default Address;

// 스타일 정의
const FormWrapper = styled.div`
  margin-top: -20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 480px;
  margin-bottom: 15px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px; // 아이디, 이름 등의 그룹과 동일한 간격
  width: 100%;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 14px; // 동일 폰트 크기
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 14px; // 동일 폰트 크기
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center; // 버튼과 입력칸 정렬
  width: 100%;
`;

const ConfirmButton = styled.button`
  padding: 10px 15px;
  height: 42px; // 입력 필드와 동일한 높이
  background-color: #cccccc;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  font-weight: bold;
  white-space: nowrap;

  &:hover {
    background-color: #999999;
  }
`;
