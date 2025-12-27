import React from 'react'
import { Container, Peragraph } from './SubComponents'
import Image from 'next/image'
import Link from 'next/link'
import { LuMail } from "react-icons/lu";
import { FiPhone } from "react-icons/fi";
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className='bg-footerBg'>
            <Container>
                <div className='flex flex-col md:flex-row justify-between pt-[50px] md:pt-20 pb-10 md:pb-24'>

                    <div className='w-full md:w-3/12 flex flex-col gap-y-6'>
                        <Image
                            src="/logo.png"
                            width={160}
                            height={100}
                            alt="Logo"
                        />
                        <Peragraph text={'This may include the companys address, phone number, email address, and links to social media profiles.'} className={'!text-footerLink'} />
                        <div className='flex flex-col gap-y-3'>
                            <Link href={'/'} className='flex items-center gap-x-4 text-footerLink text-base hover:text-footerLink/70 duration-300'><LuMail /> Info@abcd.com</Link>
                            <Link href={'/'} className='flex items-center gap-x-4 text-footerLink text-base hover:text-footerLink/70 duration-300'><FiPhone /> (888) 253 145 148</Link>
                        </div>
                    </div>

                    <div className='w-full flex-wrap sm:flex-row md:w-7/12 flex gap-y-10 mt-10 md:mt-0'>
                        <div className='w-1/2 sm:w-1/3'>
                            <h6 className='text-[#F3F4F6] text-base font-semibold uppercase mb-5'>Company</h6>
                            <ul className='flex flex-col gap-y-4'>
                                <li><Link href={'/'} className='text-base text-footerLink capitalize hover:text-footerLink/60 duration-300'>About</Link></li>
                                <li><Link href={'/'} className='text-base text-footerLink capitalize hover:text-footerLink/60 duration-300'>services</Link></li>
                                <li><Link href={'/'} className='text-base text-footerLink capitalize hover:text-footerLink/60 duration-300'>portfolio</Link></li>
                                <li><Link href={'/'} className='text-base text-footerLink capitalize hover:text-footerLink/60 duration-300'>blog</Link></li>
                                <li><Link href={'/'} className='text-base text-footerLink capitalize hover:text-footerLink/60 duration-300'>contact</Link></li>
                            </ul>
                        </div>
                        <div className='w-1/2 sm:w-1/3'>
                            <h6 className='text-[#F3F4F6] text-base font-semibold uppercase mb-5'>Product</h6>
                            <ul className='flex flex-col gap-y-4'>
                                <li><Link href={'/'} className='text-base text-footerLink capitalize hover:text-footerLink/60 duration-300'>services</Link></li>
                                <li><Link href={'/'} className='text-base text-footerLink capitalize hover:text-footerLink/60 duration-300'>about us</Link></li>
                                <li><Link href={'/'} className='text-base text-footerLink capitalize hover:text-footerLink/60 duration-300'>News & Stories</Link></li>
                                <li><Link href={'/'} className='text-base text-footerLink capitalize hover:text-footerLink/60 duration-300'>Roadmap</Link></li>
                            </ul>
                        </div>
                        <div className='w-1/2 sm:w-1/3'>
                            <h6 className='text-[#F3F4F6] text-base font-semibold uppercase mb-5'>Important Links</h6>
                            <ul className='flex flex-col gap-y-4'>
                                <li><Link href={'/'} className='text-base text-footerLink capitalize hover:text-footerLink/60 duration-300'>Our Journeys</Link></li>
                                <li><Link href={'/'} className='text-base text-footerLink capitalize hover:text-footerLink/60 duration-300'>Roadmap</Link></li>
                                <li><Link href={'/'} className='text-base text-footerLink capitalize hover:text-footerLink/60 duration-300'>Pricing Plans</Link></li>
                                <li><Link href={'/'} className='text-base text-footerLink capitalize hover:text-footerLink/60 duration-300'>Privacy Policy</Link></li>
                                <li><Link href={'/'} className='text-base text-footerLink capitalize hover:text-footerLink/60 duration-300'>Terms & Conditions</Link></li>
                            </ul>
                        </div>
                    </div>

                </div>
            </Container>
            <div className='py-5 bg-copyRightBg'>
                <Container>
                    <div className='flex flex-col md:flex-row justify-between items-center'>
                        <p className='text-white text-base order-2 md:order-1'>2024 © Developer - <a href="http://somor-mk.vercel.app" target='_blank'>somor-mk.vercel.app</a></p>

                        <ul className='flex gap-x-2 order-1 md:order-2 mb-4 md:mb-0'>
                            <li><a href="#" className='w-9 h-9 rounded-lg flex justify-center items-center hover:bg-primary duration-300'><FaFacebook className='text-white text-lg'/></a></li>
                            <li><a href="#" className='w-9 h-9 rounded-lg flex justify-center items-center hover:bg-primary duration-300'><FaGoogle className='text-white text-lg'/></a></li>
                            <li><a href="#" className='w-9 h-9 rounded-lg flex justify-center items-center hover:bg-primary duration-300'><FaTwitter className='text-white text-lg'/></a></li>
                            <li><a href="#" className='w-9 h-9 rounded-lg flex justify-center items-center hover:bg-primary duration-300'><FaGithub className='text-white text-lg'/></a></li>
                            <li><a href="#" className='w-9 h-9 rounded-lg flex justify-center items-center hover:bg-primary duration-300'><FaLinkedin className='text-white text-lg'/></a></li>
                        </ul>
                    </div>
                </Container>
            </div>
        </footer>
    )
}

export default Footer