import { useEffect, useState } from "react";
import "./Banner.css";
import axios from "axios";

function BannerCarousal() {
    const [carousalDatas, setCarousalDatas] = useState({});
    const [sliderIndex, setSliderIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
        const url =
            "https://api.themoviedb.org/3/trending/all/week?api_key=ef391cfeb6f174409ba6f7cc816802b9&language=en-US";
        const response = await axios.get(url);
        const data = await response.data;
        setCarousalDatas(data);
        };
        fetchData();
    }, [carousalDatas]);

    const results = carousalDatas?.results;

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
        <div className="h-1/4 flex flex-col justify-end gap-2">
            <h1 className="carousal-heading pl-12">Top Picks for You</h1>
            <div className="body-carousal">
                <button className="handle left-handle pb-3" onClick={handlePrevSlide}></button>
                    <div className="slider" style={{
                        transform: `translateX(calc(-${sliderIndex * 100}%))`,
                        transition: "transform 0.5s ease-in-out",
                    }}>
                        {results?.map((item) => (
                            <div key={item.id} className="carousal-cards" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`}}></div>
                        ))}
                    </div>
                <button className="handle right-handle pb-3" onClick={handleNextSlide}></button>
            </div>
        </div>
    );
}

export default BannerCarousal;
