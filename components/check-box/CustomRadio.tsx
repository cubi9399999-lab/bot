export default function CustomRadio({ checked = false, onChange, name, value }) {
    return (
        <label className="inline-flex items-center cursor-pointer">
            <input
                type="radio"
                name={name}
                value={value}
                className="sr-only"
                checked={checked}
                onChange={onChange}
            />
            <div
                className={`w-[16px] h-[16px] rounded-full flex items-center justify-center border transition-all duration-200 ${checked ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}`}
            >
                {checked ? (
                    <div className="w-[6px] h-[6px] bg-white rounded-full"></div>
                ) : null}
            </div>
        </label>
    )
}
