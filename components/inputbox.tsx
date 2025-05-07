

interface InputProps{
    label: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}


export const InputBox = ({label,onChange}:InputProps)=>{
    return <div>
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            <input onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
        </div>
    </div>
}