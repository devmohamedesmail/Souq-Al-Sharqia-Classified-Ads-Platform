import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { IoLanguage } from 'react-icons/io5';

const LanguageSwitcher = () => {
  const { i18n: i18next } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18next.language === 'en' ? 'ar' : 'en';
    i18next.changeLanguage(newLang);
  };

  const isArabic = i18next.language === 'ar';

  return (
    <button 
      onClick={toggleLanguage} 
      className="inline-flex items-center gap-2 px-3 py-2 mx-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 hover:text-gray-900 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ease-in-out group"
      title={isArabic ? 'Switch to English' : 'التبديل إلى العربية'}
    >
      <IoLanguage className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors duration-200" />
      <span className="font-medium">
        {isArabic ? 'English' : 'العربية'}
      </span>
    </button>
  );
};

export default LanguageSwitcher;