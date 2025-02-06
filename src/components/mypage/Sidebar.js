import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ setSelectedMenu = () => {} }) => {
  const [activeMenu, setActiveMenu] = useState("myinfo"); // 현재 선택된 메뉴 상태, 선택 메뉴 계속 색상 유지
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === "/mypage/cartpage") {
      setActiveMenu("cartpage");
      setSelectedMenu("cartpage");
    } else if (path === "/mypage") {
      if (activeMenu === "cartpage") {
        setActiveMenu("myinfo");
        setSelectedMenu("myinfo");
      }
    }
  }, [location.pathname]);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    setSelectedMenu(menu);
  
    switch (menu) {
      case "cartpage":
        navigate("/mypage/cartpage");
        break;
      case "deleteaccount":
        navigate("/mypage", { state: { menu: "deleteaccount" } });
        break;
      case "myinfo":
        navigate("/mypage", { state: { menu: "myinfo" } });
        break;
      default:
        navigate("/mypage");
    }
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
          isActive={activeMenu === "cartpage"}
          onClick={() => handleMenuClick("cartpage")}
        >
          장바구니
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
  width: 230px;
  background-color: #f5f5f5;
  padding: 30px;
  border-right: 1px solid #ddd;
`;

const MenuGroup = styled.div`
  margin-top: 120px; /* 메뉴를 전체적으로 아래로 이동 */
`;

const MenuItem = styled.div`
  font-size: 30px;
  margin-bottom: 70px;
  cursor: pointer;
  color: ${(props) =>
    props.isActive
      ? "rgb(0, 0, 0)"
      : "rgb(0, 0, 0)"}; /* 선택된 메뉴 색상 변경 */
  font-weight: ${(props) =>
    props.isActive ? "bold" : "normal"}; /* 선택된 메뉴 굵게 */

  &:hover {
    color: rgb(0, 0, 0);
    font-weight: bold;
  }
`;
