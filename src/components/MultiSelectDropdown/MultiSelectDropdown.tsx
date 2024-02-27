import { useEffect, useState, useRef, useCallback } from "react";
import plus from "../../assets/plus.svg";
import classes from "./style.module.scss";

const MultiSelectDropdown = ({
  title,
  options,
  selected,
  toggleOption,
}: {
  title: string;
  options: string[];
  selected: string[];
  toggleOption: (option: string) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [searchItem, setSearchItem] = useState<string>("");
  let results = options;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  const handleSearch = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const { target } = e;
      if (target) {
        setSearchItem((target as HTMLButtonElement).value);
      }
    },
    [searchItem]
  );

  if (searchItem !== "") {
    results = options.filter((option) =>
      option.toString().toLowerCase().includes(searchItem.toLowerCase())
    );
  }
  return (
    <div ref={ref}>
      <div className={classes.dropdown}>
        <div
          className={classes.dropdown__selected}
          onClick={() => setOpen(!isOpen)}
        >
          <img
            src={plus}
            className={classes.dropdown__img}
            alt="dropdown sign"
          />
          <span>{title}</span>
        </div>
        {isOpen && (
          <ul className={classes.dropdown__options}>
            <div className={classes.search}>
              <input
                aria-label="Search"
                id="search-input"
                name="search-input"
                placeholder="Search"
                type="search"
                onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  handleSearch(e);
                }}
              ></input>
            </div>
            {Array.isArray(results) &&
              results.map((option) => {
                const isSelected = selected.includes(option);
                return (
                  <li
                    className={classes.dropdown__option}
                    onClick={() => toggleOption(option)}
                    key={option}
                  >
                    <input
                      type="checkbox"
                      key={option}
                      checked={isSelected}
                      className={classes.option_checkbox}
                      onChange={() => toggleOption(option)}
                    ></input>
                    <span>{option}</span>
                  </li>
                );
              })}
          </ul>
        )}
      </div>
    </div>
  );
};
export default MultiSelectDropdown;
