import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { unsetCredentials } from "../../Utils/AuthSlice";

function Header() {
    const navigation = [
        { name: "Matches", href: "/matches" },
        { name: "Rounds", href: "/rounds" },
        { name: "Top Players", href: "/players" },
        { name: "Rules", href: "/rules" },
    ];
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.JWTtoken);
    return (
        <div>
            {" "}
            <header className=" inset-x top-0 z-50 bg-red-600">
                <nav
                    className="flex items-center justify-between p-6 lg:px-8"
                    aria-label="Global"
                >
                    <div className="flex lg:flex-1 flex-row">
                        <Link to="/" className="-m-1.5 p-1.5 flex">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-14 w-auto bg-white rounded "
                                src="/tpl_logo.png"
                                alt=""
                            />
                            <div className="text-white font-bold text-xl ml-3 text-center align-baseline text-left">
                                {" "}
                                TOLARAM <br/> 
                                <span className="text-sm">Premier League </span>
                            </div>
                        </Link>
                    </div>
                    <div className="lg:flex lg:flex-1 lg:justify-end text-white">
                        {token ? (
                            <button
                                className="text-xl font-semibold leading-6 border-2 border-white rounded-lg p-2"
                                onClick={() => {
                                    dispatch(unsetCredentials());
                                    setMobileMenuOpen(false);
                                }}
                            >
                                Log out
                            </button>
                        ) : (
                            <Link
                                onClick={() => setMobileMenuOpen(false)}
                                to="/login"
                                className="text-xl font-semibold leading-6 border-2 border-white rounded-lg p-2"
                            >
                                Log in
                            </Link>
                        )}
                    </div>
                </nav>
            </header>
        </div>
    );
}

export default Header;
