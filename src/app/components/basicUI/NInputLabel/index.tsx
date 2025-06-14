import { Input } from "antd";
import React, { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import "./index.css";

interface NInputLabelProps {
  label: string;
  defaultValue?: string | number;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  type?: string;
  prefix?: React.ReactNode;
}

const NInputLabel: React.FC<NInputLabelProps> = ({
  label,
  defaultValue,
  value,
  onChange,
  disabled,
  type = "text",
  ...inputProps
}) => {
  const [hasFocus, setHasFocus] = useState(false);
  const [inputValue, setInputValue] = useState<string | number | undefined>(
    value || defaultValue
  );

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [defaultValue, value]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (type === "number") {
      value = value.replace(/[^0-9]/g, "");
    }
    setInputValue(value);
    if (onChange) {
      onChange({
        ...e,
        target: { ...e.target, value },
      });
    }
  };

  return (
    <div
      className={`input-with-label${inputProps.prefix ? " has-prefix" : ""}`}
    >
      <div className="input-wrapper">
        {type === "password" ? (
          <Input.Password
            {...inputProps}
            value={inputValue}
            disabled={disabled}
            onChange={handleInputChange}
            onFocus={() => setHasFocus(true)}
            onBlur={() => setHasFocus(false)}
            className="input-field"
            {...(inputProps.prefix && {
              prefix: (
                <span style={{ color: "#1f7d53", fontSize: 20 }}>
                  {inputProps.prefix}
                </span>
              ),
            })}
          />
        ) : (
          <Input
            {...inputProps}
            value={inputValue}
            disabled={disabled}
            onChange={handleInputChange}
            onFocus={() => setHasFocus(true)}
            onBlur={() => setHasFocus(false)}
            className="input-field"
            {...(inputProps.prefix && {
              prefix: (
                <span style={{ color: "#1f7d53", fontSize: 20 }}>
                  {inputProps.prefix}
                </span>
              ),
            })}
          />
        )}
        <div
          className={`label
    ${
      hasFocus ||
      (inputValue !== undefined && inputValue !== "") ||
      (defaultValue !== undefined && defaultValue !== "") ||
      disabled
        ? "active"
        : ""
    }
    ${disabled ? "disabled" : ""}`}
        >
          {label}
        </div>
      </div>
    </div>
  );
};

export default NInputLabel;