import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Container, Peragraph } from './SubComponents'

const Banner = () => {
    return (
        <section className='w-full bg-bannerBg bg-cover bg-center'>
            <Container>
                <div className='pt-32 md:pt-40 pb-[50px] md:pb-28 flex flex-wrap items-center'>

                    <div className='w-full md:w-1/2 flex flex-col gap-y-8 md:pl-10'>

                        <p className='text-sm md:text-lg font-medium pl-0 md:pl-[70px] text-center md:text-left relative after:hidden md:after:block after:absolute after:top-[50%] after:translate-y-[-50%] after:left-0 after:w-7 md:after:w-14 after:h-1 after:bg-primary after:content-[""] after:animate-pulse'>The Best Online Furniture Store</p>

                        <h1 className='text-4xl md:text-6xl text-secondary font-bold !leading-[120%] text-center md:text-left'>The Best Selection <br className='hidden md:block' /> of <span className='text-primary'>Furniture Online</span></h1>

                        <Peragraph text={'Online furniture apps simplify home shopping with convenience, variety, and affordability. Browse easily, compare prices.'} className={'!text-center md:!text-left'} />

                        <div className='flex justify-center md:justify-start gap-x-5'>
                            <Link href={'/'}>
                                <Image
                                    src="/store.png"
                                    width={150}
                                    height={0}
                                    alt="Apple Store"
                                    className='max-w-[100px]'
                                />
                            </Link>
                            <Link href={'/'}>
                                <Image
                                    src="/google.png"
                                    width={150}
                                    height={0}
                                    alt="Play Store"
                                    className='max-w-[100px]'
                                />
                            </Link>
                        </div>
                    </div>

                    <div className='w-full md:w-1/2 flex justify-center mt-10 md:mt-0'>
                        <Image
                            src="/banner-item.png"
                            width={300}
                            height={0}
                            alt="Bannr cards"
                            className='md:rotate-[10deg] max-w-[50%] lg:max-w-full'
                        />
                    </div>

                </div>
            </Container>
        </section>
    )
}

export default Banner