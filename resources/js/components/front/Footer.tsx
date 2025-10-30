import React from 'react'
import { usePage, Link } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { FaFacebook, FaTwitter, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import i18n from '@/i18n'

function Footer() {
    const { t } = useTranslation()
    const { app_settings }: any = usePage().props;

    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* Website Info */}
                    <div className="space-y-4">
                        <h3 className={`text-xl arabic-font font-bold text-white mb-4 ${i18n.language === 'ar' ? 'text-right' : 'text-left'} `}>
                            {app_settings.website_name}
                        </h3>
                        <p className={`text-gray-300 leading-relaxed arabic-font ${i18n.language === 'ar' ? 'text-right' : 'text-left'} `}>
                            {app_settings.description}
                        </p>
                        <div className={`flex mt-10 space-x-4 ${i18n.language === 'ar' ? 'justify-end' : 'text-left'}`}>
                            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                                <FaFacebook size={24} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                                <FaTwitter size={24} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                                <FaInstagram size={24} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className={`text-md text-white arabic-font mb-4 ${i18n.language === 'ar' ? 'text-right' : 'text-left'} `}>{t('footer.important_links')}</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link 
                                href="/about" 
                                className={`text-gray-300 hover:text-white  block text-sm  hover:underline transition-colors duration-200 ${i18n.language === 'ar' ? 'text-right arabic-font' : 'text-left'}`}>
                                    {t('footer.about_us')}
                                </Link>
                            </li>
                            <li>
                                <Link 
                                href="/boost-ad-info" 
                                className={`text-gray-300 hover:text-white  block text-sm   hover:underline transition-colors duration-200 ${i18n.language === 'ar' ? 'text-right arabic-font' : 'text-left'}`}>
                                    {t('footer.boost_ad')}
                                </Link>
                            </li>
                            <li>
                                <Link 
                                href="/advertise-with-us" 
                                className={`text-gray-300 hover:text-white  block  text-sm   hover:underline transition-colors duration-200 ${i18n.language === 'ar' ? 'text-right arabic-font' : 'text-left'}`}>
                                    {t('footer.advertise_with_us')}
                                </Link>
                            </li>
                            <li>
                                <Link 
                                href="/website-commission" 
                               className={`text-gray-300 hover:text-white  block text-sm   hover:underline transition-colors duration-200 ${i18n.language === 'ar' ? 'text-right arabic-font' : 'text-left'}`}>
                                    {t('footer.website_commission')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div className="space-y-4">
                        <h4 className={`text-md text-white arabic-font mb-4 ${i18n.language === 'ar' ? 'text-right' : 'text-left'} `}>{t('footer.terms_policies')}</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/terms" 
                                className={`text-gray-300 hover:text-white  block  text-sm  hover:underline transition-colors duration-200 ${i18n.language === 'ar' ? 'text-right arabic-font' : 'text-left'}`}>
                                    {t('footer.terms_conditions')}
                                </Link>
                            </li>
                            <li>
                                <Link 
                                href="/privacy" 
                                className={`text-gray-300 hover:text-white  block  text-sm   hover:underline transition-colors duration-200 ${i18n.language === 'ar' ? 'text-right arabic-font' : 'text-left'}`}>
                                    {t('footer.privacy_policy')}
                                </Link>
                            </li>
                            <li>
                                <Link 
                                href="/contact" 
                                className={`text-gray-300 hover:text-white  block text-sm   hover:underline transition-colors duration-200 ${i18n.language === 'ar' ? 'text-right arabic-font' : 'text-left'}`}>
                                    {t('footer.contact_us')}
                                </Link>
                            </li>
                            <li>
                                <Link 
                                href="/complaints" 
                                className={`text-gray-300 hover:text-white  block  text-sm   hover:underline transition-colors duration-200 ${i18n.language === 'ar' ? 'text-right arabic-font' : 'text-left'}`}>
                                    {t('footer.complaints_suggestions')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h4 className={`text-md text-white arabic-font mb-4 ${i18n.language === 'ar' ? 'text-right' : 'text-left'} `}>{t('footer.contact_us')}</h4>
                        <div className="space-y-3">
                            {/* <div 
                            className={`flex items-center space-x-3 space-x-reverse ${i18n.language === 'ar' ? 'flex-row-reverse' : ''} `}>
                                <FaPhone className="text-white flex-shrink-0" />
                                <span className="text-gray-300 mx-2">
                                    {app_settings.phone}
                                </span>
                            </div> */}
                            <div className={`flex items-center space-x-3 space-x-reverse ${i18n.language === 'ar' ? 'flex-row-reverse' : ''} `}>
                                <FaEnvelope className="text-white flex-shrink-0" />
                                <span className="text-gray-300 mx-2">
                                    {app_settings.email}
                                </span>
                            </div>
                            <div className={`flex items-center space-x-3 space-x-reverse ${i18n.language === 'ar' ? 'flex-row-reverse' : ''} `}>
                                <FaMapMarkerAlt className="text-white flex-shrink-0" />
                                <span className="text-gray-300 mx-2">{t('footer.address')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-700">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm mb-4 md:mb-0">
                            © 2024 {app_settings.website_name}. {t('footer.all_rights_reserved')}
                        </p>
                        <p className="text-gray-400 text-sm">
                            {t('footer.developed_by')}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer