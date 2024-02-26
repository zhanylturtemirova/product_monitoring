import { useCallback, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectAutomationSites } from "../Automations/automationsSlice";
import MultiSelectDropdown from "../MultiSelectDropdown/MultiSelectDropdown";
import classes from "./style.module.scss";
import close from "../../assets/close.svg";

const SitesFilter = ({
  sitesFilterToggle,
}: {
  sitesFilterToggle: (selected: string[] | []) => void;
}) => {
  const sites = useAppSelector(selectAutomationSites);
  const [selected, setSelected] = useState<string[] | []>([]);
  const toggleOption = (option: string) => {
    setSelected((prevSelected) => {
      const newArray = [...prevSelected];
      if (newArray.includes(option)) {
        return newArray.filter((item) => item !== option);
      } else {
        newArray.push(option);
        return newArray;
      }
    });
    sitesFilterToggle(selected);
  };

  const selectedSites =
    Array.isArray(selected) &&
    selected.map((selectedItem) => (
      <div
        className={classes.selected_item}
        onClick={() => handleSelectedItemClick(selectedItem)}
      >
        <span>{selectedItem}</span> <img src={close} alt="selected site logo" />
      </div>
    ));

  const handleSelectedItemClick = useCallback(
    (selectedItem: string) => {
      setSelected((prevSelected) => {
        let newArray = [...prevSelected];
        if (newArray.includes(selectedItem)) {
          newArray = newArray.filter((item) => item !== selectedItem);
        }
        return newArray;
      });
      sitesFilterToggle(selected);
    },
    [selected]
  );
  console.log("selected", selected);
  return (
    <div className={classes.filter_wrapper}>
      <MultiSelectDropdown
        title="Filter By Site"
        options={sites}
        selected={selected}
        toggleOption={toggleOption}
      />
      {selectedSites && selectedSites}
    </div>
  );
};

export default SitesFilter;
