import React, { useState } from "react";
import styled from "styled-components";

const Sidebar = ({ setSelectedMenu }) => {
  const [activeMenu, setActiveMenu] = useState("myinfo"); // 현재 선택된 메뉴 상태, 선택 메뉴 계속 색상 유지

  const handleMenuClick = (menu) => {
    setActiveMenu(menu); // 선택된 메뉴 업데이트
    setSelectedMenu(menu); // 부모 컴포넌트에 선택된 메뉴 전달
  };

  return (
    <SidebarContainer>
      <MenuGroup>
        <MenuItem
          isActive={activeMenu === "myinfo"}
          onClick={() => handleMenuClick("myinfo")}
        >
          내 정보
        </MenuItem>
        <MenuItem
          isActive={activeMenu === "shoppingcartlist"}
          onClick={() => handleMenuClick("shoppingcartlist")}
        >
          장바구니
        </MenuItem>

        <MenuItem
          isActive={activeMenu === "paymentslist"}
          onClick={() => handleMenuClick("paymentslist")}
        >
          결제목록
        </MenuItem>
        <MenuItem
          isActive={activeMenu === "deleteaccount"}
          onClick={() => handleMenuClick("deleteaccount")}
        >
          회원 탈퇴
        </MenuItem>
      </MenuGroup>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #f5f5f5;
  padding: 30px;
  border-right: 1px solid #ddd;
`;

const MenuGroup = styled.div`
  margin-top: 120px;
`;

const MenuItem = styled.div`
  font-size: 30px;
  margin-bottom: 70px;
  cursor: pointer;
  color: ${(props) =>
    props.isActive
      ? "rgb(0, 0, 0)"
      : "rgb(0, 0, 0)"};
  font-weight: ${(props) =>
    props.isActive ? "bold" : "normal"};

  &:hover {
    color: rgb(0, 0, 0);
    font-weight: bold;
  }
`;
