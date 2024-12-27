// 결제 금액액
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CheckIcon from "../../icons/check.svg";
import { useNavigate } from "react-router";

const PaymentAmount = ({ paymentInfo, getPaymentData }) => {
  const [isAgreeChecked, setIsAgreeChecked] = useState(false);
  const [isIMPModalOpen, setIsIMPModalOpen] = useState(false);
  const [isSuccessIMPModalOpen, setIsSuccessIMPModalOpen] = useState(false);
  const [isIamportLoaded, setIsIamportLoaded] = useState(false); // IMP 로딩 여부
  const navigate = useNavigate();

  console.log("IMP:", window.IMP);

  useEffect(() => {
    const checkIamport = () => {
      if (window.IMP) {
        setIsIamportLoaded(true);
      } else {
        setTimeout(checkIamport, 100); // 100ms마다 IMP가 로드되었는지 체크
      }
    };

    checkIamport(); // 최초 호출
  }, []);

  const handlePayment = async () => {
    if (!isIamportLoaded) {
      alert("결제 시스템이 준비되지 않았습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    // 데이터 가지고 오기
    const paymentData = await getPaymentData();

    if (!paymentData) {
      alert("결제 데이터를 가져오는 데 실패했습니다.");
      return;
    }

    const {
      name,
      amount,
      buyer_email,
      buyer_name,
      buyer_tel,
      buyer_addr,
      buyer_postcode,
    } = paymentData;

    const IMP = window.IMP;
    IMP.init("imp74831283");

    const today = new Date();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();
    const milliseconds = today.getMilliseconds();
    const makeMerchantUid = `${hours}${minutes}${seconds}${milliseconds}`;

    console.log("");
    console.log("IMPMerChantUid: ", `IMP${makeMerchantUid}`);

    IMP.request_pay(
      {
        pg: "html5_inicis.INIpayTest",
        pay_method: "card",
        merchant_uid: `IMP${makeMerchantUid}`,
        name,
        amount,
        buyer_email,
        buyer_name,
        buyer_tel,
        buyer_addr,
        buyer_postcode,
      },
      (rsp) => {
        if (rsp.success) {
          console.log("결제 성공: ", rsp);
          console.log(rsp.imp_uid);
          setIsIMPModalOpen(false);
          setIsSuccessIMPModalOpen(true);
          setTimeout(() => {
            navigate("/mypage"); // 결제 내역 페이지로 이동
          }, 2000);
        } else {
          alert(`결제에 실패하였습니다. 에러 내용: ${rsp.error_msg}`);
        }
      }
    );
  };

  const handleAgreeClick = () => {
    setIsAgreeChecked((prev) => !prev);
  };

  const handleAgreePayment = () => {};

  return (
    <TotalPaymentWrapper>
      <h3>최종 결제 금액</h3>
      <TotalDetails>
        <div>
          <p>상품금액</p>
          <p>{paymentInfo.totalPrice}원</p>
        </div>
        <div>
          <p>배송비</p>
          <p>{paymentInfo.shippingFee}원</p>
        </div>
        <Total>
          <TotalContent>합계</TotalContent>
          <div>
            <TotalAmount>
              {paymentInfo.totalPrice + paymentInfo.shippingFee}
            </TotalAmount>
            <TotalContent>원</TotalContent>
          </div>
        </Total>
      </TotalDetails>

      <PayButton
        onClick={() => setIsIMPModalOpen(true)}
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

      {isIMPModalOpen && (
        <IMPModalOverlay>
          <IMPModalContent>
            <h2>결제를 진행하시겠습니까?</h2>
            <IMPButton onClick={handlePayment}>결제하기</IMPButton>
            <IMPButton onClick={() => setIsIMPModalOpen(false)}>취소</IMPButton>
          </IMPModalContent>
        </IMPModalOverlay>
      )}

      {isSuccessIMPModalOpen && (
        <IMPModalOverlay>
          <IMPModalContent>
            <h2>결제가 완료되었습니다!</h2>
          </IMPModalContent>
        </IMPModalOverlay>
      )}
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

const IMPModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IMPModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
`;

const IMPButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }

  &:last-child {
    background-color: #6c757d;

    &:hover {
      background-color: #5a6268;
    }
  }
`;

export default PaymentAmount;
