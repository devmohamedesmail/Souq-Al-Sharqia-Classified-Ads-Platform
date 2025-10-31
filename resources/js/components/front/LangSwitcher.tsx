import React from 'react'
import { useTranslation } from 'react-i18next';
function LangSwitcher() {

    const { i18n: i18next } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18next.language === 'en' ? 'ar' : 'en';
        i18next.changeLanguage(newLang);
    };


    return (

        <button
            onClick={toggleLanguage}
            className="inline-flex items-center gap-2 bg-main text-white font-bold px-4 py-2 rounded-full shadow-md hover:scale-105 transition-all duration-200 text-xs focus:outline-none focus:ring-2 focus:ring-main focus:ring-offset-2"
        >
            {/* <span className="text-lg">
                {i18next.language === 'en' ? '🇸🇦' : '🇬🇧'}
            </span> */}
            {i18next.language === 'en' ? 'العربية' : 'English'}
        </button>
    )
}

export default LangSwitcher