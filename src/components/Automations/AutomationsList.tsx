import AutomationItem from "./AutomationItem";
import classes from "./style.module.scss";
import { Automation } from "../../types";

function AutomationsList({ automations }: { automations: Automation[] }) {
  const renderedAutomations = automations.map((item) => (
    <AutomationItem automation={item} key={item.id} />
  ));
  return <div className={classes.container}>{renderedAutomations}</div>;
}

export default AutomationsList;
