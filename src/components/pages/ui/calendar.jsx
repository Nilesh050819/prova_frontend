import React, { useState } from "react";
import DatePicker from "react-date-picker";

export function Calendar({ selected, onSelect }) {
  const [value, setValue] = useState(selected || new Date());

  return (
    <div>
      <DatePicker
        value={value}
        onChange={(date) => {
          setValue(date);
          onSelect(date);
        }}
      />
    </div>
  );
}