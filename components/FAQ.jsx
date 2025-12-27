import React from 'react'
import { Container, FAQItem, SectionHead } from './SubComponents'

const FAQ = () => {
    return (
        <section className='py-[50px] md:py-[100px] bg-[#F9FAFB]'>
            <Container>
                <div className='flex justify-center text-center'>
                    <SectionHead name={'FAQS'} title={'Frequently Asked Questions'} />
                </div>

                <div className='bg-white px-5 sm:px-8 py-3 mt-10 md:mt-20 rounded-lg'>

                    <FAQItem title={'How long does it take to ship my order ?'} info={'Shipping times vary depending on your location and the shipping method chosen. Typically, orders are processed and shipped within 1-3 business days. Youll receive a tracking number once your order is shipped, which you can use to monitor its delivery status.'} />

                    <FAQItem title={'What payment methods do you accept ?'} info={'We accept various payment methods, including credit/debit cards, PayPal, and sometimes other online payment platforms.'} />

                    <FAQItem title={'What shipping options do you have ?'} info={'Standard Shipping: This is our regular shipping option, which typically takes 3-7 business days for delivery, depending on your location and the shipping carrier.'} />

                    <FAQItem title={'How do i make changes to an existing order ?'} info={'International Shipping We also offer international shipping for customers outside the country. Delivery times for international orders vary widely based on destination and shipping method chosen. It typically ranges from 6-21 business days.'} />

                    <FAQItem title={'When will my order arrive ?'} info={'Processing Time Before your order is shipped, it needs to be processed by the seller. Processing times can vary based on factors such as order volume, item availability, and any customization or personalization required. Typically, sellers aim to process orders within 1-3 business days, but this can vary.'} />

                </div>

            </Container>
        </section>
    )
}

export default FAQ