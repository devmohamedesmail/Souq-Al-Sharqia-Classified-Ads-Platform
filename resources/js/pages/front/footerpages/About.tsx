import React from 'react'
import { Head } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import TopHeader from '@/components/front/TopHeader'
import MiddleHeader from '@/components/front/MiddleHeader'
import BottomNavbar from '@/components/front/BottomNavbar'
import Footer from '@/components/front/Footer'
import { FaUsers, FaEye, FaHandshake, FaBullseye, FaHeart, FaCog, FaAward, FaHeadset } from 'react-icons/fa'

function About() {
    const { t } = useTranslation()
    
    return (
        <>
            <Head title={t('about.title')} />
            <TopHeader />
            <MiddleHeader />
            
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
                            <FaUsers className="text-white text-3xl" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('about.title')}</h1>
                        <p className="text-gray-600 text-lg">{t('about.subtitle')}</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid md:grid-cols-4 gap-6 mb-12">
                        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                            <div className="text-3xl font-bold text-blue-500 mb-2">2M+</div>
                            <div className="text-gray-600">{t('about.stats.active_users')}</div>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                            <div className="text-3xl font-bold text-green-500 mb-2">150K+</div>
                            <div className="text-gray-600">{t('about.stats.successful_deals')}</div>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                            <div className="text-3xl font-bold text-purple-500 mb-2">25+</div>
                            <div className="text-gray-600">{t('about.stats.cities_covered')}</div>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                            <div className="text-3xl font-bold text-orange-500 mb-2">98%</div>
                            <div className="text-gray-600">{t('about.stats.satisfaction_rate')}</div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="grid lg:grid-cols-2 gap-8 mb-12">
                        {/* Our Story */}
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <div className="flex items-center mb-6">
                                <FaEye className="text-blue-500 text-2xl ml-3 mx-2" />
                                <h2 className="text-2xl font-bold text-gray-800">{t('about.our_story')}</h2>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                {t('about.our_story_content')}
                            </p>
                        </div>

                        {/* Our Mission */}
                        <div className="bg-white rounded-2xl shadow-xl p-8 mx-2">
                            <div className="flex items-center mb-6">
                                <FaBullseye className="text-green-500 text-2xl ml-3 mx-2" />
                                <h2 className="text-2xl font-bold text-gray-800">{t('about.our_mission')}</h2>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                {t('about.our_mission_content')}
                            </p>
                        </div>

                        {/* Our Vision */}
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <div className="flex items-center mb-6">
                                <FaHandshake className="text-purple-500 text-2xl ml-3 mx-2" />
                                <h2 className="text-2xl font-bold text-gray-800">{t('about.our_vision')}</h2>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                {t('about.our_vision_content')}
                            </p>
                        </div>

                     
                    </div>

                 

                   
                </div>
            </div>

            <BottomNavbar />
            <Footer />
        </>
    )
}

export default About
