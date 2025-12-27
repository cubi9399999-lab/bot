import Link from 'next/link'
import React from 'react'
import { BsArrowUpRight } from "react-icons/bs";
import { IoIosArrowDown } from 'react-icons/io';

export const Container = ({ children, className }) => {
  return (
    <div className={`max-w-container mx-auto px-5 ${className}`}>{children}</div>
  )
}

export const SectionHead = ({ name, title, info, link, className }) => {
  return (
    <div className={`flex flex-col gap-y-5 ${className}`}>
      {name && <h6 className='text-primary text-sm md:text-md font-semibold uppercase'>{name}</h6>}
      {title && <h2 className='text-2xl md:text-4xl text-secondary font-bold leading-[140%] max-w-[600px]'>{title}</h2>}
      {info && <p className='text-xs md:text-md text-pera mx-auto leading-[200%]'>{info}</p>}
      {link && <Link href={'/'} className='hidden md:flex gap-x-4 items-center text-base text-secondary font-medium'>Learn More <BsArrowUpRight /></Link>}
    </div>
  )
}

export const Peragraph = ({ text, className }) => {
  return (
    <p className={`text-sm md:text-md text-pera leading-[180%] md:leading-[200%] ${className}`}>{text}</p>
  )
}

export const FAQItem = ({ title, info }) => {
  return (
    <div className="w-full group flex flex-col gap-2 py-3 sm:py-5 border-b last:border-none" tabIndex={1}>
      <div className="flex cursor-pointer items-center justify-between">
        <span className="text-secondary text-sm sm:text-lg font-semibold">{title}</span>
        <IoIosArrowDown className='group-focus:rotate-180 duration-300' />
      </div>
      <div className="invisible h-auto max-h-0 items-center opacity-0 transition-all group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000">
        <p className={`text-sm sm:text-md text-pera leading-[200%]`}>{info}</p>
      </div>
    </div>
  )
}