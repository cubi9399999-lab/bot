'use client'

import { use, useState } from 'react'

export default function ToggleSwitch({ defaultOn = false }) {
    const [enabled, setEnabled] = useState(defaultOn)

    return (
        <button
            type='button'
            onClick={() => setEnabled(!enabled)}
            className={`relative inline-flex flex items-center cursor-pointer h-[18px] w-[32px] rounded-full transition-colors duration-300 focus:outline-none  ${enabled ? 'bg-blue-600' : 'bg-gray-300'}`}
        >
            <span
                className={`inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-md transition-transform duration-300 ${enabled ? 'translate-x-[15px]' : 'translate-x-[1px]'}`}
            />
        </button>
    )
}
