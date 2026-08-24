import styles from '../css/library.module.css';
import Adminheader from '../components/Adminheader.jsx';
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function Library() {
  const [selected, setSelected] = useState("Books");

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState(""); 
  const [description, setDescription] = useState("");

  const isBookActive =
  title.trim() !== "" &&
  author.trim() !== "" &&
  description.trim() !== "" &&
  year !== "" &&
  !isNaN(year);

  const [podTitle, setPodTitle] = useState("");
  const [podUrl, setPodUrl] = useState("");
  const [podDescription, setPodDescription] = useState("");

  const isPodcastActive =
  podTitle.trim() !== "" &&
  podUrl.trim() !== "" &&
  podDescription.trim() !== "";

  const isActive =
  selected === "Books" ? isBookActive : isPodcastActive;

  const location = useLocation();
  const data = location.state;

  const navigate = useNavigate();

  const [searchId, setSearchId] = useState("");

  const [content, setContent] = useState([]);

  const [add, setAdd] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const token = storedUser.token;

  const fetchContent = async (type = "Books") => {
        try {

            let url = "";

            if (type === "Books") {
                url = "/api/admin/books";
            } 
            else if (type === "Podcasts") {
                url = "/api/admin/podcasts";
            } 
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}${url}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("RESPONSE:", response.data);

            const data = response.data;

            const items = Array.isArray(data)
            ? data
            : Array.isArray(data?.data)
                ? data.data
                : [];

            setContent(items);

        } catch (error) {
            console.log(error);
        }
    };

    const fetchById = async () => {
    try {
        let url = "";

        if (selected === "Books") {
        url = `/api/admin/books/${searchId}`;
        } 
        else if (selected === "Podcasts") {
        url = `/api/admin/podcasts/${searchId}`;
        }

        const response = await axios.get(
        `${process.env.REACT_APP_API_URL}${url}`,
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
        );

        console.log("SINGLE ITEM:", response.data);

        const item = response.data.data;

        setContent([item]);

    } catch (error) {
        console.log(error);
    }
  };

  useEffect(() => {
    fetchContent("Books");
  }, []);


  const handleAdd = async () => {
    if (!isActive) return;

    try {
        if (selected === "Books") {
        await axios.post(
            `${process.env.REACT_APP_API_URL}/api/admin/books`,
            {
            title: title.trim(),
            author: author.trim(),
            description: description.trim(),
            publishedYear: Number(year),
            },
            {
            headers: { Authorization: `Bearer ${token}` },
            }
        );

        setTitle("");
        setAuthor("");
        setYear("");
        setDescription("");
        fetchContent("Books");
        }

        else if (selected === "Podcasts") {
        await axios.post(
            `${process.env.REACT_APP_API_URL}/api/admin/podcasts`,
            {
            title: podTitle.trim(),
            url: podUrl.trim(),
            description: podDescription.trim(),
            },
            {
            headers: { Authorization: `Bearer ${token}` },
            }
        );

        setPodTitle("");
        setPodUrl("");
        setPodDescription("");
        fetchContent("Podcasts");
        }

        setAdd(false);

    } catch (error) {
        console.log(error);
    }
    };

  const renderBooks = () => (
    content.map((book) => (
    <button
    key={book._id}
    onClick={ () => navigate(`/book/${book._id}`)}
    className="bg-[#E7DFD9] bg-[#e1d9d4] p-10 mb-6 rounded-md flex gap-5 w-[100%] items-center text-left hover:bg-[#bdb1ac] transition-[0.5s]"
    >

        <img
            src={book.image?.url}
            className="h-[80px] w-[80px] rounded-md object-cover"
        />

        <div>
            <p className="font-bold text-[#1B3C53]">
            {book.title}
            </p>
            <p className="text-[#1B3C53]">
            {book.author}
            </p>
        </div>
    </button>
    ))
  );

  const renderPodcasts = () => (
    content.map((podcast) => (
    <button
    key={podcast._id}
    onClick={ () => navigate(`/podcast/${podcast._id}`)}
    className="bg-[#E7DFD9] bg-[#e1d9d4] p-10 mb-6 rounded-md flex gap-5 w-[100%] text-left hover:bg-[#bdb1ac] transition-[0.5s]"
    >
        <img
            src={podcast.image?.url}
            className="h-[80px] w-[80px] rounded-md object-cover"
        />

        <div className='flex justify-between w-[100%] items-center'>

            <div>
                <p className="font-bold text-[#1B3C53]">
                {podcast.title}
                </p>

                <p className="text-[#1B3C53]">
                {podcast.presenters}
                </p>
            </div>

            {/* <div>
                <div className=''>
                        <button
                        className="text-[#1B3C53] hover:opacity-[0.7] text-[35px]"
                        onClick={() => window.open(podcast.url, "_blank")}
                        >
                        <i class="fa-regular fa-circle-play"></i></button>
                </div>
            </div> */}
            
        </div>
    </button>
    ))
  );

  const [isOpen, setIsOpen] = useState(false);

  const options = [
   { label: "Books", value: "Books", apiKey: "Books" },
   { label: "Podcasts", value: "Podcasts", apiKey: "Podcasts" },
   ];

  const handleSelect = (option) => {
   setSelected(option.value);
   fetchContent(option.apiKey);
   setIsOpen(false);
  };

  return (
    <div>

      <Adminheader />

      <div className={`fixed h-[100vh] w-[100%] ${styles.overl} ${add ? styles.overlay : ""}`}>
        <div className={`h-[100vh] w-[100%] flex justify-center pb-10`}>
            {/* //////////////////////////////////////  books or podcasts filter and add button  ///////////////////////////////////// */}
            <div className='h-[90%] w-[55%] bg-white rounded-xl shadow-xl p-10 flex flex-col justify-between'>
                
                <div className='flex justify-between w-[100%]'>

                    {selected === "Books" ? (
                        <>
                        <h2 className='capitalize mb-3'>Enter book details</h2>
                        </>
                    ):(
                        <>
                        <h2 className='capitalize mb-3'>Enter Podcast details</h2>
                        </>
                    )}

                    <button className='rounded-md text-[20px]'
                    onClick={() => setAdd(!add)}
                    ><i class="fa-solid fa-xmark"></i></button>
                    
                </div>
                
                <div className='flex flex-col gap-6'>
                    {/* <input className='py-4 px-5 bg-gray-200' type="text" value={title} placeholder='title' onChange={(e) => setTitle(e.target.value)} />
                    <input className='py-4 px-5 bg-gray-200' type="text" value={author} placeholder='author' onChange={(e) => setAuthor(e.target.value)} />
                    <input className='py-4 px-5 bg-gray-200' type="number" value={year} placeholder='puplished year' onChange={(e) => setYear(e.target.value)} />
                    <textarea className='py-4 px-5 bg-gray-200' placeholder="enter a description" value={description} onChange={(e) => setDescription(e.target.value)}> </textarea> */}

                    {selected === "Books" ? (
                    <>
                        <input className='py-4 px-5 bg-gray-200 rounded' value={title} onChange={(e) => setTitle(e.target.value)} placeholder="title" />
                        <input className='py-4 px-5 bg-gray-200 rounded' value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="author" />
                        <input className='py-4 px-5 bg-gray-200 rounded' value={year} onChange={(e) => setYear(e.target.value)} placeholder="year" />
                        <textarea className='py-4 px-5 bg-gray-200 rounded' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Enter description' />
                    </>
                    ) : (
                    <>
                        <input className='py-4 px-5 bg-gray-200' value={podTitle} onChange={(e) => setPodTitle(e.target.value)} placeholder="title" />
                        <input className='py-4 px-5 bg-gray-200' value={podUrl} onChange={(e) => setPodUrl(e.target.value)} placeholder="url" />
                        <textarea className='py-4 px-5 bg-gray-200' value={podDescription} onChange={(e) => setPodDescription(e.target.value)} placeholder='Enter description' />
                    </>
                    )}
                </div>

                <div className='flex justify-center m-5'>
                     {/* className='bg-red-300 px-3 py-5 rounded-md w-[35%]'    */}
                    <button 
                    onClick={handleAdd}
                    disabled={!isActive}
                    className={`py-3 rounded-md w-[30%] transition ${
                        isActive
                        ? "bg-[#1B3C53] text-white cursor-pointer opacity-100" 
                        : "bg-[#1B3C53] text-white opacity-50 cursor-not-allowed"
                    }`}
                    >Confirm</button>
                </div>

            </div>
        </div>
      </div>

      <div className="w-[95%] h-[100vh] m-auto text-left" >

        <div className="flex gap-x-[2%] items-center w-[95%] h-[10vh] fixed bg-[#F9F3EF] bg-[#ede5e0] justify-between">
            <div className="search flex justify-between items-center px-6 py-2 rounded-3xl gap-x-5 outline outline-1 outline-[#1B3C53]">
                
                <input className='outline-none bg-[rgba(0,0,0,0)] text-[#1B3C53]' type="text" placeholder='search with id' 
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                onKeyDown={(e) => {if (e.key === "Enter") fetchById();}}
                />

                <button 
                onClick={fetchById}
                ><i class="fa-solid fa-magnifying-glass text-[#1B3C53]"></i></button>
            
            </div>

            {/* <div className='px-4 py- rounded-2xl bg-[#E7DFD9]'>
                <select 
                className='outline-none px-4 py-1 bg-[#E7DFD9]' 
                value={selected} 
                onChange={ (e) => {
                    const value = e.target.value;
                    setSelected(value);

                    if (value === "Books") fetchContent("Books");
                    else if (value === "Podcasts") fetchContent("Podcasts");
                }}
                >
                    <option value="Books">Books</option>
                    <option value="Podcasts">Podcasts</option>
                </select>
            </div> */}

            <div className='flex gap-x-5'>

                <div className=''>
                    <button className='text-[20px]'
                    onClick={() => setAdd(!add)}
                    >Add +</button>
                </div>

                <div className='shadow-md bg-[#1B3C53] text-white rounded-md overflow-hidden'>
                        <button
                            className="flex items-center justify-between w-full outline-none px-4 py-1 bg-[#1B3C53] text-left"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <span className="capitalize">
                                {selected}
                            </span>
                            
                            {/* <span className={`text-[12px] transform transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}>
                                ▼
                            </span> */}
                        </button>

                        {isOpen && (
                            <div className="absolute right-0 right-0 mt-2 bg-[#1B3C53] rounded-xl overflow-hidden z-50 shadow-lg border border-[#255271]">
                                {[
                                    { label: "Books", value: "Books", apiKey: "Books" },
                                    { label: "Podcasts", value: "Podcasts", apiKey: "Podcasts"}
                                ].map((option) => (
                                    <div
                                        key={option.value}
                                        onClick={() => {
                                            setSelected(option.value);
                                            fetchContent(option.apiKey);
                                            setIsOpen(false);
                                        }}
                                        className="px-4 py-2 hover:bg-[#255271] cursor-pointer transition-colors duration-150 capitalize"
                                    >
                                        {option.label}
                                    </div>
                                ))}
                            </div>
                        )}
                </div>

            </div>
            
        </div>

        <div className='h-[11vh]'></div>

        <div className="w-[100%] text-black">
            {selected === "Books" && renderBooks()}
            {selected === "Podcasts" && renderPodcasts()}
        </div>

        <div className='h-[5vh]'></div>

      </div>
    </div>
  );
}

export default Library;