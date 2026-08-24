import styles from '../css/users.module.css';
import Adminheader from '../components/Adminheader.jsx';
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function Users() {
  const location = useLocation();
  const data = location.state;

  const navigate = useNavigate();

  const [selected, setSelected] = useState("All");
  const [searchId, setSearchId] = useState("");

  const [users, setUsers] = useState([]);

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const token = storedUser.token;

  const fetchUsers = async (type = "all") => {
        try {

            let url = "";

            if (type === "all") {
                url = "/api/admin";
            } 
            else if (type === "specialists") {
                url = "/api/admin/therapists";
            } 
            else if (type === "parents") {
                url = "/api/admin/parents";
            } 
            else if (type === "normal") {
                url = "/api/admin/NormalUsers";
                console.log("i was here")
            }
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}${url}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("RESPONSE:", response.data);

            const usersData =
            response.data.data.Users ||
            response.data.data.therapists ||
            response.data.data.parents ||
            response.data.data.users ||
            [];

            setUsers(usersData);

        } catch (error) {
            console.log(error);
        }
    };

    const searchUserById = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/admin/${searchId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const user =
                response.data.data.user || response.data.data.Users;

            setUsers([user]);

        } catch (error) {
            console.log(error);
        }

        console.log(searchId);
    };

  useEffect(() => {
    fetchUsers("all");
  }, []);


  const [isOpen, setIsOpen] = useState(false);

  const options = [
   { label: "all", value: "All", apiKey: "all" },
   { label: "specialists", value: "Specialists", apiKey: "specialists" },
   { label: "parents", value: "parents", apiKey: "parents" },
   { label: "Normal users", value: "Normal Users", apiKey: "normal" }
  ];

  const handleSelect = (option) => {
   setSelected(option.value);
   fetchUsers(option.apiKey);
   setIsOpen(false);
  };

  return (
    <div>

      <Adminheader />

      <div className="w-[95%] h-[100vh] m-auto text-left">


        <div className="flex items-center w-[95%] h-[10vh] bg-[#ede5e0] fixed justify-between">
            <div className="search flex justify-between items-center px-6 py-2 rounded-3xl gap-x-5 outline outline-1 outline-[#1B3C53] bg-[#ede5e0] shadow-md">
                
                <input className='outline-none bg-[rgba(0,0,0,0)] text-[#1B3C53]' type="text" placeholder='search with user id' 
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                onKeyDown={(e) => {if (e.key === "Enter") searchUserById();}}
                />

                <button 
                onClick={searchUserById}
                ><i class="fa-solid fa-magnifying-glass text-[#1B3C53]"></i></button>
            
            </div>

            <div className='shadow-md bg-[#1B3C53] text-white rounded-md overflow-hidden'>
                {/* <select 
                className='outline-none px-4 py-1 bg-[#1B3C53] w-[200px] rounded-xl' 
                value={selected} 
                onChange={ (e) => {
                    const value = e.target.value;
                    setSelected(value);

                    if (value === "All") fetchUsers("all");
                    else if (value === "Specialists") fetchUsers("specialists");
                    else if (value === "parents") fetchUsers("parents");
                    else if (value === "Normal Users") fetchUsers("normal");
                }}
                >
                    <option value="All">all</option>
                    <option value="Specialists">specialists</option>
                    <option value="parents">parents</option>
                    <option value="Normal Users">Normal users</option>
                </select> */}

                    <button
                        className="flex items-center justify-between w-full outline-none px-4 py-1 bg-[#1B3C53] text-left"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span className="capitalize">
                            {selected}
                        </span>
                        
                        {/* <span className={`text-[12px] transform transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}>
                            ▼
                        </span> */}
                    </button>

                    {isOpen && (
                        <div className="absolute right-0 right-0 mt-2 bg-[#1B3C53] rounded-xl overflow-hidden z-50 shadow-lg border border-[#255271]">
                            {[
                                { label: "all", value: "All", type: "all" },
                                { label: "specialists", value: "Specialists", type: "specialists" },
                                { label: "parents", value: "parents", type: "parents" },
                                { label: "Normal users", value: "Normal Users", type: "normal" }
                            ].map((option) => (
                                <div
                                    key={option.value}
                                    onClick={() => {
                                        setSelected(option.value);
                                        fetchUsers(option.type);
                                        setIsOpen(false);
                                    }}
                                    className="px-4 py-2 hover:bg-[#255271] cursor-pointer transition-colors duration-150 capitalize"
                                >
                                    {option.label}
                                </div>
                            ))}
                        </div>
                    )}
            </div>
        </div>

        <div className='h-[11vh]'></div>

        <div className='w-[100%] text-black'>
            {users?.map((user) => (
                    <div key={user._id}>
                        <button className='mb-10 bg-[#E7DFD9] bg-[#e1d9d4] rounded-md w-[100%] h-[15vh] flex items-center p-5 hover:bg-[#bdb1ac] transition-[0.5s] text-left'
                        onClick={ () => navigate(`/user/${user._id}`)}
                        >
                            <div className='circle bg-white rounded-[50%] flex justify-center items-center overflow-hidden'>
                                <img
                                    src={user?.avatar}
                                    className="h-[60px] w-[60px]"
                                />
                            </div>

                            <div className='ml-5'> 
                                <p className='text-[#1B3C53] font-bold text-[18px] capitalize'>{user.fullname}</p>
                                <p className='text-[#1B3C53] font-light'>{user.role}</p>
                            </div>
                            
                        </button>
                    </div>
            ))}

        </div>

        <div className='h-[5vh]'></div>

      </div>
    </div>
  );
}

export default Users;