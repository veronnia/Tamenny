import styles from '../css/forgot-pass.module.css';
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import Enter from '../components/Enter.jsx';

function ForgotCode() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const [new_password, setNew_password] = useState("");

  const isCodeComplete = code.every((digit) => digit !== "");
  const isPasswordValid = new_password.trim() !== "";
  const canVerify = isCodeComplete && isPasswordValid;

  const navigate = useNavigate();

  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return; 

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").trim();

    if (!/^\d{6}$/.test(paste)) return;

    const newCode = paste.split("");
    setCode(newCode);

    inputsRef.current[5]?.focus();
  };

  const handleVerify = async () => {
    try {
      const finalCode = code.join("");

      console.log("Code:", finalCode);
      console.log("New Password:", new_password);

      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/reset-password`,
        {
          code: finalCode,
          newPassword: new_password,
        }
      );

      console.log("Password reset success");

      navigate("/login");

    } catch (error) {
      console.error("Reset failed:", error.response?.data || error.message);
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

          <Enter/>
          

          <div className="w-[62%] h-[100vh] flex flex-col">

              <button className="text-[#1B3C53] text-2xl mb-[3%] ml-[7%] mt-[5%] active:text-[#0e1c27] text-left w-[100%] bg-blue-200"
              onClick={() => navigate("/forgetpass")}
              ><i class="fa-solid fa-angle-left absolute"></i></button>  
              
              <div className="h-[100%] w-[100%] flex flex-col items-center justify-between">
                  <div className={styles.div3}>
                    <h2 className="text-[40px] text-[#1B3C53] mt-[5%] mb-[5%]">Verify Your Email</h2>
                  </div>

                  <div className="circle h-24 w-24 rounded-[50%] bg-white flex justify-center items-center">
                    <img className="rounded-[50%] w-[90px]" src="/images/logo.jpg" alt="" />
                  </div>

                  <div 
                    onPaste={handlePaste}
                    className="flex gap-x-[5%] w-[55%] h-[15%] justify-center items-center"
                  >
                    {code.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength="1"
                        value={digit}
                        ref={(el) => (inputsRef.current[index] = el)}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className={`${styles.input2}`}
                      />
                    ))}
                  </div>

                  <div className="flex flex-col w-[55%] h-[30%] justify-center">
                    <input className={`${styles.input1}`} type="password" placeholder='New password' value={new_password} onChange={(e) => setNew_password(e.target.value)}/>
                  </div>

                  <div className="flex flex-col items-center mb-[5%]">
                    <button className="py-[30%] px-[200%] text-white bg-[#1B3C53] rounded-md transiton-[0.25s] active:bg-[gray] text-lg"
                      onClick={handleVerify}
                      disabled = {!canVerify}
                      style={{
                        opacity: canVerify ? 1 : 0.5,
                        cursor: canVerify ? "pointer" : "not-allowed",
                      }}
                      >Verify</button>
                  </div>
              </div>  
  
          </div>
        </div>

      </div>
    </div>
  );
}

export default ForgotCode;