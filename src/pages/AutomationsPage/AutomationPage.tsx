import { useCallback, useState } from "react";
import AutomationsList from "../../components/Automations/AutomationsList";
import SitesFilter from "../../components/Filter/SitesFilter";
import classes from "./style.module.scss";
import { useAppSelector } from "../../app/hooks";
import { selectAllAutomations } from "../../components/Automations/automationsSlice";

function AutomationPage() {
  const automations = useAppSelector(selectAllAutomations);
  const [selectedSites, setSelectedSites] = useState<string[] | []>([]);
  let results = automations;

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
  return (
    <>
      <div className={classes.filters}>
        <SitesFilter sitesFilterToggle={handleSitesFilterToggle} />
      </div>
      <AutomationsList automations={results} />
    </>
  );
}

export default AutomationPage;
