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

  if (selectedSites.length > 0) {
    // const results1 = automations.filter((automation) => {
    //   const automationSites: string[] = automation.sites.map(
    //     (item) => item.slug
    //   );
    //   const filteredArray: string[] = selectedSites.filter((item) => {
    //     return automationSites.indexOf(item) !== -1;
    //   });
    //   return filteredArray.length > 0;
    // });
    // console.log("results1", results1);
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
