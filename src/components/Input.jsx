import React, { forwardRef } from "react";

interface InputProps {
  className: string;
  value: string;
  onFocus: () => void;
  onChange: () => void;
  onClick: () => void;
}
const Input: React.FC<InputProps> = (
  { className, value, onClick, onFocus, onChange },
  ref
) => {
  return (
    <input
      className={className}
      type="text"
      value={value}
      ref={ref}
      onFocus={onFocus}
      onChange={onChange}
      onClick={onClick}
    />
  );
};

export default forwardRef(Input);
