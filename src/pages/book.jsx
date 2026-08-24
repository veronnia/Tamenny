import { useAsyncValue} from 'react-router-dom';
import styles from '../css/book.module.css';
import { useState, useEffect } from "react";
import { useParams, useNavigate} from "react-router-dom";
import axios from "axios";

function Book() {
  const [del, setDel] = useState(false);

  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const token = storedUser.token;

  const params = useParams();
  const bookid = params.id;

  const [book, setBook] = useState(null);

  const searchBookById = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/admin/books/${bookid}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const item = response.data.data;

            setBook(item);

            console.log(item);

        } catch (error) {
            console.log(error);
        }
    };

  useEffect(() => {
    searchBookById();
  }, [bookid]);

  const handleDeleteItem = async () => {
    try {
        await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/admin/books/${bookid}`,
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

      <div className='pb-24 w-[100%] absolute'>
        <div className='h-[100%] w-[100%] p-10 flex flex-col gap-y-24'>
            <div>
                <button className="text-[#1B3C53] text-2xl"
                onClick={() => navigate("/library")}
                ><i class="fa-solid fa-angle-left absolute"></i></button>
            </div>

            <div className='flex gap-x-5 mb-16'>
                <div className='flex flex-col gap-y-3'>
                    <h2 className='font-bold'>
                        {
                            book ? book.title : "Title..."
                        }
                    </h2>
                    <p className='text-[16px] capitalize text-gray-800'> <span className='font-bold'>Author:</span> 
                        {
                            book ? " " + book.author : " Author..."
                        }
                    </p>
                </div>

                
            </div>

            <div className='flex flex-col items-center lg:flex-row gap-x-10 gap-y-16'>
                <div className='bg-gray-300 rounded-lg flex items-center'>
                    <img
                        src={book?.image?.url}
                        className="h-[600px] w-[auto] rounded-md object-cover"
                    />
                </div>

                <div className='flex flex-col gap-y-10 lg:w-[60%]'>
                    <h2 className='text-gray-900 text-center lg:text-left'>
                        Book Description
                    </h2>

                    <div className='flex gap-x-5'>
                        <p className='text-xl text-gray-800 leading-loose'>
                            {book?.description}
                        </p>
                    </div>
                </div>
            </div>

            <div className='flex gap-x-5 ml-auto'>
                    <button className={`bg-[#1B3C53] text-[#ede5e0] shadow-xlg font-bold h-10 w-24 rounded-xl `}
                    onClick={() => setDel(!del)}
                    >Delete</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Book;