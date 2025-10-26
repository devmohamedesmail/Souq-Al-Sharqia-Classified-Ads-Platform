import React from 'react'
import { Head, Link } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { FaRocket, FaStar, FaCrown, FaFire, FaEye, FaArrowUp, FaClock, FaCheckCircle } from 'react-icons/fa'
import TopHeader from '@/components/front/TopHeader'
import MiddleHeader from '@/components/front/MiddleHeader'
import Footer from '@/components/front/Footer'
import BottomNavbar from '@/components/front/BottomNavbar'

function BoostAdPage() {
    const { t } = useTranslation()
    
    const boostPackages = [
        {
            id: 'basic',
            name: t('boost_ad.basic_package'),
            price: 25,
            duration: t('boost_ad.days_3'),
            features: t('boost_ad.basic_features', { returnObjects: true }) as string[],
            color: 'blue',
            icon: FaArrowUp,
            popular: false
        },
        {
            id: 'premium',
            name: t('boost_ad.premium_package'),
            price: 75,
            duration: t('boost_ad.days_7'),
            features: t('boost_ad.premium_features', { returnObjects: true }) as string[],
            color: 'yellow',
            icon: FaStar,
            popular: true
        },
        {
            id: 'vip',
            name: t('boost_ad.vip_package'),
            price: 150,
            duration: t('boost_ad.days_15'),
            features: t('boost_ad.vip_features', { returnObjects: true }) as string[],
            color: 'purple',
            icon: FaCrown,
            popular: false
        }
    ]

    const benefits = [
        {
            icon: FaEye,
            title: t('boost_ad.increase_views'),
            description: t('boost_ad.increase_views_desc')
        },
        {
            icon: FaFire,
            title: t('boost_ad.faster_spread'),
            description: t('boost_ad.faster_spread_desc')
        },
        {
            icon: FaRocket,
            title: t('boost_ad.faster_sales'),
            description: t('boost_ad.faster_sales_desc')
        },
        {
            icon: FaCheckCircle,
            title: t('boost_ad.quality_guarantee'),
            description: t('boost_ad.quality_guarantee_desc')
        }
    ]

    return (
        <>
            <TopHeader />
            <MiddleHeader />
            <Head title={t('boost_ad.title')} />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full mb-6">
                            <FaRocket className="text-white text-3xl" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('boost_ad.title')}</h1>
                        <p className="text-gray-600 text-lg">{t('boost_ad.subtitle')}</p>
                    </div>

                    {/* Benefits Section */}
                    <div className="grid md:grid-cols-4 gap-6 mb-12">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
                                    <benefit.icon className="text-white text-2xl" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">{benefit.title}</h3>
                                <p className="text-gray-600 text-sm">{benefit.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Pricing Packages */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{t('boost_ad.choose_package')}</h2>

                        <div className="grid md:grid-cols-3 gap-8">
                            {boostPackages.map((pkg) => {
                                const IconComponent = pkg.icon
                                return (
                                    <div
                                        key={pkg.id}
                                        className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 ${pkg.popular ? 'ring-4 ring-yellow-400' : ''
                                            }`}
                                    >
                                        {pkg.popular && (
                                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                                                    {t('boost_ad.most_popular')}
                                                </div>
                                            </div>
                                        )}

                                        <div className={`bg-gradient-to-r from-${pkg.color}-500 to-${pkg.color}-600 p-6 text-center`}>
                                            <IconComponent className="text-white text-4xl mb-4 mx-auto" />
                                            <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                                            <div className="text-white">
                                                <span className="text-4xl font-bold">{pkg.price}</span>
                                                <span className="text-lg"> {t('boost_ad.currency')}</span>
                                            </div>
                                            <p className="text-white/80 mt-2">{pkg.duration}</p>
                                        </div>

                                        <div className="p-6">
                                            <ul className="space-y-3 mb-6">
                                                {pkg.features.map((feature, index) => (
                                                    <li key={index} className="flex items-center space-x-3 space-x-reverse">
                                                        <FaCheckCircle className="text-green-500 flex-shrink-0" />
                                                        <span className="text-gray-700">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            <Link
                                                href={`/boost-ad?package=${pkg.id}`}
                                                className={`w-full bg-gradient-to-r from-${pkg.color}-500 to-${pkg.color}-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-${pkg.color}-600 hover:to-${pkg.color}-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 space-x-reverse`}
                                            >
                                                <FaRocket className="text-sm" />
                                                <span>{t('boost_ad.choose_package_btn')}</span>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* How it Works */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{t('boost_ad.how_it_works')}</h2>

                        <div className="grid md:grid-cols-4 gap-6">
                            <div className="text-center">
                                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-blue-600 text-2xl font-bold">1</span>
                                </div>
                                <h4 className="font-semibold text-gray-800 mb-2">{t('boost_ad.step_1')}</h4>
                                <p className="text-gray-600 text-sm">{t('boost_ad.step_1_desc')}</p>
                            </div>

                            <div className="text-center">
                                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-green-600 text-2xl font-bold">2</span>
                                </div>
                                <h4 className="font-semibold text-gray-800 mb-2">{t('boost_ad.step_2')}</h4>
                                <p className="text-gray-600 text-sm">{t('boost_ad.step_2_desc')}</p>
                            </div>

                            <div className="text-center">
                                <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-yellow-600 text-2xl font-bold">3</span>
                                </div>
                                <h4 className="font-semibold text-gray-800 mb-2">{t('boost_ad.step_3')}</h4>
                                <p className="text-gray-600 text-sm">{t('boost_ad.step_3_desc')}</p>
                            </div>

                            <div className="text-center">
                                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-purple-600 text-2xl font-bold">4</span>
                                </div>
                                <h4 className="font-semibold text-gray-800 mb-2">{t('boost_ad.step_4')}</h4>
                                <p className="text-gray-600 text-sm">{t('boost_ad.step_4_desc')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Statistics */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white mb-12">
                        <h2 className="text-3xl font-bold text-center mb-8">{t('boost_ad.amazing_statistics')}</h2>

                        <div className="grid md:grid-cols-4 gap-6 text-center">
                            <div>
                                <div className="text-4xl font-bold mb-2">95%</div>
                                <div className="text-blue-100">{t('boost_ad.customers_satisfied')}</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold mb-2">10x</div>
                                <div className="text-blue-100">{t('boost_ad.views_increase')}</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold mb-2">80%</div>
                                <div className="text-blue-100">{t('boost_ad.higher_sales')}</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold mb-2">24h</div>
                                <div className="text-blue-100">{t('boost_ad.average_sale')}</div>
                            </div>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{t('boost_ad.faq_title')}</h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <h4 className="font-semibold text-gray-800 mb-2">{t('boost_ad.when_starts')}</h4>
                                    <p className="text-gray-600 text-sm">
                                        {t('boost_ad.starts_answer')}
                                    </p>
                                </div>

                                <div className="border border-gray-200 rounded-lg p-4">
                                    <h4 className="font-semibold text-gray-800 mb-2">{t('boost_ad.can_cancel')}</h4>
                                    <p className="text-gray-600 text-sm">
                                        {t('boost_ad.cancel_answer')}
                                    </p>
                                </div>

                                <div className="border border-gray-200 rounded-lg p-4">
                                    <h4 className="font-semibold text-gray-800 mb-2">{t('boost_ad.no_results')}</h4>
                                    <p className="text-gray-600 text-sm">
                                        {t('boost_ad.results_answer')}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <h4 className="font-semibold text-gray-800 mb-2">{t('boost_ad.monitor_performance')}</h4>
                                    <p className="text-gray-600 text-sm">
                                        {t('boost_ad.monitor_answer')}
                                    </p>
                                </div>

                                <div className="border border-gray-200 rounded-lg p-4">
                                    <h4 className="font-semibold text-gray-800 mb-2">{t('boost_ad.extend_period')}</h4>
                                    <p className="text-gray-600 text-sm">
                                        {t('boost_ad.extend_answer')}
                                    </p>
                                </div>

                                <div className="border border-gray-200 rounded-lg p-4">
                                    <h4 className="font-semibold text-gray-800 mb-2">{t('boost_ad.payment_methods')}</h4>
                                    <p className="text-gray-600 text-sm">
                                        {t('boost_ad.payment_answer')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center mt-12">
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-8 text-white">
                            <h2 className="text-3xl font-bold mb-4">{t('boost_ad.ready_to_boost')}</h2>
                            <p className="text-xl mb-6">{t('boost_ad.start_now')}</p>
                            <Link
                                href="/boost-ad"
                                className="inline-flex items-center space-x-2 space-x-reverse bg-white text-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-300"
                            >
                                <FaRocket />
                                <span>{t('boost_ad.boost_now')}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <BottomNavbar />
        </>
    )
}

export default BoostAdPage
