import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { changeOption } from '../../features/dropdownSlice';

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
            <OptionItem
              key={i}
              onClick={() => {
                dispatch(changeOption(option));
                window.scrollTo(0, 0);
              }}
            >
              <p>{option}</p>
              <span></span>
            </OptionItem>
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

const OptionItem = styled.li`
  cursor: pointer;

  & span {
    width: 0%;
    height: 1px;
    display: block;
    background: #5b6373;
    visibility: hidden;
    transition: all 0.5s;
  }

  &:hover span {
    width: 100%;
    visibility: visible;
  }
`;

export default Dropdown;
