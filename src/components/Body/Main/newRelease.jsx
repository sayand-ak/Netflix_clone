import { useState, useEffect } from "react";
import axios from "axios";
import "./main.css";

function NewRelease(){
    const [newReleaseDatas, setNewReleaseDatas] = useState({});
    const [sliderIndex, setSliderIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
        const url =
            "https://api.themoviedb.org/3/discover/movie?api_key=ef391cfeb6f174409ba6f7cc816802b9&with_genres=28";
        const response = await axios.get(url);
        const data = await response.data;
        setNewReleaseDatas(data);
        };
        fetchData();
    }, [newReleaseDatas]);

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

    return (
        <div className="flex flex-col justify-end pt-6 gap-2" style={{backgroundColor:"#141414"}}>
            <h1 className="newRelease-heading pl-12">Top Action Movies</h1>
            <div className="newRelease-carousal">
                <button className="release-handle left-handle pb-3" onClick={handlePrevSlide}></button>
                    <div className="slider" style={{
                        transform: `translateX(calc(-${sliderIndex * 100}%))`,
                        transition: "transform 0.5s ease-in-out",
                    }}>
                        {results?.map((item) => (
                            <div key={item.id} className="release-carousal-cards" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`}}></div>
                        ))}
                    </div>
                <button className="handle right-handle pb-3" onClick={handleNextSlide}></button>
            </div>
        </div>
    );
}

export default NewRelease;