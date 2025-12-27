import React from 'react'
import { Container, SectionHead } from './SubComponents'
import Link from 'next/link'
import { SlLocationPin } from "react-icons/sl";
import { IoMailUnreadOutline } from "react-icons/io5";
import { IoMdPhonePortrait } from "react-icons/io";
import { IoSend } from "react-icons/io5";

const Contact = () => {
    return (
        <section className='py-[50px] md:py-[100px] bg-[#F9FAFB]'>
            <Container>
                <div className='flex flex-col md:flex-row justify-between'>

                    <div className='w-full md:w-4/12'>
                        <SectionHead name={'Contact Us'} title={'We are open to talk to good people.'} />

                        <div className='mt-10 border-t pt-10 flex flex-col gap-y-8'>

                            <div className='flex gap-x-5'>
                                <div className=''>
                                    <div className='w-12 h-12 bg-[#EEF3FF] rounded-full flex justify-center items-center'><SlLocationPin className='text-primary text-xl' /></div>
                                </div>
                                <div>
                                    <h5 className='text-base text-pera font-medium mb-1'>123 King Street, London W60 10250</h5>
                                    <Link href={'/'} className='text-primary text-sm font-semibold uppercase'>See more</Link>
                                </div>
                            </div>

                            <div className='flex gap-x-5'>
                                <div className=''>
                                    <div className='w-12 h-12 bg-[#EEF3FF] rounded-full flex justify-center items-center'><IoMailUnreadOutline className='text-primary text-xl' /></div>
                                </div>
                                <div>
                                    <h5 className='text-base text-pera font-medium mb-1'>support@zoyothemes.com</h5>
                                    <Link href={'/'} className='text-primary text-sm font-semibold uppercase'>say hello</Link>
                                </div>
                            </div>

                            <div className='flex gap-x-5'>
                                <div className=''>
                                    <div className='w-12 h-12 bg-[#EEF3FF] rounded-full flex justify-center items-center'><IoMdPhonePortrait className='text-primary text-xl' /></div>
                                </div>
                                <div>
                                    <h5 className='text-base text-pera font-medium mb-1'>(+01) 1234 5678 00</h5>
                                    <Link href={'/'} className='text-primary text-sm font-semibold uppercase'>call now</Link>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className='w-full md:w-7/12 mt-10 md:mt-0'>
                        <div className='w-full h-full bg-white rounded-lg shadow-xl p-8 sm:px-[60px] sm:py-[60px]'>
                            <form action='' className='flex gap-y-7 justify-between flex-wrap'>

                                <div className='w-full md:w-[48%] flex flex-col gap-y-2'>
                                    <label className='text-sm text-secondary font-bold'>First Name</label>
                                    <input type="text" placeholder='Your first name....' className='px-4 py-2 border rounded-md focus-visible:outline-none placeholder:text-pera placeholder:text-sm' required />
                                </div>

                                <div className='w-full md:w-[48%] flex flex-col gap-y-2'>
                                    <label className='text-sm text-secondary font-bold'>Last Name</label>
                                    <input type="text" placeholder='Your last name....' className='px-4 py-2 border rounded-md focus-visible:outline-none placeholder:text-pera placeholder:text-sm' required />
                                </div>

                                <div className='w-full md:w-[48%] flex flex-col gap-y-2'>
                                    <label className='text-sm text-secondary font-bold'>Email Address</label>
                                    <input type="email" placeholder='Your email....' className='px-4 py-2 border rounded-md focus-visible:outline-none placeholder:text-pera placeholder:text-sm' required />
                                </div>

                                <div className='w-full md:w-[48%] flex flex-col gap-y-2'>
                                    <label className='text-sm text-secondary font-bold'>Phone Number</label>
                                    <input type="text" placeholder='Type phone number....' className='px-4 py-2 border rounded-md focus-visible:outline-none placeholder:text-pera placeholder:text-sm' required />
                                </div>

                                <div className='w-full flex flex-col gap-y-2'>
                                    <label className='text-sm text-secondary font-bold'>Messages</label>
                                    <textarea rows={5} placeholder='Type messages....' className='px-4 py-2 border rounded-md focus-visible:outline-none placeholder:text-pera placeholder:text-sm' required />
                                </div>

                                <button type='submit' className='px-6 py-2 bg-primary rounded-md flex gap-x-2 items-center text-base text-white font-bold hover:bg-hover duration-300'>Send Messages <IoSend /></button>

                            </form>
                        </div>
                    </div>

                </div>
            </Container>
        </section>
    )
}

export default Contact