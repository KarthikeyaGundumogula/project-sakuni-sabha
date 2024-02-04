import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SignupPage from "../../components/Dashboard/signUp";
import LoginPage from "../../components/Dashboard/login";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState();
  const router = useRouter();

  //capiw90370@alibrs.com
  //

  useEffect(() => {
    // Fetch user data from API
    // fetch('/api/user')
    //   .then(response => response.json())
    //   .then(data => {
    //     setUser(data);
    //     setLoading(false);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching user data:', error);
    //     setLoading(false);
    //   });
    setLoading(false);
    if (user) {
      router.push(`/dashboard/${"user"}`);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <LoginPage />
    </div>
  );
};

export default Dashboard;
