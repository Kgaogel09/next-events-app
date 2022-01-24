import { Fragment } from "react";
import MainNav from "./main-nav";

function Layout({ children }) {
  return (
    <Fragment>
      <MainNav />
      <main>{children}</main>
    </Fragment>
  );
}

export default Layout;
