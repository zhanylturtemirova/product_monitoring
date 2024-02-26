import { Automation } from "./types";
import classes from "./style.module.scss";

function AutomationItem({ automation }: { automation: Automation }) {
  const logo = automation.sites[0].logoSmall2x;
  const title = automation.title;
  const description = automation.shortDescription;
  return (
    <div className={` ${classes.item}, ${classes.item_col_4}`}>
      <img src={logo} alt="logo image" className={classes.logo} />
      <h3 className={classes.title}>{title}</h3>
      <p className={classes.description}>{description}</p>
    </div>
  );
}

export default AutomationItem;
