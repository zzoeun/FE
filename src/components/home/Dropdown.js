import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { changeOption } from '../../features/book/dropdownSlice';

const Dropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownOption = useSelector((state) => state.dropdown);
  const dispatch = useDispatch();

  const dropdownRef = useRef();

  const options = ['전체', '장편소설', '중편소설', '단편소설'];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <DropdownBox ref={dropdownRef} onClick={() => setShowDropdown((showDropdown) => !showDropdown)}>
      <DropdownCurrentOption>
        {dropdownOption} <span>▼</span>
      </DropdownCurrentOption>
      {showDropdown && (
        <OptionList>
          {options.map((option, i) => (
            <Option key={i} onClick={() => dispatch(changeOption(option))}>
              {option}
            </Option>
          ))}
        </OptionList>
      )}
    </DropdownBox>
  );
};

const DropdownBox = styled.div`
  width: 130px;
  height: 30px;
  padding: 8px 20px;
  color: #999999;
  position: relative;
`;

const DropdownCurrentOption = styled.div`
  cursor: pointer;

  & span {
    position: absolute;
    right: 20px;
    color: #5b6373;
  }
`;

const OptionList = styled.ul`
  background: #fff;
  width: 100%;
  border: 1px solid #e0e0e0;
  border-top: none;
  position: absolute;
  left: -1px;
  top: 40px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Option = styled.li`
  cursor: pointer;
`;

export default Dropdown;
