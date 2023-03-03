import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

import classes from "./main-navigation.module.css";

function MainNavigation() {
  const { data: session, status: isLoading } = useSession();

  const logoutHandler = async () => {
    await signOut();
  };
  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {!session && isLoading !== "loading" && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          {session && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
