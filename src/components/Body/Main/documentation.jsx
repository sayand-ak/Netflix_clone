import { useState, useEffect } from "react";
import axios from "axios";
import "./main.css";
import CustomModal from "../../Modal";
import VideoPlayer from "../../utilities/ReactPlayer";


function Documentation(){
    const [newReleaseDatas, setNewReleaseDatas] = useState({});
    const [sliderIndex, setSliderIndex] = useState(0);
    const [genrns, setGenres] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [videoURL, setVideoURL] = useState(null);
    const [ modalData, setModalData ] = useState({});

    useEffect(() => {
        const fetchData = async () => {
        const url1 = "https://api.themoviedb.org/3/discover/movie?api_key=ef391cfeb6f174409ba6f7cc816802b9&with_genres=99";
        const response = await axios.get(url1);
        const data = await response.data;
        setNewReleaseDatas(data);
        };
        fetchData();
    }, [newReleaseDatas]);

    const fetchGernData = async (id) =>{
        const url2 = `https://api.themoviedb.org/3/movie/${id}?api_key=ef391cfeb6f174409ba6f7cc816802b9`;
        const response = await axios(url2);
        const data = await response.data;
        console.log(data);
        const movieData = {
            title: data.title,
            genres: data.genres||[],
            description: data.overview,
            production: data.production_companies||[],
            vote_average: Math.round((( data.vote_average / 10) * 100), 2),
            release_date: data.release_date
        }
        setModalData(movieData);
        setGenres(data.genres)
    }

    const results = newReleaseDatas?.results;

    const handleNextSlide = () => {
        if(sliderIndex <= results.length % 6){
            setSliderIndex((prevIndex) => (prevIndex + 1) % results.length);
        }else{
            setSliderIndex(0);
        }
    };

    const handlePrevSlide = () => {
        if(sliderIndex > 0){
            setSliderIndex(
                (prevIndex) => (prevIndex - 1 + results.length) % results.length
            );
        }
    };

    async function MovieVideo(movie_id){    
        const movieURL = `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=ef391cfeb6f174409ba6f7cc816802b9`;
        const response = await axios.get(movieURL);
        const data = await response.data;
        return{
            key: data?.results[0]?.key,
        }
    }

    const openModal = async (movie_id) => {
        const movieData = await MovieVideo(movie_id);
        const updatedVideoURL = `https://www.youtube.com/watch?v=${movieData.key}`;
        setVideoURL(updatedVideoURL);
        setIsModalOpen(true);
    };
    
    
    const closeModal = () => {
    setIsModalOpen(false);
    };
    
    return (
        <div className="flex flex-col justify-center pt-6 gap-2 newRelease-container">
            <h1 className="newRelease-heading pl-12">Documentation Movies</h1>
            <div className="newRelease-carousal">
                <button className="release-handle left-handle pb-3" onClick={handlePrevSlide}></button>
                <div className="slider" style={{ transform: `translateX(calc(-${sliderIndex * 100}%))`, transition: "transform 0.5s ease-in-out", }}>
                    {results?.map((item) => (
                        <div key={item.id} className="release-carousal-item">
                            <div className="release-carousal-cards" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})` }}></div>
                            <div className="hover-div" onMouseOver={() => { fetchGernData(item.id); } }>

                                <div className="hover-Img" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})` }}></div>

                                <div className="h-16 flex items-center justify-between">

                                    <span className="flex gap-2 px-3">
                                        {/* play button */}
                                        <button className="btn play-btn" onClick={()=>{openModal(item.id)}}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ltr-4z3qvp e1svuwfo1" data-name="Play" aria-hidden="true"><path d="M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L23.4069 11.1238C24.0977 11.5037 24.0977 12.4963 23.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z" fill="white"></path></svg>
                                        </button>
                                        {/* add button */}
                                        <button className="btn add-btn">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ltr-4z3qvp e1svuwfo1" data-name="Plus" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M11 11V2H13V11H22V13H13V22H11V13H2V11H11Z" fill="currentColor"></path></svg>
                                        </button>
                                        {/* like button */}
                                        <button className="btn like-btn">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ltr-4z3qvp e1svuwfo1" data-name="ThumbsUp" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M10.696 8.7732C10.8947 8.45534 11 8.08804 11 7.7132V4H11.8377C12.7152 4 13.4285 4.55292 13.6073 5.31126C13.8233 6.22758 14 7.22716 14 8C14 8.58478 13.8976 9.1919 13.7536 9.75039L13.4315 11H14.7219H17.5C18.3284 11 19 11.6716 19 12.5C19 12.5929 18.9917 12.6831 18.976 12.7699L18.8955 13.2149L19.1764 13.5692C19.3794 13.8252 19.5 14.1471 19.5 14.5C19.5 14.8529 19.3794 15.1748 19.1764 15.4308L18.8955 15.7851L18.976 16.2301C18.9917 16.317 19 16.4071 19 16.5C19 16.9901 18.766 17.4253 18.3994 17.7006L18 18.0006L18 18.5001C17.9999 19.3285 17.3284 20 16.5 20H14H13H12.6228C11.6554 20 10.6944 19.844 9.77673 19.5382L8.28366 19.0405C7.22457 18.6874 6.11617 18.5051 5 18.5001V13.7543L7.03558 13.1727C7.74927 12.9688 8.36203 12.5076 8.75542 11.8781L10.696 8.7732ZM10.5 2C9.67157 2 9 2.67157 9 3.5V7.7132L7.05942 10.8181C6.92829 11.0279 6.72404 11.1817 6.48614 11.2497L4.45056 11.8313C3.59195 12.0766 3 12.8613 3 13.7543V18.5468C3 19.6255 3.87447 20.5 4.95319 20.5C5.87021 20.5 6.78124 20.6478 7.65121 20.9378L9.14427 21.4355C10.2659 21.8094 11.4405 22 12.6228 22H13H14H16.5C18.2692 22 19.7319 20.6873 19.967 18.9827C20.6039 18.3496 21 17.4709 21 16.5C21 16.4369 20.9983 16.3742 20.995 16.3118C21.3153 15.783 21.5 15.1622 21.5 14.5C21.5 13.8378 21.3153 13.217 20.995 12.6883C20.9983 12.6258 21 12.5631 21 12.5C21 10.567 19.433 9 17.5 9H15.9338C15.9752 8.6755 16 8.33974 16 8C16 6.98865 15.7788 5.80611 15.5539 4.85235C15.1401 3.09702 13.5428 2 11.8377 2H10.5Z" fill="currentColor"></path></svg>
                                        </button>
                                    </span>

                                    <span>
                                        <button className="btn mx-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="20" width="17.5" viewBox="0 0 448 512"><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" fill="white" /></svg>
                                        </button>
                                    </span>
                                </div>

                                <div className="flex items-center justify-between px-3">
                                    <p className=" text-green-600 text-lg font-semibold">{Math.round(((item.vote_average / 10) * 100), 2)}% match</p>
                                    <p className="releaseDate text-sm">{item.release_date}</p>
                                    <p className="hdIcon">HD</p>
                                </div>

                                <div className="genereslist px-2 fit py-2">
                                    <ul className="flex text-sm text-white gap-3">
                                        {genrns?.map((genreItem) => (
                                            <li key={genreItem.id}>{genreItem.name}</li>
                                        ))}
                                    </ul>
                                </div>


                            </div>
                        </div>
                    ))}
                </div>
                <button className="handle right-handle pb-3" onClick={handleNextSlide}></button>
            </div>
            <CustomModal isOpen={isModalOpen} onRequestClose={closeModal}>
                <VideoPlayer videoUrl={videoURL} closeModal={closeModal}/>
                <div className="flex" style={{height:"15rem"}}>
                    <div className="modalDescription w-3/4">
                        <span className="flex gap-4 px-4">
                            <h1 className="text-green-600 text-lg font-semibold">{modalData.vote_average}% Match</h1>
                            <h1>{modalData.release_date}</h1>
                        </span>
                        <h1 className="title font-bold">{modalData.title}</h1>
                        <h1 className="px-4">{modalData.description}</h1>
                    </div>

                    <div className="Geners-productions flex flex-col gap-5 w-1/4 text-white p-8">
                        <span className=" font-bold ">
                            Production: {modalData?.production?.map((item) => (
                                <p key={item.id} className=" font-thin">{item.name}</p>
                            ))}
                        </span>

                        <span className="font-bold">
                            Genre: {modalData?.genres?.map((item) => (
                                <h1 key={item.id} className="font-thin">{item.name}</h1>
                            ))}
                        </span>
                    </div>
                    
                </div>
            </CustomModal>
        </div>
    );
}

export default Documentation;