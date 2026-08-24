import { useAsyncValue, useNavigate, NavLink } from 'react-router-dom';
import styles from '../css/Adminheader.module.css';
import { useState, useEffect } from "react";
import axios from "axios";

function Adminheader() {
  const [open, setOpen] = useState(false);
  const [lout, setLout] = useState(false);
  const [del, setDel] = useState(false);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = user.token;
  const userid = user.user?._id;

  const [users, setUsers] = useState([]);

  const count = users.length;

  useEffect(() => {
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


  const logout = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/Logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      localStorage.removeItem("token");

      navigate("/login");

    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
        await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/admin/${userid}`,
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
        );

        setDel(false);

        navigate("/login");

    } catch (error) {
        console.log("Delete failed:", error);
    }
  };

  return (
    <div>
      <div className={`h-[100vh] w-[100%] fixed ${styles.overl} ${lout ? styles.loutoverlay : ""}`}> 
        <div className={`h-[100vh] w-[100%] absolute z-10 bg-[rgba(1,1,1,0.5)] flex justify-center items-center`}>
            <div>
                <h2 className='font-bold text-white text-center'>Are you sure you want to log out?</h2>

                <div className='flex gap-x-16 items-center justify-center my-16'>
                    <button className={`bg-[#1B3C53] shadow-lg ${styles.btn} ${styles.btn2}`}
                    onClick={logout}
                    >Yes</button>
                    <button className={`bg-[#91a0ab] shadow-lg ${styles.btn} ${styles.btn1}`} 
                    onClick={() => setLout(!lout)}
                    >No</button>
                </div>
            </div>
        </div>
      </div>

      <div className={`h-[100vh] w-[100%] fixed ${styles.overl} ${del ? styles.deloverlay : ""}`}>
        <div className={`h-[100vh] w-[100%] absolute z-10 bg-[rgba(1,1,1,0.5)] flex justify-center items-center`}>
            <div>
                <h2 className='font-bold text-white text-center'>Are you sure you want to delete your account?</h2>

                <div className='flex gap-x-16 items-center justify-center my-16'>
                    <button className={`bg-[#1B3C53] shadow-lg ${styles.btn} ${styles.btn2}`}
                    onClick={handleDeleteAccount}
                    >Yes</button>
                    <button className={`bg-[#91a0ab] shadow-lg ${styles.btn} ${styles.btn1}`} 
                    onClick={() => setDel(!del)}
                    >No</button>
                </div>
            </div>
        </div>
      </div>


      {/* menu */}
      <div className={`h-[100vh] w-[65%] md:w-[45%] lg:w-[35%] fixed left-[-70%] top-0 px-[3%] flex flex-col bg-[#1B3C53]/95 gap-y-[0%] shadow-2xl rounded-r-xl  ${styles.listitems} ${open ? styles.show : ""}`} >

        <h3 className='text-[29px]'>Menu items</h3>
        
        <div className="mb-[70%] ">
          <ul className="lg:hidden flex flex-col gap-y-4 justify-center cursor-pointer text-[19px] text-[#F9F3EF]">
            <button
            onClick={ () => navigate("/adminhome")}
            ><li><i class="fa-solid fa-house"></i>Home</li></button>
            <button
            onClick={ () => navigate("/users")}
            ><li><i class="fa-solid fa-user"></i>users</li></button>
            <button
            onClick={ () => navigate("/library")}
            ><li><i class="fa-solid fa-book-open-reader"></i>library</li></button>
            
          </ul>

          <ul className="flex flex-col gap-y-4 justify-center cursor-pointer text-[19px] text-[#F9F3EF] mt-24">
            <button
          onClick={() => setLout(!lout)}
          ><i class="fa-solid fa-right-from-bracket"></i>log out</button> 
          <button
          onClick={() => setDel(!del)}
          ><i class="fa-regular fa-trash-can"></i>delete account</button>
          </ul>
        </div>


        {/* <div className={`flex flex-col gap-y-3`}>
          <button
          onClick={() => setLout(!lout)}
          ><i class="fa-solid fa-right-from-bracket"></i>log out</button> 
          <button
          onClick={() => setDel(!del)}
          ><i class="fa-regular fa-trash-can"></i>delete account</button>
        </div> */}

      </div>


      {/* header */}
      <div className={`h-[12vh] w-[100%] fixed flex justify-center items-center bg-[#F9F3EF] bg-[#ede5e0] ${styles.head}`}>
        
        <div className="h-[100%] w-[95%] flex justify-between items-center">
          <div className="div1 flex items-center gap-x-[4%] md:w-[30%] w-[50%] cursor-pointer text-[#1B3C53]">
            <div className='circle bg-white rounded-[50%] flex justify-center items-center overflow-hidden'>
                                <img
                                    // src={user?.user?.avatar}
                                    src="/images/logo.jpg" alt="logo"
                                    className="h-[60px] w-[60px]"
                                />
                            </div>
            <h4 className="capitalize text-[18px]">
              {
                user?.user?.fullname
              }
            </h4>
          </div>

          <div className="w-[30%] hidden lg:block">
            <ul className="lis flex gap-x-[20%] justify-center items-center text-[#1B3C53] text-[19px]">

              <NavLink
                to="/adminhome"
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ""}`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/users"
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ""}`
                }
              >
                Users
              </NavLink>

              <NavLink
                to="/library"
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ""}`
                }
              >
                Library
              </NavLink>

            </ul>
          </div>

          <div className={`w-[30%] h-fit flex justify-end items-center gap-x-[15%] ${styles.div3}`}>

            <NavLink
              to="/notifications"
              className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.activeIcon : ""}`
                }
            >
              <div className="notifications h-[25px] w-[25px] rounded-[50%] absolute bg-[#FE887E] flex justify-center items-center text-white top-[-28%] right-[-35%]">
                {
                  count
                }
              </div>

              <button className="text-[22px] cursor-pointer">
                <i className="fa-regular fa-bell"></i>
              </button>
            </NavLink>
            
            <div className='block md:hidden'></div>
            
            <button className="list text-[22px] cursor-pointer" onClick={() => setOpen(!open)}><i class="fa-solid fa-list-ul"></i></button>
          
          </div>
        </div>
  
      </div>

      <div className='w-[100%] h-[12vh]'></div>

    </div>
  );
}

export default Adminheader;