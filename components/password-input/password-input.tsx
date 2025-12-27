'use client'

import { useState, forwardRef } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(({ className, ...props }, ref) => {
        const [show, setShow] = useState(false)

        return (
            <div className={`input relative w-full border border-[#d4dbe3] h-[40px] px-[11px] rounded-[10px] bg-[white] text-[14px] mb-[10px] focus-within:border-[#3b82f6] hover:border-[#3b82f6] focus-within:shadow-md hover:shadow-md focus-within:shadow-blue-100 hover:shadow-blue-100 transition-all duration-200 ${className}`}>
                <input
                    type={show ? 'text' : 'password'}
                    ref={ref}
                    className={'w-full outline-[0] h-full hide-password-toggle'}
                    {...props}
                    autoComplete='new-password'
                />
                <button
                    type="button"
                    onClick={() => setShow((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 cursor-pointer"
                    tabIndex={-1}
                >
                    {show ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>

                <style>
                    {`
                        .hide-password-toggle::-ms-reveal,
                        .hide-password-toggle::-ms-clear {
                            display: none;
                        }
                    `}
                </style>
            </div>
        )
    }
)

PasswordInput.displayName = 'PasswordInput'
export default PasswordInput
