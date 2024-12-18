import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 임포트
import axios from "axios";
import styled from "styled-components";
import DaumPostCode from "react-daum-postcode";

const Signup = () => {
  // const navigate = useNavigate(); // 페이지 이동

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    phone: "",
    zip_code: "",
    main_address: "",
    details_address: "",
    profile_image: null,
  });

  const [messages, setMessages] = useState({
    emailMessage: "",
    passwordMessage: "",
    passwordConfirmMessage: "",
  });

  const [isValid, setIsValid] = useState({
    isEmail: false,
    isPassword: false,
    isPasswordConfirm: false,
  });

  // 입력 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // 프로필 이미지 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, profile_image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // 이메일 유효성 검사
  const onChangeEmail = (e) => {
    const currentEmail = e.target.value;
    handleChange(e);
    const emailRegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegExp.test(currentEmail)) {
      setMessages({
        ...messages,
        emailMessage: "이메일 형식이 올바르지 않습니다.",
      });
      setIsValid({ ...isValid, isEmail: false });
    } else {
      setMessages({ ...messages, emailMessage: "사용 가능한 이메일입니다." });
      setIsValid({ ...isValid, isEmail: true });
    }
  };

  //이메일 중복 확인

  // 비밀번호 유효성 검사
  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    handleChange(e);
    const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,25}$/;

    if (!passwordRegExp.test(currentPassword)) {
      setMessages({
        ...messages,
        passwordMessage:
          "비밀번호는 숫자+영문자+특수문자 조합으로 8자리 이상이어야 합니다.",
      });
      setIsValid({ ...isValid, isPassword: false });
    } else {
      setMessages({ ...messages, passwordMessage: "안전한 비밀번호입니다." });
      setIsValid({ ...isValid, isPassword: true });
    }
  };

  // 비밀번호 동일 유효성 검사
  const onChangePasswordConfirm = (e) => {
    const currentPasswordConfirm = e.target.value;
    handleChange(e);

    if (form.password !== currentPasswordConfirm) {
      setMessages({
        ...messages,
        passwordConfirmMessage: "비밀번호가 일치하지 않습니다.",
      });
      setIsValid({ ...isValid, isPasswordConfirm: false });
    } else {
      setMessages({
        ...messages,
        passwordConfirmMessage: "비밀번호가 일치합니다.",
      });
      setIsValid({ ...isValid, isPasswordConfirm: true });
    }
  };

  // 휴대폰 번호 유효성 검사
  const onChangePhone = (e) => {
    const currentPhone = e.target.value;
    handleChange(e);
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

  //폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();

    // 모든 항목 입력 필요
    const requiredFields = [
      "name",
      "email",
      "password",
      "passwordConfirm",
      "phone",
      "zip_code",
      "main_address",
      "details_address",
    ];

    for (const field of requiredFields) {
      if (!form[field]) {
        setMessages({
          ...messages,
          formErrorMessage: "모든 항목을 입력해주세요.",
        });
        return;
      }
    }

    //이메일과 비밀번호 유효성 검사
    if (!isValid.isEmail || !isValid.isPassword || !isValid.isPasswordConfirm) {
      setMessages({
        ...messages,
        formErrorMessage: "이메일 혹은 비밀번호를 확인해주세요",
      });
      return;
    }

    // 성공 메시지
    alert("회원가입이 완료되었습니다!");
    console.log("회원가입 데이터:", form);
  };

  //DB 전송 로직. 구현되면 확인해보고 위에 폼 제출 핸들러 삭제하고 구현할 것
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (
  //     isValid.isEmail &&
  //     form.password &&
  //     form.password === form.passwordConfirm
  //   ) {
  //     try {
  //       const response = await axios.post("/api/signup", {
  //         name: form.name,
  //         email: form.email,
  //         password: form.password,
  //         phone: form.phone,
  //         zipcode: form.zip_code,
  //         main_address: form.main_address,
  //         details_address: form.details_address,
  //       });

  //       console.log("회원가입 성공 데이터:", response.data);
  //       alert("회원가입이 완료되었습니다!");
  //       // navigate("/login"); // 로그인 페이지로 이동
  //     } catch (error) {
  //       console.error("회원가입 실패:", error);
  //       alert("회원가입 실패했습니다.");
  //     }
  //   } else {
  //     alert("서버 오류: 다시 확인해주세요");
  //   }
  // };

  return (
    <SignupForm onSubmit={handleSubmit} className="signup-form">
      <SignupFormTitle>회원 정보 입력</SignupFormTitle>
      <SignupFormLine />

      <SignupFormLabel>이름</SignupFormLabel>
      <SignupFormInput
        type="text"
        name="name"
        onChange={handleChange}
        value={form.name}
      />

      <SignupFormLabel>이메일</SignupFormLabel>
      <SignupFormInput
        type="email"
        name="email"
        onChange={onChangeEmail}
        value={form.email}
      />
      <SignupFormErrorMessage>{messages.emailMessage}</SignupFormErrorMessage>

      <SignupFormLabel>비밀번호</SignupFormLabel>
      <SignupFormInput
        type="password"
        name="password"
        onChange={onChangePassword}
        value={form.password}
      />
      <SignupFormErrorMessage>
        {messages.passwordMessage}
      </SignupFormErrorMessage>

      <SignupFormLabel>비밀번호 확인</SignupFormLabel>
      <SignupFormInput
        type="password"
        name="passwordConfirm"
        onChange={onChangePasswordConfirm}
        value={form.passwordConfirm}
      />
      <SignupFormErrorMessage>
        {messages.passwordConfirmMessage}
      </SignupFormErrorMessage>

      <SignupFormLabel>휴대폰 번호</SignupFormLabel>
      <SignupFormInput
        type="text"
        name="phone"
        onChange={onChangePhone}
        value={form.phone}
      />
      <SignupFormErrorMessage>{messages.phoneMessage}</SignupFormErrorMessage>

      <SignupFormLabel>우편번호</SignupFormLabel>
      <SignupFormInput
        type="text"
        name="zip_code"
        onChange={handleChange}
        value={form.zip_code}
      />

      <SignupFormLabel>기본 주소</SignupFormLabel>
      <SignupFormInput
        type="text"
        name="main_address"
        onChange={handleChange}
        value={form.main_address}
      />

      <SignupFormLabel>상세 주소</SignupFormLabel>
      <SignupFormInput
        type="text"
        name="details_address"
        onChange={handleChange}
        value={form.details_address}
      />

      <SignupFormLabel>[선택] 프로필 사진</SignupFormLabel>
      <SignupFormInput
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      {form.profile_image && (
        <img
          src={form.profile_image}
          alt="프로필 미리보기"
          style={{ width: "100px", marginTop: "10px" }}
        />
      )}

      <SignupFormErrorMessage>
        {messages.formErrorMessage}
      </SignupFormErrorMessage>

      <SignupFormButton type="submit">가입하기</SignupFormButton>
    </SignupForm>
  );
};

export default Signup;

const SignupForm = styled.form`
  max-width: 500px;
  margin: 50px auto;
  padding: 20px 30px;
  border: none;
  background-color: #fff;
  font-family: "Noto Sans KR", sans-serif;
  color: #333;
`;

const SignupFormTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #111;
`;

const SignupFormErrorMessage = styled.p`
  font-size: 14px;
  color: #777;
  margin-bottom: 30px;
`;

const SignupFormLabel = styled.label`
  display: block;
  font-weight: bold;
  margin: 10px 0 5px;
  font-size: 14px;
`;

const SignupFormLine = styled.hr`
  display: block;
  font-weight: bold;
  margin: 10px 0 5px;
  font-size: 14px;
`;

const SignupFormInput = styled.input`
  width: 100%;
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
