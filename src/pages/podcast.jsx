import { useAsyncValue} from 'react-router-dom';
import styles from '../css/podcast.module.css';
import { useState, useEffect } from "react";
import { useParams, useNavigate} from "react-router-dom";
import axios from "axios";

function Podcast() {
  const [del, setDel] = useState(false);

  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const token = storedUser.token;

  const params = useParams();
  const podid = params.id;

  console.log(podid);

  const [pod, setPod] = useState(null);

  const searchPodById = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/admin/podcasts/${podid}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const item = response.data.data;

            setPod(item);

            console.log(item);

        } catch (error) {
            console.log(error);
        }
    };

  useEffect(() => {
    searchPodById();
  }, [podid]);

  const handleDeleteItem = async () => {
    try {
        await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/admin/podcasts/${podid}`,
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
        );

        setDel(false);

        navigate("/library");

    } catch (error) {
        console.log("Deleteb book failed:", error);
    }
    };

  return (
    <div>
        <div className={`h-[100vh] w-[100%] fixed ${styles.overl} ${del ? styles.overlay : ""}`}>
            <div className={`h-[100%] w-[100%] absolute z-10 bg-[rgba(1,1,1,0.5)] flex justify-center items-center`}>
                <div>
                    <h2 className='font-bold text-white text-center'>Are you sure you want to delete this user</h2>

                    <div className='flex gap-x-16 items-center justify-center my-16'>
                        <button className={`bg-[#1B3C53] shadow-lg ${styles.btn} ${styles.btn2}`}
                        onClick={handleDeleteItem}
                        >Yes</button>
                        <button className={`bg-[#91a0ab] shadow-lg ${styles.btn} ${styles.btn1}`} 
                        onClick={() => setDel(!del)}
                        >No</button>
                    </div>
                </div>
            </div>
        </div>

      <div className='pb-24 h-[100vh] w-[100%] absolute'>
        <div className='h-[100%] w-[100%] p-10 flex flex-col gap-y-16'>
            <div>
                <button className="text-[#1B3C53] text-2xl"
                onClick={() => navigate("/library")}
                ><i class="fa-solid fa-angle-left absolute"></i></button>
            </div>

            <div className='flex gap-x-5 m-auto pr-10'>
                    <div className=''>
                        <button
                        className="text-[#1B3C53] hover:opacity-[0.7]  text-[30px] flex justify-center items-center gap-x-2"
                        onClick={() => window.open(pod.url, "_blank")}
                        >
                        <i class="fa-regular fa-circle-play  text-[40px]"></i>Play</button>
                    </div>
            </div>

            <div className='flex flex-col md:flex-row gap-x-5 bg-[#1B3C53] p-8 rounded-xl'>
                <div className='min-h-96 min-w-96 bg-gray-300 rounded-lg overflow-hidden'>
                    <img
                        src={pod?.image?.url}
                        className="w-[100%] object-cover"
                    />
                </div>
                


                <div className='flex flex-col gap-y-32 md:ml-auto md:justify-between'>
                    <div className='flex flex-col gap-y-3 text-[#ede5e0] mt-16 md:mt-0 text-center md:text-right'>
                        <h2 className='font-bold text-[#ede5e0]'>
                            {
                                pod ? pod.title : <span className='text-gray-300'>...</span>
                            }
                        </h2>
                        <p className='text-[16px] capitalize text-[#ede5e0]'> 
                            {
                                pod ? " " + pod.presenters : <span className='text-gray-300'>...</span>
                            }
                        </p>
                    </div>
                    
                    
                    <button className={`ml-auto bg-[#1B3C53] bg-[#ede5e0] shadow-xlg font-bold text-[#1B3C53] h-10 w-24 rounded-xl mt-auto`}
                    onClick={() => setDel(!del)}
                    >Delete</button>
                </div>
            </div>

            {/* <div className='flex gap-x-5 m-auto pr-10'>
                    <div className=''>
                        <button
                        className="text-[#1B3C53] hover:opacity-[0.7]  text-[30px] flex justify-center items-center gap-x-2"
                        onClick={() => window.open(pod.url, "_blank")}
                        >
                        <i class="fa-regular fa-circle-play  text-[40px]"></i>Play</button>
                    </div>
            </div> */}
        
        </div>
      </div>
    </div>

  );
}

export default Podcast;