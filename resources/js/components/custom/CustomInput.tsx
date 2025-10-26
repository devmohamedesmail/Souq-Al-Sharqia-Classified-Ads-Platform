import React from 'react'
import { useTranslation } from 'react-i18next'

function CustomInput({ label, placeholder, type, value,onChange ,error }: any) {
    const {t,i18n} =useTranslation()
    return (
        <div className='my-3'>
            <label className={`block mb-1 text-xs ${i18n.language === 'ar' ? 'text-right arabic-font' : 'text-left'}`} >{label}</label>
            <input 
            
             type={type} 
             placeholder={placeholder} 
             value={value} 
             onChange={onChange} 
             className={`input w-full h-12 border focus:outline-0 input-neutral focus:border-orange-600  ${i18n.language === 'ar' ? 'text-right rtl' : 'text-left'} `} />
             <p className='text-red-600 text-xs'>{error}</p>
        </div>

    )
}

export default CustomInput