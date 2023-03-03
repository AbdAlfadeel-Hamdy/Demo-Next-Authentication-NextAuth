import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";

function UserProfile() {
  // Solution 1
  // const { data: session, status } = useSession();
  // if (!session && status !== "loading") {
  //   window.location.href = "/auth";
  //   return <div className={classes.profile}>Loading...</div>;
  // }
  // if (status === "loading")
  //   return <div className={classes.profile}>Loading...</div>;

  // Solution 2
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (!session) window.location.href = "/auth";
  //     else setIsLoading(false);
  //   });
  // });

  const changePasswordHandler = async (passwordData) => {
    const response = await fetch("api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
