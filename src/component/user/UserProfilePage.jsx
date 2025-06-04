import UserInfo from "./UserInfo";
import OrderHistory from "./OrderHistory";
import { useEffect, useState } from "react";
import Spinner from "../ui/Spinner";
import api from "../../api";

const UserProfilePage = () => {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [showSpinner, setShowSpinner] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("user_info");
        setUserInfo(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setShowSpinner(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (showSpinner) {
    return <Spinner loading={true} />;
  }

  return (
    <div className="container my-5">
      <UserInfo userInfo={userInfo}/>

      <OrderHistory />
    </div>
  );
};

export default UserProfilePage;
