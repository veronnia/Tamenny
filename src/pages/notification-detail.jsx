import { useAsyncValue } from 'react-router-dom';
import styles from '../css/notification-detail.module.css';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function NotificationDetail() {

  const [approve, setApprove] = useState(false);
  const [regect, setRegect] = useState(false);

  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const token = storedUser.token;

  const params = useParams();
  const userid = params.id;

  const [user, setUser] = useState(null);

  const searchUserById = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/admin/${userid}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const user =
                response.data.data.user || response.data.data.Users;

            setUser(user);

            console.log(user);

        } catch (error) {
            console.log(error);
        }

        console.log(userid);
    };

  useEffect(() => {
    searchUserById();
  }, [userid]);


  const handleApprove = async () => {
    try {
        await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/admin/approve-therapist/${userid}`,
        {},
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        }
        );

        setApprove(false);

        navigate("/notifications");

    } catch (error) {
        console.log("Approve failed:", error);
    }
  };

  console.log(userid);

  const handleReject = async () => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/admin/reject-therapist/${userid}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRegect(false);

      navigate("/notifications");

    } catch (error) {
      console.log("Reject failed:", error);
    }
};

  return (
    <div>

      <div className={`h-[100vh] w-[100%] fixed ${styles.overl} ${approve ? styles.overlay : ""}`}>
            <div className={`h-[100%] w-[100%] absolute z-10 bg-[rgba(1,1,1,0.5)] flex justify-center items-center`}>
                <div>
                    <h2 className='font-bold text-white text-center'>Are you sure you want to approve?</h2>

                    <div className='flex gap-x-16 items-center justify-center my-16'>
                        <button className={`bg-[#1B3C53] shadow-lg ${styles.btnn} ${styles.btnn2}`}
                        onClick={handleApprove}
                        >Yes</button>
                        <button className={`bg-[#91a0ab] shadow-lg ${styles.btnn} ${styles.btnn1}`} 
                        onClick={() => setApprove(!approve)}
                        >No</button>
                    </div>
                </div>
            </div>
        </div>

      <div className={`h-[100vh] w-[100%] fixed ${styles.overl} ${regect ? styles.overlay : ""}`}>
            <div className={`h-[100%] w-[100%] absolute z-10 bg-[rgba(1,1,1,0.5)] flex justify-center items-center`}>
                <div>
                    <h2 className='font-bold text-white text-center'>Are you sure you want to regect?</h2>

                    <div className='flex gap-x-16 items-center justify-center my-16'>
                        <button className={`bg-[#1B3C53] shadow-lg ${styles.btnn} ${styles.btnn2}`}
                        onClick={handleReject}
                        >Yes</button>
                        <button className={`bg-[#91a0ab] shadow-lg ${styles.btnn} ${styles.btnn1}`} 
                        onClick={() => setRegect(!regect)}
                        >No</button>
                    </div>
                </div>
            </div>
        </div>

      <div className='p-10 flex flex-col gap-y-24'>

        <div>
          <button className="text-[#1B3C53] text-2xl"
          onClick={() => navigate("/notifications")}
          ><i className="fa-solid fa-angle-left absolute"></i></button>
        </div>

        <div className='flex gap-x-16'>
          <div className='h-64 w-64 bg-gray-300 rounded-lg'>
            <img
            src={user?.avatar}
            className="h-[100%] w-[100%] rounded-md object-cover"
            />
          </div>
          <div className='flex flex-col gap-y-3'>
            <h2 className='font-bold mb-5'>
              {
                user ? user?.fullname : <span className='text-gray-300'>...</span>
              }
            </h2>
            <p className='text-[16px] text-gray-800'><span className='font-bold'>Email: </span>
              {
                user ? user?.email : <span className='text-gray-300'>...</span>
              }
            </p>
            <p className='text-[16px] capitalize text-gray-800'><span className='font-bold'>Age: </span>
              {
                user ? user?.age : <span className='text-gray-300'>...</span>
              }
            </p>
          </div>
        </div>

        <div className='flex flex-col gap-y-10'>
          <h3 className='text-gray-900 text-left m-0'>Documents Submitted</h3>

          <div className='flex gap-x-5'>
            <button
                className="text-blue-900"
                onClick={() => window.open(user?.verificationDocument, "_blank")}
                >
                <i className="fa-regular fa-file mr-3"></i>
                Go to documents
            </button>
          </div>
        </div>

        <div className='flex gap-x-5'>
          <button className={`bg-[#1B3C53] shadow-lg ${styles.btn} ${styles.btn1}`}
          onClick={() => setApprove(true)}
          >Approve</button>
          <button className={`bg-[#91a0ab] shadow-lg ${styles.btn} ${styles.btn2}`}
          onClick={() => setRegect(true)}
          >Deny</button>
        </div>

      </div>
    </div>
  );
}

export default NotificationDetail;