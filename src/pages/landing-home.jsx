import styles from '../css/landinghome.module.css';
import '../css/all.css';
import { useState } from "react";
import Landingheader from '../components/Landingheader.jsx';

function LandingHome() {

  return (
    <div>

        <Landingheader />


        {/* <div className='h-[100vh] w-[100%]'>
            <div className={`h-[100vh] w-[100%] flex justify-center ${styles.page1}`}
            style={{
                backgroundImage: "url(/images/landing3.png)",
                backgroundSize: "cover"
            }}
            >
                <div className='flex flex-col items-center'>
                    <h1 className='pt-[10vh] text-[50px] font-extrabold text-[#1B3C53]'>Welcome to Tammeny</h1>
                    <p className='pt-[2vh] text-[#1B3C53] text-center text-[19px] capitalize font-[600] w-[45%]'>your journey to inner peace begins here</p>
                </div>               
            </div>
        </div> */}
        

        {/* <div className='h-[100vh]'>
            <div className='h-[22vh] flex justify-center'>
                <h1 className='pt-[10vh] text-[50px] font-bold text-[#1B3C53]'>Who is it for</h1>
            </div>

            <div className='w-[80%] h-[78vh] m-auto flex justify-between items-center'>
                <div className='h-[75%] w-[25%] outline outline-1'>

                </div>

                <div className='h-[75%] w-[25%] outline outline-1'>

                </div>

                <div className='h-[75%] w-[25%] outline outline-1'>

                </div>
            </div>
        </div> */}

        <div className='h-[100vh] w-[100%] flex'>
            <div className='w-[50%] h-[100%] flex justify-center items-center'>
                {/* <h1 className="text-[50px] w-[50%] text-center capitalize text-[#1B3C53] font-bold">Find the application on play store</h1> */}
                <div className='flex flex-col items-center'>
                    <h1 className='text-[50px] font-extrabold text-[#1B3C53]'>Welcome to Tamenny</h1>
                    <p className='pt-[2vh] text-[#1B3C53] text-center text-[19px] capitalize font-[600] w-[45%]'>your journey to inner peace begins here</p>
                </div>
            </div>
            
            <div className='w-[40%] flex justify-center items-center'>
                <img className="h-[70%]" src="/images/Breathing exercise-bro.png" alt="" />
            </div>
        </div>


        
        <div className='h-[100vh] w-[100%] flex'>
            
            <div className='w-[50%] flex justify-center items-center'>
                <img className="h-[70%]" src="/images/Problem solving-amico.png" alt="" />
            </div>

            <div className='w-[40%] h-[100%] flex justify-center items-center'>
                {/* <h1 className="text-[50px] w-[50%] text-center capitalize text-[#1B3C53] font-bold">Find the application on play store</h1> */}
                <div className='flex flex-col items-center'>
                    <h1 className='text-[50px] font-extrabold text-[#1B3C53]'>Find it on the play store</h1>
                    <p className='pt-[2vh] text-[#1B3C53] text-center text-[19px] capitalize font-[600] w-[45%]'>hurry up now</p>
                </div>
            </div>
        </div>
        


    </div>
  );
}

export default LandingHome;