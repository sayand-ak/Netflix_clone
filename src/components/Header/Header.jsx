import { useEffect, useState } from "react";
import "./Header.css"
import ProfilePopup from "./ProfilePopup";
import NotificationPopup from "./notificationPopup";
import SearchBox from "./searchBox";

function Header(){
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return(
        <>
            <header className={`main-header flex px-12 h-16 items-center justify-between z-10 fixed  ${scrolled ? 'scrolled' : ''}`}>
                <div className='flex gap-12'>
                    <a href="#" className="header-logo"><img className="h-7 w-22" src="./src/assets/logo-shadow2x.png" alt="error"/></a>
                    <ul className="list-none flex gap-5 text-sm text-white items-center">
                        <li>Home</li>
                        <li>TV Show</li>
                        <li>Movies</li>
                        <li>News & Popular</li>
                        <li>My List</li>
                        <li>Browse by Languages</li>
                    </ul>
                </div>

                <div className="flex items-center gap-3">
                    <SearchBox />
                    <NotificationPopup />
                    <ProfilePopup />
                </div>
            </header>
        </>
    )
}

export default Header;
