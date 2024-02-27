import classes from "./style.module.scss";

export const SwitchFilter = ({
  title,
  isActive,
  iconDefault,
  iconActive,
  switchToggle,
}: {
  title: string;
  isActive: boolean;
  iconDefault: string;
  iconActive: string;
  switchToggle: (isSwitched: boolean) => void;
}) => {
  return (
    <div
      className={
        isActive
          ? `${classes.switch}, ${classes.switch__active}`
          : `${classes.switch}`
      }
      onClick={() => switchToggle(!isActive)}
    >
      {!isActive ? (
        <img
          src={iconDefault}
          className={classes.switch_img}
          alt="dropdown sign"
        />
      ) : (
        <img
          src={iconActive}
          className={classes.switch_img__active}
          alt="dropdown sign"
        />
      )}
      <span>{title}</span>
    </div>
  );
};

export default SwitchFilter;
