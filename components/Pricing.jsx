'use client'

import React, { useState } from 'react'
import { Container, Peragraph, SectionHead } from './SubComponents'
import Image from 'next/image'
import { IoMdCheckmark } from "react-icons/io";
import { HiXMark } from "react-icons/hi2";

const Pricing = () => {
    let [activePlan, setActivePlan] = useState('month')

    return (
        <section className='pb-[100px]'>
            <Container>
                <div className='flex justify-center text-center'>
                    <SectionHead name={'pricing'} title={'Get the power of the professional services with the simple price'} />
                </div>

                <div className='flex flex-col items-center gap-y-5 mt-10'>
                    <div className='p-1 border border-primary/30 rounded-md flex gap-x-3'>
                        <div onClick={() => setActivePlan('month')} className={`py-[6px] px-5 rounded-tl-md rounded-bl-md text-base font-medium uppercase cursor-pointer ${activePlan == 'month' ? 'bg-primary text-white' : 'bg-transparent text-secondary'}`}>Monthly</div>
                        <div onClick={() => setActivePlan('anual')} className={`py-[6px] px-5 rounded-tr-md rounded-br-md text-base font-medium uppercase cursor-pointer ${activePlan == 'anual' ? 'bg-primary text-white' : 'bg-transparent text-secondary'}`}>Annual</div>
                    </div>
                    <Peragraph text={'Save up to 15% with Annual Plan.'} />
                </div>

                <div className='flex flex-wrap lg:flex-nowrap lg:gap-x-10 xl:gap-x-12 gap-y-12 mt-10'>

                    <div className='w-full lg:w-1/3 bg-white p-[50px] shadow-2xl rounded-lg flex flex-col items-center gap-y-3'>
                        <Image
                            src="/vector-1.png"
                            width={120}
                            height={100}
                            alt="vector-1"
                        />
                        <h3 className='text-secondary text-2xl font-semibold'>Standard</h3>
                        <h2 className='text-secondary text-5xl font-semibold'><sup className='text-3xl'>$</sup> {activePlan == 'month' && '49'}{activePlan == 'anual' && '199'}</h2>
                        <Peragraph text={'per month'} />

                        <ul className='flex flex-col gap-y-5 mt-5'>
                            <li className='flex items-center gap-x-3 text-md text-secondary font-medium'><IoMdCheckmark className='text-2xl text-primary' /> 1 Gb Storage</li>
                            <li className='flex items-center gap-x-3 text-md text-secondary font-medium'><IoMdCheckmark className='text-2xl text-primary' /> 3 Domain Names</li>
                            <li className='flex items-center gap-x-3 text-md text-secondary font-medium'><IoMdCheckmark className='text-2xl text-primary' /> 5 FTP Users</li>
                            <li className='flex items-center gap-x-3 text-md text-[#707070] font-medium'><HiXMark className='text-2xl text-[#707070]' /> Free Support</li>
                            <li className='flex items-center gap-x-3 text-md text-[#707070] font-medium'><HiXMark className='text-2xl text-[#707070]' /> Free SSI Certificate</li>
                        </ul>
                        <button className='py-2 px-5 bg-primary rounded-md w-full text-white text-lg font-medium mt-8 hover:bg-hover duration-300'>Buy Standard</button>
                    </div>

                    <div className='w-full lg:w-1/3 bg-white p-[50px] shadow-2xl rounded-lg flex flex-col items-center gap-y-3'>
                        <Image
                            src="/vector-2.png"
                            width={120}
                            height={100}
                            alt="vector-2"
                        />
                        <h3 className='text-secondary text-2xl font-semibold'>Premium</h3>
                        <h2 className='text-secondary text-5xl font-semibold'><sup className='text-3xl'>$</sup> {activePlan == 'month' && '78'}{activePlan == 'anual' && '299'}</h2>
                        <Peragraph text={'per month'} />

                        <ul className='flex flex-col gap-y-5 mt-5'>
                            <li className='flex items-center gap-x-3 text-md text-secondary font-medium'><IoMdCheckmark className='text-2xl text-primary' /> 1 Gb Storage</li>
                            <li className='flex items-center gap-x-3 text-md text-secondary font-medium'><IoMdCheckmark className='text-2xl text-primary' /> 3 Domain Names</li>
                            <li className='flex items-center gap-x-3 text-md text-secondary font-medium'><IoMdCheckmark className='text-2xl text-primary' /> 5 FTP Users</li>
                            <li className='flex items-center gap-x-3 text-md text-secondary font-medium'><IoMdCheckmark className='text-2xl text-primary' /> Free Support</li>
                            <li className='flex items-center gap-x-3 text-md text-[#707070] font-medium'><HiXMark className='text-2xl text-[#707070]' /> Free SSI Certificate</li>
                        </ul>
                        <button className='py-2 px-5 bg-primary rounded-md w-full text-white text-lg font-medium mt-8 hover:bg-hover duration-300'>Buy Premium</button>
                    </div>

                    <div className='w-full lg:w-1/3 bg-white p-[50px] shadow-2xl rounded-lg flex flex-col items-center gap-y-3'>
                        <Image
                            src="/vector-3.png"
                            width={80}
                            height={50}
                            alt="vector-3"
                        />
                        <h3 className='text-secondary text-2xl font-semibold'>Enterprise</h3>
                        <h2 className='text-secondary text-5xl font-semibold'><sup className='text-3xl'>$</sup> {activePlan == 'month' && '99'}{activePlan == 'anual' && '399'}</h2>
                        <Peragraph text={'per month'} />

                        <ul className='flex flex-col gap-y-5 mt-5'>
                            <li className='flex items-center gap-x-3 text-md text-secondary font-medium'><IoMdCheckmark className='text-2xl text-primary' /> 1 Gb Storage</li>
                            <li className='flex items-center gap-x-3 text-md text-secondary font-medium'><IoMdCheckmark className='text-2xl text-primary' /> 3 Domain Names</li>
                            <li className='flex items-center gap-x-3 text-md text-secondary font-medium'><IoMdCheckmark className='text-2xl text-primary' /> 5 FTP Users</li>
                            <li className='flex items-center gap-x-3 text-md text-secondary font-medium'><IoMdCheckmark className='text-2xl text-primary' /> Free Support</li>
                            <li className='flex items-center gap-x-3 text-md text-secondary font-medium'><IoMdCheckmark className='text-2xl text-primary' /> Free SSI Certificate</li>
                        </ul>
                        <button className='py-2 px-5 bg-primary rounded-md w-full text-white text-lg font-medium mt-8 hover:bg-hover duration-300'>Buy Enterprise</button>
                    </div>

                </div>

            </Container>
        </section>
    )
}

export default Pricing