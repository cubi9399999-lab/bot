'use client'

import Link from 'next/link'
import Image from 'next/image'
import { GrCloudDownload } from "react-icons/gr";
import { useEffect, useState } from 'react';
import { Container } from './SubComponents';
import { FaCircleXmark } from "react-icons/fa6";
import { FaBarsStaggered } from "react-icons/fa6";

const NavbarPage = () => {
    const [navBg, setNavBg] = useState(false)
    const [navShow, setNavShow] = useState(false)

    // Function to handle the scroll event
    const handleScroll = () => {
        scrollY > 10 ? setNavBg(true) : setNavBg(false)
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full z-10 py-[30px] duration-300 ${navBg && 'bg-white !py-4 border-b shadow-lg'}`}>
            <Container>
                <div className='flex justify-between items-center'>

                    <div>
                        <Link href="/">
                            <Image
                                src="/logo.png"
                                width={150}
                                height={0}
                                alt="Logo"
                            />
                        </Link>
                    </div>

                    <div className='lg:hidden'>
                        <FaBarsStaggered onClick={() => setNavShow(true)} className='text-2xl text-secondary cursor-pointer' />
                    </div>

                    <div className={`flex flex-col justify-center items-center gap-y-5 absolute top-0 w-full h-screen bg-black/80 lg:flex-row lg:gap-x-10 lg:static lg:bg-transparent lg:w-auto lg:h-auto duration-300 ${navShow ? 'right-0' : 'right-[100%]'}`}>
                        <Link href='/' className='flex gap-x-2 items-center text-white lg:text-primary text-base font-medium duration-300 hover:text-hover'>Home</Link>
                        <Link href='/' className='flex gap-x-2 items-center text-white lg:text-secondary text-base font-medium duration-300 hover:text-hover'>Service</Link>
                        <Link href='/' className='flex gap-x-2 items-center text-white lg:text-secondary text-base font-medium duration-300 hover:text-hover'>Features</Link>
                        <Link href='/' className='flex gap-x-2 items-center text-white lg:text-secondary text-base font-medium duration-300 hover:text-hover'>About</Link>
                        <Link href='/' className='flex gap-x-2 items-center text-white lg:text-secondary text-base font-medium duration-300 hover:text-hover'>Pricing</Link>
                        <Link href='/' className='flex gap-x-2 items-center text-white lg:text-secondary text-base font-medium duration-300 hover:text-hover'>Portfolio</Link>
                        <Link href='/' className='flex gap-x-2 items-center text-white lg:text-secondary text-base font-medium duration-300 hover:text-hover'>Blog</Link>
                        <Link href='/' className='flex gap-x-2 items-center text-white lg:text-secondary text-base font-medium duration-300 hover:text-hover'>Contact</Link>

                        <div className='mt-10 lg:hidden'>
                            <Link href={'/'} className='px-6 py-2 bg-primary rounded-lg flex gap-x-2 items-center text-base text-white font-bold hover:bg-hover duration-300'><GrCloudDownload /> Download</Link>
                        </div>

                        <span onClick={() => setNavShow(false)} className='absolute top-8 right-8 cursor-pointer lg:hidden'><FaCircleXmark className='text-white text-3xl' /></span>
                    </div>

                    <div className='hidden xl:block'>
                        <Link href={'/'} className='px-6 py-2 bg-primary rounded-lg flex gap-x-2 items-center text-base text-white font-bold hover:bg-hover duration-300'><GrCloudDownload /> Download</Link>
                    </div>

                </div>
            </Container>
        </nav>
    )
}

export default NavbarPage