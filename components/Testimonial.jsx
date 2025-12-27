import React from 'react'
import { Container, Peragraph, SectionHead } from './SubComponents'
import Image from 'next/image'

const Testimonial = () => {
    return (
        <section className='py-[50px] md:py-[100px]'>
            <Container>
                <div className='flex justify-center text-center'>
                    <SectionHead name={'Our Clients'} title={'Stories From Our Customers'} />
                </div>

                <div className='flex flex-col sm:flex-row gap-y-10 gap-x-10 mt-14'>

                    <div className='w-full sm:w-1/3 border rounded-xl p-5'>
                        <h4 className='text-xl text-black font-semibold mb-5'>Best service here!</h4>
                        <Peragraph text={'"I have tried many services, but none compare to the excellence provided here! From start to finish, the team has been attentive, professional, and committed to delivering the best results."'} />

                        <div className='flex gap-x-5 mt-5'>
                            <div>
                                <Image
                                    src="/client-01.jpg"
                                    width={50}
                                    height={50}
                                    alt="user image"
                                    className='rounded-full'
                                />
                            </div>
                            <div>
                                <h6 className='text-secondary text-lg font-bold'>Somor Mk</h6>
                                <p className='text-pera text-sm'>MERN Stack Developer</p>
                            </div>
                        </div>
                    </div>

                    <div className='w-full sm:w-1/3 border rounded-xl p-5'>
                        <h4 className='text-xl text-black font-semibold mb-5'>It's just incredible!</h4>
                        <Peragraph text={'"I have tried many services, but none compare to the excellence provided here! From start to finish, the team has been attentive, professional, and committed to delivering the best results."'} />

                        <div className='flex gap-x-5 mt-5'>
                            <div>
                                <Image
                                    src="/client-02.jpg"
                                    width={50}
                                    height={50}
                                    alt="user image"
                                    className='rounded-full'
                                />
                            </div>
                            <div>
                                <h6 className='text-secondary text-lg font-bold'>Sakshi Paul</h6>
                                <p className='text-pera text-sm'>MERN Stack Developer</p>
                            </div>
                        </div>
                    </div>

                    <div className='w-full sm:w-1/3 border rounded-xl p-5'>
                        <h4 className='text-xl text-black font-semibold mb-5'>Satisfied user here!</h4>
                        <Peragraph text={'"I have tried many services, but none compare to the excellence provided here! From start to finish, the team has been attentive, professional, and committed to delivering the best results."'} />

                        <div className='flex gap-x-5 mt-5'>
                            <div>
                                <Image
                                    src="/client-03.jpg"
                                    width={50}
                                    height={50}
                                    alt="user image"
                                    className='rounded-full'
                                />
                            </div>
                            <div>
                                <h6 className='text-secondary text-lg font-bold'>Somor Mk</h6>
                                <p className='text-pera text-sm'>MERN Stack Developer</p>
                            </div>
                        </div>
                    </div>

                </div>

            </Container>
        </section>
    )
}

export default Testimonial