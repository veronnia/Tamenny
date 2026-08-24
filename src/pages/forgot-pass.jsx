import styles from '../css/forgot-pass.module.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Enter from '../components/Enter.jsx';

function ForgotPass() {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSendEmail = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/forgot-password`,
        { email }
      );

      console.log(res);

      const resetToken = res.data.token;

      console.log("Token received:", resetToken);

      navigate("/forgotcode", {
        state: {
          email,
        },
      });

    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <div className="h-[100%] w-[100%] flex">
          
            <Enter/>

          <div className="w-[62%] h-[100vh] flex flex-col ">

              <button className="text-[#1B3C53] text-2xl mb-[3%] ml-[7%] mt-[5%] active:text-[#0e1c27] text-left w-[100%] bg-blue-200"
              onClick={() => navigate("/login")}
              ><i class="fa-solid fa-angle-left absolute"></i>
              </button>  
              
              <div className="h-[100%] w-[100%] flex flex-col items-center justify-between">
                  <div className={styles.div3}>
                    <h2 className="text-[40px] text-[#1B3C53] mt-[20%] mb-[5%]">Forget Password</h2>
                  </div>

                  <div className="circle h-24 w-24 rounded-[50%] bg-white flex justify-center items-center">
                    <img className="rounded-[50%] w-[90px]" src="/images/logo.jpg" alt="" />
                  </div>

                  <div className="flex flex-col w-[55%] h-[30%] justify-center">
                    <input className={`${styles.input1}`} type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                  </div>

                  <div className="flex flex-col items-center mb-[10%]">
                    <button className="py-[30%] px-[200%] text-white bg-[#1B3C53] rounded-md transiton-[0.25s] active:bg-[gray] text-lg"
                      onClick={handleSendEmail}
                      disabled = {!email}
                      style={{
                        opacity: email ? 1 : 0.5,
                        cursor: email ? "pointer" : "not-allowed",
                      }}
                      >Send</button>
                  </div>
              </div>  
  
          </div>
        </div>

      </div>
    </div>
  );
}

export default ForgotPass;