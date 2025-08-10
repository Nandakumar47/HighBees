import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { useClickOutside } from "../../../hooks/common/useClickOutside";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  placeholder?: string;
}

type ParsedOption = { value: string; label: string };

const Select: React.FC<SelectProps> = ({
  label,
  error,
  helperText,
  className = "",
  id,
  children,
  disabled,
  value,
  onChange,
  ...props
}) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  const containerRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);

  const getTextFromNode = useCallback((node: React.ReactNode): string => {
    if (node === null || node === undefined || typeof node === "boolean")
      return "";
    if (typeof node === "string" || typeof node === "number")
      return String(node);
    if (Array.isArray(node)) return node.map(getTextFromNode).join("");
    if (React.isValidElement(node)) return getTextFromNode(node.props.children);
    return "";
  }, []);

  const options: ParsedOption[] = useMemo(() => {
    const childrenArray = React.Children.toArray(children) as Array<
      React.ReactElement<{
        value?: string | number;
        children?: React.ReactNode;
      }>
    >;
    return childrenArray
      .filter((child) => child && child.type === "option")
      .map((child) => {
        const labelRaw = getTextFromNode(child.props.children);
        const label = labelRaw.replace(/\s+/g, " ").trim();
        const valueStr = String(child.props.value ?? label);
        return { value: valueStr, label };
      });
  }, [children, getTextFromNode]);

  const selectedIndex = useMemo(
    () => options.findIndex((opt) => opt.value === String(value ?? "")),
    [options, value]
  );
  const selectedOption =
    selectedIndex >= 0 ? options[selectedIndex] : undefined;

  useEffect(() => {
    if (isOpen) {
      setHighlightIndex(selectedIndex >= 0 ? selectedIndex : 0);
    }
  }, [isOpen, selectedIndex]);

  const baseFieldClasses =
    "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed";
  const errorClasses = error
    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
    : "border-gray-300";
  const fieldClasses = `${baseFieldClasses} ${errorClasses} ${className}`;

  const handleSelect = (newValue: string) => {
    if (disabled) return;
    // Fire the standard onChange so callers don't have to change code
    if (onChange) {
      const syntheticEvent = {
        target: { value: newValue, name: props.name },
      } as unknown as React.ChangeEvent<HTMLSelectElement>;
      onChange(syntheticEvent);
    }
    setIsOpen(false);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => Math.min(prev + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const opt = options[highlightIndex];
      if (opt) handleSelect(opt.value);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  return (
    <div className="space-y-2" ref={containerRef}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      {/* Field */}
      <div className="relative">
        <button
          id={selectId}
          type="button"
          className={`${fieldClasses} text-left flex items-center justify-between`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={`${selectId}-listbox`}
          disabled={disabled}
          onClick={() => setIsOpen((o) => !o)}
          onKeyDown={onKeyDown}
        >
          <span className="truncate">
            {selectedOption ? (
              selectedOption.label
            ) : // Show placeholder if provided
            typeof props.placeholder === "string" && props.placeholder ? (
              <span className="text-gray-400">{props.placeholder}</span>
            ) : (
              ""
            )}
          </span>
          <ChevronDown className="h-5 w-5 text-gray-400 ml-3 flex-shrink-0" />
        </button>

        {/* Dropdown */}
        {isOpen && (
          <ul
            id={`${selectId}-listbox`}
            role="listbox"
            className="absolute z-20 mt-2 w-full max-h-60 overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg focus:outline-none divide-y divide-gray-100"
          >
            {options.map((opt, idx) => {
              const isSelected = String(value ?? "") === opt.value;
              const isHighlighted = idx === highlightIndex;
              return (
                <li
                  key={opt.value + idx}
                  role="option"
                  aria-selected={isSelected}
                  className={`flex items-center justify-between px-3 py-2 cursor-pointer text-sm transition-colors ${
                    isHighlighted
                      ? "bg-primary-50 text-primary-700"
                      : isSelected
                      ? "bg-gray-50 text-gray-900"
                      : "text-gray-700"
                  }`}
                  onMouseEnter={() => setHighlightIndex(idx)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleSelect(opt.value)}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected && (
                    <Check className="h-4 w-4 text-primary-600 ml-2" />
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default Select;
