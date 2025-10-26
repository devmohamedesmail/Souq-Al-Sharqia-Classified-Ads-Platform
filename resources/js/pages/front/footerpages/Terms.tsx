import React from 'react'
import { Head } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { FaFileContract, FaUser, FaShieldAlt, FaExclamationTriangle, FaGavel } from 'react-icons/fa'
import TopHeader from '@/components/front/TopHeader'
import MiddleHeader from '@/components/front/MiddleHeader'
import Footer from '@/components/front/Footer'
import BottomNavbar from '@/components/front/BottomNavbar'

function Terms() {
    const { t } = useTranslation()
    
    return (
        <>
            <Head title={t('terms.title')} />
            <TopHeader/>
            <MiddleHeader />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
                            <FaFileContract className="text-white text-3xl" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('terms.title')}</h1>
                        <p className="text-gray-600 text-lg">{t('terms.subtitle')}</p>
                    </div>

                    {/* Content */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
                        
                        {/* مقدمة */}
                        <section className="border-b border-gray-200 pb-6">
                            <div className="flex items-center mb-4">
                                <FaShieldAlt className="text-blue-500 text-xl ml-3" />
                                <h2 className="text-2xl font-bold text-gray-800">{t('terms.introduction')}</h2>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                {t('terms.introduction_content')}
                            </p>
                        </section>

                        {/* قواعد الاستخدام */}
                        <section className="border-b border-gray-200 pb-6">
                            <div className="flex items-center mb-4">
                                <FaUser className="text-green-500 text-xl ml-3" />
                                <h2 className="text-2xl font-bold text-gray-800">{t('terms.usage_rules')}</h2>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-green-50 border-r-4 border-green-400 p-4 rounded">
                                    <h3 className="font-semibold text-green-800 mb-2">{t('terms.allowed')}</h3>
                                    <ul className="text-green-700 space-y-1">
                                        {(t('terms.allowed_items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                                            <li key={index}>• {item}</li>
                                        ))}
                                    </ul>
                                </div>
                                
                                <div className="bg-red-50 border-r-4 border-red-400 p-4 rounded">
                                    <h3 className="font-semibold text-red-800 mb-2">{t('terms.not_allowed')}</h3>
                                    <ul className="text-red-700 space-y-1">
                                        {(t('terms.not_allowed_items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                                            <li key={index}>• {item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* المسؤوليات */}
                        <section className="border-b border-gray-200 pb-6">
                            <div className="flex items-center mb-4">
                                <FaExclamationTriangle className="text-yellow-500 text-xl ml-3" />
                                <h2 className="text-2xl font-bold text-gray-800">{t('terms.responsibilities')}</h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <h3 className="font-semibold text-blue-800 mb-3">{t('terms.user_responsibility')}</h3>
                                    <ul className="text-blue-700 space-y-2 text-sm">
                                        {(t('terms.user_responsibility_items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                                            <li key={index}>• {item}</li>
                                        ))}
                                    </ul>
                                </div>
                                
                                <div className="bg-purple-50 p-6 rounded-lg">
                                    <h3 className="font-semibold text-purple-800 mb-3">{t('terms.website_responsibility')}</h3>
                                    <ul className="text-purple-700 space-y-2 text-sm">
                                        {(t('terms.website_responsibility_items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                                            <li key={index}>• {item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* الرسوم والمدفوعات */}
                        <section className="border-b border-gray-200 pb-6">
                            <div className="flex items-center mb-4">
                                <FaGavel className="text-indigo-500 text-xl ml-3" />
                                <h2 className="text-2xl font-bold text-gray-800">{t('terms.fees_payments')}</h2>
                            </div>
                            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg">
                                <p className="text-gray-700 mb-4">
                                    {t('terms.fees_description')}
                                </p>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="text-center">
                                        <div className="bg-yellow-100 p-3 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                                            <span className="text-yellow-600 font-bold">★</span>
                                        </div>
                                        <h4 className="font-semibold text-gray-800">{t('terms.feature_ad_title')}</h4>
                                        <p className="text-sm text-gray-600">{t('terms.feature_ad_description')}</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="bg-green-100 p-3 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                                            <span className="text-green-600 font-bold">↑</span>
                                        </div>
                                        <h4 className="font-semibold text-gray-800">{t('terms.boost_ad_title')}</h4>
                                        <p className="text-sm text-gray-600">{t('terms.boost_ad_description')}</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="bg-blue-100 p-3 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                                            <span className="text-blue-600 font-bold">+</span>
                                        </div>
                                        <h4 className="font-semibold text-gray-800">{t('terms.additional_services_title')}</h4>
                                        <p className="text-sm text-gray-600">{t('terms.additional_services_description')}</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* تعديل الشروط */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('terms.modifications_title')}</h2>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <p className="text-gray-700 leading-relaxed">
                                    {t('terms.modifications_content')}
                                </p>
                                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
                                    <p className="text-yellow-800 text-sm">
                                        <strong>{t('terms.last_updated')}:</strong> {t('terms.last_updated_date')}
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Contact Info */}
                    <div className="text-center mt-8">
                        <p className="text-gray-600">
                            {t('terms.contact_text')}
                            <a href="/contact" className="text-blue-500 hover:text-blue-600 font-semibold mx-1">{t('terms.contact_link')}</a>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
            <BottomNavbar />
        </>
    )
}

export default Terms
