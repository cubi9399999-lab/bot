import React from 'react'
import { Container, Peragraph, SectionHead } from './SubComponents'
import { FaBars } from "react-icons/fa";
import { FaRegLightbulb } from "react-icons/fa6";
import { VscGraph } from "react-icons/vsc";
import { BiCube } from "react-icons/bi";
import { FaShieldAlt } from "react-icons/fa";
import { MdOutlineRocketLaunch } from "react-icons/md";
import { BsLayersHalf } from "react-icons/bs";
import { MdDeveloperMode } from "react-icons/md";

const Service = () => {
    return (
        <section className='py-[50px] md:py-[100px]'>
            <Container>
                <div className='flex justify-center text-center'>
                    <SectionHead name={'Services'} title={'Build a customer - centric marketing strategy'} info={'Ligula risus auctor tempus magna feugit lacinia.'} />
                </div>

                <div className='flex flex-wrap gap-y-10 md:gap-y-20 mt-16'>

                    <div className='w-full md:w-1/4 flex flex-col gap-y-3 items-center px-4'>
                        <span className='w-14 h-14 md:w-20 md:h-20 flex justify-center items-center bg-primary/70 rounded-[49%_80%_40%_90%_/_50%_30%_70%_80%]'>
                            <FaBars className='text-xl md:text-3xl text-white' />
                        </span>
                        <h3 className='text-base md:text-xl text-secondary font-bold text-center'>Market Research</h3>
                        <Peragraph text={'Gain a comprehensive understanding of your industry landscape.'} className={'text-center'} />
                    </div>

                    <div className='w-full md:w-1/4 flex flex-col gap-y-3 items-center px-4'>
                        <span className='w-14 h-14 md:w-20 md:h-20 flex justify-center items-center bg-primary/70 rounded-[49%_80%_40%_90%_/_50%_30%_70%_80%]'>
                            <FaRegLightbulb className='text-xl md:text-3xl text-white' />
                        </span>
                        <h3 className='text-base md:text-xl text-secondary font-bold text-center'>User Experience</h3>
                        <Peragraph text={'Evaluate the viability and potential of new products or services.'} className={'text-center'} />
                    </div>

                    <div className='w-full md:w-1/4 flex flex-col gap-y-3 items-center px-4'>
                        <span className='w-14 h-14 md:w-20 md:h-20 flex justify-center items-center bg-primary/70 rounded-[49%_80%_40%_90%_/_50%_30%_70%_80%]'>
                            <VscGraph className='text-xl md:text-3xl text-white' />
                        </span>
                        <h3 className='text-base md:text-xl text-secondary font-bold text-center'>Digital Marketing</h3>
                        <Peragraph text={'Benchmark your performance against competitors, identify strengths.'} className={'text-center'} />
                    </div>

                    <div className='w-full md:w-1/4 flex flex-col gap-y-3 items-center px-4'>
                        <span className='w-14 h-14 md:w-20 md:h-20 flex justify-center items-center bg-primary/70 rounded-[49%_80%_40%_90%_/_50%_30%_70%_80%]'>
                            <BiCube className='text-xl md:text-3xl text-white' />
                        </span>
                        <h3 className='text-base md:text-xl text-secondary font-bold text-center'>SEO Services</h3>
                        <Peragraph text={'Anticipate market shifts and emerging trends to stay ahead of the curve.'} className={'text-center'} />
                    </div>

                    <div className='w-full md:w-1/4 flex flex-col gap-y-3 items-center px-4'>
                        <span className='w-14 h-14 md:w-20 md:h-20 flex justify-center items-center bg-primary/70 rounded-[49%_80%_40%_90%_/_50%_30%_70%_80%]'>
                            <FaShieldAlt className='text-xl md:text-3xl text-white' />
                        </span>
                        <h3 className='text-base md:text-xl text-secondary font-bold text-center'>Market Research</h3>
                        <Peragraph text={'Our market research services are designed to provide maximum value.'} className={'text-center'} />
                    </div>

                    <div className='w-full md:w-1/4 flex flex-col gap-y-3 items-center px-4'>
                        <span className='w-14 h-14 md:w-20 md:h-20 flex justify-center items-center bg-primary/70 rounded-[49%_80%_40%_90%_/_50%_30%_70%_80%]'>
                            <MdOutlineRocketLaunch className='text-xl md:text-3xl text-white' />
                        </span>
                        <h3 className='text-base md:text-xl text-secondary font-bold text-center'>Software Development</h3>
                        <Peragraph text={'We go beyond data collection to provide actionable insights.'} className={'text-center'} />
                    </div>

                    <div className='w-full md:w-1/4 flex flex-col gap-y-3 items-center px-4'>
                        <span className='w-14 h-14 md:w-20 md:h-20 flex justify-center items-center bg-primary/70 rounded-[49%_80%_40%_90%_/_50%_30%_70%_80%]'>
                            <BsLayersHalf className='text-xl md:text-3xl text-white' />
                        </span>
                        <h3 className='text-base md:text-xl text-secondary font-bold text-center'>Affiliate Marketing</h3>
                        <Peragraph text={'We understand that every business is unique. That is why we offer.'} className={'text-center'} />
                    </div>

                    <div className='w-full md:w-1/4 flex flex-col gap-y-3 items-center px-4'>
                        <span className='w-14 h-14 md:w-20 md:h-20 flex justify-center items-center bg-primary/70 rounded-[49%_80%_40%_90%_/_50%_30%_70%_80%]'>
                            <MdDeveloperMode className='text-xl md:text-3xl text-white' />
                        </span>
                        <h3 className='text-base md:text-xl text-secondary font-bold text-center'>Website Development</h3>
                        <Peragraph text={'In todays competitive market, timing is everything. Our efficient.'} className={'text-center'} />
                    </div>

                </div>
            </Container>
        </section>
    )
}

export default Service