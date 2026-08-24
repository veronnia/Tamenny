import styles from '../css/landinghome.module.css';
import '../css/all.css';
import { useState } from "react";
import Landingheader from '../components/Landingheader.jsx';

function Privacy() {

  return (
    <div>

        <Landingheader />


        <div className='h-[100vh] w-[100%]'>
            <h2 className=''>privacy page</h2>
        </div>


    </div>
  );
}

export default Privacy;