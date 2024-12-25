// 결제 금액액
import React, { useState } from "react";
import styled from "styled-components";
import CheckIcon from "../../icons/check.svg";

const PaymentAmount = ({ paymentInfo, onPayment }) => {
  const [isAgreeChecked, setIsAgreeChecked] = useState(false);

  const handleAgreeClick = () => {
    setIsAgreeChecked((prev) => !prev);
  };

  return (
    <TotalPaymentWrapper>
      <h3>최종 결제 금액</h3>
      <TotalDetails>
        <div>
          <p>상품금액</p>
          <p>{paymentInfo.totalAmount}원</p>
        </div>
        <div>
          <p>배송비</p>
          <p>{paymentInfo.shippingFee}원</p>
        </div>
        <Total>
          <TotalContent>합계</TotalContent>
          <div>
            <TotalAmount>
              {paymentInfo.totalAmount + paymentInfo.shippingFee}
            </TotalAmount>
            <TotalContent>원</TotalContent>
          </div>
        </Total>
      </TotalDetails>

      <PayButton
        onClick={onPayment}
        disabled={!isAgreeChecked}
        isActive={isAgreeChecked}
      >
        결제하기
      </PayButton>
      <AgreeButton onClick={handleAgreeClick} isActive={isAgreeChecked}>
        <img src={CheckIcon} alt="Check Icon"></img>
        <div>
          <p className="required">주문/결제 진행 필수 동의</p>
          <p>·개인정보수집 및 이용 동의</p>
          <p>·개인정보 판매자 제공 동의</p>
        </div>
      </AgreeButton>
    </TotalPaymentWrapper>
  );
};

const TotalPaymentWrapper = styled.div`
  width: 280px;
  margin: 20px;
  margin-top: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  background: #fff;

  h3 {
    font-weight: bolder;
  }
`;

const TotalDetails = styled.div`
  margin-top: 25px;
  color: #8c8092;

  div {
    display: flex;
    justify-content: space-between;
  }
  p {
    margin: 5px 0;
  }
`;

const Total = styled.div`
  margin-top: 10px;
  padding-top: 10px;

  border-top: 2px solid #f4f4f4;
  color: black;
`;

const TotalContent = styled.p`
  padding-top: 11px;
`;

const TotalAmount = styled.p`
  font-size: 30px;
  font-weight: bold;
`;

const PayButton = styled.button`
  margin-top: 40px;
  padding: 15px 20px;
  width: 235px;
  background: ${(props) => (props.isActive ? "#555555" : "#cccccc")};
  box-shadow: 0 3px 5px lightgray;

  color: white;
  font-weight: bold;
  border: none;

  cursor: ${(props) => (props.isActive ? "pointer" : "not-allowed")};
  font-size: 16px;

  &:hover {
    background: ${(props) => (props.isActive ? "#000" : "#cccccc")};
  }
`;

const AgreeButton = styled.button`
  display: flex;
  margin-top: 20px;
  background-color: #fff;
  border: none;
  cursor: pointer;

  img {
    height: 20px;
    width: 20px;
    background-color: ${(props) =>
      props.isActive ? "#cccccc" : "#fff"}; /* 활성화된 상태일 때 색상 */
    border-radius: 50%; /* 원형으로 만들기 */
    margin-right: 10px;
    transition: background-color 0.3s ease; /* 부드러운 전환 효과 */
  }

  p {
    margin-bottom: 3px;
  }

  .required {
    color: black;
    font-size: 15px;
    font-weight: bold;
  }
`;

export default PaymentAmount;
