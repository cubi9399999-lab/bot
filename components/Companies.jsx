import React from 'react'
import { Container, SectionHead } from './SubComponents'
import Image from 'next/image'

const Companies = () => {
    return (
        <section className='py-[50px] md:py-[100px] bg-[#F9FAFB]'>
            <Container>
                <div className='flex justify-center text-center'>
                    <SectionHead title={'Trusted by Leading Companies'} />
                </div>

                <div className='flex flex-wrap justify-evenly md:gap-x-10 md:gap-y-10 mt-10 md:mt-20'>
                    <div className='w-1/3 sm:w-1/3 md:w-auto p-5 md:p-0 flex justify-center'>
                        <Image
                            src="/amazon.svg"
                            width={120}
                            height={100}
                            alt="Features Image"
                            className='rounded-xl'
                        />
                    </div>
                    <div className='w-1/3 sm:w-1/3 md:w-auto p-5 md:p-0 flex justify-center'>
                        <Image
                            src="/google.svg"
                            width={120}
                            height={100}
                            alt="Features Image"
                            className='rounded-xl'
                        />
                    </div>
                    <div className='w-1/3 sm:w-1/3 md:w-auto p-5 md:p-0 flex justify-center'>
                        <Image
                            src="/lenovo.svg"
                            width={120}
                            height={100}
                            alt="Features Image"
                            className='rounded-xl'
                        />
                    </div>
                    <div className='w-1/3 sm:w-1/3 md:w-auto p-5 md:p-0 flex justify-center'>
                        <Image
                            src="/paypal.svg"
                            width={120}
                            height={100}
                            alt="Features Image"
                            className='rounded-xl'
                        />
                    </div>
                    <div className='w-1/3 sm:w-1/3 md:w-auto p-5 md:p-0 flex justify-center'>
                        <Image
                            src="/shopify.svg"
                            width={120}
                            height={100}
                            alt="Features Image"
                            className='rounded-xl'
                        />
                    </div>
                    <div className='w-1/3 sm:w-1/3 md:w-auto p-5 md:p-0 flex justify-center'>
                        <Image
                            src="/spotify.svg"
                            width={120}
                            height={100}
                            alt="Features Image"
                            className='rounded-xl'
                        />
                    </div>
                </div>

            </Container>
        </section>
    )
}

export default Companies