import React from "react";

const Navbar = () => {
    return (
        <nav className="w-full border-b bg-white">
            <div className="max-w-[1504px] mx-auto flex items-center justify-between px-[32px] py-[15px]">
                <div className="flex items-center gap-[35px]">
                    <div className="flex items-center space-x-2">
                        <img src="/logo-meta.svg" alt="logo" className="w-[64px]" />
                    </div>

                    <div className="hidden xl:flex items-center space-x-6 text-sm text-gray-700">
                        <a href="#" className="hover:text-black">AI glasses</a>
                        <a href="#" className="hover:text-black">Meta Quest</a>
                        <a href="#" className="hover:text-black">Apps and games</a>
                        <a href="#" className="hover:text-black">Explore Meta</a>
                        <a href="#" className="hover:text-black">Support</a>
                    </div>
                </div>

                <div className="xl:flex items-center space-x-5">
                    <div className="hidden xl:flex items-center text-sm space-x-6  text-gray-700">
                        <a href="#" className="hover:text-black">Explore Meta</a>
                        <a href="#" className="hover:text-black">Support</a>
                    </div>
                    <button className="hover:opacity-70">
                        <img src="/shop.svg" className="w-[24px] h-[24px] max-w-[24px]" alt="shop" />
                    </button>
                    <button className="hidden md:inline hover:opacity-70">
                        <img src="/user.svg" className="w-[24px] h-[24px] max-w-[24px]" alt="user" />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
