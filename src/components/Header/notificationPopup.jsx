import { useEffect, useState } from "react";
import axios from 'axios'
import "./Header.css";

function NotificationPopup(){
    const [ popularMovie, setPopulaeMovie ] = useState();

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const url = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=ef391cfeb6f174409ba6f7cc816802b9"
                const response = await axios.get(url);
                const data = response.data;
                setPopulaeMovie(data);
            } catch (error) {
                console.log("error");
            }
        }
        fetchData();
    }, []);    
    
    const firstMovieTitle = popularMovie?.results?.[0]?.title;
    const posterUrl = "https://image.tmdb.org/t/p/original/";
    const backdrop_path = popularMovie?.results?.[0]?.backdrop_path;

    return(
        <div className="notificationPopup-div">
            <svg width="25" height="25" viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg" className="ltr-4z3qvp e1svuwfo1" data-name="Bell" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M13.0002 4.07092C16.3924 4.55624 19 7.4736 19 11V15.2538C20.0489 15.3307 21.0851 15.4245 22.1072 15.5347L21.8928 17.5232C18.7222 17.1813 15.4092 17 12 17C8.59081 17 5.27788 17.1813 2.10723 17.5232L1.89282 15.5347C2.91498 15.4245 3.95119 15.3307 5.00003 15.2538V11C5.00003 7.47345 7.60784 4.55599 11.0002 4.07086V2H13.0002V4.07092ZM17 15.1287V11C17 8.23858 14.7614 6 12 6C9.2386 6 7.00003 8.23858 7.00003 11V15.1287C8.64066 15.0437 10.3091 15 12 15C13.691 15 15.3594 15.0437 17 15.1287ZM8.62593 19.3712C8.66235 20.5173 10.1512 22 11.9996 22C13.848 22 15.3368 20.5173 15.3732 19.3712C15.3803 19.1489 15.1758 19 14.9533 19H9.0458C8.82333 19 8.61886 19.1489 8.62593 19.3712Z" fill="white"></path> </svg>
            <div className="popup-div gap-3">
                <div className="movie-img flex p-2">
                    <img src={`${posterUrl+backdrop_path}`} alt="" height="80px" width="110px"/>
                </div>
                <div className="p-1">
                    <h3>New arrival</h3>
                    <h3>{firstMovieTitle}</h3>
                    <p className="text-xs text-gray-400">1 day ago</p>

                </div>
            </div>
        </div>
    )
}

export default NotificationPopup;