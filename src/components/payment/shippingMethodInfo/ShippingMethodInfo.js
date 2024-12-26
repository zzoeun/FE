import React from "react";
import EnterDirectlyAddress from "./EnterDirectlyAddress";
import DefaultAddress from "./DefaultAddress";

const ShippingMethodInfo = ({ shippingMode, userInfo, onInfoChange }) => {
  const ordererInfo = () => {
    console.log("ordererInfo: ", shippingMode);
    switch (shippingMode) {
      case "0":
        console.log("회원 정보 모드");
        return (
          <>
            <DefaultAddress userInfo={userInfo} />
          </>
        );
      case "1":
        console.log("주문 정보 쓰기 모드");
        return (
          <>
            <EnterDirectlyAddress
              userInfo={userInfo}
              onInfoChange={onInfoChange}
            />
          </>
        );
    }
  };
  return <>{ordererInfo()}</>;
};

export default ShippingMethodInfo;
