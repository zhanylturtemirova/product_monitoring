import { useCallback, useState } from "react";
import AutomationsList from "../../components/Automations/AutomationsList";
import SitesFilter from "../../components/Filter/AutomationFilter";
import classes from "./style.module.scss";
import { useAppSelector } from "../../app/hooks";
import {
  selectAllAutomations,
  selectAutomationCategory,
  selectAutomationSites,
} from "../../app/automationsSlice";
import left from "../../assets/left.svg";
import right from "../../assets/right.svg";
import arrows from "../../assets/arrows.svg";
import arrows_active from "../../assets/arrows_active.svg";
import display from "../../assets/display.svg";
import display_active from "../../assets/display_active.svg";
import SwitchFilter from "../../components/Filter/SwitchFilter";

function AutomationPage() {
  const sites = useAppSelector(selectAutomationSites);
  const categories = useAppSelector(selectAutomationCategory);

  const automations = useAppSelector(selectAllAutomations);
  const [isMonitoring, setIsMonitoring] = useState<boolean>(false);
  const [isExtractData, setIsExtractData] = useState<boolean>(false);
  const [selectedSites, setSelectedSites] = useState<string[] | []>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[] | []>(
    []
  );
  let results = automations;

  const handleMonitorSwitch = useCallback(
    () => setIsMonitoring((prevState) => !prevState),
    [isMonitoring]
  );
  const handleExtractDataSwitch = useCallback(
    () => setIsExtractData((prevState) => !prevState),
    [isExtractData]
  );

  const handleSitesFilterToggle = useCallback(
    (sites: string[]) => {
      if (sites) {
        setSelectedSites(sites);
      } else {
        setSelectedSites([]);
      }
    },
    [selectedSites, automations]
  );
  const handleCategoryFilterToggle = useCallback(
    (sites: string[]) => {
      if (sites) {
        setSelectedCategories(sites);
      } else {
        setSelectedCategories([]);
      }
    },
    [selectedSites, automations]
  );

  if (isMonitoring) {
    results = [];
    for (let i = 0; i < automations.length; i++) {
      const curTitle = automations[i].title;
      if (curTitle.includes("Monitor")) {
        results.push(automations[i]);
      }
    }
  }
  if (isExtractData) {
    results = [];
    for (let i = 0; i < automations.length; i++) {
      const curTitle = automations[i].title;
      if (curTitle.includes("Extract")) {
        results.push(automations[i]);
      }
    }
  }
  if ((isMonitoring && isExtractData) || (!isMonitoring && !isExtractData)) {
    results = automations;
  }

  if (selectedSites.length >= 1) {
    results = [];
    let tempSites: string[] | [] = [];
    for (let i = 0; i < automations.length; i++) {
      tempSites = automations[i].sites.map((item) => item.title);
      for (let y = 0; y < tempSites.length; y++) {
        if (selectedSites.indexOf(tempSites[y] as never) !== -1) {
          results.push(automations[i]);
        }
      }
    }
  }
  if (selectedCategories.length >= 1) {
    results = [];
    let tempCategories: string[] | [] = [];
    for (let i = 0; i < automations.length; i++) {
      tempCategories = automations[i].categories.map((item) => item.title);
      for (let y = 0; y < tempCategories.length; y++) {
        if (selectedCategories.indexOf(tempCategories[y] as never) !== -1) {
          results.push(automations[i]);
        }
      }
    }
  }

  return (
    <>
      <div className={classes.filters_wrapper}>
        <div className={classes.filters_items_wrapper}>
          <div
            className={classes.left}
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <img src={left} alt="arrow left" />
          </div>
          <div className={classes.filters_items}>
            <SwitchFilter
              title={"Monitoring"}
              isActive={isMonitoring}
              iconDefault={display}
              iconActive={display_active}
              switchToggle={handleMonitorSwitch}
            />
            <SwitchFilter
              title={"Extract Data"}
              isActive={isExtractData}
              iconDefault={arrows}
              iconActive={arrows_active}
              switchToggle={handleExtractDataSwitch}
            />
            <SitesFilter
              title="Filter by Site"
              items={sites}
              itemsFilterToggle={handleSitesFilterToggle}
            />
            <SitesFilter
              title="Filter by Category"
              items={categories}
              itemsFilterToggle={handleCategoryFilterToggle}
            />
          </div>
          <div className={classes.right}>
            <img src={right} alt="arrow right" />
          </div>
        </div>
      </div>
      <div className={classes.content}>
        <AutomationsList automations={results} />
      </div>
    </>
  );
}

export default AutomationPage;
