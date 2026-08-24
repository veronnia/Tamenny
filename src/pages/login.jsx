import styles from '../css/login.module.css';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Enter from '../components/Enter.jsx';


function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isActive = email.trim() !== "" && password.trim() !== "";

//--------------------------------------------------------------------------------------------------------------------------

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("${process.env.REACT_APP_API_URL}/api/users/login", {
        email,
        password,   
      });

      console.log(response);

      if (response.data.user.role !== "admin") {
        alert("You are not authorized to access admin dashboard.");
        return;
      }

      localStorage.setItem("user", JSON.stringify(response.data));

      navigate("/adminhome");  //, {state: data});

    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <div className="h-[100%] w-[100%] flex">
          
          {/* <div className="h-[100vh] w-[38%] flex bg-[#1B3C53] flex flex-col justify-between">
            <div  className="pt-[5%] pr-[5%] pl-[5%] h-fit">
              <h3 className="text-[#F9F3EF] text-[38px] mx-[70px] my-[40px] font-bold">Tamenny, Your smart mental health <span className={styles.gra}>assistant </span> for a <span className={styles.gra}>safe space</span>.</h3>
            </div>
            <img className="" src="/images/Doctors-pana.png" alt="disk with a notebook" />
          </div> */}
          
          <Enter />

          <div className="w-[62%] h-[100vh] flex flex-col ">

              <button className="text-[#1B3C53] text-2xl mb-[3%] ml-[7%] mt-[5%] active:text-[#0e1c27] text-left w-[100%] bg-blue-200"
              onClick={() => navigate("/landinghome")}
              ><i class="fa-solid fa-angle-left absolute"></i></button>  
              
              <div className="h-[100%] w-[100%] flex flex-col items-center justify-between">
                  <div className={styles.div3}>
                    <h2 className="text-[40px] text-[#1B3C53] mt-[20%]">Log In</h2>
                  </div>

                  <div className="flex flex-col w-[55%] h-[30%]">
                    <input className={`${styles.input1} ${styles.input2}`} type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input className={`${styles.input1} ${styles.input3}`} type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <p className="text-[#1B3C53] underline cursor-pointer mt-[-5px] w-fit"
                    onClick={() => navigate("/forgetpass")}
                    >Forgot password?</p>
                  </div>

                  <div className="flex flex-col items-center mb-[10%]">
                    <button className="h-[55px] w-[110px] text-white bg-[#1B3C53] rounded-md transiton-[0.25s] active:bg-[gray]"
                      disabled = {!isActive} onClick={handleLogin}
                      style={{
                        opacity: isActive ? 1 : 0.5,
                        cursor: isActive ? "pointer" : "not-allowed",
                      }}
                      >Log In</button>
                      {/* <p className="text-[#1B3C53]">Don't have an account? <a className="cursor-pointer underline">Sign up</a></p> */}
                  </div>
              </div>  

          </div>
        </div>

      </div>
    </div>
  );
}

export default LogIn;