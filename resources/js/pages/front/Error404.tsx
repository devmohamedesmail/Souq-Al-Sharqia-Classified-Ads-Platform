import React from 'react'
import { Head, Link } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { FaHome, FaSearch, FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa'
import TopHeader from '@/components/front/TopHeader'
import MiddleHeader from '@/components/front/MiddleHeader'
import Footer from '@/components/front/Footer'
import BottomNavbar from '@/components/front/BottomNavbar'

function Error404() {
    const { t } = useTranslation()

    return (
        <>
            <Head title={t('error404.title')} />
            <TopHeader />
            <MiddleHeader />
            
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    {/* 404 Illustration */}
                    <div className="mb-8">
                        <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-red-500 to-pink-600 rounded-full mb-6 animate-pulse">
                            <FaExclamationTriangle className="text-white text-5xl" />
                        </div>
                        
                        {/* Large 404 Text */}
                        <div className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
                            404
                        </div>
                    </div>

                    {/* Error Content */}
                    <div className="mb-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            {t('error404.page_not_found')}
                        </h1>
                        <p className="text-gray-600 text-lg mb-2">
                            {t('error404.description')}
                        </p>
                        <p className="text-gray-500 text-base">
                            {t('error404.suggestion')}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                        <Link 
                            href="/"
                            className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 space-x-reverse"
                        >
                            <FaHome className="text-sm" />
                            <span>{t('error404.go_home')}</span>
                        </Link>
                        
                        <Link 
                            href="/search"
                            className="bg-white border-2 border-purple-500 text-purple-500 px-8 py-3 rounded-lg font-semibold hover:bg-purple-500 hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 space-x-reverse"
                        >
                            <FaSearch className="text-sm" />
                            <span>{t('error404.search_ads')}</span>
                        </Link>
                        
                        <button 
                            onClick={() => window.history.back()}
                            className="bg-gray-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 space-x-reverse"
                        >
                            <FaArrowLeft className="text-sm" />
                            <span>{t('error404.go_back')}</span>
                        </button>
                    </div>

                    {/* Popular Categories */}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            {t('error404.popular_categories')}
                        </h2>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Link 
                                href="/category/cars"
                                className="bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-4 text-center transition-all duration-200 group"
                            >
                                <div className="text-2xl mb-2">🚗</div>
                                <div className="font-semibold text-blue-800 group-hover:text-blue-900">
                                    {t('error404.cars')}
                                </div>
                            </Link>
                            
                            <Link 
                                href="/category/real-estate"
                                className="bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-4 text-center transition-all duration-200 group"
                            >
                                <div className="text-2xl mb-2">🏠</div>
                                <div className="font-semibold text-green-800 group-hover:text-green-900">
                                    {t('error404.real_estate')}
                                </div>
                            </Link>
                            
                            <Link 
                                href="/category/electronics"
                                className="bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg p-4 text-center transition-all duration-200 group"
                            >
                                <div className="text-2xl mb-2">📱</div>
                                <div className="font-semibold text-purple-800 group-hover:text-purple-900">
                                    {t('error404.electronics')}
                                </div>
                            </Link>
                            
                            <Link 
                                href="/category/jobs"
                                className="bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg p-4 text-center transition-all duration-200 group"
                            >
                                <div className="text-2xl mb-2">💼</div>
                                <div className="font-semibold text-orange-800 group-hover:text-orange-900">
                                    {t('error404.jobs')}
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Help Section */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-500 text-sm mb-2">
                            {t('error404.still_need_help')}
                        </p>
                        <Link 
                            href="/contact"
                            className="text-purple-600 hover:text-purple-800 font-medium underline"
                        >
                            {t('error404.contact_support')}
                        </Link>
                    </div>
                </div>
            </div>
            
            <Footer />
            <BottomNavbar />
        </>
    )
}

export default Error404
