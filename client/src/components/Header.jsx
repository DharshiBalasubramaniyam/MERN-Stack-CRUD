import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AuthService } from "../services/AuthService";
import CategoryWrapper from "./CategoryWrapper";

function Header() {
    const { username, email } = useSelector((state) => state.auth)
    const [isUserMenuOpen, setUserMenuOpen] = useState(false)
    const [isCategoryWrapperOpen, setCategoryWrapperOpen] = useState(false)
    const profileRef = useRef();
    const { logOut } = AuthService();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    return (
        <div className="flex justify-between items-center w-full px-3 md:px-8 py-4 bg-blue-900 z-10">
            <h1 className="text-white text-2xl text-center font-bold">MyToDo</h1>
            <div className="flex items-center relative">
                <div className="flex items-center ms-3" ref={profileRef}>
                    <div onClick={() => { setUserMenuOpen(!isUserMenuOpen) }}>
                        <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                            <span className="sr-only">Open user menu</span>
                            <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo" />
                        </button>
                    </div>
                    {
                        isUserMenuOpen && (
                            <div className="absolute top-2/3 right-2 z-20 my-4 text-base list-none bg-bg-light-primary divide-y divide-blue-200 rounded-sm bg-white border shadow-md" id="dropdown-user">
                                <div className="px-4 py-3" role="none">
                                    <p className="text-xl text-text-light-primary dark:text-text-dark-primary capitalize" role="none">
                                        {username}
                                    </p>

                                    <p className="text-sm font-medium text-text-light-primary dark:text-text-dark-primary truncate" role="none">
                                        {email}
                                    </p>

                                </div>
                                <ul className="py-1" role="none">
                                    <li onClick={() => setCategoryWrapperOpen(true)}>
                                        <span className="block px-4 py-2 text-sm hover:bg-blue-100 cursor-pointer" role="menuitem">Categories</span>
                                    </li>
                                </ul>
                                <ul className="py-1" role="none">
                                    <li>
                                        <span className="block px-4 py-2 text-sm hover:bg-blue-100 cursor-pointer" role="menuitem">Profile</span>
                                    </li>
                                </ul>
                                <ul className="py-1" role="none">
                                    <li onClick={logOut}>
                                        <span className="block px-4 py-2 text-sm hover:bg-blue-100 cursor-pointer" role="menuitem">Sign out</span>
                                    </li>
                                </ul>
                            </div>
                        )
                    }
                </div>
            </div>
            {isCategoryWrapperOpen && <CategoryWrapper onClose={() => setCategoryWrapperOpen(false)}/>}
        </div>
    )
}

export default Header;