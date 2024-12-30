import React from "react";
import EnterDirectlyAddress from "./EnterDirectlyAddress";
import DefaultAddress from "./DefaultAddress";

const ShippingMethodInfo = ({
  shippingMode,
  userInfo,
  receiverInfo,
  onInfoChange,
}) => {
  const mode = String(shippingMode || "0");

  const ordererInfo = () => {
    console.log("ordererInfo: ", mode);
    switch (mode) {
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
              receiverInfo={receiverInfo}
              onInfoChange={onInfoChange}
            />
          </>
        );
    }
  };
  return <>{ordererInfo()}</>;
};

export default ShippingMethodInfo;
