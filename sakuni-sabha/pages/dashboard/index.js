import React, { useEffect, useState } from "react";
import { useMoonSDK } from "../../components/Hooks/moon";
import { useRouter } from "next/router";
import SignupPage from "../../components/Dashboard/signUp";
import LoginPage from "../../components/Dashboard/login";

const Dashboard = () => {
  const { moon, initialize, disconnect } = useMoonSDK();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      initialize();
      setIsLoading(true);
      if (moon) {
        const accounts = await moon.listAccounts();
        console.log("User's wallet address", accounts);
        if (accounts.data.keys.length > 0) {
          router.push(`/dashboard/${accounts.data.keys[0]}`);
        } else {
          console.log("User not logged in");
        }
      }
      setIsLoading(false);
      return () => {
        disconnect();
      };
    }
    checkUser();
  }, []);
  return (
    <div>
      <LoginPage />
    </div>
  );
};

export default Dashboard;
