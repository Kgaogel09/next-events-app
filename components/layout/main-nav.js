import Link from "next/link";
import classes from "./main-nav.module.css";

function MainNav() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">NextEvents</Link>
      </div>

      <nav className={classes.navigation}>
        <Link href="events">Browse All Events</Link>
      </nav>
    </header>
  );
}

export default MainNav;
