import styles from '../css/register.module.css';
import '../css/all.css';
import { useState } from "react";

function Register() {
  const [selected, setSelected] = useState("");
  const [next, setNext] = useState(false);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.parent}>
          
          <div className={styles.div1}>
            <div className={styles.contain}>
              <button className={styles.btn1}><i class="fa-solid fa-angle-left"></i></button>
              <h3>Tamenny, Your smart mental health <span className={styles.gra}>assistant </span> for a <span className={styles.gra}>safe space</span>.</h3>
            </div>
            <img className={styles.img1} src="/images/img1.webp" alt="disk with a notebook" />
          </div>
          

          <div className={styles.div2}
          disabled = {!next}
          style={{display: next ? "none" : ""}}
          >
              <div className={styles.div3}>
                <h2>Sign Up</h2>
                <div className={styles.div6}>
                  <div className={`${styles.circle} ${styles.circle1}`}></div>
                  <div className={`${styles.circle} ${styles.circle2}`}></div>
                </div>
              </div>

              <div className={styles.div4}>
                <p className={styles.p1}>Choose your role</p>

                <div className={styles.div7}>
                  <input type="button" value="specialist" className={` ${styles.btn} ${styles.btn2} ${selected === "specialist" ? styles.active : ""}`} onClick={ () => setSelected("specialist")}/>
                  <input type="button" value="parent" className={` ${styles.btn} ${styles.btn3} ${selected === "parent" ? styles.active : ""}`} onClick={ () => setSelected("parent") }/>
                </div>
              </div>

              <div className={styles.div5}>
              <input type='button' value="Next" className={styles.btn4}
                disabled = {!selected}
                style={{
                  opacity: selected ? 1 : 0.5,
                  cursor: selected ? "pointer" : "not-allowed"
                }}
                onClick={() => setNext(true)}
                />
                <p className={styles.p2}>Already have an account? <span className={styles.log}>Log in</span></p>
              </div>
          </div>

          {/* next */}

          <div className={styles.second}
            disabled = {!next}
            style={{display: next ? "" : "none"}}
          >

            <div className={styles.div3}>
                <h2>Sign Up</h2>
                <div className={styles.div6}>
                  <div className={`${styles.circle} ${styles.circle2}`}></div>
                  <div className={`${styles.circle} ${styles.circle1}`}></div>
                </div>
              </div>

          </div>

          {/* sign up */}

          <div className={styles.third}>

          </div>
          
        </div>

      </div>
    </div>
  );
}

export default Register;