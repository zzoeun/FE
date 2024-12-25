import React, { useState } from "react";
import styled from "styled-components";

const CardPaymentInfo = ({ onCardNumbersChange }) => {
  const [cardParts, setCardParts] = useState(["", "", "", ""]);

  const handleInputChange = (index, value) => {
    if (value.length > 4) return;

    const updatedParts = [...cardParts];
    updatedParts[index] = value.replace(/[^0-9]/g, ""); // 숫자만 입력
    setCardParts(updatedParts);
    onCardNumbersChange(updatedParts.join(""));
  };

  return (
    <div>
      <RadioContainer>
        <label>
          <input
            type="radio"
            value="0"
            id="individual"
            name="cardPayment"
            defaultChecked
          />
          개인
        </label>
        <label>
          <input type="radio" value="1" id="corporation" name="cardPayment" />
          법인
        </label>
      </RadioContainer>
      <InputTextContainer>
        {cardParts.map((part, index) => (
          <input
            key={index}
            type="text"
            value={part}
            maxLength={4}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
      </InputTextContainer>
    </div>
  );
};

const RadioContainer = styled.div`
  display: flex;
  margin-left: 15px;
  margin-top: 10px;

  label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: 10px;
  }

  input {
    margin-right: 5px;
    appearance: none; // 기본 모양 제거
    border-radius: 50%;
    box-sizing: border-box;
    width: 15px;
    height: 15px;
    border: 4px solid #cccccc;
    cursor: pointer;
  }

  input: checked {
    border-color: #999999;
  }
`;

const InputTextContainer = styled.div`
  // background-color: skyblue;
  margin-left: 15px;
  margin-top: 20px;

  input {
    margin-right: 20px;
    width: 150px;
    height: 30px;
    border: 1px solid #cccccc;
  }
`;

export default CardPaymentInfo;
