import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AuthForm from "../components/auth/auth-form";

function AuthPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    getSession().then(
      (session) => {
        if (session) router.replace("/");
        setIsLoading(false);
      },
      [router]
    );
  });
  if (isLoading) return <p>Loading...</p>;

  return <AuthForm />;
}

// Solution 1
// export async function getServerSideProps(context) {
//   const session = getSession({ req: context.req });
//   if (session)
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };

//   return {
//     props: {},
//   };
// }

export default AuthPage;
