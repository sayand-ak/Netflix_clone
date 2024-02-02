import "./Header.css";
import { useRef, useState } from "react";

function SearchBox(){
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchDivRef = useRef();

    const toggleSearch = () => {
        if (searchDivRef.current) {
            searchDivRef.current.style.border = isSearchOpen ? 'none' : '1px solid #fff';
        }
        setIsSearchOpen((prev) => !prev);
    };

    return(
        <div className="flex p-2 align-middle search-div" ref={searchDivRef}>
            <button className="searchTab" aria-label="Search" data-uia="search-box-launcher" onClick={toggleSearch}>
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="search-icon ltr-4z3qvp e1svuwfo1" data-name="MagnifyingGlass" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10ZM15.6177 17.0319C14.078 18.2635 12.125 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 12.125 18.2635 14.078 17.0319 15.6177L22.7071 21.2929L21.2929 22.7071L15.6177 17.0319Z" fill="white"></path></svg>
            </button>
            <div className={`search-container ${isSearchOpen ? "open" : ""}`}>
                <input type="text" className="bg-transparent outline-none text-zinc-400 placeholder:text-sm pl-2" placeholder="Title, peoples, genres"/>
            </div>
        </div>
    )
}

export default SearchBox;