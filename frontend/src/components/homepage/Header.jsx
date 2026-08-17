import { useNavigate } from 'react-router-dom';
import countryDawgggLogo from '../../assets/CountryDawggg-logo-white-fill.svg';
import {useEffect, useRef, useState} from "react";

function Header() {

    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const navigate = useNavigate();
    const searchContainerRef = useRef(null);
    const inputRef = useRef(null);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(e) {
            if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
                setIsSearchOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Focus the input as soon as it opens
    useEffect(() => {
        if (isSearchOpen) {
            inputRef.current?.focus();
        }
    }, [isSearchOpen]);

    return <header className="flex w-full z-20 items-center h-20 bg-red-600 px-4 py-3 sticky top-0 text-white sm:px-6">
        <div className="[perspective:800px] w-1/2 sm:w-5/12 md:w-3/12 lg:w-2/12">
            <img
                className="relative z-10 w-full animate-spin-y"
                src={countryDawgggLogo}
                alt="Country Dawggg logo"
            />
        </div>
        <div className="relative z-10 flex flex-1 justify-end gap-4">
            <div ref={searchContainerRef} className="relative flex items-center justify-end w-40 sm:w-56 h-9">
                <input ref={inputRef} className={`absolute inset-y-0 right-0 w-full bg-white text-black text-sm rounded-full px-3 py-1.5 outline-none transition-all duration-300 origin-right ${isSearchOpen ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 pointer-events-none"}`} placeholder="Search..." onKeyDown={(e) => e.key === "Escape" && setIsSearchOpen(false)}/>
                <button type="button" onClick={() => setIsSearchOpen(true)} className={`absolute right-0 text-sm font-semibold uppercase hover:underline transition-opacity duration-300 ${isSearchOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>Search</button>
            </div>
            <button onClick={() => navigate("/loginandsignup")} className={`text-sm font-semibold uppercase hover:underline`}>Account</button>
            <button className="text-sm font-semibold uppercase hover:underline">Cart</button>
        </div>
    </header>
}

export default Header;