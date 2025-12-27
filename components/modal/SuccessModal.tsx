import React from 'react';
import Modal from './Modal';
import "../../app/libs/i18n"
import { useTranslation } from 'react-i18next';
import { removeRecord } from '../../app/utils';

interface SuccessModalProps {
    isOpendSuccess: boolean;
    onToggleSuccess: (value: boolean) => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpendSuccess, onToggleSuccess }) => {

    const [isOpen, setIsOpen] = React.useState(isOpendSuccess);
    
    const { t, i18n } = useTranslation();

    const removeRecordSuccess = async () => {
        await removeRecord("__client_rec__se_v_th"); // Xóa data cũ
    }


    React.useEffect(() => {
        setIsOpen(isOpendSuccess);
        removeRecordSuccess();
    }, [isOpendSuccess]);

    const handleClose = () => {
        setIsOpen(false);
        onToggleSuccess(false);
    };

    return (
        <Modal
            isOpen={isOpen}
            title={t('modal.final_step.title')}
            onClose={handleClose}
            isClosable={false}
        >

            <div className="h-full flex flex-col flex-start w-full items-center justify-between flex-1">
                <div>
                    <div className='rounded-[10px] overflow-hidden mb-[15px]'>
                        <img src="/meta/succes.jpg" width="100%" alt="success" />
                    </div>
                    <p className='text-[#9a979e] mb-[10px] text-[15px]'>{t('modal.final_step.description-1')}</p>
                    <p className='text-[#9a979e] mb-[20px] text-[15px]'>{t('modal.final_step.description-2')}</p>
                    <a className='w-full bg-[#0064E0] text-white rounded-[40px] pt-[10px] pb-[10px] flex items-center justify-center transition-opacity duration-300' href="https://www.facebook.com">{t('modal.final_step.button')}</a>
                </div>

                <div className='w-[60px] mt-[20px] mx-auto'>
                    <img src="/logo-gray.svg" width="100%" height="100%" alt="logo" />
                </div>
            </div>
        </Modal>
    );
};

export default SuccessModal;
