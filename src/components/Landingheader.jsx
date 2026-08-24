import styles from '../css/Landingheader.module.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Landingheader() {
  
  const navigate = useNavigate();

  return (
    <div>
      <div className="h-[10vh] w-[100%] fixed flex justify-center items-center bg-[#1B3C53] text-[#F9F3EF] opacity-[0.9]">
        
        <div className="h-[100%] w-[95%] flex justify-between items-center">
            <div className="div1 flex items-center gap-x-[4%] md:w-[30%] w-[50%] cursor-pointer">
            <img className="rounded-[50%] w-[65px]" src="/images/logo.jpg" alt="logo" />
            <h4 className="capitalize text-[18px]">Tammeny</h4>
          </div>

          {/* <div className="w-[30%] hidden md:block">
            <ul className="lis flex p-0 gap-x-[20%] justify-center items-center cursor-pointer text-[19px]">
              <li onClick={() => navigate("/landinghome")}>Home</li>
              <li onClick={() => navigate("/features")}>Features</li>
              <li onClick={() => navigate("/privacy")}>Privacy</li>
            </ul>
          </div> */}

          <div className={`w-[30%] h-fit flex justify-end items-center gap-x-[15%] ${styles.div3}`}>
            <button className="list text-[22px] cursor-pointer"
            onClick={() => navigate("/login")}
            >Sign in</button>
          </div>
        </div>

          
      </div>

      <div className='h-[5vh]'></div>

    </div>
  );
}

export default Landingheader;