import React, { useState } from "react";
import styled from "styled-components";
import DaumPostCode from "react-daum-postcode";

const Address = () => {
  const [form, setForm] = useState({
    zip_code: "",
    main_address: "",
    details_address: "",
  });

  const [isPostCodeOpen, setIsPostCodeOpen] = useState(null);

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
    <FormWrapper>
      <FormGroup>
        <Label>우편번호</Label>
        <FlexContainer>
          <Input
            type="text"
            name="zip_code"
            value={form.zip_code}
            readOnly
            onChange={handleChange}
          />
          <ConfirmButton type="button" onClick={togglePostCode}>
            우편번호 찾기
          </ConfirmButton>
        </FlexContainer>
        {isPostCodeOpen && (
          <DaumPostCode onComplete={handleAddressComplete} autoClose={false} />
        )}
      </FormGroup>

      <FormGroup>
        <Label>기본 주소</Label>
        <Input
          type="text"
          name="main_address"
          value={form.main_address}
          readOnly
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup>
        <Label>상세 주소</Label>
        <Input
          type="text"
          name="details_address"
          value={form.details_address}
          onChange={handleChange}
        />
      </FormGroup>
    </FormWrapper>
  );
};

export default Address;

// 스타일 정의
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  margin-bottom: 15px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  text-align: left;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
`;

const FlexContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const ConfirmButton = styled.button`
  padding: 10px 15px; /* 기존 20px에서 줄임 */
  height: 42px;
  background-color: #cccccc;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  font-weight: bold;
  white-space: nowrap; /* 텍스트가 줄바꿈되지 않도록 설정 */

  &:hover {
    background-color: #999999;
  }
`;
