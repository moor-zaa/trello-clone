import React, { FC, useState } from "react";

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const EditableText: FC<EditableTextProps> = ({
  onChange,
  value,
  className,
}) => {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleBlur = () => {
    if (inputValue.trim() !== "") {
      onChange(inputValue);
    }

    setEditing(false);
  };

  if (editing) {
    return (
      <input
        autoFocus
        className={className}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={(e) => e.key === "Enter" && handleBlur()}
      />
    );
  }

  return (
    <div className={className} onClick={() => setEditing(true)}>
      {inputValue}
    </div>
  );
};

export default EditableText;
