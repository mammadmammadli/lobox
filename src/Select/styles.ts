import { createUseStyles } from "react-jss";

export const useSelectStyles = createUseStyles({
  select: {
    position: "relative",
    width: "250px",
    borderRadius: "8px",
    cursor: "pointer",
    border: "1px solid #e3e3e3",

    "&:focus": {
      outline: "-webkit-focus-ring-color auto 1px",
    },
  },
  "select--active": {},
  select__label: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "6px 10px",
  },
  select__dropdown: {
    display: "none",
    position: "absolute",
    top: "calc(100% + 4px)",
    left: "0",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "8px",
    width: "250px",
    height: "100px",
    maxHeight: "100px",
    overflowY: "auto",
  },
  "select__dropdown__item--selected": {
    backgroundColor: "rgba(0, 46, 255, 0.24)",
    color: "blue",
  },
  select__dropdown__item: {
    borderRadius: "4px",
    padding: "2px 4px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "&:hover": {
      backgroundColor: "rgba(0, 46, 255, 0.24)",
      color: "blue",
    },
  },
});
