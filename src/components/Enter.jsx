import styles from '../css/enter.module.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Enter() {
  
  const navigate = useNavigate();

  return (
      <div className="h-[100vh] w-[38%] flex bg-[#1B3C53] flex flex-col justify-between items-center">
            
            <div className="circle h-32 w-32 rounded-[50%] flex justify-center items-center mt-28 mb-8">
                <img className="rounded-[50%] w-[100px]" src="/images/logo.jpg" alt="" />
            </div>

            <div  className="pt-[2%] pr-[5%] pl-[5%]">
              <h3 className="text-[38px] mx-[40px] my-0 font-bold text-[#F9F3EF]">Tamenny, Your smart mental health <span className={styles.gra}>assistant </span> for a <span className={styles.gra}>safe space</span>.</h3>
            </div>

            <img className="" src="/images/Doctors-pana.png" alt="disk with a notebook" />
        </div>
  );
}

export default Enter;