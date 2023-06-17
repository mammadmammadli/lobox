import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useSelectStyles } from "./styles";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { BsCheckLg } from "react-icons/bs";

type SelectProps = {
  options: Option[];
};

const Select = ({ options }: SelectProps) => {
  const styles = useSelectStyles();
  const selectRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(0);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    if (selectedIndex === 0) {
      dropdownRef.current?.scrollTo({
        behavior: "smooth",
        top: 0,
      });
    } else if (selectedIndex === options.length - 1) {
      dropdownRef.current?.scrollTo({
        behavior: "smooth",
        top: dropdownRef.current?.scrollHeight,
      });
    }
  }, [selectedIndex, options]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const selectedOption = dropdownRef.current?.querySelector(
      `.${styles["select__dropdown__item--selected"]}`
    );

    if (e.key === "ArrowDown") {
      if (isDropdownVisible && selectedIndex !== -1) {
        setSelectedIndex((prevIndex) => {
          return prevIndex === options.length - 1 ? 0 : prevIndex + 1;
        });

        if (selectedOption) {
          const nextSibling = selectedOption.nextElementSibling;

          if (nextSibling) {
            selectedOption.classList.remove(
              styles["select__dropdown__item--selected"]
            );
            nextSibling.classList.add(
              styles["select__dropdown__item--selected"]
            );
            nextSibling.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: "nearest",
            });
          }
        }
      } else if (!isDropdownVisible) {
        if (dropdownRef.current) {
          dropdownRef.current.style.display = "block";
          setIsDropdownVisible(true);
        }
      }
    } else if (e.key === "ArrowUp") {
      if (isDropdownVisible) {
        setSelectedIndex((prevIndex) =>
          prevIndex <= 0 ? options.length - 1 : prevIndex - 1
        );

        if (selectedOption) {
          const previousSibling = selectedOption.previousElementSibling;

          if (previousSibling) {
            selectedOption.classList.remove(
              styles["select__dropdown__item--selected"]
            );
            previousSibling.classList.add(
              styles["select__dropdown__item--selected"]
            );

            previousSibling.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: "nearest",
            });
          }
        }
      } else {
        if (dropdownRef.current) {
          dropdownRef.current.style.display = "block";
          setIsDropdownVisible(true);
        }
      }
    } else if (e.key === "Enter" && selectedIndex !== -1) {
      setSelectedOption(selectedIndex);

      if (dropdownRef.current) {
        dropdownRef.current.style.display = "none";
        setIsDropdownVisible(false);
      }
    }
  };

  const handleItemClick = (index: number) => {
    setSelectedIndex(index);
    setSelectedOption(index);
    setIsDropdownVisible(true);
  };

  const handleClick = () => {
    if (dropdownRef.current) {
      if (isDropdownVisible) {
        setIsDropdownVisible(false);
        dropdownRef.current.style.display = "none";
      } else {
        setIsDropdownVisible(true);
        dropdownRef.current.style.display = "block";
      }
    }
  };

  const handleBlur = () => {
    if (dropdownRef.current) {
      setIsDropdownVisible(false);
      dropdownRef.current.style.display = "none";
    }
  };

  const selectedOptionLabel = options[selectedOption]?.label;

  return (
    <div
      className={styles.select}
      tabIndex={1}
      ref={selectRef}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      onBlur={handleBlur}
    >
      <div className={styles.select__label}>
        {selectedOptionLabel}
        {isDropdownVisible ? <FiChevronUp /> : <FiChevronDown />}
      </div>
      <div ref={dropdownRef} className={styles.select__dropdown}>
        {options.map((option, index) => {
          const isHighlighted = selectedIndex === index;
          const isSelected = selectedOption === index;

          return (
            <div
              onClick={() => {
                handleItemClick(index);
              }}
              key={option.value}
              className={`${styles.select__dropdown__item} ${
                isHighlighted ? styles["select__dropdown__item--selected"] : ""
              }`}
            >
              {option.label}
              {isSelected && <BsCheckLg />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Select;
