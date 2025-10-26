import React from 'react'
import { Head } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { FaShieldAlt, FaLock, FaDatabase, FaCookie, FaUserShield, FaEye } from 'react-icons/fa'
import TopHeader from '@/components/front/TopHeader'
import MiddleHeader from '@/components/front/MiddleHeader'
import Footer from '@/components/front/Footer'
import BottomNavbar from '@/components/front/BottomNavbar'

function Privacy() {
    const { t } = useTranslation()
    
    return (
        <>
            <Head title={t('privacy.title')} />
            <TopHeader />
            <MiddleHeader />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-teal-600 rounded-full mb-6">
                            <FaShieldAlt className="text-white text-3xl" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('privacy.title')}</h1>
                        <p className="text-gray-600 text-lg">{t('privacy.subtitle')}</p>
                    </div>

                    {/* Content */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
                        
                        {/* مقدمة */}
                        <section className="border-b border-gray-200 pb-6">
                            <div className="flex items-center mb-4">
                                <FaUserShield className="text-green-500 text-xl ml-3" />
                                <h2 className="text-2xl font-bold text-gray-800">{t('privacy.privacy_commitment')}</h2>
                            </div>
                            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                                <p className="text-gray-700 leading-relaxed">
                                    {t('privacy.commitment_content')}
                                </p>
                            </div>
                        </section>

                        {/* المعلومات التي نجمعها */}
                        <section className="border-b border-gray-200 pb-6">
                            <div className="flex items-center mb-4">
                                <FaDatabase className="text-blue-500 text-xl ml-3" />
                                <h2 className="text-2xl font-bold text-gray-800">{t('privacy.information_collection')}</h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
                                        <FaEye className="ml-2" />
                                        {t('privacy.information_you_provide')}
                                    </h3>
                                    <ul className="text-blue-700 space-y-2 text-sm">
                                        {(t('privacy.provided_info_items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                                            <li key={index}>• {item}</li>
                                        ))}
                                    </ul>
                                </div>
                                
                                <div className="bg-purple-50 p-6 rounded-lg">
                                    <h3 className="font-semibold text-purple-800 mb-3 flex items-center">
                                        <FaCookie className="ml-2" />
                                        {t('privacy.automatic_information')}
                                    </h3>
                                    <ul className="text-purple-700 space-y-2 text-sm">
                                        {(t('privacy.automatic_info_items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                                            <li key={index}>• {item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* كيف نستخدم معلوماتك */}
                        <section className="border-b border-gray-200 pb-6">
                            <div className="flex items-center mb-4">
                                <FaLock className="text-indigo-500 text-xl ml-3" />
                                <h2 className="text-2xl font-bold text-gray-800">{t('privacy.how_we_use')}</h2>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg">
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <div className="text-center">
                                            <div className="bg-indigo-100 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                                                <span className="text-indigo-600 font-bold">⚙️</span>
                                            </div>
                                            <h4 className="font-semibold text-gray-800 mb-2">{t('privacy.service_operation_title')}</h4>
                                            <p className="text-sm text-gray-600">{t('privacy.service_operation_desc')}</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="bg-green-100 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                                                <span className="text-green-600 font-bold">📈</span>
                                            </div>
                                            <h4 className="font-semibold text-gray-800 mb-2">{t('privacy.service_improvement_title')}</h4>
                                            <p className="text-sm text-gray-600">{t('privacy.service_improvement_desc')}</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="bg-orange-100 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                                                <span className="text-orange-600 font-bold">🛡️</span>
                                            </div>
                                            <h4 className="font-semibold text-gray-800 mb-2">{t('privacy.security_title')}</h4>
                                            <p className="text-sm text-gray-600">{t('privacy.security_desc')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* مشاركة المعلومات */}
                        <section className="border-b border-gray-200 pb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('privacy.information_sharing')}</h2>
                            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                                <h3 className="font-semibold text-red-800 mb-3">{t('privacy.no_selling_statement')}</h3>
                                <p className="text-red-700 mb-4">
                                    {t('privacy.sharing_cases_intro')}
                                </p>
                                <ul className="text-red-700 space-y-2">
                                    {(t('privacy.sharing_cases', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                                        <li key={index}>• {item}</li>
                                    ))}
                                </ul>
                            </div>
                        </section>

                        {/* أمان البيانات */}
                        <section className="border-b border-gray-200 pb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('privacy.data_protection')}</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="bg-green-50 border-r-4 border-green-400 p-4 rounded">
                                        <h4 className="font-semibold text-green-800 mb-2">{t('privacy.encryption_title')}</h4>
                                        <p className="text-green-700 text-sm">{t('privacy.encryption_desc')}</p>
                                    </div>
                                    <div className="bg-blue-50 border-r-4 border-blue-400 p-4 rounded">
                                        <h4 className="font-semibold text-blue-800 mb-2">{t('privacy.limited_access_title')}</h4>
                                        <p className="text-blue-700 text-sm">{t('privacy.limited_access_desc')}</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="bg-purple-50 border-r-4 border-purple-400 p-4 rounded">
                                        <h4 className="font-semibold text-purple-800 mb-2">{t('privacy.monitoring_title')}</h4>
                                        <p className="text-purple-700 text-sm">{t('privacy.monitoring_desc')}</p>
                                    </div>
                                    <div className="bg-orange-50 border-r-4 border-orange-400 p-4 rounded">
                                        <h4 className="font-semibold text-orange-800 mb-2">{t('privacy.backup_title')}</h4>
                                        <p className="text-orange-700 text-sm">{t('privacy.backup_desc')}</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* حقوقك */}
                        <section className="border-b border-gray-200 pb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('privacy.your_rights')}</h2>
                            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-lg">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-semibold text-teal-800 mb-3">{t('privacy.you_have_right')}:</h4>
                                        <ul className="text-teal-700 space-y-2 text-sm">
                                            {(t('privacy.rights_list', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                                                <li key={index}>✓ {item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-cyan-800 mb-3">{t('privacy.how_to_exercise')}:</h4>
                                        <ul className="text-cyan-700 space-y-2 text-sm">
                                            {(t('privacy.exercise_rights', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                                                <li key={index}>• {item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* ملفات تعريف الارتباط */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('privacy.cookies_title')}</h2>
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                                <p className="text-gray-700 mb-4">
                                    {t('privacy.cookies_intro')}
                                </p>
                                <div className="grid md:grid-cols-3 gap-4 text-sm">
                                    <div className="text-center">
                                        <div className="bg-blue-100 p-2 rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                                            <span className="text-blue-600">⚙️</span>
                                        </div>
                                        <h5 className="font-semibold">{t('privacy.essential_cookies')}</h5>
                                        <p className="text-gray-600">{t('privacy.essential_cookies_desc')}</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="bg-green-100 p-2 rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                                            <span className="text-green-600">📊</span>
                                        </div>
                                        <h5 className="font-semibold">{t('privacy.analytics_cookies')}</h5>
                                        <p className="text-gray-600">{t('privacy.analytics_cookies_desc')}</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="bg-purple-100 p-2 rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                                            <span className="text-purple-600">🎯</span>
                                        </div>
                                        <h5 className="font-semibold">{t('privacy.marketing_cookies')}</h5>
                                        <p className="text-gray-600">{t('privacy.marketing_cookies_desc')}</p>
                                    </div>
                                </div>
                                <div className="mt-4 p-3 bg-yellow-100 rounded">
                                    <p className="text-yellow-800 text-sm">
                                        {t('privacy.cookies_control')}
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Contact */}
                    <div className="text-center mt-8">
                        <p className="text-gray-600">
                            {t('privacy.contact_text')}
                            <a href="mailto:privacy@souqalsharqia.com" className="text-green-500 hover:text-green-600 font-semibold mx-1">{t('privacy.contact_email')}</a>
                        </p>
                        <p className="text-sm text-gray-500 mt-2">{t('privacy.last_updated')}: {t('privacy.last_updated_date')}</p>
                    </div>
                </div>
            </div>
            <Footer />
            <BottomNavbar />
        </>
    )
}

export default Privacy
