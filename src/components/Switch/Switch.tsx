import { useTheme } from "../../store/hooks/useTheme";
import classes from './Switch.module.css'

export const Switch = () => {

  const [theme, handleChange] = useTheme('dark');

  return (
    <div className={classes.container_switch}>
      <span>Light Mode</span>
      <label className={classes.switch}>
        <input type="checkbox" onChange={handleChange} checked={theme === 'dark'} />
        <span className={classes.slider}></span>
      </label>
      <span>Dark Mode</span>
    </div>
  )
}
