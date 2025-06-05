/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Select, Tooltip } from "antd";
import type { SelectProps } from "antd/es/select";
import "./index.css";

interface NSelectProps extends SelectProps<any> {
  label?: string;
  showTooltip?: boolean;
  prefix?: ReactNode;
  className?: string;
}

const NSelect = ({
  options,
  value,
  defaultValue,
  onChange,
  allowClear,
  placeholder,
  disabled,
  style,
  showSearch,
  className,
  mode,
  label,
  maxTagCount,
  maxTagPlaceholder,
  showTooltip = true,
  prefix,
  ...restProps
}: NSelectProps) => {
  const [isLabelFloating, setIsLabelFloating] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setIsLabelFloating(!!value || value === null);
  }, [value]);

  const customTagRender = (props: any) => {
    const { label, value, closable, onClose } = props;
    const tooltipTitle = `${value} - ${label}`;
    const content = (
      <span className="ant-select-selection-item-content">
        {value} - {label}
      </span>
    );

    return showTooltip ? (
      <Tooltip title={tooltipTitle}>
        <span className="ant-select-selection-item">
          {content}
          {closable && (
            <span
              className="ant-select-selection-item-remove"
              onClick={onClose}
            >
              ×
            </span>
          )}
        </span>
      </Tooltip>
    ) : (
      <span className="ant-select-selection-item">
        {content}
        {closable && (
          <span className="ant-select-selection-item-remove" onClick={onClose}>
            ×
          </span>
        )}
      </span>
    );
  };

  return (
    <div
      className={`custom-select-container${prefix ? " has-prefix" : ""} ${isLabelFloating || defaultValue || isFocused ? "focused" : ""
        } ${disabled ? "disabled" : ""}`}
    >
      {label && (
        <label className={`floating-label${prefix ? " floatingIcon" : ""}`}>
          {label}
        </label>
      )}
      <div className="select-prefix-wrapper">
        {prefix && <span className="select-prefix-icon">{prefix}</span>}
        <Select
          allowClear={allowClear}
          defaultValue={defaultValue}
          className={`custom-select${prefix ? " with-prefix" : ""} ${className || ""}`}
          options={options}
          value={value}
          onChange={(val, option) => {
            onChange?.(val, option);
            setIsLabelFloating(!!val || val === null);
          }}
          placeholder={placeholder}
          disabled={disabled}
          style={{ height: "45px", ...style }}
          showSearch={showSearch}
          mode={mode}
          optionFilterProp="label"
          maxTagCount={maxTagCount}
          maxTagPlaceholder={maxTagPlaceholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          tagRender={customTagRender}
          {...restProps}
        />
      </div>
    </div>
  );
};

export default NSelect;
