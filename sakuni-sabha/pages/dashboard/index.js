import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Dashboard = () => {
  const [user, setUser] = useState("karthikeya");
  const [loading, setLoading] = useState();
  const router = useRouter();

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
    setUser("karthikeya");
    if (user) {
      router.push(`/dashboard/${user}`);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>Please create an account.</div>;
};

export default Dashboard;
