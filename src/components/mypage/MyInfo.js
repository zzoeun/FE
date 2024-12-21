import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const MyInfo = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    gender: "",
    phone: "",
    zip_code: "",
    main_address: "",
    details_address: "",
    profile_image: "",
  });

  const [error, setError] = useState("");

  // 데이터 받아오는 로직 mypage.js에서 구현안해도 되는 지 확인 필요
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("/api/mypage/getUserInfo", {
          headers: {
            Authorization: `TOKEN`, // email 형식인지 확인 필요.
          },
        });
        setForm(response.data); // 서버에서 받은 데이터를 상태에 저장
      } catch (error) {
        console.error("사용자 정보를 가져오는 데 실패했습니다:", error);
        alert("로그인한 회원이 아닙니다.");
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <FormContainer>
      {/* 프로필 이미지 렌더링 */}
      {form.profile_image ? (
        <ProfileImage src={form.profile_image} alt="프로필 사진" />
      ) : (
        <ProfileImagePlaceholder>프로필 사진</ProfileImagePlaceholder> // 프로필사진 없으면 placeholder로 대체
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>} {/* 에러 메시지 표시 */}
      <FormWrapper>
        <FormGroup>
          <label>이름</label>
          <Input name="name" value={form.name} readOnly />
        </FormGroup>
        <FormGroup>
          <label>이메일</label>
          <Input name="email" value={form.email} readOnly />
        </FormGroup>
        <FormGroup>
          <label>성별</label>
          <Input name="gender" value={form.gender} readOnly />
        </FormGroup>
        <FormGroup>
          <label>휴대폰번호</label>
          <Input name="phone" value={form.phone} readOnly />
        </FormGroup>
        <FormGroup>
          <label>우편번호</label>
          <Input name="zip_code" value={form.zip_code} readOnly />
        </FormGroup>
        <FormGroup>
          <label>기본주소</label>
          <Input name="main_address" value={form.main_address} readOnly />
        </FormGroup>
        <FormGroup>
          <label>상세주소</label>
          <Input name="details_address" value={form.details_address} readOnly />
        </FormGroup>
      </FormWrapper>
    </FormContainer>
  );
};

export default MyInfo;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* 수직 가운데 정렬 */
  justify-content: center; /* 수평 가운데 정렬 */
  background: #fff;
  padding: 20px;
  border: 1px solid #ddd;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 500px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  width: 100%;

  label {
    display: block;
    font-weight: bold;
    text-align: center;
    margin-bottom: 5px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: center;
  box-sizing: border-box;
`;

/* 프로필 이미지 스타일 */
const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 30px;
`;

/* 프로필 이미지 플레이스홀더 스타일 */
const ProfileImagePlaceholder = styled.div`
  width: 150px;
  height: 150px;
  background-color: #ddd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #555;
  margin-bottom: 30px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-weight: bold;
  margin-bottom: 20px;
`;
