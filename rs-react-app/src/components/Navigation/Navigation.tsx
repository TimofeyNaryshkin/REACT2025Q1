import { FC } from "react";
import { NavLink } from "react-router";
import classes from './Navigation.module.css'

const Navigation: FC = () => {
  return (
    <nav className={classes.nav}>
      <NavLink to='/uncontrolled-form'>
        Uncontrolled form
      </NavLink>
      <NavLink to='/react-hook-form'>
        React Hook Form
      </NavLink>
    </nav>
  )
}

export default Navigation