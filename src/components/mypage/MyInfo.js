import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const MyInfo = ({ userData, setUserData }) => {
  // 초기값을 MtPage에서 받은 `userData`로 설정
  const [form, setForm] = useState(userData || {});

  // 입력 값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // 프로필 이미지 변경 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file); // 이미지 미리보기 URL 생성
      setForm({ ...form, profile_image: previewUrl });
    }
  };

  // 수정 사항 저장 핸들러
  const handleSave = async () => {
    try {
      // 수정된 데이터를 백엔드에 전송,
      const response = await axios.put(`/api/mypage/putUserInfo/{id}`, form, {
        headers: {
          Authorization: `JWT_TOKEN`,
        },
      });

      console.log("수정 성공:", response.data);

      // 부모 컴포넌트에 업데이트된 데이터 전달
      setUserData(form);
      alert("정보가 성공적으로 수정되었습니다.");
    } catch (error) {
      console.error("정보 수정 실패:", error.response || error.message);
      alert("정보 수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <FormContainer>
      {/* 프로필 이미지 렌더링 */}
      <ProfileImageWrapper>
        {form.profile_image ? (
          <ProfileImage src={form.profile_image} alt="프로필 사진" />
        ) : (
          <ProfileImagePlaceholder>프로필 사진</ProfileImagePlaceholder> // 프로필사진 없으면 placeholder로 대체
        )}
        <UploadButton htmlFor="profile-image">이미지 변경</UploadButton>
        <FileInput
          type="file"
          id="profile-image"
          accept="image/*"
          onChange={handleImageChange}
        />
      </ProfileImageWrapper>
      <FormWrapper>
        <FormGroup>
          <label>이름</label>
          <Input name="name" value={form.name || ""} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <label>이메일</label>
          <Input
            name="email"
            value={form.email || ""}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <label>성별</label>
          <Input
            name="gender"
            value={form.gender || ""}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <label>휴대폰번호</label>
          <Input
            name="phone"
            value={form.phone || ""}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <label>우편번호</label>
          <Input
            name="zip_code"
            value={form.zip_code || ""}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <label>기본주소</label>
          <Input
            name="main_address"
            value={form.main_address || ""}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <label>상세주소</label>
          <Input
            name="details_address"
            value={form.details_address || ""}
            onChange={handleChange}
          />
        </FormGroup>
      </FormWrapper>
      <SaveButton onClick={handleSave}>수정하기</SaveButton>
    </FormContainer>
  );
};

export default MyInfo;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

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
const ProfileImageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
`;

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
`;

/* 파일 업로드 버튼 */
const UploadButton = styled.label`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #a8a2b0;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #f3b1b3;
  }
`;

/* 숨겨진 파일 입력 필드 */
const FileInput = styled.input`
  display: none;
`;

const SaveButton = styled.button`
  padding: 10px 20px;
  background-color: #a8a2b0;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #f3b1b3;
  }
`;
