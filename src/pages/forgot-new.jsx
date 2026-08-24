import styles from '../css/forgot-pass.module.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Enter from '../components/Enter.jsx';


function ForgotNew() {
  const navigate = useNavigate();

  const [old_password, setOld_password] = useState("");
  const [new_password, setNew_password] = useState("");

  const isActive = new_password.trim() !== "" && old_password.trim() !== "";

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

              <button className="text-[#1B3C53] text-2xl mb-[3%] ml-[7%] mt-[5%] active:text-[#0e1c27] text-left w-[100%] bg-blue-200"><i class="fa-solid fa-angle-left absolute"></i></button>  
              
              <div className="h-[100%] w-[100%] flex flex-col items-center justify-between">
                  <div className={styles.div3}>
                    <h2 className="text-[40px] text-[#1B3C53] mt-[20%] mb-[5%]">Change Password</h2>
                  </div>

                  <div className="circle h-24 w-24 rounded-[50%] bg-white flex justify-center items-center">
                    <img className="rounded-[50%] w-[90px]" src="/images/logo.jpg" alt="" />
                  </div>

                  <div className="flex flex-col w-[55%] h-[30%] justify-center">
                    <input className={`${styles.input1}`} type="password" placeholder='Old password' value={old_password} onChange={(e) => setOld_password(e.target.value)}/>
                    <input className={`${styles.input1}`} type="password" placeholder='New password' value={new_password} onChange={(e) => setNew_password(e.target.value)}/>
                  </div>

                  <div className="flex flex-col items-center mb-[10%]">
                    <button className="py-[30%] px-[200%] text-white bg-[#1B3C53] rounded-md transiton-[0.25s] active:bg-[gray] text-lg"
                      onClick={() => navigate("/login")}
                      disabled = {!isActive}
                      style={{
                        opacity: isActive ? 1 : 0.5,
                        cursor: isActive ? "pointer" : "not-allowed",
                      }}
                      >Save</button>
                  </div>
              </div>  
  
          </div>
        </div>

      </div>
    </div>
  );
}

export default ForgotNew;