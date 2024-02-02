import "./Header.css"
import ProfilePopup from "./ProfilePopup";
import NotificationPopup from "./notificationPopup";
import SearchBox from "./searchBox";
import Banner from "../Body/Banner/Banner";
import NewRelease from "../Body/Main/newRelease";

function Header(){
    return(
        <>
            <header className="main-header flex px-12 h-16 items-center bg-transparent justify-between relative z-10">
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

                <div className="flex items-center gap-3 mx-4">
                    <SearchBox />
                    <NotificationPopup />
                    <ProfilePopup />
                </div>
            </header>

            <section className="body-main-section absolute top-0">
                <Banner/>
                <NewRelease/>
            </section>
        </>
    )
}

export default Header;
