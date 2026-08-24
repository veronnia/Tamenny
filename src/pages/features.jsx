import styles from '../css/landinghome.module.css';
import '../css/all.css';
import { useState } from "react";
import Landingheader from '../components/Landingheader.jsx';

function Features() {

  return (
    <div>

        <Landingheader />

        <div className='h-[100vh] w-[100%]'>
            <h4>privacy page</h4>
        </div>

        <div className='h-[100vh] bg-red-200'>
            
        </div>

        <div className='h-[100vh] w-[100%] flex bg-green-200'>
            
        </div>

    </div>
  );
}

export default Features;