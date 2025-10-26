import React from 'react'
import { Head, Link } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { FaBullhorn, FaUsers, FaChartLine, FaRocket, FaHandshake, FaGem, FaEye, FaMousePointer } from 'react-icons/fa'
import TopHeader from '@/components/front/TopHeader'
import MiddleHeader from '@/components/front/MiddleHeader'
import Footer from '@/components/front/Footer'
import BottomNavbar from '@/components/front/BottomNavbar'

function AdvertiseWithUs() {
    const { t } = useTranslation()
    
    const advertisingPackages = [
        {
            id: 'banner',
            name: t('advertise.banner_ad'),
            price: 500,
            duration: t('advertise.month'),
            features: t('advertise.banner_features', { returnObjects: true }) as string[],
            views: '500,000',
            clicks: '15,000',
            color: 'blue'
        },
        {
            id: 'sidebar',
            name: t('advertise.sidebar_ad'),
            price: 300,
            duration: t('advertise.month'),
            features: t('advertise.sidebar_features', { returnObjects: true }) as string[],
            views: '300,000',
            clicks: '9,000',
            color: 'green'
        },
        {
            id: 'sponsored',
            name: t('advertise.sponsored_content'),
            price: 800,
            duration: t('advertise.month'),
            features: t('advertise.sponsored_features', { returnObjects: true }) as string[],
            views: '200,000',
            clicks: '12,000',
            color: 'purple'
        },
        {
            id: 'premium',
            name: t('advertise.premium_package'),
            price: 1500,
            duration: t('advertise.month'),
            features: t('advertise.premium_features', { returnObjects: true }) as string[],
            views: '1,000,000',
            clicks: '35,000',
            color: 'orange'
        }
    ]

    const benefits = [
        {
            icon: FaUsers,
            title: t('advertise.diverse_audience'),
            description: t('advertise.audience_desc')
        },
        {
            icon: FaChartLine,
            title: t('advertise.continuous_growth'),
            description: t('advertise.growth_desc')
        },
        {
            icon: FaRocket,
            title: t('advertise.fast_results'),
            description: t('advertise.results_desc')
        },
        {
            icon: FaHandshake,
            title: t('advertise.strategic_partnership'),
            description: t('advertise.partnership_desc')
        }
    ]

    const stats = [
        { number: '2M+', label: t('advertise.monthly_users') },
        { number: '50K+', label: t('advertise.weekly_ads') },
        { number: '1.5M+', label: t('advertise.daily_views') },
        { number: '95%', label: t('advertise.satisfaction_rate') }
    ]

    return (
        <>
            <Head title={t('advertise.title')} />
            <TopHeader />
            <MiddleHeader />
            
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mb-6">
                            <FaBullhorn className="text-white text-3xl" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('advertise.title')}</h1>
                        <p className="text-gray-600 text-lg">{t('advertise.subtitle')}</p>
                    </div>

                    {/* Statistics */}
                    <div className="grid md:grid-cols-4 gap-6 mb-12">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
                                <div className="text-3xl font-bold text-orange-500 mb-2">{stat.number}</div>
                                <div className="text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Benefits */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{t('advertise.why_choose_souq')}</h2>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="text-center p-6 hover:shadow-lg transition-shadow duration-300 rounded-lg">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mb-4">
                                        <benefit.icon className="text-white text-2xl" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">{benefit.title}</h3>
                                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Advertising Packages */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{t('advertise.advertising_packages')}</h2>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {advertisingPackages.map((pkg) => (
                                <div key={pkg.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                                    <div className={`bg-gradient-to-r from-${pkg.color}-500 to-${pkg.color}-600 p-6 text-center text-white`}>
                                        <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                                        <div className="text-3xl font-bold mb-1">{pkg.price}</div>
                                        <div className="text-sm opacity-90">{t('advertise.aed')} / {pkg.duration}</div>
                                    </div>
                                    
                                    <div className="p-6">
                                        <div className="flex justify-between items-center mb-4 text-sm">
                                            <div className="flex items-center">
                                                <FaEye className="text-gray-400 ml-2" />
                                                <span className="text-gray-600">{pkg.views} {t('advertise.views')}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <FaMousePointer className="text-gray-400 ml-2" />
                                                <span className="text-gray-600">{pkg.clicks} {t('advertise.clicks')}</span>
                                            </div>
                                        </div>
                                        
                                        <ul className="space-y-2 mb-6">
                                            {pkg.features.map((feature, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="text-green-500 ml-2 mt-1">✓</span>
                                                    <span className="text-gray-700 text-sm">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        
                                        <button className={`w-full bg-gradient-to-r from-${pkg.color}-500 to-${pkg.color}-600 text-white py-3 rounded-lg font-semibold hover:from-${pkg.color}-600 hover:to-${pkg.color}-700 transition-all duration-300`}>
                                            {t('advertise.choose_package')}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Ad Formats */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{t('advertise.available_ad_formats')}</h2>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="bg-blue-100 rounded-lg p-6 mb-4">
                                    <div className="text-4xl mb-2">🖼️</div>
                                    <h4 className="font-semibold text-gray-800">{t('advertise.banner_ads')}</h4>
                                </div>
                                <p className="text-gray-600 text-sm">
                                    {t('advertise.banner_ads_desc')}
                                </p>
                            </div>
                            
                            <div className="text-center">
                                <div className="bg-green-100 rounded-lg p-6 mb-4">
                                    <div className="text-4xl mb-2">📱</div>
                                    <h4 className="font-semibold text-gray-800">{t('advertise.mobile_ads')}</h4>
                                </div>
                                <p className="text-gray-600 text-sm">
                                    {t('advertise.mobile_ads_desc')}
                                </p>
                            </div>
                            
                            <div className="text-center">
                                <div className="bg-purple-100 rounded-lg p-6 mb-4">
                                    <div className="text-4xl mb-2">📝</div>
                                    <h4 className="font-semibold text-gray-800">{t('advertise.sponsored_content_title')}</h4>
                                </div>
                                <p className="text-gray-600 text-sm">
                                    {t('advertise.sponsored_content_desc')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Success Stories */}
                    <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 text-white mb-12">
                        <h2 className="text-3xl font-bold text-center mb-8">قصص نجاح شركائنا</h2>
                        
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                                <div className="text-2xl font-bold mb-2">+300%</div>
                                <div className="text-sm opacity-90">زيادة في المبيعات</div>
                                <div className="text-xs opacity-75 mt-2">معرض السيارات الشرقية</div>
                            </div>
                            
                            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                                <div className="text-2xl font-bold mb-2">+500%</div>
                                <div className="text-sm opacity-90">زيادة في الزيارات</div>
                                <div className="text-xs opacity-75 mt-2">مجمع الأثاث الحديث</div>
                            </div>
                            
                            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                                <div className="text-2xl font-bold mb-2">+200%</div>
                                <div className="text-sm opacity-90">زيادة في الاستفسارات</div>
                                <div className="text-xs opacity-75 mt-2">مركز الإلكترونيات</div>
                            </div>
                        </div>
                    </div>

                    {/* Process */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">كيف نبدأ معاً؟</h2>
                        
                        <div className="grid md:grid-cols-4 gap-6">
                            <div className="text-center">
                                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-orange-600 text-2xl font-bold">1</span>
                                </div>
                                <h4 className="font-semibold text-gray-800 mb-2">التواصل</h4>
                                <p className="text-gray-600 text-sm">تواصل معنا لمناقشة احتياجاتك وأهدافك</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-blue-600 text-2xl font-bold">2</span>
                                </div>
                                <h4 className="font-semibold text-gray-800 mb-2">التخطيط</h4>
                                <p className="text-gray-600 text-sm">نضع خطة إعلانية مخصصة لعملك</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-green-600 text-2xl font-bold">3</span>
                                </div>
                                <h4 className="font-semibold text-gray-800 mb-2">التنفيذ</h4>
                                <p className="text-gray-600 text-sm">نطلق حملتك الإعلانية بأفضل المعايير</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-purple-600 text-2xl font-bold">4</span>
                                </div>
                                <h4 className="font-semibold text-gray-800 mb-2">المتابعة</h4>
                                <p className="text-gray-600 text-sm">نراقب الأداء ونحسن النتائج باستمرار</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact CTA */}
                    <div className="text-center">
                        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 text-white">
                            <FaGem className="text-4xl mx-auto mb-4" />
                            <h2 className="text-3xl font-bold mb-4">جاهز لتنمية أعمالك؟</h2>
                            <p className="text-xl mb-6">تواصل معنا اليوم واحصل على استشارة مجانية</p>
                            
                            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
                                <Link
                                    href="/contact"
                                    className="bg-white text-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-300"
                                >
                                    ابدأ الآن
                                </Link>
                                <a
                                    href="tel:+966123456789"
                                    className="bg-orange-400 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-300 transition-colors duration-300"
                                >
                                    اتصل بنا: 123-456-789
                                </a>
                            </div>
                            
                            <div className="mt-6 text-center">
                                <p className="text-sm opacity-90">
                                    أو راسلنا على: 
                                    <a href="mailto:advertising@souqalsharqia.com" className="font-semibold underline mx-1">
                                        advertising@souqalsharqia.com
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <BottomNavbar />
        </>
    )
}

export default AdvertiseWithUs
