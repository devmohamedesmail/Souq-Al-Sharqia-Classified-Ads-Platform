import React from 'react'
import { useTranslation } from 'react-i18next'
import { IoMdArrowBack } from "react-icons/io";

function BackBtn() {
    const { t } = useTranslation();
    
    return (
        <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-3 py-2 mx-3 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-150"
        >
            <IoMdArrowBack className="w-4 h-4" /> 
            <span>{t('back')}</span>
        </button>
    )
}

export default BackBtn