import { useAsyncValue} from 'react-router-dom';
import styles from '../css/user.module.css';
import { useState, useEffect } from "react";
import { useParams, useNavigate} from "react-router-dom";
import axios from "axios";

function User() {
  const [del, setDel] = useState(false);

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

            console.log("here is the user: ");
            console.log(user);

        } catch (error) {
            console.log(error);
        }

        console.log(userid);
    };

  useEffect(() => {
    searchUserById();
  }, [userid]);

  const handleDeleteUser = async () => {
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

        navigate("/users");

    } catch (error) {
        console.log("Delete failed:", error);
    }
    };

  return (
    <div>
        <div className={`h-[100vh] w-[100%] fixed ${styles.overl} ${del ? styles.overlay : ""}`}>
            <div className={`h-[100%] w-[100%] absolute z-10 bg-[rgba(1,1,1,0.5)] flex justify-center items-center`}>
                <div>
                    <h2 className='font-bold text-white text-center'>Are you sure you want to delete this user</h2>

                    <div className='flex gap-x-16 items-center justify-center my-16'>
                        <button className={`bg-[#1B3C53] shadow-lg ${styles.btn} ${styles.btn2}`}
                        onClick={handleDeleteUser}
                        >Yes</button>
                        <button className={`bg-[#91a0ab] shadow-lg ${styles.btn} ${styles.btn1}`} 
                        onClick={() => setDel(!del)}
                        >No</button>
                    </div>
                </div>
            </div>
        </div>

      <div className='pb-24 w-[100%] absolute'>
        <div className='h-[100%] w-[100%] p-10 flex flex-col gap-y-16'>
            <div>
                <button className="text-[#1B3C53] text-2xl"
                onClick={() => navigate("/users")}
                ><i class="fa-solid fa-angle-left absolute"></i></button>
            </div>

            <div className='flex gap-x-10  bg-[#1B3C53] p-8 rounded '>
                <div className='bg-gray-300 rounded-lg'>
                    <img
                        src={user?.avatar}
                        className="h-64 w-64 rounded-md object-cover"
                    />
                </div>
                <div className='flex flex-col gap-y-3 text-[#ede5e0]'>
                    <h2 className='font-bold text-[#ede5e0]'>
                        {
                            user ? user.fullname : <span className='text-gray-300'>...</span>
                        }
                    </h2>
                    <p className='text-[16px] capitalize text-[#ede5e0]'><span className='font-bold text-[#ede5e0]'>Role:</span> 
                        {
                            user ? " " + user.role : <span className='text-gray-300 text-[#ede5e0]'>...</span>
                        }
                    </p>
                </div>

                <div className='flex gap-x-5 ml-auto'>
                    {/* <button className={`bg-[#91a0ab] shadow-lg ${styles.btn} ${styles.btn1}`}>Approve</button> */}
                    <button className={`bg-[#1B3C53] bg-[#ede5e0] shadow-xlg font-bold text-[#1B3C53] h-10 w-24 rounded-xl `}
                    onClick={() => setDel(!del)}
                    >Delete</button>
                </div>
            </div>

            <div className='flex flex-col gap-y-10 m-auto text-center'>
                {user?.role === "admin" && ( 
                <div>
                    <h1 className='text-[25px] mb-10 text-[#1B3C53] font-bold'>Admin Information</h1>
                    
                    <div className='flex flex-col gap-y-2 text-[#1B3C53]'>
                        <div><span className='font-bold text-[20]'>Email: </span><span className='text-[19px]'>{user ? user.email : <span className='text-gray-300'>...</span>}</span></div>
                        <div><span className='font-bold text-[20]'>Time of creation: </span><span className='text-[19px]'>{user ? user.createdAt : <span className='text-gray-300'>...</span>}</span></div>
                        <div><span className='font-bold text-[20]'>Id: </span><span className='text-[19px]'>{user ? user._id : <span className='text-gray-300'>...</span>}</span></div>
                    </div>
                </div>
                    
                )}

                {user?.role === "therapist" && (
                <div><h1 className='text-[25px] mb-10 text-[#1B3C53] font-bold'>Therapist Information</h1>
                    
                    <div className='flex flex-col gap-y-2 text-[#1B3C53]'>
                        <div><span className='font-bold text-[20]'>Email: </span><span className='text-[19px]'>{user ? user.email : <span className='text-gray-300'>...</span>}</span></div>
                        <div><span className='font-bold text-[20]'>Time of creation: </span><span className='text-[19px]'>{user ? user.createdAt : <span className='text-gray-300'>...</span>}</span></div>
                        <div><span className='font-bold text-[20]'>Id: </span><span className='text-[19px]'>{user ? user._id : <span className='text-gray-300'>...</span>}</span></div>
                    </div></div>
                )}

                {user?.role === "user" && (
                <div><h1 className='text-[25px] mb-10 text-[#1B3C53] font-bold'>User Information</h1>
                    
                    <div className='flex flex-col gap-y-2 text-[#1B3C53]'>
                        <div><span className='font-bold text-[20]'>Email: </span><span className='text-[19px]'>{user ? user.email : <span className='text-gray-300'>...</span>}</span></div>
                        <div><span className='font-bold text-[20]'>Time of creation: </span><span className='text-[19px]'>{user ? user.createdAt : <span className='text-gray-300'>...</span>}</span></div>
                        <div><span className='font-bold text-[20]'>Id: </span><span className='text-[19px]'>{user ? user._id : <span className='text-gray-300'>...</span>}</span></div>
                    </div></div>
                )}

                {user?.role === "parent" && (
                <div><h1 className='text-[25px] mb-10 text-[#1B3C53] font-bold'>Parent Information</h1>
                    
                    <div className='flex flex-col gap-y-2 text-[#1B3C53]'>
                        <div><span className='font-bold text-[20]'>Email: </span><span className='text-[19px]'>{user ? user.email : <span className='text-gray-300'>...</span>}</span></div>
                        <div><span className='font-bold text-[20]'>Time of creation: </span><span className='text-[19px]'>{user ? user.createdAt : <span className='text-gray-300'>...</span>}</span></div>
                        <div><span className='font-bold text-[20]'>Id: </span><span className='text-[19px]'>{user ? user._id : <span className='text-gray-300'>...</span>}</span></div>
                    </div></div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}

export default User;