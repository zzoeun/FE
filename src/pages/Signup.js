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
    phoneMessage: "",
  });

  const [isValid, setIsValid] = useState({
    isEmail: false,
    isPassword: false,
    isPasswordConfirm: false,
  });

  // 우편번호 상태
  const [isPostCodeOpen, setIsPostCodeOpen] = useState(false);

  // 우편번호 api
  const handleAddressComplete = (data) => {
    setForm({
      ...form,
      zip_code: data.zonecode,
      main_address: data.address,
    });
    setIsPostCodeOpen(false); // 입력 후 창 닫기
  };

  const togglePostCode = () => {
    setIsPostCodeOpen((prev) => !prev);
  };

  // 입력 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // 프로필 이미지 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setForm({ ...form, profile_image: previewUrl });
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
      setMessages({ ...messages, emailMessage: "" });
      setIsValid({ ...isValid, isEmail: true });
    }
  };

  //이메일 중복 확인
  const onChangeEmailConfirm = async () => {
    if (!form.email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    try {
      const response = await axios.post("/api/emailcheck", {
        email: form.email,
      });

      if (response.data.isDuplicate) {
        setMessages({
          ...messages,
          emailMessage: "이미 사용 중인 이메일입니다.",
        });
        setIsValid({ ...isValid, isEmail: false });
      } else {
        setMessages({
          ...messages,
          emailMessage: "사용 가능한 이메일입니다.",
        });
        setIsValid({ ...isValid, isEmail: true });
      }
    } catch (error) {
      console.error("이메일 확인 실패:", error);
      alert("이메일 중복 확인 중 오류가 발생했습니다.");
    }
  };

  // 비밀번호 유효성 검사
  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    handleChange(e);
    const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,25}$/;

    if (!passwordRegExp.test(currentPassword)) {
      setMessages({
        ...messages,
        passwordMessage:
          "비밀번호는 숫자+영문자+특수문자 조합으로 8자리 이상이여야 합니다.",
      });
      setIsValid({ ...isValid, isPassword: false });
    } else {
      setMessages({
        ...messages,
        passwordMessage: "사용 가능한 비밀번호입니다.",
      });
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

  // DB 전송 로직
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 모든 입력 필드 확인
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

    // 유효성 검사 확인
    if (!isValid.isEmail || !isValid.isPassword || !isValid.isPasswordConfirm) {
      setMessages({
        ...messages,
        formErrorMessage: "이메일 혹은 비밀번호를 확인해주세요.",
      });
      return;
    }

    // FormData 객체 생성
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("phone", form.phone);
    formData.append("zip_code", form.zip_code);
    formData.append("main_address", form.main_address);
    formData.append("details_address", form.details_address);

    // 이미지 파일이 있는 경우
    if (form.profile_image) {
      formData.append("profile_image", form.profile_image);
    }

    try {
      const response = await axios.post("/api/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" }, // 이미지전송해야 해서 multipart 사용
      });

      alert("회원가입이 완료되었습니다!");
      console.log("서버 응답:", response.data);
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

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
      <SignupFlexContainer>
        <SignupFormInput
          type="email"
          name="email"
          onChange={onChangeEmail}
          value={form.email}
        />
        <SignupConfirmButton type="button" onClick={onChangeEmailConfirm}>
          중복 확인
        </SignupConfirmButton>
      </SignupFlexContainer>
      <SignupFormEmailErrorMessage>
        {messages.emailMessage}
      </SignupFormEmailErrorMessage>

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
  max-width: 700px;
  margin: 302px auto;
  padding: 100px 30px;
  border: none;
  background-color: #fff;
  color: #333;
`;

const SignupFormTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #111;
`;

const SignupFormErrorMessage = styled.p`
  font-size: 12px;
  color: #f06569;
  margin-top: 0px;
`;

const SignupFormEmailErrorMessage = styled.p`
  font-size: 12px;
  color: #f06569;
  margin-top: -15px;
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

const SignupFormButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #555555;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 20px;

  &:hover {
    background-color: #000;
  }
`;

const SignupConfirmButton = styled.button`
  padding: 10px 20px;
  height: 42px;
  background-color: #cccccc;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #999999;
  }
`;

const SignupFlexContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
`;
