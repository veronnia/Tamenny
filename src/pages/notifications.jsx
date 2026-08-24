import styles from '../css/Adminhome.module.css';
import Adminheader from '../components/Adminheader.jsx';
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Notifications() {
  const location = useLocation();
  const data = location.state;

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    const token = storedUser.token;

    const fetchUsers = async () => {
          try {
              const response = await axios.get(
                  `${process.env.REACT_APP_API_URL}/api/admin/PendingTherapists`,
                  {
                      headers: {
                          Authorization: `Bearer ${token}`
                      }
                  }
              );

              console.log("RESPONSE for pending:", response.data);

              const usersData =
              response.data.data.therapists ||
              [];

              setUsers(usersData);

          } catch (error) {
              console.log(error);
          }
    };
    
  fetchUsers();
  
  }, []);

  return (
    <div>

      <Adminheader />

      <div className="w-[95%] h-[100vh] m-auto text-left">

        <div className="flex items-center w-[95%] h-[12vh] fixed bg-[#ede5e0]  text-left">
            
            <h3 className='text-[#1B3C53] text-left m-0'>Notifications</h3>

        </div>

        <div className='h-[12vh]'></div>

        <div className='w-[100%] text-black pb-10'>
          {users?.map((user) => (
                <div key={user._id}>
                  <button className='mb-10 bg-[#E7DFD9] bg-[#e1d9d4] rounded-md w-[100%] h-[15vh] flex items-center p-10 hover:bg-[#bdb1ac] transition-[0.5s]'
                  onClick={() => navigate(`/notificationdetail/${user._id}`)}
                  >
                    <div className='circle h-[60px] w-[60px] rounded-xl flex justify-center items-center text-[25px] text-[#1B3C53] bg-[#ede5e0]'>
                      <i class="fa-solid fa-pen-to-square"></i>
                    </div>
                    <div className='ml-10 text-left'> 
                      <p className='text-[#1B3C53] font-bold text-[18px] capitalize'>
                        {
                          user?.fullname
                        }
                      </p>
                    </div>                
                  </button>
                </div>
            ))}
      
        </div>

      </div>
    </div>
  );
}

export default Notifications;