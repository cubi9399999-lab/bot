"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
    isOpen: boolean;
    title?: string;
    children: React.ReactNode;
    onClose: () => void;
    isClosable?: boolean;
    heightFull?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, children, onClose, isClosable = true, heightFull }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="modal-backdrop"
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 md:py-[40px] py-[20px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        key="modal-content"
                        className={`bg-[white] max-h-[100%] h-full w-full max-w-lg mx-4 md:mx-0 shadow-lg px-[20px] py-[20px] rounded-[16px] flex flex-col overflow-hidden`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                    >
                        {/* Header */}
                        <div className={`flex items-center justify-between ${isClosable && title ? 'mb-[10px]' : 'pb-[0px]'}`}>
                            {title ? (
                                <h2 className="font-bold text-[#0A1317] text-[15px] flex items-center justify-center">{title}</h2>
                            ) : null}

                            {isClosable ? (
                                <div
                                    className="w-[18px] h-[18px] cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-200"
                                    onClick={onClose}
                                >
                                    <img src="/close.svg" className="w-[18px] h-[18px]" alt="close" />
                                </div>
                            ) : null}
                        </div>

                        <div className="flex-1 overflow-y-auto">{children}</div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
