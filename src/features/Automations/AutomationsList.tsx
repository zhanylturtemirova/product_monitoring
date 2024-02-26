import { selectAllAutomations } from "./automationsSlice";
import { useAppSelector } from "../../app/hooks";
import AutomationItem from "./AutomationItem";
import classes from "./style.module.scss";

function AutomationsList() {
  const automations = useAppSelector(selectAllAutomations);
  const renderedAutomations = automations.map((item) => (
    <AutomationItem automation={item} key={item.id} />
  ));
  return <div className={classes.container}>{renderedAutomations}</div>;
}

export default AutomationsList;
