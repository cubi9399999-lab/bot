import React from 'react'
import { Container, SectionHead } from './SubComponents'
import Image from 'next/image'
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import { LuFileSpreadsheet } from "react-icons/lu";
import { GoRocket } from "react-icons/go";

const About = () => {
    return (
        <section className='py-[50px] md:py-[100px]'>
            <Container>
                <div className='flex flex-wrap items-center'>

                    <div className='w-full lg:w-[60%] xl:w-1/2'>

                        <SectionHead name={'about services'} title={'Get Started In Minutes: Download The App, Create Your Profile'} info={'Digital payment has revolutionized the way we make financial transactions today With Rible you can enjoy the convenience of making secure & hassle-free payments online. Our platform provides you with a quick and eary.'} />

                        <div className='flex flex-wrap sm:justify-center md:justify-normal gap-y-8 mt-10'>
                            <div className='w-full sm:w-1/2 md:w-1/3 px-2 flex flex-col md:flex-none items-center justify-center md:items-start md:justify-normal sm:text-center md:text-left'>
                                <div className='w-20 h-20 bg-[#F0FDF4] rounded-full mb-5 flex justify-center items-center'><HiMiniDevicePhoneMobile className='text-4xl text-secondary' /></div>
                                <h5 className='text-secondary text-xl font-semibold mb-3'>1. Download</h5>
                                <p className='text-md text-pera font-medium leading-[150%]'>Join the millions already benefitting from.</p>
                            </div>
                            <div className='w-full sm:w-1/2 md:w-1/3 px-2 flex flex-col md:flex-none items-center justify-center md:items-start md:justify-normal sm:text-center md:text-left'>
                                <div className='w-20 h-20 bg-[#FEF2F2] rounded-full mb-5 flex justify-center items-center'><LuFileSpreadsheet className='text-4xl text-secondary' /></div>
                                <h5 className='text-secondary text-xl font-semibold mb-3'>2. Set Profile</h5>
                                <p className='text-md text-pera font-medium leading-[150%]'>Join the millions already benefitting from.</p>
                            </div>
                            <div className='w-full sm:w-1/2 md:w-1/3 px-2 flex flex-col md:flex-none items-center justify-center md:items-start md:justify-normal sm:text-center md:text-left'>
                                <div className='w-20 h-20 bg-[#EEF3FF] rounded-full mb-5 flex justify-center items-center'><GoRocket className='text-4xl text-secondary' /></div>
                                <h5 className='text-secondary text-xl font-semibold mb-3'>3. Start</h5>
                                <p className='text-md text-pera font-medium leading-[150%]'>Join the millions already benefitting from.</p>
                            </div>
                        </div>

                    </div>

                    <div className='w-full lg:w-[40%] xl:w-1/2 flex justify-end mt-10 lg:mt-0'>
                        <Image
                            src="/feature-iphone.png"
                            width={600}
                            height={100}
                            alt="Apple Store"
                            className='rounded-xl'
                        />
                    </div>

                </div>
            </Container>
        </section>
    )
}

export default About