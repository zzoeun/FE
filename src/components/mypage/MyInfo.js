import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import ValidMyInfo from "./ValidMyInfo"; // ValidMyInfo import
import Address from "./Address"; // Address import

const MyInfo = () => {
  const [token, setToken] = useState(localStorage.getItem("bearer_token"));
  const [form, setForm] = useState({
    userId: "",
    userName: "",
    email: "",
    phone: "",
    gender: "",
    image: "",
    zipCode: "",
    mainAddress: "",
    detailsAddress: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://project-be.site/api/mypage/getUserInfo",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const user = response.data.data;
        setForm({
          userId: user.userId,
          userName: user.userName,
          email: user.email,
          phone: user.phone,
          gender: user.gender,
          image: user.profileImage,
          zipCode: user.zipCode,
          mainAddress: user.mainAddress,
          detailsAddress: user.detailsAddress,
        });
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
        alert("사용자 정보를 불러오는 데 실패했습니다.");
      }
    };

    fetchUserData();
  }, [token]);

  console.log("MyInfo component rendered with form:", form);

  // 프로필 이미지 변경 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setForm({ ...form, profileImage: previewUrl });
    }
  };

  // 수정 사항 저장 핸들러
  const handleSave = async () => {
    try {
      await axios.put(
        `https://project-be.site/api/mypage/putUserInfo/${form.userId}`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("정보가 성공적으로 수정되었습니다.");
    } catch (error) {
      console.error("정보 수정 실패:", error);
      alert("정보 수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <FormContainer>
      {/* 프로필 이미지 렌더링 */}
      <ProfileImageWrapper>
        {form.image ? (
          <ProfileImage src={form.image} alt="프로필 사진" />
        ) : (
          <ProfileImagePlaceholder>프로필 사진</ProfileImagePlaceholder>
        )}
        <UploadButton htmlFor="profile-image">이미지 변경</UploadButton>
        <FileInput
          type="file"
          id="profile-image"
          accept="image/*"
          onChange={handleImageChange}
        />
      </ProfileImageWrapper>

      <ValidMyInfo
        form={form}
        handleChange={(e) =>
          setForm({ ...form, [e.target.name]: e.target.value })
        }
      />
      <Address form={form} setForm={setForm} />

      <SaveButton onClick={handleSave}>수정하기</SaveButton>
    </FormContainer>
  );
};

export default MyInfo;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 20px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

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

const UploadButton = styled.label`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #cccccc;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
`;

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
