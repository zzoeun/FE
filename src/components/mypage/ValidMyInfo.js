import React from "react";
import styled from "styled-components";
import Address from "./Address";

const ValidMyInfo = ({ form, handleChange }) => {
  const [messages, setMessages] = React.useState({
    emailMessage: "",
    phoneMessage: "",
  });

  const [isValid, setIsValid] = React.useState({
    isEmail: false,
    isPhone: false,
  });

  // 이메일 유효성 검사
  const onChangeEmail = (e) => {
    const currentEmail = e.target.value;
    handleChange(e); // 부모 상태 업데이트
    const emailRegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegExp.test(currentEmail)) {
      setMessages({
        ...messages,
        emailMessage: "이메일 형식이 올바르지 않습니다.",
      });
      setIsValid({ ...isValid, isEmail: false });
    } else {
      setMessages({ ...messages, emailMessage: "" });
      setIsValid({ ...isValid, isEmail: true });
    }
  };

  // 휴대폰 번호 유효성 검사
  const onChangePhone = (e) => {
    const currentPhone = e.target.value;
    handleChange(e); // 부모 상태 업데이트
    const phoneRegExp = /^[0-9]{3}-?[0-9]{4}-?[0-9]{4}$/;

    if (!phoneRegExp.test(currentPhone)) {
      setMessages({
        ...messages,
        phoneMessage: "휴대폰 번호는 숫자만 입력 가능합니다.",
      });
      setIsValid({ ...isValid, isPhone: false });
    } else {
      setMessages({ ...messages, phoneMessage: "" });
      setIsValid({ ...isValid, isPhone: true });
    }
  };

  return (
    <FormContainer>
      <FormWrapper>
        <FormGroup>
          <Label>아이디</Label>
          <Input
            name="userId"
            value={form.userId || ""}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>이름</Label>
          <Input
            name="userName"
            value={form.userName || ""}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>성별</Label>
          <Input
            name="gender"
            value={form.gender || ""}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>이메일</Label>
          <Input
            name="email"
            value={form.email || ""}
            onChange={onChangeEmail}
          />
          <Message>{messages.emailMessage}</Message>
        </FormGroup>

        <FormGroup>
          <Label>휴대폰번호</Label>
          <Input
            name="phone"
            value={form.phone || ""}
            onChange={onChangePhone}
          />
          <Message>{messages.phoneMessage}</Message>
        </FormGroup>
      </FormWrapper>
    </FormContainer>
  );
};

export default ValidMyInfo;

// 스타일 정의
const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 10px;
  padding: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  width: 100%;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 14px;
`;

const Message = styled.p`
  font-size: 12px;
  color: #f06569;
  margin-top: 5px;
`;

const ConfirmButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #cccccc;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #999999;
  }
`;
