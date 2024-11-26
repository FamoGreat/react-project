import { useEffect, useState } from "react";
import useAxiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const axiosInstance = useAxiosInstance();
  const [data, setData] = useState(null);
  const { logout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/protected-data");
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [axiosInstance]);

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={logout}>Logout</button>
      <p>{data ? JSON.stringify(data) : "Loading..."}</p>
    </div>
  );
};

export default Dashboard;
