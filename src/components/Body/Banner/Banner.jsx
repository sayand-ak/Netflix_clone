import { useEffect, useRef, useState } from "react";
import "./Banner.css";
import BannerCarousal from "./BannerCarousal";
import axios from "axios";

function Banner(){
    const [bannerData, setBannerData] = useState({});
    const bodyRef = useRef();

    useEffect(()=>{
        const fetchData = async () => {
            const url = "https://api.themoviedb.org/3/trending/all/week?api_key=ef391cfeb6f174409ba6f7cc816802b9&language=en-US";
            const response = await axios.get(url);
            const data = await response.data;
            setBannerData(data);
        }
        fetchData();

        const bannerImg = "https://image.tmdb.org/t/p/original" + bannerData?.results?.[0]?.backdrop_path;

        if(bannerImg){
            bodyRef.current.style.backgroundImage = `url(${bannerImg})`;
            bodyRef.current.style.backgroundSize = 'cover';   
        }
    },[bannerData]);
    
    const title = bannerData?.results?.[0]?.title;
    const desciption = bannerData?.results?.[0]?.overview;

    return(
        <div className="body-container" ref={bodyRef}>
            <div className="body-contents h-3/4 flex">
                <div className="movie-data w-3/4 flex flex-col gap-4 px-12 py-40">
                    <h1 className="movieTite gap-0">{title}</h1>
                    <p className="movieDescription">{desciption?.slice(0, 200)}...</p>
                    <div className="bannerBtns flex gap-6">
                        <button className="playBtn"> 
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="18" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>                            
                        Play
                        </button>
                        <button className="moreInfoBtn">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" fill="white"/></svg>
                            More info
                        </button>
                    </div>
                </div>
                <div className="refresh-div w-1/4 flex flex-col justify-end pb-16">
                    <div className="refresh-subDiv flex justify-end gap-4">
                        <button aria-label="Replay" className="refreshBtn" type="button">
                            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="ltr-4z3qvp e1svuwfo1" data-name="Refresh" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M20.6625 7C18.9328 4.00995 15.7002 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12H24C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C16.1752 0 19.8508 2.13204 22 5.36482V2H24V8C24 8.55228 23.5523 9 23 9H17V7H20.6625Z" fill="white"></path></svg>
                        </button>
                        <span className="flex items-center border-l-2 w-16 pl-4">A</span>
                    </div>
                </div>
            </div>

            <BannerCarousal/>
        </div>
    )
}

export default Banner;