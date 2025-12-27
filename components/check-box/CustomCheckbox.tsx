import { useState } from "react"

export default function CustomCheckbox({ defaultChecked = false }) {
    const [checked, setChecked] = useState(defaultChecked)

    return (
        <label className="inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                className="sr-only"
                checked={checked}
                id="custom-checkbox"
                onChange={() => setChecked(!checked)}
            />
            <div
                className={`w-[16px] h-[16px] rounded-[4px] flex items-center justify-center border transition-all duration-200 ${checked ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}`}
            >
                {checked ? (
                    <svg
                        className="w-[12px] h-[12px] text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={3}
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                ) : (
                    <svg
                        className="w-[12px] h-[12px] text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={3}
                        viewBox="0 0 24 24"
                    >
                    </svg>
                )}

            </div>
        </label>
    )
}
