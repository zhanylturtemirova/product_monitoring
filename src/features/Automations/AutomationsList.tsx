import { selectAllAutomations } from "./automationsSlice";
import { useAppSelector } from "../../app/hooks";

function AutomationsList() {
  const automations = useAppSelector(selectAllAutomations);
  console.log("???", automations);
  return <div>AutomationsList</div>;
}

export default AutomationsList;
