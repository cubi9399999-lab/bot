import Image from 'next/image'
import React from 'react'
import { Container, Peragraph, SectionHead } from './SubComponents'
import { IoMdCheckmark } from "react-icons/io";
import { IoLayersOutline } from "react-icons/io5";
import { FiLock } from "react-icons/fi";

const Features = () => {
    return (
        <section className='pt-[50px] pb-[50px] lg:pb-[100px] border-t border-b lg:border-b-0 lg:border-t-0'>
            <Container>
                <div className='flex flex-wrap items-center'>

                    <div className='w-full lg:w-1/2 order-2 lg:order-1 flex justify-center'>
                        <Image
                            src="/achievement.jpg"
                            width={450}
                            height={100}
                            alt="Features Image"
                            className='rounded-xl'
                        />
                    </div>

                    <div className='w-full lg:w-1/2 order-1 lg:order-2 mb-10 lg:mb-0'>
                        <SectionHead name={'Focused on achievind'} title={'Achievement Via Our Distinct Methodology'} link={'/'} className={'text-center md:text-left'} />

                        <div className='mt-10 md:border-t pt-10 flex flex-col gap-y-8'>

                            <div className='flex gap-x-10'>
                                <div className='w-auto sm:w-[100px]'>
                                    <div className='w-10 sm:w-14 h-10 sm:h-14 bg-[#EEF3FF] border border-primary border-dashed rounded-full flex justify-center items-center'><IoMdCheckmark className='text-primary text-xl sm:text-3xl' /></div>
                                </div>
                                <div>
                                    <h3 className='text-xl text-secondary font-semibold mb-1'>Manage markets with empowerment</h3>
                                    <Peragraph text={'Empower yourself to effectively manage markets with confidence. utilizing strategic insights and resources for success.'} />
                                </div>
                            </div>

                            <div className='flex gap-x-10'>
                                <div className='w-auto sm:w-[100px]'>
                                    <div className='w-10 sm:w-14 h-10 sm:h-14 bg-[#EEF3FF] border border-primary border-dashed rounded-full flex justify-center items-center'><IoLayersOutline className='text-primary text-xl sm:text-3xl' /></div>
                                </div>
                                <div>
                                    <h3 className='text-xl text-secondary font-semibold mb-1'>Manage your design and architecture</h3>
                                    <Peragraph text={'Achieve task completion optimization by effectively managing time and resources, ensuring timely delivery and efficiency.'} />
                                </div>
                            </div>

                            <div className='flex gap-x-10'>
                                <div className='w-auto sm:w-[100px]'>
                                    <div className='w-10 sm:w-14 h-10 sm:h-14 bg-[#EEF3FF] border border-primary border-dashed rounded-full flex justify-center items-center'><FiLock className='text-primary text-xl sm:text-3xl' /></div>
                                </div>
                                <div>
                                    <h3 className='text-xl text-secondary font-semibold mb-1'>Presentations in real-time</h3>
                                    <Peragraph text={'Empower yourself to effectively manage markets with confidence. utilizing strategic insights and resources for success.'} />
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </Container>
        </section>
    )
}

export default Features