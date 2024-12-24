import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import ValidMyInfo from "./ValidMyInfo";

const MyInfo = ({ userData, setUserData }) => {
  // 초기값을 MyPage에서 받은 `userData`로 설정
  const [form, setForm] = useState(userData || {});
  const [token, setToken] = useState(null);

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
      // JSON 데이터 준비 (이미지 제외)
      const { profile_image, ...jsonData } = form;

      // JSON 형식으로 데이터 전송
      const response = await axios.put(
        `http://13.209.143.163:8080/api/mypage/putUserInfo/{id}`,
        jsonData, // 이미지 제외한 나머지 데이터
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("수정 성공:", response.data);

      // 프로필 이미지가 변경된 경우, 별도로 처리
      if (profile_image instanceof File) {
        const formData = new FormData();
        formData.append("profile_image", profile_image);

        const imageResponse = await axios.post(
          `/api/mypage/uploadProfileImage/${form.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("이미지 업로드 성공:", imageResponse.data);
      }

      // 부모 컴포넌트에 업데이트된 데이터 전달
      setUserData({ ...jsonData, profile_image });
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
      {/* 변경된 입력값 전달 */}
      <ValidMyInfo form={form} handleChange={handleChange} />
      <SaveButton
        onClick={() => {
          handleSave();
        }}
      >
        수정하기
      </SaveButton>
    </FormContainer>
  );
};

export default MyInfo;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between; /* 버튼을 포함해 내용 간격 조정 */
  background: #fff;
  padding: 20px;
  width: 100%;
  max-width: 600px; /* 중앙 정렬 및 크기 제한 */
  margin: 0 auto;
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

/* 숨겨진 파일 입력 필드 */
const FileInput = styled.input`
  display: none;
`;

const SaveButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #555555;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #000;
  }
`;
