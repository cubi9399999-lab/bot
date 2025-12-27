import React from 'react'
import { Container, SectionHead } from './SubComponents'
import Image from 'next/image'

const Blog = () => {
    return (
        <section className='py-[50px] md:py-[100px]'>
            <Container>
                <div className='flex justify-center text-center'>
                    <SectionHead name={'Blog'} title={'Check the latest news about our company in our blog.'} />
                </div>

                <div className='flex flex-col sm:flex-row gap-y-10 gap-x-6 mt-10 md:mt-20'>
                    
                    <div className='w-full sm:w-1/3 border rounded-lg overflow-hidden'>
                        <div>
                            <Image
                                src="/blog-01.jpg"
                                width={500}
                                height={100}
                                alt="Logo"
                            />
                        </div>
                        <div className='p-5'>
                            <h2 className='text-secondary text-xl font-bold mb-5'>Spotlight — Equinox Collection by Shane Griffin</h2>
                            <p className='text-pera text-base'>As I searched for inspiration to get started, I came across the captivating creations of Shane Griffin, an artist and director located in New York City...</p>
                            <div className='flex justify-between items-center mt-5'>
                                <div className='flex items-center gap-x-5'>
                                    <Image
                                        src="/client-01.jpg"
                                        width={50}
                                        height={50}
                                        className='rounded-full'
                                        alt="client"
                                    />
                                    <h6 className='text-secondary text-base font-semibold'>Somor Mk</h6>
                                </div>
                                <p className='text-pera text-base font-medium'>August 2</p>
                            </div>
                        </div>
                    </div>

                    <div className='w-full sm:w-1/3 border rounded-lg overflow-hidden'>
                        <div>
                            <Image
                                src="/blog-02.jpg"
                                width={500}
                                height={100}
                                alt="Logo"
                            />
                        </div>
                        <div className='p-5'>
                            <h2 className='text-secondary text-xl font-bold mb-5'>Spotlight — Equinox Collection by Shane Griffin</h2>
                            <p className='text-pera text-base'>As I searched for inspiration to get started, I came across the captivating creations of Shane Griffin, an artist and director located in New York City...</p>
                            <div className='flex justify-between items-center mt-5'>
                                <div className='flex items-center gap-x-5'>
                                    <Image
                                        src="/client-01.jpg"
                                        width={50}
                                        height={50}
                                        className='rounded-full'
                                        alt="client"
                                    />
                                    <h6 className='text-secondary text-base font-semibold'>Somor Mk</h6>
                                </div>
                                <p className='text-pera text-base font-medium'>August 2</p>
                            </div>
                        </div>
                    </div>

                    <div className='w-full sm:w-1/3 border rounded-lg overflow-hidden'>
                        <div>
                            <Image
                                src="/blog-03.jpg"
                                width={500}
                                height={100}
                                alt="Logo"
                            />
                        </div>
                        <div className='p-5'>
                            <h2 className='text-secondary text-xl font-bold mb-5'>Spotlight — Equinox Collection by Shane Griffin</h2>
                            <p className='text-pera text-base'>As I searched for inspiration to get started, I came across the captivating creations of Shane Griffin, an artist and director located in New York City...</p>
                            <div className='flex justify-between items-center mt-5'>
                                <div className='flex items-center gap-x-5'>
                                    <Image
                                        src="/client-01.jpg"
                                        width={50}
                                        height={50}
                                        className='rounded-full'
                                        alt="client"
                                    />
                                    <h6 className='text-secondary text-base font-semibold'>Somor Mk</h6>
                                </div>
                                <p className='text-pera text-base font-medium'>August 2</p>
                            </div>
                        </div>
                    </div>

                </div>

            </Container>
        </section>
    )
}

export default Blog