import { memo, useCallback, useState } from "react";
import MultiSelectDropdown from "../MultiSelectDropdown/MultiSelectDropdown";
import classes from "./style.module.scss";
import close from "../../assets/close.svg";

const AutomationFilter = memo(
  ({
    items,
    itemsFilterToggle,
    title,
  }: {
    items: string[];
    itemsFilterToggle: (selected: string[] | []) => void;
    title: string;
  }) => {
    const [selected, setSelected] = useState<string[] | []>([]);
    const toggleOption = (option: string) => {
      setSelected((prevSelected) => {
        let newArray = [...prevSelected];
        if (newArray.includes(option)) {
          newArray = newArray.filter((item) => item !== option);
        } else {
          newArray.push(option);
        }
        itemsFilterToggle(newArray);
        return newArray;
      });
    };

    const selectedItems =
      Array.isArray(selected) &&
      selected.map((selectedItem) => (
        <div
          key={selectedItem}
          className={classes.selected_item}
          onClick={() => handleSelectedItemClick(selectedItem)}
        >
          <span>{selectedItem}</span>{" "}
          <img src={close} alt="selected site logo" />
        </div>
      ));

    const handleSelectedItemClick = useCallback(
      (selectedItem: string) => {
        setSelected((prevSelected) => {
          let newArray = [...prevSelected];
          if (newArray.includes(selectedItem)) {
            newArray = newArray.filter((item) => item !== selectedItem);
          }
          itemsFilterToggle(newArray);
          return newArray;
        });
      },
      [selected]
    );
    return (
      <div className={classes.filter_wrapper}>
        <MultiSelectDropdown
          title={title}
          options={items}
          selected={selected}
          toggleOption={toggleOption}
        />
        <div className={classes.filter_scroll}>
          {selectedItems && selectedItems}
        </div>
      </div>
    );
  }
);

export default AutomationFilter;
